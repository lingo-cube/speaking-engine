package service

import (
	"context"
	"fmt"
	"io"
	"path/filepath"
	"time"

	"github.com/lingo-cube/speaking-engine/backend/internal/storage"
)

type AudioService struct {
	storageProvider storage.Provider
	chunkService    *ChunkService
}

func NewAudioService(storageProvider storage.Provider, chunkService *ChunkService) *AudioService {
	return &AudioService{
		storageProvider: storageProvider,
		chunkService:    chunkService,
	}
}

// UploadAudio receives a multipart file, uploads it to the storage provider,
// and updates the chunk's audio URL.
func (s *AudioService) UploadAudio(chunkID uint, filename string, reader io.Reader) error {
	ext := filepath.Ext(filename)
	key := fmt.Sprintf("audio/chunk-%d-%d%s", chunkID, time.Now().UnixMilli(), ext)

	ctx := context.Background()
	if err := s.storageProvider.Upload(ctx, key, reader); err != nil {
		return fmt.Errorf("upload audio for chunk %d: %w", chunkID, err)
	}

	url, err := s.storageProvider.GetURL(ctx, key)
	if err != nil {
		return fmt.Errorf("get audio url for chunk %d: %w", chunkID, err)
	}

	if err := s.chunkService.UpdateAudioURL(chunkID, url); err != nil {
		return fmt.Errorf("update chunk %d audio url: %w", chunkID, err)
	}

	return nil
}

// GetAudioURL returns the audio URL for a chunk.
func (s *AudioService) GetAudioURL(chunkID uint) (string, error) {
	chunk, err := s.chunkService.GetByID(chunkID)
	if err != nil {
		return "", fmt.Errorf("get audio url for chunk %d: %w", chunkID, err)
	}
	if chunk.AudioURL == "" {
		return "", fmt.Errorf("audio not found for chunk %d", chunkID)
	}
	return chunk.AudioURL, nil
}

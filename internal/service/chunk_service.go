package service

import (
	"fmt"

	"github.com/lingo-cube/speaking-engine/internal/model"
	"github.com/lingo-cube/speaking-engine/internal/repository"
)

type ChunkService struct {
	repo *repository.ChunkRepository
}

func NewChunkService(repo *repository.ChunkRepository) *ChunkService {
	return &ChunkService{repo: repo}
}

func (s *ChunkService) ListByAnswerID(answerID uint) ([]model.Chunk, error) {
	chunks, err := s.repo.ListByAnswerID(answerID)
	if err != nil {
		return nil, fmt.Errorf("list chunks by answer id %d: %w", answerID, err)
	}
	return chunks, nil
}

func (s *ChunkService) GetByID(id uint) (*model.Chunk, error) {
	chunk, err := s.repo.GetByID(id)
	if err != nil {
		return nil, fmt.Errorf("get chunk by id %d: %w", id, err)
	}
	return chunk, nil
}

func (s *ChunkService) Update(id uint, text string, order int) (*model.Chunk, error) {
	chunk, err := s.repo.GetByID(id)
	if err != nil {
		return nil, fmt.Errorf("update chunk: get by id %d: %w", id, err)
	}
	chunk.Text = text
	chunk.Order = order
	if err := s.repo.Update(chunk); err != nil {
		return nil, fmt.Errorf("update chunk %d: %w", id, err)
	}
	return chunk, nil
}

// UpdateAudioURL sets the audio URL for a chunk.
func (s *ChunkService) UpdateAudioURL(id uint, audioURL string) error {
	chunk, err := s.repo.GetByID(id)
	if err != nil {
		return fmt.Errorf("update audio url: get chunk by id %d: %w", id, err)
	}
	chunk.AudioURL = audioURL
	if err := s.repo.Update(chunk); err != nil {
		return fmt.Errorf("update audio url for chunk %d: %w", id, err)
	}
	return nil
}

func (s *ChunkService) Delete(id uint) error {
	if err := s.repo.Delete(id); err != nil {
		return fmt.Errorf("delete chunk %d: %w", id, err)
	}
	return nil
}

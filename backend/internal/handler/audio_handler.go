package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/lingo-cube/speaking-engine/backend/internal/middleware"
	"github.com/lingo-cube/speaking-engine/backend/internal/service"
)

type AudioHandler struct {
	audioService *service.AudioService
}

func NewAudioHandler(audioService *service.AudioService) *AudioHandler {
	return &AudioHandler{audioService: audioService}
}

// Upload handles multipart file upload for a chunk's audio.
func (h *AudioHandler) Upload(c *gin.Context) {
	chunkID, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		middleware.RespondError(c, http.StatusBadRequest, "invalid chunk id")
		return
	}

	file, header, err := c.Request.FormFile("audio")
	if err != nil {
		middleware.RespondError(c, http.StatusBadRequest, "audio file is required")
		return
	}
	defer file.Close()

	if err := h.audioService.UploadAudio(uint(chunkID), header.Filename, file); err != nil {
		middleware.RespondError(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "audio uploaded successfully"})
}

// GetAudioURL returns the audio URL for a chunk.
func (h *AudioHandler) GetAudioURL(c *gin.Context) {
	chunkID, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		middleware.RespondError(c, http.StatusBadRequest, "invalid chunk id")
		return
	}

	url, err := h.audioService.GetAudioURL(uint(chunkID))
	if err != nil {
		middleware.RespondError(c, http.StatusNotFound, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{"audio_url": url})
}

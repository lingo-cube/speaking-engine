package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/lingo-cube/speaking-engine/internal/middleware"
	"github.com/lingo-cube/speaking-engine/internal/service"
)

type ChunkHandler struct {
	service *service.ChunkService
}

func NewChunkHandler(s *service.ChunkService) *ChunkHandler {
	return &ChunkHandler{service: s}
}

type updateChunkRequest struct {
	Text  string `json:"text" binding:"required"`
	Order int    `json:"order" binding:"required"`
}

func (h *ChunkHandler) Update(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		middleware.RespondError(c, http.StatusBadRequest, "invalid chunk id")
		return
	}
	var req updateChunkRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		middleware.RespondError(c, http.StatusBadRequest, err.Error())
		return
	}
	chunk, err := h.service.Update(uint(id), req.Text, req.Order)
	if err != nil {
		middleware.RespondError(c, http.StatusNotFound, err.Error())
		return
	}
	c.JSON(http.StatusOK, chunk)
}

func (h *ChunkHandler) GetByID(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		middleware.RespondError(c, http.StatusBadRequest, "invalid chunk id")
		return
	}
	chunk, err := h.service.GetByID(uint(id))
	if err != nil {
		middleware.RespondError(c, http.StatusNotFound, err.Error())
		return
	}
	c.JSON(http.StatusOK, chunk)
}

func (h *ChunkHandler) Delete(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		middleware.RespondError(c, http.StatusBadRequest, "invalid chunk id")
		return
	}
	if err := h.service.Delete(uint(id)); err != nil {
		middleware.RespondError(c, http.StatusNotFound, err.Error())
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}

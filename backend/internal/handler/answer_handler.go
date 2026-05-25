package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/lingo-cube/speaking-engine/backend/internal/model"
	"github.com/lingo-cube/speaking-engine/backend/internal/middleware"
	"github.com/lingo-cube/speaking-engine/backend/internal/service"
)

type AnswerHandler struct {
	answerService *service.AnswerService
	chunkService  *service.ChunkService
}

func NewAnswerHandler(answerService *service.AnswerService, chunkService *service.ChunkService) *AnswerHandler {
	return &AnswerHandler{
		answerService: answerService,
		chunkService:  chunkService,
	}
}

type createAnswerRequest struct {
	QuestionID uint   `json:"question_id" binding:"required"`
	Text       string `json:"text" binding:"required"`
}

func (h *AnswerHandler) Create(c *gin.Context) {
	var req createAnswerRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		middleware.RespondError(c, http.StatusBadRequest, err.Error())
		return
	}
	answer, err := h.answerService.CreateAnswer(req.QuestionID, req.Text)
	if err != nil {
		middleware.RespondError(c, http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusCreated, answer)
}

func (h *AnswerHandler) GetByQuestionID(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		middleware.RespondError(c, http.StatusBadRequest, "invalid question id")
		return
	}
	answer, err := h.answerService.GetByQuestionID(uint(id))
	if err != nil {
		middleware.RespondError(c, http.StatusNotFound, err.Error())
		return
	}
	c.JSON(http.StatusOK, answer)
}

func (h *AnswerHandler) GetByID(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		middleware.RespondError(c, http.StatusBadRequest, "invalid answer id")
		return
	}
	answer, err := h.answerService.GetByID(uint(id))
	if err != nil {
		middleware.RespondError(c, http.StatusNotFound, err.Error())
		return
	}
	c.JSON(http.StatusOK, answer)
}

type updateAnswerRequest struct {
	QuestionID uint `json:"question_id" binding:"required"`
}

func (h *AnswerHandler) Update(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		middleware.RespondError(c, http.StatusBadRequest, "invalid answer id")
		return
	}
	var req updateAnswerRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		middleware.RespondError(c, http.StatusBadRequest, err.Error())
		return
	}
	answer, err := h.answerService.Update(uint(id), req.QuestionID)
	if err != nil {
		middleware.RespondError(c, http.StatusNotFound, err.Error())
		return
	}
	c.JSON(http.StatusOK, answer)
}

func (h *AnswerHandler) Delete(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		middleware.RespondError(c, http.StatusBadRequest, "invalid answer id")
		return
	}
	if err := h.answerService.Delete(uint(id)); err != nil {
		middleware.RespondError(c, http.StatusNotFound, err.Error())
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}

func (h *AnswerHandler) GetChunks(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		middleware.RespondError(c, http.StatusBadRequest, "invalid answer id")
		return
	}
	chunks, err := h.chunkService.ListByAnswerID(uint(id))
	if err != nil {
		middleware.RespondError(c, http.StatusNotFound, err.Error())
		return
	}
	if chunks == nil {
		chunks = []model.Chunk{}
	}
	c.JSON(http.StatusOK, chunks)
}

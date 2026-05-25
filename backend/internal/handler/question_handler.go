package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/lingo-cube/speaking-engine/backend/internal/model"
	"github.com/lingo-cube/speaking-engine/backend/internal/service"
	"github.com/lingo-cube/speaking-engine/backend/internal/middleware"
)

type QuestionHandler struct {
	service *service.QuestionService
}

func NewQuestionHandler(s *service.QuestionService) *QuestionHandler {
	return &QuestionHandler{service: s}
}

type createQuestionRequest struct {
	TopicCode string `json:"topic_code" binding:"required"`
	Question  string `json:"question" binding:"required"`
	Type      string `json:"type" binding:"required"`
	Framework string `json:"framework" binding:"required"`
}

type updateQuestionRequest struct {
	TopicCode string `json:"topic_code" binding:"required"`
	Question  string `json:"question" binding:"required"`
	Type      string `json:"type" binding:"required"`
	Framework string `json:"framework" binding:"required"`
}

func (h *QuestionHandler) Create(c *gin.Context) {
	var req createQuestionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		middleware.RespondError(c, http.StatusBadRequest, err.Error())
		return
	}
	q, err := h.service.Create(req.TopicCode, req.Question, req.Type, req.Framework)
	if err != nil {
		middleware.RespondError(c, http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusCreated, q)
}

func (h *QuestionHandler) ListByTopicCode(c *gin.Context) {
	topicCode := c.Param("code")
	questions, err := h.service.ListByTopicCode(topicCode)
	if err != nil {
		middleware.RespondError(c, http.StatusNotFound, err.Error())
		return
	}
	if questions == nil {
		questions = []model.Question{}
	}
	c.JSON(http.StatusOK, questions)
}

func (h *QuestionHandler) GetByID(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		middleware.RespondError(c, http.StatusBadRequest, "invalid question id")
		return
	}
	q, err := h.service.GetByID(uint(id))
	if err != nil {
		middleware.RespondError(c, http.StatusNotFound, err.Error())
		return
	}
	c.JSON(http.StatusOK, q)
}

func (h *QuestionHandler) Update(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		middleware.RespondError(c, http.StatusBadRequest, "invalid question id")
		return
	}
	var req updateQuestionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		middleware.RespondError(c, http.StatusBadRequest, err.Error())
		return
	}
	q, err := h.service.Update(uint(id), req.TopicCode, req.Question, req.Type, req.Framework)
	if err != nil {
		middleware.RespondError(c, http.StatusNotFound, err.Error())
		return
	}
	c.JSON(http.StatusOK, q)
}

func (h *QuestionHandler) Delete(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		middleware.RespondError(c, http.StatusBadRequest, "invalid question id")
		return
	}
	if err := h.service.Delete(uint(id)); err != nil {
		middleware.RespondError(c, http.StatusNotFound, err.Error())
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}

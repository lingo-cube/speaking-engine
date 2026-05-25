package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/lingo-cube/speaking-engine/internal/model"
	"github.com/lingo-cube/speaking-engine/internal/service"
	"github.com/lingo-cube/speaking-engine/internal/middleware"
)

type TopicHandler struct {
	service *service.TopicService
}

func NewTopicHandler(s *service.TopicService) *TopicHandler {
	return &TopicHandler{service: s}
}

type createTopicRequest struct {
	Code     string `json:"code" binding:"required"`
	Category string `json:"category" binding:"required"`
	Name     string `json:"name" binding:"required"`
}

type updateTopicRequest struct {
	Code     string `json:"code" binding:"required"`
	Category string `json:"category" binding:"required"`
	Name     string `json:"name" binding:"required"`
}

func (h *TopicHandler) Create(c *gin.Context) {
	var req createTopicRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		middleware.RespondError(c, http.StatusBadRequest, err.Error())
		return
	}
	topic, err := h.service.Create(req.Code, req.Category, req.Name)
	if err != nil {
		middleware.RespondError(c, http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusCreated, topic)
}

func (h *TopicHandler) List(c *gin.Context) {
	category := c.Query("category")
	topics, err := h.service.List(category)
	if err != nil {
		middleware.RespondError(c, http.StatusInternalServerError, err.Error())
		return
	}
	if topics == nil {
		topics = []model.Topic{}
	}
	c.JSON(http.StatusOK, topics)
}

func (h *TopicHandler) GetByCode(c *gin.Context) {
	code := c.Param("code")
	topic, err := h.service.GetByCode(code)
	if err != nil {
		middleware.RespondError(c, http.StatusNotFound, err.Error())
		return
	}
	c.JSON(http.StatusOK, topic)
}

func (h *TopicHandler) Update(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		middleware.RespondError(c, http.StatusBadRequest, "invalid topic id")
		return
	}
	var req updateTopicRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		middleware.RespondError(c, http.StatusBadRequest, err.Error())
		return
	}
	topic, err := h.service.Update(uint(id), req.Code, req.Category, req.Name)
	if err != nil {
		middleware.RespondError(c, http.StatusNotFound, err.Error())
		return
	}
	c.JSON(http.StatusOK, topic)
}

func (h *TopicHandler) Delete(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		middleware.RespondError(c, http.StatusBadRequest, "invalid topic id")
		return
	}
	if err := h.service.Delete(uint(id)); err != nil {
		middleware.RespondError(c, http.StatusNotFound, err.Error())
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}

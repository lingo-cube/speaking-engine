package service

import (
	"fmt"

	"github.com/lingo-cube/speaking-engine/backend/internal/model"
	"github.com/lingo-cube/speaking-engine/backend/internal/repository"
)

type TopicService struct {
	repo *repository.TopicRepository
}

func NewTopicService(repo *repository.TopicRepository) *TopicService {
	return &TopicService{repo: repo}
}

func (s *TopicService) Create(code, category, name string) (*model.Topic, error) {
	topic := &model.Topic{
		Code:     code,
		Category: category,
		Name:     name,
	}
	if err := s.repo.Create(topic); err != nil {
		return nil, fmt.Errorf("create topic: %w", err)
	}
	return topic, nil
}

func (s *TopicService) List(category string) ([]model.Topic, error) {
	if category != "" {
		return s.repo.ListByCategory(category)
	}
	return s.repo.List()
}

func (s *TopicService) GetByCode(code string) (*model.Topic, error) {
	topic, err := s.repo.GetByCode(code)
	if err != nil {
		return nil, fmt.Errorf("get topic by code %q: %w", code, err)
	}
	return topic, nil
}

func (s *TopicService) GetByID(id uint) (*model.Topic, error) {
	topic, err := s.repo.GetByID(id)
	if err != nil {
		return nil, fmt.Errorf("get topic by id %d: %w", id, err)
	}
	return topic, nil
}

func (s *TopicService) Update(id uint, code, category, name string) (*model.Topic, error) {
	topic, err := s.repo.GetByID(id)
	if err != nil {
		return nil, fmt.Errorf("update topic: get by id %d: %w", id, err)
	}
	topic.Code = code
	topic.Category = category
	topic.Name = name
	if err := s.repo.Update(topic); err != nil {
		return nil, fmt.Errorf("update topic %d: %w", id, err)
	}
	return topic, nil
}

func (s *TopicService) Delete(id uint) error {
	if err := s.repo.Delete(id); err != nil {
		return fmt.Errorf("delete topic %d: %w", id, err)
	}
	return nil
}

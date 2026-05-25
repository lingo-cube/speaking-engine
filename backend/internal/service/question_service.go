package service

import (
	"fmt"

	"github.com/lingo-cube/speaking-engine/backend/internal/model"
	"github.com/lingo-cube/speaking-engine/backend/internal/repository"
)

type QuestionService struct {
	repo *repository.QuestionRepository
}

func NewQuestionService(repo *repository.QuestionRepository) *QuestionService {
	return &QuestionService{repo: repo}
}

func (s *QuestionService) Create(topicCode, question, qtype, framework string) (*model.Question, error) {
	q := &model.Question{
		TopicCode: topicCode,
		Question:  question,
		Type:      qtype,
		Framework: framework,
	}
	if err := s.repo.Create(q); err != nil {
		return nil, fmt.Errorf("create question: %w", err)
	}
	return q, nil
}

func (s *QuestionService) ListByTopicCode(topicCode string) ([]model.Question, error) {
	questions, err := s.repo.ListByTopicCode(topicCode)
	if err != nil {
		return nil, fmt.Errorf("list questions by topic code %q: %w", topicCode, err)
	}
	return questions, nil
}

func (s *QuestionService) GetByID(id uint) (*model.Question, error) {
	q, err := s.repo.GetByID(id)
	if err != nil {
		return nil, fmt.Errorf("get question by id %d: %w", id, err)
	}
	return q, nil
}

func (s *QuestionService) Update(id uint, topicCode, question, qtype, framework string) (*model.Question, error) {
	q, err := s.repo.GetByID(id)
	if err != nil {
		return nil, fmt.Errorf("update question: get by id %d: %w", id, err)
	}
	q.TopicCode = topicCode
	q.Question = question
	q.Type = qtype
	q.Framework = framework
	if err := s.repo.Update(q); err != nil {
		return nil, fmt.Errorf("update question %d: %w", id, err)
	}
	return q, nil
}

func (s *QuestionService) Delete(id uint) error {
	if err := s.repo.Delete(id); err != nil {
		return fmt.Errorf("delete question %d: %w", id, err)
	}
	return nil
}

package service

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/lingo-cube/speaking-engine/internal/model"
	"github.com/lingo-cube/speaking-engine/internal/repository"
)

type AnswerService struct {
	answerRepo *repository.AnswerRepository
	chunkRepo  *repository.ChunkRepository
}

func NewAnswerService(answerRepo *repository.AnswerRepository, chunkRepo *repository.ChunkRepository) *AnswerService {
	return &AnswerService{
		answerRepo: answerRepo,
		chunkRepo:  chunkRepo,
	}
}

// splitSentences splits text into sentences by . ! ? followed by a space or end of string.
func splitSentences(text string) []string {
	re := regexp.MustCompile(`[.!?](\s+|$)`)
	parts := re.Split(text, -1)

	var sentences []string
	for _, part := range parts {
		trimmed := strings.TrimSpace(part)
		if trimmed != "" {
			sentences = append(sentences, trimmed)
		}
	}
	return sentences
}

// CreateAnswer creates an answer record and splits the text into chunk records.
func (s *AnswerService) CreateAnswer(questionID uint, text string) (*model.Answer, error) {
	answer := &model.Answer{
		QuestionID: questionID,
	}
	if err := s.answerRepo.Create(answer); err != nil {
		return nil, fmt.Errorf("create answer: %w", err)
	}

	sentences := splitSentences(text)
	for i, sentence := range sentences {
		chunk := &model.Chunk{
			AnswerID: answer.ID,
			Order:    i + 1,
			Text:     sentence,
		}
		if err := s.chunkRepo.Create(chunk); err != nil {
			return nil, fmt.Errorf("create chunk %d for answer %d: %w", i, answer.ID, err)
		}
	}

	return answer, nil
}

func (s *AnswerService) GetByQuestionID(questionID uint) (*model.Answer, error) {
	answer, err := s.answerRepo.GetByQuestionID(questionID)
	if err != nil {
		return nil, fmt.Errorf("get answer by question id %d: %w", questionID, err)
	}
	return answer, nil
}

func (s *AnswerService) GetByID(id uint) (*model.Answer, error) {
	answer, err := s.answerRepo.GetByID(id)
	if err != nil {
		return nil, fmt.Errorf("get answer by id %d: %w", id, err)
	}
	return answer, nil
}

func (s *AnswerService) Update(id, questionID uint) (*model.Answer, error) {
	answer, err := s.answerRepo.GetByID(id)
	if err != nil {
		return nil, fmt.Errorf("update answer: get by id %d: %w", id, err)
	}
	answer.QuestionID = questionID
	if err := s.answerRepo.Update(answer); err != nil {
		return nil, fmt.Errorf("update answer %d: %w", id, err)
	}
	return answer, nil
}

func (s *AnswerService) Delete(id uint) error {
	if err := s.answerRepo.Delete(id); err != nil {
		return fmt.Errorf("delete answer %d: %w", id, err)
	}
	return nil
}

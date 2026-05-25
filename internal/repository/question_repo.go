package repository

import (
	"github.com/lingo-cube/speaking-engine/internal/model"

	"gorm.io/gorm"
)

type QuestionRepository struct {
	db *gorm.DB
}

func NewQuestionRepository(db *gorm.DB) *QuestionRepository {
	return &QuestionRepository{db: db}
}

func (r *QuestionRepository) Create(question *model.Question) error {
	return r.db.Create(question).Error
}

func (r *QuestionRepository) ListByTopicCode(topicCode string) ([]model.Question, error) {
	var questions []model.Question
	err := r.db.Where("topic_code = ?", topicCode).Order("created_at asc").Find(&questions).Error
	return questions, err
}

func (r *QuestionRepository) GetByID(id uint) (*model.Question, error) {
	var question model.Question
	err := r.db.First(&question, id).Error
	if err != nil {
		return nil, err
	}
	return &question, nil
}

func (r *QuestionRepository) Update(question *model.Question) error {
	return r.db.Save(question).Error
}

func (r *QuestionRepository) Delete(id uint) error {
	return r.db.Delete(&model.Question{}, id).Error
}

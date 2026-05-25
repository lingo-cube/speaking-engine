package repository

import (
	"github.com/lingo-cube/speaking-engine/internal/model"

	"gorm.io/gorm"
)

type AnswerRepository struct {
	db *gorm.DB
}

func NewAnswerRepository(db *gorm.DB) *AnswerRepository {
	return &AnswerRepository{db: db}
}

func (r *AnswerRepository) Create(answer *model.Answer) error {
	return r.db.Create(answer).Error
}

func (r *AnswerRepository) GetByQuestionID(questionID uint) (*model.Answer, error) {
	var answer model.Answer
	err := r.db.Where("question_id = ?", questionID).First(&answer).Error
	if err != nil {
		return nil, err
	}
	return &answer, nil
}

func (r *AnswerRepository) GetByID(id uint) (*model.Answer, error) {
	var answer model.Answer
	err := r.db.First(&answer, id).Error
	if err != nil {
		return nil, err
	}
	return &answer, nil
}

func (r *AnswerRepository) Update(answer *model.Answer) error {
	return r.db.Save(answer).Error
}

func (r *AnswerRepository) Delete(id uint) error {
	return r.db.Delete(&model.Answer{}, id).Error
}

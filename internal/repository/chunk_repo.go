package repository

import (
	"github.com/lingo-cube/speaking-engine/internal/model"

	"gorm.io/gorm"
)

type ChunkRepository struct {
	db *gorm.DB
}

func NewChunkRepository(db *gorm.DB) *ChunkRepository {
	return &ChunkRepository{db: db}
}

func (r *ChunkRepository) Create(chunk *model.Chunk) error {
	return r.db.Create(chunk).Error
}

func (r *ChunkRepository) ListByAnswerID(answerID uint) ([]model.Chunk, error) {
	var chunks []model.Chunk
	err := r.db.Where("answer_id = ?", answerID).Order("`order` asc").Find(&chunks).Error
	return chunks, err
}

func (r *ChunkRepository) GetByID(id uint) (*model.Chunk, error) {
	var chunk model.Chunk
	err := r.db.First(&chunk, id).Error
	if err != nil {
		return nil, err
	}
	return &chunk, nil
}

func (r *ChunkRepository) Update(chunk *model.Chunk) error {
	return r.db.Save(chunk).Error
}

func (r *ChunkRepository) Delete(id uint) error {
	return r.db.Delete(&model.Chunk{}, id).Error
}

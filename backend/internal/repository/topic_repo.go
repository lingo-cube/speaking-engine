package repository

import (
	"github.com/lingo-cube/speaking-engine/backend/internal/model"

	"gorm.io/gorm"
)

type TopicRepository struct {
	db *gorm.DB
}

func NewTopicRepository(db *gorm.DB) *TopicRepository {
	return &TopicRepository{db: db}
}

func (r *TopicRepository) Create(topic *model.Topic) error {
	return r.db.Create(topic).Error
}

func (r *TopicRepository) List() ([]model.Topic, error) {
	var topics []model.Topic
	err := r.db.Order("created_at desc").Find(&topics).Error
	return topics, err
}

func (r *TopicRepository) ListByCategory(category string) ([]model.Topic, error) {
	var topics []model.Topic
	err := r.db.Where("category = ?", category).Order("created_at desc").Find(&topics).Error
	return topics, err
}

func (r *TopicRepository) GetByCode(code string) (*model.Topic, error) {
	var topic model.Topic
	err := r.db.Where("code = ?", code).First(&topic).Error
	if err != nil {
		return nil, err
	}
	return &topic, nil
}

func (r *TopicRepository) GetByID(id uint) (*model.Topic, error) {
	var topic model.Topic
	err := r.db.First(&topic, id).Error
	if err != nil {
		return nil, err
	}
	return &topic, nil
}

func (r *TopicRepository) Update(topic *model.Topic) error {
	return r.db.Save(topic).Error
}

func (r *TopicRepository) Delete(id uint) error {
	return r.db.Delete(&model.Topic{}, id).Error
}

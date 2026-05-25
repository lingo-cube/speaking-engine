package model

import "time"

type Chunk struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	AnswerID  uint      `gorm:"index" json:"answer_id"`
	Order     int       `json:"order"`
	Text      string    `gorm:"type:text" json:"text"`
	AudioURL  string    `gorm:"size:500" json:"audio_url"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (Chunk) TableName() string {
	return "chunks"
}

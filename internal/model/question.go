package model

import "time"

type Question struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	TopicCode string    `gorm:"size:50;index" json:"topic_code"`
	Question  string    `gorm:"type:text" json:"question"`
	Type      string    `gorm:"size:50" json:"type"`
	Framework string    `gorm:"size:100" json:"framework"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (Question) TableName() string {
	return "questions"
}

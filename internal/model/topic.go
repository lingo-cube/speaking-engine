package model

import "time"

type Topic struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Code      string    `gorm:"uniqueIndex;size:50" json:"code"`
	Category  string    `gorm:"size:50" json:"category"`
	Name      string    `gorm:"size:100" json:"name"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (Topic) TableName() string {
	return "topics"
}

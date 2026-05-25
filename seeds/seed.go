package seeds

import (
	"log"

	"github.com/lingo-cube/speaking-engine/internal/model"
	"gorm.io/gorm"
)

// Run inserts sample IELTS data into the database.
func Run(db *gorm.DB) {
	log.Println("Seeding database...")

	topics := []model.Topic{
		{Code: "hometown", Category: "ielts", Name: "Hometown"},
		{Code: "school", Category: "ielts", Name: "School"},
		{Code: "work", Category: "ielts", Name: "Work"},
		{Code: "technology", Category: "ielts", Name: "Technology"},
		{Code: "friends", Category: "ielts", Name: "Friends"},
	}

	for _, t := range topics {
		if err := db.Where("code = ?", t.Code).FirstOrCreate(&t).Error; err != nil {
			log.Printf("Warning: failed to seed topic %s: %v", t.Code, err)
		}
	}

	questions := []model.Question{
		// Hometown
		{TopicCode: "hometown", Question: "Where is your hometown?", Type: "part1", Framework: "description"},
		{TopicCode: "hometown", Question: "What do you like most about your hometown?", Type: "part1", Framework: "opinion"},
		{TopicCode: "hometown", Question: "Has your hometown changed much since you were a child?", Type: "part1", Framework: "comparison"},
		// School
		{TopicCode: "school", Question: "What subject did you enjoy most at school?", Type: "part1", Framework: "experience"},
		{TopicCode: "school", Question: "Do you think school prepares students well for the future?", Type: "part3", Framework: "evaluation"},
		{TopicCode: "school", Question: "Describe a teacher who influenced you.", Type: "part2", Framework: "description"},
		// Work
		{TopicCode: "work", Question: "What do you do for a living?", Type: "part1", Framework: "description"},
		{TopicCode: "work", Question: "What is the most challenging part of your job?", Type: "part1", Framework: "opinion"},
		{TopicCode: "work", Question: "Do you prefer working in a team or alone?", Type: "part1", Framework: "preference"},
		// Technology
		{TopicCode: "technology", Question: "How often do you use the internet?", Type: "part1", Framework: "frequency"},
		{TopicCode: "technology", Question: "What are the benefits of modern technology?", Type: "part3", Framework: "evaluation"},
		{TopicCode: "technology", Question: "Describe a piece of technology you find useful.", Type: "part2", Framework: "description"},
		// Friends
		{TopicCode: "friends", Question: "How often do you spend time with friends?", Type: "part1", Framework: "frequency"},
		{TopicCode: "friends", Question: "What makes a good friend?", Type: "part3", Framework: "opinion"},
		{TopicCode: "friends", Question: "Describe your best friend.", Type: "part2", Framework: "description"},
	}

	for _, q := range questions {
		if err := db.Where("topic_code = ? AND question = ?", q.TopicCode, q.Question).FirstOrCreate(&q).Error; err != nil {
			log.Printf("Warning: failed to seed question for topic %s: %v", q.TopicCode, err)
		}
	}

	log.Println("Seeding completed.")
}

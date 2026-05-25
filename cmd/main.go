package main

import (
	"flag"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/lingo-cube/speaking-engine/internal/config"
	"github.com/lingo-cube/speaking-engine/internal/handler"
	"github.com/lingo-cube/speaking-engine/internal/middleware"
	"github.com/lingo-cube/speaking-engine/internal/model"
	"github.com/lingo-cube/speaking-engine/internal/repository"
	"github.com/lingo-cube/speaking-engine/internal/service"
	"github.com/lingo-cube/speaking-engine/internal/storage"
	"github.com/lingo-cube/speaking-engine/seeds"
	"go.uber.org/zap"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	seedFlag := flag.Bool("seed", false, "run database seed")
	flag.Parse()

	// Load config
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	// Init logger
	logger, err := zap.NewProduction()
	if err != nil {
		log.Fatalf("Failed to init logger: %v", err)
	}
	defer logger.Sync()

	// Connect to MySQL
	var db *gorm.DB
	if cfg.DBDSN != "" {
		db, err = gorm.Open(mysql.Open(cfg.DBDSN), &gorm.Config{})
		if err != nil {
			logger.Fatal("Failed to connect to database", zap.Error(err))
		}
		logger.Info("Connected to MySQL database")
	} else {
		logger.Warn("DB_DSN is empty, running without database")
	}

	// AutoMigrate
	if db != nil {
		if err := db.AutoMigrate(
			&model.Topic{},
			&model.Question{},
			&model.Answer{},
			&model.Chunk{},
		); err != nil {
			logger.Fatal("Failed to migrate database", zap.Error(err))
		}
		logger.Info("Database migration completed")
	}

	// Run seed if flag is set
	if *seedFlag {
		if db != nil {
			seeds.Run(db)
		} else {
			logger.Warn("Cannot seed: no database connection")
		}
		return
	}

	// Init storage provider
	var storageProvider storage.Provider
	switch cfg.StorageProvider {
	case "oss":
		storageProvider = storage.NewOSSProvider(
			cfg.StorageEndpoint,
			cfg.StorageAccessKey,
			cfg.StorageSecretKey,
			cfg.StorageBucket,
		)
		logger.Info("Using OSS storage provider")
	default:
		storageProvider = storage.NewMockProvider()
		logger.Info("Using mock storage provider")
	}

	// Init repositories
	topicRepo := repository.NewTopicRepository(db)
	questionRepo := repository.NewQuestionRepository(db)
	answerRepo := repository.NewAnswerRepository(db)
	chunkRepo := repository.NewChunkRepository(db)

	// Init services
	topicService := service.NewTopicService(topicRepo)
	questionService := service.NewQuestionService(questionRepo)
	answerService := service.NewAnswerService(answerRepo, chunkRepo)
	chunkService := service.NewChunkService(chunkRepo)
	audioService := service.NewAudioService(storageProvider, chunkService)

	// Init handlers
	topicHandler := handler.NewTopicHandler(topicService)
	questionHandler := handler.NewQuestionHandler(questionService)
	answerHandler := handler.NewAnswerHandler(answerService, chunkService)
	chunkHandler := handler.NewChunkHandler(chunkService)
	audioHandler := handler.NewAudioHandler(audioService)

	// Setup Gin router
	ginMode := os.Getenv("GIN_MODE")
	if ginMode != "" {
		gin.SetMode(ginMode)
	}
	r := gin.New()
	r.Use(middleware.CORS())
	r.Use(middleware.Logger(logger))
	r.Use(gin.Recovery())

	// Register routes
	api := r.Group("/api/v1")
	{
		// Topics
		api.GET("/topics", topicHandler.List)
		api.GET("/topics/:code/questions", questionHandler.ListByTopicCode)
		api.POST("/topics", topicHandler.Create)
		api.PUT("/topics/:id", topicHandler.Update)
		api.DELETE("/topics/:id", topicHandler.Delete)

		// Questions
		api.POST("/questions", questionHandler.Create)
		api.GET("/questions/:id", questionHandler.GetByID)
		api.PUT("/questions/:id", questionHandler.Update)
		api.DELETE("/questions/:id", questionHandler.Delete)
		api.GET("/questions/:id/answer", answerHandler.GetByQuestionID)

		// Answers
		api.POST("/answers", answerHandler.Create)
		api.GET("/answers/:id", answerHandler.GetByID)
		api.PUT("/answers/:id", answerHandler.Update)
		api.DELETE("/answers/:id", answerHandler.Delete)
		api.GET("/answers/:id/chunks", answerHandler.GetChunks)

		// Chunks
		api.GET("/chunks/:id", chunkHandler.GetByID)
		api.PUT("/chunks/:id", chunkHandler.Update)
		api.DELETE("/chunks/:id", chunkHandler.Delete)

		// Audio
		api.POST("/chunks/:id/audio", audioHandler.Upload)
		api.GET("/chunks/:id/audio-url", audioHandler.GetAudioURL)
	}

	// Start server
	addr := ":" + cfg.ServerPort
	logger.Info("Starting server", zap.String("addr", addr))
	if err := r.Run(addr); err != nil {
		logger.Fatal("Failed to start server", zap.Error(err))
	}
}

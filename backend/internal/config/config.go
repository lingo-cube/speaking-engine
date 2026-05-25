package config

import (
	"github.com/spf13/viper"
)

type Config struct {
	DBDSN            string `mapstructure:"DB_DSN"`
	StorageProvider  string `mapstructure:"STORAGE_PROVIDER"`
	StorageEndpoint  string `mapstructure:"STORAGE_ENDPOINT"`
	StorageAccessKey string `mapstructure:"STORAGE_ACCESS_KEY"`
	StorageSecretKey string `mapstructure:"STORAGE_SECRET_KEY"`
	StorageBucket    string `mapstructure:"STORAGE_BUCKET"`
	ServerPort       string `mapstructure:"SERVER_PORT"`
}

func Load() (*Config, error) {
	v := viper.New()
	v.SetDefault("DB_DSN", "root:password@tcp(127.0.0.1:3306)/speaking_engine?charset=utf8mb4&parseTime=True&loc=Local")
	v.SetDefault("STORAGE_PROVIDER", "mock")
	v.SetDefault("SERVER_PORT", "8080")

	v.AutomaticEnv()

	var cfg Config
	if err := v.Unmarshal(&cfg); err != nil {
		return nil, err
	}
	return &cfg, nil
}

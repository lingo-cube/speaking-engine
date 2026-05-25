package storage

import (
	"context"
	"io"
)

// Provider defines the interface for file storage operations.
type Provider interface {
	Upload(ctx context.Context, key string, reader io.Reader) error
	GetURL(ctx context.Context, key string) (string, error)
	Delete(ctx context.Context, key string) error
}

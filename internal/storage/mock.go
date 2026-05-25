package storage

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"sync"
)

// MockProvider is an in-memory storage provider for development.
type MockProvider struct {
	mu   sync.RWMutex
	data map[string][]byte
}

func NewMockProvider() *MockProvider {
	return &MockProvider{
		data: make(map[string][]byte),
	}
}

func (m *MockProvider) Upload(_ context.Context, key string, reader io.Reader) error {
	buf := new(bytes.Buffer)
	if _, err := io.Copy(buf, reader); err != nil {
		return fmt.Errorf("mock upload: failed to read data: %w", err)
	}
	m.mu.Lock()
	defer m.mu.Unlock()
	m.data[key] = buf.Bytes()
	return nil
}

func (m *MockProvider) GetURL(_ context.Context, key string) (string, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	if _, ok := m.data[key]; !ok {
		return "", fmt.Errorf("mock storage: key %q not found", key)
	}
	return fmt.Sprintf("/local-storage/%s", key), nil
}

func (m *MockProvider) Delete(_ context.Context, key string) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if _, ok := m.data[key]; !ok {
		return fmt.Errorf("mock storage: key %q not found", key)
	}
	delete(m.data, key)
	return nil
}

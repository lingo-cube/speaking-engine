package storage

import (
	"context"
	"fmt"
	"io"
)

// OSSProvider implements storage.Provider using Alibaba Cloud OSS.
// TODO: Replace placeholder logic with actual OSS SDK integration.
type OSSProvider struct {
	endpoint    string
	accessKey   string
	secretKey   string
	bucketName  string
}

func NewOSSProvider(endpoint, accessKey, secretKey, bucketName string) *OSSProvider {
	return &OSSProvider{
		endpoint:   endpoint,
		accessKey:  accessKey,
		secretKey:  secretKey,
		bucketName: bucketName,
	}
}

// Upload uploads a file to Alibaba Cloud OSS.
// TODO: Implement using github.com/aliyun/aliyun-oss-go-sdk/oss
func (o *OSSProvider) Upload(_ context.Context, key string, _ io.Reader) error {
	return fmt.Errorf("OSS Upload: not yet implemented for key %q; "+
		"integrate with aliyun-oss-go-sdk using bucket %s at %s", key, o.bucketName, o.endpoint)
}

// GetURL returns the OSS object URL.
// TODO: Implement using github.com/aliyun/aliyun-oss-go-sdk/oss
func (o *OSSProvider) GetURL(_ context.Context, key string) (string, error) {
	return fmt.Sprintf("https://%s.%s/%s", o.bucketName, o.endpoint, key), nil
}

// Delete removes a file from OSS.
// TODO: Implement using github.com/aliyun/aliyun-oss-go-sdk/oss
func (o *OSSProvider) Delete(_ context.Context, key string) error {
	return fmt.Errorf("OSS Delete: not yet implemented for key %q; "+
		"integrate with aliyun-oss-go-sdk using bucket %s at %s", key, o.bucketName, o.endpoint)
}

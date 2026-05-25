package middleware

import (
	"github.com/gin-gonic/gin"
)

// RespondError sends a JSON error response with the given status code and message.
func RespondError(c *gin.Context, statusCode int, message string) {
	c.JSON(statusCode, gin.H{
		"error": message,
	})
}

package controller

import (
	// "golang.org/x/crypto/bcrypt"
	"net/http"

	"github.com/SpringSapphire/SE-Sprint1Demo/entity"
	"github.com/gin-gonic/gin"
)

func ListCategories(c *gin.Context) {
	var categories []entity.Category
	if err := entity.DB().Raw("SELECT * FROM categorys").Scan(&categories).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": categories})
}

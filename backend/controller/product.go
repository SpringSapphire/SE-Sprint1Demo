package controller

import (
	// "golang.org/x/crypto/bcrypt"
	"net/http"

	"github.com/SpringSapphire/SE-Sprint1Demo/entity"
	"github.com/gin-gonic/gin"
)

func CreateProduct(c *gin.Context) {
	var product entity.Product
	var category entity.Category
	var supplier entity.Supplier

	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", product.CategoryID).First(&category); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "category not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", product.SupplierID).First(&supplier); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "supplier not found"})
		return
	}

	// hashPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "error hash password"})
	// }

	p := entity.Product{
		ProductName:        product.ProductName,
		Price:              product.Price,
		ProductPicture:     product.ProductPicture,
		ProductDescription: product.ProductDescription,
		DateAdded:          product.DateAdded,
		Category:           category,
		Supplier:           supplier,
	}

	// บันทึก
	if err := entity.DB().Create(&p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": p})
}

func GetProduct(c *gin.Context) {
	var product entity.Product
	id := c.Param("id")
	if err := entity.DB().Preload("Category").Preload("Supplier").Raw("SELECT * FROM products WHERE id = ?", id).Find(&product).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": product})
}

func ListProducts(c *gin.Context) {
	var products []entity.Product
	if err := entity.DB().Preload("Category").Preload("Supplier").Raw("SELECT * FROM products").Find(&products).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": products})
}

func DeleteProduct(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM products WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "product not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

func UpdateProduct(c *gin.Context) {
	var product entity.Product
	var result entity.Product

	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", product.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "product not found"})
		return
	}

	if err := entity.DB().Save(&product).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": product})
}

package controller

import (
	// "golang.org/x/crypto/bcrypt"
	"net/http"

	"github.com/SpringSapphire/SE-Sprint1Demo/entity"
	"github.com/gin-gonic/gin"
)

func CreateSupplier(c *gin.Context) {
	var supplier entity.Supplier

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&supplier); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง User
	s := entity.Supplier{
		SupplierName:        supplier.SupplierName,
		SupplierPicture:     supplier.SupplierPicture,
		SupplierDescription: supplier.SupplierDescription,
		SupplierTel:         supplier.SupplierTel,
	}

	// บันทึก
	if err := entity.DB().Create(&s).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": s})
}

// GET /users
func ListSuppliers(c *gin.Context) {
	var suppliers []entity.Supplier
	if err := entity.DB().Raw("SELECT * FROM suppliers").Find(&suppliers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": suppliers})
}

// DELETE /users/:id
func DeleteSupplier(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM suppliers WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "supplier not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

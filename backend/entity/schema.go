package entity

import (
	"time"

	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	ProductName        string `gorm:"uniqueIndex" valid:"required~Product name is required"`
	ProductPicture     string `gorm:"type:longtext"`
	Price              int    `valid:"required~Price is required, range(1|1000000)~Price must greater than zero"`
	ProductDescription string `valid:"required~Product description is required"`
	DateAdded          time.Time

	CategoryID *uint
	Category   Category `gorm:"reference:id"`

	SupplierID *uint
	Supplier   Supplier `gorm:"reference:id"`
}

type Category struct {
	gorm.Model
	CategoryName string `gorm:"uniqueIndex"`

	Product []Product `gorm:"foreignKey:CategoryID"`
}

type Supplier struct {
	gorm.Model
	SupplierName        string `gorm:"uniqueIndex" valid:"required~Supplier name is required"`
	SupplierPicture     string
	SupplierDescription string `valid:"required~Supplier description is required"`
	SupplierTel         string `valid:"required~Telephone is required, stringlength(10|10)"`

	Product []Product `gorm:"foreignKey:SupplierID"`
}

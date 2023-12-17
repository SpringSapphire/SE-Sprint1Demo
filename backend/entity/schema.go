package entity

import (
	"time"

	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	ProductName        string `gorm:"uniqueIndex"`
	ProductPicture     string `gorm:"type:longtext"`
	Price              int
	ProductDescription string
	DateAdded          time.Time

	CategoryID *uint
	Category   Category `gorm:"foreignKey:id"`

	SupplierID *uint
	Supplier   Supplier `gorm:"foreignKey:id"`
}

type Category struct {
	gorm.Model
	CategoryName string `gorm:"uniqueIndex"`

	Product []Product `gorm:"foreignKey:CategoryID"`
}

type Supplier struct {
	gorm.Model
	SupplierName        string `gorm:"uniqueIndex"`
	SupplierPicture     string
	SupplierDescription string
	SupplierTel         string

	Product []Product `gorm:"foreignKey:SupplierID"`
}

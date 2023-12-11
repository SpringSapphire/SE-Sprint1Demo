package entity

import (
	"time"

	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	ProductName    string `gorm:"uniqueIndex"`
	ProductPicture string `gorm:"type:longtext"`
	Price          int
	Description    string
	DateAdded      time.Time

	CategoryID *uint
	Category   Category `gorm:"references:id"`

	SupplierID *uint
	Supplier   Supplier `gorm:"references:id"`
}

type Category struct {
	gorm.Model
	CategoryName string `gorm:"uniqueIndex"`

	Product []Product `gorm:"foreignKey:CategoryID"`
}

type Supplier struct {
	gorm.Model
	SuplierName         string `gorm:"uniqueIndex"`
	SupplierDescription string

	Prodect []Product `gorm:"foreignKey:SupplierID"`
}

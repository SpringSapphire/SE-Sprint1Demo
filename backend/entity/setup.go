package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("zooproduct.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	// Migrate the schema
	database.AutoMigrate(
		&Product{},
		&Category{},
		&Supplier{},
	)

	db = database

	accessories := Category{
		CategoryName: "เครื่องประดับ",
	}
	db.Model(&Category{}).Create(&accessories)

	souvenir := Category{
		CategoryName: "ของที่ระลึก",
	}
	db.Model(&Category{}).Create(&souvenir)
}

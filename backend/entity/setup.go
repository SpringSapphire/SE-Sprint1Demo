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

	//Supplier
	factory1 := Supplier{
		SupplierName:        "โรงผลิต ZooZa",
		SupplierDescription: "โรงงานผลิตประจำสวนสัตว์ ZooZa",
		SupplierTel:         "0445658521",
	}
	db.Model(&Supplier{}).Create(&factory1)

	//Category
	accessories := Category{
		CategoryName: "เครื่องประดับ",
	}
	db.Model(&Category{}).Create(&accessories)

	souvenir := Category{
		CategoryName: "ของที่ระลึก",
	}
	db.Model(&Category{}).Create(&souvenir)

	stationery := Category{
		CategoryName: "เครื่องเขียน",
	}
	db.Model(&Category{}).Create(&stationery)

	decoration := Category{
		CategoryName: "ของตกแต่ง",
	}
	db.Model(&Category{}).Create(&decoration)

	toy := Category{
		CategoryName: "ของเล่น",
	}
	db.Model(&Category{}).Create(&toy)
}

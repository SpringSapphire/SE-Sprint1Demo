package unit

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"

	. "github.com/onsi/gomega"

	"github.com/SpringSapphire/SE-Sprint1Demo/entity"
)

func TestProduct(t *testing.T) {

	g := NewGomegaWithT(t)

	// t.Run(`success`, func(t *testing.T) {
	// 	var categoryID uint = 5
	// 	var supplierID uint = 1
	// 	product := entity.Product{
	// 		ProductName:        "ตุ๊กตา",
	// 		ProductPicture:     "",
	// 		Price:              120,
	// 		ProductDescription: "ตุ๊กตา",
	// 		DateAdded:          time.Now().UTC(),
	// 		CategoryID:         &categoryID,
	// 		SupplierID:         &supplierID,
	// 	}

	// 	ok, err := govalidator.ValidateStruct(product)

	// 	g.Expect(ok).To(BeTrue())
	// 	g.Expect(err).To(BeNil())

	// })

	t.Run(`Product description is required`, func(t *testing.T) {
		var categoryID uint = 5
		var supplierID uint = 1
		product := entity.Product{
			ProductName:        "ตุ๊กตา",
			ProductPicture:     "",
			Price:              120,
			ProductDescription: "",
			DateAdded:          time.Now().UTC(),
			CategoryID:         &categoryID,
			SupplierID:         &supplierID,
		}

		ok, err := govalidator.ValidateStruct(product)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Product description is required"))
	})

	t.Run(`Price must greater than zero`, func(t *testing.T) {
		var categoryID uint = 5
		var supplierID uint = 1
		product := entity.Product{
			ProductName:        "ตุ๊กตา",
			ProductPicture:     "",
			Price:              0,
			ProductDescription: "ตุ๊กตา",
			DateAdded:          time.Now(),
			CategoryID:         &categoryID,
			SupplierID:         &supplierID,
		}

		ok, err := govalidator.ValidateStruct(product)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Price must greater than zero"))
	})
}

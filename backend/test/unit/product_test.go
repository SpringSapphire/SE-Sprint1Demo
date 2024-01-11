package unit

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"

	. "github.com/onsi/gomega"

	"github.com/SpringSapphire/SE-Sprint1Demo/entity"
)

func TestStudentID(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`success`, func(t *testing.T) {
		product := entity.Product{
			ProductName:        "ตุ๊กตา",
			ProductPicture:     "",
			Price:              120,
			ProductDescription: "ตุกตา",
			DateAdded:          time.Now(),
			CategoryID:         5,
			SupplierID:         1,
		}

		ok, err := govalidator.ValidateStruct(product)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())

	})

	t.Run(`Product description is required`, func(t *testing.T) {
		product := entity.Product{
			ProductName:        "ตุ๊กตา",
			ProductPicture:     "",
			Price:              120,
			ProductDescription: "",
			DateAdded:          time.Now(),
			CategoryID:         5,
			SupplierID:         1,
		}

		ok, err := govalidator.ValidateStruct(product)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Product description is required"))
	})

	t.Run(`Price must greater than zero`, func(t *testing.T) {
		product := entity.Product{
			ProductName:        "ตุ๊กตา",
			ProductPicture:     "",
			Price:              0,
			ProductDescription: "ตุ๊กตา",
			DateAdded:          time.Now(),
			CategoryID:         5,
			SupplierID:         1,
		}

		ok, err := govalidator.ValidateStruct(product)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Price must greater than zero"))
	})
}
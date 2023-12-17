package main

import (
	"github.com/SpringSapphire/SE-Sprint1Demo/controller"
	"github.com/SpringSapphire/SE-Sprint1Demo/entity"
	"github.com/gin-gonic/gin"
)

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	r.POST("/products", controller.CreateProduct)
	r.POST("/supplier", controller.CreateSupplier)

	router := r.Group("")
	{
		// router.Use(middlewares.Authorizes())
		// {
		// User Routes
		router.GET("/products", controller.ListProducts)
		router.GET("/products/:id", controller.GetProduct)
		router.PATCH("/products", controller.UpdateProduct)
		router.DELETE("/product/:id", controller.DeleteProduct)
		//
		router.GET("/suppliers", controller.ListSuppliers)
		router.DELETE("/supplier/:id", controller.DeleteSupplier)

		// Gender Routes
		router.GET("/category", controller.ListCategories)
		// }
	}

	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

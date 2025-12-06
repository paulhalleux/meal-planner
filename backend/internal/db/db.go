package db

import (
	"backend/internal/model"
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Database struct {
	DB *gorm.DB
}

func NewDatabase() *Database {
	var database *gorm.DB
	var err error

	dbHostname := os.Getenv("DB_HOST")
	dbName := os.Getenv("POSTGRES_DB")
	dbUser := os.Getenv("POSTGRES_USER")
	dbPass := os.Getenv("POSTGRES_PASSWORD")
	dbPort := os.Getenv("DB_PORT")

	dbURl := fmt.Sprintf("postgres://%s:%s@%s:%s/%s", dbUser, dbPass, dbHostname, dbPort, dbName)

	for i := 1; i <= 3; i++ {
		database, err = gorm.Open(postgres.Open(dbURl), &gorm.Config{})
		if err == nil {
			break
		} else {
			log.Printf("Attempt %d: Failed to initialize database. Retrying...", i)
			time.Sleep(3 * time.Second)
		}
	}

	return &Database{
		DB: database,
	}
}

func (d *Database) AutoMigrate() error {
	return d.DB.AutoMigrate(
		&model.Unit{},
		&model.Ingredient{},
		&model.Recipe{},
		&model.RecipeIngredient{},
	)
}

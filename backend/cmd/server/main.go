package main

import (
	"backend/internal/db"
	"backend/internal/httpserver"
	"backend/internal/repository"
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

// @Title       Meal Planner API
// @Version     1.0.0
// @Description Meal Planner is an API service for planning meals and managing recipes.
// @Host      	localhost:8001
// @BasePath  	/api
func main() {
	ctx, cancel := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer cancel()

	err := godotenv.Load(".env")
	if err != nil {
		log.Printf("No .env file found: %v", err)
	}

	gin.SetMode(gin.DebugMode)

	database := db.NewDatabase()

	allergenRepo := repository.NewAllergenRepository(database.DB)

	httpAddr := getEnv("HTTP_ADDR", "")
	httpPort := getEnv("HTTP_PORT", "8080")
	httpSrv := httpserver.NewHttpServer(httpAddr, httpPort)

	httpSrv.RegisterApiHandler(httpserver.NewAllergensHandlers(allergenRepo))

	go httpSrv.Start()
	err = database.AutoMigrate()
	if err != nil {
		log.Fatalf("database migration error: %v", err)
	}

	<-ctx.Done()

	if err := httpSrv.Stop(); err != nil {
		log.Printf("http shutdown error: %v", err)
	}
}

func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

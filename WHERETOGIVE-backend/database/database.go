package database

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() *gorm.DB {
	err := godotenv.Load("config.env")

	if err != nil {
		log.Fatalf("Err: %s", err)
	}

	host := os.Getenv("HOST")
	user := "postgres"
	password := os.Getenv("PASSWORD")
	name := os.Getenv("NAME")
	port := os.Getenv("PORT")

	dsn := fmt.Sprintf("host=%v user=%v password=%v dbname=%v port=%v", host, user, password, name, port)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalln(err)
	}

	fmt.Printf("connected")

	return db
}

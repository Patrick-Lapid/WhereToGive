package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/routers"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func main() {
	fmt.Println("Starting server on port 8000")
	fmt.Println("Attempting to connect to DB...")
	/*cfg := mysql.Config{
		User:   os.Getenv("root"),
		Passwd: os.Getenv("letmein"),
		Net:    "tcp",
		Addr:   "127.0.0.1:3306",
		DBName: "where2give",
	}*/
	var err error
	var db *sql.DB
	db, err = sql.Open("mysql", "root:letmein@tcp(where2give)/sys")
	if err != nil {
		fmt.Println("Error validating sql.Open args")
		log.Fatal(err)
	}
	defer db.Close()
	pingErr := db.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
	}
	fmt.Println("Connected!")
	router := mux.NewRouter()

	routers.AddUserRouter(router)

	log.Fatal(http.ListenAndServe(":8000", router))

}

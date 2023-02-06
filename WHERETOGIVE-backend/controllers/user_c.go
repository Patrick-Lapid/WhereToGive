package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"

	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/models"
)

func GetUser(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	
	vars := mux.Vars(r)
	id, ok := vars["userID"]

	// Check if id is passed
    if !ok {
        log.Fatalln("id is missing in parameters")
		return
    }

	// Check integer conversion
	userID, errConv := strconv.Atoi(id)
	if errConv != nil {
		log.Fatalln("id is missing in parameters")
		return
	 }

	user := models.GetUser(userID);

	errAdd := json.NewEncoder(w).Encode(user)

	if errAdd != nil {
		log.Fatalln("Error encoding user")
	}
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	// Call create user from User model
	fmt.Println("CreateUser")
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	// Call update user from User model
	fmt.Println("UpdateUser")
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	// Call delete user from User model
	fmt.Println("DeleteUser")
}

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
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")

	vars := mux.Vars(r)
	userID, ok := vars["userID"]

	// Check if id is passed
	if !ok {
		w.WriteHeader(400)
		w.Write([]byte("Missing parameter id"))
		return
	}

	user := models.GetUser(userID)

	if user.Userid == "" {
		w.WriteHeader(404)
		w.Write([]byte("User not found"))
		return
	}

	errAdd := json.NewEncoder(w).Encode(user)

	if errAdd != nil {
		w.WriteHeader(404)
		w.Write([]byte("Error getting user"))
		log.Fatalln("Error encoding user")
	}
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")

	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)

	if user.Userid == "" {
		w.WriteHeader(400)
		w.Write([]byte("Unable to create user. Userid required"))
		return
	}

	if err != nil {
		w.WriteHeader(400)
		w.Write([]byte("Unable to create user"))
		return
	}

	models.CreateUser(user)

	w.WriteHeader(200)
	w.Write([]byte("Successfully created user"))
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	// Call update user from User model
	fmt.Println("UpdateUser")
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")

	vars := mux.Vars(r)
	userID, ok := vars["userID"]

	// Check if id is passed
	if !ok {
		w.WriteHeader(400)
		w.Write([]byte("Missing parameter id"))
		return
	}

	// Call delete user from User model
	models.DeleteUser(userID)
	w.WriteHeader(200)
	w.Write([]byte("Successfully deleted user"))
}

func ToggleFav(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")

	vars := mux.Vars(r)
	userID, ok := vars["userID"]
	if !ok {
		w.WriteHeader(400)
		w.Write([]byte("Missing parameter userID"))
		return
	}

	charityID, ok := vars["charityID"]
	if !ok {
		w.WriteHeader(400)
		w.Write([]byte("Missing parameter charityID"))
		return
	}

	/*uid, err := strconv.Atoi(userID)
	print(uid)
	if err != nil {
		w.WriteHeader(400)
		w.Write([]byte("Invalid userID"))
		return
	}

	*/cid, err := strconv.Atoi(charityID)
	if err != nil {
		w.WriteHeader(400)
		w.Write([]byte("Invalid charityID"))
		return
	}

	if models.ToggleFav(userID, cid) {
		w.WriteHeader(200)
		w.Write([]byte(`{"status": "removed"}`))
	} else {
		w.WriteHeader(200)
		w.Write([]byte(`{"status": "added"}`))
	}
}

func GetFav(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")

	vars := mux.Vars(r)
	userID, ok := vars["userID"]
	if !ok {
		w.WriteHeader(400)
		w.Write([]byte("Missing parameter userID"))
		return
	}

	//uid, err := strconv.Atoi(userID)
	//if err != nil {
	//w.WriteHeader(400)
	//w.Write([]byte("Invalid userID"))
	//	return
	//}

	favorites := models.GetFav(userID)
	errAdd := json.NewEncoder(w).Encode(favorites)

	if errAdd != nil {
		w.WriteHeader(404)
		w.Write([]byte("Error getting favorites"))
		log.Fatalln("Error encoding favorites")
	}
}

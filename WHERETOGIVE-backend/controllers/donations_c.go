package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"

	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/models"
)

func GetDonationsByUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")

	vars := mux.Vars(r)
	userID, ok := vars["userID"]

	// Check if id is passed
	if !ok {
		w.WriteHeader(400)
		w.Write([]byte("Missing parameter userID"))
		return
	}

	donations := models.GetAllDonationsByUser(userID);

	errAdd := json.NewEncoder(w).Encode(donations)

	if errAdd != nil {
		log.Fatalln("Error encoding donations")
	}
}

func GetTotalAmountByUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")

	vars := mux.Vars(r)
	userID, ok := vars["userID"]

	// Check if id is passed
	if !ok {
		w.WriteHeader(400)
		w.Write([]byte("Missing parameter userID"))
		return
	}

	totalAmount := models.GetTotalAmountByUser(userID);

	errAdd := json.NewEncoder(w).Encode(totalAmount)

	if errAdd != nil {
		log.Fatalln("Error encoding total amount")
	}
}

func CreateDonation(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")

	var donation models.Donation
	err := json.NewDecoder(r.Body).Decode(&donation);
	fmt.Print(donation);

	if donation.Userid == "" || donation.Charityid == 0 {
		w.WriteHeader(400)
		w.Write([]byte("Unable to create donation. user and charity ids required"))
		return
	}
	
	if err != nil {
		w.WriteHeader(400)
		w.Write([]byte("Unable to create donation"))
		return
	}

	models.CreateDonation(donation);

	w.WriteHeader(200)
	w.Write([]byte("Successfully created donation"))
}
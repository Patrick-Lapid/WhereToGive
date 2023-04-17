package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"

	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/models"
)

func GetRecurringDonationsByUser(w http.ResponseWriter, r *http.Request) {
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

	donations := models.GetAllRecurringDonationsByUser(userID);

	errAdd := json.NewEncoder(w).Encode(donations)

	if errAdd != nil {
		log.Fatalln("Error encoding donations")
	}
}

func CreateRecurringDonation(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")

	var donation models.RecurringDonation
	err := json.NewDecoder(r.Body).Decode(&donation);

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

	models.CreateRecurringDonation(donation);

	w.WriteHeader(200)
	w.Write([]byte("Successfully created recurring donation"))
}

func DeleteRecurringDonation(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")

	vars := mux.Vars(r)
	id, ok := vars["donationID"]

	// Check if id is passed
	if !ok {
		w.WriteHeader(400)
		w.Write([]byte("Missing parameter donationID"))
		return
	}

	donationID, err := strconv.Atoi(id)
    if err != nil {
		w.WriteHeader(400)
		w.Write([]byte("donationID must be integer"))
		return
    }

	models.DeleteRecurringDonation(donationID);
	w.WriteHeader(200)
	w.Write([]byte("Successfully deleted recurring donation"))
}

func UpdateRecurringDonation(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")

	var donation models.RecurringDonation
	err := json.NewDecoder(r.Body).Decode(&donation);

	if err != nil {
		w.WriteHeader(400)
		w.Write([]byte("Unable to update donation"))
		return
	}

	models.UpdateRecurringDonation(donation);

	w.WriteHeader(200)
	w.Write([]byte("Successfully updated recurring donation"))
}
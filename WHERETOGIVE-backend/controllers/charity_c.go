package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"

	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/models"
)

func GetCharities(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")

	charities := models.GetAllCharities();

	errAdd := json.NewEncoder(w).Encode(charities)

	if errAdd != nil {
		log.Fatalln("Error encoding charities")
	}
}

func GetCharity(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")

	vars := mux.Vars(r)
	id, ok := vars["id"]

	// Check if id is passed
	if !ok {
		w.WriteHeader(400)
        w.Write([]byte("Missing parameter id"))
		return
	}

	// Check integer conversion
	charityID, errConv := strconv.Atoi(id)
	if errConv != nil {
		w.WriteHeader(400)
        w.Write([]byte("id must be an integer"))
		return
	}

	charity := models.GetCharity(charityID);

	if charity.Name == "" {
		w.WriteHeader(404)
        w.Write([]byte("Charity not found"))
		return
	}

	errAdd := json.NewEncoder(w).Encode(charity)

	if errAdd != nil {
		log.Fatalln("Error encoding charities")
	}
}

func GetCharitiesByTag(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	query := r.URL.Query()
    tag := query.Get("tag")

	if tag == "" {
		w.WriteHeader(400)
        w.Write([]byte("Must be tag parameter"))
		return
	}

	charities := models.GetCharitiesByTag(tag);

	errAdd := json.NewEncoder(w).Encode(charities)

	if errAdd != nil {
		log.Fatalln("Error encoding charities")
	}
}
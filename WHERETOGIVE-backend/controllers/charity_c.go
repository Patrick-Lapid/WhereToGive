package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/gorilla/mux"

	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/models"
)

func GetCharities(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")

	charities := models.GetAllCharities()

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

	charity := models.GetCharity(charityID)

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
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")

	//query := r.URL.Query()
	//tags := query["tag"]

	tagsStr := r.URL.Query().Get("tag")

	if tagsStr == "" {
		w.WriteHeader(400)
		w.Write([]byte("Must provide at least one tag"))
		return
	}
	tags := strings.Split(tagsStr, ",")
	charities := models.GetCharitiesByTag(tags)
	if len(charities) == 0 {
		w.WriteHeader(400)
		w.Write([]byte("No matches found for specified tag(s)"))
		return
	}
	errAdd := json.NewEncoder(w).Encode(charities)

	if errAdd != nil {
		log.Fatalln("Error encoding charities")
	}
}

func GetAllTags(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")

	tags := models.GetAllTags()

	errAdd := json.NewEncoder(w).Encode(tags)

	if errAdd != nil {
		log.Fatalln("Error encoding tags")
	}
}

func GetCharitiesBySearch(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")

	//query := r.URL.Query()
	//tags := query["tag"]

	searchStr := r.URL.Query().Get("terms")

	if searchStr == "" {
		w.WriteHeader(400)
		w.Write([]byte("Must provide at least one search term"))
		return
	}
	terms := strings.Split(searchStr, ",")
	charities := models.GetCharitiesBySearch(terms)
	if len(charities) == 0 {
		w.WriteHeader(400)
		w.Write([]byte("No matches found for specified search term(s)"))
		return
	}
	errAdd := json.NewEncoder(w).Encode(charities)

	if errAdd != nil {
		log.Fatalln("Error encoding charities")
	}
}

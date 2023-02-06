package controllers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/models"
)

func GetCharities(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	charities := models.GetAllCharities();

	errAdd := json.NewEncoder(w).Encode(charities)

	if errAdd != nil {
		log.Fatalln("Error encoding charities")
	}
}
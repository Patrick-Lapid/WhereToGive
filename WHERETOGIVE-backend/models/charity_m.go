package models

import (
	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/database"
	pq "github.com/lib/pq"
)

type Charity struct {
	ID          int 			`json: "id"`
	Name        string			`json: "name"`
	Description string			`json: "description"`
	Logourl     string			`gorm:"type:text" json: "logourl"`
	Tags       	pq.StringArray	`gorm:"type:text[]" json: "tags"`
	Location    string			`json: "location"`
}

func GetAllCharities() []Charity{

	var charities []Charity

	database.DB.Find(&charities)

	return charities
}
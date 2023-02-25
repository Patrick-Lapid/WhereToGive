package models

import (
	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/database"
	pq "github.com/lib/pq"
)

type Charity struct {
	ID          		int 			`json: "id"`
	Name        		string			`json: "name"`
	DescriptionShort 	string			`json: "description_short"`
	DescriptionLong 	string			`json: "description_long"`
	Location    		string			`json: "location"`
	WebsiteURL    		string			`json: "website_url"`
	LogoURL     		string			`gorm:"type:text" json: "logo_url"`
	Tags       			pq.StringArray	`gorm:"type:text[]" json: "tags"`

}

func GetAllCharities() []Charity {

	var charities []Charity

	database.DB.Find(&charities)

	return charities
}

func GetCharity(id int) Charity {

	var charity Charity

	err := database.DB.First(&charity, id).Error
	if err != nil {
		return Charity{};
	}
	
	return charity
}
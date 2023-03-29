package models

import (
	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/database"
	pq "github.com/lib/pq"
)

type Charity struct {
	ID               int            `json: "id"`
	Name             string         `json: "name"`
	DescriptionShort string         `json: "description_short"`
	DescriptionLong  string         `json: "description_long"`
	Location         string         `json: "location"`
	WebsiteURL       string         `json: "website_url"`
	LogoURL          string         `gorm:"type:text" json: "logo_url"`
	Tags             pq.StringArray `gorm:"type:text[]" json: "tags"`
	EIN              string         `json: "ein"`
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
		return Charity{}
	}

	return charity
}

func GetCharitiesByTag(tags []string) []Charity {
	var charities []Charity

	database.DB.Raw("SELECT * FROM charities WHERE tags && ?::text[]", pq.Array(tags)).Scan(&charities)

	return charities
}

func GetAllTags() []string {
	var tagList []string
	database.DB.Raw("SELECT DISTINCT tag FROM charities, UNNEST(tags) AS tag ORDER BY tag ASC").Scan(&tagList)

	return tagList
}

package models

import (
	"strings"

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

type CharityReduced struct {
	ID      int            `json: "id"`
	Name    string         `json: "name"`
	LogoURL string         `gorm:"type:text" json: "logo_url"`
	Tags    pq.StringArray `gorm:"type:text[]" json: "tags"`
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

// search charities by name or tag
func GetCharitiesBySearch(terms []string) []CharityReduced {
	var charities []CharityReduced

	query := "SELECT * FROM charities WHERE ("
	for i, s := range terms {
		strings.ToLower(s)
		if i > 0 {
			query += " OR "
		}
		query += " name ILIKE '%" + s + "%' OR '" + s + "' = ANY (tags)"
		//query += s + "'=ANY(name)" + "%' OR '" + s + "' = ANY (tags)"
	}
	query += ")"

	// Execute the query and scan the results into the charities slice
	database.DB.Raw(query).Scan(&charities)
	return charities
}

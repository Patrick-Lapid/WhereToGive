package models

import (
	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/database"
	"gorm.io/datatypes"
)

type Donation struct {
	Userid           int       		`json: "userid"`
	Charityid        int       		`json: "charityid"`
	Amount			 int			`json: "amount"`
	TransDate 	 	 datatypes.Date `json: "trans_date"`

}

func GetAllDonationsByUser(userid int) []Donation{
	var donations []Donation
	result := database.DB.Raw("SELECT * FROM donations WHERE userid = ?", userid).Scan(&donations)
	if result.Error != nil {
		// Send error
	}
	return donations
}

func CreateDonation(donation Donation) {
	result := database.DB.Create(&donation);
	if result.RowsAffected == 0 {
		// Failed to create donation
	}
	if result.Error != nil {
		// Send error
	}
}




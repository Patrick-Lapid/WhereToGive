package models

import (
	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/database"
	"gorm.io/datatypes"
)

type RecurringDonation struct {
	Id				 int 			`json: "id"`
	Userid      	 string        	`gorm:"type:text" json: "userid"`
	Charityid        int       		`json: "charityid"`
	Amount			 int			`json: "amount"`
	Date 	 	 	 datatypes.Date `json: "trans_date"`
	Active			 *bool			`json: "active"`	
}

type RecurringDetailedDonation struct {
	Id				 int 			`json: "id"`
	Charityid        int       		`json: "charityid"`
	Name      		 string         `json: "name"`
	LogoURL          string         `gorm:"type:text" json: "logo_url"`
	Amount			 int			`json: "amount"`
	Date 	 	 	 datatypes.Date `json: "trans_date"`
	Active			 bool			`json: "active"`
}

func GetAllRecurringDonationsByUser(userid string) []RecurringDetailedDonation{
	var donations []RecurringDetailedDonation
	result := database.DB.Raw(`SELECT d.id, d.charityid, d.amount, d.date, d.active, c.name, c.logo_url 
							   FROM recurring_donations d 
							   INNER JOIN charities c ON d.charityid = c.id
							   WHERE d.userid = ?
							   ORDER BY d.date DESC`, userid).Scan(&donations)
	if result.Error != nil {
		// Send error
	}
	return donations
}

func CreateRecurringDonation(recurringDonation RecurringDonation) {
	result := database.DB.Create(&recurringDonation);
	if result.RowsAffected == 0 {
		// Failed to create donation
	}
	if result.Error != nil {
		// Send error
	}
}

func DeleteRecurringDonation(donationID int) {
	var donation RecurringDonation
	result := database.DB.Where("id = ?", donationID).Delete(&donation)
	if result.RowsAffected == 0 {
		// Send error saying no users found
	}
	if result.Error != nil {
		// Send error
	}
}

func UpdateRecurringDonation(donation RecurringDonation) {
	result := database.DB.Where("id = ?", donation.Id).Updates(&donation)
	if result.RowsAffected == 0 {
		// Send error saying no users found
	}
	if result.Error != nil {
		// Send error
	}
}

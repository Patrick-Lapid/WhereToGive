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
	Date 	 	 	 datatypes.Date 	`json: "trans_date"`
	Active			 bool			`json: "active"`	
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
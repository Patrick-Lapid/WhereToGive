package tests

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"testing"

	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/models"

	"github.com/stretchr/testify/assert"
)

func TestGetUser(t *testing.T) {
	resp, errGetting := http.Get("http://localhost:8000/api/users/1")
	if errGetting != nil {
        t.Fatalf("Couldn't make request: %v\n", errGetting)
    }

	assert.Equal(t, resp.StatusCode, http.StatusOK, "The status of this request should be 200 (OK)")

	var user models.User;
	json.NewDecoder(resp.Body).Decode(&user)
	assert.NotEqual(t, user.FirstName, "", "First name not found")
	assert.NotEqual(t, user.LastName, "", "Last name not found")
	assert.NotEqual(t, user.City, "", "City not found")
	assert.NotEqual(t, user.State, "", "State not found")
	assert.NotEqual(t, user.Userid, 0, "Userid not found")
	resp.Body.Close()
}

func TestGetUserNotFound(t *testing.T) {
	resp, errGetting := http.Get("http://localhost:8000/api/users/400")
	if errGetting != nil {
        t.Fatalf("Couldn't make request: %v\n", errGetting)
    }
	body, err := io.ReadAll(resp.Body)
    if err != nil {
        t.Fatalf("Couldn't read request: %v\n", err)
    }

    responseString := string(body)

	assert.Equal(t, resp.StatusCode, http.StatusNotFound, "The status of this request should be 404 (Not Found)")
	assert.Equal(t, responseString, "User not found", "User should not be found if not in database")
	resp.Body.Close()
}

func TestGetUserInvalidParameterType(t *testing.T) {
	resp, errGetting := http.Get("http://localhost:8000/api/users/abc")
	if errGetting != nil {
        t.Fatalf("Couldn't make request: %v\n", errGetting)
    }
	body, err := io.ReadAll(resp.Body)
    if err != nil {
        t.Fatalf("Couldn't read request: %v\n", err)
    }

    responseString := string(body)

	assert.Equal(t, resp.StatusCode, http.StatusBadRequest, "The status of this request should be 400 (Bad Request)")
	assert.Equal(t, responseString, "userID must be an integer", "Response for string type parameter should be (userID must be an integer)")
	resp.Body.Close()
}

func TestCreateUser(t *testing.T) {
	user := &models.User{
		Userid: 9999,
		FirstName: "TestFirst",
		LastName: "TestLast",
		City: "G",
		State: "FL",
	}
	
	postBody := new(bytes.Buffer)
	json.NewEncoder(postBody).Encode(user)

	resp, errGetting := http.Post("http://localhost:8000/api/users", "application/json", postBody)
	if errGetting != nil {
        t.Fatalf("Couldn't make request: %v\n", errGetting)
    }

	body, err := io.ReadAll(resp.Body)
    if err != nil {
        t.Fatalf("Couldn't read request: %v\n", err)
    }

    responseString := string(body)

	assert.Equal(t, resp.StatusCode, http.StatusOK, "The status of this request should be 200 (OK)")
	assert.Equal(t, responseString, "Successfully created user", "Response for creation should be (Successfully created user)")
	resp.Body.Close()
}

func TestDeleteUser(t *testing.T) {
	client := &http.Client{}

    request, errCreate := http.NewRequest("DELETE", "http://localhost:8000/api/users/9999", nil)
    if errCreate != nil {
        t.Fatalf("Couldn't create delete request: %v\n", errCreate)
        return
    }

    resp, errReq := client.Do(request)
    if errReq != nil {
        t.Fatalf("Couldn't make delete request: %v\n", errReq)
    }

	body, errRead := io.ReadAll(resp.Body)
    if errRead != nil {
        t.Fatalf("Couldn't read request: %v\n", errRead)
    }

	responseString := string(body)

	assert.Equal(t, resp.StatusCode, http.StatusOK, "The status of this request should be 200 (OK)")
	assert.Equal(t, responseString, "Successfully deleted user", "Response for creation should be (Successfully deleted user)")
	resp.Body.Close()
}

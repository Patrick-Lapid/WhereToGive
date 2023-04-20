# Project Name: Where To Give

# Project Description

This application will be a multipurpose donation site that pipelines generous donors to nonprofits that align to their interests. It will support user authentication for login and storing user specific data. Users will be prompted to fill out a form to provide personal information such as location and causes they care about. The user's information will be saved to a database and the form will be auto-populated every time they visit the site. Based on this information collected from the user, the application will categorize and rank nonprofits to best fit the user's interest. The application will provide users the capability to visit the website of their non-profit of choice to make their donations. Another feature the application will provide users is the capability to self-report donations for visual tracking with statements and graphs where you can select and view certain non-profit categories.

# Project Demo

https://www.youtube.com/watch?v=1NoF8r_Zx5s&ab_channel=Patrick
<br>

![landing](https://user-images.githubusercontent.com/53315150/233243196-42e9d937-c068-44e1-b846-eb7e1c9f6431.png)


## Installation and Running Guide

**Prerequisites**
Ensure that the following software is installed on your computer:
1. Node.js: https://nodejs.org/en/download/
2. Go: https://golang.org/dl/

Additionally:
1. Clone the `WhereToGive` repository on your local machine.
2. Locate the provided config.js file with the MAPBOX_ACCESS_TOKEN. Copy this file into the root of the WHERETOGIVE-frontend subdirectory.

**Backend Setup and Execution**
1. Change directory to WHERETOGIVE-backend 
2. Start the Go backend server by running the following command: `go run main.go`. This will start the backend server on port 8000.

**Frontend Instuctions**
1. Change directroty to WHERETOGIVE-frontend
2. Install the necessary project dependencies with the command: `npm install`. This will download and install all the required packages for the frontend.
3.Start the React development server by running the following command: `npm start`. This command will automatically open a new browser window and load the application. If the browser does not open automatically, you can manually navigate to http://localhost:8080/ to view the application.

You have now successfully set up and run the WhereToGive application locally. The frontend is running on port 8080 and is communicating with the backend server running on port 8000.

**Group Members** :busts_in_silhouette:
- Frontend 
  - Patrick Lapid
  - Ai-Linh Nguyen
- Backend 
  - Micaiah Kennedy
  - Deep Patel


## API Documentation
[Docs](https://documenter.getpostman.com/view/20038307/2s93CRKXFY)


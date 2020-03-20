# Pet-API

Link to app: https://pets-api.herokuapp.com/pets/

This is an API that is used to get Pet information as well as store pet information in a database. 

A .yaml file can be found in the spec folder which can be pasted into [swagger](http://editor.swagger.io/) to get an understanding of the parameters and responses for the various requests. 

The endpoints to communicate with the API are as follows:

**/pets [GET]:** Endpoint used for getting an index of pets

**/pets/:id [GET]:** Endpoint used for getting a pet by ID

**/pets [POST]:**  Endpoint used for sending a pet object which is stored in the database.

**/petsBreed [GET]:** Endpoint that calls the Dog or Cat API and retrieves a list of breeds. 

**/location [GET]:** Endpoint that takes the user entered location and sends that to the OpenCage Geocode API and retrieves the location coordinates

**/locationWeather [GET]:** Endpoint that communicates with the DarkSky API to retrieve weather for a given set of location coordinates. 

# Technologies Used 

- Node.js
- Typescript 
- PostgresSQL


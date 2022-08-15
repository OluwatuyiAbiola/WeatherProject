
## A Weather App

The weather app is a tutorial on how to use api  keys to get weather of a location using open weather api

### Key information

- using express for the backend
- using node http module package to get request from an external server
- response on to get data been sent to the server
- The data is in hexadecimal format, so we convert using Json.parse to get Json format
- Picked specific data needed like the temp, weather description and icon
- Using res.write and res.send to display the data
- Created an input for users to put location
- Used body-parser to get the input req.bodyParser.(name of input)  
- Made sure our app.use bodyParser is in urlencoded
- Returned the input into a var called query and added it to d url and sent it to the OW server
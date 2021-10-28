const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch')
const port = 8080;

const allData = {};

//setting .env
const dotenv = require('dotenv');
dotenv.config();

//API base url
const geoBaseApi = "http://api.geonames.org/postalCodeLookupJSON?placename=";
const weatherBaseApi_Current = "https://api.weatherbit.io/v2.0/current?lat=";
const weatherBaseApi_Forecast = "https://api.weatherbit.io/v2.0/forecast/daily?lat=";
const pixabayBaseApi = "https://pixabay.com/api/?key=";

//API keys
const weatherApiKey = process.env.WEATHER_API_KEY;
const pixabayApiKey = process.env.PIXABAY_API_KEY;

console.log(`Got your API Keys! Weather API KEY: ${weatherApiKey} Pixabay API KEY: ${pixabayApiKey}`)

//middleware
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

//GET METHOD: displays the page
app.get('/', (req, res) => {
    res.sendFile(path.resolve('dist/index.html'));
})

//POST METHOD: retrieves data from the modal
app.post('/add', async (req, res) => {
    const data = req.body;
    const location = data.location;
    const days = data.days;
    let uuid = data.uuid;
    allData[uuid]= {};

    try{
        pixabayImage(pixabayBaseApi, pixabayApiKey, location)
        .then(data => {
            allData[uuid]["image"] = data.hits[0].largeImageURL;
        })
        .catch(e => {
            delete allData[uuid];
            res.status(404).send();
            console.log("Couldn't retrieve image", e)
        })

        getCoordinates(location)
        .then(data => {
            const lng = data.postalcodes[0].lng;
            const lat = data.postalcodes[0].lat;

            allData[uuid]["lng"] = lng;
            allData[uuid]["lat"] = lat;

            getWeather(lng, lat, days).then(data => {
                
                if(days < 7){
                    allData[uuid]["temp"] = data.data[0].temp;
                    allData[uuid]["icon"] = data.data[0].weather.icon;
                    allData[uuid]["description"] = data.data[0].weather.description;
                } else {
                    const lastData = data.data.length - 1;
                    allData[uuid]["low_temp"] = data.data[lastData].low_temp;
                    allData[uuid]["max_temp"] = data.data[lastData].max_temp;
                    allData[uuid]["icon"] = data.data[lastData].weather.icon;
                    allData[uuid]["description"] = data.data[lastData].weather.description;
                }

                res.send(allData[uuid]);
            })
            .catch(e => {
                delete allData[uuid];
                res.status(404).send();
                console.log("Error weather fetching data", e)
            })

        })
        .catch(e => {
            delete allData[uuid];
            res.status(404).send();
            console.log("Couldn't get the API Data", e);
        })
    
    } catch (e) {
        console.log("Error in the Post Request", e);
    }


})

//Calls the Geoname API and retrieves its data
const getCoordinates = async (location) => {
    try {
        const res = await fetch(`${geoBaseApi}${location}&username=lly03`);
        console.log(`Geonames Status is Ok: ${res.ok}`)
        const result = await res.json();
        return result;
    } catch (e){
        console.log("error", e);
    }
}

//Calls the Weatherbit API and retrieves its data
//if it's less than 7 days then get the current weather, else get the forecast weather
const getWeather = async (lng, lat, days) => {
    try {
        if(days < 7){
            const res = await fetch(`${weatherBaseApi_Current}${lat}&lon=${lng}&key=${weatherApiKey}`);
            console.log(`Current Weather Status is Ok: ${res.ok}`)
            const result = await res.json();
            return result;
        } else {
            const res = await fetch(`${weatherBaseApi_Forecast}${lat}&lon=${lng}&key=${weatherApiKey}`);
            console.log(`Forecast Weather Status is Ok: ${res.ok}`)
            const result = await res.json();
            return result;
        } 
    } catch (e){
        console.log("error", e);
    }
}

//Calls the Pixabay API and retrieves its data
const pixabayImage = async (pixabayBaseApi, pixabayApiKey, location) => {
    try {
        const res = await fetch(`${pixabayBaseApi}${pixabayApiKey}&q=${location}&image_type=photo&category=places`);
        console.log(`Pixabay Status is Ok: ${res.ok}`)
        const result = await res.json();
        return result;
    } catch (e){
        console.log("error", e);
    }
}

//GET METHOD: Retrieves all the data that were inputted to the allData object
app.get('/all', (req, res) => {
    res.send(allData);
});

//POST METHOD: Delete the specific uuid object from allData
app.post('/delete', (req, res) => {
    const data = req.body;
    let uuid = data.uuid;

    try{
        delete allData[uuid];
        return;
    }catch (e) {
        console.log("Delete was unsuccessful", e)
    }
});

app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
})
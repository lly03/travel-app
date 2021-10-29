# Travel App

## Project Description
<p>This is the capstone project for Udacity, where I am required to build a Travel App that obtains a desired trip location & date from the user. That information will then display the weather and an image of the location using information obtained from external APIs. The APIs that I used are <a href="http://www.geonames.org/export/web-services.html">Geonames API</a>, <a href="https://www.weatherbit.io/api">Weatherbit API</a> and <a href="https://pixabay.com/api/docs/">Pixabay API</a>.</p>

**Features included in the App:**
<ul>
  <li>Ability to add multiple trips</li>
  <li>Ability to delete a trip</li>
  <li>Each trip has a "To do" note taker</li>
  <li>User can generate a pdf file for each trip</li>
  <li>Retrieves weather data depending on the trip's length</li>
  <li>A relevant image will appear depending on the trip's location</li>
</ul>

## Dependencies and Packages
<ul>
  <li>HTML</li>
  <li>Sass</li>
  <li>Javascript</li>
  <li>Babel</li>
  <li>Webpack</li>
  <li>NodeJS (npm & Express)</li>
  <li>Jest (development)</li>
  <li><a href="http://www.geonames.org/export/web-services.html">Geonames API</a></li>
  <li><a href="https://www.weatherbit.io/api">Weatherbit API</a></li>
  <li><a href="https://pixabay.com/api/docs/">Pixabay API</a></li>
  <li><a href="https://www.npmjs.com/package/dotenv">dotenv Package</a></li>
  <li><a href="https://www.npmjs.com/package/uuid">UUID Package</a></li>
  <li><a href="https://www.npmjs.com/package/jspdf">jsPDF Package</a></li>
  <li><a href="https://html2canvas.hertzen.com/">html2canvas Package</a></li>
  <li><a href="https://www.npmjs.com/package/workbox-webpack-plugin">Workbox Webpack Plugin Package (Service Workers)</a></li>
</ul>

## Usage
This project does not have the API Keys for <a href="https://www.weatherbit.io/api">Weatherbit API</a> and <a href="https://pixabay.com/api/docs/">Pixabay API</a>. So if you want to run this project in your desktop, you will need to register for the API Keys and have them saved in the .env file as:

````
WEATHER_API_KEY=****************
PIXABAY_API_KEY=*****************
````

To run the project, you'll need to have NodeJS in your desktop. In the project's directory, in the terminal, you'll need to run: 

````
npm install
````

and afterwards,

````
npm run build-prod
````
This is so that your project's folder will have a dist folder containing all the files bundled by webpack. The server also points to this folder, so running those commands is necessary.

To run the web application you can run the following command line in your terminal.
````
npm start
````
Then in your browser, go to **localhost:8080** where your web app is at.

## Screenshots of the Travel App

<img src="https://user-images.githubusercontent.com/86360050/139248869-5e866c52-bf16-421e-baa6-5d1f687a2bb9.png" alt="travel app">
<p align="center"><em>"The travel app when you first enter upon the site"</em></p>

<br/>

<img src="https://user-images.githubusercontent.com/86360050/139249011-f1c04475-f532-4c5f-855e-dd4710aabec9.png" alt="modal form for add trip">
<p align="center"><em>"The modal form, where users enter their trip destination"</em></p>

<br/>

<img src="https://user-images.githubusercontent.com/86360050/139249414-f83cf79b-64fc-4019-b284-09475235a405.png" alt="trip card with the current weather">
<p align="center"><em>"The card that displays the trip: Current Weather"</em></p>
<br/>

<img src="https://user-images.githubusercontent.com/86360050/139250254-dfac7b77-f023-4ac7-a262-fa6a132f79a7.png" alt="trip card with the forecast weather">
<p align="center"><em>"The card that displays the trip: Forecast Weather"</em></p>

<br/>

<img src="https://user-images.githubusercontent.com/86360050/139250909-bbeeb79a-65af-4e68-8784-6c6403d50bf0.png" alt="to do list">
<p align="center"><em>"The to-do-list"</em></p>

<br/>

<p align="center"><img src="https://user-images.githubusercontent.com/86360050/139251082-320e61d3-e78e-4d2d-ad43-20fc47efaf02.png" alt="mobile view for travel app"></p>
<p align="center"><em>"Responsive Design: Mobile View"</em></p>

<br/>

<p align="center"><img src="https://user-images.githubusercontent.com/86360050/139251152-2cd0178a-ca70-47d9-a877-aa1950dcc747.png" alt="mobile view for travel app with modal"></p>
<p align="center"><em>"Responsive Design: Mobile View with Modal Form"</em></p>


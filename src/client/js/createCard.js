/**
 * Firstly we set the tripData variable to the trip that was recently made (assigned to a specific trip; refered to "tripForm.js")
 * Then we'd want to get the the number of days away retrieved from "returnDate" and the current date, so we could later have 
 * that information in the DOM Card.
 * 
 * Before we add a trip card, the page current has an 'empty' message, so we will need to display none first before adding the card.
 * 
 * We then create a <div> element with a class of "card",
 * inputting the html information with the API details into that div element.
 * 
 * We then want to check whether the "days" is less or greater then 7 days.
 * This is because we want to input either the current weather or the forecast weather, depending on the trip days.
 * This information will be appended to the div element.
 * 
 * Each trip card has 3 buttons:
 * 1. To Do List Button: This button is linked to the "toDoList.js", where you can add and remove notes.
 * 
 * 2. Remove Trip List Button: This button is linked to "rmTrip.js", 
 *    where it grabs the uuid from the id atrribute and deletes the whole card.
 * 
 * 3. Generate PDF Button: This button is linked to "generatePDF.js", where it downloads a pdf with the card in it.
 * 
 * All this will then be added into the DOM
 */

const createCard = (location, returnDate, departureDate, days, data, uuid) => {
    //set the current trip in a variable
    const tripData = data[uuid];

    //getting the days_away number
    let today = new Date();
    const end_date = new Date(returnDate);
    const difference = end_date.getTime() - today.getTime();
    const days_away = Math.ceil(difference / (1000 * 3600 * 24));

    const main = document.querySelector('main');
    const msg = document.querySelector('.msg');
    const tripCard = document.createElement('div');
    const ul = document.createElement('ul');
    
    tripCard.classList.add('card');

    //removes the empty message on the page (which will be replaced by the card)
    msg.classList.remove('active');

    //the card details
    tripCard.innerHTML = `
        <img src="${tripData.image}" alt="Pixabay Image of ${location}">
        <div class="info">
            <button class="rm-trip-btn">Remove Trip</button>
            <button class="pdf-btn">Generate PDF</button>
            <div class="general-info">
                <h2>My Trip to: ${location.toUpperCase()}</h2>
                <h3>Departure Date: ${departureDate}</h3>
                <p>Trip to ${location.toUpperCase()} is ${days_away} days away.</p>
            </div>
            <div class="weather-info">
                <h3>Weather Details</h3>
                <div class="content">
                </div>
            </div>
        </div>
        
        <form action="/">    
            <label for="to-do">Enter your To Do List:</label>
            <input type="text" id="to-do" name="to-do" placeholder="Enter preperation list item..." required>
            <button class="to-do-btn">Add</button>
            <small class="invalid"><em>Input is required!<em></small>
        </form>
    `
        
    const content = tripCard.children[1].children[3].children[1];
    //check if the days is less then 7, if so we input the current weather, else we put the forecast weather
    if (days < 7){
        content.innerHTML =`
        <img src="https://www.weatherbit.io/static/img/icons/${tripData.icon}.png" alt="${tripData.description} Icon">
        <span>Current Temp: ${tripData.temp}&#8451;</span>
        <p>We will be expecting ${tripData.description}.</p>
        `
    } else {
        content.innerHTML =`
        <img src="https://www.weatherbit.io/static/img/icons/${tripData.icon}.png" alt="${tripData.description} Icon">
        <span>MIN: ${tripData.low_temp}&#8451; MAX: ${tripData.max_temp}&#8451;</span>
        <p>We will be expecting ${tripData.description}.</p>`
    }

    //put this in the DOM
    tripCard.append(ul)
    main.append(tripCard)

    const toDoAddBtn = tripCard.children[2].children[2];
    const cardList = tripCard.children[3];

    //Pass params to the "toDoList.js"
    Client.toDoList(cardList, toDoAddBtn);

    const rmTripBtn = tripCard.children[1].children[0];
    const pdfBtn = tripCard.children[1].children[1];

    //have a event listener to remove the trip and download a pdf when 'clicked'
    rmTripBtn.setAttribute('id', uuid); 
    rmTripBtn.addEventListener('click', Client.rmTrip);
    pdfBtn.addEventListener('click', Client.generatePDF);
}

export { createCard };
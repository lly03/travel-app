const createCard = (location, returnDate, departureDate, days, data, uuid) => {
    const tripData = data[uuid];

    let today = new Date();
    const end_date = new Date(returnDate);
    const difference = end_date.getTime() - today.getTime();
    const days_away = Math.ceil(difference / (1000 * 3600 * 24));

    const main = document.querySelector('main');
    const msg = document.querySelector('.msg');
    const tripCard = document.createElement('div');
    const ul = document.createElement('ul');
    
    tripCard.classList.add('card');
    msg.classList.remove('active');

    tripCard.innerHTML = `
        <img src="${tripData.image}" alt="Pixabay Image of ${location}">
        <div class="info">
            <button class="rm-trip-btn">Remove Trip</button>
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
        
    const content = tripCard.children[1].children[2].children[1];
    
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

    tripCard.append(ul)
    main.append(tripCard)

    const toDoAddBtn = tripCard.children[2].children[2];
    const cardList = tripCard.children[3];

    Client.toDoList(cardList, toDoAddBtn);

    const rmTripBtn = tripCard.children[1].children[0];
    rmTripBtn.setAttribute('id', uuid); 

    rmTripBtn.addEventListener('click', Client.rmTrip);
}

export { createCard };
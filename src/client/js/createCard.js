function createCard(location, departureDate, days, tripData) {
    console.log("hellow im in create cards")
    let today = new Date();

    const end_date = new Date(departureDate);
    const difference = end_date.getTime() - today.getTime();
    const days_away = Math.ceil(difference / (1000 * 3600 * 24))

    console.log(end_date)
    console.log(today)
    console.log(days_away)

    const main = document.querySelector('main');
    const msg = document.querySelector('.msg');
    const div = document.createElement('div');
    const ul = document.createElement('ul');
    
    div.classList.add('card');
    msg.classList.remove('active');

    div.innerHTML = `
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
        
        const content = div.children[1].children[2].children[1];
        
        if (days < 7){
            content.innerHTML =`
            <img src="https://www.weatherbit.io/static/img/icons/${tripData.current.icon}.png" alt="${tripData.current.descrip} Icon">
            <span><strong>CURRENT TEMP:</strong> ${tripData.current.temp}&#8451;</span>
            <p>We will be expecting ${tripData.current.descrip}.</p>
            `
        } else {
            content.innerHTML =`
            <img src="https://www.weatherbit.io/static/img/icons/${tripData.forecast.icon}.png" alt="${tripData.forecast.descrip} Icon">
            <span><strong>MIN:</strong> ${tripData.forecast.low_temp}&#8451; <strong>MAX:</strong> ${tripData.forecast.max_temp}&#8451;</span>
            <p>We will be expecting ${tripData.forecast.descrip}.</p>`
        }

        div.append(ul)
        main.append(div)

        const cardId = `card_${i}`;    
        div.setAttribute('id', cardId); 

        const toDoAddBtn = div.children[2].children[2];
        const cardList = div.children[3];
        Client.toDoList(cardList, toDoAddBtn);
        Client.rmTrip();

        i++;
}

export {createCard};
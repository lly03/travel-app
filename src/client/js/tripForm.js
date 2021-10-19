const main = document.querySelector('main');
const msg = document.querySelector('.msg');
let i = 0;

async function tripForm(e){
    e.preventDefault();

    const myModal = document.getElementById('myModal');
    const departureDate = e.target.departure.value;
    const returnDate = e.target.return.value;
    const start_date = new Date(departureDate);
    const end_date = new Date(returnDate);


    const difference = end_date.getTime() - start_date.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));

    const location = e.target.location.value;

    if(days < 0){
        alert("Please input valid dates!")
    }else{
        await fetch('/add', {
            method:"POST", 
            credentials: "same-origin",
            mode: "cors",
            headers:{ "Content-Type": "application/json"},
            body: JSON.stringify({location: location, days: days})
        }).then(res => res.json())
        .then(addTrip(location, departureDate, days))
        .then(myModal.style.display = 'none')
        .catch(e =>console.log("error", e))
    }
    
}

async function addTrip(location, departureDate, days) {
    const req = await fetch('/all');
    try {
        const tripData = await req.json();
        
        if(tripData.lat ===  null || tripData.lng === null){
            alert("We cannot find the Location. Please try again.")
        } else {
            createCard(location, departureDate, days, tripData);
        }
        
    } catch (e) {
        console.log("error", e);
    }
}

function createCard(location, departureDate, days, tripData) {
    let today = new Date();

    const end_date = new Date(departureDate);
    const difference = end_date.getTime() - today.getTime();
    const days_away = Math.ceil(difference / (1000 * 3600 * 24))

    console.log(end_date)
    console.log(today)
    console.log(days_away)

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
        toDoList(cardList, toDoAddBtn);
        rmTrip();

        i++;
}

const toDoList = (cardList, toDoAddBtn) => {
    /**
     * Before we add a list item, we need to delegate an event listener to the <ul>, where if the click event is on the <small> tag
     * we can remove the entire <li> that the <small> tag was associated with.
     * This is because we cannot add an event listener for future elements, hence we need to delegate it to its parent node.
     * 
     * In the current card (that was made), we want to add an event listener,
     * for the To Do List "Add" btn, where it checks if there is an empty string or just spaces,
     * if so, an invalid msg appears, otherwise,
     * add the input that the user wrote on the textbox,
     * to the <ul> on the current card with a remove link 
     */

    cardList.addEventListener('click', e => {
        e.preventDefault();

        if (e.target.nodeName === 'SMALL'){
            const li = e.target.parentNode;
            const ul = li.parentNode;
            ul.removeChild(li);
        }
    })

     toDoAddBtn.addEventListener('click', e => {
        e.preventDefault();
        const toDoForm = e.target.parentNode;
        const card = toDoForm.parentNode;
        const toDoInput = toDoForm.children[1];
        const invalidMsg = toDoForm.children[3];
        const toDoList = card.children[3];

        if(toDoInput.value.trim() === ''){    
            invalidMsg.classList.add('active');
        } else {
            const li = document.createElement('li');
            const small = document.createElement('small'); 

            invalidMsg.classList.remove('active');
            small.append('remove');
            li.append(toDoInput.value);
            li.append(small);
            toDoList.append(li);
            card.append(toDoList);
        }
    })
}

const rmTrip = () => {
    /**
     * This function adds an event listener to the "Remove Trip" button in each card.
     * When the button for that specific card is clicked, it looks at the button's parentNodes,
     * where it could find the <main> tag, where it then removes the child element, the current card.
     * 
     * Once that is removed, it double checks if the app had no more cards, if so, we can add the "empty" msg
     */
    const rmTripBtns = document.querySelectorAll('.rm-trip-btn');

    rmTripBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            
            const currentCard = e.target.parentNode.parentNode;
            
            currentCard.parentNode.removeChild(currentCard);

            if (main.children.length === 1){
                msg.classList.add('active');
            }
        })
    })
}
import {v4 as uuidv4} from 'uuid';

/**
 * When the "Add Trip" form is submitted, we want to first grab the number of "days" 
 * between the "start_date" and "end_date", as well as the location of the trip.
 * 
 * A UUID is also generated, so we could use this for the server and it also allow us to delete this trip.
 * 
 * With the "days", we could check whether the user has inputted them wrong. If it is a negative number, 
 * we know that they have inputted invalid dates. Hence, a warning will appear.
 * 
 * If the dates are valid then, we pass the "location", "days" and "uuid" to a fetch API (POST METHOD) to the server, 
 * so we could set the information that was inputted into the form to the "allData object"
 * 
 * If the response status is OK (200), we will proceed with inputting the information to the DOM,
 * otherwise, the user will need to re-submit again.
 */

const tripForm = (e) => {
    e.preventDefault();

    const form = e.target.parentNode.parentNode;
    const departureDate = form.departure.value;
    const returnDate = form.return.value;
    const start_date = new Date(departureDate);
    const end_date = new Date(returnDate);

    const difference = end_date.getTime() - start_date.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));

    const location = form.location.value;
    let uuid = uuidv4();

    if(days < 0){
        alert("Please input valid dates!")
    }else{
        fetch('/add', {
            method:"POST", 
            credentials: "same-origin",
            mode: "cors",
            headers:{ "Content-Type": "application/json"},
            body: JSON.stringify({location, days, uuid})
        })
        .then(res => {
            if (res.ok) {
                addTrip(location, returnDate, departureDate, days, uuid);
            } else {
                alert("We are having problems with finding the location. Please try to submit again.");
            }
        })
        .catch(e =>console.log("error", e))
    }
    
}

/**
 * This function will run during the fetch API (above), when the response status is OK(200).
 * It is an async function, where it will fetch the "allData object".
 * 
 * After fetching the trip data, the modal will firstly close (this takes a while), 
 * and then we pass a few arguments to "createCard.js",
 * where we will create a card of this specific trip to the DOM.
 */

const addTrip = async (location, returnDate, departureDate, days, uuid) => {
    const res = await fetch('/all');
    try {
        const data = await res.json();
        const myModal = document.getElementById('myModal');
        myModal.style.display = 'none';
        Client.createCard(location, returnDate, departureDate, days, data, uuid);        
    } catch (e) {
        console.log("error", e);
    }
}

export { tripForm };




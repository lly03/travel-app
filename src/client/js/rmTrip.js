/**
 * This function is called when the "Remove Trip" is clicked.
 * 
 * It will find the parentNodes from the button, that was clicked. 
 * So it could track down which is the current card.
 * With that in mind, we could then find the <main> tag, where it then removes the child element, the current card, that was tracked.
 * 
 * Even though we removed the card in the DOM, we also want to remove the trip data in the "allData object".
 * So we send a fetch request (POST METHOD) to the server, which will find the trip data with the uuid.
 * In the server, it will delete that uuid object.
 * 
 * Once that is removed, it double checks if the app had no more cards, if so, we can add the "empty" msg on the DOM.
 */

const rmTrip = (e) => {
    e.preventDefault();

    const main = document.querySelector('main');
    const msg = document.querySelector('.msg');
    const uuid = e.target.getAttribute("id");
    const currentCard = e.target.parentNode.parentNode;

    fetch('/delete', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({uuid})
    })
    .then(res => res.json())
    .catch(err => console.log(err))

    main.removeChild(currentCard);

    if (main.children.length === 1){
        msg.classList.add('active');
    }    

}

export { rmTrip }
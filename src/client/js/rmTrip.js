const rmTrip = (e) => {
    /**
     * This function adds an event listener to the "Remove Trip" button in each card.
     * When the button for that specific card is clicked, it looks at the button's parentNodes,
     * where it could find the <main> tag, where it then removes the child element, the current card.
     * 
     * Once that is removed, it double checks if the app had no more cards, if so, we can add the "empty" msg
     */

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
const rmTrip = () => {
    /**
     * This function adds an event listener to the "Remove Trip" button in each card.
     * When the button for that specific card is clicked, it looks at the button's parentNodes,
     * where it could find the <main> tag, where it then removes the child element, the current card.
     * 
     * Once that is removed, it double checks if the app had no more cards, if so, we can add the "empty" msg
     */
    const main = document.querySelector('main');
    const msg = document.querySelector('.msg');
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

export {rmTrip}
const addcard = document.getElementById('addcard');
const main = document.querySelector('main');
const msg = document.querySelector('.msg');
let i = 0;

addcard.addEventListener('click', (e) => {
    e.preventDefault();

    /**
     * All the cards needs to be in a <div> with a class of card.
     * If the app has cards, we want to remove the "empty" msg.
     * 
     * To add the card, we'll need to add the inner HTML,
     * afterwards, we'll append <ul> tags, so we can have the To Do List items in there.
     * 
     * Finally all of this should be appended to the <main> tag where all the cards will be at.
     * 
     * When the card is made, we then set a unique id, 
     * so the event listeners can know which card's elements is being targeted.
     */
    
    const div = document.createElement('div');
    const ul = document.createElement('ul');
    div.classList.add('card');

    msg.classList.remove('active');

    div.innerHTML = `
            <img src="https://images.unsplash.com/photo-1593642532454-e138e28a63f4?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80" alt="">
            <div class="info">
                <button class="rm-trip-btn">Remove Trip</button>
                <div class="general-info">
                    <h2>My Trip to: Some Location</h2>
                    <h3>Departure Date: 23/12/2021</h3>
                    <p>Location is 60 days away.</p>
                </div>
                <div class="weather-info">
                    <h3>Weather Details</h3>
                    <div class="content">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo facere adipisci facilis provident maiores quibusdam commodi laborum magni quia. At facilis consectetur ullam doloribus tempore nobis assumenda? Officiis, sequi dolorum.
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

        div.append(ul)
        main.append(div)

        const cardId = `card_${i}`;    
        div.setAttribute('id', cardId); 

        const toDoAddBtn = div.children[2].children[2];
        const cardList = div.children[3];
        toDoList( cardList, toDoAddBtn);
        rmTrip();

        i++;
})

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
const cards = document.querySelectorAll('.card');
const toDoBtns = document.querySelectorAll('.to-do-btn');
const rmTripBtns = document.querySelectorAll('.rmTrip-btn');

for (let i = 0; i < cards.length; i++){
    const cardId = `card_${i}`;
    cards[i].setAttribute('id', cardId);
}

toDoBtns.forEach( btn => {
    
    const ul = document.createElement('ul');
    const card = btn.parentNode.parentNode;
    const todo = btn.parentNode.firstElementChild;

    btn.addEventListener('click', event => {
        event.preventDefault();

        const li = document.createElement('li');
        
        li.append(todo.value);
        ul.append(li);

        card.append(ul);
    })
})

rmTripBtns.forEach( btn => {
    const cardId = btn.parentNode.parentNode.getAttribute('id');

    btn.addEventListener('click', event => {
        event.preventDefault();

        const card = document.getElementById(cardId);
        console.log(card)
        // card.innerHTML = '';
    })
})
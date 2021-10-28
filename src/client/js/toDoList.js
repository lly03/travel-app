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

const toDoList = (cardList, toDoAddBtn) => {

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

export { toDoList };
const toDoList = () => {
    const toDoBtns = document.querySelectorAll('.to-do-btn');

    toDoBtns.forEach( btn => {
        const ul = document.createElement('ul');
        const card = btn.parentNode.parentNode;
        const todo = btn.parentNode.children[1];

        btn.addEventListener('click', event => {
            event.preventDefault();
            
            if(todo.value.trim() === ''){
                alert("Input required!");
            } else {
                const li = document.createElement('li');
                const small = document.createElement('small');
                
                small.append('remove');
                li.append(todo.value);
                li.append(small);
                ul.append(li);

                card.append(ul);

                todo.value = '';
            }
        })
    })
}
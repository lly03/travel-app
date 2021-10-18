const myBtn = document.getElementById('myBtn');
const myModal = document.getElementById('myModal');
const close = document.querySelector('.modal-header span');

myBtn.addEventListener('click', () => {
    myModal.style.display = 'block';
})

close.addEventListener('click', () => {
    myModal.style.display = 'none';
})
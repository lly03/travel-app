const dateValidation = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    //if day and month are less than 10, we want to put 0 in front of the number
    if(dd < 10) {
        dd = `0${dd}`;
    } if(mm < 10) {
        mm = `0${mm}`;
    } 

    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById("departure").setAttribute("min", today);
    document.getElementById("return").setAttribute("min", today);
    }


export { dateValidation };
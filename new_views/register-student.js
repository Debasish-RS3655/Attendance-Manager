const form = document.querySelector('form');
const name = document.querySelector('#name');
const scholarid = document.querySelector('#scholarid');
const password = document.querySelector('#password');
const email = document.querySelector('#email');
const error = document.querySelector('.error');

form.addEventListener('submit', async e => {
    e.preventDefault();
    error.textContent = ''; //clear the error text content initially
    //go to the register domain
    fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: name.value,
            password: password.value,
            scholarid: scholarid.value,
            email: email.value
        })
    })
        .then(d => d.json())
        .then(res => {
            //if we have got some error simply display it here
            if (res.status === 400 || res.status === 401)
                return error.textContent = `${res.message}. ${res.error ? res.error : ''}`
            //if no error simply jump to the student view webpage
            location.assign('/new_views/student-record');
        })
        .catch(err => {
            error.textContent = err.message;
        })
});

getLocation();
function getLocation() {
    const locElement = document.querySelector(".location");
    if (navigator.geolocation) {
        //display the position if it is supported in the browser
        navigator.geolocation.getCurrentPosition(pos => {
            locElement.innerHTML = `Your position is Lat:${pos.coords.latitude} Long:${pos.coords.longitude}`
        })
    }
    else locElement.innerHTML = "Geolocation is not allowed in this browser. Please use one where it is supported."
}
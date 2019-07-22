const form = document.forms[0];
const sections = document.querySelectorAll('section');
const h3 = document.querySelector('h3');
let nameField = document.getElementById('name');
let emailField = document.getElementById('email');
let companyIdField = document.getElementById('companyId');
let winnerPrice = generateTicket();
let msg = '';

let database = [];

/**
 * html card reaction parts
 */
nameField.addEventListener('input', function(event) {
    let input = event.target.value;
    if (event.target.id === 'name') {
        h3.innerHTML = `Hello, ${input}!`;
    }
})

emailField.addEventListener('input', function(event) {
    let input = event.target.value;
    let checkEmailContent = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (event.target.id === 'email') {
        return checkEmailContent.test(email);
    }
})

form.addEventListener('submit', formValidate);

function formValidate(event) {
    event.preventDefault();

    if (form.checkValidity() === false) {
        event.stopPropagation();
        form.classList.add('was-validated');
    } else {
        form.classList.remove('was-validated');
        let nameObj = document.getElementById("nameform").getElementsByTagName("input");
        let emailObj = document.getElementById("emailform").getElementsByTagName("input");
        let idObj = document.getElementById("idform").getElementsByTagName("input");
        for (let i = 0; i < nameObj.length; i++) {
            if (nameObj[i].value.length > 0) {
                database.push(nameObj[i].value);
                // Object.values(database)[0].name.push(nameObj[i].value);
            }
        }
        for (let i = 0; i < emailObj.length; i++) {
            if (emailObj[i].value.length > 0) {
                database.push(emailObj[i].value);
                // Object.values(database)[0].email.push(nameObj[i].value);
            }
        }
        for (let i = 0; i < idObj.length; i++) {
            if (idObj[i].value.length > 0) {
                database.push(idObj[i].value);
                // Object.values(database)[0].id.push(nameObj[i].value);
            }
        }
        database.push(winnerPrice, announceMsg());
        // Object.values(database)[0].push(nameObj[i].value);
        SysInit();
        console.log(database);
    }
}

function SysInit() {
    generateFormData();
    resetFormData();
}

function announceMsg() {
    let firstPriceValue = generateTicket();
    let secondPriceValue = generateTicket();
    let thirdPriceValue = generateTicket();
    switch (winnerPrice) {
        case 'firstPriceValue':
            return msg = '頭獎';
            break;
        case 'secondPriceValue':
            return msg = '二獎';
            break;
        case 'thirdPriceValue':
            return msg = '三獎';
            break;
        default:
            return msg = '參加獎';
            break;
    }
}

function generateFormData() {
    sections[1].innerHTML = `
        <div class="container mt-5">
            <h2 class="inline-center">Your Prize</h2>
            <div class="row">
                <div class="col-md-10 col-sm-10">
                    <h3>Your Name: ${nameField.value}</h3>
                </div>
                <div class="col-md-2 col-sm-2"></div>
            </div>
            <div class="row">
                <div class="col-md-10 col-sm-10">
                    <h3>Your Id Number: ${companyIdField.value}</h3>
                </div>
                <div class="col-md-2 col-sm-2"></div>
            </div>
            <div class="row">
                <div class="col-md-10 col-sm-10">
                    <h3>Your Lottery Number: ${winnerPrice}</h3>
                </div>
                <div class="col-md-2 col-sm-2"></div>
            </div>
            <div class="row">
                <div class="col-md-10 col-sm-10">
                    <h3>Your Prize: ${msg}</h3>
                </div>
                <div class="col-md-2 col-sm-2"></div>
            </div>
        </div>
    `
}

function resetFormData() {
    form.reset();
}

function generateTicket() {
    let num = ''
    for (let j = 0; j < 3; j++) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}
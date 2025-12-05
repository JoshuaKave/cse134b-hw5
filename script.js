let form = document.getElementById('contact-form');
let errorMessageOutput = form.querySelector('.error-message');
let infoMessageOutput = form.querySelector('.info-message');
let nameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let phoneInput = document.getElementById('phone');
let commentsInput = document.getElementById('comments');
let commentsCounter = document.getElementById('comments-counter');
let nameRegex = new RegExp("^[\\p{L} .'-]+$","u");
let phoneRegex = new RegExp("^[0-9]*$");
let formErrorsField = document.getElementById('form-errors');
let formErrors = [];
let submitButton = form.querySelector('button');

nameInput.addEventListener('invalid', function(event) {
    validateNameInput();
});

emailInput.addEventListener('invalid', function(event) {
    validateEmailInput();
});

phoneInput.addEventListener('invalid', function(event) {
    validatePhoneInput();
});

commentsInput.addEventListener('input', updateCommentsCounter);
nameInput.addEventListener('input', regexNameInput);
phoneInput.addEventListener('input', regexPhoneInput);
emailInput.addEventListener('input', emailReset);

submitButton.addEventListener('click', submitErrors);

nameInput.addEventListener('focus', checkEmptyField);
emailInput.addEventListener('focus', checkEmptyField);
phoneInput.addEventListener('focus', checkEmptyField);
nameInput.addEventListener('blur', clearInfoIfNoComments);
emailInput.addEventListener('blur', clearInfoIfNoComments);
phoneInput.addEventListener('blur', clearInfoIfNoComments);

const COMMENTS_MAX = commentsInput.maxLength;

const COMMENT_MILESTONES = [
    { limit: 50,  message: "Okay Shakespeare, warming up I see..." },
    { limit: 100, message: "You're definitely feeling things today." },
    { limit: 150, message: "At this point you're basically writing a novella." },
    { limit: 200, message: "Slow down Hemingway, save some words for the rest of us." },
    { limit: 300, message: "This is no longer a comment. This is a manifesto." },
    { limit: 400, message: "I hope your keyboard is insured." },
    { limit: 500, message: "If you're still going, I'm calling a publisher." }
];


form.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('invalid', recordErrorMessage, true);
});

function recordErrorMessage(event){
    let field = event.target;
    formErrors.push({
        field: field.name,
        value: field.value,
        message: field.validationMessage
    });
}

function submitErrors(event){
    formErrorsField.value = JSON.stringify(formErrors);
}

function validateNameInput(){
    if(nameInput.validity.valueMissing){
        nameInput.setCustomValidity('Name is required.');
    } else if(nameInput.value.length < 3){
        nameInput.setCustomValidity('Name must be at least 3 characters long.');
    } else {
        nameInput.setCustomValidity('');
    }
}

function regexNameInput(){
    nameInput.setCustomValidity('');
    if (!nameRegex.test(nameInput.value)) {
        errorMessageOutput.textContent = 'Removed invalid character';
        nameInput.value = nameInput.value.replace(/[^\p{L} .'\-]/gu, '');
        nameInput.classList.add('flash');
        setTimeout(() => { nameInput.classList.remove('flash'); }, 400);
        setTimeout(() => { errorMessageOutput.textContent = ''; }, 1000);
    }
}

function validateEmailInput(){
    if(emailInput.validity.valueMissing){
        emailInput.setCustomValidity('Email is required.');
    } else if(emailInput.value.length < 5){
        emailInput.setCustomValidity('Email must be at least 5 characters long.');
    } else if(emailInput.validity.typeMismatch){
        emailInput.setCustomValidity('Please enter a valid email address.');
    } else {
        emailInput.setCustomValidity('');
    }
}

function emailReset(){
    emailInput.setCustomValidity('');
}

function validatePhoneInput(){
    if(phoneInput.validity.valueMissing){
        phoneInput.setCustomValidity('Phone number is required.');
    } else if(phoneInput.value.length < 4){
        phoneInput.setCustomValidity('Phone number must be at least 4 characters long.');
    } else {
        phoneInput.setCustomValidity('');
    }
}

function regexPhoneInput(){
    phoneInput.setCustomValidity('');
    if (!phoneRegex.test(phoneInput.value)) {
        errorMessageOutput.textContent = 'Removed invalid character';
        phoneInput.value = phoneInput.value.replace(/[^0-9]/g, '');
        phoneInput.classList.add('flash');
        setTimeout(() => { phoneInput.classList.remove('flash'); }, 400);
        setTimeout(() => { errorMessageOutput.textContent = ''; }, 1000);
    }
}

function updateCommentsCounter() {
    const remaining = COMMENTS_MAX - commentsInput.value.length;
    const length = commentsInput.value.length;
    commentsCounter.textContent = `${remaining} characters remaining`;
    if (remaining <= 200) {
        commentsCounter.classList.add('warning');
    } else {
        commentsCounter.classList.remove('warning');
    }

    let milestoneMessage = "";
    for (let milestone of COMMENT_MILESTONES) {
        if (length >= milestone.limit) {
            milestoneMessage = milestone.message;
        }
    }

    console.log(milestoneMessage);

    infoMessageOutput.textContent = milestoneMessage;
}

function checkEmptyField(event) {
    const field = event.target;
    if (field.value.trim() === '') {
        let instruction = '';
        if (field === nameInput) {
            instruction = 'Please enter your full name (at least 3 characters).';
        } else if (field === emailInput) {
            instruction = 'Please enter a valid email address.';
        } else if (field === phoneInput) {
            instruction = 'Please enter your phone number (digits only, no dashes).';
        }
        infoMessageOutput.textContent = instruction;
    }
}

function clearInfoIfNoComments(event) {
    if (commentsInput.value.length === 0 || commentsInput.value.length < 50) {
        infoMessageOutput.textContent = '';
    }
}

updateCommentsCounter();
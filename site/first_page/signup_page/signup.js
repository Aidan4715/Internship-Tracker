// This is the signup page area
const signupStep = document.getElementById("signup-step");
const form = document.getElementById("signup-form");
const errorBox = document.getElementById("signup-error");
const button = form.querySelector("button[type=submit]");



// This is the recovery code page area
const codeStep = document.getElementById("code-step");
const codeValue = document.getElementById("recovery-code");
const savedBox = document.getElementById("code-saved");
const codeForm = document.getElementById("code-form");
const continueBtn = document.getElementById("code-continue");
const copyBtn = document.getElementById("copy-code");



// This will show the error message
function showError(message){
    errorBox.textContent = message;
    errorBox.hidden = !message;
}

// This will lock the button and display a spinner while loading
function setBusy(busy){
    button.disabled = busy;
    button.setAttribute("aria-busy", busy);

    if(busy){
        button.innerHTML = '<span class="spinner" aria-hidden="true"></span>Creating account...';
    }
    else{
        button.textContent = "Create account";
    }
}

// Swapping the signup page to the recovery code page
function showCodeStep(code){
    codeValue.textContent = code
    signupStep.hidden = true;
    codeStep.hidden = false;
}
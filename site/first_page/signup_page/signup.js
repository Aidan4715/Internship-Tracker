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
    codeValue.textContent = code;
    signupStep.hidden = true;
    codeStep.hidden = false;
}

// Whenever button or enter is pressed the signup form will be submitted
form.addEventListener("submit", async(event) =>{
    event.preventDefault();
    showError("");

    const username = form.eleements.username.value.trim();
    const password = form.elements.password.value;
    const confirm = form.elements.confirm.value;

    if(password !== confirm){
        showError("Passwords do not match.");
        return;
    }

    setBusy(true);

    try{
        const response = await("/api/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password})
        });

        if(response.ok){
            const data = await response.json();
            showCodeStep(data.recoveryCode);
            return
        }

        if(response.status === 409){
            showError("Sorry that username was already taken.");
        }
        else if(response.status === 403){
            showError("New accounts are currelty not being accepted");
        }
        else{
            showError("Something went broke. Please try again");
        }
    }
    catch{
        showError("Server was not able to be reached")
    }
    
    setBusy(false);
})
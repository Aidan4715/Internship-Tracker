
// getting the parts of the page
const form = document.getElementById("login-form");         //getting the form as a whole
const errorBox = document.getElementById("login-error");    //the empty red box
const button = form.querySelector("button[type=submit]");   //gets the sign in button

// putting a message in teh error box
function showError(message) {
    errorBox.textContent = message;
    errorBox.hidden = !message;             //empty msg = hidden
}

// turning the buttons to busy when signing in/successful activity
function setBusy(busy){
    button.disabled = busy;
    button.setAttribute("aria-busy", busy);

    if (busy){
        button.innerHTML = '<span class="spinner" aria-hidden="true"></span>Signing in...';
    }
    else{
        button.textContent = "Sign in";
    }
}

// code for when the form is submitted
form.addEventListener("submit", async (event)=> {
    event.preventDefault();                         //stops the page reloding

    showError("");
    setBusy(true);

    const username = form.elements.username.value.trim();
    const password = form.elements.password.value;            

    try{
        const response = await fetch("/api/login", {                    //sending to the server to get results
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password})
        });
        if(response.ok){                                                //success
            window.location.href = "../../index.html";                  //goes to the main site
            return;
        }
        if(response.status === 401){                                    //wrong details
            showError("Incorrect username or password.");
        }
        else{                                                           //server problem
            showError("Something went wrong. PLease try again.");
        }
    }

    catch {                                                             //no reply at all
        showError("Can't reach the server.");
    }

    setBusy(false);                                                      //button comes back to normal
});
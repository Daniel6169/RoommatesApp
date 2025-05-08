const dataBase_id = "1347221981413695488";
var database_content = {};

function uploadData() {
    axios.put(`https://jsonblob.com/api/jsonBlob/${dataBase_id}`, database_content)
    .then(function(response) {
        console.log("Data uploaded:", response.data);
    })
    .catch(function(error) {
        console.error("Error uploading data:", error);
    });
}

function downloadData() {
    axios.get(`https://jsonblob.com/api/jsonBlob/${dataBase_id}`)
    .then(function(response) {
        console.log("Data downloaded:", response.data);
        database_content = response.data || {};
        
    })
    .catch(function(error) {
        console.error("Error downloading data:", error);
        
    });
}

downloadData(); // Download data from the server on page load

// This function displays the login form
function displayLogin() {
    const loginForm = document.getElementById("login");
    const registerForm = document.getElementById("register");
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    loginForm.innerHTML = `
        <h1>Login</h1>
        <form id="login-form" onsubmit="loginUser(event)">
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
            <button type="button" class="btn btn-secondary" onclick="displayRegister()">Register</button>
        </form>
    `;
}
window.onload = displayLogin; // Call the function that displays the login form

// This function displays the register form
function displayRegister() {
    const loginForm = document.getElementById("login");
    const registerForm = document.getElementById("register");
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    registerForm.innerHTML = `
        <h1>Register</h1>
        <form id="register-form" onsubmit="registerUser(event)">
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="new_username" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="new_password" required>
            </div>
            <div class="mb-3">
                <label for="confirm-password" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="confirm-password" required>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
            <button type="button" class="btn btn-secondary" onclick="displayLogin()">Login</button>
        </form>
    `;
}

function registerUser(event) {
    event.preventDefault(); // Prevent form from reloading the page

    let username = document.getElementById("new_username").value;
    let password = document.getElementById("new_password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    

    let user = { username, password };

    database_content.users.push(user);
    uploadData();
    alert("User registered successfully");
    displayLogin();
}
function loginUser(event){
    event.preventDefault();//prevents form from reloading page
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    
    if (database_content.users.some(users => users.username === username && users.password === password)){
        window.location.href = "roommates.html";
    }
    else{
        alert("Username and Password doesn't match or is wrong");
    }
    
}
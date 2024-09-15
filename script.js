/* 
PROJECT: Basic Login Authentication System

1. Project Overview:
Create a simple login authentication system using JavaScript that allows users to register, log in, and access a secured page.

2. Requirements:
- User registration feature where users can sign up with a username and password.
- Securely store user information (hashed password, not in plain text).
- Login feature to verify credentials and grant access to a secured page.
- Secured page should be accessible only to logged-in users.

3. Tools and Technologies:
- Programming language: JavaScript (HTML, CSS).
- Use Web Cryptography API for password hashing.

4. Implementation Steps:
a. User Registration:
- Prompt the user to enter a username and password.
- Hash the password using the `crypto.subtle` Web API before storing.
- Store the username and hashed password in localStorage.
b. User Login:
- Verify the user's credentials by comparing the hashed password.
c. Secured Page:
- Display a simple secured page to authenticated users.

5. Error Handling:
- Handle errors for existing users, incorrect credentials, empty fields, etc.
6. Testing:
- Test for both positive and negative cases (valid login, wrong credentials).
*/

// Show Register Form
function showRegister() {
	document.getElementById("login-form").style.display = "none";
	document.getElementById("register-form").style.display = "block";
	document.getElementById("form-title").innerText = "Register";
	clearInputs();
}

// Show Login Form
function showLogin() {
	document.getElementById("login-form").style.display = "block";
	document.getElementById("register-form").style.display = "none";
	document.getElementById("form-title").innerText = "Login";
	clearInputs();
}

// Clear input fields
function clearInputs() {
	document.getElementById("username").value = "";
	document.getElementById("password").value = "";
	document.getElementById("new-username").value = "";
	document.getElementById("new-password").value = "";
	document.getElementById("message").innerText = ""; // Clear any error messages
	document.getElementById("register-message").innerText = "";
}

// Password hashing function using Web Cryptography API
async function hashPassword(password) {
	const encoder = new TextEncoder();
	const data = encoder.encode(password);
	const hash = await crypto.subtle.digest("SHA-256", data);
	return btoa(String.fromCharCode(...new Uint8Array(hash)));
}

// Register New User
async function register() {
	const newUsername = document.getElementById("new-username").value;
	const newPassword = document.getElementById("new-password").value;
	const existingUser = localStorage.getItem(newUsername);

	if (newUsername === "" || newPassword === "") {
		document.getElementById("register-message").innerText =
			"Please fill all fields.";
	} else if (existingUser) {
		document.getElementById("register-message").innerText =
			"Username already exists.";
	} else {
		const hashedPassword = await hashPassword(newPassword);
		localStorage.setItem(newUsername, hashedPassword);
		document.getElementById("register-message").innerText =
			"Registration successful!";
		setTimeout(showLogin, 1500);
	}
}

// Login User
async function login() {
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	const storedHashedPassword = localStorage.getItem(username);

	if (username === "" || password === "") {
		document.getElementById("message").innerText = "Please fill all fields.";
	} else if (!storedHashedPassword) {
		document.getElementById("message").innerText = "Username does not exist.";
	} else {
		const hashedPassword = await hashPassword(password);
		if (storedHashedPassword === hashedPassword) {
			document.getElementById("message").innerText = "";
			document.getElementById("form-container").style.display = "none";
			document.getElementById("secured-page").style.display = "block";
		} else {
			document.getElementById("message").innerText = "Invalid password.";
		}
	}
}

// Logout User
function logout() {
	document.getElementById("form-container").style.display = "block";
	document.getElementById("secured-page").style.display = "none";
	showLogin();
}

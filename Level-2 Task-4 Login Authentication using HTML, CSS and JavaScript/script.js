let isLogin = true;

// Switch between Login/Register
function toggleForm() {
  isLogin = !isLogin;
  document.getElementById("form-title").innerText = isLogin ? "Login" : "Register";
  document.querySelector("button").innerText = isLogin ? "Login" : "Register";
  document.querySelector(".link").innerText = isLogin ? "Don't have an account? Register" : "Already have an account? Login";
}

// Handle Login/Register
function submitForm() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please fill all fields!");
    return;
  }

  if (isLogin) {
    // LOGIN
    const storedUser = JSON.parse(localStorage.getItem(username));
    if (storedUser && storedUser.password === password) {
      localStorage.setItem("loggedInUser", username); // store session
      showSecurePage();
    } else {
      alert("Invalid username or password!");
    }
  } else {
    // REGISTER
    if (localStorage.getItem(username)) {
      alert("User already exists!");
    } else {
      localStorage.setItem(username, JSON.stringify({ username, password }));
      alert("Registration successful! You can now login.");
      toggleForm();
    }
  }
}

// Show secure page if logged in
function showSecurePage() {
  document.getElementById("auth-container").style.display = "none";
  document.getElementById("secure-page").style.display = "block";
}

// Logout function
function logout() {
  localStorage.removeItem("loggedInUser");
  document.getElementById("auth-container").style.display = "block";
  document.getElementById("secure-page").style.display = "none";
}

// Auto-login if session exists
window.onload = function() {
  if (localStorage.getItem("loggedInUser")) {
    showSecurePage();
  }
}

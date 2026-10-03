const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {

        const response = await fetch(
            "https://hunarhub-backend-i8s7.onrender.com/api/users/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        const data = await response.json();

        console.log("Login response:", data);

        if (!response.ok) {
            alert(data.message || "Login failed");
            return;
        }

        if (data.token) {
            localStorage.setItem("token", data.token);
        } else {
            alert("Login successful, but token was not received.");
            return;
        }

        alert("Login successful!");

        window.location.href = "dashboard.html";

    } catch (error) {

        console.error("Login error:", error);

        alert("Unable to connect to server. Make sure the backend is running.");

    }

});
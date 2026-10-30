
// ================= ADD PRODUCT =================

async function addProduct() {

    const name = document.getElementById("name").value.trim();
    const category = document.getElementById("category").value.trim();
    const description = document.getElementById("description").value.trim();
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value.trim();

    // Get entrepreneur token
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    // Validate product details
    if (!name || !category || !description || !price) {
        alert("Please fill in all required product fields.");
        return;
    }

    if (Number(price) <= 0 || !Number.isFinite(Number(price))) {
        alert("Please enter a valid product price.");
        return;
    }

    try {

        const response = await fetch(
            "https://hunarhub-backend-i8s7.onrender.com/api/products/create",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },

                body: JSON.stringify({
                    name,
                    category,
                    description,
                    price: Number(price),
                    image
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Product added successfully!");

            window.location.href = "products.html";

        } else {

            alert(data.message || "Unable to add product.");

        }

    } catch (error) {

        console.error("Add product error:", error);

        alert("Unable to connect to the server. Please try again.");

    }
}

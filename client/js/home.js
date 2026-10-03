async function loadHomeProducts() {

    try {

        const response = await fetch(
            "https://hunarhub-backend-i8s7.onrender.com/api/products"
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const products = data.products || [];

        const container = document.getElementById("featuredProducts");

        container.innerHTML = "";

        if (products.length === 0) {
            container.innerHTML = "<p>No products available yet.</p>";
            return;
        }

        products.forEach(product => {

            container.innerHTML += `

                <div class="product-card">

                    <img src="images/${product.image}" alt="${product.name}">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${product.description}
                    </p>

                    <p>
                        <strong>₹${product.price}</strong>
                    </p>

                    <button onclick="viewProduct('${product._id}')">
                        View Product
                    </button>

                </div>

            `;

        });

    } catch (error) {

        console.error("Error loading products:", error);

        const container = document.getElementById("featuredProducts");

        if (container) {
            container.innerHTML =
                "<p>Unable to load products. Please try again later.</p>";
        }

    }

}


function viewProduct(id) {

    window.location.href =
        "product-details.html?id=" + id;

}


loadHomeProducts();
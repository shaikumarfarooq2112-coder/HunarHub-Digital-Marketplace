
const API_BASE = "https://hunarhub-backend-i8s7.onrender.com";
const token = localStorage.getItem("token");

// Check login
if (!token) {
    alert("Please login first");
    window.location.href = "login.html";
}

// Display a message safely
function showOrderMessage(container, message) {
    container.replaceChildren();

    const paragraph = document.createElement("p");
    paragraph.textContent = message;
    container.appendChild(paragraph);
}

// Load orders belonging to the logged-in customer
async function getMyOrders() {
    const orderList = document.getElementById("orderList");

    if (!orderList) {
        console.error(
            'Cannot find element with id="orderList" in orders.html'
        );
        return;
    }

    if (!token) return;

    showOrderMessage(orderList, "Loading your orders...");

    try {
        const response = await fetch(
            `${API_BASE}/api/orders/my-orders`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        console.log("My orders HTTP status:", response.status);
        console.log("My orders API response:", data);

        if (!response.ok) {
            showOrderMessage(
                orderList,
                data.message || `Could not load orders (HTTP ${response.status}).`
            );
            return;
        }

        if (!Array.isArray(data.orders)) {
            showOrderMessage(
                orderList,
                "The server response does not contain an orders list. Check the backend response."
            );
            return;
        }

        if (data.orders.length === 0) {
            showOrderMessage(orderList, "No orders found for this account.");
            return;
        }

        orderList.replaceChildren();

        data.orders.forEach(order => {
            const card = document.createElement("div");
            card.className = "product-card";

            const title = document.createElement("h3");
            title.textContent =
                order.product?.name ||
                order.product?.title ||
                "Product details unavailable";

            const quantity = document.createElement("p");
            quantity.textContent = `Quantity: ${order.quantity ?? 0}`;

            const price = document.createElement("p");
            price.textContent =
                `Total Price: ₹${order.totalPrice ?? 0}`;

            const status = document.createElement("p");
            status.textContent = `Status: ${order.status || "Pending"}`;

            card.append(title, quantity, price, status);
            orderList.appendChild(card);
        });

    } catch (error) {
        console.error("Customer orders loading error:", error);

        showOrderMessage(
            orderList,
            "Unable to contact the order service. Please try again."
        );
    }
}

// Dashboard button
function goDashboard() {
    window.location.href = "dashboard.html";
}

// Load orders when the page opens
getMyOrders();


/* =====================================================
   CHECK LOGIN TOKEN AND USER ROLE
===================================================== */

const token = localStorage.getItem("token");
let user = null;

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

function decodeToken(tokenValue) {
    try {
        const payload = tokenValue.split(".")[1];
        const base64 = payload
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        return JSON.parse(
            decodeURIComponent(
                atob(base64)
                    .split("")
                    .map(char =>
                        "%" + char.charCodeAt(0)
                            .toString(16).padStart(2, "0")
                    )
                    .join("")
            )
        );
    } catch (error) {
        console.error("Unable to read login token:", error);
        return null;
    }
}

if (!token) {
    alert("Please login first");
    window.location.href = "login.html";
} else {
    user = decodeToken(token);

    if (!user || !user.role) {
        localStorage.removeItem("token");
        alert("Your login session is invalid. Please log in again.");
        window.location.href = "login.html";
    }
}

/* =====================================================
   SHOW NAVIGATION AND CONTENT BY ROLE
===================================================== */

function configureDashboard() {
    if (!user) return;

    const adminLink = document.getElementById("adminLink");
    const categorySkillsLink =
        document.getElementById("categorySkillsLink");
    const addProductLink = document.getElementById("addProductLink");

    const earningsSection =
        document.getElementById("earningsSection");
    const serviceSection =
        document.getElementById("serviceRequestsSection");
    const ordersSection =
        document.getElementById("ordersSection");

    if (adminLink) {
        adminLink.hidden = user.role !== "admin";
    }

    if (categorySkillsLink) {
        categorySkillsLink.hidden = user.role !== "admin";
    }

    if (addProductLink) {
        addProductLink.hidden = user.role !== "entrepreneur";
    }

    // Only entrepreneurs see entrepreneur earnings and management sections.
    if (user.role !== "entrepreneur") {
        if (earningsSection) earningsSection.hidden = true;
        if (serviceSection) serviceSection.hidden = true;
        if (ordersSection) ordersSection.hidden = true;
    }

    const heading = document.querySelector(".container h1");
    const description = document.querySelector(".container > p");

    if (heading) {
        if (user.role === "admin") {
            heading.textContent = "Welcome to HunarHub Admin Dashboard";
        } else if (user.role === "entrepreneur") {
            heading.textContent = "Welcome to HunarHub Entrepreneur Dashboard";
        } else {
            heading.textContent = "Welcome to HunarHub Customer Dashboard";
        }
    }

    if (description) {
        if (user.role === "admin") {
            description.textContent =
                "Manage entrepreneurs, categories, skills and complaints.";
        } else if (user.role === "entrepreneur") {
            description.textContent =
                "Manage your products, orders, earnings and service requests.";
        } else {
            description.textContent =
                "Explore products, manage orders and request services.";
        }
    }
}

/* =====================================================
   GET ENTREPRENEUR SERVICE REQUESTS
===================================================== */

async function getServiceRequests() {
    try {
        const response = await fetch(
            "https://hunarhub-backend-i8s7.onrender.com/api/service-requests/entrepreneur",
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        const data = await response.json();
        const requestList = document.getElementById("requestList");

        if (!requestList) return;

        if (!response.ok) {
            requestList.textContent =
                data.message || "Unable to load service requests.";
            return;
        }

        requestList.innerHTML = "";

        if (!data.requests || data.requests.length === 0) {
            requestList.textContent = "No service requests found.";
            return;
        }

        data.requests.forEach(request => {
            const card = document.createElement("div");
            card.className = "product-card";

            const title = document.createElement("h3");
            title.textContent = request.service || "Service request";

            const customer = document.createElement("p");
            customer.textContent =
                "Customer: " + (request.customer?.name || "Unknown");

            const description = document.createElement("p");
            description.textContent =
                "Description: " + (request.description || "Not provided");

            const date = document.createElement("p");
            date.textContent = "Date: " +
                (request.date
                    ? new Date(request.date).toLocaleDateString()
                    : "Not specified");

            const status = document.createElement("p");
            status.textContent = "Status: " + (request.status || "Pending");

            card.append(title, customer, description, date, status);

            ["Accepted", "Rejected"].forEach(newStatus => {
                const button = document.createElement("button");
                button.textContent = newStatus;
                button.addEventListener("click", () =>
                    updateStatus(request._id, newStatus)
                );
                card.appendChild(button);
            });

            requestList.appendChild(card);
        });
    } catch (error) {
        console.error("Service request error:", error);
        const list = document.getElementById("requestList");
        if (list) list.textContent = "Unable to load service requests.";
    }
}

/* =====================================================
   UPDATE SERVICE REQUEST STATUS
===================================================== */

async function updateStatus(id, status) {
    try {
        const response = await fetch(
            `https://hunarhub-backend-i8s7.onrender.com/api/service-requests/update/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify({ status })
            }
        );

        const data = await response.json();
        alert(data.message || (response.ok ? "Request updated." : "Update failed."));

        if (response.ok) await getServiceRequests();
    } catch (error) {
        console.error("Update service request error:", error);
        alert("Unable to update the service request.");
    }
}

/* =====================================================
   GET ENTREPRENEUR ORDERS
===================================================== */

async function getEntrepreneurOrders() {
    try {
        const response = await fetch(
            "https://hunarhub-backend-i8s7.onrender.com/api/orders/entrepreneur",
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        const data = await response.json();
        const ordersList = document.getElementById("recentOrders");

        if (!ordersList) return;

        if (!response.ok) {
            ordersList.textContent =
                data.message || "Unable to load orders.";
            return;
        }

        ordersList.innerHTML = "";

        if (!data.orders || data.orders.length === 0) {
            ordersList.textContent = "No orders found.";
            return;
        }

        data.orders.slice(0, 5).forEach(order => {
            const card = document.createElement("div");
            card.className = "product-card";

            const title = document.createElement("h3");
            title.textContent = order.product?.name || "Product";

            const customer = document.createElement("p");
            customer.textContent =
                "Customer: " + (order.customer?.name || "Unknown");

            const quantity = document.createElement("p");
            quantity.textContent = "Quantity: " + (order.quantity ?? 0);

            const price = document.createElement("p");
            price.textContent = "Total Price: ₹" + (order.totalPrice ?? 0);

            const status = document.createElement("p");
            status.textContent = "Status: " + (order.status || "Pending");

            card.append(title, customer, quantity, price, status);

            [
                ["Confirm", "Confirmed"],
                ["Complete", "Completed"],
                ["Cancel", "Cancelled"]
            ].forEach(([label, statusValue]) => {
                const button = document.createElement("button");
                button.textContent = label;
                button.addEventListener("click", () =>
                    updateOrderStatus(order._id, statusValue)
                );
                card.appendChild(button);
            });

            ordersList.appendChild(card);
        });
    } catch (error) {
        console.error("Entrepreneur orders error:", error);
        const list = document.getElementById("recentOrders");
        if (list) list.textContent = "Unable to load orders.";
    }
}

/* =====================================================
   UPDATE ORDER STATUS
===================================================== */

async function updateOrderStatus(id, status) {
    try {
        const response = await fetch(
            `https://hunarhub-backend-i8s7.onrender.com/api/orders/update/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify({ status })
            }
        );

        const data = await response.json();
        alert(data.message || (response.ok ? "Order updated." : "Update failed."));

        if (response.ok) {
            await getEntrepreneurOrders();
            await loadEarnings();
        }
    } catch (error) {
        console.error("Update order error:", error);
        alert("Unable to update the order.");
    }
}

/* =====================================================
   LOAD ENTREPRENEUR EARNINGS
===================================================== */

async function loadEarnings() {
    try {
        const response = await fetch(
            "https://hunarhub-backend-i8s7.onrender.com/api/entrepreneurs/earnings",
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Earnings error:", data.message);
            return;
        }

        const values = {
            totalEarnings: "₹" + (data.totalEarnings ?? 0),
            totalSales: "₹" + (data.totalSales ?? 0),
            completedOrders: data.completedOrders ?? 0,
            pendingOrders: data.pendingOrders ?? 0,
            confirmedOrders: data.confirmedOrders ?? 0
        };

        Object.entries(values).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    } catch (error) {
        console.error("Earnings error:", error);
    }
}

/* =====================================================
   START DASHBOARD
===================================================== */

async function loadDashboard() {
    if (!user) return;

    configureDashboard();

    if (user.role === "entrepreneur") {
        await Promise.all([
            getServiceRequests(),
            getEntrepreneurOrders(),
            loadEarnings()
        ]);
    }
}

loadDashboard();

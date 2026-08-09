// =====================================================
// CHECK LOGIN TOKEN
// =====================================================

const token = localStorage.getItem("token");

if (!token) {

    alert("Please login first");

    window.location.href = "login.html";

}


// =====================================================
// LOGOUT
// =====================================================

function logout() {

    localStorage.removeItem("token");

    alert("Logout successful");

    window.location.href = "login.html";

}


// =====================================================
// GET USER ROLE
// =====================================================

let user = null;

try {

    user = JSON.parse(
        atob(token.split(".")[1])
    );

}
catch (error) {

    console.log("Invalid token");

}


// =====================================================
// GET ENTREPRENEUR SERVICE REQUESTS
// =====================================================

async function getServiceRequests() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/service-requests/entrepreneur",
            {

                method: "GET",

                headers: {

                    "Authorization":
                        "Bearer " + token

                }

            }
        );


        const data =
            await response.json();


        const requestList =
            document.getElementById(
                "requestList"
            );


        if (!requestList) {

            return;

        }


        requestList.innerHTML = "";


        if (
            !data.requests ||
            data.requests.length === 0
        ) {

            requestList.innerHTML =
                "<p>No service requests found.</p>";

            return;

        }


        data.requests.forEach(
            request => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "product-card";


                card.innerHTML = `

                    <h3>
                        ${request.service}
                    </h3>

                    <p>
                        <strong>Customer:</strong>
                        ${request.customer?.name || "Unknown"}
                    </p>

                    <p>
                        <strong>Description:</strong>
                        ${request.description}
                    </p>

                    <p>
                        <strong>Date:</strong>
                        ${new Date(
                            request.date
                        ).toLocaleDateString()}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        ${request.status}
                    </p>


                    <button
                        onclick="updateStatus(
                            '${request._id}',
                            'Accepted'
                        )"
                    >
                        Accept
                    </button>


                    <button
                        onclick="updateStatus(
                            '${request._id}',
                            'Rejected'
                        )"
                    >
                        Reject
                    </button>

                `;


                requestList.appendChild(
                    card
                );

            }
        );

    }
    catch (error) {

        console.log(
            "Service request error:",
            error
        );

    }

}


// =====================================================
// UPDATE SERVICE REQUEST STATUS
// =====================================================

async function updateStatus(
    id,
    status
) {

    try {

        const response =
            await fetch(
                `http://localhost:5000/api/service-requests/update/${id}`,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            "Bearer " + token

                    },

                    body: JSON.stringify({

                        status: status

                    })

                }
            );


        const data =
            await response.json();


        alert(data.message);


        getServiceRequests();

    }
    catch (error) {

        console.log(
            "Update service request error:",
            error
        );

    }

}


// =====================================================
// GET ENTREPRENEUR ORDERS
// =====================================================

async function getEntrepreneurOrders() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/orders/entrepreneur",
                {

                    method: "GET",

                    headers: {

                        "Authorization":
                            "Bearer " + token

                    }

                }
            );


        const data =
            await response.json();


        const ordersList =
            document.getElementById(
                "recentOrders"
            );


        if (!ordersList) {

            return;

        }


        ordersList.innerHTML = "";


        if (
            !data.orders ||
            data.orders.length === 0
        ) {

            ordersList.innerHTML =
                "<p>No orders found.</p>";

            return;

        }


        data.orders
            .slice(0, 5)
            .forEach(order => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "product-card";


                card.innerHTML = `

                    <h3>
                        ${order.product?.name ||
                        "Product"}
                    </h3>


                    <p>
                        <strong>Customer:</strong>
                        ${order.customer?.name ||
                        "Unknown"}
                    </p>


                    <p>
                        <strong>Quantity:</strong>
                        ${order.quantity}
                    </p>


                    <p>
                        <strong>Total Price:</strong>
                        ₹${order.totalPrice}
                    </p>


                    <p>
                        <strong>Status:</strong>
                        ${order.status}
                    </p>


                    <button
                        onclick="updateOrderStatus(
                            '${order._id}',
                            'Confirmed'
                        )"
                    >
                        Confirm
                    </button>


                    <button
                        onclick="updateOrderStatus(
                            '${order._id}',
                            'Completed'
                        )"
                    >
                        Complete
                    </button>


                    <button
                        onclick="updateOrderStatus(
                            '${order._id}',
                            'Cancelled'
                        )"
                    >
                        Cancel
                    </button>

                `;


                ordersList.appendChild(
                    card
                );

            });

    }
    catch (error) {

        console.log(
            "Entrepreneur orders error:",
            error
        );

    }

}


// =====================================================
// UPDATE ORDER STATUS
// =====================================================

async function updateOrderStatus(
    id,
    status
) {

    try {

        const response =
            await fetch(
                `http://localhost:5000/api/orders/update/${id}`,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            "Bearer " + token

                    },

                    body: JSON.stringify({

                        status: status

                    })

                }
            );


        const data =
            await response.json();


        alert(data.message);


        getEntrepreneurOrders();

        loadEarnings();

    }
    catch (error) {

        console.log(
            "Update order error:",
            error
        );

    }

}


// =====================================================
// LOAD ENTREPRENEUR EARNINGS
// =====================================================

async function loadEarnings() {

    if (!token) {

        return;

    }


    try {

        const response =
            await fetch(
                "http://localhost:5000/api/entrepreneurs/earnings",
                {

                    method: "GET",

                    headers: {

                        "Authorization":
                            "Bearer " + token

                    }

                }
            );


        const data =
            await response.json();


        console.log(
            "Earnings:",
            data
        );


        if (!response.ok) {

            console.log(
                data.message
            );

            return;

        }


        const totalEarnings =
            document.getElementById(
                "totalEarnings"
            );


        const totalSales =
            document.getElementById(
                "totalSales"
            );


        const completedOrders =
            document.getElementById(
                "completedOrders"
            );


        const pendingOrders =
            document.getElementById(
                "pendingOrders"
            );


        const confirmedOrders =
            document.getElementById(
                "confirmedOrders"
            );


        if (totalEarnings) {

            totalEarnings.textContent =
                "₹" +
                data.totalEarnings;

        }


        if (totalSales) {

            totalSales.textContent =
                "₹" +
                data.totalSales;

        }


        if (completedOrders) {

            completedOrders.textContent =
                data.completedOrders;

        }


        if (pendingOrders) {

            pendingOrders.textContent =
                data.pendingOrders;

        }


        if (confirmedOrders) {

            confirmedOrders.textContent =
                data.confirmedOrders;

        }

    }
    catch (error) {

        console.log(
            "Earnings error:",
            error
        );

    }

}


// =====================================================
// LOAD DASHBOARD
// =====================================================

function loadDashboard() {

    if (!user) {

        return;

    }


    // ENTREPRENEUR DASHBOARD

    if (
        user.role === "entrepreneur"
    ) {

        getServiceRequests();

        getEntrepreneurOrders();

        loadEarnings();

    }


    // CUSTOMER DASHBOARD

    else {

        const serviceSection =
            document.getElementById(
                "serviceRequestsSection"
            );


        if (serviceSection) {

            serviceSection.style.display =
                "none";

        }


        const ordersSection =
            document.getElementById(
                "ordersSection"
            );


        if (ordersSection) {

            ordersSection.style.display =
                "none";

        }

    }

}


// =====================================================
// GO TO ORDERS
// =====================================================

function goOrders() {

    window.location.href =
        "orders.html";

}


// =====================================================
// START DASHBOARD
// =====================================================

loadDashboard();
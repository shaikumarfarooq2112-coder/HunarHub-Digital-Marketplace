// =====================================================
// ADMIN DASHBOARD
// =====================================================


// ================= CHECK TOKEN =================

const token = localStorage.getItem("token");


if (!token) {

    alert("Please login first.");

    window.location.href = "login.html";

}


// ================= HEADERS =================

const headers = {

    "Authorization": "Bearer " + token,

    "Content-Type": "application/json"

};


// =====================================================
// LOAD DASHBOARD STATISTICS
// =====================================================

async function loadStats() {

    try {

        const response = await fetch(
            "https://https://hunarhub-backend-i8s7.onrender.com/api/admin/stats",
            {
                method: "GET",
                headers: headers
            }
        );


        const data = await response.json();


        console.log("Admin Stats:", data);


        if (!response.ok) {

            alert(data.message);

            return;

        }


        document.getElementById(
            "totalUsers"
        ).textContent = data.totalUsers;


        document.getElementById(
            "totalEntrepreneurs"
        ).textContent =
            data.totalEntrepreneurs;


        document.getElementById(
            "pendingEntrepreneurs"
        ).textContent =
            data.pendingEntrepreneurs;


        document.getElementById(
            "totalProducts"
        ).textContent =
            data.totalProducts;


        document.getElementById(
            "totalOrders"
        ).textContent =
            data.totalOrders;


        document.getElementById(
            "totalRequests"
        ).textContent =
            data.totalServiceRequests;


    }
    catch (error) {

        console.error(
            "Stats error:",
            error
        );

    }

}


// =====================================================
// LOAD ENTREPRENEURS
// =====================================================

async function loadEntrepreneurs() {

    try {

        const response = await fetch(
            "https://https://hunarhub-backend-i8s7.onrender.com/api/admin/entrepreneurs",
            {
                method: "GET",
                headers: headers
            }
        );


        const data = await response.json();


        console.log(
            "Entrepreneurs:",
            data
        );


        const container =
            document.getElementById(
                "entrepreneurList"
            );


        container.innerHTML = "";


        if (
            !data.entrepreneurs ||
            data.entrepreneurs.length === 0
        ) {

            container.innerHTML = `
                
                <div class="admin-card">

                    <h3>
                        No entrepreneurs found
                    </h3>

                </div>

            `;

            return;

        }


        data.entrepreneurs.forEach(
            entrepreneur => {

                const card =
                    document.createElement("div");


                card.className =
                    "admin-card";


                const verifiedText =
                    entrepreneur.verified
                        ? "Verified"
                        : "Pending";


                card.innerHTML = `

                    <h3>
                        ${entrepreneur.name}
                    </h3>

                    <p>
                        <strong>
                            Category:
                        </strong>

                        ${entrepreneur.category}
                    </p>

                    <p>
                        <strong>
                            Location:
                        </strong>

                        ${entrepreneur.location}
                    </p>

                    <p>
                        <strong>
                            Experience:
                        </strong>

                        ${entrepreneur.experience || "Not provided"}
                    </p>

                    <p>
                        <strong>
                            Email:
                        </strong>

                        ${
                            entrepreneur.user
                                ? entrepreneur.user.email
                                : "Not available"
                        }
                    </p>

                    <p>
                        <strong>
                            Status:
                        </strong>

                        <span class="${
                            entrepreneur.verified
                                ? "status-accepted"
                                : "status-pending"
                        }">

                            ${verifiedText}

                        </span>

                    </p>


                    <div class="admin-buttons">

                        ${
                            entrepreneur.verified

                            ?

                            `
                            <button
                                onclick="rejectEntrepreneur('${entrepreneur._id}')">

                                Reject

                            </button>
                            `

                            :

                            `
                            <button
                                onclick="approveEntrepreneur('${entrepreneur._id}')">

                                Approve

                            </button>

                            <button
                                onclick="rejectEntrepreneur('${entrepreneur._id}')">

                                Reject

                            </button>
                            `
                        }

                    </div>

                `;


                container.appendChild(card);

            }
        );

    }
    catch (error) {

        console.error(
            "Entrepreneur error:",
            error
        );

    }

}


// =====================================================
// APPROVE ENTREPRENEUR
// =====================================================

async function approveEntrepreneur(id) {

    try {

        const response = await fetch(

            `https://https://hunarhub-backend-i8s7.onrender.com/api/admin/entrepreneurs/${id}/approve`,

            {

                method: "PUT",

                headers: headers

            }

        );


        const data =
            await response.json();


        alert(data.message);


        if (response.ok) {

            loadStats();

            loadEntrepreneurs();

        }

    }
    catch (error) {

        console.error(error);

        alert(
            "Unable to approve entrepreneur."
        );

    }

}


// =====================================================
// REJECT ENTREPRENEUR
// =====================================================

async function rejectEntrepreneur(id) {

    const confirmReject =
        confirm(
            "Are you sure you want to reject this entrepreneur?"
        );


    if (!confirmReject) {

        return;

    }


    try {

        const response = await fetch(

            `https://https://hunarhub-backend-i8s7.onrender.com/api/admin/entrepreneurs/${id}/reject`,

            {

                method: "PUT",

                headers: headers

            }

        );


        const data =
            await response.json();


        alert(data.message);


        if (response.ok) {

            loadStats();

            loadEntrepreneurs();

        }

    }
    catch (error) {

        console.error(error);

        alert(
            "Unable to reject entrepreneur."
        );

    }

}


// =====================================================
// LOAD ORDERS
// =====================================================

async function loadOrders() {

    try {

        const response = await fetch(
            "https://https://hunarhub-backend-i8s7.onrender.com/api/admin/orders",
            {
                method: "GET",
                headers: headers
            }
        );


        const data =
            await response.json();


        const container =
            document.getElementById(
                "orderList"
            );


        container.innerHTML = "";


        if (
            !data.orders ||
            data.orders.length === 0
        ) {

            container.innerHTML =
                "<p>No orders found.</p>";

            return;

        }


        data.orders.forEach(order => {

            const card =
                document.createElement("div");


            card.className =
                "admin-card";


            card.innerHTML = `

                <h3>
                    Order
                </h3>

                <p>
                    <strong>
                        Order ID:
                    </strong>

                    ${order._id}
                </p>

                <p>
                    <strong>
                        Status:
                    </strong>

                    ${order.status || "Pending"}
                </p>

                <p>
                    <strong>
                        Total:
                    </strong>

                    ₹${order.totalAmount || 0}
                </p>

            `;


            container.appendChild(card);

        });

    }
    catch (error) {

        console.error(
            "Orders error:",
            error
        );

    }

}


// =====================================================
// LOAD SERVICE REQUESTS
// =====================================================

async function loadServiceRequests() {

    try {

        const response = await fetch(
            "https://https://hunarhub-backend-i8s7.onrender.com/api/admin/service-requests",
            {
                method: "GET",
                headers: headers
            }
        );


        const data =
            await response.json();


        const container =
            document.getElementById(
                "requestList"
            );


        container.innerHTML = "";


        if (
            !data.requests ||
            data.requests.length === 0
        ) {

            container.innerHTML =
                "<p>No service requests found.</p>";

            return;

        }


        data.requests.forEach(request => {

            const card =
                document.createElement("div");


            card.className =
                "admin-card";


            card.innerHTML = `

                <h3>
                    ${request.service}
                </h3>

                <p>
                    <strong>
                        Customer:
                    </strong>

                    ${
                        request.customer
                            ? request.customer.name
                            : "Unknown"
                    }
                </p>

                <p>
                    <strong>
                        Entrepreneur:
                    </strong>

                    ${
                        request.entrepreneur
                            ? request.entrepreneur.name
                            : "Unknown"
                    }
                </p>

                <p>
                    <strong>
                        Status:
                    </strong>

                    ${request.status}

                </p>

                <p>
                    <strong>
                        Description:
                    </strong>

                    ${request.description}

                </p>

            `;


            container.appendChild(card);

        });

    }
    catch (error) {

        console.error(
            "Service request error:",
            error
        );

    }

}


// =====================================================
// LOAD USERS
// =====================================================

async function loadUsers() {

    try {

        const response = await fetch(
            "https://https://hunarhub-backend-i8s7.onrender.com/api/admin/users",
            {
                method: "GET",
                headers: headers
            }
        );


        const data =
            await response.json();


        const container =
            document.getElementById(
                "userList"
            );


        container.innerHTML = "";


        if (
            !data.users ||
            data.users.length === 0
        ) {

            container.innerHTML =
                "<p>No users found.</p>";

            return;

        }


        data.users.forEach(user => {

            const card =
                document.createElement("div");


            card.className =
                "admin-card";


            card.innerHTML = `

                <h3>
                    ${user.name}
                </h3>

                <p>
                    <strong>
                        Email:
                    </strong>

                    ${user.email}
                </p>

                <p>
                    <strong>
                        Role:
                    </strong>

                    ${user.role}
                </p>

                <p>
                    <strong>
                        Location:
                    </strong>

                    ${user.location || "Not provided"}
                </p>

            `;


            container.appendChild(card);

        });

    }
    catch (error) {

        console.error(
            "Users error:",
            error
        );

    }

}


// =====================================================
// LOAD EVERYTHING
// =====================================================

loadStats();

loadEntrepreneurs();

loadOrders();

loadServiceRequests();

loadUsers();

const token = localStorage.getItem("token");

const API_URL =
    "https://hunarhub-backend-i8s7.onrender.com/api/service-requests";


// ================= CHECK LOGIN =================

if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
}


// ================= LOAD ENTREPRENEURS =================

async function loadEntrepreneurs() {
    try {
        const response = await fetch(
            "https://hunarhub-backend-i8s7.onrender.com/api/entrepreneurs"
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to load entrepreneurs");
        }

        const select = document.getElementById("entrepreneurId");
        const entrepreneurs = Array.isArray(data)
            ? data
            : data.entrepreneurs || [];

        select.innerHTML = `
            <option value="">Select Entrepreneur</option>
        `;

        entrepreneurs.forEach((entrepreneur) => {
            const option = document.createElement("option");

            option.value = entrepreneur._id;
            option.textContent =
                `${entrepreneur.name} - ${entrepreneur.category || "Entrepreneur"}`;

            select.appendChild(option);
        });

    } catch (error) {
        console.error("Error loading entrepreneurs:", error);
    }
}


// ================= DISPLAY CUSTOMER REQUESTS =================

async function loadMyRequests() {
    const container = document.getElementById("myRequests");

    if (!container) return;

    container.innerHTML = "<p>Loading your requests...</p>";

    try {
        const response = await fetch(`${API_URL}/customer`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Unable to load your requests"
            );
        }

        const requests = data.requests || [];

        if (requests.length === 0) {
    container.innerHTML = `
        <div class="empty-state">
            You haven't submitted any service requests yet.
            Explore entrepreneurs and submit your first request!
        </div>
    `;
    return;
}

        container.innerHTML = "";

        requests.forEach((request) => {
            const card = document.createElement("div");
            card.className = "form-card request-card";

            const entrepreneur = request.entrepreneur;
            const entrepreneurName =
                entrepreneur?.name || "Entrepreneur";
            const category = entrepreneur?.category || "Not specified";
            const location = entrepreneur?.location || "Not specified";

            const status = String(request.status || "Pending");
            const normalizedStatus = status.toLowerCase();

            let statusClass = "status-pending";

            if (normalizedStatus === "accepted") {
                statusClass = "status-accepted";
            } else if (normalizedStatus === "rejected") {
                statusClass = "status-rejected";
            }

            const heading = document.createElement("h3");
            heading.textContent = request.service || "Service request";

            const description = document.createElement("p");
            description.textContent =
                "Description: " + (request.description || "Not provided");

            const entrepreneurInfo = document.createElement("p");
            entrepreneurInfo.textContent =
                `Entrepreneur: ${entrepreneurName}`;

            const categoryInfo = document.createElement("p");
            categoryInfo.textContent = `Category: ${category}`;

            const locationInfo = document.createElement("p");
            locationInfo.textContent = `Location: ${location}`;

            const dateInfo = document.createElement("p");
            dateInfo.textContent =
                "Preferred date: " +
                (request.date
                    ? new Date(request.date).toLocaleDateString()
                    : "Not specified");

            const statusInfo = document.createElement("p");
            statusInfo.className = "request-status";

            const statusLabel = document.createElement("strong");
            statusLabel.textContent = "Status: ";

            const statusValue = document.createElement("span");
            statusValue.className = statusClass;
            statusValue.textContent = status;

            statusInfo.append(statusLabel, statusValue);

            card.append(
                heading,
                description,
                entrepreneurInfo,
                categoryInfo,
                locationInfo,
                dateInfo,
                statusInfo
            );

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading customer requests:", error);

        container.innerHTML = `
    <div class="error-message">
        Unable to load your requests. Please refresh the page and try again.
    </div>
`;
    }
}


// ================= CREATE SERVICE REQUEST =================

const form = document.getElementById("serviceRequestForm");

if (form) {
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const entrepreneurId =
            document.getElementById("entrepreneurId").value;

        const service =
            document.getElementById("service").value.trim();

        const description =
            document.getElementById("description").value.trim();

        const date =
            document.getElementById("date").value;

        if (!entrepreneurId || !service || !description || !date) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify({
                    entrepreneurId,
                    service,
                    description,
                    date
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(
                    data.message ||
                    "Unable to create service request."
                );
                return;
            }

            alert("Service request created successfully!");

            form.reset();

            await loadMyRequests();

        } catch (error) {
            console.error("Service request error:", error);
            alert("Unable to connect to server.");
        }
    });
}


// ================= INITIALIZE PAGE =================

if (token) {
    loadEntrepreneurs();
    loadMyRequests();
}

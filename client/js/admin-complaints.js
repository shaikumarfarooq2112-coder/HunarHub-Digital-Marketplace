// =====================================================
// CHECK ADMIN LOGIN
// =====================================================

const token =
    localStorage.getItem("token");


if (!token) {

    alert("Please login first");

    window.location.href =
        "login.html";

}


// =====================================================
// CHECK ADMIN ROLE
// =====================================================

try {

    const user =
        JSON.parse(
            atob(
                token.split(".")[1]
            )
        );


    if (user.role !== "admin") {

        alert(
            "Access denied. Admin only."
        );

        window.location.href =
            "dashboard.html";

    }

}
catch (error) {

    console.log(error);

    localStorage.removeItem("token");

    window.location.href =
        "login.html";

}


// =====================================================
// LOGOUT
// =====================================================

function logout() {

    localStorage.removeItem("token");

    alert("Logout successful");

    window.location.href =
        "login.html";

}


// =====================================================
// LOAD ALL COMPLAINTS
// =====================================================

async function loadComplaints() {

    const complaintList =
        document.getElementById(
            "complaintList"
        );


    try {

        const response =
            await fetch(
                "http://https://hunarhub-backend-2788.onrender.com/api/complaints",
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
            "Admin complaints:",
            data
        );


        if (!response.ok) {

            complaintList.innerHTML = `
                <p>
                    ${data.message ||
                    "Unable to load complaints"}
                </p>
            `;

            return;

        }


        complaintList.innerHTML = "";


        if (
            !data.complaints ||
            data.complaints.length === 0
        ) {

            complaintList.innerHTML = `
                <p>
                    No complaints found.
                </p>
            `;

            return;

        }


        data.complaints.forEach(
            complaint => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "product-card";


                card.innerHTML = `

                    <h2>
                        ${complaint.subject}
                    </h2>


                    <p>
                        <strong>
                            Customer:
                        </strong>

                        ${
                            complaint.customer
                                ? complaint.customer.name
                                : "Unknown"
                        }

                    </p>


                    <p>
                        <strong>
                            Email:
                        </strong>

                        ${
                            complaint.customer
                                ? complaint.customer.email
                                : "N/A"
                        }

                    </p>


                    <p>
                        <strong>
                            Description:
                        </strong>

                        ${complaint.description}

                    </p>


                    <p>
                        <strong>
                            Status:
                        </strong>

                        ${complaint.status}

                    </p>


                    <p>
                        <strong>
                            Admin Response:
                        </strong>

                        ${
                            complaint.adminResponse ||
                            "No response yet"
                        }

                    </p>


                    <label>
                        Update Status
                    </label>


                    <select
                        id="status-${complaint._id}"
                    >

                        <option value="Pending"
                            ${
                                complaint.status ===
                                "Pending"
                                ? "selected"
                                : ""
                            }>
                            Pending
                        </option>

                        <option value="Under Review"
                            ${
                                complaint.status ===
                                "Under Review"
                                ? "selected"
                                : ""
                            }>
                            Under Review
                        </option>

                        <option value="Resolved"
                            ${
                                complaint.status ===
                                "Resolved"
                                ? "selected"
                                : ""
                            }>
                            Resolved
                        </option>

                        <option value="Rejected"
                            ${
                                complaint.status ===
                                "Rejected"
                                ? "selected"
                                : ""
                            }>
                            Rejected
                        </option>

                    </select>


                    <br><br>


                    <label>
                        Admin Response
                    </label>


                    <textarea
                        id="response-${complaint._id}"
                        rows="4"
                        placeholder="Enter response to customer..."
                    >${
                        complaint.adminResponse || ""
                    }</textarea>


                    <br>


                    <button
                        onclick="updateComplaint(
                            '${complaint._id}'
                        )"
                    >
                        Update Complaint
                    </button>

                `;


                complaintList.appendChild(
                    card
                );

            }
        );

    }
    catch (error) {

        console.log(error);

        complaintList.innerHTML = `
            <p>
                Error loading complaints.
            </p>
        `;

    }

}


// =====================================================
// UPDATE COMPLAINT
// =====================================================

async function updateComplaint(id) {

    const status =
        document.getElementById(
            "status-" + id
        ).value;


    const adminResponse =
        document.getElementById(
            "response-" + id
        ).value;


    try {

        const response =
            await fetch(
                `http://https://hunarhub-backend-2788.onrender.com/api/complaints/update/${id}`,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            "Bearer " + token

                    },

                    body:
                        JSON.stringify({

                            status,

                            adminResponse

                        })

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Failed to update complaint"
            );

            return;

        }


        alert(
            "Complaint updated successfully"
        );


        loadComplaints();

    }
    catch (error) {

        console.log(error);

        alert(
            "Unable to update complaint"
        );

    }

}


// =====================================================
// LOAD COMPLAINTS
// =====================================================

loadComplaints();
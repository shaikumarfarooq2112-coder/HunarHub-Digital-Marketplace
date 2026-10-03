// =====================================================
// CHECK LOGIN
// =====================================================

const token = localStorage.getItem("token");

if (!token) {

    alert("Please login first");

    window.location.href = "login.html";

}


// =====================================================
// GET COMPLAINT FORM
// =====================================================

const complaintForm =
    document.getElementById("complaintForm");


// Make sure the form exists

if (complaintForm) {

    complaintForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // Get subject

            const subject =
                document
                    .getElementById("subject")
                    .value
                    .trim();


            // Get description

            const description =
                document
                    .getElementById("description")
                    .value
                    .trim();


            // Check fields

            if (!subject || !description) {

                alert(
                    "Please enter subject and description"
                );

                return;

            }


            try {

                const response =
                    await fetch(
                        "https://hunarhub-backend-i8s7.onrender.com/api/complaints/create",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                "Authorization":
                                    "Bearer " + token

                            },

                            body: JSON.stringify({

                                subject:
                                    subject,

                                description:
                                    description

                            })

                        }
                    );


                const data =
                    await response.json();


                console.log(
                    "Complaint response:",
                    data
                );


                if (!response.ok) {

                    alert(
                        data.message ||
                        "Failed to submit complaint"
                    );

                    return;

                }


                alert(
                    "Complaint submitted successfully"
                );


                // Clear form

                complaintForm.reset();


                // Reload complaints

                loadComplaints();

            }
            catch (error) {

                console.log(
                    "Complaint submit error:",
                    error
                );

                alert(
                    "Unable to submit complaint"
                );

            }

        }
    );

}


// =====================================================
// LOAD CUSTOMER COMPLAINTS
// =====================================================

async function loadComplaints() {

    const complaintList =
        document.getElementById(
            "complaintList"
        );


    if (!complaintList) {

        return;

    }


    try {

        const response =
            await fetch(
                "https://hunarhub-backend-i8s7.onrender.com/api/complaints/customer",
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
            "Complaints:",
            data
        );


        complaintList.innerHTML = "";


        if (
            !data.complaints ||
            data.complaints.length === 0
        ) {

            complaintList.innerHTML = `
                <div class="empty-message">
                    No complaints submitted yet.
                </div>
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

                    <h3>
                        ${complaint.subject}
                    </h3>

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

                        <span>
                            ${complaint.status}
                        </span>

                    </p>

                    <p>
                        <strong>
                            Admin Response:
                        </strong>

                        ${
                            complaint.adminResponse
                            || "Waiting for admin response"
                        }

                    </p>

                    <p>
                        <strong>
                            Submitted:
                        </strong>

                        ${
                            new Date(
                                complaint.createdAt
                            ).toLocaleDateString()
                        }

                    </p>

                `;


                complaintList.appendChild(
                    card
                );

            }
        );

    }
    catch (error) {

        console.log(
            "Complaint loading error:",
            error
        );

    }

}


// =====================================================
// LOAD COMPLAINTS WHEN PAGE OPENS
// =====================================================

loadComplaints();
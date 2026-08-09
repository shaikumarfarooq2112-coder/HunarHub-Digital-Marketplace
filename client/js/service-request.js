// ================= CHECK LOGIN =================

const token = localStorage.getItem("token");

if (!token) {

    alert("Please login first.");

    window.location.href = "login.html";

}


// ================= LOAD ENTREPRENEURS =================

async function loadEntrepreneurs() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/entrepreneurs"
        );

        const data = await response.json();

        console.log("Entrepreneurs:", data);


        const select =
            document.getElementById("entrepreneurId");


        // Clear existing options

        select.innerHTML = `
            <option value="">
                Select Entrepreneur
            </option>
        `;


        // Check response

        const entrepreneurs =
            data.entrepreneurs || data;


        entrepreneurs.forEach(entrepreneur => {

            const option =
                document.createElement("option");


            option.value =
                entrepreneur._id;


            option.textContent =
                `${entrepreneur.name} - ${entrepreneur.category || "Entrepreneur"}`;


            select.appendChild(option);

        });


    }
    catch (error) {

        console.error(
            "Error loading entrepreneurs:",
            error
        );

    }

}


// ================= CREATE SERVICE REQUEST =================

const form =
    document.getElementById(
        "serviceRequestForm"
    );


form.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const entrepreneurId =
            document.getElementById(
                "entrepreneurId"
            ).value;


        const service =
            document.getElementById(
                "service"
            ).value.trim();


        const description =
            document.getElementById(
                "description"
            ).value.trim();


        const date =
            document.getElementById(
                "date"
            ).value;


        if (
            !entrepreneurId ||
            !service ||
            !description ||
            !date
        ) {

            alert(
                "Please fill in all fields."
            );

            return;

        }


        try {

            const response =
                await fetch(
                    "http://localhost:5000/api/service-requests/create",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                "Bearer " + token

                        },

                        body: JSON.stringify({

                            entrepreneurId:
                                entrepreneurId,

                            service:
                                service,

                            description:
                                description,

                            date:
                                date

                        })

                    }
                );


            const data =
                await response.json();


            console.log(
                "Service request response:",
                data
            );


            if (!response.ok) {

                alert(
                    data.message ||
                    "Unable to create service request."
                );

                return;

            }


            alert(
                "Service request created successfully!"
            );


            form.reset();


            window.location.href =
                "service-requests.html";


        }
        catch (error) {

            console.error(
                "Service request error:",
                error
            );


            alert(
                "Unable to connect to server."
            );

        }

    }
);


// Load entrepreneurs when page opens

loadEntrepreneurs();
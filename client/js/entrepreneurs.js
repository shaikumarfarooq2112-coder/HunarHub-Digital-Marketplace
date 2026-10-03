// ================= GET ENTREPRENEURS =================


async function getEntrepreneurs() {


    try {


        const response = await fetch(
            "https://hunarhub-backend-2788.onrender.com/api/entrepreneurs"
        );


        const data = await response.json();


        const entrepreneurList = document.getElementById(
            "entrepreneurList"
        );


        entrepreneurList.innerHTML = "";



        data.entrepreneurs.forEach(entrepreneur => {



            const card = document.createElement(
                "div"
            );


            card.className = "product-card";



            card.innerHTML = `

                <h3>
                    ${entrepreneur.name}
                </h3>


                <p>
                    Category:
                    ${entrepreneur.category}
                </p>


                <p>
                    Location:
                    ${entrepreneur.location}
                </p>


                <p>
                    Experience:
                    ${entrepreneur.experience || "Not mentioned"}
                </p>


                <button onclick="viewEntrepreneur('${entrepreneur._id}')">
                    View Profile
                </button>


            `;



            entrepreneurList.appendChild(card);


        });



    }
    catch(error){


        console.log(error);


        document.getElementById(
            "entrepreneurList"
        ).innerHTML =
        "Unable to load entrepreneurs";


    }


}



// ================= VIEW PROFILE =================


function viewEntrepreneur(id){


    window.location.href =
    "entrepreneur-profile.html?id=" + id;


}



// ================= DASHBOARD =================


function goDashboard(){


    window.location.href =
    "dashboard.html";


}



// Run when page opens

getEntrepreneurs();
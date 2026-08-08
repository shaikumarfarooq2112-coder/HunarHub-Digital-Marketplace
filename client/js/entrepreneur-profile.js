// ================= GET ENTREPRENEUR ID FROM URL =================

const urlParams = new URLSearchParams(
    window.location.search
);


const entrepreneurId = urlParams.get("id");



// ================= GET ENTREPRENEUR PROFILE =================

async function getEntrepreneurProfile(){


    try {


        const response = await fetch(

            `http://localhost:5000/api/entrepreneurs/${entrepreneurId}`

        );


        const data = await response.json();


        const entrepreneur = data.entrepreneur;



        document.getElementById(
            "entrepreneurProfile"
        ).innerHTML = `


            <h2>
                ${entrepreneur.name}
            </h2>


            <p>
                Category:
                ${entrepreneur.category}
            </p>


            <p>
                Experience:
                ${entrepreneur.experience || "Not mentioned"}
            </p>


            <p>
                Location:
                ${entrepreneur.location}
            </p>


            <p>
                Skills:
                ${entrepreneur.skills.join(", ")}
            </p>


            <p>
                Description:
                ${entrepreneur.description}
            </p>


        `;


    }
    catch(error){


        console.log(error);


        document.getElementById(
            "entrepreneurProfile"
        ).innerHTML =
        "Unable to load profile";


    }


}



// ================= BACK BUTTON =================

function goEntrepreneurs(){


    window.location.href =
    "entrepreneurs.html";


}
// ================= SEND SERVICE REQUEST =================

function sendRequest(){

    window.location.href =
    "service-request.html?id=" + entrepreneurId;

}


// Run when page opens

getEntrepreneurProfile();
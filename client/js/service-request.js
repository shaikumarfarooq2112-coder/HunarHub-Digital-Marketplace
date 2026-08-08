// ================= GET ENTREPRENEUR ID =================

const urlParams = new URLSearchParams(
    window.location.search
);


const entrepreneurId = urlParams.get("id");



// ================= CREATE SERVICE REQUEST =================

async function createRequest(){


    const service =
    document.getElementById("service").value;


    const description =
    document.getElementById("description").value;


    const date =
    document.getElementById("date").value;



    const token =
    localStorage.getItem("token");



    if(!token){

        alert("Please login first");

        window.location.href="login.html";

        return;

    }



    try{


        const response = await fetch(

            "http://localhost:5000/api/service-requests/create",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json",

                    "Authorization":
                    "Bearer " + token

                },


                body:JSON.stringify({

                    entrepreneurId,

                    service,

                    description,

                    date

                })

            }

        );



        const data = await response.json();



        if(response.ok){


            alert(
                "Service request sent successfully"
            );


            window.location.href =
            "entrepreneurs.html";


        }
        else{


            alert(data.message);


        }


    }
    catch(error){


        console.log(error);

        alert("Server Error");


    }


}
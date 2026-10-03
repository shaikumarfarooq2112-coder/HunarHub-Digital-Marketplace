async function registerUser() {


    const name = document.getElementById("name").value;

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    const phone = document.getElementById("phone").value;

    const location = document.getElementById("location").value;



    try {


        const response = await fetch(
            "https://hunarhub-backend-i8s7.onrender.com/api/users/register",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },


                body: JSON.stringify({

                    name,

                    email,

                    password,

                    phone,

                    location

                })

            }
        );



        const data = await response.json();



        if(response.ok){


            alert("Registration Successful");


            window.location.href = "login.html";


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
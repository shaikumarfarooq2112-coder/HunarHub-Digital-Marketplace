console.log("add-product.js loaded");
// ================= ADD PRODUCT =================


async function addProduct() {

    console.log("Add Product function started");

    alert("Add Product button clicked");


    const name = document.getElementById("name").value;

    const category = document.getElementById("category").value;

    const description = document.getElementById("description").value;

    const price = document.getElementById("price").value;

    const image = document.getElementById("image").value;



    // Get entrepreneur token

    const token = localStorage.getItem("token");
    console.log("Token:", token);



    if (!token) {

        alert("Please login first");

        window.location.href = "login.html";

        return;

    }



    try {

        console.log("Sending product data...");
        console.log("Sending request to backend...");
        const response = await fetch(

            "https://hunarhub-backend-i8s7.onrender.com/api/products/create",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": "Bearer " + token

                },


                body: JSON.stringify({

                    name,

                    category,

                    description,

                    price,

                    image

                })

            }

        );



        const data = await response.json();
        console.log("Status:", response.status);
console.log("Response:", data);


        if(response.ok){


            alert("Product added successfully");


            window.location.href = "products.html";


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
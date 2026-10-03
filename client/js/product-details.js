// ================= GET PRODUCT ID FROM URL =================

const urlParams = new URLSearchParams(
    window.location.search
);


const productId = urlParams.get("id");


// Store product ID for order creation

let selectedProductId = productId;



// ================= GET PRODUCT DETAILS =================

async function getProductDetails(){


    try {
        const response = await fetch(

            `https://hunarhub-backend-i8s7.onrender.com/api/products/${productId}`

        );


        const data = await response.json();



        const product = data.product;



        document.getElementById("productDetails").innerHTML = `

    <img
        src="images/${product.image}"
        alt="${product.name}"
        class="product-image">

    <h2>${product.name}</h2>

    <p><strong>Category:</strong> ${product.category}</p>

    <p><strong>Price:</strong> ₹${product.price}</p>

    <p><strong>Description:</strong> ${product.description}</p>

    <p><strong>Available:</strong> ${product.available ? "Yes" : "No"}</p>

    <br>

    <button onclick="buyProduct()">
        Buy Now
    </button>

`;


    }
    catch(error){


        console.log(error);


        document.getElementById(
            "productDetails"
        ).innerHTML =
        "Unable to load product";


    }


}



// ================= CREATE ORDER =================

async function buyProduct(){

    console.log("Buying Product ID:", selectedProductId);

    const token =
    localStorage.getItem("token");


    if(!token){


        alert("Please login first");

        window.location.href =
        "login.html";

        return;

    }



    try{


        const response = await fetch(

            "https://hunarhub-backend-i8s7.onrender.com/api/orders/create",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json",

                    "Authorization":
                    "Bearer " + token

                },


                body:JSON.stringify({

                    productId:selectedProductId,

                    quantity:1

                })

            }

        );



        const data = await response.json();



        if(response.ok){


            alert(
                "Order created successfully"
            );


        }
        else{


            alert(data.message);


        }


    }
    catch(error){


        console.log(error);

        alert("Server error");


    }


}



// ================= BACK BUTTON =================

function goProducts(){

    window.location.href =
    "products.html";

}

// ================= GET PRODUCT REVIEWS =================

async function getReviews(){


    try{


        const response = await fetch(

            `https://hunarhub-backend-i8s7.onrender.com/api/reviews/product/${productId}`

        );


        const data = await response.json();


        const reviewList =
        document.getElementById("reviewList");



        if(!reviewList){

            return;

        }



        reviewList.innerHTML = "";



        if(data.reviews.length === 0){


            reviewList.innerHTML =
            "<p>No reviews yet</p>";


            return;

        }




        data.reviews.forEach(review => {


            const div =
            document.createElement("div");


            div.className =
            "product-card";



            div.innerHTML = `


                <h3>
                    ${review.customer.name}
                </h3>


                <p>
                    Rating:
                    ⭐ ${review.rating}/5
                </p>


                <p>
                    ${review.comment}
                </p>


            `;



            reviewList.appendChild(div);



        });



    }
    catch(error){


        console.log(error);


        document.getElementById(
            "reviewList"
        ).innerHTML =
        "Unable to load reviews";


    }


}

getProductDetails();

getReviews();

// ================= CREATE REVIEW =================

async function addReview(){


    const token = localStorage.getItem("token");


    if(!token){

        alert("Please login first");

        return;

    }


    const rating =
    document.getElementById("rating").value;


    const comment =
    document.getElementById("comment").value;
    getReviews();

    try{


        const response = await fetch(

            "https://hunarhub-backend-i8s7.onrender.com/api/reviews/create",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json",

                    "Authorization":
                    "Bearer " + token

                },


                body:JSON.stringify({

                    productId:selectedProductId,

                    rating:rating,

                    comment:comment

                })

            }

        );



        const data = await response.json();



        if(response.ok){


            alert(
                "Review added successfully"
            );


            document.getElementById(
                "rating"
            ).value="";


            document.getElementById(
                "comment"
            ).value="";


        }
        else{


            alert(data.message);


        }



    }
    catch(error){


        console.log(error);


        alert("Server error");


    }


}
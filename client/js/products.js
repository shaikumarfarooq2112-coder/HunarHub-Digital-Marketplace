// ================= STORE PRODUCTS =================

let allProducts = [];


// ================= GET PRODUCTS =================

async function getProducts() {

    try {

        const response = await fetch(
            "https://https://hunarhub-backend-i8s7.onrender.com/api/products"
        );


        const data = await response.json();


        allProducts = data.products;


        displayProducts(allProducts);


    }
    catch(error){

        console.log(error);


        document.getElementById("productList").innerHTML =
        "Unable to load products";

    }

}



// ================= DISPLAY PRODUCTS =================

function displayProducts(products){


    const productList =
    document.getElementById("productList");


    productList.innerHTML = "";


    if(products.length === 0){


        productList.innerHTML = `

        <div class="empty-message">

            📦 No products found

        </div>

        `;


        return;

    }



    products.forEach(product => {


        const productCard =
        document.createElement("div");


        productCard.className =
        "product-card";



        productCard.innerHTML = `


        <img 
        src="images/${product.image}"
        class="product-image"
        alt="${product.name}">


        <h3>
        ${product.name}
        </h3>


        <p>
        <strong>Category:</strong>
        ${product.category}
        </p>


        <p>
        <strong>Price:</strong>
        ₹${product.price}
        </p>


        <p>
        ${product.description}
        </p>



        <button onclick="viewProduct('${product._id}')">

            View Details

        </button>


        `;



        productList.appendChild(productCard);


    });


}



// ================= SEARCH PRODUCTS =================


function searchProducts(){


    const searchValue =
    document.getElementById("searchInput")
    .value
    .toLowerCase();



    const filteredProducts =
    allProducts.filter(product => {


        return (

            product.name
            .toLowerCase()
            .includes(searchValue)

            ||

            product.category
            .toLowerCase()
            .includes(searchValue)

        );


    });



    displayProducts(filteredProducts);


}



// ================= FILTER PRODUCTS =================


function filterProducts(category){



    if(category === "All"){


        displayProducts(allProducts);

        return;

    }



    const filteredProducts =
    allProducts.filter(product =>

        product.category === category

    );



    displayProducts(filteredProducts);


}



// ================= VIEW PRODUCT =================


function viewProduct(id){


    window.location.href =
    "product-details.html?id=" + id;


}



// ================= LOGOUT =================


function logout(){


    localStorage.removeItem("token");


    alert("Logout successful");


    window.location.href =
    "login.html";


}



// ================= LOAD =================


getProducts();
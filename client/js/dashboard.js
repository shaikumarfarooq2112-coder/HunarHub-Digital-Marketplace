// ================= CHECK LOGIN TOKEN =================

const token = localStorage.getItem("token");


// If token does not exist, send user to login page

if (!token) {

    alert("Please login first");

    window.location.href = "login.html";

}


// ================= LOGOUT FUNCTION =================

function logout() {


    localStorage.removeItem("token");


    alert("Logout successful");


    window.location.href = "login.html";


}



// ================= GET ENTREPRENEUR REQUESTS =================


async function getServiceRequests(){


    try{


        const response = await fetch(

            "http://localhost:5000/api/service-requests/entrepreneur",

            {

                method:"GET",

                headers:{

                    "Authorization":
                    "Bearer " + token

                }

            }

        );



        const data = await response.json();



        const requestList =
        document.getElementById("requestList");



        if(!requestList){

            return;

        }



        requestList.innerHTML = "";



        if(data.requests.length === 0){


            requestList.innerHTML =
            "<p>No service requests found</p>";


            return;

        }



        data.requests.forEach(request => {



            const card =
            document.createElement("div");



            card.className =
            "product-card";



            card.innerHTML = `


                <h3>
                    ${request.service}
                </h3>


                <p>
                    Customer:
                    ${request.customer.name}
                </p>


                <p>
                    Description:
                    ${request.description}
                </p>


                <p>
                    Date:
                    ${request.date}
                </p>


                <p>
                    Status:
                    ${request.status}
                </p>



                <button onclick="updateStatus('${request._id}','Accepted')">

                    Accept

                </button>



                <button onclick="updateStatus('${request._id}','Rejected')">

                    Reject

                </button>


            `;



            requestList.appendChild(card);


        });



    }
    catch(error){


        console.log(error);


    }


}




// ================= UPDATE REQUEST STATUS =================


async function updateStatus(id,status){


    try{


        const response = await fetch(

            `http://localhost:5000/api/service-requests/update/${id}`,

            {

                method:"PUT",

                headers:{

                    "Content-Type":"application/json",

                    "Authorization":
                    "Bearer " + token

                },


                body:JSON.stringify({

                    status

                })

            }

        );



        const data = await response.json();



        alert(data.message);



        getServiceRequests();



    }
    catch(error){


        console.log(error);


    }


}



// Load requests when dashboard opens

const user = JSON.parse(
    atob(token.split(".")[1])
);

if(user.role === "entrepreneur"){

    getServiceRequests();

    getEntrepreneurOrders();

}
else{

    const serviceSection =
    document.getElementById("serviceRequestsSection");

    if(serviceSection){

        serviceSection.style.display = "none";

    }

    const ordersSection =
    document.getElementById("ordersSection");

    if(ordersSection){

        ordersSection.style.display = "none";

    }

}
function goOrders(){

    window.location.href = "orders.html";

}
// ================= GET ENTREPRENEUR ORDERS =================

async function getEntrepreneurOrders() {

    try {

        const response = await fetch(

            "http://localhost:5000/api/orders/entrepreneur",

            {

                method: "GET",

                headers: {

                    "Authorization": "Bearer " + token

                }

            }

        );

        const data = await response.json();

        const ordersList = document.getElementById("ordersList");

        if (!ordersList) return;

        ordersList.innerHTML = "";

        if (!data.orders || data.orders.length === 0) {

            ordersList.innerHTML = "<p>No orders found</p>";

            return;

        }

        data.orders.forEach(order => {

            const card = document.createElement("div");

            card.className = "product-card";

            card.innerHTML = `

                <h3>${order.product.name}</h3>

                <p>
                    Customer:
                    ${order.customer.name}
                </p>

                <p>
                    Quantity:
                    ${order.quantity}
                </p>

                <p>
                    Total Price:
                    ₹${order.totalPrice}
                </p>

                <p>
                    Status:
                    ${order.status}
                </p>

                <button onclick="updateOrderStatus('${order._id}','Confirmed')">
                    Confirm
                </button>

                <button onclick="updateOrderStatus('${order._id}','Completed')">
                    Complete
                </button>

                <button onclick="updateOrderStatus('${order._id}','Cancelled')">
                    Cancel
                </button>

            `;

            ordersList.appendChild(card);

        });

    } catch (error) {

        console.log(error);

    }

}



// ================= UPDATE ORDER STATUS =================

async function updateOrderStatus(id, status) {

    try {

        const response = await fetch(

            `http://localhost:5000/api/orders/update/${id}`,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": "Bearer " + token

                },

                body: JSON.stringify({

                    status

                })

            }

        );

        const data = await response.json();

        alert(data.message);

        getEntrepreneurOrders();

    } catch (error) {

        console.log(error);

    }

}
// ================= DASHBOARD STATISTICS =================


async function loadDashboardStats(){


    const token = localStorage.getItem("token");


    try{


        // PRODUCTS COUNT

        const productResponse = await fetch(
            "http://localhost:5000/api/products"
        );


        const productData =
        await productResponse.json();


        document.getElementById(
            "productCount"
        ).innerHTML =
        productData.products.length;



        // ORDERS COUNT

        const orderResponse = await fetch(

            "http://localhost:5000/api/orders/my-orders",

            {

                headers:{

                    "Authorization":
                    "Bearer " + token

                }

            }

        );


        const orderData =
        await orderResponse.json();



        document.getElementById(
            "orderCount"
        ).innerHTML =
        orderData.orders.length;



        // REVIEWS COUNT

        document.getElementById(
            "reviewCount"
        ).innerHTML =
        "0";



    }

    catch(error){

        console.log(error);

    }


}



loadDashboardStats();
// ================= RECENT ORDERS =================

async function loadRecentOrders(){


    const token = localStorage.getItem("token");


    try{


        const response = await fetch(

            "http://localhost:5000/api/orders/my-orders",

            {

                headers:{

                    "Authorization":
                    "Bearer " + token

                }

            }

        );


        const data =
        await response.json();



        const orderDiv =
        document.getElementById("recentOrders");



        orderDiv.innerHTML="";



        if(data.orders.length === 0){


            orderDiv.innerHTML =
            `
            <div class="empty-message">
            No orders available
            </div>
            `;


            return;

        }



        data.orders.slice(0,3).forEach(order=>{


            orderDiv.innerHTML += `

            <div class="product-card">


            <h3>
            ${order.product.name}
            </h3>


            <p>
            Price: ₹${order.totalPrice}
            </p>


            <p>
            Status:

            <span class="status ${order.status.toLowerCase()}">

            ${order.status}

            </span>

            </p>


            </div>

            `;


        });



    }
    catch(error){

        console.log(error);

    }

}


loadRecentOrders();
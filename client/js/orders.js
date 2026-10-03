// ================= CHECK LOGIN TOKEN =================

const token = localStorage.getItem("token");


if(!token){

    alert("Please login first");

    window.location.href = "login.html";

}



// ================= GET MY ORDERS =================


async function getMyOrders(){


    try{


        const response = await fetch(

            "https://hunarhub-backend-2788.onrender.com/api/orders/my-orders",

            {

                method:"GET",

                headers:{

                    "Authorization":
                    "Bearer " + token

                }

            }

        );



        const data = await response.json();



        const orderList =
        document.getElementById("orderList");



        orderList.innerHTML = "";

if (data.orders.length === 0) {

    orderList.innerHTML = `
        <div class="empty-message">
            📦 No orders found yet.
        </div>
    `;

    return;

}




        data.orders.forEach(order => {



            const card =
            document.createElement("div");



            card.className =
            "product-card";



           card.innerHTML = `

<img
    src="images/${order.product.image}"
    class="product-image"
>

<h3>${order.product.name}</h3>

<p>
<strong>Quantity:</strong>
${order.quantity}
</p>

<p>
<strong>Total Price:</strong>
₹${order.totalPrice}
</p>

<p>
<strong>Status:</strong>

<span class="status ${order.status.toLowerCase()}">

${order.status}

</span>

</p>

`;


            orderList.appendChild(card);



        });



    }
    catch(error){


        console.log(error);

document.getElementById("orderList").innerHTML = `
    <div class="error-message">
        Unable to load orders.
    </div>
`;


    }


}



// ================= DASHBOARD BUTTON =================

function goDashboard(){

    window.location.href =
    "dashboard.html";

}



// Load orders

getMyOrders();
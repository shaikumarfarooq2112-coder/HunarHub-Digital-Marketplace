// ================= CHECK LOGIN =================

const token = localStorage.getItem("token");

if(!token){

    alert("Please login first");

    window.location.href="login.html";

}

// ================= GET PROFILE =================

async function getProfile(){

try{

const response=await fetch(

"http://localhost:5000/api/users/profile",

{

method:"GET",

headers:{

Authorization:"Bearer "+token

}

}

);

const data=await response.json();

document.getElementById("profileDetails").innerHTML=`

<div class="profile-card">

<img src="images/profile.png" class="profile-image">

<h2>${data.user.name}</h2>

<p><strong>Email:</strong> ${data.user.email}</p>

<p><strong>Role:</strong> ${data.user.role}</p>

<p><strong>Location:</strong> Sullurpeta</p>

<p class="verified">⭐ Verified Entrepreneur</p>

<hr>

<div class="profile-stats">

<div class="stat-box">

<h3>12</h3>

<p>Orders</p>

</div>

<div class="stat-box">

<h3>6</h3>

<p>Products</p>

</div>

<div class="stat-box">

<h3>4.8⭐</h3>

<p>Rating</p>

</div>

<div class="stat-box">

<h3>2026</h3>

<p>Member Since</p>

</div>

</div>

<div class="profile-buttons">

<button onclick="goDashboard()">

Dashboard

</button>

<button onclick="goOrders()">

My Orders

</button>

<button onclick="goProducts()">

My Products

</button>

</div>

</div>

`;

}

catch(error){

console.log(error);

document.getElementById("profileDetails").innerHTML="Unable to load profile";

}

}

// ================= BUTTONS =================

function goDashboard(){

window.location.href="dashboard.html";

}

function goOrders(){

window.location.href="orders.html";

}

function goProducts(){

window.location.href="products.html";

}

// ================= LOAD PROFILE =================

getProfile();
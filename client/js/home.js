async function loadHomeProducts(){

try{


const response = await fetch(
   "https://hunarhub-backend-p67s.onrender.com"
);


const data = await response.json();


const products=data.products;


const container=
document.getElementById("featuredProducts");


container.innerHTML="";


products.forEach(product=>{


container.innerHTML += `

<div class="product-card">


<img src="images/${product.image}">


<h3>
${product.name}
</h3>


<p>
${product.description}
</p>

<p>
<strong>
₹${product.price}
</strong>
</p>


<p>
₹${product.price}
</p>


<button onclick="viewProduct('${product._id}')">

View Product

</button>


</div>

`;

});


}

catch(error){

console.log(error);

}


}



function viewProduct(id){

window.location.href=
"product-details.html?id="+id;

}



loadHomeProducts();
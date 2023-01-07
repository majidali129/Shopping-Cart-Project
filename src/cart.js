let basket = JSON.parse(localStorage.getItem("data")) || []
let sumValues = ()=>{
    let totalItems = document.getElementById('cart-status');
    totalItems.innerHTML =  basket.map((element)=>element.item).reduce((x , y)=> x + y,0)
    // console.log(totalItems)
}
sumValues()  // to keep values updated after reload
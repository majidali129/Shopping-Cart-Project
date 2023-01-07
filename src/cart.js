let basket = JSON.parse(localStorage.getItem("data")) || []
let sumValues = ()=>{
    let totalItems = document.getElementById('cart-status');
    totalItems.innerHTML =  basket.map((element)=>element.item).reduce((x , y)=> x + y,0)
    // console.log(totalItems)
}
sumValues()  // to keep values updated after reload

let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');


let generateCartItem = ()=>{
    if(basket.length !==0 ){
        return(
            shoppingCart.innerHTML = basket.map((element)=>{
                let {id , item } = element;
                console.log(element)
                let search = shop_data.find((y)=>y.id === id) || [];
                console.log(search)
                return `
                `
            })
        )
    }
}
generateCartItem()
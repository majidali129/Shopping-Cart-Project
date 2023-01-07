let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');
let basket = JSON.parse(localStorage.getItem("data")) || []
let sumValues = ()=>{
    let totalItems = document.getElementById('cart-status');
    totalItems.innerHTML =  basket.map((element)=>element.item).reduce((x , y)=> x + y,0)
    // console.log(totalItems)
}
sumValues()  // to keep values updated after reload



let generateCartItem = ()=>{
    if(basket.length !==0 ){
        return(
            shoppingCart.innerHTML = basket.map((element)=>{
                let {id , item } = element;
                // console.log(element)
                let search = shop_data.find((y)=>y.id === id) || [];
                // console.log(search)
                return `
                <div class='cart-item'>
                    <img width="120px" src=${search.image} alt="">

                <div class="detail">
                    <div class="title-price-x">
                        <h2 class = 'name-price'>
                            <p class='item-name'>${search.name}</p>
                            <p class = "item-price">$ ${search.price}</p>
                        </h2>
                        <i class="bi bi-x-lg" onClick="removeItem(${id})"></i>
                    </div>

                <div class="buttons">
                        <span ><i class="bi bi-dash " onClick="decrement(${id})"></i></span> 
                        <span id=${id} class="product-quantity">${item}</span>
                        <span ><i class="bi bi-plus " onClick="increment(${id})"></i></span>
                </div>

                <h1 class='item-total-price'>$ ${item * search.price}</h1>

                </div>

                </div>
                `
            }).join('')
        );
    }else{
        shoppingCart.innerHTML = " "
        label.innerHTML = `
        <h1 class='empty-cart'>Cart is Empty</h1><br>
       <a href='index.html'>
       <button class='homeBtn'>Back to Home</button>
       </a>
        `
    };
    sumValues()
}
generateCartItem()


let increment = (id)=>{
    let selectedItem = id;
    let search = basket.find((element)=>element.id===selectedItem.id)
    if(search === undefined){
        basket.push(
            {
                id : selectedItem.id,
                item : 1
            })
    }else{
        search.item += 1;
    }
    updateValue(selectedItem.id)
    localStorage.setItem('data',JSON.stringify(basket))
    generateCartItem()
}



let decrement = (id)=>{
    let selectedItem = id;
    let search = basket.find((element)=>element.id===selectedItem.id)
    if(search===undefined)return;
    if(search.item === 0)return;
    else{
        search.item -= 1;
    }
    updateValue(selectedItem.id)
    basket = basket.filter((element)=>element.item !==0)
    localStorage.setItem('data',JSON.stringify(basket))
    sumValues()
    generateCartItem()
}



let updateValue = (id)=>{
    let search = basket.find((element)=>element.id === id)
    // console.log(search.item)
    document.getElementById(id).innerHTML = search.item
    sumValues()
    totalBill()
}




let clearCart = ()=>{
    basket = []
    generateCartItem()
    localStorage.setItem('data',JSON.stringify(basket))
}

let removeItem = (id)=>{
    let selectedItem = id;
    // console.log(selectedItem)
    basket = basket.filter((element)=>element.id !== selectedItem.id )
    generateCartItem()
    localStorage.setItem('data',JSON.stringify(basket))
    totalBill()
    sumValues()
}



let totalBill = ()=>{
    if(basket.length !==0){
        let amount = basket.map((element)=>{
            let {id,item} = element;
            let search = shop_data.find((x)=>x.id === id) || [];
            return item * search.price;
        }).reduce((previourValue,nextValue)=>previourValue+nextValue,0);
        label.innerHTML = `
<h1 class='total-bill' id='total-bill'>Total Bill : $ ${amount}</h1>
<div class='btns'>
<button class='checkout btn' id='checkOut'>Checkout</button>
<button class='clear-cart btn' id='clearCart' onClick="clearCart()" >Clear Cart</button>
</div>
`
        // console.log(amount)
    }else return;
}
totalBill()
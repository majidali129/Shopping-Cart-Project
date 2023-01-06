let p_section = document.getElementById("product-section");


let basket = JSON.parse(localStorage.getItem("data")) || []

let buildShop = ()=>{
    return (p_section.innerHTML = shop_data.map((item)=>{
        let {image,name,description,price,id} = item;
        let search = basket.find((element)=>element.id === id)||[];
        return `
          <div id=product-id-${id} class="product-container">
        <figure class="product-img">
            <img src=${image} width="228px"  alt="">
        </figure>
        <div class="item-description">
            <div class="item-name">${name}</div>
            <div class="about-item">${description}</div>
            <div class="item-status-container">
            <div class="price">$ ${price}</div>

            <div class="count">
                <span class="less">
                    <i class="bi bi-dash" onClick="decrement(${id})"></i>
                </span> 
                <span id=${id} class="product-quantity">${search.item}</span>
                <span class="add">
                    <i class="bi bi-plus" onClick="increment(${id})"></i>
                </span>
            </div>
            </div>
        </div>
    </div>
        `
    }));
}

buildShop();


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
    sumValues()
    localStorage.setItem('data',JSON.stringify(basket))
    // console.log(basket)
}


let decrement = (id)=>{
    let selectedItem = id;
    let search = basket.find((element)=>element.id===selectedItem.id)
    if(search===undefined)return;
    if(search.item === 0)return;
    else{
        search.item -= 1;
    }
    // console.log(basket)
    updateValue(selectedItem.id)
    sumValues()
    localStorage.setItem('data',JSON.stringify(basket))

}


let updateValue = (id)=>{
    let search = basket.find((element)=>element.id === id)
    // console.log(search.item)
    document.getElementById(id).innerHTML = search.item
    // sumValues()
}

let sumValues = ()=>{
    let totalItems = document.getElementById('cart-status');
    totalItems.innerHTML =  basket.map((element)=>element.item).reduce((previous , next)=> previous + next)
    console.log(totalItems)
}
sumValues()  // to keep values updated after reload
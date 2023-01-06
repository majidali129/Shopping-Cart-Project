let p_section = document.getElementById("product-section");


let buildShop = ()=>{
    return (p_section.innerHTML = shop_data.map((item)=>{
        let {image,name,description,price,id} = item
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
                    <i class="bi bi-dash"></i>
                </span> 
                <span id=${id} class="product-quantity">3</span>
                <span class="add">
                    <i class="bi bi-plus"></i>
                </span>
            </div>
            </div>
        </div>
    </div>
        `
    }));
}

buildShop()
function getJSON(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

getJSON("./data/recommendations.json", function(json){
    var data = JSON.parse(json);
    createProductContainer(data);
});



function createProductContainer(data){
    var product = data.productData;
    for( var i = 0; i < product.length; i++) {
        const productGrid = document.getElementsByClassName("product-grid");
        const productContainer = document.createElement("div");
        productContainer.classList.add("product-container");
        const productElement = document.createElement("div");
        const priceElement = document.createElement("span");
        const titleElement = document.createElement("p");
        const imageElement = document.createElement("img");
        const brandElement = document.createElement("h3");
        productElement.classList.add("product");
        imageElement.src = product[i].imageSrc;
        imageElement.alt = product[i].productTitle;
        const brandAndTitle = product[i].productTitle.split("-");
        brandElement.innerText = brandAndTitle[0].trim();
        titleElement.innerText = brandAndTitle[1] ? brandAndTitle[1].trim() : null;
        priceElement.innerHTML = product[i].price;
        productElement.appendChild(imageElement);
        productElement.appendChild(brandElement);
        productElement.appendChild(titleElement);
        productElement.appendChild(priceElement);
        productContainer.appendChild(productElement);
        productGrid[0].appendChild(productContainer);
    }
}
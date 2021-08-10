function getJSON(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

getJSON("./data/recommendations.json", function (json) {
  var data = JSON.parse(json);
  createProductContainer(data);
});

// Detect Mobile browser
function detectMob() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}

function createProductContainer(data) {
  var product = data.productData;
  const productGrid = document.getElementsByClassName("product-grid");
  const productContainer = document.createElement("div");
  productList = [];
  count = 2;
  mobileCount = 0;

  for (var i = 0; i < product.length; i++) {
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
    productList.push(productElement);
  }
  if (detectMob()) {
    productGrid[0].appendChild(productList[0]); // display one item in mobile view
  } else {
    for (i = 0; i < 3; i++) {
      productGrid[0].appendChild(productList[i]); // display three items in desktop/tablet view
    }
  }
}

function slideImages(dir) {
  listEl = document.querySelector(".product-grid");
  btnLeftEl = document.querySelector("#left-btn");
  btnRightEl = document.querySelector("#right-btn");
  productLength = productList.length;
  detectMob() ?  slideMobile(dir) : slideDesktop(dir);
}

function slideMobile(dir) {
  btnRightEl.style.display = mobileCount < productLength - 2 ? "block" : "none";
  listEl.removeChild(productList[mobileCount]);
  
  if (dir === "right") {
        listEl.appendChild(productList[mobileCount + 1]);
        mobileCount++;
        btnLeftEl.style.display = mobileCount > 0 ? "block" : "none";
    } else {
        listEl.appendChild(productList[mobileCount - 1]);
        mobileCount--;
        btnLeftEl.style.display = mobileCount > 0 ? "block" : "none";
    }
}

function slideDesktop(dir) {
  btnRightEl.style.display = count < productLength - 2 ? "block" : "none";

  if (dir === "right" && count < productLength - 1) {
    listEl.removeChild(productList[count - 2]);
    listEl.appendChild(productList[count + 1]);
    count++;
    btnLeftEl.style.display = count > 0 ? "block" : "none";
  }

  if (dir === "left" && count > 0) {
    listEl.removeChild(productList[count]);
    count--;
    listEl.insertBefore(productList[count - 2], listEl.firstChild);
    btnLeftEl.style.display = count > 2 ? "block" : "none";
  }
}

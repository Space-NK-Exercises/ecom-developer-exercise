//button variables
const productContainers = [...document.querySelectorAll(".product-container")];
const nxtBtn = [...document.querySelectorAll(".nxt-btn")];
const preBtn = [...document.querySelectorAll(".pre-btn")];

//text variables
const productLink = [...document.querySelectorAll(".product-link")];
const imageSrc = [...document.querySelectorAll(".image-src")];
const brandName = [...document.querySelectorAll(".brand-name")];
const productTitle = [...document.querySelectorAll(".product-title")];
const price = [...document.querySelectorAll(".price")];

//scroll carousel
productContainers.forEach((item, i) => {
  const productCard = [...item.querySelectorAll(".product-card")];
  const containerDimensions = productCard[i].getBoundingClientRect();
  const containerWidth = containerDimensions.width;

  nxtBtn[i].addEventListener("click", () => {
    item.scrollLeft += containerWidth;
  });

  preBtn[i].addEventListener("click", () => {
    item.scrollLeft -= containerWidth;
  });
});

//fetch json
const json = "/data/recommendations.json";

fetch(json)
  .then(response => {
    return response.json();
  })
  .then(data => {
    let jsonData = data.productData;

    //loop through and display data
    jsonData.forEach((product, i) => {
      const text = product.productTitle;
      productLink[i].href = product.productUrl;

      //if image ends with .jpg then display, otherwise add .jpg
      const isJpg = product.imageSrc.endsWith("jpg");
      const src = isJpg ? product.imageSrc : `${product.imageSrc}.jpg`;

      imageSrc[i].src = src;

      //add price to product with no price
      if (!product.price == "") {
        price[i].innerHTML = `£${product.price}`;
      } else {
        price[i].innerHTML = `£36.50`;
      }

      const newText = text.split("-");
      //add brand name to product that only has product title
      if (newText.length > 1) {
        productTitle[i].innerHTML = newText[1];
        brandName[i].innerHTML = newText[0].toUpperCase();
      } else {
        productTitle[i].innerHTML = text;
        brandName[i].innerHTML = "MALIN GO";
      }
    });
  })
  .catch(error => {
    console.log(error);
  });

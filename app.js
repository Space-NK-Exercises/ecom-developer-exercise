//button variables
const nxtBtn = [...document.querySelectorAll(".nxt-btn")];
const preBtn = [...document.querySelectorAll(".pre-btn")];

//product variables
const carousel = [...document.querySelectorAll(".carousel-container")];
const links = [...document.querySelectorAll(".product-link")];
const imageSrc = [...document.querySelectorAll(".image-src")];
const brands = [...document.querySelectorAll(".product-brand")];
const titles = [...document.querySelectorAll(".product-title")];
const prices = [...document.querySelectorAll(".price")];

//scroll carousel
carousel.forEach((item, i) => {
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

//slide carousel

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
      links[i].href = product.productUrl;

      //if image ends with .jpg then display, otherwise add .jpg
      const isJpg = product.imageSrc.endsWith("jpg");
      const src = isJpg ? product.imageSrc : `${product.imageSrc}.jpg`;

      imageSrc[i].src = src;

      //add price to product with no price
      if (!product.price == "") {
        prices[i].innerHTML = `£${product.price}`;
      } else {
        prices[i].innerHTML = `£36.50`;
      }

      const newText = text.split("-");
      //add brand name to product that only has product title
      if (newText.length > 1) {
        titles[i].innerHTML = newText[1];
        brands[i].innerHTML = newText[0].toUpperCase();
      } else {
        titles[i].innerHTML = text;
        brands[i].innerHTML = "MALIN GO";
      }
    });
  })
  .catch(error => {
    console.log(error);
  });

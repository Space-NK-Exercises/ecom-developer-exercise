//buttons
const productContainers = [...document.querySelectorAll(".product-container")];
const nxtBtn = [...document.querySelectorAll(".nxt-btn")];
const preBtn = [...document.querySelectorAll(".pre-btn")];

const imageSrc = [...document.querySelectorAll(".image-src")];
const productTitle = [...document.querySelectorAll(".product-title")];
const price = [...document.querySelectorAll(".price")];

productContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

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
      //   console.log(product.price);
      imageSrc[i].src = product.imageSrc;
      productTitle[i].innerHTML = product.productTitle;
      price[i].innerHTML = product.price;

      //splice brand name from productUrl
    });
  })
  .catch(error => {
    console.log(error);
  });

let currentIndex = 0;
let visibleProducts = 3;
const dataPath = '/data/recommendations.json';
let recommendationsData = [];
let productsData = [];

// setInterval(() => {

// }, 10);

buildCarousel = () => {
  const carousel_left_button = document.querySelector(
    '.carousel__button--left'
  );
  const carousel_right_button = document.querySelector(
    '.carousel__button--right'
  );
  carousel_right_button.addEventListener('click', scrollRight);
  carousel_left_button.addEventListener('click', scrollLeft);
};

generateProduct = (recommendation) => {
  const div = document.createElement('div');
  const product_image = document.createElement('img');
  const product_name = document.createElement('h3');
  const product_price = document.createElement('h3');
  div.classList.add('carousel__product');
  // console.log(recommendation.imageSrc);
  product_image.src = recommendation.imageSrc;
  // product_image.src =
  //   'https://www.spacenk.com/dw/image/v2/ABCE_PRD/on/demandware.static/-/Sites-spacenkmastercatalog/default/dw0371e163/products/OSKIA/UK200013165_OSKIA.jpg';
  product_name.classList.add('heading-primary');
  product_name.innerText = recommendation.productTitle;
  product_price.innerText = recommendation.price;
  product_price.classList.add('heading-primary');

  div.appendChild(product_image);
  div.appendChild(product_name);
  div.appendChild(product_price);
  return div;
};

appendProduct = (product) => {
  const parent = document.querySelector('.carousel__body');
  calculateProductPosition(product);
  parent.appendChild(product);
};

appendAllProducts = (productsData) => {
  for (let i = 0; i < productsData.length; i++) {
    appendProduct(productsData[i]);
  }
};

calculateProductPosition = (product) => {
  const parent = document.querySelector('.carousel__body');
  const number_of_children = parent.childElementCount;
  const carousel_product_width = calculateProductWidth();
  const carousel_product_offest = currentIndex * carousel_product_width;
  const margin_value =
    number_of_children * carousel_product_width + carousel_product_offest;
  product.style = `margin-left: ${margin_value}px`;
};

getData = () => {
  fetch(dataPath)
    .then((res) => res.json())
    .then((data) => {
      recommendationsData = data.productData;
      console.log(recommendationsData);
      for (let i = 0; i < recommendationsData.length; i++) {
        productsData[i] = generateProduct(data.productData[i]);
      }
    })
    .then(() => {
      appendAllProducts(productsData);
    });
};

scrollRight = () => {
  const carousel_product_list = document.querySelectorAll('.carousel__product');
  const carousel_product_width = calculateProductWidth();
  disableRightButton();

  if (!(currentIndex >= productsData.length - 1)) {
    for (let i = 0; i < carousel_product_list.length; i++) {
      carousel_product_list[i].addEventListener('transitionend', scrollEnd);
      const current_style = window.getComputedStyle(carousel_product_list[i]);
      const current_margin_left = current_style.getPropertyValue('margin-left');
      const new_margin_left =
        parseInt(current_margin_left) - carousel_product_width;
      carousel_product_list[i].style = `margin-left: ${new_margin_left}px`;
    }
    console.log(currentIndex);
    currentIndex++;
  }
};

scrollLeft = () => {
  const carousel_product_list = document.querySelectorAll('.carousel__product');
  const carousel_product_width = calculateProductWidth();
  disableLeftButton();

  if (!(currentIndex <= 0)) {
    for (let i = 0; i < carousel_product_list.length; i++) {
      carousel_product_list[i].addEventListener('transitionend', scrollEnd);
      const current_style = window.getComputedStyle(carousel_product_list[i]);
      const current_margin_left = current_style.getPropertyValue('margin-left');
      const new_margin_left =
        parseInt(current_margin_left) + carousel_product_width;
      carousel_product_list[i].style = `margin-left: ${new_margin_left}px`;
    }
    currentIndex--;
  }
};

scrollEnd = () => {
  buildCarousel();
};

disableRightButton = () => {
  const carousel_right_button = document.querySelector(
    '.carousel__button--right'
  );
  carousel_right_button.removeEventListener('click', scrollRight);
};

disableLeftButton = () => {
  const carousel_left_button = document.querySelector(
    '.carousel__button--left'
  );
  carousel_left_button.removeEventListener('click', scrollLeft);
};

calculateProductWidth = () => {
  const carousel_body = document.querySelector('.carousel__body');
  const carousel_product_width =
    carousel_body.getBoundingClientRect().width / visibleProducts;
  return carousel_product_width;
};

buildCarousel();

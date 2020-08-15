let currentIndex = 0;
let visibleProducts = 3;
let productsData = [];

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

generateProduct = () => {
  const div = document.createElement('div');
  const product_image = document.createElement('img');
  const product_name = document.createElement('h3');
  const product_price = document.createElement('h3');
  div.classList.add('carousel__product');
  product_image.src =
    'https://www.spacenk.com/on/demandware.static/-/Sites-spacenkmastercatalog/default/dwc9059537/products/FRESH/UK200025595_FRESH.jpg';
  product_name.classList.add('heading-primary');
  product_name.innerText = 'Fresh - Soy Face Cleanser';
  product_price.innerText = '30.00';
  product_price.classList.add('heading-primary');

  div.appendChild(product_image);
  div.appendChild(product_name);
  div.appendChild(product_price);
  return div;
};

appendProduct = (product) => {
  const parent = document.querySelector('.carousel__body');
  const number_of_children = parent.childElementCount;
  const carousel_product_width = calculateProductWidth();
  const margin_value = number_of_children * carousel_product_width;
  console.log(carousel_product_width);
  product.style = `margin-left: ${margin_value}px`;
  parent.appendChild(product);
};

appendAllProducts = (productsData) => {
  getData();
  for (let i = 0; i < productsData.length; i++) {
    appendProduct(productsData[i]);
  }
};

getData = () => {
  for (let i = 0; i < 10; i++) {
    productsData[i] = generateProduct();
  }
};

scrollRight = () => {
  const carousel_product_list = document.querySelectorAll('.carousel__product');
  const carousel_product_width = calculateProductWidth();

  if (!(currentIndex >= productsData.length - 1)) {
    for (let i = 0; i < carousel_product_list.length; i++) {
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

  if (!(currentIndex <= 0)) {
    for (let i = 0; i < carousel_product_list.length; i++) {
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
  const scrollBody = document.querySelector('.carousel__body');
  console.log(scrollBody);
  scrollBody.removeChild(scrollBody.firstElementChild);
  scrollBody.removeEventListener('transitionend', scrollEnd);
};

calculateProductWidth = () => {
  const carousel_body = document.querySelector('.carousel__body');
  const carousel_product_width =
    carousel_body.getBoundingClientRect().width / visibleProducts;
  return carousel_product_width;
};

buildCarousel();

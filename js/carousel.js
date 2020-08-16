class CustomCarousel {
  currentIndex;
  carousel_id;
  visibleProducts;
  dataPath;
  recommendationsData;
  productsData;

  constructor(carousel_id) {
    this.currentIndex = 0;
    this.carousel_id = carousel_id;
    this.visibleProducts = 3;
    this.dataPath = '/data/recommendations.json';
    this.recommendationsData = []; // JSON data
    this.productsData = []; // Array of products as <div> tags
  }

  initializeCarousel = () => {
    // this.adjustCarouselWidth();
    this.assignEvents();
    this.getData();
  };

  //Add Event Listeners
  assignEvents = () => {
    const carousel_left_button = document.querySelector(
      `#${this.carousel_id} .carousel__button--left`
    );
    const carousel_right_button = document.querySelector(
      `#${this.carousel_id} .carousel__button--right`
    );
    carousel_right_button.addEventListener('click', this.scrollRight);
    carousel_left_button.addEventListener('click', this.scrollLeft);
  };

  generateProduct = (recommendation) => {
    const div = document.createElement('div');
    const product_image = document.createElement('img');
    const product_anchor = document.createElement('a');

    const product_name = document.createElement('h3');
    const product_price = document.createElement('h3');
    div.classList.add('carousel__product');
    product_image.src = recommendation.imageSrc;
    product_name.classList.add('heading-primary');
    product_name.innerText = recommendation.productTitle;
    product_anchor.href = recommendation.productUrl;
    product_anchor.appendChild(product_image);
    product_price.innerText = recommendation.price;
    product_price.classList.add('heading-primary');
    div.appendChild(product_anchor);
    div.appendChild(product_name);
    div.appendChild(product_price);
    return div;
  };

  //Append a single product to the carousel body
  appendProduct = (product) => {
    const parent = document.querySelector(
      `#${this.carousel_id} .carousel__body`
    );
    this.calculateProductPosition(product);
    parent.appendChild(product);
  };

  //Append all products to the carousel body at once
  appendAllProducts = (productsData) => {
    for (let i = 0; i < productsData.length; i++) {
      this.appendProduct(productsData[i]);
    }
  };

  //Calculate where a product starts based on margin left styling
  calculateProductPosition = (product) => {
    const carousel_body = document.querySelector(
      `#${this.carousel_id} .carousel__body`
    );
    const number_of_children = carousel_body.childElementCount;
    const carousel_product_width = this.calculateProductWidth();
    const carousel_product_offest = this.currentIndex * carousel_product_width;
    const margin_value =
      number_of_children * carousel_product_width + carousel_product_offest;
    product.style = `margin-left: ${margin_value}px`;
  };

  calculateProductWidth = () => {
    const carousel_body = document.querySelector(
      `#${this.carousel_id} .carousel__body`
    );
    const carousel_product_width =
      carousel_body.getBoundingClientRect().width / this.visibleProducts;
    return carousel_product_width;
  };

  //Readjust width of carousel body based on number of visible products
  adjustCarouselWidth = () => {
    const carousel = document.querySelector(`#${this.carousel_id}`);
    const carousel_body = document.querySelector(
      `#${this.carousel_id} .carousel__body`
    );
    const carousel_product_width =
      carousel_body.getBoundingClientRect().width / this.visibleProducts;
    console.log(carousel_product_width);
    carousel.style = `width: ${carousel_product_width}rem`;
  };

  //Get data, then append all products to carousel body
  getData = () => {
    fetch(this.dataPath)
      .then((res) => res.json())
      .then((data) => {
        this.recommendationsData = data.productData;
        for (let i = 0; i < this.recommendationsData.length; i++) {
          this.productsData[i] = this.generateProduct(data.productData[i]);
        }
      })
      .then(() => {
        this.appendAllProducts(this.productsData);
      });
  };

  scrollRight = () => {
    const carousel_product_list = document.querySelectorAll(
      `#${this.carousel_id} .carousel__body .carousel__product`
    );
    const carousel_product_width = this.calculateProductWidth();
    this.disableRightButton();

    if (
      !(this.currentIndex >= this.productsData.length - this.visibleProducts)
    ) {
      for (let i = 0; i < carousel_product_list.length; i++) {
        carousel_product_list[i].addEventListener(
          'transitionend',
          this.scrollEnd
        );
        const current_style = window.getComputedStyle(carousel_product_list[i]);
        const current_margin_left = current_style.getPropertyValue(
          'margin-left'
        );
        const new_margin_left =
          parseInt(current_margin_left) - carousel_product_width;
        carousel_product_list[i].style = `margin-left: ${new_margin_left}px`;
      }
      this.currentIndex++;
    }
  };

  scrollLeft = () => {
    const carousel_product_list = document.querySelectorAll(
      `#${this.carousel_id} .carousel__body .carousel__product`
    );
    const carousel_product_width = this.calculateProductWidth();
    this.disableLeftButton();

    if (!(this.currentIndex <= 0)) {
      for (let i = 0; i < carousel_product_list.length; i++) {
        carousel_product_list[i].addEventListener(
          'transitionend',
          this.scrollEnd
        );
        const current_style = window.getComputedStyle(carousel_product_list[i]);
        const current_margin_left = current_style.getPropertyValue(
          'margin-left'
        );
        const new_margin_left =
          parseInt(current_margin_left) + carousel_product_width;
        carousel_product_list[i].style = `margin-left: ${new_margin_left}px`;
      }
      this.currentIndex--;
    }
  };

  scrollEnd = () => {
    this.assignEvents();
  };

  disableRightButton = () => {
    const carousel_right_button = document.querySelector(
      `#${this.carousel_id} .carousel__button--right`
    );
    carousel_right_button.removeEventListener('click', this.scrollRight);
  };

  disableLeftButton = () => {
    const carousel_left_button = document.querySelector(
      `#${this.carousel_id} .carousel__button--left`
    );
    carousel_left_button.removeEventListener('click', this.scrollLeft);
  };
}

let carousel = new CustomCarousel('carousel_instance');
carousel.initializeCarousel();

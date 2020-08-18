class CustomCarousel {
  currentIndex;
  carousel_id;
  visibleProducts;
  dataPath;
  recommendationsData;
  productsData;
  resizeId;

  constructor(carousel_id, visibleProducts) {
    this.currentIndex = 0;
    this.carousel_id = carousel_id;
    this.visibleProducts = visibleProducts;
    this.dataPath = '/data/recommendations.json';
    this.recommendationsData = []; // JSON data
    this.productsData = []; // Array of products as <div> tags
  }

  initializeCarousel = () => {
    this.getData();
  };

  //Only fire event when resizing of window is complete
  resizeEnd = () => {
    clearTimeout(this.resizeId);
    this.resizeId = setTimeout(this.readjustProductPosition, 1000);
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
    window.addEventListener('resize', this.resizeEnd);
  };

  generateProduct = (recommendation) => {
    const div = document.createElement('div');
    const product_image = document.createElement('img');
    const product_anchor = document.createElement('a');
    const product_name_top = document.createElement('h3');
    const product_name_sub = document.createElement('h3');
    const product_price = document.createElement('h3');
    const product_title_split = recommendation.productTitle.split('-');
    const product_title_top = product_title_split[0];
    let product_title_sub = product_title_split[1];
    div.classList.add('carousel__product');
    product_image.src = recommendation.imageSrc;
    product_name_top.classList.add('heading-primary');
    product_name_top.innerText = product_title_top.toUpperCase();
    product_name_sub.classList.add('heading-primary');
    if (!product_title_sub) {
      product_title_sub = '';
    }
    product_name_sub.innerText = product_title_sub;
    product_anchor.href = recommendation.productUrl;
    product_anchor.appendChild(product_image);
    product_price.innerText = recommendation.price;
    product_price.classList.add('heading-primary');
    product_price.classList.add('heading-primary--sub');
    div.appendChild(product_anchor);
    div.appendChild(product_name_top);
    div.appendChild(product_name_sub);
    div.appendChild(product_price);
    return div;
  };

  //Gives class name to the products based on the number of visible products setting
  assignProductCount = () => {
    const carousel_product_list = document.querySelectorAll(
      `#${this.carousel_id} .carousel__body .carousel__product`
    );
    for (let i = 0; i < carousel_product_list.length; i++) {
      carousel_product_list[i].classList.add(
        `carousel__product--${this.visibleProducts}`
      );
    }
  };

  //Append a single product to the carousel body
  appendProduct = (product) => {
    const carousel__body = document.querySelector(
      `#${this.carousel_id} .carousel__body`
    );
    this.calculateProductPosition(product);
    carousel__body.appendChild(product);
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

  calculateCarouselWidth = () => {
    const carousel_bar = document.querySelector(
      `#${this.carousel_id} .carousel__bar--left`
    );
    const carousel_bar_width = carousel_bar.getBoundingClientRect().width;
    const carousel_width = 2 * carousel_bar_width + 50 * this.visibleProducts;
    return carousel_width;
  };

  readjustProductPosition = () => {
    const carousel_product_list = document.querySelectorAll(
      `#${this.carousel_id} .carousel__body .carousel__product`
    );
    const new_product_width = this.calculateProductWidth();
    for (let i = 0; i < carousel_product_list.length; i++) {
      const newMarginLeft =
        new_product_width * i - this.currentIndex * new_product_width;

      carousel_product_list[i].style = `margin-left: ${newMarginLeft}px`;
    }
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
        this.assignProductCount();
        this.assignEvents();
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

//(carousel_id, number of visible products (1-5))
let carousel = new CustomCarousel('carousel_instance', 3);
carousel.initializeCarousel();

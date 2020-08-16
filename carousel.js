
const carousel = {
  defaults: {
    showNavigation: true,
    data: null,
    target: null,
    elementsPerSlide: 3,
    currentPosition: 0,
    productURL: false,
    currency: "$"
  },
  init: function (options) {
    this.config = {
      ...this.defaults,
      ...options
    }
    const { data, target, showNavigation, elementsPerSlide, productURL, currency} = this.config
    if (!data || !target) {
      console.log('Carousel ERROR: Invalid arguments')
      return
    }

    const productsWrapper = createEl("div", ["products-wrapper"])

    const products = createEl("ul", ["products"])

    data.productData.forEach(element => {
      const product = createEl("li")
      product.style.minWidth = `${100 / elementsPerSlide}%`

      const productImg = createEl("img")
      productImg.src = element.imageSrc
      productImg.onerror = function () {
        productImg.src = "./src/photo-error.png"
      }

      let href 

      if(productURL && element.productUrl) {
        href = createEl("a")
        href.href = element.productUrl
        href.appendChild(productImg)
      }

      const includeDescr = element.productTitle.includes("-")

      let productName 
      let productDescr 

      if(includeDescr) {
        productName = createEl("p", ["brand"], `${element.productTitle.split(" - ").shift()}`)
        productDescr = createEl("p", ["description"], `${element.productTitle.split(" - ").pop()}`)
      } else productTitle = createEl("p", ["brand"], `${element.productTitle}`)

      const productPrice = createEl("p", ["price"], `${currency + element.price}`)

      product.appendChild(productURL ? href : productImg)
      product.appendChild(includeDescr ? productName : productTitle)
      includeDescr ? product.appendChild(productDescr) : ""
      product.appendChild(productPrice)

      products.appendChild(product)
      this.tiles.push(product)
    })

    productsWrapper.appendChild(products)

    this.carousel = products

    if (showNavigation) {
      const nextArrow = createEl("i", ["material-icons", "next"], "keyboard_arrow_right")
      const prevArrow = createEl("i", ["material-icons", "prev"], "keyboard_arrow_left")

      nextArrow.addEventListener("click", () => {
        this.showNext(products, data)
      })

      prevArrow.addEventListener("click", () => {
        this.showPrev(products)
      })

      target.appendChild(prevArrow)
      target.appendChild(productsWrapper)
      target.appendChild(nextArrow)
    } else target.appendChild(productsWrapper)
  },
  showNext: function () {
    if (this.config.currentPosition < (this.tiles.length * 100 - 100) / this.config.elementsPerSlide) {
      this.carousel.style.transform = `translateX(-${this.config.currentPosition + 100}%)`
      this.config.currentPosition += 100
    }
  },
  showPrev: function () {
    if (this.config.currentPosition > 0) {
      this.carousel.style.transform = `translateX(-${this.config.currentPosition - 100}%)`
      this.config.currentPosition -= 100
    }
  },
  setElementsPerSlide: function (elementsPerSlide) {
    if (this.config.elementsPerSlide == elementsPerSlide) return
    this.config.elementsPerSlide = elementsPerSlide
    this.tiles.forEach(element => {
      element.style.minWidth = `${100 / elementsPerSlide}%`
    })
  },
  carousel: null,
  tiles: []
}

function createEl(elType, classArr, content) {
  const el = document.createElement(elType)
  if (classArr) el.classList.add(...classArr)
  if (content) el.innerHTML = content
  return el
}
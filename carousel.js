
class Carousel {

  constructor(options) {
    this.init(options)
  }

  get defaults() {
    return {
      showNavigation: true,
      data: null,
      target: null,
      elementsPerSlide: 3,
      currentPosition: 0,
      productURL: false,
      currency: "$",
      errorPhoto: undefined,
    }
  }

  init(options) {
    this.config = {
      ...this.defaults,
      ...options
    }
    const { data, target, showNavigation, elementsPerSlide, productURL, currency, errorPhoto } = this.config
    if (!data || !target) {
      console.log('Carousel ERROR: Invalid arguments')
      return
    }

    const productsWrapper = this.createEl("div", ["products-wrapper"])

    const products = this.createEl("ul", ["products"])

    data.productData.forEach(element => {
      const product = this.createEl("li")
      product.style.minWidth = `${100 / elementsPerSlide}%`

      const productImg = this.createEl("img")
      productImg.src = element.imageSrc
      productImg.onerror = function () {
        productImg.src = errorPhoto ? errorPhoto : "./src/photo-error.png"
      }

      let href

      if (productURL && element.productUrl) {
        href = this.createEl("a")
        href.href = element.productUrl
        href.appendChild(productImg)
      }

      const includeDescr = element.productTitle && element.productTitle.includes("-")

      let productName
      let productDescr
      let productTitle

      if (includeDescr) {
        productName = this.createEl("p", ["brand"], `${element.productTitle.split(" - ").shift()}`)
        productDescr = this.createEl("p", ["description"], `${element.productTitle.split(" - ").pop()}`)
      } else element.productTitle ? productTitle = this.createEl("p", ["brand"], `${element.productTitle}`) : productTitle = this.createEl("p", ["brand"], "No product name found")

      const productPrice = this.createEl("p", ["price"], `${currency + element.price}`)

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
      const nextArrow = this.createEl("i", ["material-icons", "next"], "keyboard_arrow_right")
      const prevArrow = this.createEl("i", ["material-icons", "prev"], "keyboard_arrow_left")

      nextArrow.addEventListener("click", () => {
        this.showNext()
      })

      prevArrow.addEventListener("click", () => {
        this.showPrev()
      })

      target.appendChild(prevArrow)
      target.appendChild(productsWrapper)
      target.appendChild(nextArrow)
    } else target.appendChild(productsWrapper)
  }

  showNext() {
    if (this.config.currentPosition < (this.tiles.length * 100 - 100) / this.config.elementsPerSlide) {
      this.carousel.style.transform = `translateX(-${this.config.currentPosition + 100}%)`
      this.config.currentPosition += 100
    }
  }

  showPrev() {
    if (this.config.currentPosition > 0) {
      this.carousel.style.transform = `translateX(-${this.config.currentPosition - 100}%)`
      this.config.currentPosition -= 100
    }
  }

  setElementsPerSlide(elementsPerSlide) {
    if (this.config.elementsPerSlide == elementsPerSlide) return
    this.config.elementsPerSlide = elementsPerSlide
    this.tiles.forEach(element => {
      element.style.minWidth = `${100 / elementsPerSlide}%`
    })
  }

  carousel = null
  tiles = []

  createEl(elType, classArr, content) {
    const el = document.createElement(elType)
    if (classArr) el.classList.add(...classArr)
    if (content) el.innerHTML = content
    return el
  }
}

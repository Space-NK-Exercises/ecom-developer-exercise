import ProductCard from "./ProductCard.js"
import Carousel from "./Carousel.js"

const fetchProducts = async () => {
  const dataJSON = await fetch("./data/recommendations.json")
  const data = await dataJSON.json()
  const products = data.productData
  const carousel = createCarousel(products)
  document.body.appendChild(carousel)
}

function createCarousel(products) {
  const carousel = new Carousel()
  products.forEach((product) => {
    const productCard = new ProductCard()
    productCard.setAttribute("productUrl", product.productUrl)
    productCard.setAttribute("imageSrc", product.imageSrc)
    productCard.setAttribute("productTitle", product.productTitle)
    productCard.setAttribute("price", product.price)
    console.log(productCard)
    carousel.appendChild(productCard)
  })
  return carousel
}

customElements.define("custom-carousel", Carousel)
customElements.define("product-card", ProductCard)
window.addEventListener("load", fetchProducts)

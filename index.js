import ProductCard from "./components/ProductCard.js"
import Carousel from "./components/Carousel.js"

const onLoad = async () => {
  const dataJSON = await fetch("./data/recommendations.json")
  const data = await dataJSON.json()
  const products = data.productData
  const carousel = createCarousel(products)
  document.body.appendChild(carousel)
}

function createCarousel(products) {
  const carousel = new Carousel()
  carousel.setAttribute("items-count", products.length)
  
  products.forEach((product) => {
    const productCard = new ProductCard()
    productCard.setAttribute("productUrl", product.productUrl)
    productCard.setAttribute("imageSrc", product.imageSrc)
    productCard.setAttribute("productTitle", product.productTitle)
    productCard.setAttribute("price", product.price)
    carousel.appendChild(productCard)
  })

  return carousel
}

window.addEventListener("load", onLoad)

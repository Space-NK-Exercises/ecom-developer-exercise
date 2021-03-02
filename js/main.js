import {Card} from "./Card.js"
const carosels = document.querySelectorAll(".carousel")
carosels.forEach(carosel => {
  const source = carosel.dataset.source
  if (source) {
    fetch("./data/recommendations.json")
      .then(response => response.json())
      .then(data => {
        data.productData.forEach((product, index) => {
          new Card(
            index,
            product.productUrl,
            product.imageSrc,
            product.productTitle,
            product.price
          ).render(carosel)
        })
      })
  }
})

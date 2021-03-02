import {Card} from "./Card.js"
const carosels = document.querySelectorAll(".carousel")
carosels.forEach(carosel => {
  fetch(carosel.dataset.source)
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
    .then(() => {
      const elements = Array.prototype.slice.call(
        carosel.querySelectorAll(".carousel_item")
      )
      elements.slice(0, 3).forEach(element => {
        const clone = element.cloneNode(true)
        clone.classList.add("clone")
        carosel.appendChild(clone)
      })

      elements
        .slice(-3)
        .reverse()
        .forEach(element => {
          const clone = element.cloneNode(true)
          clone.classList.add("clone")
          carosel.prepend(clone)
        })
    })
})

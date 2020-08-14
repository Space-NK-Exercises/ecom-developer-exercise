
const wrapper = document.querySelector(".products")

async function getData() {
  let response = await fetch("./data/recommendations.json")
  let data = await response
  return data.json()
}

getData().then(data => {
  data.productData.forEach(element => {
    const productImg = document.createElement("img")
    productImg.src = element.imageSrc

    const productName = document.createElement("p")
    productName.innerHTML = `${element.productTitle}`

    const productPrice = document.createElement("p")
    productPrice.innerHTML = `${element.price}`

    const product = document.createElement("li")

    product.appendChild(productImg)
    product.appendChild(productName)
    product.appendChild(productPrice)

    wrapper.appendChild(product)
  });
})

let carouselPosition = 0

function next(carousel) {
  carousel.style.transform = `translateX(-${carouselPosition + 100}%)`
  carouselPosition += 100
}

function prev(carousel) {
  carousel.style.transform = `translateX(-${carouselPosition - 100}%)`
  carouselPosition -= 100
}

document.querySelector(".next").addEventListener("click", () => {
  next(wrapper)
})

document.querySelector(".previous").addEventListener("click", () => {
  prev(wrapper)
})
const wrapper = document.querySelector(".container")
let carousel
async function getData() {
  let response = await fetch("./data/recommendations.json")
  let data = await response
  return data.json()
}


getData().then(data => {
  const elementsPerSlide = window.innerWidth <= 400 ? 1 : (window.innerWidth <= 667 ? 2 : 3)
  carousel = new Carousel({ data: data, target: wrapper, elementsPerSlide: elementsPerSlide, productURL: true, currency: "£" })
})

window.addEventListener("resize", () => {
  if (window.innerWidth <= 400) {
    carousel.setElementsPerSlide(1)
  } else if (window.innerWidth <= 667) {
    carousel.setElementsPerSlide(2)
  } else carousel.setElementsPerSlide(3)
})



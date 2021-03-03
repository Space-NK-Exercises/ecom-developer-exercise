import {Card} from "./Card.js"
const carosels = document.querySelectorAll(".carousel")
// Inspired by https://www.cssscript.com/demo/infinite-multi-slide-elder-carousel/
carosels.forEach(carousel => {
  // Create, insert and manipulate our sliding element
  const carousel_track = document.createElement("div")
  carousel_track.classList.add("carousel_track")
  carousel.appendChild(carousel_track)
  carousel_track.style.transform = `translateX(${-Math.abs(
    Math.floor(carousel.clientWidth)
  )}px)`
  carousel_track.style.transition = `transform 500ms ease 0s`
  carousel.dataset.current = -Math.abs(Math.floor(carousel.clientWidth))
  const third = Math.floor(carousel.clientWidth / 3)
  carousel.dataset.min = 0
  // Fetch our JSON
  fetch(carousel.dataset.source)
    .then(response => response.json())
    .then(data => {
      // Invoke our class and render it to the target
      data.productData.forEach((product, index) => {
        new Card(
          index,
          product.productUrl,
          product.imageSrc,
          product.productTitle,
          product.price,
          third
        ).render(carousel_track)
      })
    })
    .then(() => {
      // create our clones for the beginning and the end
      const elements = Array.prototype.slice.call(
        carousel_track.querySelectorAll(".carousel_item")
      )
      const elementsLength = elements.length + 6
      const elementWidth = carousel_track.querySelector(".carousel_item")
        .clientWidth
      carousel_track.style.width = `${elementsLength * elementWidth}px`
      // I hate maths!
      carousel.dataset.max = -Math.abs((elementsLength - 3) * elementWidth)
      elements.slice(0, 3).forEach(element => {
        const clone = element.cloneNode(true)
        clone.classList.add("clone")
        carousel_track.appendChild(clone)
      })
      elements
        .slice(-3)
        .reverse()
        .forEach(element => {
          const clone = element.cloneNode(true)
          clone.classList.add("clone")
          carousel_track.prepend(clone)
        })
    })
    .then(() => {
      // Add our buttons and their respective event listeners
      const prev = document.createElement("div")
      const prev_emoji = document.createTextNode("⬅️")
      prev.appendChild(prev_emoji)
      prev.classList.add("prev")
      carousel.appendChild(prev)
      prev.addEventListener("click", function () {
        if (!prev.classList.contains("disabled")) {
          // Sanity check - lets the transistion do it's thing
          prev.classList.add("disabled")
          const current = Number(carousel.dataset.current)
          carousel.dataset.current = current - third
          carousel_track.style.transform = `translateX(${current - third}px)`
          if (
            Number(carousel.dataset.current) === Number(carousel.dataset.max)
          ) {
            setTimeout(function () {
              carousel_track.style.transition = `none`
              const min = Number(carousel.dataset.min)
              carousel_track.style.transform = `translateX(${
                min - third * 3
              }px)`
              carousel.dataset.current = min - third * 3
              setTimeout(function () {
                carousel_track.style.transition = `transform 500ms ease 0s`
              }, 50)
              prev.classList.remove("disabled")
            }, 500)
          } else {
            setTimeout(function () {
              prev.classList.remove("disabled")
            }, 500)
          }
        }
      })

      const next = document.createElement("div")
      const next_emoji = document.createTextNode("➡️")
      next.appendChild(next_emoji)
      next.classList.add("next")
      carousel.appendChild(next)
      next.addEventListener("click", function () {
        if (!next.classList.contains("disabled")) {
          next.classList.add("disabled")
          const current = Number(carousel.dataset.current)
          carousel.dataset.current = current + third
          carousel_track.style.transform = `translateX(${current + third}px)`
          if (
            Number(carousel.dataset.current) === Number(carousel.dataset.min)
          ) {
            setTimeout(function () {
              carousel_track.style.transition = `none`
              const max = Number(carousel.dataset.max)
              carousel_track.style.transform = `translateX(${
                max + third * 3
              }px)`
              carousel.dataset.current = max + third * 3
              setTimeout(function () {
                carousel_track.style.transition = `transform 500ms ease 0s`
              }, 50)
              next.classList.remove("disabled")
            }, 500)
          } else {
            setTimeout(function () {
              next.classList.remove("disabled")
            }, 500)
          }
        }
      })
    })
})

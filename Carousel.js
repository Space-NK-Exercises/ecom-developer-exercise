const template = document.createElement("template")

template.innerHTML = `
<style>
.carousel-wrapper {
    background:white;
    position:relative;
  }

 .carousel {
    --card-width: 20em;  
    --items-per-row: 3;
    --items-gap: 5em;
    --slide-index: 0;
    padding: 1em 3.5em;
    overflow:hidden;


    /* 
    Calculates the the width of the container based on the
    card width and the amount of items per row including the gap.
    */
    width: calc( var(--card-width) * var(--items-per-row) + var(--items-gap) * (var(--items-per-row) - 1) );
 }

 .carousel-cards {
  display:flex;
  gap: var(--items-gap);
  width: 100%;
  transform: translateX(calc( ((-100% - var(--items-gap)) / var(--items-per-row) * var(--slide-index))));
  transition: transform 0.3s ease-in-out;
}

 button {
    background: none;
    display: flex;
    padding: 0.5em;
    border:none;
    outline:none;
    cursor:pointer;
    font-size: 1em;
    position:absolute;
    z-index:1;
    border-radius: 5px;
    top:50%;
  }

  button:focus {
    outline: 2px solid gray;
  }

  .prev {
    left:0;
  }

  .next {
    right:0;
  }
</style>
<div class="carousel-wrapper">
    <button class="prev">
      <svg width="32px" height="32px" viewBox="0 0 32 32" id="i-chevron-left" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <path d="M20 30 L8 16 20 2" />
      </svg>
    </button>
    <div class="carousel">
        <div class="carousel-cards">
            <slot></slot>
        </div>
    </div> 
    <button class="next">
      <svg width="32px" height="32px" viewBox="0 0 32 32" id="i-chevron-right" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <path d="M12 30 L24 16 12 2" />
      </svg>
    </button>
</div> 
`

const listenForClick = (element) => {
  const root = element.shadowRoot
  const carousel = root.querySelector(".carousel") //carousel element with all the css variables

  root.addEventListener("click", (event) => {
    const currentIndex = parseInt(getComputedStyle(carousel).getPropertyValue("--slide-index"))
    const itemsCount = parseInt(element.getAttribute("items-count")) // the amount of items in the data array
    const itemsPerRow = getComputedStyle(carousel).getPropertyValue("--items-per-row")

    const isOverflowingToTheRight = currentIndex >= itemsCount - itemsPerRow
    //Previous button
    if (event.target.closest(".prev")) {
      currentIndex > 0 && carousel.style.setProperty("--slide-index", currentIndex - 1)
    }

    //Next button
    if (event.target.closest(".next")) {
      !isOverflowingToTheRight && carousel.style.setProperty("--slide-index", currentIndex + 1)
    }
  })
}

class Carousel extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    listenForClick(this)
  }
}

customElements.define("custom-carousel", Carousel)

export default Carousel

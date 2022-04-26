const template = document.createElement("template")

template.innerHTML = `
<style>
.carousel-wrapper {
    background:white;
    position:relative;
  }

 .carousel {
     max-width: 1000px;
     overflow:hidden;
 }

 .carousel-cards {
  display:flex;

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

class Carousel extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

export default Carousel

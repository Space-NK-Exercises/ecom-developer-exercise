const template = document.createElement("template")

template.innerHTML = `
<style>
.carousel-wrapper {
    background:white;
    position:relative;
  }
 .carousel-cards {
    display:flex;

 }
 .carousel {
     max-width: 1000px;
     overflow:hidden;
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
 
  .next {
    right:0;
  }
</style>
<div class="carousel-wrapper">
    <button class="prev">
       Previous
    </button>
        <div class="carousel">
            <div class="carousel-cards">
                <slot></slot>
            </div>
        </div> 
        <button class="next">
            Next
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

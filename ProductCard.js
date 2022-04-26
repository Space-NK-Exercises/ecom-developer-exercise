const template = document.createElement("template")

template.innerHTML = `
<style>
    .carousel-card {
        width:200px;
        border: 1px solid black;
        text-align: center;
    }
    img {
        width:100%;
    }
</style>
<div  class="carousel-card"  >
    <a href="" target="_blank"> 
        <img src="" alt="">
        <div class="carousel-card-content">
            <p class="carousel-card__title"></p>
            <p class="carousel-card__subtitle"></p>
            <p class="carousel-card__price"></p>
        </div>
    </a>
</div>
`

class ProductCard extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
  connectedCallback() {
    this.render()
  }
  render() {
    const productUrl = this.getAttribute("productUrl")
    const imageSrc = this.getAttribute("imageSrc")
    const productTitle = this.getAttribute("productTitle")
    const price = this.getAttribute("price")
    const title = productTitle.split("-")[0] || "Title"
    const subtitle = productTitle.split("-")[1] || "&nbsp;"

    this.shadowRoot.querySelector("a").href = productUrl
    this.shadowRoot.querySelector("a").tabIndex = -1
    this.shadowRoot.querySelector(".carousel-card__title").innerHTML = title
    this.shadowRoot.querySelector(".carousel-card__subtitle").innerHTML = subtitle
    this.shadowRoot.querySelector(".carousel-card__price").innerHTML = price
      ? `£${price}`
      : "Price not available"

    this.shadowRoot.querySelector("img").src = imageSrc
  }
}

export default ProductCard

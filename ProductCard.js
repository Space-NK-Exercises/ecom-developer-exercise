const template = document.createElement("template")

template.innerHTML = `
<style>
    .carousel-card {
        width:var(--card-width);
        text-align: center;
        height:100%;
        position: relative;
        text-align:center;
        background: white;
        transition: all 0.15s ease-in-out;
      }
      
    .carousel-card:hover {
        box-shadow: 0 3px 5px rgba(0,0,0,0.2);
        transform: translateY(-3px);
      }

    img {
        width:100%;
      }

    .carousel-card:hover {
      box-shadow: 0 3px 5px rgba(0,0,0,0.2);
      transform: translateY(-3px);
    }

    a {
      text-decoration: none;
    }

    .carousel-card-content {
      margin-top: 0.3em;
      padding:0.5em;
    }

    p {
      margin:0;
      padding: 0;
      color: rgb(73, 73, 73);
      text-decoration: none;
    }
</style>
<a href="" target="_blank"> 
    <div  class="carousel-card"  >
      <img src="" alt="">
      <div class="carousel-card-content">
          <p class="carousel-card__title"></p>
          <p class="carousel-card__subtitle"></p>
          <p class="carousel-card__price"></p>
      </div>
    </div>
  </a>
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
    this.shadowRoot.querySelector("img").addEventListener("error", (e) => {
      e.target.src =
        "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
    })
  }
}

customElements.define("product-card", ProductCard)
export default ProductCard

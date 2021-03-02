export class Card {
  constructor(id, productUrl, imageSrc, productTitle, price) {
    this.id = id
    this.productUrl = productUrl
    this.imageSrc = imageSrc
    this.productTitle = productTitle
    this.price = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP"
    }).format(price)
  }
  render(target) {
    const markup = `
      <a class="carousel_item"
         href="${this.productUrl}"
         target="_blank"
         data-position="${this.id}">
        <img src="${this.imageSrc}"
             alt="${this.productTitle}"
             onerror="this.onerror=null;this.src='./img/logo.svg';"/>
        <div>
          <h2>${this.productTitle}</h2>
          <p>${this.price}</p>
        </div>
      </a>
    `
    target.insertAdjacentHTML("afterbegin", markup)
  }
}

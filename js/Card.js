export class Card {
  constructor(id, productUrl, imageSrc, productTitle, price) {
    this.id = id
    this.productUrl = productUrl
    this.imageSrc = imageSrc
    this.productTitle = productTitle
    this.price = price.toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP"
    })
  }
  render(target) {
    const markup = `
      <a class="carousel-item" 
         href="${this.productUrl}"
         target="_blank"
         data-position="${this.id}">
        <img src="${this.imageSrc}"
             alt="${this.productTitle}"/>
        <h2>${this.productTitle}</h2>
        <p>${this.price}</p>
      </a>
    `
    target.insertAdjacentHTML("afterbegin", markup)
  }
}

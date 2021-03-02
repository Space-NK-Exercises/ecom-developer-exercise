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
      <div class='carousel__item carousel__item--mobile-in-1 carousel__item--tablet-in-2 carousel__item--desktop-in-3'>
        <div class='demo-content'>
          <a href="${this.productUrl}"
             target="_blank"
             data-position="${this.id}">
            <img src="${this.imageSrc}"
                alt="${this.productTitle}"/>
            <div>
              <h2>${this.productTitle}</h2>
              <p>${this.price}</p>
            </div>
          </a>
        </div>
      </div>
    `
    const track = target.querySelector(".carousel__track")
    track.insertAdjacentHTML("afterbegin", markup)
  }
}

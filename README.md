# Space NK Developer Exercise

This custom carousel component is made using vanilla JS.
It is reusable and the number of visible products on one slide can be adjusted.
It is also responsive, so resizing the window should also resize the component itself and accurate show the products.

A new carousel instance can be initialized like so:

```javascript
let carousel = new CustomCarousel(container_id, number_of_visible);
carousel.initializeCarousel();
```

This is the base markup required
The only thing to change is the ID of the div

```
 <div id="CAROUSEL_ID" class="carousel">
    <a href="javascript:;" class="carousel__button carousel__button--left"
      >&#8592;</a
    >
    <a href="javascript:;" class="carousel__button carousel__button--right"
      >&#8594;</a
    >
    <div class="carousel__bar--left">&nbsp;</div>
    <div class="carousel__bar--right">&nbsp;</div>
    <div class="carousel__body"></div>
  </div>
```

This carousel works by transforming the margin-left property of the different products.

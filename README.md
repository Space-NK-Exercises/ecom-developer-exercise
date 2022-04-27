# Space NK Developer Exercise

[Carousel](Components/Carousel.js) - This component contains the controls of the slider. It has 2 buttons taking care of sliding the images left and right and it basically serves as a wrapper to the [ProductCard](components/ProductCard.js) component. The next and previous buttons control the ```--slider-index``` CSS variable which makes the carousel translate to the left or right with calculation based on the card width and the items gap.

I used media queries to make it responsive on smaller screens by changing the amount of items displayed and the card width & height based on screen size.

In the [index.js](index.js) file I have created a function that accepts the products array.
It creates a [ProductCard](components/ProductCard.js) component for each product, appends it to the carousel and returns the carousel.


I've added a function that gets fired on window load which appends the carousel to the body.

```
window.addEventListener("load", onLoad)
```

To run the app without cors issues you might need to use the LiveServer Vscode extension and just open the [index.html](index.html) file. Otherwise serve it with simple express/node/python server.

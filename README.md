# Space NK Developer Exercise

In this exercise we would like you to build a recommendations carousel component purely in Vanilla JavaScript. The carousel should look similar to this [screenshot](recommendations-screenshot.png) using the recommendations [JSON](data/recommendations.json) provided. The carousel component you build should display the product title, image, brand name, price and should link to the website product detail page. Creativity is accepted but do not alter the JSON provided and please refrain from using any JavaScript libraries or frameworks.

### Requirements

- Responsive
- Clean, reusable code

Please fork this repository and commit your changes for review.

Amend this Readme in your forked repo and use your commits to outline the component you have created and the decisions that you have made, including any information required for how to run your component. When complete please raise a Pull Request back into master branch for review.

🔧 Technologies used:

- CSS, HTML, Javascript
- Bootstrap

ℹ️ Documentation:

Structure for the carousel:  
| carouselContainer  
|| itemsContainer  
||| carouselItem 1  
||| carouselItem 2  
||| carouselItem 3

- When <body> (in index.html) loads, "initializeCarousel" function is triggered, taking as a parameter a file that contains a json object (in this case, data/recommendations.json) and propagating the products to the carousel.

* <body> has one div: #carouselContainer, and this is the div that is going to contain the rest of the elements. All items are added using DOM manipulation. First item will be displayed always. Second one will be displayed when the viewport is medium. And the third one will be display when the viewport is large.

* The variable "index" saves the first index of the three items that can be visible in the screen.

* "initializeCarousel(filepath)" retrieves data from the json object using XMLHttpRequest and stores it in a variable called "data". This variable will be accessed in other functions. This function creates all items checking if they have all the information required with "checkItemIsCorrect" and then creating the actual item with "createItem".

* "checkItemIsCorrect(item)" checks if the product contains all the information that is going to be shown. It checks:

  - If the "imgSRC" of the json object is an image by looking at the extension of this file (.jpg, .jpeg, .png, etc.). It uses a regular expression to check this.
  - If the the value of "price" is empty.
  - if the "productTitle" includes brand and description.

* "createItem(item)" creates an item and appends it to the itemsContainer div.

* "moveCarousel(direction)" function.

  - let itemsCount. This variable initializes with 0, and can be 1, 2 or 3 depending on the size of the viewport. "window.innerWidth" is used for this purpose. If the width is small, itemsCount = 1, if is medium, itemsCount = 2, and if is large, itemsCount = 3.
  - DOM manipulation is used to add "display: none" to the divs that are not active in the carousel.
  - DOM manipulation is used to add the correct classes to the active divs in the carousel, as well as the order for the divs inside itemsContainer.
  - itemsContainer.children is working as a circular array. It is using the module of itemsContainer.children.length to have always the index inside the itemsContainer.children range.

* The carousel will use a timer set by setInterval that will trigger "moveCarousel()" every five seconds to make this carousel automatic.

  - The timer is set inside "initializeCarousel()" and inside "moveCarousel()".
  - The interval is cleared by calling "clearInterval()" inside "moveCarousel()", so if the user presses "prev" or "next", the next items won't show until 5 seconds have passed. It would be a very bad user experience if the user clicks the "prev" or "next" button and after one second, we pass to the next items.

* Functionality for touch screen:
  - itemsContainer has handles for ontouchstart, ontouchmove and ontouchend.
  - "handleTouchStart(event)" function. Detects the position were the screen is touched at the beginning and saves the value in the variable "initialX". It also sets "swipeRight" and "swipeLeft" to false.
  - "handleTouchMove(event)" function. Detects the movements when the user is touching the screen. It detects where the finger is currently and compares it with "initialX". If there is a movement to the left, it detects a swipe left and if there is movement to the right, it detects a swipe right.
  - "handleTouchEnd()" function. Detects when the user stops touching the screen and moves the carousel right or left depending on which direction the user is swiping.

📝 Comments:

- This assignment has been more difficult that what I initially thought. I had implemented a carousel before, using a bootstrap template, and it was one item inside the carousel (fairly easy). Also, I had to discard options as Swiper.js because of the plain/vanilla Javascript requirement.
- For the purpose of loading a local Json in javascript I decided to use XMLHttprequest because for "require()" I would have needed to use Node.js, and I thought that in order to use only plain/vanilla Javascript, it was better not to use it.
- At the beginning, it was difficult for me to think how to start from 0 in an array when the end is reached. Then I found that this can be done by doing a "circular array" using the module. It was hard to understand this, but once I started to draw this array on the paper and with a little bit of time, it made more sense.
- I think this assignment has been a good learning experience because is something I haven't done before.

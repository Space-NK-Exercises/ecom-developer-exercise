let data; //items
let index = 0; //first item out of the 3 in screen
let timer; //to move the carousel after 5 seconds

let initialX = 0;
let swipeRight = false;
let swipeLeft = false;
//handles for the touch screen
function handleTouchStart(event) {
  swipeRight = false;
  swipeLeft = false;
  initialX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  let xAfterMove = event.touches[0].clientX;
  if (initialX - xAfterMove > 100) {
    //Swipe left
    swipeLeft = true;
  } else if (initialX - xAfterMove < -100) {
    //Swipe right
    swipeRight = true;
  }
}

function handleTouchEnd() {
  if (swipeRight) {
    moveCarousel("prev");
  } else if (swipeLeft) {
    moveCarousel("next");
  }
}

function checkItemIsCorrect(item) {
  let imgRegex = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/;
  if (
    !item.price ||
    item.productTitle.split("-").length < 2 ||
    !imgRegex.test(item.imageSrc)
  ) {
    return false;
  }
  //if price, productTitle and imageSrc are correct, returns true
  return true;
}

function createItem(item) {
  let itemsContainer = document.getElementById("itemsContainer");
  let carouselItem = document.createElement("div");
  carouselItem.style.display = "none";
  //Image
  let imgAnchor = document.createElement("a");
  imgAnchor.href = item.productUrl;
  let img = document.createElement("img");
  img.className = "imgCarousel";
  img.src = item.imageSrc;
  imgAnchor.appendChild(img);
  carouselItem.appendChild(imgAnchor);

  //Information
  let brandName = item.productTitle.split("-")[0].trim();
  let productName = item.productTitle.split("-")[1].trim();
  let informationItem = document.createElement("div");
  informationItem.className = "informationItem";
  let brandNode = document.createElement("h3");
  let brandContent = document.createTextNode(brandName);
  brandNode.appendChild(brandContent);
  let productNode = document.createElement("a");
  productNode.href = item.productUrl;
  let productContent = document.createTextNode(productName);
  productNode.appendChild(productContent);
  let priceNode = document.createElement("span");
  let priceContent = document.createTextNode("£" + item.price);
  priceNode.appendChild(priceContent);
  //Append brand, product and price information to the div containing them
  informationItem.appendChild(brandNode);
  informationItem.appendChild(productNode);
  informationItem.appendChild(priceNode);

  carouselItem.appendChild(informationItem);
  itemsContainer.appendChild(carouselItem);
}

function initializeCarousel(filepath) {
  let request = new XMLHttpRequest();
  request.open("GET", filepath, false);
  request.send(null);
  data = JSON.parse(request.responseText).productData;

  //Creating the divs for the carousel
  let carouselContainer = document.getElementById("carouselContainer");
  let itemsContainer = document.createElement("div");
  itemsContainer.id = "itemsContainer";
  itemsContainer.ontouchstart = handleTouchStart;
  itemsContainer.ontouchmove = handleTouchMove;
  itemsContainer.ontouchend = handleTouchEnd;
  carouselContainer.appendChild(itemsContainer);

  //Create items
  for (let i = 0; i < data.length; i++) {
    if (checkItemIsCorrect(data[i])) {
      createItem(data[i]);
    }
  }

  //Displaying items according to the size of viewport:
  //Small:  1 item
  //Medium: 2 items
  //Large:  3 items
  itemsContainer.children[0].className = "carouselItem d-inline";
  itemsContainer.children[1].className = "carouselItem d-none d-md-inline";
  itemsContainer.children[2].className = "carouselItem d-none d-lg-inline";

  //Set interval for the first time
  timer = setInterval(function () {
    moveCarousel("next");
  }, 5000);
}

function moveCarousel(direction) {
  let itemsCount = 0;
  let itemsContainer = document.getElementById("itemsContainer");
  clearInterval(timer);

  //Reset the active divs
  itemsContainer.children[
    index % itemsContainer.children.length
  ].style.display = "none";
  itemsContainer.children[index % itemsContainer.children.length].className =
    "";
  itemsContainer.children[
    (index + 1) % itemsContainer.children.length
  ].style.display = "none";
  itemsContainer.children[
    (index + 1) % itemsContainer.children.length
  ].className = "";
  itemsContainer.children[
    (index + 2) % itemsContainer.children.length
  ].style.display = "none";
  itemsContainer.children[
    (index + 2) % itemsContainer.children.length
  ].className = "";

  //itemsCount stores how many items are in the screen
  if (window.innerWidth < 768) {
    itemsCount = 1;
  } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
    itemsCount = 2;
  } else {
    itemsCount = 3;
  }

  //Calculates next index
  if (direction === "next") {
    if (index + itemsCount >= itemsContainer.children.length) {
      index = (index + itemsCount) % itemsContainer.children.length;
    } else {
      index += itemsCount;
    }
  } else {
    if (index - itemsCount < 0) {
      index = index - itemsCount + itemsContainer.children.length;
    } else {
      index -= itemsCount;
    }
  }

  //Set next items to be visible
  itemsContainer.children[index % itemsContainer.children.length].className =
    "carouselItem d-inline";
  itemsContainer.children[index % itemsContainer.children.length].style.order =
    "1";
  itemsContainer.children[
    (index + 1) % itemsContainer.children.length
  ].className = "carouselItem d-none d-md-inline";
  itemsContainer.children[
    (index + 1) % itemsContainer.children.length
  ].style.order = "2";
  itemsContainer.children[
    (index + 2) % itemsContainer.children.length
  ].className = "carouselItem d-none d-lg-inline";
  itemsContainer.children[
    (index + 2) % itemsContainer.children.length
  ].style.order = "3";

  //Set timer
  timer = setInterval(function () {
    moveCarousel("next");
  }, 5000);
}

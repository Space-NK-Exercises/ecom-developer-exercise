
var carousel = document.querySelector('.carousel_container'); //

document.getElementsByClassName("btn_prev")[0].addEventListener("click", eventHandler);
document.getElementsByClassName("btn_next")[0].addEventListener("click", eventHandler);

// Custom event handler function
function eventHandler(event) {
  var tempElement;
  var elem = document.querySelector('.order1');

  elem.classList.remove('order1'); // remove order property from the last carousel item
  if (event.currentTarget.classList.contains('btn_next')) {
    tempElement = scrollLeft(elem);
    carousel.classList.remove('is-prev');
  } else {
    tempElement = scrollRight(elem);
    carousel.classList.add('is-prev');
  }

  tempElement.classList.add('order1'); // set the Order property of the current element to Order1
  tempElement.style.order = 1;
  for (var i = 2; i <= document.querySelectorAll('.carousel_item').length; i++) {
    tempElement = scrollLeft(tempElement);
    tempElement.style.order = i; // set the remaining elements with increasing Order from 1
  }

  carousel.classList.remove('is-active');
  return setTimeout(function() {
    return carousel.classList.add('is-active'); // We remove the is-active class and add it again to achive transition effect
  }, 50);
}

function scrollLeft(elem) {
	if (elem.nextElementSibling) { // check if there is any next element available
	  return elem.nextElementSibling;
	} else {
	  return carousel.firstElementChild;
	}
}

function scrollRight(elem) {
	if (elem.previousElementSibling) { // check if there is any previous element available
	  return elem.previousElementSibling;
	} else {
	  return carousel.lastElementChild;
	}
}
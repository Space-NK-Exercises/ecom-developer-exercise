const previousBtn = document.querySelector('#previous');
const nextBtn = document.querySelector('#next');

const showPrevious = () => {
	console.log('previous');
};
const showNext = () => {
	console.log('next');
};

const constructCarouselItem = () => {
	console.log('constructed');
};

const renderCarouselItem = () => {
	constructCarouselItem();
	console.log('carousel item');
	// construct carousel item

	// append to parent
};

const onLoad = () => {
	console.log('loaded');
	renderCarouselItem();
};

previousBtn.addEventListener('click', showPrevious);
nextBtn.addEventListener('click', showNext);
window.addEventListener('load', onLoad);

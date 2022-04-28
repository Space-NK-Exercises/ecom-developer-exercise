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
	// construct carousel item
	const price = document.createElement('h3');
	price.textContent = '£40.00';

	const productName = document.createElement('h4');
	productName.setAttribute('class', 'product-name');
	productName.textContent = 'Ultimate face wash';

	const brand = document.createElement('h3');
	brand.setAttribute('class', 'brand-name');
	brand.textContent = 'Amanda';

	const detailsDiv = document.createElement('div');
	detailsDiv.setAttribute('class', 'carousel-item-details');
	detailsDiv.append(brand, productName, price);

	const productImg = document.createElement('img');
	productImg.setAttribute('class', 'product-img');
	productImg.setAttribute(
		'src',
		'https://static.thcdn.com/images/large/webp/productimg/1600/1600/11471638-8344484790681069.jpg'
	);

	const itemDiv = document.createElement('div');
	itemDiv.setAttribute('class', 'carousel-item');
	itemDiv.append(productImg, detailsDiv);

	return itemDiv;
};

const renderCarouselItem = () => {
	const carouselItem = constructCarouselItem();

	// append to parent
	const carousel = document.querySelector('#carousel');
	carousel.append(carouselItem);
};

const onLoad = () => {
	console.log('loaded');
	renderCarouselItem();
};

previousBtn.addEventListener('click', showPrevious);
nextBtn.addEventListener('click', showNext);
window.addEventListener('load', onLoad);

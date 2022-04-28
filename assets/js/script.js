const previousBtn = document.querySelector('#previous');
const nextBtn = document.querySelector('#next');

// get JSON data
const fetchData = async () => {
	const URL = new Request('../../assets/data/recommendations.json');
	const response = await fetch(URL);
	return response.json();
};

// next/previous buttons
const showPrevious = () => {
	console.log('previous');
};
const showNext = () => {
	console.log('next');
};

// relocates to product selected
const handleRelocate = (event) => {
	const productClicked = event.currentTarget;
	const index = parseInt(productClicked.getAttribute('data-index'));
	window.open(productData[index].productUrl);
};

// constructing the carousel item
const constructCarouselItem = (product, index) => {
	const price = document.createElement('h3');
	price.textContent = '£' + product.price;

	const productName = document.createElement('h4');
	productName.setAttribute('class', 'product-name');
	productName.textContent = product.productTitle.split(/-/)[1];

	const brand = document.createElement('h3');
	brand.setAttribute('class', 'brand-name');
	brand.textContent = product.productTitle.split(/-/)[0];

	const detailsDiv = document.createElement('div');
	detailsDiv.setAttribute('class', 'carousel-item-details');
	detailsDiv.append(brand, productName, price);

	const productImg = document.createElement('img');
	productImg.setAttribute('class', 'product-img');
	productImg.setAttribute('src', product.imageSrc);

	const itemDiv = document.createElement('div');
	itemDiv.setAttribute('class', 'carousel-item');
	itemDiv.setAttribute('data-index', index);
	itemDiv.append(productImg, detailsDiv);

	itemDiv.addEventListener('click', handleRelocate);

	return itemDiv;
};

// rendering carousel item
// mapping through productData and append to parent
const renderCarouselItem = async () => {
	const { productData } = await fetchData();
	const carouselItems = productData.map(constructCarouselItem);

	const carousel = document.querySelector('#carousel');
	const slider = document.querySelector('.slider');
	slider.append(...carouselItems);
};

// onLoad function
const onLoad = () => {
	renderCarouselItem();
};

previousBtn.addEventListener('click', showPrevious);
nextBtn.addEventListener('click', showNext);
window.addEventListener('load', onLoad);

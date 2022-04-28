const productData = [
	{
		productUrl:
			'https://www.spacenk.com/uk/en_GB/skincare/cleansers/cleanser/soy-face-cleanser-MUK200025595.html',
		imageSrc:
			'https://www.spacenk.com/on/demandware.static/-/Sites-spacenkmastercatalog/default/dwc9059537/products/FRESH/UK200025595_FRESH.jpg',
		productTitle: 'Fresh - Soy Face Cleanser',
		price: '30.00',
	},
	{
		productUrl:
			'https://www.spacenk.com/uk/en_GB/skincare/cleansers/cleanser/cleanser-MUK154050009.html',
		imageSrc:
			'https://www.spacenk.com/on/demandware.static/-/Sites-spacenkmastercatalog/default/dw4fed2dd5/products/EVE_LOM/UK154050009_EVE_LOM.jpg',
		productTitle: 'Eve Lom - Cleanser',
		price: '85.00',
	},
];

const previousBtn = document.querySelector('#previous');
const nextBtn = document.querySelector('#next');

const showPrevious = () => {
	console.log('previous');
};
const showNext = () => {
	console.log('next');
};

const handleRelocate = (event) => {
	console.log('relocate to product page');

	const productClicked = event.currentTarget.getAttribute('data-index');
	console.log(productClicked);
};

const constructCarouselItem = (product, index) => {
	// construct carousel item
	const price = document.createElement('h3');
	price.textContent = product.price;

	const productName = document.createElement('h4');
	productName.setAttribute('class', 'product-name');
	productName.textContent = product.productTitle;

	const brand = document.createElement('h3');
	brand.setAttribute('class', 'brand-name');
	brand.textContent = product.productTitle;

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

const renderCarouselItem = () => {
	const carouselItem = constructCarouselItem(productData[0], 0);
	const carouselItem2 = constructCarouselItem(productData[1], 1);

	// append to parent
	const carousel = document.querySelector('#carousel');
	carousel.append(carouselItem, carouselItem2);
};

const onLoad = () => {
	renderCarouselItem();
};

previousBtn.addEventListener('click', showPrevious);
nextBtn.addEventListener('click', showNext);
window.addEventListener('load', onLoad);

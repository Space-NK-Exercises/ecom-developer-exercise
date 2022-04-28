const previousBtn = document.querySelector('#previous');
const nextBtn = document.querySelector('#next');

const showPrevious = () => {
	console.log('previous');
};
const showNext = () => {
	console.log('next');
};

previousBtn.addEventListener('click', showPrevious);
nextBtn.addEventListener('click', showNext);

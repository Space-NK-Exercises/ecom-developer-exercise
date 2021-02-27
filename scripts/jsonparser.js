
window.onload = function(e) {
		var jsonData = this.productsData;
		var productData = jsonData.productData;

		var carouselContainer = document.getElementById("carouselContainer");

		for(var i=0; i<productData.length; i++) {

			var carousel_item = createElement("li", "carousel_item", "", "");
			
			if (i == productData.length-1) {
				carousel_item.className += " order1";
			}

			var carousel_anchor = createElement("a", "", "", productData[i]["productUrl"]);
			
			var carousel_img = createElement("img", "carousel_item_img", "", productData[i]["imageSrc"]);
			var carousel_title = createElement("div", "carousel_item_title", productData[i]["productTitle"].split("-")[0], "");				
			var carousel_desc = createElement("div", "carousel_item_desc", productData[i]["productTitle"].split("-")[1], "");				
			var carousel_price = createElement("div", "carousel_item_price", "£"+ productData[i]["price"], ""); 

			carousel_anchor.appendChild(carousel_img);
			carousel_anchor.appendChild(carousel_title);
			carousel_anchor.appendChild(carousel_desc);
			carousel_anchor.appendChild(carousel_price);

			carousel_item.appendChild(carousel_anchor);
			
			carouselContainer.appendChild(carousel_item);
		}

		function createElement(element, className, data, attr) {
			var tempElement = document.createElement(element);
			if(className) {
				tempElement.classList.add(className);
			}
			if(data) {
				tempElement.innerHTML = data;
			}
			if(attr && element == 'a') {
				tempElement.href = attr;
			} else if(attr && element == 'img') {
				tempElement.src = attr;
			}
			return tempElement;
		}
	
}
# Carousel framework for e-commerce products

This is a reusable library based on a class to create carousel with your products. You need to add "carousel.js" in a script tag to your html head tag and create JSON file with all the information needed. 

### Creation and arguments

To build the carousel you have to call the class ```Carousel``` with arguments like in an example below: 

```
const carousel = new Carousel({data: data, target: myContainer})
```
Where ```data``` should be your JSON, and ```target``` is the element in your DOM that you'd like to inject the carousel into. These are the required arguments for creating this carousel. Except for that you can decide whether you want to display navigation controls, choose the currency and/or error picture, how many elements per slide you wish to display, or if you'd like to attach the link to the product. You can find more details on it below: 

Argument | Required | Type | Default 
------- | ------- | ------- | ------- |
```data``` | yes | JSON | no default 
```target``` | yes | DOM element | no default 
```showNavigation``` | no | boolean | true
```elementsPerSlide``` | no | number | 3
```productURL``` | no | boolean | false 
```currency``` | no | string | "$" 
```errorPhoto```| no | string | "./src/photo-error.png"

You need to specify the required arguments when calling the class, the rest you only specify If you want them to have different value than the default one. 

### JSON file 

Your JSON file should contain "productData" array with objects representing the products. Each product must include following properties: 

* "imageSrc" - which is a string with your image URL 
* "productTitle" - which should contain a string with the product title and optionally the description, whereas If you include description, please add it after dash with spaces around, like in example below: 

  "Eve Lom - Cleanser"

  If you don't add the description after dash, this property will be only treated as product title and will be displayed with capitalized letters. 
* "price" - string with a price 

Other optional properties: 

* "productUrl" - string with a URL link that you would like to attach to the product


### Responsiveness 

You can dynamically adjust elements per slide in order to make the carousel responsive to the viewport. On resizing the window you can call the function below and update elementsPerSlide property giving the new number as argument: 

```
carousel.setElementsPerSlide(2)
```

### Error handling 

If for some reason your image fails to load, the default error image will be displayed. However, If you would like to use your own error image, just add the source string to "errorPhoto" property as an argument: 

```
const carousel = new Carousel({data: data, target: myContainer, errorPhoto: "myErrorPhoto.png"})
```

### Running the code

You can run the carousel above to see the example of what it looks like. To do so you need to clone this repository and run: 

```
npm install
```
And then:

```
npm run dev
```
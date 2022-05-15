# Space NK Developer Exercise

In this exercise we would like you to build a recommendations carousel component purely in Vanilla JavaScript. The carousel should look similar to this [screenshot](recommendations-screenshot.png) using the recommendations [JSON](data/recommendations.json) provided. The carousel component you build should display the product title, image, brand name, price and should link to the website product detail page. Creativity is accepted but do not alter the JSON provided and please refrain from using any JavaScript libraries or frameworks.

### Requirements

- Responsive
- Clean, reusable code

Please fork this repository and commit your changes for review.

Amend this Readme in your forked repo and use your commits to outline the component you have created and the decisions that you have made, including any information required for how to run your component. When complete please raise a Pull Request back into master branch for review.

# Lessons Learned

This was an enjoyable excercise that gave me an opportunity to work on my vanilla JavaScript & CSS skills to create a fluid carousel slider. The project includes product details and links users to the product detail page (when product image is clicked on). I may consider implementing what I have used into my own personal projects.

## Carousel

I initially designed the carousel by using CSS flex to display the products horizontally. Once the styling was satisfactory (more info below) I moved on to JavaScript to apply the functionality of the carousel. I did this by using the width of a product card (received from getBoundingClientRect()), to determine how much to the left or right the carousel should scroll (when an arrow is clicked). For instance, if the user clicks the right arrow (nxtBtn) the carousel will scroll to the left by the exact width size of a product card.

I also included a feature where the carousel will scroll when the user spins their mouse wheel. I felt this would be ideal as clicking the arrow to scroll through numerous products would be time consuming and monotonous.

In future, I would include being able to click on the carousel and drag in order to scroll through the carousel. This would be a good design for mobile devices. Additionally, I would include an infinite loop to the carousel, so when the user reaches the last product, it would take them the the start of the carousel again. This would prevent users from having to scroll to the other side of the carousel to see a particular product.

## Styling

My goal was always to make the styling similiar to what was provided in the screenshot. One way to do this was to make sure there was enough space between each product using margins and padding. Although I was not able to find the font used in the screenshot, I decided to go for a clear font style found on google fonts. Moreover, I used a png file for the arrows, as it allowed me to select from a range of different arrow styles.

When scrolling, the images on the side that were close to the arrows would be cut off harshly which did not look good. For this reason, I opted to add a linear gradient to the arrow backgrounds so the images transition out of the carousel was much smoother looking.

I included some responsivity to the excercise so it would function on smaller devices. This was mainly to reduce the font size so it would appear more mobile friendly.

## Fetch JSON Data

This excercise gave me an opportunity to fine tune my asynchronous JavaScript knowledge by fetching JSON data (fetch API) to be displayed within the carousel. There were a few instances of missing JSON data (price, brand name) which I had to amend by using conditionals to fill in those gaps.

# Space NK Developer Exercise

In this exercise we would like you to build a recommendations carousel component purely in Vanilla JavaScript. The carousel should look similar to this [screenshot](recommendations-screenshot.png) using the recommendations [JSON](data/recommendations.json) provided. The carousel component you build should display the product title, image, brand name, price and should link to the website product detail page. Creativity is accepted but do not alter the JSON provided and please refrain from using any JavaScript libraries or frameworks.

### Requirements

- Responsive
- Clean, reusable code

Please fork this repository and commit your changes for review.

Amend this Readme in your forked repo and use your commits to outline the component you have created and the decisions that you have made, including any information required for how to run your component. When complete please raise a Pull Request back into master branch for review.

Sorry, I created a branch rather than fork - got a bit git happy. This approach was inspired by the Elder Scroll (not the game, it took ages to find the repo because everything was to do with the game - the repo is here: https://github.com/eldercarvalho/elder-carousel). I'm using a class for the elements, and I think that if I weren't getting hassle from Danny, I'd do the same with the carousel_track element. I took liberties with your log as well, I'm afraid, and I use that as a filler should the image not be available.

Further enhancements I'll make would be to have a keyboard shortcut so something like `j` and `k` would move the carousel back and forth (https://stackoverflow.com/questions/6553758/in-vim-why-is-j-used-for-down-and-k-for-up). I'd also like to tweak the accessibility as per https://www.w3.org/WAI/tutorials/carousels/ - that'd have to be a must before production.

There's a lot of Math in there, and it's the main reason this took so long! There'd be issues with recommendations less than two - it works with two, but I think that if there were so few, I'd not have a multiple-element carousel and have a single element one - interestingly, it does work a treat with two - it's a bit boring though.

BTW, is it only me with an issue with the spelling of the word `carousel`? I can't tell you how many times I've had to rename variables!

That was fun! Thanks. I was initially trying a CSS only approach using a fancy grid layout but clocked that transitions were a pain with grids - though that'd also be fun... I might try that anyway, though. It would most certainly involve lots and lots of JS, though.

It's not pretty, and a chunk of the CSS is entered via JS - but there's plenty of opportunity to pretty up the surrounding `carousel` class. Adding paddings to create a gap between elements would be a bit of a ball-ache, though, as the maths would have to take them into account. I primarily looked at the Elder Scroll to understand the CSS - and I do like the transition between the beginning and the end using `setTimeout`'s and data attributes. I'm pretty sure this won't work on IE11, though!

Another thing springs to mind regarding the navigation buttons - they could be classes as well - that would work! They're in a `then` so that we know how many elements are there - but to an extent, they don't need to be really - especially if most of their work would be by referencing the main carousel element - that'd work a treat.

I will clone this and play some more! :-)

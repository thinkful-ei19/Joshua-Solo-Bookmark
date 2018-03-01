'use strict';

function createBookmarkForm(){
  $('#create-bookmark-form').click(function(){
    const bookmarkForm = `
        <form id="bookmark-form">
            <input type="text" name="title-bar" class="js-title-bar" placeholder="Insert Title Here"/>
            <input type="text" name="link-bar" class="js-link-bar" placeholder="Insert HyperLink Here"/>
            <input type="text" name="description-bar" class="js-description-bar" placeholder="Insert Description Here"/>
            <form action="rating">
                <input class="star star-5" id="star-5" type="radio" name="star"/>
                <label class="star star-5" for="star-5">5</label>
                <input class="star star-4" id="star-4" type="radio" name="star"/>
                <label class="star star-4" for="star-4">4</label>
                <input class="star star-3" id="star-3" type="radio" name="star"/>
                <label class="star star-3" for="star-3">3</label>
                <input class="star star-2" id="star-2" type="radio" name="star"/>
                <label class="star star-2" for="star-2">2</label>
                <input class="star star-1" id="star-1" type="radio" name="star"/>
                <label class="star star-1" for="star-1">1</label>
            </form>
            <button type="submit">Submit Bookmark</button>`; 
    console.log(bookmarkForm);
  });
}

createBookmarkForm();
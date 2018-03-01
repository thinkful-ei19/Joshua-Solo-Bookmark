'use strict';
/*global store, api*/
//eslint-disable-next-line no-unused-vars
function generateBookmarkItem(bookmark){   
  return` <li>
    <form id="bookmark-form">
      <input type="text" name="title-bar" class="js-title-bar" placeholder="Insert Title Here"/>
      <input type="text" name="link-bar" class="js-link-bar" placeholder="Insert HyperLink Here"/>
      <input type="text" name="description-bar" class="js-description-bar" placeholder="Insert Description Here"/>
          <form class ="rating-stars" action="rating">
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
          <button type="submit">Submit Bookmark</button>
      </form>
  </li>`;
}

function generateBookmarkString(){
  const bookmarks = store.bookmarks.map((bookmark)=>generateBookmarkItem(bookmark));
  return bookmarks.join('');
}

function render(){
  //generateHTML
  let bookmarks = store.bookmarks;
  console.log(bookmarks);
  const bookmarkItemString = generateBookmarkString(bookmarks);
  $('.bookmark-list').html(bookmarkItemString);
  if(store.addingBookmark===true){
    //show form
    let bookmarkForm = `
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
          <button type="submit">Submit Bookmark</button>
      </form>`;
    return bookmarkForm;
  } else {
    return bookmarkItemString; 
  }
}


function createBookmarkForm(){
  $('.create-bookmark-form').click(function(event){
    event.preventDefault();
    console.log('button clicked');
    const bookmarkForm = 
        `<form id="bookmark-form">
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
            <button type="submit">Submit Bookmark</button>
        </form>`; 
    store.addBookmark(bookmarkForm);
    render();
  });
}
console.log('code running');
createBookmarkForm();
render();
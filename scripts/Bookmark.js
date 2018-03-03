'use strict';
/*globals store, api, $*/
//eslint-disable-next-line no-unused-vars

const bookmark = (function(){

  const generateBookmarkItem= function(bookmark){   
    let information = 'hidden';

    return` <li bookmark-id=${bookmark.id}>
    <div class="bookmark-element"> 
        <div class-bookmark-title">
            <p>${bookmark.title}</p>
            <div class="bookmark-information ${information}">
                <a href="${bookmark.url}" class="bookmark-link">Go To Website</a>
                <p class="bookmark-description">${bookmark.description}</p>
            </div>
          <form class ="rating-stars" action="rating">
              <input value="5" class="star star-5" id="star-5" type="radio" name="star"/>
              <label class="star star-5" for="star-5">5</label>
              <input value="4" class="star star-4" id="star-4" type="radio" name="star"/>
              <label class="star star-4" for="star-4">4</label>
              <input value="3" class="star star-3" id="star-3" type="radio" name="star"/>
              <label class="star star-3" for="star-3">3</label>
              <input value="2" class="star star-2" id="star-2" type="radio" name="star"/>
              <label class="star star-2" for="star-2">2</label>
              <input value="1" class="star star-1" id="star-1" type="radio" name="star"/>
              <label class="star star-1" for="star-1">1</label>
          </form>
      </form>
  </li>`;
  };

  const generateBookmarkForm = function(){
    if(!store.addingBookmark){
      return '<button class="create-bookmark-button">Add Bookmark</button>';
    } else {
      return `<form id="bookmark-form">
      <button class="js-form-submit" type="submit">Submit Bookmark</button>
      <input id="title" type="text" name="title-bar" class="js-title-bar" placeholder="Insert Title Here"/>
      <input id="link" type="text" name="link-bar" class="js-link-bar" placeholder="Insert HyperLink Here"/>
      <input id="description" type="text" name="description-bar" class="js-description-bar" placeholder="Insert Description Here"/>
          <form>
              <input value="5" class="star star-5" id="star-5" type="radio" name="star"/>
              <label class="star star-5" for="star-5">5</label>
              <input value="4" class="star star-4" id="star-4" type="radio" name="star"/>
              <label class="star star-4" for="star-4">4</label>
              <input value="3" class="star star-3" id="star-3" type="radio" name="star"/>
              <label class="star star-3" for="star-3">3</label>
              <input value="2" class="star star-2" id="star-2" type="radio" name="star"/>
              <label class="star star-2" for="star-2">2</label>
              <input value="1" class="star star-1" id="star-1" type="radio" name="star"/>
              <label class="star star-1" for="star-1">1</label>
          </form>
  </form>`;}
  };

  /*function generateBookmarkString(){
  const bookmarks = store.bookmarks.map((bookmark)=>generateBookmarkItem(bookmark));
  return bookmarks.join('');
}*/
  //need a decorate response function

  const render= function(){
    //generateHTML
    let filteredBookmarks = store.bookmarks;
    const html = filteredBookmarks.map(generateBookmarkItem);
    $('.bookmark-list').html(html);
    //console.log('render ran');
    const formHTML = generateBookmarkForm();
    $('.bookmark-form-target').html(formHTML); 
    console.log('render ran');
  };
  
  const handleBookmarkForm = function(){
    console.log('function run');
    $('.bookmark-form-target').on('click', '.create-bookmark-button', function(event){
      event.preventDefault();
      store.toggleBookmarkForm();
      render();
      console.log('button clicked');
    });
  };


  const handleBookmarkFormSubmit= function(){
    $('.bookmark-form-target').on('submit','#bookmark-form' , function(event){
      event.preventDefault();
      console.log('submit button clicked');
      const title = $(event.currentTarget).find('#title').val();
      $(event.currentTarget).find('#title').val('');
      console.log(title);
      const url = $(event.currentTarget).find('#link').val();
      $(event.currentTarget).find('#link').val('');
      const desc = $(event.currentTarget).find('#description').val();
      $(event.currentTarget).find('#description').val('');
      const rating = $('input[name=star]:checked').val();
      $('input[name=star]:checked').val('');
      const data = {title, url, desc, rating};
      store.toggleBookmarkForm();
      $('.bookmark-list').html(data);
      render();
      api.createItem(data, ()=>{
        store.addBookmark(data);
      });
    });
  };

  const bindEventListeners = function(){
    handleBookmarkFormSubmit();
    handleBookmarkForm();

  };
  return{
    generateBookmarkItem,
    render,
    bindEventListeners,
    generateBookmarkForm
  };
}());
console.log('code running');

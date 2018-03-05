'use strict';
/*globals store, api, $*/
//eslint-disable-next-line no-unused-vars

const bookmark = (function(){

  const getIdFromParent = function(bookmark){
    return $(bookmark).parents('li').data('bookmark-id');
  };

  const generateBookmarkItem= function(bookmark){   

    return` <div class="bookmark-element">
    <li data-bookmark-id=${bookmark.id}> 
        <div class="shown-information">
            <p>${bookmark.title}</p>
            <p>Rating: ${bookmark.rating}</p>
        </div>
        <div class="hidden-information-toggle">
          <input type="checkbox" class="toggle-information">Show Information
        </div>
        <div class="hidden-information hidden">
          <a href="${bookmark.url}" class="bookmark-link">Go To Website</a>
          <p class="bookmark-description">${bookmark.desc}</p>
        </div>
        <div class="delete-button">
          <button type="button" class="delete">Delete</button>
        </div>
        <div class="edit-button">
          <button type="button" class="edit">Edit</button>
        </div>
    </li>
  </div>`;
  };

  const generateBookmarkForm = function(){
    if(!store.addingBookmark){
      return '<button class="create-bookmark-button">Add Bookmark</button>';
    } else {
      return `<form id="bookmark-form">
      <button class="js-form-submit" type="submit">Submit Bookmark</button>
      <input id="title" type="text" name="title-bar" class="js-title-bar" placeholder="Insert Title Here"/>
      <input id="link" type="text" name="link-bar" class="js-link-bar" placeholder="Insert HyperLink Here"/>
      <input id="desc" type="text" name="description-bar" class="js-description-bar" placeholder="Insert Description Here"/>
        <div class="rating-body">  
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
        </div>
  </form>`;}
  };

  //need a decorate response function

  const render= function(){
    //generateHTML
    let filteredBookmarks = store.bookmarks;
    console.log(filteredBookmarks);
    if (store.ratingFilter) filteredBookmarks = filteredBookmarks.filter(bookmark => bookmark.rating >= store.ratingFilter); 
    const html = filteredBookmarks.map(generateBookmarkItem);
    $('.bookmark-list').html(html);
    //console.log('render ran');
    const formHTML = generateBookmarkForm();
    $('.bookmark-form-target').html(formHTML); 
    //console.log('render ran');
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
      const desc = $(event.currentTarget).find('#desc').val();
      $(event.currentTarget).find('#desc').val('');
      const rating = $('input[name=star]:checked').val();
      $('input[name=star]:checked').val('');
      const data = {title, url, desc, rating};
      store.toggleBookmarkForm();
      render();
      api.createItem(data, ()=>{
        store.addBookmark(data);
      });
    });
  };

  const expandListElement = function(){
    $('.bookmark-list').on('change', '.toggle-information', function(){
      event.preventDefault();
      console.log('checkbox clicked');
      if ($(this).is(':checked')=== true){
        $(this).parents('li').find('.hidden-information').removeClass('hidden');
        $(this).parents('li').find('hidden-information').removeClass('hidden');
      }
      if ($(this).is(':checked')===false){
        $(this).parents('li').find('.hidden-information').addClass('hidden');
        $(this).parents('li').find('.hidden-information').addClass('hidden');
      }
    });
  };

  const handleDeleteBookmark = function(){
    $('.bookmark-list').on('click', '.delete', function(event){
      console.log('delete button clicked');
      const id = getIdFromParent(event.currentTarget);
      console.log(id);
      api.deleteItem(id, ()=>{
        store.findAndDeleteBookmark(id);
        render();
      });
    });
  };

  const handleRatingFilter = function(){
    $('#rating-dropdown').on('change', function(event){
      event.preventDefault();
      const rating = $(event.currentTarget).val();
      store.toggleRatingFilter(rating);
      render();
    });
  };


  const bindEventListeners = function(){
    handleBookmarkFormSubmit();
    handleBookmarkForm();
    expandListElement();
    handleDeleteBookmark();
    handleRatingFilter();
  };
  return{
    getIdFromParent,
    generateBookmarkItem,
    render,
    bindEventListeners,
    generateBookmarkForm
  };
}());
console.log('code running');

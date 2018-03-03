'use strict';
/*globals store, api, $*/
//eslint-disable-next-line no-unused-vars

const bookmark = (function(){

  const getIdFromParent = function(bookmark){
    return $(bookmark).parents('li').data('bookmark-id');
  };

  const generateBookmarkItem= function(bookmark){   
    let information = 'hidden';
    let informationButtonText = 'Show';

    if(bookmark.expanded){
      information = '';
      informationButtonText = 'Hide';
    }

    return` <div class="bookmark-element">
    <li bookmark-id=${bookmark.id}> 
        <div class="bookmark-title">
            <p>${bookmark.title}</p>
        </div>
        <div class="bookmark-rating">
            <p>${bookmark.rating}</p>
        </div>
        <div class="hidden-information-toggle">
          <input type="checkbox" class="toggle-information">Show Information
        </div>
        <a href="${bookmark.url}" class="bookmark-link hidden">Go To Website</a>
        <p class="bookmark-description hidden">${bookmark.desc}</p>
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

  //need a decorate response function

  const render= function(){
    //generateHTML
    let filteredBookmarks = store.bookmarks;
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
      const desc = $(event.currentTarget).find('#description').val();
      $(event.currentTarget).find('#description').val('');
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
    $('.hidden-information-toggle').on('change', '.toggle-information', function(){
      event.preventDefault();
      console.log('checkbox clicked');
      if ($(this).is(':checked')=== true){
        $(this).parent().siblings('a').removeClass('hidden');
        $(this).parent().siblings('p').removeClass('hidden');
      }
      if ($(this).is(':checked')===false){
        $(this).parent().siblings('a').addClass('hidden');
        $(this).parent().siblings('p').addClass('hidden');
      }
    });
  };

  const bindEventListeners = function(){
    handleBookmarkFormSubmit();
    handleBookmarkForm();
    expandListElement();
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

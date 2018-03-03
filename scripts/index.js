'use strict';
/*globals bookmark, store, api, $*/

function renderPage(){
  bookmark.bindEventListeners();
  bookmark.render();

  api.getItems((bookmarks)=>{
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    bookmark.render();
  });
  console.log('index.js loaded');
}

$(renderPage);
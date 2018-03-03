'use strict';
/*globals bookmark*/
//eslint-next-line-disable no-unused vars//
const store = (function () {

  const toggleBookmarkForm = function(){
    this.addingBookmark = !this.addingBookmark;
  };

  const addBookmark = function (bookmark) {
    this.bookmarks.push(bookmark);
    //toggleBookmarkForm();
  };
  /*use just the guts in findAndUpdate
  const findById = function (id) {
    return this.bookmarks.find(item=>item.id === id);
  };*/

  const findAndDeleteBookmark = function (id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  const toggleRatingFilter = function () {
  };
  return{
    bookmarks:[{
      expanded: false
    }],
    addingBookmark: false,

    toggleBookmarkForm,
    addBookmark,
    //findById,
    findAndDeleteBookmark,
    toggleRatingFilter
  };

}());
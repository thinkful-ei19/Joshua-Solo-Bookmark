'use strict';
//eslint-next-line-disable no-unused vars//
/*global Bookmark*/

const store = (function () {

  const addBookmark = function (item) {
    this.bookmarks.push(item);
  };

  const findById = function (id) {
    return this.bookmarks.find(item=>item.id === id);
  };

  const findAndDeleteBookmark = function (id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
  };

  const toggleRatingFilter = function () {
  };
  return{
    bookmarks:[],
    addingBookmark: false,

    addBookmark,
    findById,
    findAndDeleteBookmark,
    toggleRatingFilter
  };

}());
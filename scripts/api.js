'use strict';
/*globals $*/
//eslint-next-line-disable no-unused-vars//
const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/josh/bookmarks';

  const getItems = function (callback){
    $.getJSON(BASE_URL, callback);
  };

  const createItem = function(data, callback){
    let newBookmark = JSON.stringify(data);
    $.ajax({
      url: BASE_URL,
      method: 'POST',
      contentType: 'application/json',
      data: newBookmark,
      success: callback
    });
  };

  const deleteItem = function(id, callback){
    $.ajax({  
      url: `${BASE_URL}/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      data:'',
      success: callback
    });
  };
  return{
    getItems,
    createItem,
    deleteItem,
  };
}());
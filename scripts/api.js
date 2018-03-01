'use strict';
//eslint-next-line-disable no-unused-vars//
/*global*/

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jos/bookmarks';

  const getItems = function (callback){
    $.getJSON(BASE_URL, callback);
  };

  const createItem = function(name, callback){
    let newItem = JSON.stringify({name});
    $.ajax({
      url: BASE_URL,
      method: 'POST',
      contentType: 'application/json',
      data: newItem,
      success: (callback) => {
        console.log(callback);
      }
    });
  };

  const deleteItem = function(id, callback){
    $.ajax({  
      url: BASE_URL,
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
});
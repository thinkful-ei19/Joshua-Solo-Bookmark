'use strict';
/*globals bookmark, $*/

$(document).ready(function(){
  bookmark.bindEventListeners();
  bookmark.render();
  console.log('index.js loaded');
});
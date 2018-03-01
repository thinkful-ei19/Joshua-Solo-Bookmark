'use strict';
/*global cuid*/
//eslint-disable-next-line no-unused-vars
const Bookmark = (function (){

  const validateName = function(title){
    if(!title) throw new TypeError('Text field must not be empty');
  };
  const create = function (title){
    return{
      id: cuid(),
      title: '',
      link:'',
      description:'',
      rating:'',
      expandedBookmark:false
    };
  };
  return{
    validateName,
    create
  };
}());
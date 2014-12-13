$(document).ready(function(){
  //console.log('ready!');
  $('body').css('display','block')
});
var app = angular.module('books-list-app',['ngAnimate']);

app.controller('books-list-controller',function($scope,$http){  
  var refreshBooks = function(){
  //http://localhost:3000/getbooks
  //https://arcane-forest-5176.herokuapp.com/getbooks
    $http.get('/getbooks').success(function(response){
      $scope.books = response;
      $('.loader').fadeOut('fast');
      //console.log($scope.books);
    }).error(function(response){
      console.log(response);
    });
  };
  refreshBooks();
  $scope.newtitle = 'Title';
  $scope.newauthor = 'Author';
  $scope.newdescription = 'Description';
  //http://localhost:3000/addbooks
  //https://arcane-forest-5176.herokuapp.com/addbooks
  $scope.pushBook = function(){
    $('.loader').fadeIn('fast');
    $http.post('/addbooks',{
      title : $scope.newtitle,
      author : $scope.newauthor,
      description : $scope.newdescription
      }).success(function(response) {
        refreshBooks();
    });
  };
  
  $('input,textarea').focusin(function(){
    if (this.value == 'Title'||this.value == 'Author'||this.value == 'Description'){
      this.value = '';
      $(this).css('color','black');
    }
  }).focusout(function(){
    if (this.value == ''){
      this.value = this.name;
      $(this).css('color','grey');
    }
  });
  
  $('input,textarea').keyup(function(){
    $('input,textarea').each(function(index,element){
      if($(element).val() == $(element).attr('name') || $(element).val() == ''){
        $('button').prop('disabled',true);
        return false;
      }else if(index == $('input,textarea').length - 1){
        $('button').prop('disabled',false);
      }      
    });
  });
     
  $('textarea').keydown(function(){
    if(this.clientHeight < this.scrollHeight){
      foo = ($(this).height() + 26).toString();
      $(this).css('height', foo);
    }
  });  
});



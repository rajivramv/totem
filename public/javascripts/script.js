$(document).ready(function(){
  //console.log('ready!');
  $('body').css('display','block')
});

var app = angular.module('books-list-app',['ngAnimate']);

app.controller('books-list-controller',function($scope,$http){  
  var refreshBooks = function(){
      $http.get('/getbooks').success(function(response){
      $scope.books = response;
      $scope.newtitle = 'Title';
      $scope.newauthor = 'Author';
      $scope.newdescription = 'Description';
      $('.loader').fadeOut('fast');
      $('button').prop('disabled',true);
      $('input,textarea').each(function(index,element){
        $(element).css('color','grey');
      });
      $('textarea').height('52px');
    }).error(function(response){
        console.log(response);
        $('.loader').text('Error fetching books!').addClass('error').fadeOut(5000,'swing',function(){
          $(this).removeClass('error');
          $(this).text('');

        });
    });
  };
  refreshBooks();
  $scope.newtitle = 'Title';
  $scope.newauthor = 'Author';
  $scope.newdescription = 'Description';

  $scope.pushBook = function(){
    $('.loader').fadeIn('fast');
    $http.post('/addbooks',{
      title : $scope.newtitle.replace(/'/g,""),
      author : $scope.newauthor.replace(/'/g,""),
      description : $scope.newdescription.replace(/'/g,"")
      }).success(function(response) {       
          refreshBooks();
    }).error(function(){
      console.log(response);
      $('.loader').text('Error submitting books!').addClass('error').fadeOut(5000,'swing',function(){
        $(this).removeClass('error');
        $(this).text('');
      });
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
  var adjustHeight = function(element){
    if(element.clientHeight < element.scrollHeight){
      foo = element.scrollHeight.toString();
      $(element).css('height', foo);
    }
  };   
  $('textarea').change(function(){
    adjustHeight(this);
  });
  $('textarea').keydown(function(){
    adjustHeight(this);
  });  
});



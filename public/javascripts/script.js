
var app = angular.module('books-list-app',[]);
app.controller('books-list-controller',function($scope,$http){  
  var refreshBooks = function(){
  /*
    $http.get('http://localhost:3000/getbooks').success(function(response){
      $scope.books = response;
      console.log(response);
    });
  */
  
    $http.get('https://arcane-forest-5176.herokuapp.com/getbooks'.success(function(response) {
      $scope.books = response;
      console.log(response);
    });

  };
  refreshBooks();
  $scope.newtitle = 'Title';
  $scope.newauthor = 'Author';
  $scope.newdescription = 'Description';
  //http://localhost:3000/addbooks
  $scope.pushBook = function(){
    $http.post('https://arcane-forest-5176.herokuapp.com/addbooks',{
      title : $scope.newtitle,
      author : $scope.newauthor,
      description : $scope.newdescription
      }).success(function(response) {
        refreshBooks();
    });
  };
});

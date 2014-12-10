function displayBooks($scope,$http){
  $http.get("https://arcane-forest-5176.herokuapp.com/getbooks")
  .success(function(response) {
  $scope.books = response;
    
  //jsonstr =  '[{"title" : "adasdas", "description" : "asdasdas", "author": "asdasdasd"}, {"title" : "fghgfh", "description" : "gfhgfh", "author" : "fghdg"}]'; 
  //obj = JSON.parse(jsonstr);
  //$scope.books = obj;
  //console.log(obj);
  });
}
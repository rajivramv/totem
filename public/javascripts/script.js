function displayBooks($scope,$http){
  $http.get("localhost:3000/getbooks")
  .success(function(response) {
  $scope.books = response;
  console.log(response);
  });
}
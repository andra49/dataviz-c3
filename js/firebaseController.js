angular.module('datavizApp')
.controller("firebaseController", ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  var rating = new Firebase("https://torid-inferno-3292.firebaseio.com/rating");
  var responses = [
  	'Well, that was quite harsh... :(',
  	'Thank you, we will try to improve it next time.',
  	'Thank you, we will try to improve it next time.',
  	'Thank you for your rating!',
  	'Thank you for your rating! You are the best! :)'
  ];

  // download the data into a local object
  $scope.data = $firebaseArray(rating);

  $scope.rating = 5;
  $scope.sent = false;
  $scope.message = "";

  $scope.submitRating = function() {
  	$scope.data.$add($scope.rating);
  	$scope.message = responses[$scope.rating-1];
  	$scope.sent = true;
  }
}])

.directive("starRating", function() {
  return {
    restrict : "EA",
    template : "<ul class='rating' ng-class='{readonly: readonly}'>" +
               "  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
               "    <i class='fa fa-star'></i>" + //&#9733
               "  </li>" +
               "</ul>",
    scope : {
      ratingValue : "=ngModel",
      max : "=?", //optional: default is 5
      onRatingSelected : "&?",
      readonly: "=?"
    },
    link : function(scope, elem, attrs) {
      if (scope.max == undefined) { scope.max = 5; }
      function updateStars() {
        scope.stars = [];
        for (var i = 0; i < scope.max; i++) {
          scope.stars.push({
            filled : i < scope.ratingValue
          });
        }
      };
      scope.toggle = function(index) {
        if (scope.readonly == undefined || scope.readonly == false){
          scope.ratingValue = index + 1;
          scope.onRatingSelected({
            rating: index + 1
          });
        }
      };
      scope.$watch("ratingValue", function(oldVal, newVal) {
        if (newVal) { updateStars(); }
      });
    }
  };
});
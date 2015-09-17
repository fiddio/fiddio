angular.module('fiddio')
.directive('answerList', [ '$http', 'DataPackager', '$timeout', '$rootScope', function($http, DataPackager, $timeout, $rootScope) {
  return {
    restrict: 'E',
    templateUrl: '/templates/answerList.html',
    replace: true,
    link: function(scope, elm, attr) {
      scope.parentId = attr.parentId;
      scope.userId = attr.userId;
      scope.solution = attr.solution;
      scope.userData = $rootScope.userData;
      console.log("scope.userData", scope.userData.getItem('userInfo').id, "scope.userId", scope.userId);

      DataPackager.downloadResponses(scope.parentId)
      .success(function(data, status, headers, config){
        scope.answers = data.responses;
      });

      scope.markAsSolution = function(answerid) {
        if (scope.userData.authenticated && scope.userId == scope.userData.getItem('userInfo').id) {
          $timeout(function() {
            $http({ method: 'POST', url: '/api/response/' + answerid + '/mark' })
            .then(function(response) {
              if (response.data.result) {
                scope.solution = answerid;
              }
            });
          });
        }
      };
    }
  };
}]);

angular.module('fiddio')

.factory('DataPackager', [ '$http', 'Upload', '$timeout', '$rootScope', function($http, Upload, $timeout, $rootScope) {

  var _responseData;

  function uploadResponse(code, editorChanges, mp3Blob, blobLength){

    _responseData = {
      code_changes: editorChanges,
      //mp3Blob: mp3Blob,
      duration: blobLength,
      code: code,
      question_id: $rootScope.$stateParams.questionID
    };

    Upload.upload({
      url: '/api/response',
      method: 'POST',
      //headers: {},
      fields: _responseData,
      file: mp3Blob,
      fileFormDataName: 'response'
    })
    .then( function(res) {
      $timeout( function() {
        $rootScope.$state.go('question', { questionID: $rootScope.$stateParams.questionID});
      });
    }, function(res) {
      console.log('Error!', res);
      //if (res.status > 0) { $rootScope.$scope.errorMsg = res.status + ': ' + res.data; }
    });
  }

  function downloadResponseData(id){
    return _responseData;
    // return $http({method: 'GET', url: '/api/response/'+id});
  }

  function downloadResponses(id){
    // api GET
    return $http({method: 'GET', url: '/api/question/'+id+'/responses'});
  }

  function uploadQuestion(question) {
    return $http({method:'POST', url:'/api/question', data: question});

  }

  return {
    uploadResponse: uploadResponse,
    downloadResponses: downloadResponses,
    downloadResponseData: downloadResponseData,
    uploadQuestion: uploadQuestion
  };
}]);
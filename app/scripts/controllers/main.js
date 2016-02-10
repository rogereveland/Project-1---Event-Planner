'use strict';

/**
 * @ngdoc function
 * @name eventPlannerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eventPlannerApp
 */
angular.module('eventPlannerApp')
  .controller('MainCtrl', function ($scope,$timeout) {
    $scope.matchValid = false;
    $scope.numbersValid = false;
    $scope.downersValid = false;
    $scope.uppersValid = false;
    $scope.lengthValid = false;
    $scope.person = {
      userid : 0
    };
    $scope.events = [];
    $scope.blankEvent = {
      eventName : '',
      eventType : 'Birthday Party',
      eventHost : '',
      eventLocation : '',
      eventStart : '',
      eventEnd : '',
      eventGuests : '',
      eventMessage : '',
      eventOther : '',
      eventID : 0
    };
    $scope.eventDetails = angular.copy($scope.blankEvent);
    $scope.eventDetails.eventID = Math.random();
    var userCheck = localStorage.getItem('userInfo');
    if(userCheck !== null){
        $scope.person = JSON.parse(userCheck);
        angular.element('#eventName').focus();
    } else{
      angular.element('#firstName').focus();
    }

    $scope.processForm = function(){
      angular.element('#thankYouBody').hide();
      angular.element('#signupFormBody').fadeOut();
      $timeout(function(){
        $scope.person.userid = Math.random();
        localStorage.setItem('userInfo',JSON.stringify($scope.person));
        angular.element('#thankYouBody').fadeIn();
      }, 400);


    };

    $scope.checkPassword = function(){
        var pw1 = $scope.person.password;
        var pw2 = $scope.person.passwordConfirm;
        var totalValid = 0;
        var numberCheck = /\d+/;
        var lowerCheck = /[a-z]/;
        var upperCheck = /[A-Z]/;
        if(typeof pw1 !== 'undefined'){
          if(pw1 === pw2){
            angular.element('#pw_match').addClass('text-success');
            $scope.matchValid = true;
            totalValid++;
          } else {
            $scope.matchValid = false;
          }

          if(pw1.match(numberCheck) !== null){
            $scope.numbersValid = true;
            totalValid++;
          } else {
            $scope.numbersValid = false;
          }

          if(pw1.match(lowerCheck) !== null){
            $scope.downersValid = true;
            totalValid++;
          } else {
            $scope.downersValid = false;
          }

          if(pw1.match(upperCheck) !== null){
            $scope.uppersValid = true;
            totalValid++;
          } else {
            $scope.uppersValid = false;
          }

          if(pw1.length >=8 ){
            $scope.lengthValid = true;
          } else {
            $scope.lengthValid = false;
          }

          if(totalValid === 4){
              return true;
          }
        }
        return false;

    };

    $scope.validForm = function(isValid){
      if(isValid && $scope.checkPassword()){
        return true;
      }
      return false;
    };

    $scope.resetLocalStorage = function(){
      localStorage.clear();
      $scope.person = {userid:0};
    };

    $scope.addEvent = function(){
      $scope.eventDetails.eventStart = new Date($scope.eventDetails.eventStart);
      $scope.eventDetails.eventEnd = new Date($scope.eventDetails.eventEnd);
      $scope.eventDetails.eventCreator = $scope.person;
      var newEvent = angular.copy($scope.eventDetails);
      $scope.events.push(newEvent);
      $scope.eventDetails = angular.copy($scope.blankEvent);
      $scope.eventDetails.eventID = Math.random();
      $scope.eventForm.$setPristine();
      $scope.eventForm.$setUntouched();
      localStorage.setItem('events',JSON.stringify($scope.events));

    };

    $scope.loadEvents = function(){
      var eventsCheck = localStorage.getItem('events');
      if(eventsCheck !== null){
          $scope.events = JSON.parse(eventsCheck);
      }
    };

    $scope.logout = function(){
      $scope.person = {};
      $scope.person.userid = 0;
      angular.element('#firstName').focus();

    };
    $scope.loadEvents();

  });

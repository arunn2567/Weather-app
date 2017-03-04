//'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp',['ngRoute','ngResource']);

app.config(function($routeProvider){
  $routeProvider
      .when('/',{
        templateUrl:'pages/home.htm',
        controller:'homeCtrl'
      })
      .when('/forecast',{
        templateUrl:'pages/forecast.htm',
        controller:'forecastCtrl'
      })

})

//Custom Service
app.service('cityService',function(){
  this.city='Mumbai';
})


//Controller
app.controller('homeCtrl',function($scope,cityService){
 $scope.city=cityService.city;
 $scope.$watch('city', function () {
    cityService.city=$scope.city;
  });
});

app.controller('forecastCtrl',function($scope,$resource,cityService){
   $scope.city=cityService.city;
   $scope.api = $resource("http://api.openweathermap.org/data/2.5/forecast/London",
        {callback:"JSON_CALLBACK"},{get:{method:"JSONP"}});
    $scope.whetherResult = $scope.api.get({q: $scope.city, APPID: "8f15cc2ab239cc2ef3a1dc9c2b54c365"});

    $scope.convert= function(degk){
        return Math.round(degk-273.15);
    }
    $scope.convertDate= function(dt){
        return new Date(dt*1000);
    }
});

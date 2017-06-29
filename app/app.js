"use strict";

var app = angular.module("TodoApp", ["ngRoute"])
.constant("firebaseURL","https://demotodo-58cb2.firebaseio.com");



let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  if(AuthFactory.isAuthenticated()){
    console.log("User is authenticated, resolve route promise");
    resolve();
  } else {
    console.log("User is not authenticated, reject route promise");
    reject();
  }
});


app.config(function($routeProvider){
	$routeProvider.
		when('/',{
      templateUrl: 'partials/item-list.html',
      controller: 'ItemListCtrl',
      resolve: {isAuth}
      }).
    when('/items/list',{
			templateUrl: 'partials/item-list.html',
			controller: 'ItemListCtrl',
      resolve: {isAuth}
    	}).
    	when('/items/new', {
      		templateUrl: 'partials/item-new.html',
      		controller: 'ItemNewCtrl',
          resolve: {isAuth}
    	}).
    	when('/items/:itemId', {
      		templateUrl: 'partials/item-details.html',
      		controller: "ItemViewCtrl",
          resolve: {isAuth}
    	}).
      when('/items/:itemId/edit', {
          templateUrl: 'partials/item-new.html',
          controller: "ItemEditCtrl",
          resolve: {isAuth}
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: "LoginCtrl"
      }).
      when('/logout', {
        templateUrl: 'partials/login.html',
        controller: "LoginCtrl"
      }).
    	otherwise('/');
});


app.run(($location) =>{
  let todoRef = new Firebase("https://todo-appz2.firebaseio.com/");

  todoRef.onAuth(authData =>{
    if(!authData){
      $location.path("/login");
    }
  });
});


// app.controller("TodoCtrl", function($scope){
// 	$scope.welcome = "hello";
//   $scope.showListView = true;
//   $scope.newTask = {};
//   $scope.items = [
//     {
//       id: 0,
//       task: "mow the lawn",
//       isCompleted: true,
//       dueDate: "12/5/17",
//       assignedTo: "greg",
//       location: "Zoe's house",
//       urgency: "low",
//       dependencies: "sunshine, clippers, hat, water, headphones"
//     },
//     {
//       id: 1,
//       task: "grade quizzes",
//       isCompleted: false,
//       dueDate: "12/5/15",
//       assignedTo: "Joe",
//       location: "NSS",
//       urgency: "high",
//       dependencies: "wifi, tissues, vodka"
//     },
//     {
//       id: 2,
//       task: "take a nap",
//       isCompleted: false,
//       dueDate: "5/21/16",
//       assignedTo: "zoe",
//       location: "Zoe's house",
//       urgency: "medium",
//       dependencies: "hammock, cat, pillow, blanket"
//     }
//   ];

//   $scope.newItem = function(){
//       console.log("you clicked new Item");
//       $scope.showListView = false;
//   };

//   $scope.allItem = function(){
//     console.log("you clicked all items");
//     $scope.showListView = true;
//   };

//   $scope.addNewItem = function(){
//     $scope.newTask.isCompleted = false;
//     $scope.newTask.id = $scope.items.length;
//     console.log("you added a new item", $scope.newTask);
//     $scope.items.push($scope.newTask);
//     $scope.newTask = {};
//   };
// });

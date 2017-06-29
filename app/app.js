"use strict";

const app = angular.module('TodoApp', ["ngRoute"]);


// console.log("AuthFactory is", AuthFactory);
let isAuth = (AuthFactory) => new Promise ( (resolve, reject) => {
  console.log("AuthFactory is", AuthFactory);
  AuthFactory.isAuthenticated()
  .then( (userExists) => {
    if(userExists){
      console.log("Authenticated, go ahead");
      resolve();
    }else {
      console.log("Authentication reject, GO AWAY");
      reject();
    }
  });
});


app.config( ($routeProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/item-list.html',
    controller: 'ItemListCtrl',
    resolve: {isAuth}
  })
  .when('/login', {
    templateUrl: 'partials/auth.html',
    controller: 'AuthCtrl'
  })
  .when('/item-list', {
    templateUrl: 'partials/item-list.html',
    controller: 'ItemListCtrl',
    showSearch: true,
    resolve: {isAuth}
  })
  .when('/item/new', {
    templateUrl: 'partials/item-form.html',
    controller: 'AddItemCtrl',
    resolve: {isAuth} 
  })
  .when('/item/:itemId', {
    templateUrl: 'partials/item-detail.html',
    controller: 'ItemDetailCtrl',
    resolve: {isAuth}
  })
  .when('/item/:itemId/edit', {
    templateUrl: 'partials/item-form.html',
    controller: 'EditItemCtrl',
    resolve: {isAuth}
  })
  .otherwise('/');

  // $locationProvider.html5Mode(true);
});

app.run(($location, FBCreds) => {
  let creds = FBCreds;
  let authConfig = {
    apiKey: creds.apiKey,
    authDomain: creds.authDomain,
    databaseURL: creds.databaseURL
  };

  firebase.initializeApp(authConfig);
});

// example use of $rootScope
app.run(function($rootScope) {
  $rootScope.showSearch = false;
});
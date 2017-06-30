"use strict";

app.controller('ItemListCtrl', function($scope, DataFactory, $location, AuthFactory, FilterFactory, $rootScope) {
    
    $scope.searchText = FilterFactory;
    $rootScope.showSearch = true;

    let user = AuthFactory.getUser();

    $scope.items = [];

    //automatically runs when controller is loaded
    $scope.getItemList = function(){
        DataFactory.getItemList(user).then( (itemCollection) => {
            console.log("itemCollection from promise", itemCollection);
            $scope.items = itemCollection;
        });
    };

    $scope.itemDelete = function(itemId){
        console.log("itemId", itemId);
        DataFactory.deleteItem(itemId).then( () => {
            DataFactory.getItemList(user).then( (itemCollection) => {
                $scope.items = itemCollection;
            });
        });
    };

    $scope.updateComplete = function(whichOne){
        let tmpObj = {isCompleted:true};
        DataFactory.updateItem(whichOne, tmpObj)
        .then( () => {
            console.log("then updateComplete");
            $scope.getItemList();
        });
  };

  $scope.getItemList();

});
"use strict";

app.controller("ItemListCtrl", function($scope, $location, DataFactory, $rootScope){
    $scope.searchText = SearchTermData;
    $rootScope.showSearch = true;

    let user = AuthFactory.getUser();

    $scope.items = [];

    //automatically runs when controller is loaded
    DataFactory.getItemList(user).then( (itemCollection) => {
        console.log("itemCollection from promise", itemCollection);
        $scope.items = itemCollection;
    });

    $scope.itemDelete = function(itemId){
        console.log("itemId", itemId);
        DataFactory.deleteItem(itemId).then( () => {
            DataFactory.getItemList(user).then( (itemCollection) => {
                $scope.items = itemCollection;
            });
        });
    };

    $scope.inputChange = function(item){
        DataFactory.updateCompletedStatus(item)
            .then(function(response){
                console.log(response);
            });
    };

    $scope.updateComplete = function(whichOne){
        let tmpObj = {isCompleted:true};
        DataFactory.editTask(whichOne, tmpObj)
        .then( () => {
            $scope.getItemList();
        });
  };



});
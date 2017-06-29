"use strict";
app.controller("ItemViewCtrl", function($scope, $routeParams, itemStorage){
    $scope.items = [];
    $scope.selectedItem = {};
    console.log($routeParams.itemId);

    itemStorage.getItemList().then(function(itemCollection){
        console.log("itemCollection from promise", itemCollection);
        $scope.items = itemCollection;

        $scope.selectedItem = $scope.items.filter(function(item){
			return item.id === $routeParams.itemId;
		})[0];
    });
});
"use strict";
app.controller("ItemViewCtrl", function($scope, $routeParams, DataFactory){
    // $scope.items = [];
    // $scope.selectedItem = {};
    console.log($routeParams.itemId);

    //Option 1
    //get all the items and then filter for the specific one
  //   DataFactory.getItemList().then(function(itemCollection){
  //       console.log("itemCollection from promise", itemCollection);
  //       $scope.items = itemCollection;
  //       
  //       $scope.selectedItem = $scope.items.filter(function(item){
		// 	return item.id === $routeParams.itemId;
		// })[0];
  //   });

    //Option 2
    //only get the one item
    $scope.getItem = function() {
    // stuff goes here
        console.log("get the item'");
        DataFactory.getSingleItem($routeParams.itemId)
        .then( (stuff) => {
            $scope.item = stuff;
            $scope.item.id = $routeParams.itemId;
        });
    };

  $scope.getItem();
});
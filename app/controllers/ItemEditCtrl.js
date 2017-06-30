"use strict";
app.controller("ItemEditCtrl", function($scope, $location, $routeParams, DataFactory){
    
    $scope.title = "New Item";
    $scope.submitButtonText = "Edit Item";

    $scope.item = {
    assignedTo: "",
    dependencies: "",
    dueDate: "",
    urgency: "",
    task: "",
    isCompleted: ""
  };

    DataFactory.getSingleItem($routeParams.itemId)
    .then( (stuff) => {
        console.log("stuff", stuff);
        $scope.item = stuff;
        $scope.item.id = $routeParams.itemId;
    });

  $scope.submitTask = function() {
    // stuff goes here
    DataFactory.updateItem($routeParams.itemId, $scope.item)
    .then( (response) => {
        $location.path("/item-list");
    });
    console.log("the task", $scope.item);
    console.log("You clicked the edit button!");
  };
});
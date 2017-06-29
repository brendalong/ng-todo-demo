"use strict";
app.controller("ItemEditCtrl", function($scope, $location, $routeParams, DataFactory){
    
    $scope.item = {
    assignedTo: "",
    dependencies: "",
    dueDate: "",
    urgency: "",
    task: "",
    isCompleted: ""
  };

    DataFactory.getTask($routeParams.itemId)
    .then( (stuff) => {
        $scope.item = stuff;
        $scope.item.id = $routeParams.itemId;
    });

  $scope.submitTask = function() {
    // stuff goes here
    DataFactory.editTask($routeParams.itemId, $scope.item)
    .then( (response) => {
        $location.path("/item-list");
    });
    console.log("task", $scope.item);
    console.log("You clicked the edit button!");
  };
});
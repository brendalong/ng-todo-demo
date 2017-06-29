"use strict";
app.controller("ItemNewCtrl", function($scope, $location, DataFactory){
    $scope.title = "New Item";
    $scope.submitButtonText = "Add New Item";
    $scope.newItem = {
        assignedTo: "",
        dependencies:"",
        dueDate: "",
        isCompleted: false,
        location: "",
        task:"",
        urgency:"",
        uid:""
    };
      
    $scope.addNewItem = function(){
        DataFactory.postNewItem($scope.newItem)
            .then(function successCallback(response) {
                console.log(response);
                $location.url("/item-list");
            });
    };
});
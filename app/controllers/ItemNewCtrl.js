"use strict";
app.controller("ItemNewCtrl", function($scope, $location, DataFactory, AuthFactory, $rootScope){

    let user = AuthFactory.getUser();
    $rootScope.showSearch = false;

    $scope.title = "New Item";
    $scope.submitButtonText = "Add New Item";

    //be sure to add the user and set new item completed to false
    $scope.item = {
        assignedTo: "",
        dependencies:"",
        dueDate: "",
        isCompleted: false,
        location: "",
        task:"",
        urgency:"",
        uid: user
    };
    
    //use the same function name in ItemNewCtrl and ItemEditCtrl
    //allows double use of form
    $scope.submitTask = function(){
        DataFactory.addItem($scope.item)
            .then(function successCallback(response) {
                console.log(response);
                $location.url("/item-list");
            });
    };
});
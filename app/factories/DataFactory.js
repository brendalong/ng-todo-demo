"use strict";
app.factory("DataFactory", function($q, $http, firebaseURL, AuthFactory){
	
	var getItemList = function(){
		var items = [];
        let user = AuthFactory.getUser();
		return $q(function(resolve, reject){
			// $http.get(`${firebaseURL}items.json?orderBy="uid"&equalTo="${user.uid}"`)
			$http.get(`${firebaseURL}.json`)
            
            	.success(function(itemObject){
					var itemCollection = itemObject;
					Object.keys(itemCollection).forEach(function(key){
						itemCollection[key].id=key;
						items.push(itemCollection[key]);
					});
					resolve(items);
				})
				.error(function(error){
					reject(error);
				});
		});
	};

	var deleteItem = function(itemId){
		return $q(function(resolve, reject){
			$http
            	.delete(firebaseURL + "items/" + itemId + ".json")
            	.success(function(objectFromFirebase){
            		resolve(objectFromFirebase);
            	});
		});
	};

	var postNewItem = function(newItem){
        let user = AuthFactory.getUser();
        console.log("user", user);
        return $q(function(resolve, reject) {
            $http.post(
                firebaseURL + "items.json",
                JSON.stringify({
                    assignedTo: newItem.assignedTo,
                    dependencies: newItem.dependencies,
                    dueDate: newItem.dueDate,
                    isCompleted: newItem.isCompleted,
                    location: newItem.location,
                    task: newItem.task,
                    urgency: newItem.urgency,
                    uid: user.uid
                })
            )
            .success(
                function(objectFromFirebase) {
                    resolve(objectFromFirebase);
                }
            );
        });
	};

	var getSingleItem = function(itemId){
		return $q(function(resolve, reject){
			$http.get(firebaseURL + "items/"+ itemId +".json")
				.success(function(itemObject){
					resolve(itemObject);
				})
				.error(function(error){
					reject(error);
				});
		});
	};

	var updateItem = function(itemId, newItem){
        let user = AuthFactory.getUser();
        return $q(function(resolve, reject) {
            $http.put(
                firebaseURL + "items/" + itemId + ".json",
                JSON.stringify({
                    assignedTo: newItem.assignedTo,
                    dependencies: newItem.dependencies,
                    dueDate: newItem.dueDate,
                    isCompleted: newItem.isCompleted,
                    location: newItem.location,
                    task: newItem.task,
                    urgency: newItem.urgency,
                    uid: user.uid
                })
            )
            .success(
                function(objectFromFirebase) {
                    resolve(objectFromFirebase);
                }
            );
        });
	};

	var updateCompletedStatus = function(newItem){
        return $q(function(resolve, reject) {
            $http.put(
                firebaseURL + "items/" + newItem.id + ".json",
                JSON.stringify({
                    assignedTo: newItem.assignedTo,
                    dependencies: newItem.dependencies,
                    dueDate: newItem.dueDate,
                    isCompleted: newItem.isCompleted,
                    location: newItem.location,
                    task: newItem.task,
                    urgency: newItem.urgency
                })
            )
            .success(
                function(objectFromFirebase) {
                    resolve(objectFromFirebase);
                }
            );
        });
	};




	return {updateCompletedStatus, updateItem, getSingleItem, getItemList, deleteItem, postNewItem};

});
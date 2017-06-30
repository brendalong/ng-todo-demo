"use strict";
app.factory("DataFactory", function($q, $http, FBCreds) {

    const getItemList = (user) => {
        let tasks = [];
        console.log("myURL", `${FBCreds.databaseURL}/items.json?orderBy="uid"&equalTo="${user}"`);
        return $q( (resolve, reject) => {
          $http.get(`${FBCreds.databaseURL}/items.json?orderBy="uid"&equalTo="${user}"`)
          .then( (itemObj) => {
            let itemCollection = itemObj.data;
            console.log("itemCollection", itemCollection);
           Object.keys(itemCollection).forEach( (key) => {
              itemCollection[key].id = key;
              tasks.push(itemCollection[key]);
            });
            resolve(tasks);
            })
          .catch( (error) => {
            reject(error);
          });
        });
    };


    const deleteItem = ( itemId ) => {
        return $q ( (resolve, reject) => {
          $http.delete(`${FBCreds.databaseURL}/items/${itemId}.json`)
          .then( (response) => {
            resolve(response);
          })
          .catch( (error) => {
            reject(error);
          });
        });
    };

    const addItem = ( newObj ) => {
      let object = JSON.stringify(newObj);
      return $http.post(`${FBCreds.databaseURL}/items.json`, object)
      .then ( (itemId) => {
        return itemId;
      }, (error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log("error", errorCode, errorMessage);
      });
    };


    const getSingleItem = ( itemId ) => {
        return $q( (resolve, reject) => {
          $http.get(`${FBCreds.databaseURL}/items/${itemId}.json`)
          .then( (itemObj) => {
            resolve(itemObj.data);
          })
          .catch( (error) => {
            reject(error);
          });
        });
    };

    const updateItem = ( itemId, editedObj ) => {
        console.log("updateItem", itemId, editedObj);
        return $q( (resolve, reject) => {
          let newObj = JSON.stringify(editedObj);
          $http.patch(`${FBCreds.databaseURL}/items/${itemId}.json`, newObj)
          .then( (itemObj) => {
            resolve(itemObj);
          })
          .catch( (error) => {
            reject(error);
          });
        });
      };

	return {updateItem, getSingleItem, getItemList, deleteItem, addItem};

});
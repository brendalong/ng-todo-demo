"use strict";

//login, logout, register, loginGoogle, clever conditional, authfactory
app.controller("AuthCtrl", function ($scope, $window, AuthFactory, $location) {

  console.log("Yo, AuthCtrl is loaded");

  $scope.account = {
    email: "",
    password: ""
  };

//change below with $window.location also, remove scocpe from logout
  let logout = () => {
    console.log("logout clicked");
    AuthFactory.logoutUser()
      .then(function () {
        console.log("logged out DONE");
        //no need to redirect since isAuth verifies login and will take care of re-direction
        // $location.href = "#!/";
      }, function (error) {
        console.log("error occured on logout");
      });
  };

  //when first loaded, make sure no one is logged in
  // // console.log("what is this?", AuthFactory.isAuthenticated());
  // if (AuthFactory.isAuthenticated()) 
  //   logout();
  
// console.log("app isAuth", isAuth());
//   if (isAuth()){
//     console.log("app isAuth", isAuth());
//   }

  $scope.register = () => {
    console.log("you clicked register");
    AuthFactory.createUser({
      email: $scope.account.email,
      password: $scope.account.password
    })
      .then((userData) => {
        console.log("UserCtrl newUser:", userData);
        $scope.login();
      }, (error) => {
        console.log("Error creating user:", error);
      });
  };

  $scope.login = () => {
    console.log("you clicked login");
    AuthFactory
      .loginUser($scope.account)
      .then(() => {
        //Option One
        // $location.path("/item-list");
        //need to update the view
        // $scope.$apply();
        //Option TWO
        $window.location.href = "#!/item-list";
      });
  };

  $scope.loginGoogle = () => {
    console.log("you clicked login with Google");
    AuthFactory.authWithProvider()
      .then(function (result) {
        var user = result.user.uid;
        console.log("logged in user:", user);
        //Once logged in, go to another view
        //google takes care of refresh view
        $location.path("/item-list"); //path does not get a #!
        $scope.$apply();
      }).catch(function (error) {
        // Handle the Errors.
        console.log("error with google login", error);
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
});
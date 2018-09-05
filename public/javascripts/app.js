var app = angular.module("myApp", ['ngStorage']);
// import '../stylesheets/style.css';

app.controller("myCtrl", function($scope, $http, $localStorage) {
	var socket = io.connect();

	if ($localStorage.user) {
		$scope.loginForm = false;
	} else {
		$scope.loginForm = true
	}

	var setTime = function(date) {
		var date = new Date(date);
		var dateNow = new Date();
		var hours = date.getHours();
		var hoursNow = dateNow.getHours();

		var minutes = date.getMinutes();
		var minutesNow = dateNow.getMinutes();
    var strTime;
		if (minutes - minutesNow === 0 && hours - hoursNow === 0) {
			strTime = 'Just Now';
		} else {
			var ampm = hours >= 12
				? 'pm'
				: 'am';
			hours = hours % 12;
			hours = hours
				? hours
				: 12; // the hour '0' should be '12'
			minutes = minutes < 10
				? '0' + minutes
				: minutes;
			strTime = hours + ':' + minutes + ' ' + ampm;
		}
    return strTime;
	}

  setTimeout(function(){
    var Posts = $scope.posts.map(function(post) {
      post.time = setTime(post.createdAt);
      return post;
    })
		$scope.$apply(function() {
			$scope.posts = Posts;
		});
  }, 1000);

	socket.on('posts', function(posts) {
		var Posts = posts.map(function(post) {
      post.time = setTime(post.createdAt);
      return post;
    })
		$scope.$apply(function() {
			$scope.posts = Posts;
		});
		console.log('POSTS', $scope)
	})

	// Login Functionality
	$scope.login = function() {
		$localStorage.user = $scope.user.name;
		$localStorage.email = $scope.user.email;
		$scope.user = {}
		$scope.loginForm = false;
	}

	$scope.logout = function() {
		$localStorage.$reset();
		$scope.loginForm = true;
	}
	// ---------------------

	$scope.submitPost = function() {
    var post = {
      name: $localStorage.user,
      email: $localStorage.email,
      post: $scope.post
    }
		socket.emit("submit post", post);
		$scope.post = "";
	};

	// socket.on("chat message", function(msg) {
	// 	var li = document.createElement("li");
	// 	li.appendChild(document.createTextNode(msg));
	// 	document.getElementById("messages").appendChild(li);
	// });
})

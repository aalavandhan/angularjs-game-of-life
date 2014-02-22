angular.module('gameOfLife')

.controller('attemptsController',
	function($scope,$firebase,FIREBASE_URL){
		
		function defineScope(){
			$scope.users = $firebase( new Firebase(FIREBASE_URL) )
		}

		defineScope()
})
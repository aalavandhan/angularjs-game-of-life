angular.module('gameOfLife')

.controller('generationTimerController',
	function($scope,GENERATIONS_IN_GAME){

		function defineScope(){

			$scope.generationsLeft = $scope.generationsInGame = GENERATIONS_IN_GAME

			// Functions
			$scope.startTimer = startTimer
			$scope.stopTimer = stopTimer
			$scope.resetTimer = resetTimer
		}

		var resetTimer = function(){
			$scope.generationsLeft = $scope.generationsInGame
		}

		var startTimer = function(){

			var intervalProcess = function(){
				if($scope.generationsLeft > 0){
					$scope.generationsLeft = $scope.generationsLeft - 1;
					$scope.$apply()
					$scope.startTimer()

					$scope.$emit("GENERATION_SHIFT", "Shift in generation");
				}else{
					$scope.stopTimer()

					$scope.$emit("STOPPED_GENERATION_TIMER", "Stopped generation timer");
				}				
			}

			$scope.startTimer.interval = setTimeout(intervalProcess,10)
		}

		var stopTimer = function(){
			clearTimeout( $scope.startTimer.interval )
		}

		defineScope();


		// Listening for events to start/stop/reset the timer
		$scope.$on("START_GENERATION_TIMER", function(event, message){
			$scope.resetTimer()
  		$scope.startTimer()
  		console.log(message)
 		})

 		$scope.$on("STOP_GENERATION_TIMER", function(event, message){
  		$scope.stopTimer()
  		console.log(message)
 		})

		$scope.$on("STOP_GENERATION_TIMER", function(event, message){
  		$scope.stopTimer()
  		console.log(message)
 		})

})
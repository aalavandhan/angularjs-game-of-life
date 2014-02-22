angular.module('gameOfLife')

.controller('populationTimerController',
function($scope,POPULATION_TIME){

		function defineScope(){

			$scope.timeLeft =  $scope.populationTime = POPULATION_TIME
			
			// Functions
			$scope.startTimer = startTimer
			$scope.stopTimer = stopTimer
			$scope.resetTimer = resetTimer

		}

		var resetTimer = function(){
			$scope.stopTimer()
			$scope.timeLeft =  $scope.populationTime
		}

		var startTimer = function(){

			var intervalProcess = function(){
				if($scope.timeLeft > 0){
					$scope.timeLeft = $scope.timeLeft - 1;
					$scope.$apply()
					$scope.startTimer()
				} else {
					$scope.stopTimer()
					$scope.$emit("STOPPED_POPULATION_TIMER", "Stopped population timer");
				}
			}
			$scope.startTimer.interval = setTimeout(intervalProcess,1000)

		}

		var stopTimer = function(){
			clearTimeout( $scope.startTimer.interval )
		}

		defineScope();

		// Listening for events to start/stop/reset the timer
		$scope.$on("START_POPULATION_TIMER", function(event, message){
   		$scope.resetTimer()
   		$scope.startTimer()
   		console.log(message)
 		})

		$scope.$on("STOP_POPULATION_TIMER", function(event, message){
   		$scope.stopTimer()
   		console.log(message)
 		})

})
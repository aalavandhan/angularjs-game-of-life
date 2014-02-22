angular.module('gameOfLife')

.controller('gameOfLifeController',
	function($scope,DIMENSION_OF_CELL,DIMENSION_OF_CANVAS,
		CELLS_PER_GAME,STRING_GENERATIONS_IN_GAME,GameOfLife,POPULATION_TIME,FIREBASE_URL,
		$statusHandler,$firebase,$window){
	
		function defineScope(){

  		$scope.users = $firebase( new Firebase(FIREBASE_URL) )
  		$scope.afterGameURI = "attempts.php"

			$scope.statusHandler = new $statusHandler()
			$scope.statusHandler.reset()

			$scope.dimensionOfCanvas = DIMENSION_OF_CANVAS
			$scope.dimensionOfCell = DIMENSION_OF_CELL
			$scope.cellsPerGame = CELLS_PER_GAME
			$scope.generationsInGame = STRING_GENERATIONS_IN_GAME
			$scope.populationTime = POPULATION_TIME
			$scope.user = {	name: null, score: 0 }

			$scope.numberOfCells = Math.pow( (DIMENSION_OF_CANVAS / DIMENSION_OF_CELL) , 2 )
			$scope.numberOfCellsInRow = $scope.numberOfCellsInColumn = (DIMENSION_OF_CANVAS / DIMENSION_OF_CELL)

			$scope.primaryPlayer = new GameOfLife($scope.numberOfCellsInRow , $scope.numberOfCellsInColumn)

			// Functions
			$scope.nextStageInGame = nextStageInGame
			$scope.startToPlayGame = startToPlayGame
			$scope.validateMove = validateMove
			$scope.cellsLeft = cellsLeft

			$scope.saveScore = saveScore
		}

		var cellsLeft = function(){
			return ( $scope.cellsPerGame - $scope.primaryPlayer.totalAlive() )
		}

		var validateMove = function(x,y){
			if( $scope.statusHandler.isPopulating() ){
				($scope.cellsLeft() > 0) ?
					$scope.primaryPlayer.toggleLife(x,y) : $scope.primaryPlayer.kill(x,y);
			}
			else if( $scope.statusHandler.isStarting() ){
				$scope.startToPlayGame()		
			}
		}

		var nextStageInGame = function(){
			if ( !$scope.primaryPlayer.iterate() ){
				// STOP TIMER IF NO CELLS LEFT
				$scope.statusHandler.saveScore()
				$scope.$broadcast("STOP_GENERATION_TIMER", "Stopping generation timer");
			}
		}

		var saveScore = function(status){
			if(status != false){
				$scope.users.$add($scope.user)
			}
			$scope.startToPlayGame()
		}

		var startToPlayGame = function(){
			if( $scope.statusHandler.isStarting() ){
				$scope.statusHandler.populate()
				$scope.$broadcast("START_POPULATION_TIMER", "Starting population timer");
			}
			else if( $scope.statusHandler.isPopulating() ){
				$scope.statusHandler.startGame()
				$scope.$broadcast("START_GENERATION_TIMER", "Starting generation timer");
			}
			else if( $scope.statusHandler.isProgressing() ){
				$scope.statusHandler.saveScore()
				$scope.user.score = $scope.primaryPlayer.totalAlive()
			}
			else if( $scope.statusHandler.isSavingScore() ){
				$scope.statusHandler.endGame()
				$window.location.href = $scope.afterGameURI
			}
		}

		defineScope()

		// Listening to timer events
		$scope.$on("STOPPED_POPULATION_TIMER", function(event, message){
			// Population Done			
			$scope.startToPlayGame()
			$scope.$apply()
   		console.log(message)
 		})

 		$scope.$on("STOPPED_GENERATION_TIMER", function(event, message){
			// Generation Done
			$scope.startToPlayGame()
			$scope.$apply()
   		console.log(message)
 		})

		$scope.$on("GENERATION_SHIFT", function(event, message){
			// Generation SHIFT
			$scope.nextStageInGame()
			$scope.$apply()
   		console.log(message)
 		})

})
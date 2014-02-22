angular.module('gameOfLife')

.factory('$statusHandler',function(){
	function Handler(){

		var instance = {}

		instance.states =
				[
					{ state:0, message: "Yet To Start" },
					{ state:1, message: "Populating Civilization" },
					{ state:2, message: "Generations in Progress" },
					{ state:3, message: "Saving Score" },
					{ state:4, message: "Game over" },
				];

		instance.isStarting = function(){
			return instance.currentState == 0
		}

		instance.isPopulating = function(){
			return instance.currentState == 1
		}

		instance.isProgressing = function(){
			return instance.currentState == 2
		}

		instance.isSavingScore = function(){
			return instance.currentState == 3
		}

		instance.isEnding = function(){
			return instance.currentState == 4
		}

		instance.reset = function(){
			instance.currentState = 0
		}

		instance.populate = function(){
			instance.currentState = 1
		}

		instance.startGame = function(){
			instance.currentState = 2
		}

		instance.saveScore = function(){
			instance.currentState = 3
		}

		instance.endGame = function(){
			instance.currentState = 4
		}

		instance.message = function(){
			return instance.states[instance.currentState].message
		};

		return instance;

	}

	return Handler
})
angular.module('gameOfLife')

.factory('GameOfLife',function(){

	function GameOfLife(numberOfCellsInRow,numberOfCellsInColumn){

		var canvas = {}

		canvas.cell = new Array()
		canvas.obsoleteCell = new Array()

		canvas.bounds = numberOfCellsInRow || numberOfCellsInColumn

		canvas.totalCells = Math.pow(canvas.bounds,2)

		var makeArray = function(limit,value){
			var array = []
			for(i=0; i<limit; i++)
				array.push(value)
			return array
		}

		var cloneArray = function(array){
			var resultArray = new Array()
			resultArray = _.map(array,function(value){
				return value.slice(0)
			}).slice(0)
			return resultArray
		}

		canvas.initialize = function(){
			_(numberOfCellsInColumn).times(function(){
				canvas.cell.push( makeArray(numberOfCellsInRow,false)	)
			})
			canvas.obsoleteCell = cloneArray(canvas.cell)
		}

		canvas.dump = function(dumpData){
			canvas.cell = dumpData
		}

		canvas.isAlive = function(x,y){
			if(canvas.cell[x])
			return canvas.cell[x][y]
		}

		canvas.kill = function(x,y){
			if(canvas.cell[x])
				canvas.cell[x][y] = false
		}

		canvas.giveLife = function(x,y){
			if(canvas.cell[x])
			canvas.cell[x][y] = true
		}

		canvas.toggleLife = function(x,y){
			if(canvas.cell[x])
			canvas.cell[x][y] = !canvas.cell[x][y]
		}

		canvas.neighbours = function(x,y){
			var result = new Array()
			for(i=-1; i<2; i++)
				for(j=-1; j<2; j++)
					if( ( x+i< canvas.bounds  && y+j< canvas.bounds && x+i>= 0 && y+j>=0 ) && !(i==0 && j==0) )
						if(canvas.obsoleteCell[x+i])
							result.push( canvas.obsoleteCell[x+i][y+j] )
						else
							result.push( undefined )
			return result
		}

		canvas.numberOfLivingNeighbours = function(x,y){
			return _.filter(canvas.neighbours(x,y),function(val){
				return val == true
			}).length
		}

		canvas.generationShift = function(x,y){
			numberOfLivingNeighbours = canvas.numberOfLivingNeighbours(x,y)			
			if(numberOfLivingNeighbours < 2 || numberOfLivingNeighbours > 3)
				canvas.kill(x,y,canvas.name)
			else if ( numberOfLivingNeighbours == 3 || (numberOfLivingNeighbours == 2 && canvas.isAlive(x,y) == true) )
				canvas.giveLife(x,y,canvas.name)
		}

		canvas.totalAlive = function(){
			return _.countBy( _.flatten(canvas.cell) , function(status){
				return status == true
			})['true'] || 0
		}

		canvas.iterate = function(){
			canvas.obsoleteCell = cloneArray(canvas.cell)
			for(var i = 0; i < canvas.bounds; i++){
				for(var j = 0; j < canvas.bounds; j++){
					canvas.generationShift(i,j)
				}
			}
			return (canvas.totalAlive() > 0)
		};

		// Initializers
		(function(){
			canvas.initialize()
		}())

		return canvas
	}
	return GameOfLife
})
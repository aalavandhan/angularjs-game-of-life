angular.module('gameOfLife', ["firebase"])

.constant('DIMENSION_OF_CELL',20)

.constant('DIMENSION_OF_CANVAS',500)

.constant('CELLS_PER_GAME',100)

.constant('POPULATION_TIME',35)

.constant('GENERATIONS_IN_GAME',1000)

.constant('STRING_GENERATIONS_IN_GAME',"thousand")

.constant('FIREBASE_URL',"https://nithin-game-of-life.firebaseIO.com/users")
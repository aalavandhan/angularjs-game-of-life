<?php include 'head.php' ?>
<div class="row" data-ng-controller="gameOfLifeController">
	<div class="col-xs-6">

		<table class="game-of-life">
			<tr ng-repeat=" (rowNumber,row) in primaryPlayer.cell ">
        <td ng-repeat=" (columnNumber,cell) in row track by $index "
            ng-click=" validateMove(rowNumber,columnNumber) "
            ng-class=" primaryPlayer.cell[rowNumber][columnNumber] ? 'alive' : '' ">
        </td>
			</tr>
		</table>
    <hr />
    <button class="btn btn-block btn-primary" 
            ng-click="startToPlayGame()"
            ng-disabled=" !statusHandler.isStarting() ">
            {{ statusHandler.isStarting() ? 'Start Game' : 'Game In Progress' }}
    </button>
	</div>
  <div class="col-xs-6">
    <h3>Rules</h3>
    <hr/>
    <p>
      The aim of the game is to build a civilization with the <b>most number of cells</b> and top 
      the leader board. Each player will be given a maximum of <b>{{cellsPerGame}} cells</b> which he can place
      in any location as he pleases, but the player gets <b>only {{populationTime}} seconds</b> to do so.
      <br/><br/>
      After this period, the colony evolves based on the constraints imposed by the <a href="http://en.wikipedia.org/wiki/Conway's_Game_of_Life">'Game of Life'</a>. At the end of <b>{{generationsInGame}}</b> generations the <b>number of living cells</b> is considered to be the player's score.
    </p>

    <hr/>
    <table class="table table-striped table-hover">
      <tr>
        <th>Game Status</th>
        <td>
          <i ng-class="statusHandler.isPopulating() || statusHandler.isProgressing() ? 'text-success' : '' ">
            {{ statusHandler.message() }}
          </i>
        </td>
      </tr>
      <tr>
        <th>Cells Alive</th>
        <td>{{ primaryPlayer.totalAlive() }}</td>
      </tr>
      <tr>
        <th>Total</th>
        <td>{{numberOfCells}}</td>
      </tr>
    </table>

    <div ng-show="statusHandler.isPopulating()">
      You can Choose {{ cellsLeft() }} more cells.
    </div>

    <div ng-show="statusHandler.isPopulating()" data-ng-controller="populationTimerController">
      Time Left {{ timeLeft }}
    </div>

    <div ng-show="statusHandler.isProgressing()" data-ng-controller="generationTimerController">
      Generations Left {{ generationsLeft }}
    </div>

  </div>


  <div class="modal angular-modal" id="saveScore" ng-show="statusHandler.isSavingScore()">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" 
                  class="close" 
                  aria-hidden="true"
                  ng-click="saveScore(false)"
          >
            &times;
          </button>
          <h4 class="modal-title">Congrats!</h4>
        </div>
        <div class="modal-body">
          <p>At the end of {{generationsInGame}} generations, your score is {{user.score}}.</p>
          <div class="form-inline">
            <input type="text" 
                    placeholder="Your name"  
                    class="form-control" 
                    ng-model="user.name"
            />
            to save in the leader board
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" ng-click="saveScore()">Save</button>
        </div>
      </div>
    </div>
  </div>

</div>
<?php include 'foot.php' ?>
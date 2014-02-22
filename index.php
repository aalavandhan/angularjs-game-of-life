<?php include 'head.php' ?>
  <div class="row">
    <h3>Life and Beyond</h3>
    <hr/>
  </div>
  <div class="row">
    <div class="col-xs-6">      
      <p>Ever heard of the game of life challange? Well, It involves building a working version 
        of <a href="http://en.wikipedia.org/wiki/Conway's_Game_of_Life">John Convoy's game of life</a> 
        in any programming language in under 45 minutes. Though I fell way short of the 45 minute mark,
        I did manage to make a working version of it.</p>
      <p>Quoting Sheldon Cooper <i>"Quantum physics makes me so happy. It's like looking at the universe naked."</i>
        well understanding the game of life kinda brings up a similar feeling.</p>
      <p>So what's this game of life? Like the name suggests the game of life is not a mere game. <b>There 
        are no players, no winners or loosers only the game.</b> There is just an initial configration and rules which
        govern the system.</p>
      <p>So what are the rules?</p>
      <ul>
        <li>Any live cell with fewer than two live neighbours <b>dies</b>, as if caused by under-population.</li>
        <li>Any live cell with two or three live neighbours <b>lives</b> on to the next generation.</li>
        <li>Any live cell with more than three live neighbours <b>dies</b>, as if by overcrowding.</li>
        <li>Any dead cell with exactly three live neighbours becomes a <b>live cell</b>, as if by reproduction.</li>
      </ul>
      <p>Simple enough right? Create a matrix of (n*n) cells, impose these constraints and watch the system
        progress form one generation to another. <b>The results of this simple experiment is mindblowing.</b>
        Try playing around with the initial configration of the system and observe the diverse patterns
        which are produced by minute changes to the initial configration.</p>
    </div>
    <div class="col-xs-6">
      <p>In essence the game of life demonstrates how complex patterns and behaviors can emerge from simple
        rules imposed on a system. The infinite diversity of nature can be explained by this very simple idea.</p>
      <p>Everything form the <b>Big bang</b> to <b>Abiogenesis</b> are examples of systems with a fixed initial configration
        and rules governing the interaction of the various elements in the system, with each other. The
        results of both these phenomenon is the world as we know it today.</p>
      <p>Propability suggests that in almost all situations, systems endup with stable patterns. Once
        a system reaches such a stable state, it remains stable forever if not acted upon by an agent form outside
        the system. This stable state may not necessarily be static. With this observation and my understanding 
        of string theory I'd say that it's possible that even our universe is in such a state and will 
        remain so for ever untill acted upon by another universe governed by laws that control a system 
        of universes.</p>
      <p>It's also conceivable to look at these elements in a system as individual subsystems which have 
        numerous elements within them, and any interaction between two such subsystems would
        result in changes in elements within each subsystem as well.</p>
      <p>Thus everything from quarks to quasars can be seens in such a light.</p>
      <hr/>
      <p>Well the most amusing part of the theory is that a half baked computer engineer can claim to
        understand the universe just after writing a few lines of code :)</p>
    </div>
  </div>
  <hr/>
  <div class="row">
    <div class="col-xs-12">
      <p>There are some facinating patterns that arise from this experiment. 
        <a href="http://en.wikipedia.org/wiki/Conway's_Game_of_Life#Examples_of_patterns">These</a>
         are a few you should try out. One such intersting pattern is depicted below. It's called
         <a href="http://en.wikipedia.org/wiki/Gun_(cellular_automaton)">Gosper Glider Gun</a> pattern.
         Originally Conway thought that no pattern could ever grow indefinitely, he offered a 50$ prize
         for a person who could disprove his assumption. A team form MIT did exactly that and came up with
         the gosper glider gun which is the smallest possible pattern which can grow indefinitely.
       </p>
       <p>Feel free to play around with it. Also try out the <a href="home.php">single player game</a> I made based on the game 
        of life. Try to top the <a href="attempts.php">attempts.</a></p>
    </div>
  </div>
  <div class="row" data-ng-controller="demoController">
    <div class="col-xs-12">
      <table class="game-of-life">
        <tr ng-repeat=" (rowNumber,row) in demoGame.cell ">
          <td ng-repeat=" (columnNumber,cell) in row track by $index "
              ng-click=" demoGame.toggleLife(rowNumber,columnNumber) "
              ng-class=" demoGame.cell[rowNumber][columnNumber] ? 'alive' : '' ">
          </td>
        </tr>
      </table>
      <p>
        <a href="http://en.wikipedia.org/wiki/Gun_(cellular_automaton)">Gosper Glider Gun</a> Pattern
      </p>

      <button class="btn btn-danger" ng-disabled="status == 1" ng-click="stopGame()">Stop</button>
      <button class="btn btn-primary" ng-disabled="status == 0" ng-click="startGame()">Start</button>
      <button class="btn btn-info" ng-disabled="status == 0" ng-click="resetGame()">Reset</button>

    </div>
  </div>
<?php include 'foot.php' ?>
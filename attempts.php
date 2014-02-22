<?php include 'head.php' ?>
	<div class="row" data-ng-controller="attemptsController">
	  <div class="col-xs-6 col-xs-offset-3">
	    <h3 class="center">Attempts</h3>
	    <hr/>
	    <input class="form-control" placeholder="Search by name" ng-model="query"/>
	    <hr/>
	    <table class="table table-striped table-hover">
	    	<thead>
	    		<tr>
	    			<th></th>
	    			<th>Name</th>
	    			<th>Score</th>
	    		</tr>
	    	</thead>
	    	<tbody>
	    		<tr ng-repeat="user in users | orderByPriority | filter:query | orderBy:'score':true ">
	    			<td>{{ $index+1 }}</td>
	    			<td>{{ user.name }}</td>
	    			<td>{{ user.score }}</td>
	    		</tr>
	    	</tbody>
	    </table>
	  </div>
	</div>
<?php include 'foot.php' ?>
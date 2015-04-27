var datavizApp = angular.module('datavizApp', []);

// create the controller and inject Angular's $scope
datavizApp.controller('mainController', function($scope, $http) {
	$scope.chart = null;
	$scope.dataset = [];
	$scope.parameter = [];
	$scope.parameterColumn = [];
	$scope.selected = 0;
	$scope.dataHeader = 0;

    // create a message to display in our view
    $scope.initChart = function() {
	    $scope.chart = c3.generate({
		    data: {
		        x: 'x',
				url: $scope.dataset[0].filename,
		        axes: {
		        	PeopleOpinion: 'y2',
		        	FutureOpinion: 'y2'
		        }
		    },
		    axis: {
		        x: {
		            type: 'timeseries',
		            tick: {
		                format: '%Y'
		            }
		        },
		        y: {
		        	label: {
		        	  	text: 'Percent (%)',
		          		position: 'outer-middle'
		       		}
		      	},
		      	y2: {
		      		show: true,
		      		label: {
		        	  	text: 'Percent of People (%)',
		          		position: 'outer-middle'
		       		}
		      	}
		    },
		    size: {
		        height: 480
		    },
		    point: {
		        show: false
		    },
		    grid: {
		        x: {
		            lines: $scope.dataset[0].timeline
		        }
		    },
		    regions: [
		        {axis: 'y', start: -100, end: 0, class: 'negative-percentage'},
		        {axis: 'y', start: 0, class: 'positive-percentage'}
		    ],
		    tooltip: {
		        grouped: false,
		        format: {
		            title: d3.time.format('%Y'),
		            value: function(d) { return d + "%"; }
		        }
		    }
		});
	}

	$scope.loadChart = function(id) {
		// get all parameters to remove
		var remove = [];
		for (var i = 0; i < $scope.parameterColumn[0].column.length; i++) {
			remove.push($scope.parameterColumn[0].column[i][0]);
		};
		console.log(remove);

		$scope.chart.load({
			url: $scope.dataset[id].filename,
			unload: remove
		});
		$scope.chart.xgrids($scope.dataset[id].timeline);
		enableSelection(id, true);
		$scope.selected = id;
	}

	$scope.loadParameter = function(id) {
		$scope.chart.load({
			columns: $scope.parameterColumn[id].column,
			unload: ['GDP Growth', 'Unemployment', 'Inflation', 'PeopleOpinion', 'FutureOpinion']
		});
		$scope.chart.xgrids([]);
		enableSelection(id, false);
	}

	$scope.initData = function() {
		$http.get("metadata.json")
    		.success(function(response) {
    			$scope.dataset = response;
    			$scope.initChart();
    			$scope.analyzeParameter(0);
    		})
    		.error(function(response) {
    			console.log("Metadata file not found");
    		});
	}

	$scope.analyzeParameter = function(id) {
		if (id < $scope.dataset.length) {
			$http.get($scope.dataset[id].filename)
				.success(function(response) {
					$scope.parameter.push({name: $scope.dataset[id].name});
					// parse csv data
					var dataLines = response.split(/\r\n|\n/);
					var headers = dataLines[0].split(',');

					$scope.parameter[id].header = headers;
					$scope.dataHeader = headers;

					var lines = [];

					for (var i = 1; i < dataLines.length; i++) {
						var data = dataLines[i].split(',');
						if (data.length == headers.length) {
							lines.push(data);
						}
					};

					$scope.parameter[id].column = lines;
					//console.log($scope.parameter);

					$scope.analyzeParameter(id+1);

				})
				.error(function(response) {
					console.log("Error when analyzing data");
				});
		} else {
			$scope.parameterColumn = [];
			for (var i = 0; i < $scope.dataHeader.length; i++) { // parameters
				$scope.parameterColumn.push({name: $scope.dataHeader[i], class: null});
				var column = [];
				for (var j = 0; j < $scope.parameter.length; j++) { //countries
					column.push([$scope.parameter[j].name]);
					for (var k = 0; k < $scope.parameter[j].column.length; k++) {
						column[j].push($scope.parameter[j].column[k][i]);
					}
				}
				$scope.parameterColumn[i].column = column;
			}
			// remove date parameter
			$scope.parameterColumn.splice(0, 1);
			console.log($scope.parameterColumn);
		}
	}

	var enableSelection = function(id, data) {
		if (data) {
			for (var i = 0; i < $scope.dataset.length; i++) {
				if (i == id) {
					$scope.dataset[i].class = 'active';
				} else {
					$scope.dataset[i].class = null;
				}
			}
			for (var i = 0; i < $scope.parameterColumn.length; i++) {
				$scope.parameterColumn[i].class = null;
			}
		} else {
			for (var i = 0; i < $scope.parameterColumn.length; i++) {
				if (i == id) {
					$scope.parameterColumn[i].class = 'active';
				} else {
					$scope.parameterColumn[i].class = null;
				}
			}
			for (var i = 0; i < $scope.dataset.length; i++) {
				$scope.dataset[i].class = null;
			}
		}
	}
});
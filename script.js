var datavizApp = angular.module('datavizApp', []);

// create the controller and inject Angular's $scope
datavizApp.controller('mainController', function($scope, $http) {
	$scope.chart = null;
	$scope.dataset = [];
	$scope.selected = 0;

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
		$scope.chart.load({
			url: $scope.dataset[id].filename
		});
		$scope.chart.xgrids($scope.dataset[id].timeline);
		for (var i = 0; i < $scope.dataset.length; i++) {
			if (i == id) {
				$scope.dataset[i].class = 'active';
			} else {
				$scope.dataset[i].class = null;
			}
		};
		$scope.selected = id;
	}

	$scope.initData = function() {
		$http.get("metadata.json")
    		.success(function(response) {
    			$scope.dataset = response;
    			$scope.initChart();
    		});
    		.error(function(response) {
    			console.log("Metadata file not found");
    		});
	}
});
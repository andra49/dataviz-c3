// var chart = c3.generate({
//     data: {
//         url: 'dataset.csv',	
//         xs: {
//         	Asia: 'asia_mcd',
//         	SouthAmerica: 'sthAm_mcd',
//         	Africa: 'africa_mcd',
//         	Europe: 'europe_mcd',
//         	UnitedStates: 'us_mcd',
//         	Australia: 'aus_mcd'
//         },
//         type: 'scatter'
//     },
//     axis: {
//         x: {
//             label: 'McDonalds Price',
//             tick: {
//             	format: d3.format("$,"),
//                 fit: false
//             }
//         },
//         y: {
//             label: 'Local Meal Price',
// 	        tick: {
// 	          format: d3.format("$,") // ADD
// 	        }
//         }
//     },
//     zoom: {
//         enabled: true
//     },
//     point: {
//     	r: 5
//     },
//     legend: {
// 	  	hide: 'normal'
// 	}
// });

// setTimeout(function () {
//     chart.load({
//         xs: {
//         	normal: 'normal_x'
//         },
//         columns: [
//     		['normal', 3, 9],
//     		['normal_x', 3, 9]
//     	],
//         types: {
//         	normal: 'line'
//         }
//     });
// }, 1000);
var chart = c3.generate({
    data: {
        x: 'x',
//        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
        columns: [
            ['x', '2007-01-01', '2008-01-01', '2009-01-01', '2010-01-01', '2011-01-01', '2012-01-01', '2013-01-01'],
            ['GDP Growth', 1.8, -0.3, -2.8, 2.5, 1.6, 2.3, 2.2],
            ['Inflation', 2.9, 3.8, -0.4, 1.6, 3.2, 2.1, 1.5],
            ['Interest Rate', 5.2, 3.1, 2.4, 2.0, 1.2, 1.4, 1.7],
            ['Unemployment', 4.7, 5.9, 9.4, 9.7, 9.0, 8.2, 7.4],
            ['PeopleOpinion', 50, 20, 17, 24, 18, 31, 43],
            ['FutureOpinion', null, 24, 49, 46, 32, 42, 34]
        ],
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
            lines: [
            	{value: '2007-08-01', class: 'timeline', text: 'Start of liquidity crisis'},
            	{value: '2008-09-01', class: 'timeline', text: 'Lehman Brother collapses'},
            	{value: '2009-02-01', class: 'timeline', text: 'Recovery Act enacted'},
            	{value: '2010-09-01', class: 'timeline', text: 'Small Business Job Act enacted'}
            ]
        }
    },
    regions: [
    	{axis: 'x', start: '2007-11-01', end: '2009-04-10'},
        {axis: 'y', start: -100, end: 0, class: 'negative-percentage'},
        {axis: 'y', start: 0, class: 'positive-percentage'}
    ],
    tooltip: {
        grouped: false, // Default true
        format: {
            title: d3.time.format('%Y'),
            value: function(d) { return d + "%"; }
//            value: d3.format(',') // apply this format to both y and y2
        }
    }
});
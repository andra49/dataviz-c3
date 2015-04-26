var chart = c3.generate({
    data: {
        x: 'x',
		url: 'japan.csv',
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
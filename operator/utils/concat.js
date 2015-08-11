var XML3D = XML3D || {};
var Xflow = Xflow || {};


(function() {


Xflow.registerOperator("xflow.concat", {
    outputs: [
		{type: 'float', name: 'result', customAlloc: true}
	],
	
    params:  [
		{type: 'float', source: 'array0', array: true},
		{type: 'float', source: 'array1', array: true}
    ],
	
	alloc: function(sizes, array0, array1) {
		sizes['result'] = array0.length + array1.length;
	},
	
    evaluate: function(result, array0, array1) {
		var off = 0;
		
		for (var i = 0; i < array0.length; i++)
			result[off++] = array0[i];

		for (var i = 0; i < array1.length; i++)
			result[off++] = array1[i];
    }
});


})();

var XML3D = XML3D || {};
var Xflow = Xflow || {};


(function() {


Xflow.registerOperator("xflow.vec2", {
    outputs: [
		{type: 'float2', name: 'result'}
	],
	
    params:  [
		{type: 'float', source: 'comp0'},
		{type: 'float', source: 'comp1'}
    ],
	
    evaluate_core: function(result, comp0, comp1){
        result[0] = comp0[0];
        result[1] = comp1[0];
    }
});


})();

var XML3D = XML3D || {};
var Xflow = Xflow || {};


(function() {


Xflow.registerOperator("xflow.vec3", {
    outputs: [
		{type: 'float3', name: 'result'}
	],
	
    params:  [
		{type: 'float', source: 'comp0'},
		{type: 'float', source: 'comp1'},
		{type: 'float', source: 'comp2'}
    ],
	
    evaluate_core: function(result, comp0, comp1, comp2){
        result[0] = comp0[0];
        result[1] = comp1[0];
        result[2] = comp2[0];
    }
});


})();

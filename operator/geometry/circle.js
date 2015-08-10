var XML3D = XML3D || {};
var Xflow = Xflow || {};


(function() {


Xflow.registerOperator("xflow.circle", {
    outputs: [
		{type: 'float3', name: 'position', customAlloc: true},
		{type: 'float3', name: 'normal', customAlloc: true}
	],
	
    params:  [
		{type: 'int', source: 'segments', array: true},
		{type: 'float', source: 'radius', array: true},
		{type: 'float2', source: 'origin', array: true},
		{type: 'float', source: 'phi', array: true}
    ],
	
    alloc: function(sizes, segments, radius, origin, phi)
    {
		var vertices = segments[0] + 1;
		
		sizes['position'] = vertices;
		sizes['normal'] = vertices;
		
		console.log(sizes);
	},
	
    evaluate: function(position, normal, segments, radius, origin, phi)
	{
		// var x, y;
		var vertices = position.length / 3;
		var segments = segments[0];
		var radius = radius[0];
		// var i = 0, j = 0;

		var phiStart = 2*Math.PI * phi[0];
		var phiLength = 2*Math.PI * (phi[1] - phi[0]);
		
		for (var i = 0; i <= segments; i++) {

			var u = i / segments;

			var sinPhi = Math.sin( phiStart + u * phiLength );
			var cosPhi = Math.cos( phiStart + u * phiLength );
			
			position[3*i  ] = origin[0] + radius*cosPhi;
			position[3*i+1] = origin[1] + radius*sinPhi;
			position[3*i+2] = 0;
			
			normal[3*i  ] = cosPhi;
			normal[3*i+1] = sinPhi;
			normal[3*i+2] = 0;
		}

		// console.log(position);

        return true;
    }
});


})();

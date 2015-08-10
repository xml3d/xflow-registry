var XML3D = XML3D || {};
var Xflow = Xflow || {};


(function() {


Xflow.registerOperator("xflow.lathe", {
    outputs: [
		{type: 'float3', name: 'position', customAlloc: true},
		{type: 'float3', name: 'normal', customAlloc: true},
		{type: 'int', name: 'index', customAlloc: true}
	],
	
    params:  [
		{type: 'float3', source: 'points', array: true},
		{type: 'float3', source: 'normal', array: true},
		{type: 'int', source: 'segments', array: true},
		{type: 'float', source: 'phi', array: true}
    ],
	
    alloc: function(sizes, points, normal, segments, phi)
    {
		var segments = segments[0];
		
		// TODO: handle points on rotation axis by omitting cloning and generate single triangles
		
		var vertices = points.length * (segments + 1);
		
		sizes['position'] = vertices;
		sizes['normal'] = vertices;
		
		var triangles = 2*segments*(points.length - 1);
		// if (theta[0] === 0) triangles -= widthSegments;
		// if (theta[1] === 1) triangles -= widthSegments;
		sizes['index'] = 3*triangles;

		console.log(sizes);
	},
	
    evaluate: function(out_position, out_normal, out_index, points, normal, segments, phi)
	{
		var segments = segments[0];
		var phiStart = 2*Math.PI * phi[0];
		var phiLength = 2*Math.PI * (phi[1] - phi[0]);

		var numPoints = points.length / 3;
		
		var inversePointLength = 1.0 / (numPoints - 1);
		var inverseSegments = 1.0 / segments;

		var i = 0, j = 0;
		
		for (var u = 0; u <= segments; u++) {

			var phi = phiStart + u * inverseSegments * phiLength;

			var cosPhi = Math.cos(phi);
			var sinPhi = Math.sin(phi);

			for (var v = 0; v < numPoints; v++) {

				var pt = 3*v;

				out_position[i++] = cosPhi * points[pt  ] - sinPhi * points[pt+2];
				out_position[i++] = points[pt+1];
				out_position[i++] = sinPhi * points[pt  ] + cosPhi * points[pt+2];

				out_normal[j++] = cosPhi * normal[pt  ] - sinPhi * normal[pt+2];
				out_normal[j++] = normal[pt+1];
				out_normal[j++] = sinPhi * normal[pt  ] + cosPhi * normal[pt+2];

				// var u0 = u * inverseSegments;
				// var v0 = v * inversePointLength;
				// var u1 = u0 + inverseSegments;
				// var v1 = v0 + inversePointLength;
			}

		}
		
		i = 0;

		for (var u = 0; u < segments; u++) {

			for (var v = 0, jl = numPoints - 1; v < jl; v++) {

				var base = v + numPoints * u;
				var a = base;
				var b = base + numPoints;
				var c = base + 1 + numPoints;
				var d = base + 1;

				out_index[i++] = a;
				out_index[i++] = b;
				out_index[i++] = d;

				out_index[i++] = b;
				out_index[i++] = c;
				out_index[i++] = d;
			}

		}

        return true;
    }
});


})();

var XML3D = XML3D || {};
var Xflow = Xflow || {};


(function() {


Xflow.registerOperator("xflow.sphere", {
    outputs: [
		{type: 'float3', name: 'position', customAlloc: true},
		{type: 'float3', name: 'normal', customAlloc: true},
		{type: 'int', name: 'index', customAlloc: true}
	],
	
    params:  [
		{type: 'int', source: 'segments', array: true},
		{type: 'float', source: 'phi', array: true},
		{type: 'float', source: 'theta', array: true}
    ],
	
    alloc: function(sizes, segments, phi, theta)
    {
		var widthSegments = segments[0];
		var heightSegments = segments[1];
		
		var vertices = (widthSegments+1)*(heightSegments+1);
		sizes['position'] = vertices;
		sizes['normal'] = vertices;
		
		var triangles = 2*widthSegments*heightSegments;
		if (theta[0] === 0) triangles -= widthSegments;
		if (theta[1] === 1) triangles -= widthSegments;
		sizes['index'] = 3*triangles;
		
		console.log(sizes);
	},
	
    evaluate: function(position, normal, index, segments, phi, theta)
	{
		var x, y;
		var vertices = [];
		var i = 0, j = 0;
		
		var widthSegments = segments[0];
		var heightSegments = segments[1];
		
		var phiStart = 2*Math.PI * phi[0];
		var phiLength = 2*Math.PI * (phi[1] - phi[0]);
		var thetaStart = Math.PI * theta[0];
		var thetaLength = Math.PI * (theta[1] - theta[0]);
		
		for ( y = 0; y <= heightSegments; y ++ ) {

			var verticesRow = [];
			// var uvsRow = [];

			for ( x = 0; x <= widthSegments; x ++ ) {

				var u = x / widthSegments;
				var v = y / heightSegments;

				var sinTheta = Math.sin( thetaStart + v * thetaLength );
				var cosTheta = Math.cos( thetaStart + v * thetaLength );
				var sinPhi = Math.sin( phiStart + u * phiLength );
				var cosPhi = Math.cos( phiStart + u * phiLength );
				
				position[3*i  ] = -cosPhi * sinTheta;
				position[3*i+1] =  cosTheta;
				position[3*i+2] =  sinPhi * sinTheta;

				normal[3*i  ] = -cosPhi * sinTheta;
				normal[3*i+1] =  cosTheta;
				normal[3*i+2] =  sinPhi * sinTheta;

				verticesRow.push( i );
				// uvsRow.push( new XML3D.vec2.fromValues( u, 1-v ) );

				i++;
			}

			vertices.push( verticesRow );
			// uvs.push( uvsRow );

		}

		for ( y = 0; y < heightSegments; y ++ ) {

			for ( x = 0; x < widthSegments; x ++ ) {

				var v1 = vertices[ y   ][ x+1 ];
				var v2 = vertices[ y   ][ x   ];
				var v3 = vertices[ y+1 ][ x   ];
				var v4 = vertices[ y+1 ][ x+1 ];

				// var uv1 = uvs[ y   ][ x+1 ].clone();
				// var uv2 = uvs[ y   ][ x   ].clone();
				// var uv3 = uvs[ y+1 ][ x   ].clone();
				// var uv4 = uvs[ y+1 ][ x+1 ].clone();

				if ( Math.abs( position[ 3*v1+1 ] ) === 1 ) {

					// uv1.x = ( uv1.x + uv2.x ) / 2;
					index[j++] = v1;
					index[j++] = v3;
					index[j++] = v4;

				} else if ( Math.abs( position[ 3*v3+1 ] ) === 1 ) {

					// uv3.x = ( uv3.x + uv4.x ) / 2;
					index[j++] = v1;
					index[j++] = v2;
					index[j++] = v3;

				} else {

					index[j++] = v1;
					index[j++] = v2;
					index[j++] = v4;

					index[j++] = v2;
					index[j++] = v3;
					index[j++] = v4;

				}

			}

		}
		
        return true;
    }
});


})();

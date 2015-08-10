var XML3D = XML3D || {};
var Xflow = Xflow || {};


(function() {


Xflow.registerOperator("xflow.box", {
    outputs: [
		{type: 'float3', name: 'position', customAlloc: true},
		{type: 'float3', name: 'normal', customAlloc: true},
		{type: 'int', name: 'index', customAlloc: true}
	],
	
    params:  [
		{type: 'int', source: 'segments', array: true},
		{type: 'float3', source: 'extend', array: true}
    ],
	
    alloc: function(sizes, segments, extend)
    {
		var widthSegments = segments[0];
		var heightSegments = segments[1];
		var depthSegments = segments[2];
		
		var vertices = 2*(widthSegments+1)*(heightSegments+1)
			+ 2*(widthSegments+1)*(depthSegments+1)
			+ 2*(depthSegments+1)*(heightSegments+1);
		sizes['position'] = vertices;
		sizes['normal'] = vertices;
		
		var triangles = 2*widthSegments*heightSegments
			+ 2*widthSegments*depthSegments
			+ 2*depthSegments*heightSegments;
		sizes['index'] = 2*3*triangles;
		
		console.log(sizes);
	},
	
    evaluate: function(position, normal, index, segments, extend)
	{
		var widthSegments = segments[0];
		var heightSegments = segments[1];
		var depthSegments = segments[2];
		
		var width = extend[0];
		var height = extend[1];
		var depth = extend[2];

		var width_half = width / 2;
		var height_half = height / 2;
		var depth_half = depth / 2;
		
		var i = 0, j = 0;

		buildPlane( 2, 1, -1, -1, depth, height, width_half, 0 ); // px
		buildPlane( 2, 1,  1, -1, depth, height, - width_half, 1 ); // nx
		buildPlane( 0, 2,  1,  1, width, depth, height_half, 2 ); // py
		buildPlane( 0, 2,  1, -1, width, depth, - height_half, 3 ); // ny
		buildPlane( 0, 1,  1, -1, width, height, depth_half, 4 ); // pz
		buildPlane( 0, 1, -1, -1, width, height, - depth_half, 5 ); // nz

		function buildPlane( u, v, udir, vdir, width, height, depth, materialIndex ) {

			var w, ix, iy;
			var gridX = widthSegments;
			var gridY = heightSegments;
			var width_half = width / 2;
			var height_half = height / 2;
			var offset = i;

			if ( ( u === 0 && v === 1 ) || ( u === 1 && v === 0 ) ) {

				w = 2;

			} else if ( ( u === 0 && v === 2 ) || ( u === 2 && v === 0 ) ) {

				w = 1;
				gridY = depthSegments;

			} else if ( ( u === 2 && v === 1 ) || ( u === 1 && v === 2 ) ) {

				w = 0;
				gridX = depthSegments;

			}

			var gridX1 = gridX + 1;
			var gridY1 = gridY + 1;
			var segment_width = width / gridX;
			var segment_height = height / gridY;
			var n = new XML3D.math.vec3.create();

			n[ w ] = depth > 0 ? 1 : - 1;

			for ( iy = 0; iy < gridY1; iy ++ ) {

				for ( ix = 0; ix < gridX1; ix ++ ) {

					// var vector = new THREE.Vector3();
					position[3*i + u ] = ( ix * segment_width - width_half ) * udir;
					position[3*i + v ] = ( iy * segment_height - height_half ) * vdir;
					position[3*i + w ] = depth;
					
					normal[3*i    ] = n[0];
					normal[3*i + 1] = n[1];
					normal[3*i + 2] = n[2];

					// scope.vertices.push( vector );
					i++;

				}

			}

			for ( iy = 0; iy < gridY; iy ++ ) {

				for ( ix = 0; ix < gridX; ix ++ ) {

					var a = ix + gridX1 * iy;
					var b = ix + gridX1 * ( iy + 1 );
					var c = ( ix + 1 ) + gridX1 * ( iy + 1 );
					var d = ( ix + 1 ) + gridX1 * iy;

					// var uva = new THREE.Vector2( ix / gridX, 1 - iy / gridY );
					// var uvb = new THREE.Vector2( ix / gridX, 1 - ( iy + 1 ) / gridY );
					// var uvc = new THREE.Vector2( ( ix + 1 ) / gridX, 1 - ( iy + 1 ) / gridY );
					// var uvd = new THREE.Vector2( ( ix + 1 ) / gridX, 1 - iy / gridY );

					// var face = new THREE.Face3( a + offset, b + offset, d + offset );
					// face.normal.copy( normal );
					// face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone() );
					// face.materialIndex = materialIndex;
					index[j++] = a + offset;
					index[j++] = b + offset;
					index[j++] = d + offset;

					// scope.faces.push( face );
					// scope.faceVertexUvs[ 0 ].push( [ uva, uvb, uvd ] );

					// face = new THREE.Face3( b + offset, c + offset, d + offset );
					// face.normal.copy( normal );
					// face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone() );
					// face.materialIndex = materialIndex;
					index[j++] = b + offset;
					index[j++] = c + offset;
					index[j++] = d + offset;

					// scope.faces.push( face );
					// scope.faceVertexUvs[ 0 ].push( [ uvb.clone(), uvc, uvd.clone() ] );

				}

			}

		}
		
        return true;
    }
});


})();

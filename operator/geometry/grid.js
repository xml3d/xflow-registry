
var Xflow = Xflow || {};
var XML3D = XML3D || {};
	
(function() {


Xflow.registerOperator("xflow.grid", {
    outputs: [	{type: 'float3', name: 'position', customAlloc: true},
				{type: 'float3', name: 'normal', customAlloc: true},
				{type: 'float2', name: 'texcoord', customAlloc: true},
				{type: 'int', name: 'index', customAlloc: true}],
    params:  [
		{type: 'int', source: 'segments', array: true},
		{type: 'float2', source: 'extend', array: true}
	],
    alloc: function(sizes, segments, extend)
    {
        var s = segments[0];
        var t = (segments.length > 1) ? segments[1] : s;
		var vertices = (s+1)*(t+1);
        sizes['position'] = vertices;
        sizes['normal'] = vertices;
        sizes['texcoord'] = vertices;
		// TODO: use triangle strips
        sizes['index'] = s*t*6;
        // sizes['index'] = (s*t) + (s-1)*(t-2);
		
		console.log(sizes);
    },
    evaluate: function(position, normal, texcoord, index, segments, extend) {
		var s = segments[0];
        var t = (segments.length > 1) ? (segments[1]) : s;
		var rows = t+1, cols = s+1;
		var vertices = rows*cols;
		var u = extend[0];
		var v = extend[1];
		var i, j;
		
		var off = [0, 0, 0, 0];

        // Create Positions
		for (j = 0; j <= t; j++) {
			for (i = 0; i <= s; i++) {
				var x = i / s;
				var y = j / t;

				position[off[0]++] = u*(x-0.5);
				position[off[0]++] = v*(y-0.5);
				position[off[0]++] = 0;

				normal[off[1]++  ] = 0;
				normal[off[1]++  ] = 0;
				normal[off[1]++  ] = 1;

				texcoord[off[2]++] = x;
				texcoord[off[2]++] = y;
			}
		}

        // Create Indices for triangles
		for (j = 0; j < t; j++) {
			for (i = 0; i < s; i++) {
				var base = j*cols + i;
				index[off[3]++] = base + 1;
				index[off[3]++] = base;
				index[off[3]++] = base + cols;
				index[off[3]++] = base + cols;
				index[off[3]++] = base + cols + 1;
				index[off[3]++] = base + 1;
			}
		}
		
		// Create Indices for trianglestrips
		// var i = 0
		// for (var row=0; row<t-1; row++) {
			// if ( (row%2)==0 ) { // even rows
				// for (var col=0; col<s; col++) {
					// index[i++] = col + row * s;
					// index[i++] = col + (row+1) * s;
				// }
			// } else { // odd rows
				// for (var col=s-1; col>0; col--) {
					// index[i++] = col + (row+1) * s;
					// index[i++] = col - 1 + + row * s;
				// }
			// }
		// }
	}
});


})();

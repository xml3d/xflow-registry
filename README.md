# xflow-registry
Registry of reusable operators and dataflows of Xflow

```html
<asset id="box">
	<assetdata name="export">
		<int name="segments">1 1 1</int>
		<float3 name="extend">2 2 2</float3>
	</assetdata>
	<assetmesh compute="dataflow['http://stlemme.github.io/xflow-registry/dataflow/geometry.xml#gen-box']" includes="export"></assetmesh>
</asset>

<asset id="torus">
	<assetdata name="export">
		<int name="radialsegments">64</int>
		<float name="phi">0 1</float>
		<int name="tubularsegments">16</int>
		<float name="radius">1</float>
		<float name="tube">0.5</float>
		<float name="theta">0 1</float>
	</assetdata>
	<assetmesh compute="dataflow['http://stlemme.github.io/xflow-registry/dataflow/geometry.xml#gen-torus']" includes="export"></assetmesh>
</asset>
```

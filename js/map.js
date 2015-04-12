	  function initialize() {
	  
      
	  
		var crs = new L.Proj.CRS('EPSG:102014',
		  '+proj=lcc +lat_1=43 +lat_2=62 +lat_0=30 +lon_0=10 +x_0=0 +y_0=0 +ellps=intl +units=m +no_defs',
		  {
		  	resolutions: [
		 		8192, 4096, 2048, 1024, 512, 256, 128,
		  		64, 32, 16, 8, 4, 2, 1, 0.5
		  		],
		  	origin: [0, 0]
		  }),
		  
		  
		  basemap = new L.Map('basemap', {
		  	crs: crs,
		  	continuousWorld: true,
		  	worldCopyJump: false
		 	 });
		  
		  L.tileLayer.wms('http://wms.qgiscloud.com/paneff/basemap', {
		  	format: 'image/png',
			layers: 'basemap',
		 	maxZoom: 4,
		  	minZoom: 1,
			continuousWorld: true,
		  	}).addTo(basemap);
		  
		  basemap.setView([90000, 100000], 1);
	  

var test_consumption = new L.geoJson(test_consumption, {
		
	}).addTo(basemap);
	 
	 

  }
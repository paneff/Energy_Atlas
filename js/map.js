	  function initialize() {
	  
      
	  
		var crs = new L.Proj.CRS('epsg:102014',
		  '+proj=lcc +lat_1=30 +lat_2=45 +lat_0=30 +lon_0=10 +x_0=0 +y_0=0 +ellps=intl +units=m no_defs',
		  {
		  	resolutions: [
		 		4096, 2048, 1024, 512
		  		],
		  }),
		  
		  
		  basemap = new L.Map('basemap', {
		  	crs: crs,
		  	worldCopyJump: true
		 	 });
		  
		  
			 L.tileLayer.wms('http://wms.qgiscloud.com/paneff/basemap', {
		  	format: 'image/png',
			layers: 'basemap',
		 	maxZoom: 4,
		  	minZoom: 0,
			continuousWorld: true,
		  	}).addTo(basemap);
		  
			basemap.setView([52, 10], 0);
		  
		  
		 L.control.mousePosition().addTo(basemap);
	  

        /* L.geoJson(geojsonFeature, {
		}).addTo(basemap);
	 
        L.geoJson(geojsonFeature2, {
		}).addTo(basemap);
		
        L.geoJson(test_wgs89, {
		}).addTo(basemap);*/
		


  }
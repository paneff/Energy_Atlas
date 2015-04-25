function initialize() {
	  
	var crs = new L.Proj.CRS('epsg:102014',
	  '+proj=lcc +lat_1=43 +lat_2=62 +lat_0=30 +lon_0=10 +x_0=0 +y_0=0 +ellps=intl +units=m +no_defs',
	  {
	  	resolutions: [
	 		4096, 2048, 1024, 512
	  		],
	  })

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////// 															Single View										   /////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////////////////////Basemap/////////////////////////////////////////////////////////////////////////////////
    basemap = new L.Map('basemap', {
	  	crs: crs,
	  	worldCopyJump: true
	}); 
	  
	L.tileLayer.wms('http://wms.qgiscloud.com/paneff/basemap', {
	  	format: 'image/png',
		layers: 'basemap',
	 	maxZoom: 4,
	  	minZoom: 0,
		continuousWorld: true
	}).addTo(basemap);
	  
	basemap.setView([51, 12], 0); //Sets the initial view of the map (geographical center and zoom)
	  
	L.control.mousePosition().addTo(basemap);
	
	function getColorlight(c) {
		return c > 8700000 ? '#f7fbff' :
	           c > 6500000 ? '#c6dcf0' :
			   c > 4350000 ? '#6fb1d6' :
			   c > 2170000 ? '#2277ba' :
						     '#042e6d' ;
	} 
	
	function style_light(feature) {
				return {
					weight: 2,
					opacity: 1,
					color: 'black',
					dashArray: '1',
					fillOpacity: 1,
					smoothFactor: 0,
					fillColor: getColorlight(feature.properties.testsum)
				};
			}

L.geoJson(light_test, {style: style_light}).addTo(basemap);
	

	function getColor(c) {
	    return c > 150 ? '#ee7621' :
	           c > 100 ?  '#ee8262' :
			   c > 25 ? '#ee9562' :
						'#ffffff' ;
	} 
	
	function style(feature) {
				return {
					weight: 2,
					opacity: 1,
					color: 'black',
					dashArray: '1',
					fillOpacity: 1,
					fillColor: getColor(feature.properties.year96)
				};
			}

	//L.geoJson(density_clip, {style: style}).addTo(basemap);
	//L.geoJson(price_cities, {style: style}).addTo(basemap);

	 




	// ///////////////////////////////////////////////////////////////////////////////////BasemapClone/////////////////////////////////////////////////////////////////////////// 
 	basemapclone = new L.Map('basemapclone', {
	  	crs: crs,
	  	zoomControl: false,
	  	worldCopyJump: true
	}); 
	  
	L.tileLayer.wms('http://wms.qgiscloud.com/paneff/basemap', {
	  	format: 'image/png',
		layers: 'basemap',
	 	maxZoom: 4,
	  	minZoom: 0,
		continuousWorld: true
	}).addTo(basemapclone);
	  
	basemapclone.setView([51, 12], 0); //Sets the initial view of the map (geographical center and zoom)
	  
	L.control.mousePosition().addTo(basemapclone);


	function getColorlight(c) {
		return c > 8700000 ? '#f7fbff' :
	           c > 6500000 ? '#c6dcf0' :
			   c > 4350000 ? '#6fb1d6' :
			   c > 2170000 ? '#2277ba' :
						     '#042e6d' ;
	} 
	
	function style_light(feature) {
				return {
					weight: 2,
					opacity: 1,
					color: 'black',
					dashArray: '1',
					fillOpacity: 1,
					smoothFactor: 0,
					fillColor: getColorlight(feature.properties.testsum)
				};
			}

L.geoJson(light_test, {style: style_light}).addTo(basemapclone);



  
	function getColor(c) {
		return c > 150 ? '#ee7621' :
	           c > 100 ?  '#ee8262' :
			   c > 25 ? '#ee9562' :
						'#ffffff' ;
	} 
	
	function style(feature) {
				return {
					weight: 2,
					opacity: 1,
					color: 'black',
					dashArray: '1',
					fillOpacity: 1,
					smoothFactor: 0,
					fillColor: getColor(feature.properties.year96)
				};
			}

	//L.geoJson(density_clip, {style: style}).addTo(basemapclone);
	//L.geoJson(price_cities, {style: style}).addTo(basemapclone);



	/////////////////////////////////////////////////////////////////////////////////////Legend/////////////////////////////////////////////////////////////////////////////////////
	//Add Icons to some Buttons
	$("#selecttheme_button").button({
           icons: {
              primary: "ui-icon-carat-1-s"
           }
        });
	$("#selectregion_button").button({
           icons: {
              primary: "ui-icon-carat-1-s"
           }
        });
	$("#selectyear_button").button({
           icons: {
              primary: "ui-icon-carat-1-s"
           }
        });

	//Hide Selection Options
	$('.accordion_level12').hide();
	//$('.accordion_level13').hide();
	$('.accordion_level22').hide();
	$('.accordion_level221').hide();
	$('.accordion_level222').hide();
	$('.accordion_level23').hide();
	$('.accordion_level32').hide();
	//$('.accordion_level33').hide();


	//---Select Theme---//
	$('.accordion_level11').click(function(){
		$('.accordion_level12').slideToggle();
		//Check and disable the checkbox
		$('#singleview_request_lightpollution').attr('checked','checked');
		$('#singleview_request_lightpollution').attr('disabled', true);
		//Check and disable the checkbox
		$('#singleview_request_electricityconsumption').attr('checked','checked');
		$('#singleview_request_electricityconsumption').attr('disabled', true);
		//Check and disable the checkbox
		$('#singleview_request_electricityprice').attr('checked','checked');
		$('#singleview_request_electricityprice').attr('disabled', true);
		//Check and disable the checkbox
		$('#singleview_request_grossnationalproduct').attr('checked','checked');
		$('#singleview_request_grossnationalproduct').attr('disabled', true);
		//Check and disable the checkbox
		$('#singleview_request_populationdensity').attr('checked','checked');
		$('#singleview_request_populationdensity').attr('disabled', true);
	});
	//-Select Region-//
	$('.accordion_level21').click(function(){
		$('.accordion_level22').slideToggle();
	});
	//Selection - Radio button
	jQuery('#singleview_request_selectcountry').attr('checked', 'checked');
		// //If Select Country is checked, check all countries and if not uncheck all


	//-Select Year-//
	$('.accordion_level31').click(function(){
		$('.accordion_level32').slideToggle();
		//$('.accordion_level32').show('blind', 100);
	});
	//Selection - Radio button
	jQuery("#singleview_request_1996").attr('checked', 'checked');


	//-------------------------------------------------------Menu-------------------------------------------------------//
	$('#home_button').click(function(){ window.location = 'landingpage.html'});

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////// 								   							Dual View			     							   /////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//When Dual View Button is Clicked
	document.getElementById("dualview_button").addEventListener("click", dualview);
	//it can also be writen with jquery, I am doing something wrong that's why I have it as a comment
	// $("dualview_button").click(function(){
		//   	$(".legend").clone().appendTo("#basemapclone");
	// });
	//Once dualview_button is Clicked Change Height and Width of the divs Basemap, Basemapclone
	function dualview() {
		$('#basemap').height('100%');
		$('#basemap').width('50%');
		basemap.invalidateSize();
		$('#basemapclone').css({"position": "absolute", "left": "50%"});
		$('#basemapclone').height('100%');
		$('#basemapclone').width('50%');
		basemapclone.invalidateSize();
		basemap.sync(basemapclone);
		basemapclone.sync(basemap);
		//Add Legend
		$("#legend_basemap").clone(true).attr('id', 'legend_basemapclone').appendTo("#basemapclone");
		$('[name="theme"]').prop('type', 'radio');
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////// 								   			  	     Back to Single View     				        			   /////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//When Single View Button is Clicked
	document.getElementById("singleview_button").addEventListener("click", singleview);
	//Once single_button is Clicked Change Height and Width of the divs Basemap, Basemapclone
	function singleview() {
		$('#basemap').height('100%');
		$('#basemap').width('100%');
		basemap.invalidateSize();
		$('#basemapclone').css({"position": "absolute", "left": "50%"});
		$('#basemapclone').height('100%');
		$('#basemapclone').width('0%');
		basemapclone.invalidateSize();
		//Legend
		$('[name="theme"]').prop('type', 'checkbox');
	}
		
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////// 					    			   			  	     Overlay View    				            			   /////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//When Overlay View Button is Clicked
	document.getElementById("overlayview_button").addEventListener("click", overlayview);
	//Once overlay_button is Clicked Change Height and Width of the divs Basemap, Basemapclone
	function overlayview() {
		$('#basemap').height('100%');
		$('#basemap').width('100%');
		basemap.invalidateSize();
		$('#basemapclone').css({"position": "absolute", "left": "50%"});
		$('#basemapclone').height('100%');
		$('#basemapclone').width('0%');
		basemapclone.invalidateSize();
		//Legend
		$('[name="theme"]').prop('type', 'checkbox');
	}
		
  }
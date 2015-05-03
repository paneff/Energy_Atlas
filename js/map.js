function initialize() {
	  
	var crs = new L.Proj.CRS('epsg:102014',
	  '+proj=lcc +lat_1=43 +lat_2=62 +lat_0=30 +lon_0=10 +x_0=0 +y_0=0 +ellps=intl +units=m +no_defs',
	  {
	  	resolutions: [
	 		4096, 2048, 1024, 512
	  		],
	  })
	  
	  
/////////// functions for the styling of the individual layers/////////////	  
	
	// funtions for light pollution
	  
  	function getColorlight(c) {
  		return c > 8700000 ? '#f7fbff' :
  	           c > 6500000 ? '#c6dcf0' :
  			   c > 4350000 ? '#6fb1d6' :
  			   c > 2170000 ? '#2277ba' :
  						     '#042e6d' ;
  	} 
	
  	function style_light(feature) {
  				return {
  					weight: 1,
  					opacity: 0.7,
  					color: 'grey',
  					dashArray: '1',
  					fillOpacity: 1,
  					smoothFactor: 0,
  					fillColor: getColorlight(feature.properties.sum)
  				};
  			}
			
	
	// functions for population density	
			
	function getColor_density(c) {
				return c > 170 ? '#980501' :
			           c > 140 ? '#C70601' :
					   c > 110 ? '#FE2722' :
					   c > 80  ? '#FE4C48' :
					   c > 50  ? '#FF8582' :
					   c > 1   ? '#FFE7DC' :
								 '#000000' ;
			} 
	
	function style_density(feature) {
				return {
					weight: 2,
					opacity: 1,
					color: 'black',
					dashArray: '1',
					fillOpacity: 1,
					smoothFactor: 0,
		  			fillColor: getColor_density(feature.properties.year11)
						};
					}
			
			
			
	// functions for gnp		
					
	function getColor_gnp(c) {
				return c > 170 ? '#A75E34' :
					   c > 140 ? '#CD702D' :
					   c > 110 ? '#E78836' :
					   c > 80  ? '#FAA74A' :
					   c > 50  ? '#FEC870' :
					   c > 1   ? '#FFE1A5' :
								 '#000000' ;
					} 
	
					
	function style_gnp(feature) {
				return {
	 			   weight: 2,
			  	   opacity: 1,
				   color: 'black',
			       dashArray: '1',
				   fillOpacity: 1,
				   smoothFactor: 0,
				   fillColor: getColor_gnp(feature.properties.year11)
						};
				}
				
				
	
	
	// functions for price
	
	function getColor_price(c) {
				return c > 170 ? '#ee6619' :
					   c > 140 ? '#f6861f' :
			    	   c > 110 ? '#fbaa19' :
					   c > 80  ? '#ffc907' :
					   c > 50  ? '#fff333' :
					   c > 1   ? '#fff795' :
								 '#000000' ;
				} 
	
	function style_price(feature) {
				return {
					weight: 2,
					opacity: 1,
					color: 'black',
					dashArray: '1',
					fillOpacity: 1,
					smoothFactor: 0,
					fillColor: getColor_price(feature.properties.year11)
						};
					}
								
								
								
	// functions for consumption
	
	
	function getColor_consumption(c) {
				return c > 170 ? '#7a0177' :
					   c > 140 ? '#c5258a' :
					   c > 110 ? '#f768a1' :
					   c > 80  ? '#fa9fb5' :
					   c > 50  ? '#fcc5c0' :
					   c > 1   ? '#fddad7' :
								 '#000000' ;
				} 
	
	function style_consumption(feature) {
				return {
					weight: 2,
					opacity: 1,
					color: 'black',
					dashArray: '1',
					fillOpacity: 1,
					smoothFactor: 0,
					fillColor: getColor_consumption(feature.properties.year11)
						};
					}
						





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
	
	
	
	var satellite = L.tileLayer.wms('http://geocarto.ethz.ch/cgi-bin/satellite_image/qgis_mapserv.fcgi', {
	  	format: 'image/png',
		layers: 'satellite_image',
	 	maxZoom: 4,
	  	minZoom: 0,
		continuousWorld: true
	})//.addTo(basemap);//*/
	
	
	basemap.setView([51, 12], 0); //Sets the initial view of the map (geographical center and zoom)
	  
	L.control.mousePosition().addTo(basemap);
	
	var layer = L.geoJson();
	var density_layer = L.geoJson();
	var gnp_layer = L.geoJson();
	var price_layer = L.geoJson();
	var consumption_layer = L.geoJson();
	
	L.geoJson(lightpollution, {style: style_light}).addTo(layer);
	L.geoJson(density, {style: style_density}).addTo(density_layer);
	L.geoJson(gnp, {style: style_gnp}).addTo(gnp_layer);
	L.geoJson(price, {style: style_price}).addTo(price_layer);	
	L.geoJson(consumption, {style: style_consumption}).addTo(consumption_layer);	
	
	

	/*function highlightFeature(e) {
			var layer = e.target;

			layer.setStyle({
				weight: 5,
				color: '#566',
				dashArray: '',
				fillOpacity: 0.8
			});

			if (!L.Browser.ie && !L.Browser.opera) {
				layer.bringToFront();
			}

			info.update(layer.feature.properties);
		}

		var geojson;

		function resetHighlight(e) {
			geojson.resetStyle(e.target);
			info.update();
		}

		function zoomToFeature(e) {
			basemap.fitBounds(e.target.getBounds());
		}

		function onEachFeature(feature, layer) {
			layer.on({
				mouseover: highlightFeature,
				mouseout: resetHighlight,
				click: zoomToFeature
			});
		}


geojson = L.geoJson(light_test, {style: style_light, onEachFeature: onEachFeature
}).addTo(basemap);

var info = L.control();

info.onAdd = function (basemap) {
    this._Infobox = L.DomUtil.create('Infobox', 'info'); // create a div with a class "info"
    this.update();
    return this._Infobox;
};

// method that we will use to update the control based on feature properties passed
info.update = function (properties) {
    this._Infobox= 'US Population Density' +  (properties ?
        '<b>' + properties.CNTR_ID + '</b><br />' : 'Hover over a state' );
};

info.addTo(basemap);

*/
	

	//L.geoJson(lightpollution, {style: style_light}).addTo(basemap);
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



     //L.geoJson(light_test, {style: style_light}).addTo(basemapclone);




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
		
		//Check and add layer
		$('#singleview_request_lightpollution').attr('unchecked','unchecked');
		$('#singleview_request_lightpollution').click(function() {
			
			var testcheck = $(this);
			
			if (testcheck.is(':checked')) {
				layer.addTo(basemap);
			}
			
			else {
				basemap.removeLayer(layer);
			}
			
		});


		//Check and disable the checkbox
		$('#singleview_request_electricityconsumption').attr('unchecked','unchecked');
		$('#singleview_request_electricityconsumption').click(function() {
			
			var testcheck4 = $(this);
			
			if (testcheck4.is(':checked')) {
				consumption_layer.addTo(basemap);
			}
			
			else {
				basemap.removeLayer(consumption_layer);
			}
			
		});


		//Check and disable the checkbox
		$('#singleview_request_electricityprice').attr('unchecked','unchecked');
		$('#singleview_request_electricityprice').click(function() {
			
			var testcheck5 = $(this);
			
			if (testcheck5.is(':checked')) {
				price_layer.addTo(basemap);
			}
			
			else {
				basemap.removeLayer(price_layer);
			}
			
		});
		
		//Check and disable the checkbox
		$('#singleview_request_grossnationalproduct').attr('unchecked','unchecked');
		$('#singleview_request_grossnationalproduct').click(function() {
			
			var testcheck3 = $(this);
			
			if (testcheck3.is(':checked')) {
				gnp_layer.addTo(basemap);
			}
			
			else {
				basemap.removeLayer(gnp_layer);
			}
			
		});
		
		
		
		
		//Check and disable the checkbox
		$('#singleview_request_populationdensity').attr('unchecked','unchecked');
		$('#singleview_request_populationdensity').attr('disabled', false);
		
		$('#singleview_request_populationdensity').click(function() {
			
			var testcheck2 = $(this);
			
			if (testcheck2.is(':checked')) {
				satellite.addTo(basemap);
			}
			
			else {
				basemap.removeLayer(satellite);
			}
			
		});
		//*/

	});
	

	
	//-Select Region-//
	//$('.accordion_level21').click(function(){
		//$('.accordion_level22').slideToggle();
	//});
	//Selection - Radio button
	//jQuery('#singleview_request_selectcountry').attr('checked', 'checked');
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

	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////// 					    			   		  	   Toast Message, Right Pannel      				               /////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//When either Graph or Info Button is Clicked
	document.getElementById("graph_button").addEventListener("click", infographpanel);
	function infographpanel() {
        var toast = $(window).AndroidToast({
			message : "Mouse over the infograph icon on the right.",
	        fadeInTime : "700",
	        fadeOutTime : "700",
	        easing: "swing",
	        stayTime: "5000",
	        maxWidth: "400",
	        bottomPosition: "610"
		});
        toast.AndroidToast('show');
        //Make infograph icon visible
    	$("#infoograph").removeClass( "notshown" ).addClass( "shown" );
    	//add text to the infotext_infograp div about the specific layer

    	//add graph title
    	$("#graph_infograph").prepend("Graph:");
    	//add graph text

    	//add graph

    }


    document.getElementById("info_button").addEventListener("click", infopanel);
	function infopanel() {
        var toast = $(window).AndroidToast({
			message : "Mouse over the infograph icon on the right.",
	        fadeInTime : "700",
	        fadeOutTime : "700",
	        easing: "swing",
	        stayTime: "5000",
	        maxWidth: "400",
	        bottomPosition: "610"
		});
        toast.AndroidToast('show');
        //Make infograph icon visible
    	$("#infoograph").removeClass( "notshown" ).addClass( "shown" );
    	//add text to the infotext_infograp div about the specific layer

    	//remove graph title
    	$("#graph_infograph").empty();
    	//remove graph text

    	//remove graph

    }
		
  }
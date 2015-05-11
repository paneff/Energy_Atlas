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
	  
	
	var year = 'year11'
	
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
  					fillColor: getColorlight(feature.properties[year])
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
		  			fillColor: getColor_density(feature.properties[year])
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
				   fillColor: getColor_gnp(feature.properties[year])
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
					fillColor: getColor_price(feature.properties[year])
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
					fillColor: getColor_consumption(feature.properties[year])
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
	
	
	var single_light_layer = L.geoJson();
	L.geoJson(lightpollution, {style: style_light}).addTo(single_light_layer);
	
	var layer = L.geoJson();
	L.geoJson(lightpollution, {style: style_light}).addTo(layer);
	
	
	//var layer = L.geoJson();
	var light_layer = L.geoJson();
	var density_layer = L.geoJson();
	var gnp_layer = L.geoJson();
	var price_layer = L.geoJson();
	var consumption_layer = L.geoJson();

	
	var layer_cloned = L.geoJson();
	var density_layer_cloned = L.geoJson();
	var gnp_layer_cloned = L.geoJson();
	var price_layer_cloned = L.geoJson();
	var consumption_layer_cloned = L.geoJson();
	
	
	L.geoJson(lightpollution, {style: style_light}).addTo(layer_cloned);
	L.geoJson(density, {style: style_density}).addTo(density_layer_cloned);
	L.geoJson(gnp, {style: style_gnp}).addTo(gnp_layer_cloned);
	L.geoJson(price, {style: style_price}).addTo(price_layer_cloned);	
	L.geoJson(consumption, {style: style_consumption}).addTo(consumption_layer_cloned);	
	
	//L.geoJson(lightpollution, {style: style_light}).addTo(layer);
	L.geoJson(density, {style: style_density}).addTo(density_layer);
	L.geoJson(gnp, {style: style_gnp}).addTo(gnp_layer);
	L.geoJson(price, {style: style_price}).addTo(price_layer);	
	L.geoJson(consumption, {style: style_consumption}).addTo(consumption_layer);	
	L.geoJson(lightpollution, {style: style_light}).addTo(light_layer);
	
	
	//L.geoJson(lightpollution).addTo(basemap);
	
	
	//layer.addTo(basemap)
	

	function highlightFeature(e) {
			var hover_layer = e.target;

			hover_layer.setStyle({
				weight: 5,
				color: '#ff9a00',
				dashArray: '',
				fillOpacity: 0.2
			});

			if (!L.Browser.ie && !L.Browser.opera) {
				hover_layer.bringToFront();
			}

			//info.update(layer.feature.properties);
		}

	

		function resetHighlight(e) {
			geojson.resetStyle(e.target);
			//info.update();
		}
		
		
		var geojson;
		// ... our listeners
		geojson = L.geoJson();
		

		/*function zoomToFeature(e) {
			basemap.fitBounds(e.target.getBounds());
		}*/

		function onEachFeature(feature, layer) {
			layer.on({
				mouseover: highlightFeature,
				mouseout: resetHighlight,
				//click: zoomToFeature
			});
		}


		/*var info = L.control();

		info.onAdd = function (basemap) {
    		this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    		this.update();
    		return this._div;
		};

		// method that we will use to update the control based on feature properties passed
		info.update = function (props) {
    		this._div= 'US Population Density' +  (props ?
        		'<b>' + props.CNTR_ID + '</b><br />' : 'Hover over a state' );
			};

		info.addTo(basemap);
*/
	

	 


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


	/////////////////////////////////////////////////////////////////////////////////////Legend/////////////////////////////////////////////////////////////////////////////////////
	$("#legend_dual").hide();
	
	//Add Icons to some Buttons
	
	
	$("#selecttheme_button").button({
           icons: {
              primary: "ui-icon-carat-1-s"
           }
        });
		
	$("#selecttheme_button_dual").button({
	       icons: {
	  		   primary: "ui-icon-carat-1-s"
	       }
	    });

	$("#selectyear_button").button({
           icons: {
              primary: "ui-icon-carat-1-s"
           }
        });


	$("#selectyear_button_dual").button({
	         icons: {
	             primary: "ui-icon-carat-1-s"
	           }
	      });
	//Hide Selection Options
	$('.accordion_level12').hide();
	$('.accordion_level121').hide();
	$('.accordion_level122').hide();
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
		
		//Check pollution and its clone
		$('#dual_request_lightpollution').click(function() {
			
			var testcheck = $(this);
			
			if (testcheck.is(':checked')) {
				basemap.removeLayer(layer);
				basemap.removeLayer(consumption_layer);
				basemap.removeLayer(gnp_layer);
				basemap.removeLayer(price_layer);
				basemap.removeLayer(density_layer);
				layer.addTo(basemap);
			}
			
		});
		
		
		$('#dual_request_lightpollution_cloned').click(function() {
			
			var testcheck = $(this);
			
			if (testcheck.is(':checked')) {
				basemap.removeLayer(layer_cloned);
				basemap.removeLayer(consumption_layer_cloned);
				basemap.removeLayer(gnp_layer_cloned);
				basemap.removeLayer(price_layer_cloned);
				basemap.removeLayer(density_layer_cloned);
				layer.addTo(basemapclone);
			}
			
		});


		//Check consumption and its clone
		$('#dual_request_electricityconsumption').click(function() {
			
			var testcheck1 = $(this);
			
			if (testcheck1.is(':checked')) {
				basemap.removeLayer(layer);
				basemap.removeLayer(gnp_layer);
				basemap.removeLayer(price_layer);
				basemap.removeLayer(density_layer);
				consumption_layer.addTo(basemap);
			}
			
			
		});
		
		$('#dual_request_electricityconsumption_cloned').click(function() {
			
			var testcheck2 = $(this);
			
			if (testcheck2.is(':checked')) {
				consumption_layer_cloned.addTo(basemapclone);
			}
			
			else {
				basemapclone.removeLayer(consumption_layer_cloned);
			}
			
		});


		//Check price and its clone
		$('#dual_request_electricityprice').click(function() {
			
			var testcheck3 = $(this);
			
			if (testcheck3.is(':checked')) {
				basemap.removeLayer(layer);
				basemap.removeLayer(consumption_layer);
				basemap.removeLayer(gnp_layer);
				basemap.removeLayer(price_layer);
				basemap.removeLayer(density_layer);
				price_layer.addTo(basemap);
			}
			

			
		});
		
		$('#dual_request_electricityprice_cloned').click(function() {
			
			var testcheck4 = $(this);
			
			if (testcheck4.is(':checked')) {
				price_layer_cloned.addTo(basemapclone);
			}
			
			else {
				basemapclone.removeLayer(price_layer_cloned);
			}
			
		});


		//Check gnp and its clone
		$('#dual_request_grossnationalproduct').click(function() {
			
			var testcheck5 = $(this);
			
			if (testcheck5.is(':checked')) {
				basemap.removeLayer(layer);
				basemap.removeLayer(consumption_layer);
				basemap.removeLayer(gnp_layer);
				basemap.removeLayer(price_layer);
				basemap.removeLayer(density_layer);
				gnp_layer.addTo(basemap);
			}

			
		});		
		$('#dual_request_grossnationalproduct_cloned').click(function() {
			
			var testcheck6 = $(this);
			
			if (testcheck6.is(':checked')) {
				
				gnp_layer_cloned.addTo(basemapclone);
			}
			
			
		});	
		
		//Check and disable the checkbox
		$('#dual_request_populationdensity').click(function() {
			
			var testcheck7 = $(this);
			
			if (testcheck7.is(':checked')) {
				basemap.removeLayer(layer);
				basemap.removeLayer(consumption_layer);
				basemap.removeLayer(gnp_layer);
				basemap.removeLayer(price_layer);
				basemap.removeLayer(density_layer);
				density_layer.addTo(basemap);
			}
			
			
		});		
		$('#dual_request_populationdensity_cloned').click(function() {
			
			var testcheck7 = $(this);
			
			if (testcheck7.is(':checked')) {
				basemap.removeLayer(layer);
				basemap.removeLayer(consumption_layer);
				basemap.removeLayer(gnp_layer);
				basemap.removeLayer(price_layer);
				basemap.removeLayer(density_layer);
				density_layer_cloned.addTo(basemapclone);
			}
			
			
		});
		
		
		$('#single_request_lightpollution').click(function() {
			
			var testcheck7 = $(this);
			
			if (testcheck7.is(':checked')) {
				//single_light_layer.addTo(basemap);
				year = 'year11'
				light_layer.addTo(basemap);
				geojson = L.geoJson(lightpollution, {style: style_light,onEachFeature: onEachFeature}).addTo(basemap);
				$('.accordion_level121').slideToggle();
			}
			
			else {
				basemap.removeLayer(geojson);
				basemap.removeLayer(light_layer);
				$('.accordion_level121').hide();
			}
				
				
			
			
		});
		//*/

	});
	

	//-Select Year-//
	$('.accordion_level31').click(function(){
		$('.accordion_level32').slideToggle();
		
			$('singleview_request_2011').attr('checked', true);
			
			$('#singleview_request_1996').click(function() {
			
			var testcheck10 = $(this);
		
			if (testcheck10.is(':checked')) {
				year = 'year11'
				light_layer.addTo(basemap);
				geojson = L.geoJson(lightpollution, {style: style_light,onEachFeature: onEachFeature}).addTo(basemap);
				
			}
		
			else {
			
			}
		});
		//$('.accordion_level32').show('blind', 100);
	});
	//Selection - Radio button
	jQuery("#singleview_request_1996").attr('checked', 'checked');



	//-------------------------------------------------------Menu-------------------------------------------------------//
	$('#home_button').click(function(){ window.location = 'landingpage.html'});
	$('#help_button').click(function(){ window.location = 'helppage.html'});
	


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
		$("#legend_basemap").hide();
		$("#legend_dual").show();
		$('.accordion_level12').hide();
		$('.accordion_level32').hide();
		$('[name="theme"]').prop('type', 'radio');
		
		
		
		//Add Legend
		//$("#legend_basemap").clone(true).attr('id', 'legend_basemapclone').appendTo("#basemapclone");
		//$("#current_users").clone(false).find("*[id]").andSelf().each(function() { $(this).attr("id", $(this).attr("id") + "_cloned"); });
		$("#legend_dual").clone(true).appendTo("#basemapclone").find("*[id]").andSelf().each(function() { $(this).attr("id", $(this).attr("id") + "_cloned"); });
		//$("#legend_dual").clone(true).appendTo("#basemapclone");
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
		$("#legend_basemap").show();
		$("#legend_dual").hide();
		$('.accordion_level12').hide();
		$('.accordion_level32').hide();
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
	////////////////////// 								   			  	     SingleView BarCharts     				        			   /////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var barChartsLayer = L.geoJson();
	var barChartMarker = [];
	$('#singleview_request_electricityconsumption_single').click(function() {
			var barchartschecked = $(this);
			if (barchartschecked.is(':checked')) {
				//Set options for each country separately
				var options = [];
				for (i = 0; i < countriescentroids1996.length; i++) { 
				    options.push({
					    data: {
					        'electricityconsumption': countriescentroids1996[i].electricityconsumption,
					        'electricityprice': countriescentroids1996[i].electricityprice,
					        'gnp': countriescentroids1996[i].gnp,
					        'popdensity': countriescentroids1996[i].popdensity
					    },
					    chartOptions: {
					        'electricityconsumption': {
					            fillColor: '#FEE5D9',
					            minValue: 0,
					            maxValue: 200,
					            maxHeight: 200,
					            displayText: function (value) {
					                return value.toFixed(2);
					            }
					        },
					        'electricityprice': {
					            fillColor: '#FCAE91',
					            minValue: 0,
					            maxValue: 200,
					            maxHeight: 200,
					            displayText: function (value) {
					                return value.toFixed(2);
					            }
					        },
					        'gnp': {
					            fillColor: '#FB6A4A',
					            minValue: 0,
					            maxValue: 200,
					            maxHeight: 200,
					            displayText: function (value) {
					                return value.toFixed(2);
					            }
					        },
					        'popdensity': {
					            fillColor: '#CB181D',
					            minValue: 0,
					            maxValue: 200,
					            maxHeight: 200,
					            displayText: function (value) {
					                return value.toFixed(2);
					            }
					        }
					    },
					    weight: 1,
					    color: '#000000'//,
					    //... // Other L.Path style options
					}); 
				//Add BarChart on the Map
				barChartMarker[i] = new L.BarChartMarker(new L.LatLng(countriescentroids1996[i].latitude, countriescentroids1996[i].longitude), options[i]);
				barChartMarker[i].addTo(barChartsLayer);
				barChartsLayer.addTo(basemap);
				}
			}
			else {
				basemap.removeLayer(barChartsLayer);
			}
		});
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
    	$("#infograph").removeClass( "notshown" ).addClass( "shown" );
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
    	$("#infograph").removeClass( "notshown" ).addClass( "shown" );
    	//add text to the infotext_infograp div about the specific layer

    	//remove graph title
    	$("#graph_infograph").empty();
    	//remove graph text

    	//remove graph

    }
		
  }
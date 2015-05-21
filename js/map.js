function initialize() {
	  
	var crs = new L.Proj.CRS('epsg:102014',
	  '+proj=lcc +lat_1=43 +lat_2=62 +lat_0=30 +lon_0=10 +x_0=0 +y_0=0 +ellps=intl +units=m +no_defs',
	  {
	  	resolutions: [
	 		4096, 2048, 1024, 512
	  		],
	  })
	
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

	//Declare Some Layers
	var patternLayer = L.geoJson();
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////												Styles       									   /////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	  

	/////////////////////////////////////							Stripes for the Overlay View       									   /////////////////////////////////////

   	
   		var stripes1 = new L.StripePattern({
			// patternContentUnits: 'objectBoundingBox',
	  		// patternUnits: 'objectBoundingBox',
	        weight: 0.5,
	        angle: 45,
		    color: 'black'
	    });
	    

	    var stripes2 = new L.StripePattern({
	      // patternContentUnits: 'objectBoundingBox',
	      //   patternUnits: 'objectBoundingBox',
	        weight: 1,
	        angle: 45,
		    color: 'black'
	    });
	    

	    var stripes3 = new L.StripePattern({
	      // patternContentUnits: 'objectBoundingBox',
	      //   patternUnits: 'objectBoundingBox',
	        weight: 1.5,
	        angle: 45,
		    color: 'black'
	    });
	    

	    var stripes4 = new L.StripePattern({
	      // patternContentUnits: 'objectBoundingBox',
	      //   patternUnits: 'objectBoundingBox',
	        weight: 2,
	        angle: 45,
		    color: 'black'
	    });
	    

	    var stripes5 = new L.StripePattern({
	      // patternContentUnits: 'objectBoundingBox',
	      //   patternUnits: 'objectBoundingBox',
	        weight: 2.50,
	        angle: 45,
		    color: 'black'
	    });
	    

	    var stripes6 = new L.StripePattern({
	      // patternContentUnits: 'objectBoundingBox',
	      //   patternUnits: 'objectBoundingBox',
	        weight: 3,
	        angle: 45,
		    color: 'black'
	    });
	    

	    var stripes7 = new L.StripePattern({
	      // patternContentUnits: 'objectBoundingBox',
	      //   patternUnits: 'objectBoundingBox',
	        weight: 3.5,
	        angle: 45,
		    color: 'black'
	    });
	    

	/////////////////////////////////////							      Themes' Styles      							     		   /////////////////////////////////////

	var year = 'year11'
	  
	var stylefunctions = {
		lightpollution: function(feature) {
			return {
				weight: 1,
				opacity: 0.7,
				color: 'grey',
				dashArray: '1',
				fillOpacity: 1,
				smoothFactor: 0,
				fillColor: getColorlight(feature.properties[year])
				};
			},
			  
		gnp: function(feature) {
			return {
 			   weight: 1,
		  	   opacity: 0.7,
			   color: 'gray',
		       dashArray: '1',
			   fillOpacity: 1,
			   smoothFactor: 0,
			   fillColor: getColor_gnp(feature.properties[year])
					};
			}, 
			
		density: function(feature) {
			return {
				weight: 1,
				opacity: 0.7,
				color: 'gray',
				dashArray: '1',
				fillOpacity: 1,
				smoothFactor: 0,
	  			fillColor: getColor_density(feature.properties[year])
					};
			},
			
		price: function(feature) {
			return {
				weight: 1,
				opacity: 0.7,
				color: 'gray',
				dashArray: '1',
				fillOpacity: 1,
				smoothFactor: 0,
				fillColor: getColor_price(feature.properties[year])
					};
			},
			
		consumption: function(feature) {
			return {
				weight: 1,
				opacity: 0.7,
				color: 'gray',
				dashArray: '1',
				fillOpacity: 1,
				smoothFactor: 0,
				fillColor: getColor_consumption(feature.properties[year])
					};
			}
			
	  };

	/////////////////////////////////////							      Choose Colour based on Value      			     		   ///////////////////////////////////// 
    function getColorlight(c) {
  		return c > 200	   ? '#f7fbff' :
  	           c > 130 	   ? '#c6dcf0' :
  			   c > 100     ? '#6fb1d6' :
  			   c > 50      ? '#2277ba' :
  						     '#042e6d' ;
      	}

    //test based on light pollution data
    function getPatternDense_light(c) {
  		return c > 200 ? stripes1 :
  	           c > 130 ? stripes2 :
  			   c > 100 ? stripes4 :
  			   c > 50 ? stripes6 :
  						stripes7 ;
  		}  
			
	function getColor_density(c) {
		return c > 170 ? '#980501' :
	           c > 140 ? '#C70601' :
			   c > 110 ? '#FE2722' :
			   c > 80  ? '#FE4C48' :
			   c > 50  ? '#FF8582' :
			   c > 1   ? '#FFE7DC' :
						 '#000000' ;
		} 
						
	function getColor_gnp(c) {
		return c > 170 ? '#A75E34' :
			   c > 140 ? '#CD702D' :
			   c > 110 ? '#E78836' :
			   c > 80  ? '#FAA74A' :
			   c > 50  ? '#FEC870' :
			   c > 1   ? '#FFE1A5' :
						 '#000000' ;
			} 
	
	
	function getColor_price(c) {
		return c > 170 ? '#ee6619' :
			   c > 140 ? '#f6861f' :
	    	   c > 110 ? '#fbaa19' :
			   c > 80  ? '#ffc907' :
			   c > 50  ? '#fff333' :
			   c > 1   ? '#fff795' :
						 '#000000' ;
		} 
	
	function getColor_consumption(c) {
		return c > 170 ? '#7a0177' :
			   c > 140 ? '#c5258a' :
			   c > 110 ? '#f768a1' :
			   c > 80  ? '#fa9fb5' :
			   c > 50  ? '#fcc5c0' :
			   c > 1   ? '#fddad7' :
						 '#000000' ;
		} 

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////// 															Single View										   /////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////////////////////Basemap/////////////////////////////////////////////////////////////////////////////////
 //    basemap = new L.Map('basemap', {
	//   	crs: crs,
	//   	worldCopyJump: true
	// }); 
	
	
	  

	// L.tileLayer.wms('http://wms.qgiscloud.com/paneff/basemap', {
	//   	format: 'image/png',
	// 	layers: 'basemap',
	//  	maxZoom: 4,
	//   	minZoom: 0,
	// 	continuousWorld: true
	// }).addTo(basemap);
	
	
	
	var satellite = L.tileLayer.wms('http://geocarto.ethz.ch/cgi-bin/satellite_image/qgis_mapserv.fcgi', {
	  	format: 'image/png',
		layers: 'satellite_image',
	 	maxZoom: 4,
	  	minZoom: 0,
		continuousWorld: true
	})
	
	
	// basemap.setView([51, 12], 0); //Sets the initial view of the map (geographical center and zoom)
	  
	// L.control.mousePosition().addTo(basemap);
	
	
	var single_light_layer = L.geoJson();
	L.geoJson(lightpollution, {style: stylefunctions['lightpollution']}).addTo(single_light_layer);
	
	
	var light_layer = L.geoJson();
	var density_layer = L.geoJson();
	var gnp_layer = L.geoJson();
	var price_layer = L.geoJson();
	var consumption_layer = L.geoJson();
	

	
	var light_layer_cloned = L.geoJson();
	var density_layer_cloned = L.geoJson();
	var gnp_layer_cloned = L.geoJson();
	var price_layer_cloned = L.geoJson();
	var consumption_layer_cloned = L.geoJson();
	
	
	L.geoJson(lightpollution, {style: stylefunctions['lightpollution']}).addTo(light_layer_cloned);
	L.geoJson(density, {style: stylefunctions['density']}).addTo(density_layer_cloned);
	L.geoJson(gnp, {style: stylefunctions['gnp']}).addTo(gnp_layer_cloned);
	L.geoJson(price, {style: stylefunctions['price']}).addTo(price_layer_cloned);	
	L.geoJson(consumption, {style: stylefunctions['consumption']}).addTo(consumption_layer_cloned);	
	

	L.geoJson(density, {style: stylefunctions['density']}).addTo(density_layer);
	L.geoJson(gnp, {style: stylefunctions['gnp']}).addTo(gnp_layer);
	L.geoJson(price, {style: stylefunctions['price']}).addTo(price_layer);	
	L.geoJson(consumption, {style: stylefunctions['consumption']}).addTo(consumption_layer);	
	L.geoJson(lightpollution, {style: stylefunctions['lightpollution']}).addTo(light_layer);
	
	
	var data = {
		gnp: gnp,
		price: price,
		lightpollution: lightpollution,
		conspumtion: consumption,
		density: density
		}

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
				basemap.removeLayer(light_layer);
				basemap.removeLayer(consumption_layer);
				basemap.removeLayer(gnp_layer);
				basemap.removeLayer(price_layer);
				basemap.removeLayer(density_layer);
				light_layer.addTo(basemap);
				$('.accordion_level121').slideToggle();
				$('.accordion_level123').hide();
				$('.accordion_level124').hide();
				$('.accordion_level125').hide();
				$('.accordion_level126').hide();
			}
			
			
		});
		
		

		//Check consumption and its clone

		
		
		$('#dual_request_electricityconsumption_cloned').off(); 
		//$('#dual_request_electricityconsumption_cloned').after('<p>Electicty Consumption</p>');
		
		//$('<p>atdsfadfadfe</p>').appendTo('#dual_request_electricityconsumption');
		$('#dual_request_electricityconsumption_cloned').click(function() {
			
			var testcheck2 = $(this);
			
			if (testcheck2.is(':checked')) {
				basemapclone.removeLayer(light_layer_cloned);
				basemapclone.removeLayer(gnp_layer_cloned);
				basemapclone.removeLayer(price_layer_cloned);
				basemapclone.removeLayer(density_layer_cloned);
				consumption_layer_cloned.addTo(basemapclone);
				$('.accordion_level123').slideToggle();
				$('.accordion_level121').hide();
				$('.accordion_level124').hide();
				$('.accordion_level125').hide();
				$('.accordion_level126').hide();
			}
			
			
		});


		//Check price and its clone

		
		$('#dual_request_electricityprice_cloned').off();
		$('#dual_request_electricityprice_cloned').click(function() {
			
			var testcheck4 = $(this);
			
			if (testcheck4.is(':checked')) {
				basemapclone.removeLayer(light_layer_cloned);
				basemapclone.removeLayer(gnp_layer_cloned);
				basemapclone.removeLayer(consumption_layer_cloned);
				basemapclone.removeLayer(density_layer_cloned);
				price_layer_cloned.addTo(basemapclone);
				$('.accordion_level124').slideToggle();
				$('.accordion_level121').hide();
				$('.accordion_level123').hide();
				$('.accordion_level125').hide();
				$('.accordion_level126').hide();
			}
			
			
		});


		//Check gnp and its clone

			
		$('#dual_request_grossnationalproduct_cloned').off();
		$('#dual_request_grossnationalproduct_cloned').click(function() {
			
			var testcheck6 = $(this);
			
			if (testcheck6.is(':checked')) {
				
				basemapclone.removeLayer(light_layer_cloned);
				basemapclone.removeLayer(price_layer_cloned);
				basemapclone.removeLayer(consumption_layer_cloned);
				basemapclone.removeLayer(density_layer_cloned);
				basemapclone.removeLayer(gnp_layer_cloned);
				gnp_layer_cloned.addTo(basemapclone);
				$('.accordion_level125').slideToggle();
				$('.accordion_level121').hide();
				$('.accordion_level123').hide();
				$('.accordion_level124').hide();
				$('.accordion_level126').hide();
			}
			
			
		});	
		
		//Check and disable the checkbox

		
		$('#dual_request_populationdensity_cloned').off()	
		$('#dual_request_populationdensity_cloned').click(function() {
			
			var testcheck7 = $(this);
			
			if (testcheck7.is(':checked')) {
				basemapclone.removeLayer(light_layer_cloned);
				basemapclone.removeLayer(price_layer_cloned);
				basemapclone.removeLayer(consumption_layer_cloned);
				basemapclone.removeLayer(gnp_layer_cloned);
				basemapclone.removeLayer(density_layer_cloned);
				density_layer_cloned.addTo(basemapclone);
				$('.accordion_level126').slideToggle();
				$('.accordion_level121').hide();
				$('.accordion_level123').hide();
				$('.accordion_level124').hide();
				$('.accordion_level125').hide();
			}
			
			
		});
		
		
		
		$('#satellite_image').prop("checked",false);
		$('#satellite_image').click(function() {
			
			var testcheck7 = $(this);
			
			if (testcheck7.is(':checked')) {
				satellite.addTo(basemap);
			}
			
			else {
				basemap.removeLayer(satellite);
			}
				
				
			
			
		});
		
		
		$('#single_request_lightpollution').prop("checked",false);
		$('#single_request_lightpollution').click(function() {
			
			var testcheck7 = $(this);
			
			if (testcheck7.is(':checked')) {
				//single_light_layer.addTo(basemap);
				year = 'year11'
				single_light_layer.addTo(basemap).bringToBack();
				//geojson = L.geoJson(lightpollution, {style: style_light,onEachFeature: onEachFeature}).addTo(basemap);
				$('.accordion_level121').slideToggle();
			}
			
			else {


				$('.accordion_level121').hide(100);


				basemap.removeLayer(single_light_layer);


			}
				
				
			
			
		});
		//*/

	});
	

	//-Select Year-//
	/////////////////////////////////////							Extract year from selection       									   /////////////////////////////////////
	$('.accordion_level31').click(function(){
		$('.accordion_level32').slideToggle();
		
			//$("#singleview_request_2011").prop('checked',true);
			
			$('#singleview_request_1996').click(function() {
				var testcheck10 = $(this);
				if (testcheck10.is(':checked')) {
					basemap.removeLayer(single_light_layer);
					console.log(year);
					year = 'year96';
					single_light_layer = L.geoJson(lightpollution, {style: stylefunctions['lightpollution']}).addTo(light_layer).addTo(basemap).bringToBack();
					}
			
			});
		
			
			$('#singleview_request_2000').click(function() {
			
				var testcheck10 = $(this);
				if (testcheck10.is(':checked')) {
					basemap.removeLayer(single_light_layer);
					year = 'year00';
					console.log(year);
					single_light_layer = L.geoJson(lightpollution, {style: stylefunctions['lightpollution']}).addTo(light_layer).addTo(basemap).bringToBack();
				
					}
		
		
			});
			
			$('#singleview_request_2004').click(function() {
			
				var testcheck10 = $(this);
				if (testcheck10.is(':checked')) {
					basemap.removeLayer(single_light_layer);
					year = 'year04';
					console.log(year);
					single_light_layer = L.geoJson(lightpollution, {style: stylefunctions['lightpollution']}).addTo(light_layer).addTo(basemap).bringToBack();
				
					}
		
		
			});

			$('#singleview_request_2011').click(function() {
			
				var testcheck10 = $(this);
				if (testcheck10.is(':checked')) {
					basemap.removeLayer(single_light_layer);
					year = 'year11';
					console.log(year);
					single_light_layer = L.geoJson(lightpollution, {style: stylefunctions['lightpollution']}).addTo(light_layer).addTo(basemap).bringToBack();
				
					}
		
		
			});
			
			$('#dual_request_1996').click(function() {
			
				var testcheck10 = $(this);
				if (testcheck10.is(':checked')) {

					var temp = $('input:radio[name=theme]').filter(":checked").val()
					
					var templayer96 = L.geoJson();
				
					basemap.removeLayer(data[temp]);
					year = 'year96';
					
					L.geoJson(data[temp], {style: stylefunctions[temp]}).addTo(templayer96);
					templayer96.addTo(basemap);
				
					}
		
		
			});
			
			$('#dual_request_2000').click(function() {
			
				var testcheck = $(this);
				if (testcheck.is(':checked')) {

					var temp = $('input:radio[name=theme]').filter(":checked").val()
					
					var templayer00 = L.geoJson();
					
					basemap.removeLayer(data[temp]);
					year = 'year00';
					
					L.geoJson(data[temp], {style: stylefunctions[temp]}).addTo(templayer00);
					templayer00.addTo(basemap);
				
					}
		
		
			});
			
			
			$('#dual_request_2004').click(function() {
			
				var testcheck = $(this);
				if (testcheck.is(':checked')) {

					var temp = $('input:radio[name=theme]').filter(":checked").val()
					
					var templayer04 = L.geoJson();
					
					basemap.removeLayer(data[temp]);
					year = 'year04';
					
					L.geoJson(data[temp], {style: stylefunctions[temp]}).addTo(templayer04);
					templayer04.addTo(basemap);
				
					}
		
		
			});
			
			
			
			$('#dual_request_2011').prop("checked",true);
			$('#dual_request_2011').click(function() {
			
				var testcheck = $(this);
				if (testcheck.is(':checked')) {

					var temp = $('input:radio[name=theme]').filter(":checked").val()
					
					var templayer11 = L.geoJson();
					
					basemap.removeLayer(data[temp]);
					year = 'year11';
					
					L.geoJson(data[temp], {style: stylefunctions[temp]}).addTo(templayer11);
					templayer11.addTo(basemap);
				
					}
		
		
			});
			
			
			
			$('#dual_request_1996_cloned').click(function() {
			
				var testcheck10 = $(this);
				if (testcheck10.is(':checked')) {

					var temp = $('input:radio[name=theme]').filter(":checked").val()
					
					var templayer96 = L.geoJson();
				
					basemapclone.removeLayer(data[temp]);
					year = 'year96';
					
					L.geoJson(data[temp], {style: stylefunctions[temp]}).addTo(templayer96);
					templayer96.addTo(basemapclone);
				
					}
		
		
			});
			
			$('#dual_request_2000_cloned').click(function() {
			
				var testcheck = $(this);
				if (testcheck.is(':checked')) {

					var temp = $('input:radio[name=theme]').filter(":checked").val()
					
					var templayer00 = L.geoJson();
					
					basemapclone.removeLayer(data[temp]);
					year = 'year00';
					
					L.geoJson(data[temp], {style: stylefunctions[temp]}).addTo(templayer00);
					templayer00.addTo(basemapclone);
				
					}
		
		
			});
			
			
			$('#dual_request_2004_cloned').click(function() {
			
				var testcheck = $(this);
				if (testcheck.is(':checked')) {

					var temp = $('input:radio[name=theme]').filter(":checked").val()
					
					var templayer04 = L.geoJson();
					
					basemapclone.removeLayer(data[temp]);
					year = 'year04';
					
					L.geoJson(data[temp], {style: stylefunctions[temp]}).addTo(templayer04);
					templayer04.addTo(basemapclone);
				
					}
		
		
			});
			
			
			
			$('#dual_request_2011_cloned').prop("checked",true);
			$('#dual_request_2011_cloned').click(function() {
			
				var testcheck = $(this);
				if (testcheck.is(':checked')) {

					var temp = $('input:radio[name=theme]').filter(":checked").val()
					
					var templayer11 = L.geoJson();
					
					basemapclone.removeLayer(data[temp]);
					year = 'year11';
					
					L.geoJson(data[temp], {style: stylefunctions[temp]}).addTo(templayer11);
					templayer11.addTo(basemapclone);
				
					}
		
		
			});
			

		//$('.accordion_level32').show('blind', 100);
	});
	//Selection - Radio button


	$('.accordion_level123').hide();
	$('.accordion_level124').hide();
	$('.accordion_level125').hide();
	$('.accordion_level126').hide();

	//-------------------------------------------------------Menu-------------------------------------------------------//
	$('#home_button').click(function(){ window.location = '../index.html'});
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
		console.log(basemap.hasLayer(patternLayer));
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
		//Remove Layers from other Views
		if (basemap.hasLayer(barChartsLayer)===true) {
			basemap.removeLayer(barChartsLayer);
		}
		if (basemap.hasLayer(patternLayer)===true) {
    		basemap.removeLayer(patternLayer);
 			basemapclone.removeLayer(patternLayer);
		}
		//console.log(basemap.hasLayer(patternLayer));

		//Add Legend
		//$("#legend_basemap").clone(true).attr('id', 'legend_basemapclone').appendTo("#basemapclone");
		//$("#current_users").clone(false).find("*[id]").andSelf().each(function() { $(this).attr("id", $(this).attr("id") + "_cloned"); });
		
		
		$("#legend_dual").clone(true).appendTo("#basemapclone").find("*[id]").andSelf().each(function() { $(this).attr("id", $(this).attr("id") + "_cloned"); });
		//$("#legend_dual").clone(true).appendTo("#basemapclone");
		$('#dual_container_electricityconsumption').hide(); 
		$('#dual_container_electricityprice').hide(); 
		$('#dual_request_grossnationalproduct').hide(); 
		$('#dual_request_populationdensity').hide(); 
		$('#dual_container_lightpollution_cloned').hide(); 
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
		basemap.setView([51, 12], 0); //Sets the initial view of the map (geographical center and zoom)
		//Remove Layers from other Views
		if (basemap.hasLayer(patternLayer)===true) {
			basemap.removeLayer(patternLayer);
		}
		basemap.removeLayer(light_layer);
		$('.accordion_level121').hide();
		$('#single_request_lightpollution').off()
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
		//Remove Layers from other Views
		if (basemap.hasLayer(barChartsLayer)===true) {
			basemap.removeLayer(barChartsLayer);
		}
		//Add Pattern Layer
		stripes1.addTo(basemap);
		stripes2.addTo(basemap);
		stripes3.addTo(basemap);
		stripes4.addTo(basemap);
		stripes5.addTo(basemap);
		stripes6.addTo(basemap);
		stripes7.addTo(basemap);
	    function myStyle(feature) {
	      return {
	        weight: 0.5,
	        color: 'white',
	        smoothFactor: 0,
	        opacity: 0,
	        fillOpacity: 1,
	        fillPattern: getPatternDense_light(feature.properties[year])
	      };
	    }
	    patternLayer = L.geoJson(lightpollution);
	    patternLayer.setStyle(myStyle);
	    patternLayer.addTo(basemap);
	}

	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////// 								   			  	     SingleView BarCharts     				        			   /////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$("#singleview_request_barcharts").prop('checked',false);
	var barChartsLayer = L.geoJson();
	var barChartMarker = [];
	
	console.log (year);
	$('#singleview_request_barcharts').click(function() {
			var barchartschecked = $(this);
			if (barchartschecked.is(':checked')) {
				//Use right folder based on selected year
				//year='year96';
				console.log('in the barcharts function:' + year);
				switch(year) {
				    case 'year96':
				        barchartsFile=barcharts1996;
				        break;
				    case 'year00':
				        barchartsFile=barcharts2000;
				        break;
				    case 'year04':
				        barchartsFile=barcharts2004;
				        break;
				    case 'year11':
				        barchartsFile=barcharts2011;
				        break;
				}

				//Create the barcharts
				//Set options for each country separately
				$('.accordion_level122').slideToggle();
				var options = [];
				for (i = 0; i < countriescentroids1996.length; i++) { 
				    options.push({
					    data: {
					        'electricityconsumption': barchartsFile[i].electricityconsumption,
					        'electricityprice': barchartsFile[i].electricityprice,
					        'gnp': barchartsFile[i].gnp,
					        'popdensity': barchartsFile[i].popdensity
					    },
					    chartOptions: {
					        'electricityconsumption': {
					            fillColor: '#7A0177',
					            minValue: 0,
					            maxValue: 200,
					            maxHeight: 200,
					            displayText: function (value) {
					                return value.toFixed(2);
					            }
					        },
					        'electricityprice': {
					            fillColor: '#F6861F',
					            minValue: 0,
					            maxValue: 200,
					            maxHeight: 200,
					            displayText: function (value) {
					                return value.toFixed(2);
					            }
					        },
					        'gnp': {
					            fillColor: '#A75E34',
					            minValue: 0,
					            maxValue: 200,
					            maxHeight: 200,
					            displayText: function (value) {
					                return value.toFixed(2);
					            }
					        },
					        'popdensity': {
					            fillColor: '#990501',
					            minValue: 0,
					            maxValue: 200,
					            maxHeight: 200,
					            displayText: function (value) {
					                return value.toFixed(2);
					            }
					        }
					    },
					    weight: 1,
					    color: '#000000',
					    fillOpacity: 1
					}); 
				//Add BarChart on the Map
				barChartMarker[i] = new L.BarChartMarker(new L.LatLng(barchartsFile[i].latitude, barchartsFile[i].longitude), options[i]);
				barChartMarker[i].addTo(barChartsLayer);
				barChartsLayer.addTo(basemap).bringToFront();
				}
			}
			else {
				$('.accordion_level122').slideToggle();
				basemap.removeLayer(barChartsLayer);
			}
		});
		
  }
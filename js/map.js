function initialize() {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////									Initialise Map View       									   /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	  
	//Set Projection	  
	var crs = new L.Proj.CRS('epsg:102014',
	  '+proj=lcc +lat_1=43 +lat_2=62 +lat_0=30 +lon_0=10 +x_0=0 +y_0=0 +ellps=intl +units=m +no_defs',
	  {
	  	resolutions: [
	 		4096, 2048, 1024, 512
	  		],
	  })
	//Add basemap	
	basemap = new L.Map('basemap', {
	  	crs: crs,
	  	worldCopyJump: true
	}); 
	//Call basemap from wms (qgis cloud)	
	L.tileLayer.wms('http://wms.qgiscloud.com/paneff/basemap', {
	  	format: 'image/png',
		layers: 'basemap',
	 	maxZoom: 4,
	  	minZoom: 0,
		continuousWorld: true
	}).addTo(basemap);  
	//Set initial view (geographical center and zoom)
	basemap.setView([51, 12], 0);
	//Add mouseposition indicator	  
	L.control.mousePosition().addTo(basemap);

	//Declare variables etc that should be global
	var barChartsLayer = L.geoJson();
	var patternLayer = L.geoJson();
	var overlaySelectedCheckboxes=[];
	var overlaySelectedRadioButton=[];
	var toBeFilled=[];
	var toBePatterned=[];
	var respLayer_col=[];
	var respLayer_pat=[];
	var respLayer_temp=[];
	var barChartsClicked=false;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////												Styles       									   /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	  

/////////////////////////////////////							Stripes for the Overlay View       									   /////////////////////////////////////

   		var stripes1 = new L.StripePattern({
	  		weight: 0.5,
	        angle: 45,
		    color: 'black'
	    });
	    

	    var stripes2 = new L.StripePattern({
	      	weight: 1,
	        angle: 45,
		    color: 'black'
	    });
	    

	    var stripes3 = new L.StripePattern({
	      	weight: 1.5,
	        angle: 45,
		    color: 'black'
	    });
	    

	    var stripes4 = new L.StripePattern({
	        weight: 2,
	        angle: 45,
		    color: 'black'
	    });
	    

	    var stripes5 = new L.StripePattern({
	        weight: 3,
	        angle: 45,
		    color: 'black'
	    });
	    

	    var stripes6 = new L.StripePattern({
	        weight: 4,
	        angle: 45,
		    color: 'black'
	    });
	    

	    var stripes7 = new L.StripePattern({
	        weight: 5,
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
/////////////////////////////////////							       			or stripes 		     			     		      ///////////////////////////////////// 
    function getColorlight(c) {
  		return c > 200	   ? '#f7fbff' :
  	           c > 130 	   ? '#c6dcf0' :
  			   c > 100     ? '#6fb1d6' :
  			   c > 50      ? '#2277ba' :
  						     '#042e6d' ;
      	}

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

	function getPatternDense_density(c) {
		return c > 170 ? stripes1 :
	           c > 140 ? stripes2 :
			   c > 110 ? stripes3 :
			   c > 80  ? stripes4 :
			   c > 50  ? stripes5 :
			   c > 1   ? stripes6 :
						 stripes7 ;
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

	function getPatternDense_gnp(c) {
		return c > 170 ? stripes1 :
			   c > 140 ? stripes2 :
			   c > 110 ? stripes3 :
			   c > 80  ? stripes4 :
			   c > 50  ? stripes5 :
			   c > 1   ? stripes6 :
						 stripes7 ;
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

	function getPatternDense_price(c) {
	return c > 170 ? stripes1 :
		   c > 140 ? stripes2 :
		   c > 110 ? stripes3 :
		   c > 80  ? stripes4 :
		   c > 50  ? stripes5 :
		   c > 1   ? stripes6 :
					 stripes7 ;
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

	function getPatternDense_consumption(c) {
	return c > 170 ? stripes1 :
		   c > 140 ? stripes2 :
		   c > 110 ? stripes3 :
		   c > 80  ? stripes4 :
		   c > 50  ? stripes5 :
		   c > 1   ? stripes6 :
					 stripes7 ;
		}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////// 															Single View										   /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////                                                             Basemap                                         /////////////////////////////////////////
	//Call satellite image from wms
	var satellite = L.tileLayer.wms('http://geocarto.ethz.ch/cgi-bin/satellite_image/qgis_mapserv.fcgi', {
	  	format: 'image/png',
		layers: 'satellite_image',
	 	maxZoom: 4,
	  	minZoom: 0,
		continuousWorld: true
	})
	//Declare and Initialise Layers (for both single and dual views)
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
	
	//Retrieve data from js other js files (json or geojson format)
	var data = {
		gnp: gnp,
		price: price,
		lightpollution: lightpollution,
		conspumtion: consumption,
		density: density
		}

	//????????????????????????????	
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

		}

	

	function resetHighlight(e) {
		geojson.resetStyle(e.target);
		//info.update();
	}
		
		
		var geojson;
		// ... our listeners
		geojson = L.geoJson();
		
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
		//Hide legend for overlay view
		$("#overlayview_legend").hide();

//////////////////////                                                           BasemapClone                                       /////////////////////////////////////////
	//Add basemapclone
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
	  
	basemapclone.setView([51, 12], 0);
	  
	L.control.mousePosition().addTo(basemapclone);

//////////////////////                                                      Basemap Clone Legend                                   /////////////////////////////////////////
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
	//Hide selection options
	$('.accordion_level12').hide();
	$('.accordion_level121').hide();
	$('.accordion_level122').hide();
	// $('.accordion_level22').hide();
	// $('.accordion_level221').hide();
	// $('.accordion_level222').hide();
	// $('.accordion_level23').hide();
	$('.accordion_level32').hide();


/////////////////////////////////                                                      Select Theme                                  /////////////////////////////////////////
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
			
		
			$("#graphtext_infograph img:last-child").remove()
			$( "p" ).empty();
			$('<p>This data shows how much electric energy the people consume in the different years. It is measured in tonnes of oil equivalent. Tonnes of oil equivalent, abbreviated as toe, is a normalized unit of energy. By convention it is equivalent to the approximate amount of energy that can be extracted from one tonne of crude oil. It is a standardized unit, assigned a net calorific value of 41 868 kilojoules/kg and may be used to compare the energy from different sources. (Eurostat 2015) The averages in Europe which represents 100% are: </p><p>The europe averages:</p>1996	486	kg oil equivalent/habitant<p>2000	540	kg oil equivalent /habitant</p><p>2004	577	kg oil equivalent /habitant</p><p>2011	644	kg oil equivalent /habitant</p>').appendTo('#infotext_infograph');
			$('<p>Relation between Lightpollution and consumption</p>').appendTo('#graph_infograph');
			$('#graphtext_infograph').prepend('<img id="consumption11" alt = "testtest" img src="../data/graphs/consumption_lightpollution.png" style="width:450px;height:230px">')
		
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
			
			$("#graphtext_infograph img:last-child").remove()
			$( "p" ).empty();
			$('<p>The data source of the price is a survey from EUROSTAT, where they show the price for electricity of the households in Euro/kwh. The average prices in Europe over the years are:</p><p> 1996	0.048	euro/kwh</p><p>2000	0.049	euro/kwh</p><p>2004	0.063	euro/kwh</p><p>2011	0.098	euro/kwh</p> ').appendTo('#infotext_infograph');
			$('<p>Relation between Lightpollution and electricity price</p>').appendTo('#graph_infograph');
			$('#graphtext_infograph').prepend('<img id="price11" alt = "Price" img src="../data/graphs/price_lightpollution.png" style="width:450px;height:230px">')
			
			
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
			$("#graphtext_infograph img:last-child").remove()
			$( "p" ).empty();
			$('<p>“is the market value of all the products and services produced in one year by labour and property supplied by the citizens of a country”(Wikipedia 2015) The atlas shows for each country and year the percentage in relation to the whole Europe. </p>').appendTo('#infotext_infograph');
			$('<p>Relation between Lightpollution and GNP</p>').appendTo('#graph_infograph');
			$('#graphtext_infograph').prepend('<img id="gnp11" alt = "testtest" img src="../data/graphs/gnp_lightpollution11.png" style="width:450px;height:230px">')
			
			
		});	
		
		//Check and disable the checkbox

		//density
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
			
			$("#graphtext_infograph img:last-child").remove()
			$( "p" ).empty();
			$('<p>The population density is measured in habitants/m2 The average in Europe shows 100% in each year.</p><p>The densityaverages of europe are:</p><p>1996	91.2	inhab./km2</p><p>2000	90.8	inhab./km2</p><p>2004	91.3	inhab./km2</p><p>2011	91.1	inhab./km2</p>').appendTo('#infotext_infograph');
			$('<p>Relation between Lightpollution and GNP</p>').appendTo('#graph_infograph');
			$('#graphtext_infograph').prepend('<img id="density11" alt = "testtest" img src="../data/graphs/density_lightpollution11.png" style="width:450px;height:230px">')
		
		});
		
		
		// Single view - If satellite image checkbox is checked
		//close light pollution layer and legend, disable year selection and check the respective year
		$('#satellite_image').prop("checked",false);
		$('#satellite_image').click(function() {
			
			var testcheck7 = $(this);
			
			if (testcheck7.is(':checked')) {
				satellite.addTo(basemap);
				$('.accordion_level32').show();
				$('#legend_basemap input[type=radio]').prop("disabled",true);
				$('#singleview_request_2011').prop("checked",true); //it only checks the radiobutton of the respective year
				
				if (basemap.hasLayer(single_light_layer)===true) {
					basemap.removeLayer(single_light_layer);
					$('.accordion_level121').hide();
					$('#single_request_lightpollution').prop("checked",false);
				}
			}
			
			else {
				$('#legend_basemap input[type=radio]').prop("disabled",false);
				basemap.removeLayer(satellite);
			}
				
				
			
			
		});
		
		// Single view - If light pollution checkbox is checked
		//close satellite image layer, enable year selection
		$('#single_request_lightpollution').prop("checked",false);
		$('#single_request_lightpollution').click(function() {
			
			var testcheck7 = $(this);
			
			if (testcheck7.is(':checked')) {
				year = 'year11'
				if (basemap.hasLayer(satellite)===true) {
					basemap.removeLayer(satellite);
					$('#satellite_image').prop("checked",false);
					$('#legend_basemap input').prop("disabled",false);
				}
				single_light_layer.addTo(basemap).bringToBack();
				$('.accordion_level121').slideToggle();
			}
			
			else {
				$('.accordion_level121').hide();
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
	//Once dualview_button is Clicked Change Height and Width of the divs Basemap, Basemapclone
	function dualview() {
		console.log(basemap.hasLayer(patternLayer));
		$('#basemap').height('100%');
		$('#basemap').width('50%');
		basemap.invalidateSize();
		basemap.setView([51, 12], 0); //Sets the initial view of the map (geographical center and zoom)
		$('#basemapclone').css({"position": "absolute", "left": "50%"});
		$('#basemapclone').height('100%');
		$('#basemapclone').width('50%');
		basemapclone.invalidateSize();
		basemapclone.setView([51, 12], 0); //Sets the initial view of the map (geographical center and zoom)
		basemap.sync(basemapclone);
		basemapclone.sync(basemap);
		$("#legend_basemap").hide();
		$("#legend_dual").show();
		$('.accordion_level12').hide();
		$('.accordion_level32').hide();
		$("#overlayview_legend").hide();
		$('[name="theme"]').prop('type', 'radio');
		//Remove Layers from other Views
		if (basemap.hasLayer(barChartsLayer)===true) {
			basemap.removeLayer(barChartsLayer);
		}
		if (basemap.hasLayer(patternLayer)===true) {
    		basemap.removeLayer(patternLayer);
		}
		if (basemap.hasLayer(single_light_layer)===true) {
			basemap.removeLayer(single_light_layer);
		}
		if (basemap.hasLayer(light_layer)===true) {
			basemap.removeLayer(light_layer);
		}
		if (basemap.hasLayer(consumption_layer)===true) {
			basemap.removeLayer(consumption_layer);
		}
		if (basemap.hasLayer(price_layer)===true) {
			basemap.removeLayer(price_layer);
		}
		if (basemap.hasLayer(gnp_layer)===true) {
			basemap.removeLayer(gnp_layer);
		}
		if (basemap.hasLayer(density_layer)===true) {
			basemap.removeLayer(density_layer);
		}
		if (basemap.hasLayer(satellite)===true) {
			basemap.removeLayer(satellite);
		}
		if (basemap.hasLayer(respLayer_col)===true) {
			basemap.removeLayer(respLayer_col);
		}
		if (basemap.hasLayer(respLayer_pat)===true) {
			basemap.removeLayer(respLayer_pat);
		}
		console.log(basemap.hasLayer(patternLayer));

		//Add Legend
		//$("#legend_basemap").clone(true).attr('id', 'legend_basemapclone').appendTo("#basemapclone");
		//$("#current_users").clone(false).find("*[id]").andSelf().each(function() { $(this).attr("id", $(this).attr("id") + "_cloned"); });
		
		
		$("#legend_dual").clone(true).appendTo("#basemapclone").find("*[id]").andSelf().each(function() { $(this).attr("id", $(this).attr("id") + "_cloned"); });
		//$("#legend_dual").clone(true).appendTo("#basemapclone");
		$('#dual_container_electricityconsumption').hide(); 
		$('#dual_container_electricityprice').hide(); 
		$('#dual_container_grossnationalproduct').hide(); 
		$('#dual_container_populationdensity').hide(); 
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
		$('.accordion_level121').hide();
		$('.accordion_level122').hide();
		$('.accordion_level32').hide();
		$("#overlayview_legend").hide();
		//Legend
		$('[name="theme"]').prop('type', 'checkbox');
		$('#legend_basemap input[type=radio]').prop("disabled",false);
		$('input').prop("checked",false);

		//Sets the initial view of the map
		basemap.setView([51, 12], 0);
		//Remove Layers from other Views
		if (basemap.hasLayer(barChartsLayer)===true) {
			basemap.removeLayer(barChartsLayer);
		}
		if (basemap.hasLayer(patternLayer)===true) {
    		basemap.removeLayer(patternLayer);
 			basemapclone.removeLayer(patternLayer);
		}
		if (basemap.hasLayer(single_light_layer)===true) {
			basemap.removeLayer(single_light_layer);
		}
		if (basemap.hasLayer(light_layer)===true) {
			basemap.removeLayer(light_layer);
		}
		if (basemap.hasLayer(consumption_layer)===true) {
			basemap.removeLayer(consumption_layer);
		}
		if (basemap.hasLayer(price_layer)===true) {
			basemap.removeLayer(price_layer);
		}
		if (basemap.hasLayer(gnp_layer)===true) {
			basemap.removeLayer(gnp_layer);
		}
		if (basemap.hasLayer(density_layer)===true) {
			basemap.removeLayer(density_layer);
		}
		if (basemap.hasLayer(satellite)===true) {
			basemap.removeLayer(satellite);
		}
		if (basemap.hasLayer(respLayer_col)===true) {
			basemap.removeLayer(respLayer_col);
		}
		if (basemap.hasLayer(respLayer_pat)===true) {
			basemap.removeLayer(respLayer_pat);
		}
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
		//Legend
		$("#legend_basemap").hide();
		$("#overlayview_legend").show();
		$('#basemap').height('100%');
		$('#basemap').width('100%');
		basemap.invalidateSize();
		$('#basemapclone').css({"position": "absolute", "left": "50%"});
		$('#basemapclone').height('100%');
		$('#basemapclone').width('0%');
		basemapclone.invalidateSize();
		basemap.setView([51, 12], 0); //Sets the initial view of the map (geographical center and zoom)

		//Uncheck the checkboxes and radios that had been checked before
		$('input').prop("checked",false);
		//Style buttons
		$("#selecttheme_button_overlayview").button({
           icons: {
              primary: "ui-icon-carat-1-s"
           }
        });
		$("#selectyear_button_overlayview").button({
	           icons: {
	              primary: "ui-icon-carat-1-s"
	           }
	        });
		$("#switchRepresentation_button").button({
           icons: {
              primary: "ui-icon-transfer-e-w"
           }
        });

        $('.accordion_level121').hide();
        $('.accordion_level123').hide();
        $('.accordion_level124').hide();
        $('.accordion_level125').hide();
        $('.accordion_level126').hide();
        $('.accordion_level32').hide();

		//Remove any layers added in other views
		if (basemap.hasLayer(barChartsLayer)===true) {
			basemap.removeLayer(barChartsLayer);
		}
		if (basemap.hasLayer(single_light_layer)===true) {
			basemap.removeLayer(single_light_layer);
		}
		if (basemap.hasLayer(light_layer)===true) {
			basemap.removeLayer(light_layer);
		}
		if (basemap.hasLayer(consumption_layer)===true) {
			basemap.removeLayer(consumption_layer);
		}
		if (basemap.hasLayer(price_layer)===true) {
			basemap.removeLayer(price_layer);
		}
		if (basemap.hasLayer(gnp_layer)===true) {
			basemap.removeLayer(gnp_layer);
		}
		if (basemap.hasLayer(density_layer)===true) {
			basemap.removeLayer(density_layer);
		}
		if (basemap.hasLayer(satellite)===true) {
			basemap.removeLayer(satellite);
		}
		if (basemap.hasLayer(patternLayer)===true) {
			basemap.removeLayer(patternLayer);
		}
		if (basemap.hasLayer(respLayer_col)===true) {
			basemap.removeLayer(respLayer_col);
		}
		if (basemap.hasLayer(respLayer_pat)===true) {
			basemap.removeLayer(respLayer_pat);
		}
		//If two themes are selected and a year are selected
		//Find which theme was selected first and depict it in colour fill
		//Find which was selected second and depict it in colour fill
		$('#overlayview_legend input').on('change', function (e) {
			if ($('input[type=checkbox]:checked').length > 2) {
						$(this).prop('checked', false);
						//alert("Only two layers can be selected in the overlay view!");
						bootbox.alert("Only two layers can be selected in the overlay view!");
					}
			overlaySelectedCheckboxes = [];
			$('#overlayview_legend input[type=checkbox]:checked').each(function() {
				overlaySelectedCheckboxes.push($(this).attr('id'));
			});
			toBeFilled=overlaySelectedCheckboxes[0];
			toBePatterned=overlaySelectedCheckboxes[1];
			if ($('input:checked').length===3){
				overlaySelectedRadioButton = [];
				$('#overlayview_legend input[type=radio]:checked').each(function() {
					overlaySelectedRadioButton=($(this).attr('id'));
				});
				//Find which year is selected
				switch(overlaySelectedRadioButton) {
					case "overlayview_request_1996":
						if(basemap.hasLayer(patternLayer)){
							basemap.removeLayer(patternLayer);
						}
						year='year96';
						break;
					case "overlayview_request_2000":
						if(basemap.hasLayer(patternLayer)){
							basemap.removeLayer(patternLayer);
						}
						year='year00';
						break;
					case "overlayview_request_2004":
						if(basemap.hasLayer(patternLayer)){
							basemap.removeLayer(patternLayer);
						}
						year='year04';
						break;
					case "overlayview_request_2011":
						if(basemap.hasLayer(patternLayer)){
							basemap.removeLayer(patternLayer);
						}
						year='year11';
						break;
				}
				//console.log(year);
				//Find which theme is selected first - Theme in colour fill
				switch(toBeFilled) {
					case "overlayview_request_lightpollution":

						respColourFun_col=lightpollution;
						respPatternFun_col=getPatternDense_light;
						respLayer_col=light_layer;
						respStyleFun_col='lightpollution';
						
						break;
					case "overlayview_request_electricityconsumption":
						respColourFun_col=consumption;
						respPatternFun_col=getPatternDense_consumption;
						respLayer_col=consumption_layer;
						respStyleFun_col='consumption';
						break;
					case "overlayview_request_electricityprice":
						respColourFun_col=price;
						respPatternFun_col=getPatternDense_price;
						respLayer_col=price_layer;
						respStyleFun_col='price';
						break;
					case "overlayview_request_grossnationalproduct":
						respColourFun_col=gnp;
						respPatternFun_col=getPatternDense_gnp;
						respLayer_col=gnp_layer;
						respStyleFun_col='gnp';
						break;
					case "overlayview_request_populationdensity":
						respColourFun_col=density;
						respPatternFun_col=getPatternDense_density;
						respLayer_col=density_layer;
						respStyleFun_col='density';
						break;
				}
				L.geoJson(respColourFun_col, {style: stylefunctions[respStyleFun_col]}).addTo(respLayer_col);
				respLayer_col.addTo(basemap);
				//Find which theme is selected second - Theme in pattern fill
				switch(toBePatterned) {
					case "overlayview_request_lightpollution":
						respColourFun_pat=lightpollution;
						respPatternFun_pat=getPatternDense_light;
						respLayer_pat=light_layer;
						respStyleFun_pat='lightpollution';
						break;
					case "overlayview_request_electricityconsumption":
						respColourFun_pat=consumption;
						respPatternFun_pat=getPatternDense_consumption;
						respLayer_pat=consumption_layer;
						respStyleFun_pat='consumption';
						break;
					case "overlayview_request_electricityprice":
						respColourFun_pat=price;
						respPatternFun_pat=getPatternDense_price;
						respLayer_pat=price_layer;
						respStyleFun_pat='price';
						break;
					case "overlayview_request_grossnationalproduct":
						respColourFun_pat=gnp;
						respPatternFun_pat=getPatternDense_gnp;
						respLayer_pat=gnp_layer;
						respStyleFun_pat='gnp';
						break;
					case "overlayview_request_populationdensity":
						respColourFun_pat=density;
						respPatternFun_pat=getPatternDense_density;
						respLayer_pat=density_layer;
						respStyleFun_pat='density';
						break;
				}
				//Add Pattern Layer
				stripes1.addTo(basemap);
				stripes2.addTo(basemap);
				stripes3.addTo(basemap);
				stripes4.addTo(basemap);
				stripes5.addTo(basemap);
				stripes6.addTo(basemap);
				stripes7.addTo(basemap);
			    function myPatternStyle(feature) {
			      return {
			        weight: 0.5,
			        color: 'white',
			        smoothFactor: 0,
			        opacity: 0,
			        fillOpacity: 1,
			        fillPattern: respPatternFun_pat(feature.properties[year])
			      };
			    }
			    patternLayer = L.geoJson(respColourFun_pat);
			    patternLayer.setStyle(myPatternStyle);
			    patternLayer.addTo(basemap);
			    console.log('pattern layer added');
			}
			else{
				console.log($('input:checked').length);
			}
		});
		//When switch button is clicked switch the representation
		document.getElementById("switchRepresentation_button").addEventListener("click", switchRepresentation);
		function switchRepresentation() {
			console.log('switch button clicked');
			basemap.removeLayer(patternLayer);
			basemap.removeLayer(respLayer_col);
			basemap.removeLayer(respLayer_pat);

			L.geoJson(respColourFun_pat, {style: stylefunctions[respStyleFun_pat]}).addTo(respLayer_pat);
			respLayer_pat.addTo(basemap);

			respColourFun_temp=respColourFun_pat;
			respPatternFun_temp=respPatternFun_pat;
			respLayer_temp=respLayer_pat;
			respStyleFun_temp=respStyleFun_pat;

			respColourFun_pat=respColourFun_col;
			respPatternFun_pat=respPatternFun_col;
			respLayer_pat=respLayer_col;
			respStyleFun_pat=respStyleFun_col;

			function myPatternStyle(feature) {
		      return {
		        weight: 0.5,
		        color: 'white',
		        smoothFactor: 0,
		        opacity: 0,
		        fillOpacity: 1,
		        fillPattern: respPatternFun_col(feature.properties[year])
		      };
		    }
		    patternLayer = L.geoJson(respColourFun_col);
		    patternLayer.setStyle(myPatternStyle);
		    patternLayer.addTo(basemap);

			respColourFun_col=respColourFun_temp;
			respPatternFun_col=respPatternFun_temp;
			respLayer_col=respLayer_temp;
			respStyleFun_col=respStyleFun_temp;
		}
	}

	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////// 								   			  	     SingleView BarCharts     				        			   /////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//$("#singleview_request_barcharts").prop('checked',false);
	var barChartMarker = [];
	
	$('#singleview_request_barcharts').click(function() {
		
			var barchartschecked = $(this);
			if (barchartschecked.is(':checked')) {
				//Use right folder based on selected year
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

				barChartsClicked=true;
				//Remove any layers added in other views
				basemap.removeLayer(barChartsLayer);
				
				console.log(basemap.hasLayer(barChartsLayer)===true);
				//console.log('in the barcharts function:' + year);

				var options = [];
				for (i = 0; i < barchartsFile.length; i++) { 
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
					            displayName: "<b>"+barchartsFile[i].name + "</b> <hr>Electricity Consumption",
					            displayText: function (value) {
					                return value.toFixed(2)+"%";
					            }
					        },
					        'electricityprice': {
					            fillColor: '#F6861F',
					            minValue: 0,
					            maxValue: 200,
					            maxHeight: 200,
					            displayName: "<b>"+barchartsFile[i].name + "</b> <hr>Electricity Price",
					            displayText: function (value) {
					                return value.toFixed(2)+"%";
					            }
					        },
					        'gnp': {
					            fillColor: '#A75E34',
					            minValue: 0,
					            maxValue: 200,
					            maxHeight: 200,
					            displayName: "<b>"+barchartsFile[i].name + "</b> <hr>Gross National Product",
					            displayText: function (value) {
					                return value.toFixed(2)+"%";
					            }
					        },
					        'popdensity': {
					            fillColor: '#990501',
					            minValue: 0,
					            maxValue: 200,
					            maxHeight: 200,
					            displayName: "<b>"+barchartsFile[i].name + "</b> <hr>Population Density",
					            displayText: function (value) {
					                return value.toFixed(2)+"%";
					            }
					        }
					    },
					    weight: 1,
					    color: '#000000',
					    fillOpacity: 1
					}); 
				//Add BarChart on the Map
				if (basemap.hasLayer(barChartsLayer)){
					basemap.removeLayer(barChartsLayer);
				}
				barChartMarker[i] = new L.BarChartMarker(new L.LatLng(barchartsFile[i].latitude, barchartsFile[i].longitude), options[i]);
				barChartMarker[i].addTo(barChartsLayer);
				barChartsLayer.addTo(basemap).bringToFront();
				}
			}
			else {
				$('.accordion_level122').slideToggle();
				basemap.removeLayer(barChartsLayer);
				barChartsClicked=false;
			}
		});
		
  }
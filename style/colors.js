function colors() {  	
	
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
  					fillColor: getColorlight(feature.properties.testsum)
  				};
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
					
}
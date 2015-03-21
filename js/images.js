jQuery(document).ready(function ($) {
	var _CaptionTransitions = [];
	_CaptionTransitions["CLIP|L"] = { $Duration: 600, $Clip: 1, $Easing: $JssorEasing$.$EaseInOutCubic };

	var options = {
	    $AutoPlay: true,                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
	    $DragOrientation: 3,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 
	    													//(Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)
	    $CaptionSliderOptions: {                            //[Optional] Options which specifies how to animate caption
	        $Class: $JssorCaptionSlider$,                   //[Required] Class to create instance to animate caption
	        $CaptionTransitions: _CaptionTransitions,       //[Required] An array of caption transitions to play caption, see caption transition section at jssor slideshow transition builder
	        $PlayInMode: 1,                                 //[Optional] 0 None (no play), 1 Chain (goes after main slide), 3 Chain Flatten (goes after main slide and flatten all caption animations), default value is 1
	        $PlayOutMode: 3                                 //[Optional] 0 None (no play), 1 Chain (goes before main slide), 3 Chain Flatten (goes before main slide and flatten all caption animations), default value is 1
	    }
	};

    var jssor_slider2 = new $JssorSlider$("slider2_container", options);

    //responsive slider code
    function ScaleSlider() {
		//reserve blank width for margin+padding: margin+padding-left (10) + margin+padding-right (10)
	    var paddingWidth = 20;
		//minimum width should reserve for text
		var minReserveWidth = 225;
		var parentElement = jssor_slider2.$Elmt.parentNode;
		//evaluate parent container width
	    var parentWidth = parentElement.clientWidth;
		if (parentWidth) {
		//exclude blank width
	    var availableWidth = parentWidth - paddingWidth;
	    //calculate slider width as 70% of available width
	    var sliderWidth = availableWidth * 0.6;
		//slider width is maximum 700
	    sliderWidth = Math.min(sliderWidth, 700);
		//slider width is minimum 200
	    sliderWidth = Math.max(sliderWidth, 200);
	    var clearFix = "none";
		//evaluate free width for text, if the width is less than minReserveWidth then fill parent container
            if (availableWidth - sliderWidth < minReserveWidth) {
                //set slider width to available width
                sliderWidth = availableWidth;
                //slider width is minimum 200
                sliderWidth = Math.max(sliderWidth, 200);
                clearFix = "both";
            }
            //clear fix for safari 3.1, chrome 3
            $('#clearFixDiv').css('clear', clearFix);
            jssor_slider2.$ScaleWidth(sliderWidth);
        }
        else
            window.setTimeout(ScaleSlider, 30);
    }
    //Scale slider immediately
    ScaleSlider();

    $(window).bind("load", ScaleSlider);
    $(window).bind("resize", ScaleSlider);
    $(window).bind("orientationchange", ScaleSlider);
    //responsive code end
});
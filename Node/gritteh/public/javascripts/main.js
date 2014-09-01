$(document).ready(function(){
	// get the initial load
	//initialize the slider
	//sandbox.spacebrew.cc
	var sb = new Spacebrew.Client( 'sandbox.spacebrew.cc', "KittehCattroller_JS", "Connecting for Cattroller" );
	
	var loader = $('.cover');

	sb.onStringMessage = function onString( name, value ) 
	{
		console.log("got the message"+name+" "+value);
		if(name=="scroll")
		{
			nextItem();
		}

		if(name == "select")
		{

			saveItem();
		}
	};
	sb.addPublish("scroll","string");
	sb.addPublish("select","string");
	sb.addSubscribe( "scroll","string" );
	sb.addSubscribe( "select","string" );

	sb.connect();


	$('.stacey').click(function(event)
	{
		event.stopPropagation();
		console.log("button clicked")
		sb.send("scroll","string","true");

	})

	var url ='';
	var slider = $('.slider').slick({
  		dots: false,
  		infinite: false,
  		speed: 500,
  		fade: true,
  		slide: 'div',
  		lazyload:'ondemand',
  		cssEase: 'linear',
  		onAfterChange:function(obj)
  		{
  			var currentSlide = obj.currentSlide;
  			if(currentSlide == obj.slideCount-1)
  			{


  				getResults();
  			}
  		}
  		
	});

	function nextItem()
	{
		//slider.slickNext();
		saveItem();
	}

	function saveItem(){

		$('.cover').addClass('cover-fade-up');
		var slide = $('.slick-active');
		var url = $(slide).find('img').attr('src');
		var serviceUrl = "http://localhost:3000/saveimage/"+encodeURIComponent(url);

		//throw up a loading thing here
		$.getJSON( serviceUrl, function( data ) {
			console.log("shit done already")
			$('.cover').addClass("cover-fade-down");
		});

	}

	getResults();

	function getResults()
	{
		console.log("sht")
		var serviceUrl = "http://localhost:3000/images/"+encodeURIComponent(url);
	
		$.getJSON( serviceUrl, function( data ) {
			console.log(data);
			url = data.pagination.next_url;
  			var len = data.data.length;
  			var d = data.data;
  			// remove slides
  			console.log('stacey',slider)
  			var items = $('.slick-slide');
  			if(items.length)
  			{
  					var len = items.length -1;
  			
  					var count = len;
	  				while(count--)
	  				{
	  					slider.slickRemove(count);
	  				}

  			}

		for(var i=0;i<len;i++)
		{
			var image = d[i].images.standard_resolution;
			var html = "<div class='item'><img src='"+image.url+"'/></div>";

			slider.slickAdd(html)
			
		}
	})	

	}
	


	

})
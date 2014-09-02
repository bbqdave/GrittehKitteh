$(document).ready(function(){
	// get the initial load
	//initialize the slider
	//sandbox.spacebrew.cc
	var sb = new Spacebrew.Client( '127.0.0.1', "KittehCattroller_JS", "Connecting for Cattroller" );

	var loader = $('.cover');

	var isSaving = false;

	var isSliding = false;

	sb.onStringMessage = function onString( name, value ) 
	{
		console.log("got the message"+name+" "+value);
		if(name =="selection" && value == "scroll")
		{
			nextItem();
		}

		if(name == "selection" && value =="select")
		{

			saveItem();
		}
	};
	sb.addPublish("download","string");
	sb.addSubscribe("selection","string");
	
	sb.connect({reconnect:true,port:'9000'});

	sb.onOpen = function(){

		console.log("connected");
	}

	sb.onClose = function(evt){

		console.log("closed")
	}


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
  			isSliding = false;
  			var currentSlide = obj.currentSlide;
  			if(currentSlide == obj.slideCount-1)
  			{


  				getResults();
  			}
  		}
  		
	});

	function nextItem()
	{
		if(!isSliding){
			slider.slickNext();
		}
		
	}

	function saveItem(){

		if(isSaving){return;}
		isSaving = true;
		$('.cover').addClass('cover-fade-up');
		var slide = $('.slick-active');
		var url = $(slide).find('img').attr('src');
		var serviceUrl = "http://localhost:3000/saveimage/"+encodeURIComponent(url);

		//throw up a loading thing here
		$.getJSON( serviceUrl, function( data ) {
			console.log("shit done already")
			$('.cover').addClass("cover-fade-down");
			isSaving = false;
		});

	}

	getResults();

	function getResults()
	{
		$('.cover').addClass('cover-fade-up');
		var serviceUrl = "http://localhost:3000/images/"+encodeURIComponent(url);
	
		$.getJSON( serviceUrl, function( data ) {
			$('.cover').addClass('cover-fade-down');
			url = data.pagination.next_url;
  			var len = data.data.length;
  			var d = data.data;
  			// remove slides
  		
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
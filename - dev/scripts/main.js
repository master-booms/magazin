
var SliderWidget = (function(){

	var _insertValues = function($this) {
		var
			container = $this.closest('.accordeon__slider'),
			from = container.find('.accordeon__slider-input_from'),
			to = container.find('.accordeon__slider-input_to');

		var values = $this.slider('option', 'values');

		from.val(values[0]);
		to.val(values[1]);
	}

	return {
		init: function(){

			$('.accordeon__slider-element').each(function(){
				var
					$this = $(this),
					min = parseInt($this.data('min')),
					max = parseInt($this.data('max'));

				$this.slider({
					range: true,
					min: min,
					max: max,
					values: [min, max],
					slide: function() {
						_insertValues($this);
					},
					create: function(){
						_insertValues($this);
					}
				});
			});
		}
	}
}());

SliderWidget.init();

/*----------------------View Box Begin--------------*/

var viewStateChange = (function() {

	var _previousClass = '';

	var _changeState = function  ($this) {
		
		var

		item = $this.closest('.sort__view-item'),
		view = item.data('view'),
		listOfItems = $('#products-list'),
		modificationPrefix = 'products__list_',
		classOfViewState = modificationPrefix + view;

		if (_previousClass == '') {
			_previousClass = listOfItems.attr('class');
		}
		_changeActiveClass($this);
		listOfItems.attr('class', _previousClass + ' ' + classOfViewState);
	};


	var _changeActiveClass = function($this) {
		$this
			.closest('.sort__view-item').addClass('active')
			.siblings().removeClass('active');
	}
	return {
	init: function() {
		$('.sort__view-link').on('click', function(e) {
				e.preventDefault();
				_changeState($(this));
			});
		}
	}
}());
/*----------------------Accordeon Begin-----------*/
$(document).ready(function() {
	$('.accordeon__title-trigger').on('click', function(e){
		event.preventDefault();
	
	var $this = $(this),
		item = $this.closest('.accordeon__item'),
		list = $this.closest('.accordeon__list'),
		items = list.find('.accordeon__item'),
		content = item.find('.accordeon__content'),
		otherContent = list.find('.accordeon__content'),
		duration = 300;

		if(!item.hasClass('active')) {
				items.removeClass('active');
				item.addClass('active');

				otherContent.stop(true, true).slideUp(duration);
				content.stop(true, true).slideDown(duration);
			} else {
				content.stop(true, true).slideUp(duration);
				item.stop(true, true).removeClass('active');
			}
		

	});
});
/*---------------------Accordeon End--------------*/



/*----------------------View Box End--------------*/

/*----------------------Slideshow Begin--------------*/

	var slideshow = (function  () {
		
		var _changeSlide = function  ($this) {
			var
				container = $this.closest('.products__slideshow'),
				path = $this.find('img').attr('src'),
				display = container.find('.products__slideshow-img');

				$this.closest('.products__slideshow-item').addClass('active')
					.siblings().removeClass('active');
				display.fadeOut(function () {
					$(this).attr('src', path).fadeIn();
				});
		}

		return {
			init: function  () {
				$('.products__slideshow-link').on('click', function(e) {

					e.preventDefault();

					var
						$this = $(this);

						_changeSlide($this);
			});
		}

	}
}());
/*----------------------Slideshow End--------------*/


$(document).ready(function() {

	if ($('.products__slideshow').length) {
		slideshow.init();
	}


/*----------------------Select2 Begin--------------*/
	viewStateChange.init();

	if ($('.sort__select-elem').length) {
		$('.sort__select-elem').select2({
			minimumResultsForSearch: Infinity
		});
	}
/*----------------------Select End--------------*/

/*----------------------Checkbox Reset Begin--------------*/
	$('.accordeon__reset').on('click', function  (e) {
		e.preventDefault();

		var 
			$this = $(this),
			container = $this.closest('.accordeon__item'),
			checkboxes = container.find('input:checkbox');

			checkboxes.each(function() {
				$(this).removeProp('checked');
			});
	});
/*----------------------Checkbox Reset End--------------*/


});
/*----------------------End--------------*/



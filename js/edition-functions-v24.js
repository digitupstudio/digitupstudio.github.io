//////////////////////////////////
//////////////////////////////////
//FUNCTION EDITION
$.getMultiScripts = function (arr, path) {
	var _arr = $.map(arr, function (scr) {
		return $.getScript((path || "") + scr);
	});

	_arr.push($.Deferred(function (deferred) {
		$(deferred.resolve);
	}));

	return $.when.apply($, _arr);
}
console.log('!!! edition-functions-v24 !!!');
var prtltmmcCkEditor = {
	config: {},
	textRemovePortlet: 'Are you sure to delete this portlet?',
	textRemoveElement: 'Are you sure to delete this element?',
	textAddElement: 'Add Element',
	textSortElement: 'Sort & Delete Box',
	init: function () {
		CKEDITOR.config.extraPlugins = 'toolbar';
		CKEDITOR.config.extraPlugins = 'youtube';
		prtltmmcCkEditor.createNewInstances();
		prtltmmcSliderHome.init();

		//sort and remove edition
		$('body').on('click', '.prtltmmc-sort-portlets', function (event) {
			$this = $(this);
			if ($this.hasClass('prtltmmc-on')) {
				//exit of sort
				$this.removeClass('prtltmmc-on');
				$('.prtltmmc-global-wrap-web, .prtltmmc-edition-toolbar').removeClass('prtltmmc-sorting');
				$('.prtltmmc-content-portlets').sortable('destroy');
				$('.prtltmmc-global-wrap-web').css('height', 'inherit');
				//exit of delete
				$('.prtltmmc-content-portlets .prtltmmc-delete-element').remove();
			} else {
				//to sort
				$('.prtltmmc-sorting .prtltmmc-options-portlet').trigger('click');
				$this.addClass('prtltmmc-on');
				$('.prtltmmc-global-wrap-web, .prtltmmc-edition-toolbar').addClass('prtltmmc-sorting');
				setTimeout(function () {
					$('.prtltmmc-global-wrap-web').css('height', $('.prtltmmc-content-portlets').height() + 40);
				}, 5)
				$(window).scrollTop(0);
				$('.prtltmmc-content-portlets').sortable({
					axis: 'y',
					items: '[data-portlet]',
					scroll: true,
					scrollSensitivity: 10,
					scrollSpeed: .3,
					opacity: 0.6,
					cursor: 'move',
					tolerance: 'pointer',
					placeholder: "prtltmmc-portlet-sort-placeholder",
					start: function (event, ui) {
					},
					sort: function (event, ui) {
						var currentScrollTop = $(window).scrollTop(),
							topHelper = ui.position.top,
							delta = topHelper - currentScrollTop;
						setTimeout(function () {
							$(window).scrollTop(currentScrollTop + delta);
						}, 5);
					},
					stop: function (event, ui) {
						setTimeout(function () {
							$(ui.item).css('z-index', 'inherit');
							$(window).scrollTop($(ui.item).position().top - 100);
						}, 5)
					}
				});
				//to delete
				$('.prtltmmc-content-portlets > [data-portlet]').each(function (index) {
					$(this).prepend('<div class="prtltmmc-delete-element prtltmmc-delete-portlet"></div>');
				});
			};

		});

		//delete portlet
		$('body').on('click', '.prtltmmc-delete-portlet', function (event) {
			$portlet = $(this).closest('[data-portlet]');
			var answer = confirm(prtltmmcCkEditor.textRemovePortlet);
			if (answer) {
				$portlet.remove();
				$('.prtltmmc-global-wrap-web').css('height', $('.prtltmmc-content-portlets').height() + 40);
			};
		});

		// TODO:
		//sort boxes
		$('body').on('click', '.prtltmmc-sorting .prtltmmc-options-portlet, .prtltmmc-sorting .prtltmmc-options-portlet-digitup', function (event) {
			console.log('Click!!! close');
			$portlet = $(this).closest('[data-portlet]');
			$portlet.removeClass('prtltmmc-sorting');
			$portlet.find('.prtltmmc-row-boxes-outstand').sortable('destroy');
			$portlet.find('.prtltmmc-delete-element').remove();
			$('.prtltmmc-edition-toolbar').show();
			copyTabsUrlToApi();
			event.stopPropagation();
		});

		$('body').on('click', '.prtltmmc-sort-boxes', function (event) {
			copyTabsUrlToApi();
			event.preventDefault();
			$portlet = $(this).closest('[data-portlet]');
			$portlet.addClass('prtltmmc-sorting');
			$boxes = $portlet.find('.prtltmmc-cell-boxes-outstand');
			$boxes.prepend('<div class="prtltmmc-delete-element prtltmmc-delete-boxes"></div>');
			if ($('.diagonal-transparencies-theme').length > 0) {
				$portlet.find('.prtltmmc-row-boxes-outstand').sortable({
					scroll: true,
					scrollSensitivity: 10,
					scrollSpeed: .3,
					opacity: 0.6,
					containment: 'parent',
					cursor: 'move',
					tolerance: 'pointer',
					placeholder: "prtltmmc-portlet-sort-placeholder",
					start: function (event, ui) {
					},
					sort: function (event, ui) {
					},
					stop: function (event, ui) {
					}
				});
			} else {
				$portlet.find('.prtltmmc-row-boxes-outstand').sortable({
					scroll: false,
					axis: 'x',
					opacity: 0.6,
					containment: 'parent',
					cursor: 'move',
					tolerance: 'pointer',
					placeholder: "prtltmmc-portlet-sort-placeholder",
				});
			};
			$('.prtltmmc-edition-toolbar').hide();
		});

		//delete boxes
		$('body').on('click', '.prtltmmc-delete-boxes', function (event) {
			$box = $(this).closest('.prtltmmc-cell-boxes-outstand');
			var answer = confirm(prtltmmcCkEditor.textRemoveElement);
			if (answer) {
				$box.remove();
			};
		});

		//edition slider
		$('body').on('click', '.prtltmmc-slider-home:not(.prtltmmc-sorting) .prtltmmc-options-portlet', function (event) {
			event.preventDefault();
			$this = $(this);
			$portlet = $this.closest('[data-portlet]');
			$parentSlider = $this.closest('.prtltmmc-slider-home');
			if ($('.prtltmmc-slider-viewport').length > 0) {
				prtltmmcSliderHome.slider[$portlet.attr('id')]?.destroySlider();
			};
			$portlet.addClass('prtltmmc-sorting');
			$ulSlider = $portlet.find('.prtltmmc-global-content ul:not(.dropdown-menu)');
			$ulSlider.find('li').show();
			$ulSlider.find('li a').wrap('<div class="prtltmmc-contenteditable prtltmmc-link-image"></div>');
			$ulSlider.find('li .prtltmmc-description-slider').wrap('<div class="prtltmmc-contenteditable prtltmmc-description-slider"></div>');
			prtltmmcCkEditor.createNewInstances();
			prtltmmcCkEditor.sortSlider($ulSlider);
			$ulSlider.find('li').prepend('<div class="prtltmmc-delete-element prtltmmc-delete-slide"></div>');
			prtltmmcSliderHome.cleanParagraph($ulSlider);
			$('.prtltmmc-edition-toolbar').hide();
		});

		$('body').on('click', '.prtltmmc-slider-home.prtltmmc-sorting .prtltmmc-contenteditable.prtltmmc-description-slider', function (event) {
			$this = $(this);
			$ulSlider = $this.closest('.prtltmmc-global-content ul:not(.dropdown-menu)');
			$ulSlider.sortable('destroy');
			$this.focus();
		});

		$('body').on('blur', '.prtltmmc-slider-home.prtltmmc-sorting .prtltmmc-contenteditable.prtltmmc-description-slider', function (event) {
			$this = $(this);
			$ulSlider = $this.closest('.prtltmmc-global-content ul:not(.dropdown-menu)');
			prtltmmcCkEditor.sortSlider($ulSlider);
		});

		$('body').on('click', '.prtltmmc-slider-home.prtltmmc-sorting .prtltmmc-options-portlet .prtltmmc-add-images-slider', function (event) {
			$this = $(this);
			event.preventDefault();
			$portlet = $(this).closest('[data-portlet]');
			$ulSlider = $portlet.find('.prtltmmc-global-content ul:not(.dropdown-menu)');
			$newLiSlider = '<li><a href="#">' +
				'<img src="http://www.mundomarcruceros.com/img/Fotos-Landing/example-slider-01.jpg" class="prtltmmc-slider-responsive-xlarge"/>' +
				'<img src="http://www.mundomarcruceros.com/img/Fotos-Landing/example-slider-02.jpg" class="prtltmmc-slider-responsive-large"/>' +
				'<img src="http://www.mundomarcruceros.com/img/Fotos-Landing/example-slider-03.jpg" class="prtltmmc-slider-responsive-medium"/>' +
				'</a></li>';
			if ($this.closest('.prtltmmc-slider-with-descriptions').length > 0) {
				$newLiSlider = '<li><a href="#">' +
					'<img src="http://www.mundomarcruceros.com/img/Fotos-Landing/example-slider-01.jpg" class="prtltmmc-slider-responsive-xlarge"/>' +
					'<img src="http://www.mundomarcruceros.com/img/Fotos-Landing/example-slider-02.jpg" class="prtltmmc-slider-responsive-large"/>' +
					'<img src="http://www.mundomarcruceros.com/img/Fotos-Landing/example-slider-03.jpg" class="prtltmmc-slider-responsive-medium"/>' +
					'</a><div class="prtltmmc-contenteditable prtltmmc-description-slider"><p class="prtltmmc-description-slider">Lorem ipsum dolor sit amet</p></div></li>';
			};
			$ulSlider.append($newLiSlider);
			$ulSlider.find('li:last-child a').wrap('<div class="prtltmmc-contenteditable prtltmmc-link-image"></div>');
			$ulSlider.find('li:last-child').prepend('<div class="prtltmmc-delete-element prtltmmc-delete-slide"></div>');
			prtltmmcCkEditor.createNewInstances();
			//$ulSlider.sortable('refresh');
			$ulSlider.sortable('destroy');
			prtltmmcCkEditor.sortSlider($ulSlider);
			event.stopPropagation();
		});

		$('body').on('click', '.prtltmmc-slider-home.prtltmmc-sorting .prtltmmc-options-portlet', function (event) {
			$portlet = $(this).closest('[data-portlet]');
			$portlet.removeClass('prtltmmc-sorting');
			$ulSlider = $portlet.find('.prtltmmc-global-content ul:not(.dropdown-menu)');
			$ulSlider.find('li a').unwrap('p').unwrap('div');
			$ulSlider.find('li .prtltmmc-contenteditable p').addClass('prtltmmc-description-slider').unwrap('div');
			$ulSlider.find('li .prtltmmc-delete-element').remove();
			$ulSlider.sortable('destroy');
			$('.prtltmmc-edition-toolbar').show();
			prtltmmcSliderHome.init();
		});

		//delete slider
		$('body').on('click', '.prtltmmc-delete-slide', function (event) {
			$slide = $(this).closest('li');
			var answer = confirm(prtltmmcCkEditor.textRemoveElement);
			if (answer) {
				$slide.remove();
			};
		});

		// add-box
		$('body').on('click', '.prtltmmc-add-box', function (e) {
			e.preventDefault();

			var $wrapper = $(this).closest('.prtltmmc-boxes-outstand');
			if ($wrapper.length > 0) {

				var $el = $wrapper.find('.prtltmmc-cell-boxes-outstand').last().clone();

				$wrapper.find('.prtltmmc-row-boxes-outstand').append($el);
			}
		});

		function openImageChangeBox(clickedElement, imageClass, isVideo = false) {
			console.log('clickedElement', clickedElement);
			console.log('imageClass', imageClass);
			console.log('isVideo', isVideo);
			// Eliminar cualquier caja abierta anteriormente
			$('.image-change-box').remove();

			// Encontrar el padre con la clase 'prtltmmc-image-content'
			var parentElement = isVideo ? clickedElement.closest('.edit-option-video') : clickedElement.closest('.prtltmmc-image-content');

			// Obtener la URL actual de la imagen
			var currentImageUrl = parentElement.find(imageClass).attr(imageClass === '.edit_url' ? 'href' : 'src');

			// Crear la caja con el campo de entrada, botón de guardar y botón de cancelar
			var inputBoxHtml = `
					<div class="image-change-box" style="position: absolute; top: ${clickedElement.offset().top}px; left: ${clickedElement.offset().left - 700}px; width: 700px; padding: 10px; background-color: white; border: 1px solid black; border-radius: 8px; z-index: 1000;">
							<input type="text" id="newImageUrl" value="${currentImageUrl}" style="width: 100%; margin-bottom: 10px; border: solid 1px #000; border-radius: 4px;">
							<div style="text-align: right; margin-top: 8px;">
									<button id="saveImageChange" style="margin-right: 5px; background-color: green; color: white; border: none; padding: 5px 10px;">Guardar</button>
									<button id="cancelImageChange" style="background-color: red; color: white; border: none; padding: 5px 10px;">Cancelar</button>
							</div>
					</div>
			`;

			// Mostrar la caja
			$('body').append(inputBoxHtml);

			// Manejar el evento de clic en el botón de guardar
			$('#saveImageChange').on('click', function () {
				var newImageUrl = $('#newImageUrl').val();
				parentElement.find(imageClass).attr(imageClass === '.edit_url' ? 'href' : 'src', newImageUrl);
				$('.image-change-box').remove(); // Eliminar la caja después de guardar
			});

			// Manejar el evento de clic en el botón de cancelar
			$('#cancelImageChange').on('click', function () {
				$('.image-change-box').remove(); // Eliminar la caja si se cancela
			});
		}

		$('body').on('click', '.prtltmmc-change-url', function (e) {
			e.preventDefault();
			openImageChangeBox($(this), '.edit_url');
		});

		$('body').on('click', '.prtltmmc-change-desktop-image', function (e) {
			e.preventDefault();
			openImageChangeBox($(this), '.main_image.is_desktop');
		});

		$('body').on('click', '.prtlt-change-video', function (e) {
			e.preventDefault();
			openImageChangeBox($(this), '.prtlt-video-content', true);
		});

		/////////////////////////////////////////////////////
		///////////////// SWIPER ADD/REMOVE /////////////////
		/////////////////////////////////////////////////////
		$('body').on('click', '.prtlt-change-addSlide', function (e) {
			e.preventDefault();
			var $container = $(this).closest('.prtltmmc-image-content');
			var $lastElement = $container.find('.swiper_item').last();
			var $newElement = $lastElement.clone();
			$lastElement.after($newElement);
			swiper.update();
			swiper.slideTo(swiper.slides.length - 1);
		});

		$('body').on('click', '.prtlt-change-deleteSlide', function (e) {
			e.preventDefault();
			var activeIndex = swiper.activeIndex;
			var $slides = $(swiper.slides);
			if ($slides.length > 1) {
				var $activeSlide = $($slides[activeIndex]);
				$activeSlide.remove();
				swiper.update();
				if (activeIndex === swiper.slides.length) {
					swiper.slideTo(activeIndex - 1);
				} else {
					swiper.slideTo(activeIndex);
				}
			} else {
				alert('No se puede eliminar la única diapositiva.');
			}
		});
		function moveSlide(swiper, fromIndex, toIndex) {
			if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= swiper.slides.length || toIndex >= swiper.slides.length) {
				return; // No hacer nada si los índices son iguales o están fuera de los límites
			}

			// Obtener el contenedor de las diapositivas
			const wrapper = swiper.wrapperEl;

			// Obtener todas las diapositivas
			const slides = Array.from(wrapper.children);

			// Seleccionar la diapositiva que queremos mover
			const slideToMove = slides[fromIndex];

			// Ajustar el índice de destino si la diapositiva se mueve hacia adelante (a la derecha)
			if (fromIndex < toIndex) {
				toIndex += 1;
			}

			// Mover la diapositiva a la nueva posición
			console.log('toIndex', toIndex);
			if (toIndex >= slides.length) {
				wrapper.appendChild(slideToMove);
			} else {
				wrapper.insertBefore(slideToMove, slides[toIndex]);
			}

			// Actualizar Swiper para reconocer el nuevo orden
			swiper.update();

			// Deslizar a la nueva posición
			swiper.slideTo(toIndex > fromIndex ? toIndex - 1 : toIndex);
		}

		$('body').on('click', '.prtlt-change-moveSlideLeft', function (e) {
			e.preventDefault();
			var activeIndex = swiper.activeIndex;
			var $slides = $(swiper.slides);
			if ($slides.length > 1) {
				if (activeIndex !== 0) {
					moveSlide(swiper, activeIndex, activeIndex - 1);
				} else {
					alert('No se puede mover el primero slide a izquerda.');
				}

			} else {
				alert('No se puede eliminar la única diapositiva.');
			}
		});

		$('body').on('click', '.prtlt-change-moveSlideRight', function (e) {
			e.preventDefault();
			var activeIndex = swiper.activeIndex;
			var $slides = $(swiper.slides);

			if ($slides.length > 1) {
				console.log('activeIndex', activeIndex);
				console.log('$slides.length', $slides.length);
				if (activeIndex !== $slides.length - 1) {
					moveSlide(swiper, activeIndex, activeIndex + 1);
				} else {
					alert('No se puede mover la última diapositiva a la derecha.');
				}
			} else {
				alert('No se puede mover la única diapositiva.');
			}
		});

		$('body').on('click', '.prtltmmc-change-mobile-image', function (e) {
			e.preventDefault();
			openImageChangeBox($(this), '.main_image.is_mobile');
		});

		$('body').on('click', '.prtltmmc-change-class-promo', function (e) {
			e.preventDefault();
			var $element = $(this).closest('.prtltmmc-image-content').find('.prtltmmc-image-content-item');
			if ($element.hasClass('promo')) {
				$element.removeClass('promo');
				$(this).text('Añadir promo');
			} else {
				$element.addClass('promo');
				$(this).text('Eliminar promo');
			}
		});

		$('body').on('click', '.prtltmmc-change-class-reverse', function (e) {
			e.preventDefault();
			var $element = $(this).closest('.prtltmmc-image-content').find('.prtltmmc-image-content-item');
			if ($element.hasClass('reverse')) {
				$element.removeClass('reverse');
				$(this).text('Añadir reverse');
			} else {
				$element.addClass('reverse');
				$(this).text('Eliminar reverse');
			}
		});

		$('body').on('click', '.prtltmmc-change-class-color-dark', function (e) {
			e.preventDefault();
			var $element = $(this).closest('.prtltmmc-image-content').find('.prtltmmc-image-content-item');
			if ($element.hasClass('color-dark')) {
				$element.removeClass('color-dark');
				$(this).text('Modo dark');
			} else {
				$element.addClass('color-dark');
				$(this).text('Modo white');
			}
		});


	},
	createNewInstances: function () {
		$('.prtltmmc-contenteditable:not(".cke_editable")').each(function (index) {
			$this = $(this);
			$this.attr('contenteditable', 'true');
			// Create editor instance on the new element
			if ($this.is('h1') || $this.is('h2') || $this.is('h3') || $this.is('h4')) {
				prtltmmcCkEditor.config.toolbar = [
					{ name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'] }
				];
			} else if ($this.hasClass('prtltmmc-title-boxes-outstand') || $this.hasClass('prtltmmc-nav')) {
				prtltmmcCkEditor.config.toolbar = [
					{ name: 'links', items: ['Link'] }
				];
			} else if ($this.hasClass('prtltmmc-block-image')) {
				prtltmmcCkEditor.config.toolbar = [
					{ name: 'insert', items: ['Image', 'Iframe', 'Youtube'] }
				];
			} else if ($this.closest('.prtltmmc-slider-home').length > 0) {
				if ($this.hasClass('prtltmmc-link-image')) {
					prtltmmcCkEditor.config.toolbar = [
						{ name: 'insert', items: ['Link', 'Image'] }
					];
				} else {
					prtltmmcCkEditor.config.toolbar = [
						{ name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'] }
					];
				};
			} else if ($this.hasClass('prtltmmc-image-boxes-outstand') || $this.closest('.prtltmmc-slider-wrapper').length > 0 || $this.hasClass('prtltmmc-bgimage')) {
				prtltmmcCkEditor.config.toolbar = [
					{ name: 'insert', items: ['Image'] }
				];
			} else if ($this.hasClass('prtltmmc-video-central')) {
				prtltmmcCkEditor.config.toolbar = [
					{ name: 'insert', items: ['Iframe'] }
				];
			} else {
				prtltmmcCkEditor.config.toolbar = [
					{ name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
					{ name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'SpecialChar'] },
					'/',
					{ name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'] },
					{ name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
					{ name: 'links', items: ['Link', 'Unlink'] },
					{ name: 'styles', items: ['Format'] },
					{ name: 'document', groups: ['mode', 'document', 'doctools'], items: ['Source'] },
					{ name: 'others', items: ['-'] }
				];
			};
			CKEDITOR.inline($this.get(0), prtltmmcCkEditor.config);
		});

		//add tollbar edit portlet boxes
		var toolBarBoxes = '<div class="btn-group dropdown-menu-right prtltmmc-options-portlet">' +
			'<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">Options</button>' +
			'<ul class="dropdown-menu">' +
			'<li><a href="#" class="prtltmmc-add-box">' + prtltmmcCkEditor.textAddElement + '</a></li>' +
			'<li><a href="#" class="prtltmmc-sort-boxes">' + prtltmmcCkEditor.textSortElement + '</a></li>' +
			'</ul>' +
			'</div>';
		$('.prtltmmc-boxes-outstand').each(function (index) {
			if ($(this).find('.prtltmmc-options-portlet').length == 0) {
				$(this).find('.prtltmmc-row-boxes-outstand:not(.tabs, .options_all_items)').after(toolBarBoxes);
			};
		});

		//add tollbar edit slider home
		var toolBarSlider = '<div class="btn-group dropdown-menu-right prtltmmc-options-portlet">' +
			'<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">Options</button>' +
			'<ul class="dropdown-menu">' +
			'<li><a href="#" class="prtltmmc-add-images-slider">' + prtltmmcCkEditor.textAddElement + '</a></li>' +
			'</ul>' +
			'</div>';
		$('.prtltmmc-slider-home').each(function (index) {
			if ($(this).find('.prtltmmc-options-portlet').length == 0) {
				$(this).append(toolBarSlider);
			};
		});

		// Digitup logic portlets
		$('.prtltmmc-image-content').each(function () {
			var $this = $(this);
			const $item = $this.find('.prtltmmc-image-content-item');
			// Construir el menú desplegable de forma dinámica
			var toolBarMenu = '<ul class="dropdown-menu">';
			if ($this.hasClass('edit-option-desktop-image')) {
				toolBarMenu += '<li><a href="#" class="prtltmmc-change-desktop-image">Desktop image</a></li>';
			}
			if ($this.hasClass('edit-option-mobile-image')) {
				toolBarMenu += '<li><a href="#" class="prtltmmc-change-mobile-image">Mobile image</a></li>';
			}
			if ($this.hasClass('edit-option-promo')) {
				const name = $item.hasClass('promo') ? 'Delete promo' : 'Add promo';
				toolBarMenu += '<li><a href="#" class="prtltmmc-change-class-promo">' + name + '</a></li>';
			}
			if ($this.hasClass('edit-option-reverse')) {
				const name = $item.hasClass('reverse') ? 'Delete reverse' : 'Add reverse';
				toolBarMenu += '<li><a href="#" class="prtltmmc-change-class-reverse">' + name + '</a></li>';
			}
			if ($this.hasClass('edit-option-video')) {
				toolBarMenu += '<li><a href="#" class="prtlt-change-video">Change video</a></li>';
			}
			if ($this.hasClass('edit-option-addSlide')) {
				toolBarMenu += '<li><a href="#" class="prtlt-change-addSlide">Add slide</a></li>';
			}
			if ($this.hasClass('edit-option-deleteSlide')) {
				toolBarMenu += '<li><a href="#" class="prtlt-change-deleteSlide">Delete slide</a></li>';
			}
			if ($this.hasClass('edit-option-moveSlideLeft')) {
				toolBarMenu += '<li><a href="#" class="prtlt-change-moveSlideLeft">Move left</a></li>';
			}
			if ($this.hasClass('edit-option-moveSlideRight')) {
				toolBarMenu += '<li><a href="#" class="prtlt-change-moveSlideRight">Move right</a></li>';
			}
			if ($this.hasClass('edit-option-color-dark')) {
				const name = $item.hasClass('color-dark') ? 'Modo white' : 'Modo dark';
				toolBarMenu += '<li><a href="#" class="prtltmmc-change-class-color-dark">' + name + '</a></li>';
			}
			if ($this.hasClass('edit-option-url')) {
				toolBarMenu += '<li><a href="#" class="prtltmmc-change-url">Add link</a></li>';
			}
			toolBarMenu += '</ul>';

			// Construir y añadir el contenedor del menú desplegable
			var toolBarImages = '<div class="btn-group dropdown-menu-right prtltmmc-options-portlet-digitup">' +
				'<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">Options</button>' +
				toolBarMenu + '</div>';

			// Insertar después de cada elemento .prtltmmc-image-content-item
			$item.after(toolBarImages);
		});

		////////////////////////////////////////////////////////////////
		///////////// ADD options buttons PROMOCARD/////////////////////
		////////////////////////////////////////////////////////////////
		$('.prtlt-digitup-static.prtlt-digitup-static-promo-card').each(function () {
			const thisParent = $(this);
			if (thisParent.find('.prtltmmc-options-portlet-digitup').length === 0) {
				var toolBarMenu = '<ul class="dropdown-menu prtlt-digitup-api-options">';
				toolBarMenu += `<li><a href="#" class="add-new-card">${prtltmmcCkEditor.textAddElement}</a></li>`;
				toolBarMenu += `<li><a href="#" class="prtltmmc-sort-boxes">${prtltmmcCkEditor.textSortElement}</a></li>`;
				toolBarMenu += '</ul>';
				var optionsGeneral = '<div class="btn-group dropdown-menu-right prtltmmc-options-portlet-digitup">' +
					'<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">Options</button>' +
					toolBarMenu + '</div>';
				thisParent.find('.card_content').prepend(optionsGeneral);
			}
		});
		setTimeout(() => {
			this.addItemOptions();
		}, 2000);

		////////////////////////////////////////////////////////////////
		////////////////// ADD options buttons API /////////////////////
		////////////////////////////////////////////////////////////////
		// $('.prtlt-digitup-api').each(function () {
		// 	const thisParent = $(this);
		// 	var toolBarMenu = '<ul style="display: block;" class="dropdown-menu prtlt-digitup-api-options open">';
		// 	toolBarMenu += '<li><a href="#" class="open-api-config">Add new tab</a></li>';
		// 	toolBarMenu += '</ul>';
		// 	var optionsGeneral = '<div class="btn-group dropdown-menu-right prtltmmc-options-portlet-digitup">' +
		// 		'<button class="btn btn-primary dropdown-toggle open-api-config" type="button" data-toggle="dropdown" aria-expanded="false">Options</button>' +
		// 		toolBarMenu + '</div>';
		// 	thisParent.prepend(optionsGeneral);
		// });

		////////////////////////////////////////////////////////////////
		////////////////// ADD options buttons API /////////////////////
		////////////////////////////////////////////////////////////////
		$('.prtlt-digitup-api.prtlt-digitup-api-chollos, .prtlt-digitup-api.prtlt-digitup-api-destinos').each(function () {
			const thisParent = $(this);
			console.log('thisParent destinos', thisParent);
			if (thisParent.find('.prtltmmc-options-portlet-digitup').length === 0) {
				var toolBarMenu = '<ul class="dropdown-menu prtlt-digitup-api-options">';
				toolBarMenu += `<li><a href="#" class="open-api-config">Configuration</a></li>`;
				toolBarMenu += '</ul>';
				var optionsGeneral = '<div class="btn-group dropdown-menu-right prtltmmc-options-portlet-digitup">' +
					'<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">Options</button>' +
					toolBarMenu + '</div>';
				thisParent.find('.main_content').prepend(optionsGeneral);
			}
		});
		$('.prtlt-digitup-api.prtlt-digitup-api-chollos').each(function () {
			const thisParent = $(this);
			if (thisParent.find('.prtltmmc-options-portlet-digitup').length === 0) {
				var toolBarMenu = '<ul class="dropdown-menu prtlt-digitup-api-options">';
				toolBarMenu += `<li><a href="#" class="open-api-config">Configuration</a></li>`;
				toolBarMenu += '</ul>';
				var optionsGeneral = '<div class="btn-group dropdown-menu-right prtltmmc-options-portlet-digitup">' +
					'<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">Options</button>' +
					toolBarMenu + '</div>';
				thisParent.find('.tabs').prepend(optionsGeneral);
			}
		});

		$('.prtlt-digitup-api.prtlt-digitup-api-recomendados').each(function () {
			const thisParent = $(this);
			if (thisParent.find('.prtltmmc-options-portlet-digitup').length === 0) {
				var toolBarMenu = '<ul class="dropdown-menu prtlt-digitup-api-options">';
				toolBarMenu += `<li><a href="#" class="add-new-tab">${prtltmmcCkEditor.textAddElement}</a></li>`;
				toolBarMenu += `<li><a href="#" class="prtltmmc-sort-boxes">${prtltmmcCkEditor.textSortElement}</a></li>`;
				toolBarMenu += '</ul>';
				var optionsGeneral = '<div class="btn-group dropdown-menu-right prtltmmc-options-portlet-digitup">' +
					'<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">Options</button>' +
					toolBarMenu + '</div>';
				thisParent.find('.tabs').prepend(optionsGeneral);
			}
		});
		setTimeout(() => {
			this.addTabsOptions();
			// $('.dropdown-toggle').dropdown();
			// initializeDropdowns();
		}, 2000);

	},

	addTabsOptions() {
		$('.recomended_tab').each(function () {
			const thisParent = $(this);
			if (thisParent.find('.prtltmmc-options-portlet-digitup').length === 0) {
				var toolBarMenu = '<ul class="dropdown-menu prtlt-digitup-api-options">';
				toolBarMenu += '<li><a href="#" class="open-api-config">Configuration</a></li>';
				toolBarMenu += '</ul>';
				var optionsGeneral = '<div class="btn-group dropdown-menu-right prtltmmc-options-portlet-digitup">' +
					'<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">Options</button>' +
					toolBarMenu + '</div>';
				thisParent.prepend(optionsGeneral);
			}
		});
	},

	addItemOptions() {
		// const optionsItem = `
		// 	<div class="prtlt-digitup-api-options prtlt-digitup-generic-options in_top">
		// 		<div class="option_button delete-card hidden danger">Delete</div>
		// 		<div class="option_button open-options-link success">Image</div>
		// 	</div>
		// `;
		$('.prtlt-digitup-static.prtlt-digitup-static-promo-card .options_item_to_copy').each(function () {
			const thisParent = $(this);
			if (thisParent.find('.prtltmmc-options-portlet-digitup').length === 0) {
				var toolBarMenu = '<ul class="dropdown-menu prtlt-digitup-api-options">';
				toolBarMenu += '<li><a href="#" class="open-options-link">Change image</a></li>';
				toolBarMenu += '</ul>';
				var optionsGeneral = '<div class="btn-group dropdown-menu-right prtltmmc-options-portlet-digitup">' +
					'<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">Options</button>' +
					toolBarMenu + '</div>';
				thisParent.prepend(optionsGeneral);
			}
		});
	},

	removeDataAttributes: function (target, string) {
		var i, $target = $(target), attrName, dataAttrsToDelete = [], dataAttrs = $target.get(0).attributes, dataAttrsLen = dataAttrs.length;
		for (i = 0; i < dataAttrsLen; i++) {
			if (string === dataAttrs[i].name.substring(0, string.length)) {
				dataAttrsToDelete.push(dataAttrs[i].name);
			}
		};
		$.each(dataAttrsToDelete, function (index, attrName) {
			$target.removeAttr(attrName);
		});
	},
	cleanHtml: function ($el) {
		//update bg image of portet frame-image
		prtltmmcFrameImage.updateBackground();
		if ($el.find('.prtltmmc-slider-viewport').length > 0) {
			prtltmmcSliderHome.slider[$el.find('.prtltmmc-slider-viewport').closest('.prtltmmc-slider-home').attr('id')]?.destroySlider();
			prtltmmcSliderHome.cleanParagraph($el);
			$ul = $el.find('ul:not(".dropdown-menu")');
			$ul.unwrap('.prtltmmc-slider-viewport');
			$ul.unwrap('.prtltmmc-slider-wrapper');
			$ul.removeAttr('style');
			$ul.find('li').removeAttr('style');
			$el.find('.prtltmmc-slider-controls').remove();
			$el.find('.prtltmmc-loading-next').remove();
			$clone = $el.clone();
			prtltmmcSliderHome.init($ul);
		} else {
			$clone = $el.clone();
		};

		//replace img to iframe
		$clone.find('.cke_iframe').each(function (indexImgIframe) {
			if ($(this).parent('p')) { $(this).unwrap(); };
			$(this).replaceWith(decodeURIComponent($(this).attr('data-cke-realelement')));
		});

		//remove marks of wysiwyg
		$clone.find('*').each(function (indexEl) {
			$(this).removeClass(function (indexElCSS, css) {
				return (css.match(/\bcke\S+/g) || []).join(' ');
			});
			prtltmmcCkEditor.removeDataAttributes($(this), 'data-cke');
		});
		$clone.find('[contenteditable="true"]').removeAttr("title").removeAttr("tabindex").removeAttr("spellcheck").removeAttr("role").removeAttr("aria-label").removeAttr("aria-describedby");
		$clone.find('[contenteditable="true"]').removeAttr("contenteditable");

		//remove toolbar edition
		$clone.find('.prtltmmc-options-portlet').remove();

		//remove toolbar digitup edition
		$clone.find('.prtltmmc-options-portlet-digitup').remove();

		var html = $clone.html();
		$clone.remove();
		return html;
	},
	sortSlider: function ($ulSlider) {
		$ulSlider.sortable({
			axis: 'y',
			containment: 'parent',
			scroll: false,
			scrollSensitivity: 10,
			scrollSpeed: .3,
			opacity: 0.6,
			cursor: 'move',
			tolerance: 'pointer',
			placeholder: "prtltmmc-portlet-sort-placeholder",
			start: function (event, ui) {
			},
			sort: function (event, ui) {
			},
			stop: function (event, ui) {
			}
		});
	}
};


//////////////////////////////////
//////////////////////////////////
//ADMIN BROCHURES
var prtltmmcAdminBrochures = {
	provisionalFilesToRemove: '',
	filesToRemove: '',
	brochuresToRemove: '',
	urlJsDropZone: 'prtltmmc-js/dropzone.js',
	pathDropzone: 'uploads',
	uploaderFile: 'upload.php',
	messageErrorFillForm: 'You must complete the form',
	init: function () {
		//calendar
		$.datepicker.regional['es'] = {
			closeText: 'Cerrar',
			prevText: '< Ant',
			nextText: 'Sig >',
			currentText: 'Hoy',
			monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
			dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
			dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
			dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
			weekHeader: 'Sm',
			dateFormat: 'dd/mm/yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
		//$.datepicker.setDefaults($.datepicker.regional['es']);
		$("#datepickerBrochures").datepicker({ dateFormat: "dd/mm/yy" });
		//events
		$('body').on('click', '.prtltmmc-clear-brochures-form', function (event) {
			event.preventDefault();
			prtltmmcAdminBrochures.cleanBrochuresForm();
		});
		$('body').on('click', '.prtltmmc-bookself-list li', function (event) {
			event.preventDefault();
			event.stopPropagation();
			prtltmmcAdminBrochures.cleanBrochuresForm();
			$('.prtltmmc-upload-brochure').css("cssText", "display: none !important;");
			$('.prtltmmc-update-brochure-options').css("cssText", "display: table;")
			$this = $(this);
			$parent = $this.closest('.prtltmmc-bookself-list');

			var id = $this.attr('data-id-brochure');
			$('[name="id-book"]').val(id);

			var description = $this.find('.prtltmmc-desc-book').html().replace(/<br>/g, '\n');
			$('[name="desc-book"]').val(description);

			var dateBook = new Date();
			dateBook.setTime($this.attr('data-date-brochure'));
			$('[name="date-book"]').datepicker("setDate", dateBook.getDay() + '/' + dateBook.getMonth() + '/' + dateBook.getFullYear());

			var language = $parent.attr('data-lang-brochures');
			$('[name="lang-book"]').val(language);

			var supplier = $this.attr('data-supplier-brochure');
			$('[name="suppliers-book"]').val(supplier);

			var section = $parent.attr('data-section-brochures');
			$('[name="section-book"]').val(section);

			var code = $this.attr('data-code-brochure');
			$('[name="code-book"]').val(code);

			if ($this.attr('data-customized-brochure') == 'true') {
				$('[name="customized-book"]').prop('checked', true);
			} else {
				$('[name="customized-book"]').prop('checked', false);
			};

			//drag&drop area
			var hrefBrochure = $this.find('a').attr('href');
			var firstHref = hrefBrochure.lastIndexOf('/');
			hrefBrochure = hrefBrochure.slice(firstHref + 1, hrefBrochure.length);
			$('#dropzonePdf').append('<div class="dz-preview dz-file-preview dz-complete"><div class="dz-image"></div><div class="dz-details">' + hrefBrochure + '</div></div>');
			$('#dropzonePdf [name="uploadedFile"]').val(hrefBrochure);
			var srcImage = $this.find('.prtltmmc-img-book img').attr('src');
			var firstSrc = srcImage.lastIndexOf('/');
			srcImage = srcImage.slice(firstSrc + 1, srcImage.length);
			$('#dropzoneImage').append('<div class="dz-preview dz-file-preview dz-complete"><div class="dz-image"></div><div class="dz-details">' + srcImage + '</div></div>');
			$('#dropzoneImage [name="uploadedFile"]').val(srcImage);
		});
		$('body').on('click', '.prtltmmc-upload-brochure', function (event) {
			event.preventDefault();
			if (!prtltmmcAdminBrochures.checkBrochuresForm()) {
				alert(prtltmmcAdminBrochures.messageErrorFillForm);
				return false;
			};
			var customizedBook = false;
			if ($('[name="customized-book"]')) {
				customizedBook = true;
			};
			var idLabel = new Date().getTime();
			var hrefFile = prtltmmcAdminBrochures.pathDropzone + '/' + $('#dropzonePdf [data-dz-name]').text();
			var srcImage = prtltmmcAdminBrochures.pathDropzone + '/' + $('#dropzoneImage [data-dz-name]').text();
			var dateBrochure = $('[name="date-book"]').val().split('/');
			var description = $('[name="desc-book"]').val().replace(/\r?\n/g, '<br>');
			var dateBrochure = $('[name="date-book"]').val().split('/');
			dateBrochure = new Date(dateBrochure[2], dateBrochure[1], dateBrochure[1]).getTime();

			$newLi = '<li data-id-brochure="' + idLabel + '" data-code-brochure="' + $('[name="code-book"]').val() + '" data-supplier-brochure="' + $('[name="suppliers-book"]').val() + '"  data-date-brochure="' + dateBrochure + '" data-customized-brochure="' + customizedBook + '" data-new-brochure="true">' +
				'<label for="prtltmmc-book-' + idLabel + '"></label>' +
				'<input type="radio" id="prtltmmc-book-' + idLabel + '" name="prtltmmc-book">' +
				'<span class="prtltmmc-img-book"><img src="' + srcImage + '"></span>' +
				'<a href="' + hrefFile + '" target="_blank"><span class="prtltmmc-desc-book">' + description + '</span></a>' +
				'</li>';
			$booself = $('.prtltmmc-bookself-list[data-lang-brochures="' + $('[name="lang-book"]').val() + '"][data-section-brochures="' + $('[name="section-book"]').val() + '"]');
			$booself.prepend($newLi);
			if ($booself.find('li').length > 1) {
				$booself.find('li').sort(function (a, b) {
					return $(a).attr('data-date-brochure') < $(b).attr('data-date-brochure');
				}).appendTo($booself);
			};
			$(window).scrollTop($booself.offset().top - 100);
			prtltmmcAdminBrochures.cleanBrochuresForm();

		});
		$('body').on('click', '.prtltmmc-update-brochure', function (event) {
			event.preventDefault();
			if (!prtltmmcAdminBrochures.checkBrochuresForm()) {
				alert(prtltmmcAdminBrochures.messageErrorFillForm);
				return false;
			};
			var customizedBook = false;
			if ($('[name="customized-book"]')) {
				customizedBook = true;
			};
			var dateBrochure = $('[name="date-book"]').val().split('/');
			var description = $('[name="desc-book"]').val().replace(/\r?\n/g, '<br>');
			var dateBrochure = $('[name="date-book"]').val().split('/');
			dateBrochure = new Date(dateBrochure[2], dateBrochure[1], dateBrochure[1]).getTime();

			$li = $('[data-id-brochure="' + $('[name="id-book"]').val() + '"]');
			$li.attr('data-changed-brochure', 'true');
			$li.attr('data-code-brochure', $('[name="code-book"]').val());
			$li.attr('data-supplier-brochure', $('[name="suppliers-book"]').val());
			$li.attr('data-date-brochure', dateBrochure);
			$li.attr('data-customized-brochure', customizedBook);

			$li.find('.prtltmmc-desc-book').html(description);

			if ($('#dropzonePdf .dz-preview').hasClass('dz-processing')) {
				var hrefFile = prtltmmcAdminBrochures.pathDropzone + '/' + $('#dropzonePdf [data-dz-name]').text();
				$li.find('a').attr('href', hrefFile);
			};
			if ($('#dropzoneImage .dz-preview').hasClass('dz-processing')) {
				var srcImage = prtltmmcAdminBrochures.pathDropzone + '/' + $('#dropzoneImage [data-dz-name]').text();
				$li.find('.prtltmmc-img-book img').attr('src', srcImage);
			};

			$booself = $('.prtltmmc-bookself-list[data-lang-brochures="' + $('[name="lang-book"]').val() + '"][data-section-brochures="' + $('[name="section-book"]').val() + '"]');
			$li.prependTo($booself);
			if ($booself.find('li').length > 1) {
				$booself.find('li').sort(function (a, b) {
					return $(a).attr('data-date-brochure') < $(b).attr('data-date-brochure');
				}).appendTo($booself);
			};
			prtltmmcAdminBrochures.removeProvisionalFile();
			$(window).scrollTop($li.offset().top - 100);
			prtltmmcAdminBrochures.cleanBrochuresForm();
		});
		$('body').on('click', '.prtltmmc-remove-brochure', function (event) {
			prtltmmcAdminBrochures.removeFile($('#dropzonePdf'));
			prtltmmcAdminBrochures.removeFile($('#dropzoneImage'));
			if (prtltmmcAdminBrochures.brochuresToRemove != '') { prtltmmcAdminBrochures.brochuresToRemove = prtltmmcAdminBrochures.brochuresToRemove + '/'; };
			prtltmmcAdminBrochures.brochuresToRemove = prtltmmcAdminBrochures.brochuresToRemove + $('[name="id-book"]').val();
			$('[data-id-brochure="' + $('[name="id-book"]').val() + '"]').remove();
			prtltmmcAdminBrochures.cleanBrochuresForm();
		});

		/*$.getScript(prtltmmcAdminBrochures.urlJsDropZone)
			.done(function(script, textStatus) {*/
		//dropzonePdf
		if ($('#dropzonePdf').length == 0) {
			Dropzone.options.dropzonePdf = {
				maxFiles: 1,
				acceptedFiles: 'image/*,application/pdf',
				dictDefaultMessage: 'Drop here the file PDF or Image to download',
				removedfile: function (file) {
					if (file.xhr.responseText.length > 0) {
					}
				},
				init: function () {
					// Capture the Dropzone instance as closure.
					var _this = this;
					// Create input hidden uploadedFile
					var inputUploadeFile = Dropzone.createElement('<input type="hidden" name="uploadedFile" value=""/>');
					$('#' + _this.element.id).prepend(inputUploadeFile);
					var $inputUploadedFile = $('#' + _this.element.id).find('[name="uploadedFile"]');
					// Create the remove button
					var removeButton = Dropzone.createElement('<button class="removeAllFilesDropzone" style="display: none;">Remove file</button>');
					// Listen to the click event
					removeButton.addEventListener("click", function (e) {
						e.preventDefault();
						e.stopPropagation();
						prtltmmcAdminBrochures.removeFile($('#' + _this.element.id), 'provisional');
					});
					// Add the button to the file preview element.
					$('#' + _this.element.id).prepend(removeButton);

					this.on("complete", function (file) {
						this.removeAllFiles(true);
						$inputUploadedFile.val(file.name);
					})

					this.on("addedfile", function (file) {
						prtltmmcAdminBrochures.removeFile($('#' + _this.element.id), 'provisional');
					});
					/*
					this.on("sending", function(file) {
					});
					this.on("success", function (file, message) {
					});
					this.on("error", function (file, message) {
					});
					*/
				}
			};
			$('#areaDropzonePdf').append('<form action="' + prtltmmcAdminBrochures.uploaderFile + '" class="dropzone" id="dropzonePdf"></form>');
			$('#dropzonePdf').dropzone({ url: prtltmmcAdminBrochures.uploaderFile });
		};

		if ($('#dropzoneImage').length == 0) {
			Dropzone.options.dropzoneImage = {
				maxFiles: 1,
				acceptedFiles: 'image/*',
				dictDefaultMessage: 'Drop here the cover image',
				removedfile: function (file) {
					if (file.xhr.responseText.length > 0) {
					}
				},
				init: function () {
					// Capture the Dropzone instance as closure.
					var _this = this;
					// Create input hidden uploadedFile
					var inputUploadeFile = Dropzone.createElement('<input type="hidden" name="uploadedFile" value=""/>');
					$('#' + _this.element.id).prepend(inputUploadeFile);
					var $inputUploadedFile = $('#' + _this.element.id).find('[name="uploadedFile"]');
					// Create the remove button
					var removeButton = Dropzone.createElement('<button class="removeAllFilesDropzone" style="display: none;">Remove file</button>');
					// Listen to the click event
					removeButton.addEventListener("click", function (e) {
						e.preventDefault();
						e.stopPropagation();
						prtltmmcAdminBrochures.removeFile($('#' + _this.element.id), 'provisional');
					});
					// Add the button to the file preview element.
					$('#' + _this.element.id).prepend(removeButton);

					this.on("complete", function (file) {
						this.removeAllFiles(true);
						$inputUploadedFile.val(file.name);
					})

					this.on("addedfile", function (file) {
						prtltmmcAdminBrochures.removeFile($('#' + _this.element.id), 'provisional');
					});
					/*
					this.on("sending", function(file) {
					});
					this.on("success", function (file, message) {
					});
					this.on("error", function (file, message) {
					});
					*/
				}
			};
			$('#areaDropzoneImage').append('<form action="' + prtltmmcAdminBrochures.uploaderFile + '" class="dropzone" id="dropzoneImage"></form>');
			$('#dropzoneImage').dropzone({ url: prtltmmcAdminBrochures.uploaderFile });
		};

		/*})
		.fail(function(jqxhr, settings, exception) {
			console.error(jqxhr);
	});*/



	},
	removeFile: function ($el, provisional) {
		$el.find('.dz-complete').eq(0).remove();
		$inputUploadedFile = $el.find('[name="uploadedFile"]');
		if ($inputUploadedFile.val() != '') {
			if (provisional) {
				if (prtltmmcAdminBrochures.provisionalFilesToRemove != '') { prtltmmcAdminBrochures.provisionalFilesToRemove += '/'; };
				prtltmmcAdminBrochures.provisionalFilesToRemove += $inputUploadedFile.val();
			} else {
				if (prtltmmcAdminBrochures.filesToRemove != '') { prtltmmcAdminBrochures.filesToRemove += '/'; };
				prtltmmcAdminBrochures.filesToRemove += $inputUploadedFile.val();
			};
		};
		$inputUploadedFile.val('');
	},
	removeProvisionalFile: function () {
		if (prtltmmcAdminBrochures.filesToRemove != '') { prtltmmcAdminBrochures.filesToRemove += '/'; };
		prtltmmcAdminBrochures.filesToRemove += prtltmmcAdminBrochures.provisionalFilesToRemove;
	},
	cleanBrochuresForm: function () {
		$('.prtltmmc-brochures-form').find('input[type="text"], textarea').val('');
		$selects = $('.prtltmmc-brochures-form').find('select');
		$selects.each(function (index) {
			$(this).val($(this).find('option:first').val());
		});
		$('.prtltmmc-brochures-form').find('input[type="checkbox"]').prop('checked', false);
		$('.prtltmmc-brochures-form').find('[name="uploadedFile"]').val('');
		$('.prtltmmc-brochures-form .dropzone .dz-complete').remove();
		$('.prtltmmc-upload-brochure').show();
		$('.prtltmmc-update-brochure-options').css("cssText", "display: none !important;");
		prtltmmcAdminBrochures.provisionalFilesToRemove = '';
	},
	checkBrochuresForm: function () {
		var pass = true;
		$('.prtltmmc-brochures-form input[type="text"]').each(function (index) {
			if ($(this).val() == '') { pass = false; };
		});
		$('.prtltmmc-brochures-form textarea').each(function (index) {
			if ($(this).val() == '') { pass = false; };
		});
		if ($('.dropzone .dz-preview:not(.dz-error)').length == 0) { pass = false; };

		return pass;
	},
	getJsonChangesBrochures: function () {
		var obj = '{';
		obj += '"BrochureToRemove" : "' + prtltmmcAdminBrochures.brochuresToRemove + '",';
		obj += '"FileToRemove" : "' + prtltmmcAdminBrochures.filesToRemove + '",';
		obj += '"NewBrochures" : [{';
		$('[data-new-brochure="true"]').each(function (index) {
			obj += '"' + index + '":';
			obj += '[{';
			obj += '"supplier":"' + $(this).attr('data-supplier-brochure') + '",';
			obj += '"code":"' + $(this).attr('data-code-brochure') + '",';
			obj += '"date":"' + $(this).attr('data-date-brochure') + '",';
			obj += '"customized":"' + $(this).attr('data-customized-brochure') + '",';
			obj += '"description":"' + $(this).find('.prtltmmc-desc-book').html() + '",';
			obj += '"file":"' + $(this).find('a').attr('href') + '",';
			obj += '"img":"' + $(this).find('.prtltmmc-img-book img').attr('src') + '"';
			obj += '}]';
			if (parseInt(index + 1) < $('[data-new-brochure="true"]').length) {
				obj += ',';
			};
		});
		obj += '}],';
		obj += '"ChangedBrochures" : [{';
		$('[data-changed-brochure="true"]').each(function (index) {
			obj += '"' + $(this).attr('data-id-brochure') + '":';
			obj += '[{';
			obj += '"supplier":"' + $(this).attr('data-supplier-brochure') + '",';
			obj += '"code":"' + $(this).attr('data-code-brochure') + '",';
			obj += '"date":"' + $(this).attr('data-date-brochure') + '",';
			obj += '"customized":"' + $(this).attr('data-customized-brochure') + '",';
			obj += '"description":"' + $(this).find('.prtltmmc-desc-book').html() + '",';
			obj += '"file":"' + $(this).find('a').attr('href') + '",';
			obj += '"img":"' + $(this).find('.prtltmmc-img-book img').attr('src') + '"';
			obj += '}]';
			if (parseInt(index + 1) < $('[data-changed-brochure="true"]').length) {
				obj += ',';
			};
		});
		obj += '}]';
		obj += '}';
		return JSON.parse(obj);
	}
};


//////////////////////////////////
//////////////////////////////////
//ADMIN AVATAR
var prtltmmcAdminAvatar = {
	provisionalFilesToRemove: '',
	filesToRemove: '',
	urlJsDropZone: 'prtltmmc-js/dropzone.js',
	pathDropzone: 'uploads',
	uploaderFile: 'upload.php',
	uploadedBefore: '',
	messageDrop: 'Arrastre aquín su logotipo',
	init: function () {
		$('.prtltmmc-form-avatar').append('<form action="' + prtltmmcAdminAvatar.uploaderFile + '" class="dropzone" id="dropzoneImage"></form>');
		Dropzone.options.dropzoneImage = {
			maxFiles: 1,
			acceptedFiles: 'image/*',
			dictDefaultMessage: prtltmmcAdminAvatar.messageDrop,
			removedfile: function (file) {
				if (file.xhr.responseText.length > 0) {
				}
			},
			init: function () {
				// Capture the Dropzone instance as closure.
				var _this = this;
				// Create input hidden uploadedFile
				var inputUploadeFile = Dropzone.createElement('<input type="hidden" name="uploadedFile" value=""/>');
				$('#' + _this.element.id).prepend(inputUploadeFile);
				var $inputUploadedFile = $('#' + _this.element.id).find('[name="uploadedFile"]');

				this.on("complete", function (file) {
					this.removeAllFiles(true);
					$inputUploadedFile.val(file.name);
					/*
					var $thumbnail=$('#'+_this.element.id).find('img[data-dz-thumbnail]');
					$thumbnail.attr('src', $thumbnail.attr('src')+'?'+new Date().getTime());
					*/
				})

				this.on("addedfile", function (file) {
					prtltmmcAdminAvatar.removeFile($('#' + _this.element.id), 'provisional');
				});
				if (prtltmmcAdminAvatar.uploadedBefore != '') {
					$('#' + _this.element.id).append('<div class="dz-preview dz-processing dz-image-preview dz-success dz-complete"><div class="dz-image"><img data-dz-thumbnail="" alt="" src="' + prtltmmcAdminAvatar.uploadedBefore + '?' + new Date().getTime() + '" style="max-width: 100%; max-height: 90%;"></div></div>');
				}
			}
		};
	},
	removeFile: function ($el, provisional) {
		$el.find('.dz-complete').eq(0).remove();
		$inputUploadedFile = $el.find('[name="uploadedFile"]');
		if ($inputUploadedFile.val() != '') {
			console.log('borrar imagen' + $inputUploadedFile.val());
		};
		$inputUploadedFile.val('');
	}
};

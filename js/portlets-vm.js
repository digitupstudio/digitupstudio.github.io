var swiper;
function getContent() {
  // function getContent() {
  console.log('Loaded getContent!!')
  // const domain = 'http://localhost:8080';
  // const urlWeb = 'https://test.cruiseplatform.com/api-wlgs/wlgs/portal/no-session/portlet/destinos/show'

  // Selecciona el elemento div que contiene la información de la API
  const contentDiv = $('.prtlt-digitup-api .api_content');

  var language = getLanguage();
  if (!contentDiv) {
    console.error('contentDiv not found');
    return;
  }
  contentDiv.empty();
  contentDiv.each(function (index) {
    var $this = $(this);
    let config = '';
    const portlet = $this.attr('data-portletType');
    const portletType = portlet?.split('prtlt-digitup-api-')?.[1];

    let urlWeb = '';

    if (portletType === 'recomendados') {
      // config = loadRecomendedTabs($this, index);
      const dataObject = JSON.parse($this.attr('data-object') || '[]');
      if (dataObject.length) {
        dataObject.forEach(function (elem) {
          config = elem.url;
          urlWeb = `/api-wlgs-portlets/wlgs/portal/no-session/portlet/${portletType}/show`;
          const apiUrl = urlWeb + '/' + language;
          requestData(apiUrl, config, $this);
        });
        // config = dataObject[index].url;
      }
    } else {
      config = $this.attr('data-url');
      urlWeb = `/api-wlgs-portlets/wlgs/portal/no-session/portlet/${portletType}/show`;
      const apiUrl = urlWeb + '/' + language;
      requestData(apiUrl, config, $this);
    }

  });
}

function getLanguage() {
  var language = 'es';
  if (typeof MMC !== 'undefined') {
    language = MMC.language || 'es';
  }
  return language;
}

function requestData(apiUrl, filter, contentDiv) {
  if (!filter) {
    return;
  }
  // const contentDiv = document.querySelector('.prtlt-digitup-api .api_content');
  const options = {
    method: 'POST', // Método HTTP
    headers: {
      'Content-Type': 'application/json' // Especifica el tipo de contenido
    },
    body: JSON.stringify({ filter }) // Convierte los datos del objeto en una cadena JSON
  };

  fetch(apiUrl, options)
    .then(response => {
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      return response.text(); // Suponiendo que la respuesta es HTML directo
    })
    .then(htmlString => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");

      // Extrae el elemento deseado usando querySelector
      const content = doc.querySelector('.prtlt-digitup-api-content');

      // Verifica si se encontró el elemento y actualiza el DOM
      if (content) {
        contentDiv.append(content.innerHTML);
        // contentDiv.html(content.innerHTML);
        console.log('contentDiv', contentDiv);
        execConfigs();
      } else {
        throw new Error('Element with specified class not found in the response.');
      }
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
      contentDiv.html('<p>Error loading content.</p>');
    });
}

///////////////////////////////////////////////////
///////////////// DESTINATIONS ////////////////////
///////////////////////////////////////////////////
// Filter destination cards and hide other elements
function checkDestinations() {
  const initTotal = 12;
  const destinationBlocks = $('.prtlt-digitup-api-destinos');
  if (destinationBlocks) {
    destinationBlocks.each(function () {
      var $this = $(this);
      const items = $this.find('.carts__item');
      if (items.length > initTotal) {
        items.slice(initTotal).addClass('hide_all');
        $this.find('.carts__button').removeClass('hide_all');
      }
    });
  }
}

// Get more destination card Click and hide load more button
$(document).on('click', '.prtlt-digitup-api-destinos .carts__button', function () {
  $(this).closest('.prtlt-digitup-api-destinos').find('.carts__item').removeClass('hide_all');
  $(this).remove();
});

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

///////////////////////////////////////////////////
///////////////////// CHOLLOS /////////////////////
///////////////////////////////////////////////////
const totalPages = 10; // Total pages of chollos
let currentPage = 1; // current chollo page

function updatePagination() {
  $('.prtlt-digitup-api .pagination .actual a')?.text(currentPage);
  $('.prtlt-digitup-api .pagination .prev')?.toggleClass('disabled', currentPage === 1);
  $('.prtlt-digitup-api .pagination .next')?.toggleClass('disabled', currentPage === totalPages);
}

// Evento clic para el botón "next" in pagination Chollos
$('.prtlt-digitup-api .pagination .next').click(function (e) {
  e.preventDefault();
  if (currentPage < totalPages) {
    currentPage++;
    updatePagination();
  }
});

// Evento clic para el botón "prev" in pagination chollos
$('.prtlt-digitup-api .pagination .prev').click(function (e) {
  e.preventDefault();
  if (currentPage > 1) {
    currentPage--;
    updatePagination();
  }
});

// Pagination for chollos
$('.prtlt-digitup-api .pagination .actual').click(function (e) {
  e.preventDefault();

  // Elimina cualquier menú existente primero
  $('.chollos-pagination-dropdown').remove();

  // Crear el menú desplegable
  let dropdown = $('<ul>', { 'class': 'chollos-pagination-dropdown' }).appendTo('body');

  // Posicionamiento del menú
  let pos = $(this).offset();
  dropdown.css({
    left: pos.left + 'px',
    top: (pos.top + $(this).outerHeight()) + 'px'
  });

  // Llenar el menú con opciones
  for (let i = 1; i <= 10; i++) {
    $('<li>', {
      text: i,
      click: function () {
        $('.pagination .actual a').text(i); // Actualiza el texto del botón "actual"
        dropdown.remove(); // Elimina el menú después de hacer la selección
      }
    }).appendTo(dropdown);
  }

  // Mostrar el menú
  dropdown.show();

  // Cierra el menú si se hace clic fuera
  $(document).on('click', function (event) {
    if (!$(event.target).closest('.chollos-pagination-dropdown, .pagination .actual').length) {
      dropdown.remove();
    }
  });

  e.stopPropagation(); // Detener la propagación para evitar que se cierre inmediatamente
});

// Calendar configuration in chollos
function calendarConfig() {
  console.log('Loaded calendarConfig!!')
  var offersItems = document.querySelectorAll('.offers__item');

  offersItems?.forEach(function (offer) {
    var dataElement = offer.querySelector('.data');
    var calendarBlock = offer.querySelector('.calendar');
    var priceElement = offer.querySelector('.price');
    var calendarItems = offer.querySelectorAll('.calendar_item');

    function toggleCalendar() {
      var isVisible = dataElement.classList.contains('visible') || priceElement.classList.contains('visible');
      hideCalendar(calendarBlock);
      if (!isVisible) {
        showCalendar();
      }
    }

    function hideCalendar() {
      dataElement.classList.remove('visible');
      priceElement.classList.remove('visible');
      calendarBlock.classList.remove('visible');
    }

    function showCalendar() {
      dataElement.classList.add('visible');
      if (window.screen.width < 768) {
        priceElement.classList.add('visible');
      }
      calendarBlock.classList.add('visible');
    }

    dataElement.addEventListener('click', function (event) {
      event.stopPropagation();
      if (window.screen.width >= 768) {
        toggleCalendar();
      }
    });

    priceElement.addEventListener('click', function (event) {
      event.stopPropagation();
      if (window.screen.width < 768) {
        toggleCalendar();
      }
    });

    document.addEventListener('click', function (event) {
      if (!calendarBlock.contains(event.target)) {
        hideCalendar();
      }
    });

    calendarItems.forEach(function (item) {
      item.addEventListener('click', function () {
        var selectedDate = this.querySelector('.calendar_data').textContent;
        var selectedPrice = this.querySelector('.calendar_price').textContent;

        dataElement.textContent = selectedDate;
        dataElement.setAttribute('data-selected-date', selectedDate);
        priceElement.textContent = selectedPrice;

        hideCalendar();
      });
    });
  });
}

// Hover efects in chollos
function hoveredConfig() {
  console.log('Loaded hoveredConfig!!')
  var itemTextBlocks = document.querySelectorAll('.offers__item-text');

  itemTextBlocks?.forEach(function (itemTextBlock) {
    var link = itemTextBlock.querySelector('.offers__item-right-bottom a');

    link.addEventListener('mouseover', function () {
      itemTextBlock.classList.add('hovered');
    });

    link.addEventListener('mouseout', function () {
      itemTextBlock.classList.remove('hovered');
    });
  });

  $(document).ready(function () {
    $('.more_info_recommendation_mobile').click(function () {
      $(this).closest('.recommendations__item').toggleClass('hovered');
    });
  });

  $('.prtlt-digitup-api .offers__item-left p').on('click', function () {
    // Toggle la clase 'active' al span cada vez que se toque el párrafo
    $(this).find('.hide-places').toggleClass('active');
  });

  $('.prtlt-digitup-api .offers__item-right-text').on('click', function () {
    // Toggle la clase 'active' al span cada vez que se toque el párrafo
    $(this).find('span').toggleClass('active');
  });
}

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

///////////////////////////////////////////////////
///////////////// RECOMENDADOS ////////////////////
///////////////////////////////////////////////////
function checkRecomendados() {
  const recomendadosBlocks = $('.prtlt-digitup-api-recomendados');
  if (recomendadosBlocks) {
    recomendadosBlocks.each(function () {
      var $this = $(this);
      const items = $this.find('.recommendations__items');
      if (items.length > 0) {
        // items.removeClass('hide_all');
        items.slice(1).addClass('hide_all');
      }
      const tabs = $this.find('.tabs .tab');
      if (tabs.length > 0) {
        tabs.addClass('active');
        tabs.slice(1).removeClass('active');
      }
    });
  }
}

function loadSliderConfigAll() {
  swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
      nextEl: `.next-swipe`,
      prevEl: `.prev-swipe`,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  $('.next-slide, .prev-slide').on('click', function () {
    const isNext = this.classList.contains('next-slide');

    // Encontrar el contenedor tabs_block más cercano
    const tabsBlock = this.closest('.tabs_block');
    // Dentro del tabs_block, encontrar el contenedor de los ítems
    const recommendationsItems = tabsBlock.querySelector('.recommendations__items:not(.hide_all)');

    if (!recommendationsItems) {
      return;
    }
    var computedStyle = getComputedStyle(recommendationsItems);
    var padding = computedStyle.padding;
    var paddingValues = padding.replace(/px/g, '').split(' '); // Elimina 'px' y divide la cadena en un array
    var paddingNumbers = parseFloat(paddingValues) || 12;

    // Calcular el ancho del primer elemento y el gap
    const item = recommendationsItems.querySelector('.recommendations__item');
    // const style = window.getComputedStyle(item);
    // Asumiendo que el gap es el marginRight (ajustar según tu estructura CSS)
    const gap = 16;
    const scrollWidth = item.offsetWidth + gap + paddingNumbers / 2;

    // Determinar la dirección del scroll
    const scrollAmount = isNext ? scrollWidth : -scrollWidth;

    // Realizar el scroll
    recommendationsItems.scrollBy({
      left: scrollAmount,
      behavior: 'smooth' // Efecto de scroll suave
    });
  });

  checkRecomendados();

  $('.tabs_block').each(function () {
    const tabsBlock = $(this);
    const recommendationsItems = tabsBlock.find('.recommendations__items');
    recommendationsItems.each(function () {
      updateButtons(tabsBlock);
      $(this).on('scroll', function () {
        updateButtons(tabsBlock);
      });
    });
  });

}

function updateButtons(tabsBlock) {
  const recommendationsItems = tabsBlock.find('.recommendations__items:not(.hide_all)');
  const prevButton = tabsBlock.find('.prev-slide');
  const nextButton = tabsBlock.find('.next-slide');

  if (!recommendationsItems.length) {
    return;
  }

  const scrollLeft = recommendationsItems.scrollLeft();
  const scrollWidth = recommendationsItems[0].scrollWidth;
  const clientWidth = recommendationsItems[0].clientWidth;

  // Check if we are at the beginning
  if (scrollLeft === 0) {
    prevButton.addClass('swiper-button-disabled');
  } else {
    prevButton.removeClass('swiper-button-disabled');
  }

  // Check if we are at the end
  if (scrollLeft + clientWidth >= scrollWidth) {
    nextButton.addClass('swiper-button-disabled');
  } else {
    nextButton.removeClass('swiper-button-disabled');
  }
}


// Loading all recomendation tabs
function loadRecomendedTabsFunc() {
  const contentDiv = $('.prtlt-digitup-api .api_content');
  contentDiv?.each(function () {
    loadRecomendedTabs($(this));
  });
}

// Load individual recomendation tab
function loadRecomendedTabs(apiContent, index = 0) {
  console.log('loadRecomendedTabs!!!');
  const tabs = apiContent.closest('.recommendations').find('.tabs .tab');
  console.log('tabs', tabs);
  let config = '';
  console.log('apiContent.attr()', apiContent.attr('data-object'));
  const dataObject = JSON.parse(apiContent.attr('data-object') || '[]');
  if (dataObject.length) {
    config = dataObject[index].url;
  }
  if (tabs.length) {
    return config;
  }
  // const language = getLanguage();
  console.log('loadRecomendedTabs!!!');
  console.log('dataObject', dataObject);
  if (dataObject.length) {
    let tabs = '';
    dataObject.forEach((elem, index) => {
      tabs += `<div class="prtltmmc-cell-boxes-outstand tab recomended_tab prtltmmc-contenteditable ${index === 0 ? 'active' : ''}" data-url="${elem.url}">${elem.title}</div>`;
    });
    apiContent.closest('.main_content').find('.tabs').html(tabs);
  }
  return config;
}

$(document).on('click', '.recomended_tab', function () {
  // const index = $(this).attr('data-index') || 0;
  // const tab = $(this).closest('.tab');
  const tabs = $(this).closest('.tabs');
  const tab = tabs.find('.tab');
  const index = tab.index($(this));
  // const config = $(this).attr('data-url');
  // const urlWeb = `/api-wlgs-portlets/wlgs/portal/no-session/portlet/recomendados/show`;
  // const language = getLanguage();

  tabs.find('.tab').removeClass('active');
  $(this).addClass('active');

  $(this).closest('.prtlt-digitup-api-recomendados').find('.recommendations__items').addClass('hide_all');
  $(this).closest('.prtlt-digitup-api-recomendados').find('.recommendations__items').eq(index)?.removeClass('hide_all');

  const tabsBlock = $(this).closest('.tabs_block');
  setTimeout(function () {
    updateButtons(tabsBlock);
  }, 0);

  // const apiUrl = urlWeb + '/' + language;
  // console.log($(this));
  // requestData(apiUrl, config, $(this).closest('.tabs_block').find('.api_content'));
});

document.addEventListener("DOMContentLoaded", function () {
  const customDropdownsFake = document.querySelectorAll(".custom-dropdown.is_fake");

  customDropdownsFake.forEach(dropdown => {
    const dateComponent = dropdown.closest(".virgin_explore").querySelector(".prtltmmc-search-block-B");

    dropdown.addEventListener("click", function (event) {
      dateComponent.classList.toggle("show");

      // Detener la propagación del evento para evitar el cierre inmediato
      // event.stopPropagation();

      // Añadir el evento de clic al documento para ocultar el dateComponent cuando se hace clic fuera
      document.addEventListener("click", function (event) {
        if (!dateComponent.contains(event.target) && !dropdown.contains(event.target)) {
          dateComponent.classList.remove("show");
        }
      });
    });
  });


  const customDropdowns = document.querySelectorAll(".custom-dropdown:not(.is_fake)");

  customDropdowns.forEach(dropdown => {
    const selectElement = dropdown.previousElementSibling; // Select element before custom dropdown
    const selectedOption = dropdown.querySelector(".selected-option");
    const dropdownOptions = dropdown.querySelector(".dropdown-options");

    dropdown.addEventListener("click", function () {
      loadOptions(selectElement, selectedOption, dropdownOptions);
      // Mostrar u ocultar las opciones del dropdown personalizado
      dropdownOptions.style.display = dropdownOptions.style.display === "none" ? "block" : "none";
    });

    dropdownOptions?.addEventListener("click", function (event) {
      const option = event.target.closest(".option");
      if (option) {
        const value = option.getAttribute("data-value");
        const text = option.textContent;

        // Actualiza el select original y dispara el evento de cambio
        selectElement.value = value;
        const changeEvent = new Event("change", { bubbles: true });
        selectElement.dispatchEvent(changeEvent);

        // Actualiza el texto del dropdown personalizado
        selectedOption.textContent = text;

        // Oculta las opciones del dropdown
        dropdownOptions.style.display = "none";
      }
    });

    // Ocultar el dropdown si se hace clic fuera de él
    document.addEventListener("click", function (event) {
      if (dropdownOptions && !dropdown.contains(event.target)) {
        dropdownOptions.style.display = "none";
      }
    });

    function loadOptions(selectElement, selectedOption, dropdownOptions) {
      // Limpiar las opciones actuales
      dropdownOptions.innerHTML = '';

      // Obtener todas las opciones del select original
      const optgroups = selectElement.querySelectorAll('optgroup');
      const options = selectElement.querySelectorAll(':scope > option');

      // Añadir opciones fuera de optgroups
      options.forEach(option => {
        const value = option.value;
        const text = option.textContent;

        const customOption = document.createElement('div');
        customOption.className = 'option';
        customOption.setAttribute('data-value', value);
        customOption.textContent = text;

        // Verifica si esta opción es la seleccionada
        if (selectElement.value === value) {
          customOption.classList.add('selected');
          selectedOption.textContent = text;
        }

        dropdownOptions.appendChild(customOption);
      });

      // Añadir optgroups y sus opciones
      optgroups.forEach(optgroup => {
        const label = optgroup.label;
        const optgroupLabel = document.createElement('div');
        optgroupLabel.className = 'optgroup-label';
        optgroupLabel.textContent = label;
        dropdownOptions.appendChild(optgroupLabel);

        const optgroupOptions = optgroup.querySelectorAll('option');
        optgroupOptions.forEach(optgroupOption => {
          const value = optgroupOption.value;
          const text = optgroupOption.textContent;

          const customOption = document.createElement('div');
          customOption.className = 'option optgroup-option';
          customOption.setAttribute('data-value', value);
          customOption.textContent = text;

          // Verifica si esta opción es la seleccionada
          if (selectElement.value === value) {
            customOption.classList.add('selected');
            selectedOption.textContent = text;
          }

          dropdownOptions.appendChild(customOption);
        });
      });
    }

    // Inicializa el texto del dropdown personalizado con la opción seleccionada
    function initializeSelectedOption() {
      const selected = selectElement.options[selectElement.selectedIndex];
      selectedOption.textContent = selected.textContent;
    }

    initializeSelectedOption();
  });

});

$(document).ready(function () {
  $('#explore-link').on('click', function (event) {
    event.preventDefault();

    var baseUrl = $(this).attr('href') || MMC.init.result;

    // Recoger los valores de los selects
    var zones = $('#zones').val();
    var embarks = $('#embarks').val();
    var duration = $('#durations').val();

    // Recoger los valores de los li seleccionados
    var selectedDates = $('#departures .prtltmmc-selected').map(function () {
      return $(this).attr('id'); // Obtener el valor del atributo id
    }).get().join(',');

    // Construir los query parameters
    var queryParams = [];
    if (zones && zones !== '') queryParams.push('zone=' + encodeURIComponent(zones));
    if (embarks && embarks !== '') queryParams.push('embark=' + encodeURIComponent(embarks));
    if (duration && duration !== '') queryParams.push('duration=' + encodeURIComponent(duration));
    if (selectedDates) queryParams.push('departure=' + encodeURIComponent(selectedDates));

    // Crear la URL con los query parameters
    var url = baseUrl + '?' + queryParams.join('&');

    // Navegar a la URL
    window.location.href = url;
  });
});





///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

///////////////////////////////////////////////////
///////////////// GENERAL METHODS /////////////////
///////////////////////////////////////////////////
function execConfigs() {

  // $('.swiper').addClass('hide_all');
  // Destinos
  checkDestinations();
  // Chollos
  updatePagination();
  calendarConfig();
  hoveredConfig();
  // Recomendados
  loadRecomendedTabsFunc();
  // checkRecomendados();
  loadSliderConfigAll();
}

// All scripts
execConfigs();
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
  const initTotal = 30;
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
        items.slice(1).addClass('hide_all');
      }
    });
  }
}

// function loadSliderConfigAllOld() {
//   const swipers = document.querySelectorAll('.swiper');

//   swipers.forEach((swiper, index) => {
//     const prevButton = swiper.querySelector('.prev-slide');
//     const nextButton = swiper.querySelector('.next-slide');

//     prevButton?.classList?.add(`prev-slide${index}`);
//     nextButton?.classList?.add(`next-slide${index}`);

//     loadSliderConfig(swiper, index);
//   });
// }
function loadSliderConfigAll() {
  new Swiper('.swiper', {
    slidesPerView: 1.3,
    spaceBetween: 16,
    breakpoints: {
      280: { slidesPerView: 1.3 },
      568: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1200: { slidesPerView: 4 }
    },
    navigation: {
      nextEl: `.next-slide`,
      prevEl: `.prev-slide`,
    },
  });
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
  const tabs = $(this).closest('.tabs').find('.tab');
  const index = tabs.index($(this));
  console.log('index', index);
  // const config = $(this).attr('data-url');
  // const urlWeb = `/api-wlgs-portlets/wlgs/portal/no-session/portlet/recomendados/show`;
  // const language = getLanguage();

  $('.recommendations .tabs .tab').removeClass('active');
  $(this).addClass('active');

  console.log('vlock', $(this).closest('.prtlt-digitup-api-recomendados').find('.recommendations__items'));
  $(this).closest('.prtlt-digitup-api-recomendados').find('.recommendations__items').addClass('hide_all');
  $(this).closest('.prtlt-digitup-api-recomendados').find('.recommendations__items').eq(index)?.removeClass('hide_all');

  // const apiUrl = urlWeb + '/' + language;
  // console.log($(this));
  // requestData(apiUrl, config, $(this).closest('.tabs_block').find('.api_content'));
});

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

///////////////////////////////////////////////////
///////////////// GENERAL METHODS /////////////////
///////////////////////////////////////////////////
function execConfigs() {
  // Destinos
  checkDestinations();
  // Chollos
  updatePagination();
  calendarConfig();
  hoveredConfig();
  // Recomendados
  loadRecomendedTabsFunc();
  checkRecomendados();
  loadSliderConfigAll();
}

// All scripts
execConfigs();
// import { getContent } from './portlets-vm.js';

document.addEventListener('DOMContentLoaded', function () {
  var dataObject = [];
  $(document).on('click', '.prtlt-digitup-api-options .open-api-config', function () {
    var apiContent = $(this).closest('.prtlt-digitup-api').find('.api_content');
    var currentUrl = apiContent.attr('data-url');
    var currentPortlet = apiContent.attr('data-portletType') || ''; // Asegúrate de manejar undefined
    var $portlet = $(this).closest('.prtlt-digitup-api');
    // Obtén el índice o un identificador único del portlet
    var portletIndex = $('.prtlt-digitup-api').index($portlet);
    dataObject = JSON.parse(apiContent.attr('data-object') || '[]');

    var modalHtml;
    if (currentPortlet !== 'prtlt-digitup-api-recomendados') {
      modalHtml = `
          <div class="config-modal-api-backdrop"></div>
          <div class="config-modal-api">
              <h2>Configuración portlet</h2>
              <div>
                  <label>URL configuracion:</label>
                  <input type="text" id="configUrl" value="${currentUrl}">
              </div>
              <div class="bottom_side">
                <button id="cancelConfig">Cancelar</button>
                <button id="saveConfig" data-portlet-index="${portletIndex}">Guardar</button>
              </div>
          </div>
      `;
    } else {
      modalHtml = `
        <div class="config-modal-api-backdrop"></div>
          <div class="config-modal-api">
              <h2>Configuración portlet Recomendados</h2>
              <div id="items-container">
                  ${dataObject.map(item => `
                      <div class="item">
                        <div class="left_side">
                          <div><b>ES:</b> ${item.title.es}</div>
                          <div><b>EN:</b> ${item.title.en}</div>
                          <div><b>Config:</b> ${item.url}</div>
                        </div>
                        <div class="right_side">
                          <button class="remove-item" data-index="${dataObject.indexOf(item)}">Eliminar</button>
                        </div>
                      </div>
                  `).join('')}
              </div>
              <div class="inputs_fields">
                  <input id="title-es" placeholder="Título ES" />
                  <input id="title-en" placeholder="Título EN" />
                  <input id="config-url" placeholder="URL de Configuración" />
                  <button id="add-item">Añadir</button>
              </div>
              <div class="bottom_side">
                  <button id="cancelConfig">Cancelar</button>
                  <button id="saveConfig" data-portlet-index="${portletIndex}">Guardar</button>
              </div>
          </div>
      `;
    }

    $('body').append(modalHtml);
  });

  $(document).on('click', '.prtlt-digitup-api-options .remove-api-portlet', function () {
    if (confirm("¿Estás seguro de que deseas eliminar este portlet?")) {
      $(this).closest('.prtlt-digitup-api').remove();
    }
  });

  $(document).on('click', '#saveConfig', function () {
    var portletIndex = $(this).data('portlet-index');  // Recupera el índice del portlet
    var url = $('#configUrl').val();
    // var portlet = $(this).attr('data-portletType');

    // console.log('portlet', portlet);
    // var apiContent = $('.' + portlet).closest('.prtlt-digitup-api').find('.api_content');
    var apiContent = $('.prtlt-digitup-api').eq(portletIndex).find('.api_content');

    var currentPortlet = apiContent.attr('data-portletType') || ''; // Asegúrate de manejar undefined
    if (currentPortlet !== 'prtlt-digitup-api-recomendados') {
      apiContent.attr('data-url', url);
    } else {
      apiContent.attr('data-object', JSON.stringify(dataObject));
    }
    getContent();
  });

  $(document).on('click', '#cancelConfig, #saveConfig', function () {
    $('.config-modal-api-backdrop, .config-modal-api').remove(); // Esto removerá ambos elementos del DOM
  });

  $(document).on('click', '.config-modal-api-backdrop', function () {
    $('.config-modal-api-backdrop, .config-modal-api').remove(); // Esto removerá ambos elementos del DOM
  });

  // Recomendados:
  $(document).on('click', '#add-item', function () {
    var titleEs = $('#title-es').val();
    var titleEn = $('#title-en').val();
    var configUrl = $('#config-url').val();
    if (titleEs && titleEn && configUrl) {
      var newItem = {
        title: { es: titleEs, en: titleEn },
        url: configUrl
      };
      dataObject.push(newItem);
      $('#title-es').val('');
      $('#title-en').val('');
      $('#config-url').val('');
      updateItemsDisplay();  // Función para actualizar la visualización de ítems
    }
  });

  $(document).on('click', '.remove-item', function () {
    var index = $(this).data('index');
    dataObject.splice(index, 1);
    updateItemsDisplay();  // Actualizar la visualización después de eliminar
  });

  // Función para actualizar la lista de ítems en la modal
  function updateItemsDisplay() {
    var itemsContainer = $('#items-container');
    itemsContainer.empty();
    dataObject.forEach((item, index) => {
      itemsContainer.append(`
            <div class="item">
              <div class="left_side">
                <div><b>ES:</b> ${item.title.es}</div>
                <div><b>EN:</b> ${item.title.en}</div>
                <div><b>Config:</b> ${item.url}</div>
              </div>
              <div class="right_side">
                <button class="remove-item" data-index="${index}">Eliminar</button>
              </div>
            </div>
        `);
    });
  }

});
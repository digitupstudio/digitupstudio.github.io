

document.addEventListener('DOMContentLoaded', function () {
  // TODO: DELETE
  // $('body').on('click', '.dropdown-menu-right.prtltmmc-options-portlet-digitup', function (e) {
  //   e.preventDefault();
  //   if (!$(this).closest('.ui-sortable').length) {
  //     $(this).toggleClass('open');
  //   } else {

  //   }
  // });

  $(document).on('click', '.prtlt-digitup-api-options .add-new-tab', function (event) {
    event.preventDefault();
    const tabsContainer = $(this).closest('.tabs');
    // const allTabs = tabsContainer.find('.tab');
    // const lastIndex = allTabs.length - 1;  // Índice del último tab actual
    // const newIndex = lastIndex + 1;  // Nuevo índice para el nuevo tab

    // Crear el nuevo tab con el índice correcto
    const newTab = `<div class="tab recomended_tab prtltmmc-contenteditable prtltmmc-cell-boxes-outstand" data-url="">New tab</div>`;
    tabsContainer.append(newTab);

    // Suponiendo que esto inicializa alguna funcionalidad en el nuevo tab
    prtltmmcCkEditor.createNewInstances();
  });

  $(document).on('click', '.prtlt-digitup-api-options .open-api-config', function (event) {
    event.preventDefault();
    var apiContent = $(this).closest('.prtlt-digitup-api').find('.api_content');
    var currentUrl = apiContent.attr('data-url') || '';
    // var currentPortlet = apiContent.attr('data-portletType') || ''; // Asegúrate de manejar undefined
    var $portlet = $(this).closest('.prtlt-digitup-api');
    // Obtén el índice o un identificador único del portlet
    var portletIndex = $('.prtlt-digitup-api').index($portlet);
    // const dataObject = JSON.parse(apiContent.attr('data-object') || '[]');
    var tabIndex = -1;
    if (!currentUrl) {
      const tab = $(this).closest('.tab');
      if (tab) {
        const tabs = $(this).closest('.tabs').find('.tab');
        tabIndex = tabs.index(tab);
        // console.log('dataObject', dataObject);
        // console.log('tabIndex', tabIndex);
        currentUrl = tab.attr('data-url');
      }
      // if (!currentUrl) {
      //   currentUrl = dataObject?.[tabIndex]?.url || ''
      // }
    }

    var modalHtml;
    modalHtml = `
        <div class="config-modal-api-backdrop"></div>
        <div class="config-modal-api">
            <h2>Portlet configuration</h2>
            <div>
                <label>URL configuration:</label>
                <input type="text" placeholder="url configuration" id="configUrl" value="${currentUrl || ''}">
            </div>
            <div class="bottom_side">
              <button id="cancelConfig">Cancel</button>
              <button id="saveConfig" data-tab-index="${tabIndex}" data-portlet-index="${portletIndex}">Save</button>
            </div>
        </div>
    `;
    // if (currentPortlet !== 'prtlt-digitup-api-recomendados') {
    // } else {
    //   modalHtml = `
    //     <div class="config-modal-api-backdrop"></div>
    //       <div class="config-modal-api">
    //           <h2>Portlet configuration "Recomended"</h2>
    //           <div id="items-container">
    //               ${dataObject.map(item => `
    //                   <div class="item">
    //                     <div class="left_side">
    //                       <div><b>ES:</b> ${item.title.es}</div>
    //                       <div><b>EN:</b> ${item.title.en}</div>
    //                       <div><b>Config:</b> ${item.url}</div>
    //                     </div>
    //                     <div class="right_side">
    //                       <button class="remove-item" data-index="${dataObject.indexOf(item)}">Delete</button>
    //                     </div>
    //                   </div>
    //               `).join('')}
    //           </div>
    //           <div class="inputs_fields">
    //               <input id="title-es" placeholder="Título ES" />
    //               <input id="title-en" placeholder="Título EN" />
    //               <input id="config-url" placeholder="URL configuration" />
    //               <button id="add-item">Add</button>
    //           </div>
    //           <div class="bottom_side">
    //               <button id="cancelConfig">Cancel</button>
    //               <button id="saveConfig" data-portlet-index="${portletIndex}">Save</button>
    //           </div>
    //       </div>
    //   `;
    // }

    $('body').append(modalHtml);
  });

  $(document).on('click', '.prtlt-digitup-api-options .remove-api-portlet', function () {
    if (confirm("Are you sure you want to delete this portlet?")) {
      $(this).closest('.prtlt-digitup-api').remove();
    }
  });

  $(document).on('click', '#saveConfig', function () {
    var tabIndex = $(this).attr('data-tab-index');
    var portletIndex = $(this).attr('data-portlet-index');
    console.log('tabIndex', tabIndex);
    console.log('portletIndex', portletIndex);
    var url = $('#configUrl').val();
    // var portlet = $(this).attr('data-portletType');

    // console.log('portlet', portlet);
    // var apiContent = $('.' + portlet).closest('.prtlt-digitup-api').find('.api_content');
    var apiContent = $('.prtlt-digitup-api').eq(portletIndex).find('.api_content');
    console.log('apiContent', apiContent);

    var currentPortlet = apiContent.attr('data-portletType') || ''; // Asegúrate de manejar undefined
    console.log('currentPortlet', currentPortlet);
    if (currentPortlet !== 'prtlt-digitup-api-recomendados') {
      apiContent.attr('data-url', url);
    } else if (currentPortlet === 'prtlt-digitup-api-recomendados') {
      const tab = apiContent.closest('.recommendations').find('.tab').eq(tabIndex);
      tab.attr('data-url', url);
      copyTabsUrlToApi();
    }
    getContent();
  });

  // Recomendados:
  // $(document).on('click', '#add-item', function () {
  //   var titleEs = $('#title-es').val();
  //   var titleEn = $('#title-en').val();
  //   var configUrl = $('#config-url').val();
  //   if (titleEs && titleEn && configUrl) {
  //     var newItem = {
  //       title: { es: titleEs, en: titleEn },
  //       url: configUrl
  //     };
  //     dataObject.push(newItem);
  //     $('#title-es').val('');
  //     $('#title-en').val('');
  //     $('#config-url').val('');
  //     updateItemsDisplay();  // Función para actualizar la visualización de ítems
  //   }
  // });

  // $(document).on('click', '.remove-item', function () {
  //   var index = $(this).data('index');
  //   dataObject.splice(index, 1);
  //   updateItemsDisplay();  // Actualizar la visualización después de eliminar
  // });

  // Función para actualizar la lista de ítems en la modal
  // function updateItemsDisplay() {
  //   var itemsContainer = $('#items-container');
  //   itemsContainer.empty();
  //   dataObject.forEach((item, index) => {
  //     itemsContainer.append(`
  //           <div class="item">
  //             <div class="left_side">
  //               <div><b>ES:</b> ${item.title.es}</div>
  //               <div><b>EN:</b> ${item.title.en}</div>
  //               <div><b>Config:</b> ${item.url}</div>
  //             </div>
  //             <div class="right_side">
  //               <button class="remove-item" data-index="${index}">Delete</button>
  //             </div>
  //           </div>
  //       `);
  //   });
  // }

  $(document).on('click', '.add-new-card', function (event) {
    event.preventDefault();
    var itemsBlock = $(this).closest('.prtlt-digitup-generic').find('.options_all_items');
    console.log('itemsBlock', itemsBlock);
    var item = itemsBlock.find('.options_item_to_copy');
    console.log('item', item);
    var lastElem = item[item.length - 1];
    console.log('lastElem', lastElem);
    var clonedElem = $(lastElem).clone(true); // Clonar el último elemento
    console.log('clonedElem', clonedElem);
    clonedElem.find('.cke_editable').removeClass('cke_editable');
    itemsBlock.append(clonedElem);

    prtltmmcCkEditor.createNewInstances();

  });

  $(document).on('click', '.delete-cards-option', function () {
    $(this).closest('.prtlt-digitup-generic').find('.option_button.delete-card').toggleClass('hidden');
    if ($(this).hasClass('warning')) {
      $(this).addClass('success');
      $(this).removeClass('warning');
      $(this).text('Terminar edición');
    } else {
      $(this).removeClass('success');
      $(this).addClass('warning');
      $(this).text('Editar cards');
    }
  });

  $(document).on('click', '.open-options-link', function (event) {
    event.preventDefault();
    var $mainContent = $(this).closest('.carts__items');
    var $images = $mainContent.find('img');
    var $image = $(this).closest('.options_item_to_copy').find('img');
    var imageIndex = $images.index($image);
    var $portlet = $(this).closest('.prtlt-digitup-generic');
    var portletIndex = $('.prtlt-digitup-generic').index($portlet);
    console.log("Índice de la imagen: " + imageIndex);

    modalHtml = `
          <div class="config-modal-api-backdrop"></div>
          <div class="config-modal-api">
              <h2>Image configuration</h2>
              <div>
                  <label>URL configuration:</label>
                  <input type="text" id="imageConfigUrl" value="${$image.attr('src')}">
              </div>
              <div class="bottom_side">
                <button class="danger" id="cancelConfig">Cancel</button>
                <button class="success" id="saveImageUrl" data-image-index="${imageIndex}" data-portlet-index="${portletIndex}">Save</button>
              </div>
          </div>
      `;

    $('body').append(modalHtml);
  });

  $(document).on('click', '#saveImageUrl', function () {
    console.log('click #saveImageUrl');
    var imageIndex = $(this).attr('data-image-index');  // Recupera el índice del portlet
    console.log('imageIndex', imageIndex);
    var url = $('#imageConfigUrl').val();
    console.log('url', url);
    var portletIndex = $(this).attr('data-portlet-index');
    console.log('portletIndex', portletIndex);
    var imageContent = $('.prtlt-digitup-generic').eq(portletIndex).find('.carts__item').eq(imageIndex).find('img');
    console.log('imageContent', imageContent);

    imageContent.attr('src', url);
  });

  $(document).on('click', '.delete-card', function () {
    if (confirm("Are you sure you want to delete this element?")) {
      $(this).closest('.carts__item').remove();
    }
  });

  $(document).on('click', '#cancelConfig, #saveConfig, #saveImageUrl', function () {
    $('.config-modal-api-backdrop, .config-modal-api').remove(); // Esto removerá ambos elementos del DOM
  });

  $(document).on('click', '.config-modal-api-backdrop', function () {
    $('.config-modal-api-backdrop, .config-modal-api').remove(); // Esto removerá ambos elementos del DOM
  });

});

function copyTabsUrlToApi() {
  $('.prtlt-digitup-api-recomendados').each(function () {
    const dataObject = [];
    // const dataObject = JSON.parse(apiContent.attr('data-object') || '[]');
    $(this).find('.tab').each(function () {
      console.log('tab each');
      const url = $(this).attr('data-url');
      console.log('url', url);
      const title = $(this).find('p').text();
      console.log('title', title);
      dataObject.push({ title, url });
    });
    $(this).find('.api_content').attr('data-object', JSON.stringify(dataObject));
  });

}
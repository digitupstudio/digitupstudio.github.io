// initializeCalendarFunctionality();

document.addEventListener("DOMContentLoaded", function () {
  var offersItems = document.querySelectorAll(".offers__item");

  offersItems.forEach(function (offer) {
    var dataElement = offer.querySelector(".data");
    var calendarBlock = offer.querySelector(".calendar");
    var priceElement = offer.querySelector(".price");
    var calendarItems = offer.querySelectorAll(".calendar_item");

    function toggleCalendar() {
      var isVisible =
        dataElement.classList.contains("visible") ||
        priceElement.classList.contains("visible");
      hideCalendar(calendarBlock);
      if (!isVisible) {
        showCalendar();
      }
    }

    function hideCalendar() {
      dataElement.classList.remove("visible");
      priceElement.classList.remove("visible");
      calendarBlock.classList.remove("visible");
    }

    function showCalendar() {
      dataElement.classList.add("visible");
      if (window.screen.width < 768) {
        priceElement.classList.add("visible");
      }
      calendarBlock.classList.add("visible");
    }

    dataElement.addEventListener("click", function (event) {
      event.stopPropagation();
      if (window.screen.width >= 768) {
        toggleCalendar();
      }
    });

    priceElement.addEventListener("click", function (event) {
      event.stopPropagation();
      if (window.screen.width < 768) {
        toggleCalendar();
      }
    });

    // calendarBlock.addEventListener('mouseleave', function (event) {
    //     if (!event.relatedTarget || !calendarBlock.contains(event.relatedTarget)) {
    //         hideCalendar();
    //     }
    // });

    document.addEventListener("click", function (event) {
      if (!calendarBlock.contains(event.target)) {
        hideCalendar();
      }
    });

    calendarItems.forEach(function (item) {
      item.addEventListener("click", function () {
        var selectedDate = this.querySelector(".calendar_data").textContent;
        var selectedPrice = this.querySelector(".calendar_price").textContent;

        dataElement.textContent = selectedDate;
        dataElement.setAttribute("data-selected-date", selectedDate);
        priceElement.textContent = selectedPrice;

        hideCalendar();
      });
    });
  });
});

const swiper = new Swiper(".swiper", {
  slidesPerView: 4,
  spaceBetween: 17,
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
    568: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
  navigation: {
    nextEl: ".next-slide",
    prevEl: ".prev-slide",
  },
});
const swiperMain = new Swiper(".main-screen__slider", {
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

$(".tabs .tab").click(function () {
  var tabId = $(this).data("tab");

  $(".tabs .tab").removeClass("active");
  $(this).addClass("active");

  $(".tab-pane").removeClass("active");
  $("#" + tabId).addClass("active");
});

$(document).ready(function () {
  $(".tabs .tab:first").addClass("active");
});

var itemTextBlocks = document.querySelectorAll(".offers__item-text");

itemTextBlocks.forEach(function (itemTextBlock) {
  var link = itemTextBlock.querySelector("a");

  link.addEventListener("mouseover", function () {
    itemTextBlock.classList.add("hovered");
  });

  link.addEventListener("mouseout", function () {
    itemTextBlock.classList.remove("hovered");
  });
});

// noUiSlider
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");

  noUiSlider.create(slider, {
    start: [50, 20000],
    connect: true,
    range: {
      min: 50,
      max: 20000,
    },
  });

  slider.noUiSlider.on("update", function (values, handle) {
    let handles = slider.querySelectorAll(".noUi-handle");

    handles.forEach(function (handle, index) {
      handle.setAttribute("data-value", values[index]);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const slider1 = document.getElementById("slider1");

  noUiSlider.create(slider1, {
    start: [50, 20000],
    connect: true,
    range: {
      min: 50,
      max: 20000,
    },
  });

  slider1.noUiSlider.on("update", function (values, handle) {
    let handles = slider1.querySelectorAll(".noUi-handle");

    handles.forEach(function (handle, index) {
      handle.setAttribute("data-value", values[index]);
    });
  });
});

// desktop full filters
document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".cruise-result__bottom-filters");
  const wrapper = document.querySelector(".cruise-result-full-wrapper");

  button.addEventListener("click", function () {
    wrapper.classList.toggle("is-open");
  });
});

// Loader
document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loader-wrapper");
  loader.style.display = "flex";

  setTimeout(function () {
    loader.style.display = "none";
  }, 1000);
});

// Mobile Menu
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuBtnOpen = document.querySelector(".menu-btn-open");
  const menuBtnClose = document.querySelector(".menu-btn-close");

  const toggleMenu = () => mobileMenu.classList.toggle("is-open");
  const disableScroll = () =>
    document.body.classList.toggle("is-scroll-disabled");

  menuBtnOpen.addEventListener("click", toggleMenu);
  menuBtnClose.addEventListener("click", toggleMenu);

  menuBtnOpen.addEventListener("click", disableScroll);
  menuBtnClose.addEventListener("click", disableScroll);
});

// mobile submenu
document.addEventListener("DOMContentLoaded", function () {
  const mobileSubmenu = document.querySelector(".mobile-menu .submenu");
  const submenuBtnOpen = document.querySelector(".parent-mobile a");
  const submenuBtnClose = document.querySelector(".submenu .submenu-btn-close");

  const toggleSubmenu = () => mobileSubmenu.classList.add("is-open");
  const closeSubmenu = () => mobileSubmenu.classList.remove("is-open");

  submenuBtnOpen.addEventListener("click", toggleSubmenu);
  submenuBtnClose.addEventListener("click", closeSubmenu);
});

// Filters mobile
document.addEventListener("DOMContentLoaded", function () {
  const filtersMenu = document.querySelector(".filters-menu");
  const filtersBtnOpen = document.querySelectorAll(".filters-btn-open");
  const filtersBtnClose = document.querySelectorAll(".filters-btn-close");

  const toggleFilters = () => filtersMenu.classList.toggle("is-open");
  const disableScroll = () =>
    document.body.classList.toggle("is-scroll-disabled");

  filtersBtnOpen.forEach(btn => {
    btn.addEventListener("click", () => {
      toggleFilters();
      disableScroll();
    });
  });

  filtersBtnClose.forEach(btn => {
    btn.addEventListener("click", () => {
      toggleFilters();
      disableScroll();
    });
  });
});

// Orden mobile
document.addEventListener("DOMContentLoaded", function () {
  const OrdenMenu = document.querySelector(".orden-menu");
  const OrdenBtnOpen = document.querySelector(".orden-btn-open");
  const OrdenBtnClose = document.querySelector(".orden-btn-close");

  const toggleOrden = () => OrdenMenu.classList.toggle("is-open");
  const disableScroll = () =>
    document.body.classList.toggle("is-scroll-disabled");

  OrdenBtnOpen.addEventListener("click", toggleOrden);
  OrdenBtnClose.addEventListener("click", toggleOrden);

  OrdenBtnOpen.addEventListener("click", disableScroll);
  OrdenBtnClose.addEventListener("click", disableScroll);
});

// Filtros mobile
document.addEventListener("DOMContentLoaded", function () {
  const FiltrosMenu = document.querySelector(".filtros-menu");
  const FiltrosBtnOpen = document.querySelector(".filtros-btn-open");
  const FiltrosBtnClose = document.querySelector(".filtros-btn-close");

  const toggleFiltros = () => FiltrosMenu.classList.toggle("is-open");

  FiltrosBtnOpen.addEventListener("click", toggleFiltros);
  FiltrosBtnClose.addEventListener("click", toggleFiltros);
});

//cards-mobile
document.addEventListener("DOMContentLoaded", function () {
  const cardsButton = document.querySelectorAll(
    ".results__cards-item-mobile-crucero-button"
  );

  cardsButton.forEach(function (button) {
    button.addEventListener("click", function () {
      const cardsText = this.closest(
        ".results__cards-item-mobile-crucero"
      ).nextElementSibling;
      cardsText.classList.toggle("open");
      this.classList.toggle("open");
    });
  });
});

// table Slider
const swiperTable = new Swiper(".result-table-price-slider", {
  slidesPerView: 6,
  spaceBetween: 50,
  loop: true,

  navigation: {
    nextEl: ".result-table-price__top-button.next",
    prevEl: ".result-table-price__top-button.prev",
  },
});

// table open submenu
document.addEventListener("DOMContentLoaded", function () {
  const tableButtons = document.querySelectorAll(
    ".result-table-price__cost-checkbox-button"
  );

  tableButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const subWrapper = this.closest(
        ".result-table-price__cost"
      ).nextElementSibling;
      subWrapper.classList.toggle("open");
      this.classList.toggle("open");
    });
  });
  tableButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const Wrapper = this.closest(".result-table-price__cost");
      Wrapper.classList.toggle("active");
    });
  });
});

// cards open table
document.addEventListener("DOMContentLoaded", function () {
  const dateButtons = document.querySelectorAll(".attributes__item .date");
  const heartButtons = document.querySelectorAll(".heart");

  function handleClick(button) {
    const resultsCardItem = button.closest(".results__cards-item");
    const tableWrapper = resultsCardItem.nextElementSibling;

    tableWrapper.classList.toggle("open");
    button.classList.toggle("open");

    if (button.matches(".attributes__item .date")) {
      button.querySelector("svg").classList.toggle("open");
    }

    if (button.matches(".attributes__item .date")) {
      const heartButton = resultsCardItem.querySelector(".heart");
      if (heartButton) {
        heartButton.classList.toggle("open");
      }
    } else if (button.matches(".heart")) {
      const dateButton = resultsCardItem.querySelector(
        ".attributes__item .date"
      );
      if (dateButton) {
        dateButton.classList.toggle("open");
        dateButton.querySelector("svg").classList.toggle("open");
      }
    }
  }

  dateButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      handleClick(button);
    });
  });

  heartButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      handleClick(button);
    });
  });
});

//table Slider mobile
const swiperTableMobile = new Swiper(".result-table-price-mobile-slider", {
  slidesPerView: 4,
  freeMode: true,
});

//Mobile table open submenu
document.addEventListener("DOMContentLoaded", function () {
  const tableButtons = document.querySelectorAll(
    ".result-table-price-mobile__cost-button"
  );

  tableButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const subMobileWrapper = this.closest(
        ".result-table-price-mobile__cost"
      ).nextElementSibling;
      subMobileWrapper.classList.toggle("open");
      this.classList.toggle("open");
    });
  });
  tableButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const MobileWrapper = this.closest(".result-table-price-mobile__cost");
      MobileWrapper.classList.toggle("open");
    });
  });
});

//Mobile cards open table
document.addEventListener("DOMContentLoaded", function () {
  const cardsButtons = document.querySelectorAll(".results__cards-price img");

  cardsButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const tableMobileWrapper = this.closest(
        ".results__cards-item-mobile"
      ).nextElementSibling;
      tableMobileWrapper.classList.toggle("open");
      this.classList.toggle("open");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cardsButtons = document.querySelectorAll(".heart");

  cardsButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const tableMobileWrapper = this.closest(
        ".results__cards-item-mobile"
      ).nextElementSibling;
      tableMobileWrapper.classList.toggle("open");
      this.classList.toggle("open");
    });
  });
});

//cards help
document.addEventListener("DOMContentLoaded", function () {
  const modalHelp = document.querySelector(".modal-help-backdrop");
  const modalBtnOpen = document.querySelectorAll(".help");
  const modalBtnClose = document.querySelector(".modal-help__close");

  const toggleModalHelp = () => modalHelp.classList.toggle("open");

  modalBtnOpen.forEach(btn => {
    btn.addEventListener("click", toggleModalHelp);
  });
  modalBtnClose.addEventListener("click", toggleModalHelp);
});

//cards badge
document.addEventListener("DOMContentLoaded", function () {
  const badgeBtnOpen = document.querySelectorAll(
    ".results__cards-badge button"
  );

  badgeBtnOpen.forEach(function (button) {
    button.addEventListener("click", function () {
      const modalBadge = this.nextElementSibling;

      modalBadge.classList.add("open");

      const closeButton = modalBadge.querySelector(".modal-badge__close");

      if (closeButton) {
        closeButton.addEventListener("click", function () {
          modalBadge.classList.remove("open");
        });
      }
    });
  });
});

//cards cities
document.addEventListener("DOMContentLoaded", function () {
  const citiesBtnOpen = document.querySelectorAll(".col-text span");

  citiesBtnOpen.forEach(function (button) {
    button.addEventListener("click", function () {
      const modalCities = this.nextElementSibling;

      modalCities.classList.add("open");

      const closeButton = modalCities.querySelector(".modal-cities__close");

      if (closeButton) {
        closeButton.addEventListener("click", function () {
          modalCities.classList.remove("open");
        });
      }
    });
  });
});

// product route
document.addEventListener("DOMContentLoaded", function () {
  const routeBtn = document.querySelector(
    ".product-route__bottom-button-mobile"
  );
  const route = document.querySelector(".product-route__bottom-right");

  if (routeBtn && route) {
    routeBtn.addEventListener("click", function () {
      route.style.overflowY = "visible";
      route.style.maxHeight = "max-content";
    });
  }
});

// product description top slider
const descriptionTopSwiper = new Swiper(".product-description__top-slider", {
  slidesPerView: "auto",
  spaceBetween: 8,
  freeMode: true,
});

// product description slider
const descriptionSwiper = new Swiper(".product-description__slider", {
  slidesPerView: 1,
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },
});

// product route slider
const routeSwiper = new Swiper(".product-route__slider", {
  slidesPerView: 1,
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },
});

// fixed reserv
document.addEventListener("DOMContentLoaded", function () {
  const fixedBlock = document.querySelector(".product-reservs");
  const scrollHeightToShow = 200;

  function updateFixedBlockStyle() {
    if (window.scrollY > scrollHeightToShow && window.innerWidth >= 800) {
      fixedBlock.style.display = "block";
    } else {
      fixedBlock.style.display = "none";
    }
  }

  updateFixedBlockStyle();
  window.addEventListener("scroll", updateFixedBlockStyle);
});

// Product Tab
document.addEventListener("DOMContentLoaded", function () {
  function openTab(tabName) {
    document
      .querySelectorAll(".product-description__top-contents button")
      .forEach(button => {
        button.classList.remove("active");
      });
    document
      .querySelectorAll(".product-description__top-slide button")
      .forEach(button => {
        button.classList.remove("active");
      });

    document
      .querySelector(
        `.product-description__top-contents button[data-tab="${tabName}"]`
      )
      .classList.add("active");
    document
      .querySelector(
        `.product-description__top-slide button[data-tab="${tabName}"]`
      )
      .classList.add("active");

    document.querySelectorAll(".product-description__bottom").forEach(tab => {
      tab.style.display = "none";
    });
    document.querySelector(
      `.product-description__bottom.${tabName}`
    ).style.display = "flex";
  }

  const firstTab = document.querySelector(
    ".product-description__top-contents button"
  );
  if (firstTab) {
    const firstTabName = firstTab.getAttribute("data-tab");
    openTab(firstTabName);
  }

  document
    .querySelectorAll(".product-description__top-contents button")
    .forEach(button => {
      button.addEventListener("click", function () {
        const tabName = this.getAttribute("data-tab");
        openTab(tabName);
      });
    });
  document
    .querySelectorAll(".product-description__top-slide button")
    .forEach(button => {
      button.addEventListener("click", function () {
        const tabName = this.getAttribute("data-tab");
        openTab(tabName);
      });
    });
});

// Mas Filtros select-checkbox
document.addEventListener("DOMContentLoaded", function () {
  const selectButtons = document.querySelectorAll(".select");

  selectButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const checkboxWrapper = this.nextElementSibling;
      const image = this.querySelector("img");

      checkboxWrapper.classList.toggle("open");
      image.classList.toggle("open");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const checkboxWrappers = document.querySelectorAll(".checkbox-wrapper");

  checkboxWrappers.forEach(function (wrapper) {
    const checkboxes = wrapper.querySelectorAll("input[type='checkbox']");
    const selectButton = wrapper.previousElementSibling.querySelector("span");

    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        let count = 0;
        checkboxes.forEach(function (checkbox) {
          if (checkbox.checked) {
            count++;
          }
        });
        selectButton.textContent = count;
        if (count === 0) {
          selectButton.style.display = "none";
        } else {
          selectButton.style.display = "inline-flex";
        }
      });
    });
  });
});

// counter
document.addEventListener("DOMContentLoaded", function () {
  const counterElement = document.querySelector(".counter span");
  const minusButton = document.querySelector(".counter .minus");
  const plusButton = document.querySelector(".counter .plus");

  let counter = parseInt(counterElement.textContent, 10);

  minusButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (counter > 1) {
      counter--;
      counterElement.textContent = counter;
    }
  });

  plusButton.addEventListener("click", function (event) {
    counter++;
    counterElement.textContent = counter;
  });
});

// modal promo
document.addEventListener("DOMContentLoaded", function () {
  const promoBtnOpen = document.querySelectorAll(
    ".info-passengers__bottom-buttons-check-promo"
  );
  const promoBtnClose = document.querySelectorAll(".modal-promo__close");

  promoBtnOpen.forEach(function (button) {
    button.addEventListener("click", function () {
      const modalPromo = button.nextElementSibling;
      if (modalPromo && modalPromo.classList.contains("modal-promo-backdrop")) {
        modalPromo.classList.add("open");
      }
    });
  });

  promoBtnClose.forEach(function (button) {
    button.addEventListener("click", function () {
      const modalPromo = button.closest(".modal-promo-backdrop");
      if (modalPromo) {
        modalPromo.classList.remove("open");
      }
    });
  });
});

// Open info
document.addEventListener("DOMContentLoaded", function () {
  const reserveButtons = document.querySelectorAll(
    ".results__cards-footer-button .info-btn-open"
  );

  reserveButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const infoPassengers = this.closest(".results__cards-item")
        .nextElementSibling.nextElementSibling;
      if (infoPassengers) {
        infoPassengers.classList.toggle("open");
        infoPassengers
          .querySelector(".info-passengers__top")
          .classList.remove("active");
        infoPassengers
          .querySelector(".info-passengers__top")
          .nextElementSibling.classList.remove("active");
        this.classList.toggle("open");
        infoPassengers.nextElementSibling.classList.remove("open");
      }
    });
  });
});

// Open info mobile
document.addEventListener("DOMContentLoaded", function () {
  const reserveButtons = document.querySelectorAll(
    ".results__cards-footer-mobile .info-btn-open"
  );

  reserveButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const infoPassengers = this.closest(".results__cards-item-mobile")
        .nextElementSibling.nextElementSibling;
      if (infoPassengers) {
        infoPassengers.classList.toggle("open");
        infoPassengers
          .querySelector(".info-passengers__top")
          .classList.remove("active");
        infoPassengers
          .querySelector(".info-passengers__top")
          .nextElementSibling.classList.remove("active");
        this.classList.toggle("open");
        infoPassengers.nextElementSibling.classList.remove("open");
      }
    });
  });
});

// Close info
document.addEventListener("DOMContentLoaded", function () {
  const InfoClose = document.querySelectorAll(".info-passengers__close");

  InfoClose.forEach(function (button) {
    button.addEventListener("click", function () {
      const infoPassengers = this.closest(".info-passengers");
      if (infoPassengers) {
        infoPassengers.classList.toggle("open");
        infoPassengers
          .querySelector(".info-passengers__top")
          .classList.remove("active");
        infoPassengers
          .querySelector(".info-passengers__top")
          .nextElementSibling.classList.remove("active");
        this.classList.toggle("open");
        infoPassengers.nextElementSibling.classList.remove("open");
        infoPassengers.previousElementSibling.previousElementSibling
          .querySelector(".results__cards-footer-button button")
          .classList.remove("open");
      }
    });
  });
});

// Open info cabin
document.addEventListener("DOMContentLoaded", function () {
  const infoCabinOpen = document.querySelectorAll(
    ".info-passengers__bottom-buttons-continue"
  );

  infoCabinOpen.forEach(function (button) {
    button.addEventListener("click", function () {
      const infoCabin = this.closest(".info-passengers").nextElementSibling;
      if (infoCabin) {
        infoCabin.classList.toggle("open");
        this.closest(".info-passengers__bottom").classList.toggle("active");
        this.closest(
          ".info-passengers__bottom"
        ).previousElementSibling.classList.toggle("active");
      }
    });
  });
});

// Open Close info pass/cabin
document.addEventListener("DOMContentLoaded", function () {
  const infoPassPlus = document.querySelectorAll(
    ".info-passengers__top button"
  );

  infoPassPlus.forEach(function (button) {
    button.addEventListener("click", function () {
      const infoCabin = this.closest(".info-passengers").nextElementSibling;
      if (infoCabin) {
        infoCabin.classList.toggle("open");
        this.closest(".info-passengers__top").classList.toggle("active");
        this.closest(
          ".info-passengers__top"
        ).nextElementSibling.classList.toggle("active");
      }
    });
  });
});

// Open categorie-camarote/guaranteed
document.addEventListener("DOMContentLoaded", function () {
  const itemOpenGuar = document.querySelectorAll(
    ".checkout__select-bottom-item.guaranteed"
  );
  const itemOpenCamarote = document.querySelectorAll(
    ".checkout__select-bottom-item.camarote"
  );

  // Общая функция для переключения видимости табов
  function toggleTab(button, targetIndex) {
    const parent = button.closest(".checkout__select-bottom");
    const targets = [
      parent.nextElementSibling, // guaranteed block
      parent.nextElementSibling.nextElementSibling, // camarote block
    ];

    const guarTab = parent.querySelector(
      ".checkout__select-bottom-item.guaranteed"
    );
    const camaroteTab = parent.querySelector(
      ".checkout__select-bottom-item.camarote"
    );

    const thirdBlock =
      parent.nextElementSibling.nextElementSibling.nextElementSibling;

    // Переключаем класс 'open' для текущей кнопки и связанного блока
    targets[targetIndex].classList.toggle("open");
    parent.classList.toggle("open");
    button.classList.toggle("open");

    // Удаляем класс 'open' у другого блока и кнопки
    const otherIndex = targetIndex === 0 ? 1 : 0;
    targets[otherIndex].classList.remove("open");
    parent
      .querySelectorAll(`.checkout__select-bottom-item`)
      [otherIndex].classList.remove("open");

    // Проверяем, есть ли хотя бы один открытый таб
    const anyTabOpen =
      guarTab.classList.contains("open") ||
      camaroteTab.classList.contains("open");

    // Переключаем класс 'hide' для третьего блока в зависимости от состояния табов
    if (anyTabOpen) {
      thirdBlock.classList.add("hide");
    } else {
      thirdBlock.classList.remove("hide");
    }
  }

  // Обработчики для кнопок "guaranteed"
  itemOpenGuar.forEach(function (button) {
    button.addEventListener("click", function () {
      toggleTab(button, 0);
    });
  });

  // Обработчики для кнопок "camarote"
  itemOpenCamarote.forEach(function (button) {
    button.addEventListener("click", function () {
      toggleTab(button, 1);
    });
  });
});

// Open categorie-camarote bottom/sub
document.addEventListener("DOMContentLoaded", function () {
  const topButtons = document.querySelectorAll(
    ".categorie-camarote__top-ship-item-price button"
  );
  const bottomButtons = document.querySelectorAll(
    ".categorie-camarote__bottom-item-price button"
  );

  // Функция для управления кнопками верхнего уровня
  topButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetElement = document.querySelector(targetId);

      if (this.classList.contains("open")) {
        // Если кнопка уже открыта, то закрываем её
        this.classList.remove("open");
        if (targetElement) {
          targetElement.classList.remove("open");
        }
      } else {
        // Закрываем все остальные кнопки и блоки
        topButtons.forEach(function (btn) {
          btn.classList.remove("open");
          const target = btn.getAttribute("data-target");
          const element = document.querySelector(target);
          if (element) {
            element.classList.remove("open");
          }
        });

        // Открываем текущую кнопку и соответствующий блок
        this.classList.add("open");
        if (targetElement) {
          targetElement.classList.add("open");
        }
      }
    });
  });

  // Функция для управления кнопками нижнего уровня
  bottomButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const parent = this.closest(
        ".categorie-camarote__bottom-item-price"
      ).parentElement;
      const subElement = parent.nextElementSibling;

      if (
        subElement &&
        subElement.classList.contains("categorie-camarote__sub")
      ) {
        if (subElement.classList.contains("open")) {
          // Если блок уже открыт, закрываем его
          subElement.classList.remove("open");
          this.classList.remove("open");
        } else {
          // Закрываем все остальные открытые блоки и кнопки
          bottomButtons.forEach(function (btn) {
            const btnParent = btn.closest(
              ".categorie-camarote__bottom-item-price"
            );
            const btnSubElement = btnParent.nextElementSibling;
            if (
              btnSubElement &&
              btnSubElement.classList.contains("categorie-camarote__sub")
            ) {
              btnSubElement.classList.remove("open");
              btn.classList.remove("open");
            }
          });

          // Открываем текущий блок и добавляем класс open к кнопке
          subElement.classList.add("open");
          this.classList.add("open");
        }
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const bottomButtons = document.querySelectorAll(
    ".categorie-camarote__bottom-item-price div"
  );

  // Функция для управления кнопками нижнего уровня
  bottomButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const parent = this.closest(
        ".categorie-camarote__bottom-item-price"
      ).parentElement;
      const subElement = parent.nextElementSibling;

      if (
        subElement &&
        subElement.classList.contains("categorie-camarote__sub")
      ) {
        if (subElement.classList.contains("open")) {
          // Если блок уже открыт, закрываем его
          subElement.classList.remove("open");
          this.classList.remove("open");
        } else {
          // Закрываем все остальные открытые блоки и кнопки
          bottomButtons.forEach(function (btn) {
            const btnParent = btn.closest(
              ".categorie-camarote__bottom-item-price"
            );
            const btnSubElement = btnParent.nextElementSibling;
            if (
              btnSubElement &&
              btnSubElement.classList.contains("categorie-camarote__sub")
            ) {
              btnSubElement.classList.remove("open");
              btn.classList.remove("open");
            }
          });

          // Открываем текущий блок и добавляем класс open к кнопке
          subElement.classList.add("open");
          this.classList.add("open");
        }
      }
    });
  });
});

// Edit passengers

document.addEventListener("DOMContentLoaded", function () {
  const editBtnPass = document.querySelector(
    ".checkout__result-edit-item.passengers button"
  );
  const checkoutParent = document.querySelector(".checkout");

  editBtnPass.addEventListener("click", function () {
    const infoPassengersElement = checkoutParent.querySelector(
      ".info-passengers.checkout-page"
    );
    if (infoPassengersElement) {
      infoPassengersElement.classList.add("open");

      // Удаление класса 'open' у других элементов
      const siblings = document.querySelectorAll(
        ".checkout > :not(.info-passengers.checkout-page)"
      );
      siblings.forEach(function (sibling) {
        sibling.classList.remove("open");
      });

      // Удаление класса 'open' у элемента passengers
      const passengersElement = document.querySelector(
        ".checkout__result-edit-item.passengers.open"
      );
      if (passengersElement) {
        passengersElement.classList.remove("open");
        passengersElement.nextElementSibling.classList.remove("open");
        passengersElement
          .closest(".checkout__result-edit")
          .nextElementSibling.classList.remove("open");
        passengersElement
          .closest(".checkout__result-edit")
          .nextElementSibling.nextElementSibling.classList.remove("open");
        passengersElement
          .closest(".checkout__result-edit")
          .nextElementSibling.nextElementSibling.querySelector(
            ".checkout__result-insurance"
          )
          .classList.remove("open");
        passengersElement
          .closest(".checkout__result-edit")
          .nextElementSibling.nextElementSibling.querySelector(
            ".checkout__result-experience"
          )
          .classList.remove("open");
        passengersElement
          .closest(".checkout__result-edit")
          .nextElementSibling.nextElementSibling.querySelector(
            ".checkout__result-flight"
          )
          .classList.remove("open");
        passengersElement
          .closest(".checkout__result-edit")
          .nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
            "open"
          );
        passengersElement
          .closest(".checkout__result")
          .nextElementSibling.classList.remove("open");
      }
    }
  });
});

// Edit cabin
document.addEventListener("DOMContentLoaded", function () {
  const editBtnCabin = document.querySelector(
    ".checkout__result-edit-item.cabin button"
  );
  const checkoutParent = document.querySelector(".checkout");

  editBtnCabin.addEventListener("click", function () {
    const infoCabinElement = checkoutParent.querySelector(
      ".info-cabin.checkout-page"
    );
    if (infoCabinElement) {
      infoCabinElement.classList.add("open");

      // Удаление класса 'open' у других элементов
      const siblings = document.querySelectorAll(
        ".checkout > :not(.info-cabin.checkout-page)"
      );
      siblings.forEach(function (sibling) {
        sibling.classList.remove("open");
      });

      // Удаление класса 'open' у элемента passengers
      const passengersElement = document.querySelector(
        ".checkout__result-edit-item.cabin.open"
      );
      if (passengersElement) {
        passengersElement.classList.remove("open");
        passengersElement
          .closest(".checkout__result-edit")
          .nextElementSibling.classList.remove("open");
        passengersElement
          .closest(".checkout__result-edit")
          .nextElementSibling.nextElementSibling.classList.remove("open");
        passengersElement
          .closest(".checkout__result-edit")
          .nextElementSibling.nextElementSibling.querySelector(
            ".checkout__result-insurance"
          )
          .classList.remove("open");
        passengersElement
          .closest(".checkout__result-edit")
          .nextElementSibling.nextElementSibling.querySelector(
            ".checkout__result-experience"
          )
          .classList.remove("open");
        passengersElement
          .closest(".checkout__result-edit")
          .nextElementSibling.nextElementSibling.querySelector(
            ".checkout__result-flight"
          )
          .classList.remove("open");
        passengersElement
          .closest(".checkout__result-edit")
          .nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
            "open"
          );
        passengersElement
          .closest(".checkout__result")
          .nextElementSibling.classList.remove("open");
      }
    }
  });
});

// Checkout Pass continue
document.addEventListener("DOMContentLoaded", function () {
  const infoCabinOpen = document.querySelectorAll(
    ".info-passengers__bottom-buttons-continue"
  );

  infoCabinOpen.forEach(function (button) {
    button.addEventListener("click", function () {
      const infoPass = this.closest(".info-passengers.checkout-page");
      if (infoPass) {
        infoPass.classList.remove("open");
        const nextSibling = this.nextElementSibling;
        if (nextSibling) {
          nextSibling.classList.add("open");
        }
        const passengersElement = this.closest(".checkout").querySelector(
          ".checkout__result-edit-item.passengers"
        );
        if (passengersElement) {
          passengersElement.classList.add("open");
        }
      }
    });
  });
});

// Checkout Cabin continue
document.addEventListener("DOMContentLoaded", function () {
  const infoSelectOpen = document.querySelectorAll(
    ".info-cabin__bottom-item-right a"
  );

  infoSelectOpen.forEach(function (button) {
    button.addEventListener("click", function () {
      const infoCabin = this.closest(".info-cabin.checkout-page");
      if (infoCabin) {
        infoCabin.classList.remove("open");
        const nextSibling = infoCabin.nextElementSibling;
        if (nextSibling) {
          nextSibling.classList.add("open");
        }
        const cabinElement = this.closest(".checkout").querySelector(
          ".checkout__result-edit-item.cabin"
        );
        if (cabinElement) {
          cabinElement.classList.add("open");
        }
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Modal plan guaranteed
  const modalPlanGuaranteed = document.querySelector(
    ".modal-plan-backdrop.guaranteed"
  );
  const planBtnOpenGuaranteed = document.querySelectorAll(
    ".categorie-guaranteed-top-plan"
  );
  const planBtnCloseGuaranteed = document.querySelector(
    ".modal-plan__close.guaranteed"
  );

  const toggleModalPlanGuaranteed = () =>
    modalPlanGuaranteed.classList.toggle("open");

  planBtnOpenGuaranteed.forEach(btn => {
    btn.addEventListener("click", toggleModalPlanGuaranteed);
  });

  if (planBtnCloseGuaranteed) {
    planBtnCloseGuaranteed.addEventListener("click", toggleModalPlanGuaranteed);
  }

  // Modal plan camarote
  const modalPlanCamaroteBackdrops = document.querySelectorAll(
    ".modal-plan-backdrop.camarote"
  );
  const planBtnOpenCamarote = document.querySelectorAll(
    ".categorie-camarote__sub-top-plan"
  );
  const planBtnCloseCamarote = document.querySelectorAll(
    ".modal-plan__close.camarote"
  );

  const toggleModalPlanCamarote = modal => {
    modal.classList.toggle("open");
  };

  planBtnOpenCamarote.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      toggleModalPlanCamarote(modalPlanCamaroteBackdrops[index]);
    });
  });

  planBtnCloseCamarote.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      toggleModalPlanCamarote(modalPlanCamaroteBackdrops[index]);
    });
  });
});

// Checkout select continue
document.addEventListener("DOMContentLoaded", function () {
  const infoSelectNextGuaranteed = document.querySelectorAll(
    ".categorie-guaranteed-bottom-item-button"
  );
  const infoSelectNextGuaranteedMobile = document.querySelectorAll(
    ".categorie-guaranteed-bottom-item-img-price"
  );

  infoSelectNextGuaranteed.forEach(function (button) {
    button.addEventListener("click", function () {
      const checkoutSelect = this.closest(".checkout__select");
      if (checkoutSelect) {
        checkoutSelect.classList.remove("open");
        checkoutSelect.nextElementSibling.classList.add("open");
        const mainElement = this.closest(".checkout").querySelector(
          ".checkout__result-main"
        );
        if (mainElement) {
          mainElement.classList.add("open");
          mainElement.nextElementSibling.nextElementSibling.classList.add(
            "open"
          );
          mainElement
            .closest(".checkout__result")
            .nextElementSibling.classList.add("open");
        }
      }
    });
  });

  infoSelectNextGuaranteedMobile.forEach(function (button) {
    button.addEventListener("click", function () {
      const checkoutSelect = this.closest(".checkout__select");
      if (checkoutSelect) {
        checkoutSelect.classList.remove("open");
        checkoutSelect.nextElementSibling.classList.add("open");
        const mainElement = this.closest(".checkout").querySelector(
          ".checkout__result-main"
        );
        if (mainElement) {
          mainElement.classList.add("open");
          mainElement.nextElementSibling.nextElementSibling.classList.add(
            "open"
          );
          mainElement
            .closest(".checkout__result")
            .nextElementSibling.classList.add("open");
        }
      }
    });
  });

  const infoSelectNextCamarote = document.querySelectorAll(
    ".categorie-camarote__sub-bottom-item-button"
  );
  const infoSelectNextCamaroteMobile = document.querySelectorAll(
    ".categorie-camarote__sub-bottom-item-img-price"
  );

  infoSelectNextCamarote.forEach(function (button) {
    button.addEventListener("click", function () {
      const checkoutSelect = this.closest(".checkout__select");
      if (checkoutSelect) {
        checkoutSelect.classList.remove("open");
        checkoutSelect.nextElementSibling.classList.add("open");
      }
    });
  });

  infoSelectNextCamaroteMobile.forEach(function (button) {
    button.addEventListener("click", function () {
      const checkoutSelect = this.closest(".checkout__select");
      if (checkoutSelect) {
        checkoutSelect.classList.remove("open");
        checkoutSelect.nextElementSibling.classList.add("open");
      }
    });
  });
});

// Checkout info camarote
document.addEventListener("DOMContentLoaded", function () {
  const infoCamaroteBack = document.querySelectorAll(
    ".info-camarote-buttons .prev"
  );

  infoCamaroteBack.forEach(function (button) {
    button.addEventListener("click", function () {
      const checkoutCamarote = this.closest(".info-camarote");
      if (checkoutCamarote) {
        checkoutCamarote.classList.remove("open");
        checkoutCamarote.previousElementSibling.classList.add("open");
      }
    });
  });

  const infoCamaroteContinue = document.querySelectorAll(
    ".info-camarote-buttons .next"
  );

  infoCamaroteContinue.forEach(function (button) {
    button.addEventListener("click", function () {
      const checkoutCamarote = this.closest(".info-camarote");
      if (checkoutCamarote) {
        checkoutCamarote.classList.remove("open");
        checkoutCamarote.nextElementSibling.classList.add("open");
      }
    });
  });
});

// Checkout travel insurance
document.addEventListener("DOMContentLoaded", function () {
  const infoInsuranceContinue = document.querySelectorAll(
    ".travel-insurance__next"
  );

  infoInsuranceContinue.forEach(function (button) {
    button.addEventListener("click", function () {
      const checkoutInsurance = this.closest(".travel-insurance");
      if (checkoutInsurance) {
        checkoutInsurance.classList.remove("open");
        checkoutInsurance.nextElementSibling.classList.add("open");
      }
    });
  });
});

// Checkout travel experience tab

document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll("[data-experience]");
  const tabContents = document.querySelectorAll(".travel-experience__check");
  const bottomMain = document.querySelector(".travel-experience__bottom-main");
  const nextButton = document.querySelector(".travel-experience__next");

  function updateNextButton() {
    const anyTabOpen = Array.from(tabButtons).some(button =>
      button.classList.contains("open")
    );

    const rightBlocks = document.querySelectorAll(
      ".travel-experience__bottom-main-mobile-item-right div"
    );
    rightBlocks.forEach(function (rightBlock) {
      const children = rightBlock.children;
      for (let i = 1; i < children.length; i++) {
        children[i].classList.toggle("hide", anyTabOpen);
      }
    });

    const leftBlocks = document.querySelectorAll(
      ".travel-experience__bottom-main-mobile-item-left"
    );
    leftBlocks.forEach(function (leftBlocks) {
      const children = leftBlocks.children;
      for (let i = 1; i < children.length; i++) {
        children[i].classList.toggle("hide", anyTabOpen);
      }
    });

    nextButton.classList.toggle("open", anyTabOpen);
  }

  tabButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const tabId = button.dataset.experience;
      const isActive = button.classList.contains("open");

      if (isActive) {
        button.classList.remove("open");
        tabContents.forEach(function (content) {
          if (content.dataset.tabContent === tabId) {
            content.classList.add("hide");
            content.classList.remove("open");
          }
        });
        bottomMain.classList.remove("hide");
      } else {
        tabButtons.forEach(function (btn) {
          btn.classList.remove("open");
        });
        button.classList.add("open");
        tabContents.forEach(function (content) {
          if (content.dataset.tabContent === tabId) {
            content.classList.remove("hide");
            content.classList.add("open");
          } else {
            content.classList.add("hide");
            content.classList.remove("open");
          }
        });
        bottomMain.classList.add("hide");
      }
      updateNextButton();
    });
  });

  nextButton.addEventListener("click", function () {
    const anyTabOpen = Array.from(tabButtons).some(button =>
      button.classList.contains("open")
    );
    if (!anyTabOpen) {
      tabButtons[0].click();
    }
  });
});

// Checkout travel experience next
document.addEventListener("DOMContentLoaded", function () {
  const infoExperienceContinue = document.querySelectorAll(
    ".travel-experience__next"
  );

  infoExperienceContinue.forEach(function (button) {
    button.addEventListener("click", function () {
      const checkoutExperience = this.closest(".travel-experience");
      if (checkoutExperience) {
        checkoutExperience.classList.remove("open");
        checkoutExperience.nextElementSibling.classList.add("open");
      }
    });
  });
});

// Checkout checkout flight
document.addEventListener("DOMContentLoaded", function () {
  const checkoutFlights = document.querySelectorAll(".checkout__flight");

  checkoutFlights.forEach(function (flight) {
    const infoFlightOpen = flight.querySelectorAll(
      ".checkout__flight-bottom-item-content button"
    );
    const nextButton = flight.querySelector(".checkout__flight-next");

    infoFlightOpen.forEach(function (button) {
      button.addEventListener("click", function () {
        const flightSub = this.closest(
          ".checkout__flight-bottom-item"
        ).nextElementSibling;
        if (flightSub) {
          flightSub.classList.toggle("open");
          this.classList.toggle("open");

          const anySubOpen = flight.querySelector(
            ".checkout__flight-bottom-sub.open"
          );

          if (anySubOpen) {
            nextButton.classList.add("open");
          } else {
            nextButton.classList.remove("open");
          }
        }
      });
    });
  });
});

// Checkout checkout flight next
document.addEventListener("DOMContentLoaded", function () {
  const infoFlightContinue = document.querySelectorAll(
    ".checkout__flight-next"
  );

  infoFlightContinue.forEach(function (button) {
    button.addEventListener("click", function () {
      const checkoutFlight = this.closest(".checkout__flight");
      if (checkoutFlight) {
        checkoutFlight.classList.remove("open");
        checkoutFlight.nextElementSibling.classList.add("open");
      }
    });
  });
});

// Checkout checkout reservar next
document.addEventListener("DOMContentLoaded", function () {
  const infoReservarContinue = document.querySelectorAll(
    ".checkout__reservar-next"
  );

  infoReservarContinue.forEach(function (button) {
    button.addEventListener("click", function () {
      const checkoutReservar = this.closest(".checkout__reservar");
      if (checkoutReservar) {
        checkoutReservar.classList.remove("open");
        checkoutReservar.nextElementSibling.classList.add("open");
      }
    });
  });
});

// Checkout checkout data next
document.addEventListener("DOMContentLoaded", function () {
  const infoDataContinue = document.querySelectorAll(".checkout__data-next");

  infoDataContinue.forEach(function (button) {
    button.addEventListener("click", function () {
      const infoDataContinue = this.closest(".checkout__data");
      if (infoDataContinue) {
        infoDataContinue.classList.remove("open");
        infoDataContinue.nextElementSibling.classList.add("open");
      }
    });
  });
});

// Open payment pay/reserv
document.addEventListener("DOMContentLoaded", function () {
  const itemOpenPay = document.querySelectorAll(
    ".checkout__payment-bottom-item.pay"
  );
  const itemOpenReserv = document.querySelectorAll(
    ".checkout__payment-bottom-item.reserv"
  );

  // Функция для переключения видимости блоков
  function toggleVisibility(button, targetIndex) {
    const parent = button.closest(".checkout__payment-bottom");
    const targets = [
      parent.nextElementSibling, // pay block
      parent.nextElementSibling.nextElementSibling, // reserv block
    ];

    const payTab = parent.querySelector(".checkout__payment-bottom-item.pay");
    const reservTab = parent.querySelector(
      ".checkout__payment-bottom-item.reserv"
    );

    const thirdBlock =
      parent.nextElementSibling.nextElementSibling.nextElementSibling;

    // Переключаем класс 'open' для текущей кнопки и связанного блока
    targets[targetIndex].classList.toggle("open");
    parent.classList.toggle("open");
    button.classList.toggle("open");

    // Удаляем класс 'open' у другого блока и кнопки
    const otherIndex = targetIndex === 0 ? 1 : 0;
    targets[otherIndex].classList.remove("open");
    parent
      .querySelectorAll(`.checkout__payment-bottom-item`)
      [otherIndex].classList.remove("open");

    // Проверяем, есть ли хотя бы один открытый таб
    const anyTabOpen =
      payTab.classList.contains("open") || reservTab.classList.contains("open");

    // Переключаем класс 'open' для третьего блока в зависимости от состояния табов
    if (anyTabOpen) {
      thirdBlock.classList.add("open");
    } else {
      thirdBlock.classList.remove("open");
    }
  }

  // Обработчики для кнопок "pay"
  itemOpenPay.forEach(function (button) {
    button.addEventListener("click", function () {
      toggleVisibility(button, 0);
    });
  });

  // Обработчики для кнопок "reserv"
  itemOpenReserv.forEach(function (button) {
    button.addEventListener("click", function () {
      toggleVisibility(button, 1);
    });
  });
});

//checkout result insurance
document.addEventListener("DOMContentLoaded", function () {
  const insuranceRadios = document.querySelectorAll(
    "input[type='radio'][name^='insurance-radio']"
  );

  insuranceRadios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      const insuranceGroup = this.getAttribute("name");
      const isChecked = document.querySelectorAll(
        "input[type='radio'][name='" + insuranceGroup + "']:checked"
      );
      const resultInsurance = document.querySelector(
        ".checkout__result-insurance"
      );

      if (isChecked.length > 0) {
        resultInsurance.classList.add("open");
        resultInsurance.parentElement.classList.add("open");
        resultQuantity.textContent = "x" + isChecked.length;
      }
    });
  });
});

//checkout result experience
document.addEventListener("DOMContentLoaded", function () {
  const experienceCheckbox = document.querySelectorAll(
    "input[type='radio'][name^='experience-checkbox']"
  );

  experienceCheckbox.forEach(function (radio) {
    radio.addEventListener("change", function () {
      const experienceGroup = this.getAttribute("name");
      const isChecked = document.querySelectorAll(
        "input[type='radio'][name='" + experienceGroup + "']:checked"
      );
      const resultExperience = document.querySelector(
        ".checkout__result-experience"
      );

      if (isChecked.length > 0) {
        resultExperience.classList.add("open");
      }
    });
  });
});

//checkout result flight
document.addEventListener("DOMContentLoaded", function () {
  const flightCheckbox = document.querySelectorAll(
    "input[type='radio'][name^='flight-radio']"
  );

  flightCheckbox.forEach(function (radio) {
    radio.addEventListener("change", function () {
      const flightGroup = this.getAttribute("name");
      const isChecked = document.querySelectorAll(
        "input[type='radio'][name='" + flightGroup + "']:checked"
      );
      const resultFlight = document.querySelector(".checkout__result-flight");

      if (isChecked.length > 0) {
        resultFlight.classList.add("open");
      }
    });
  });
});

// data form tab mobile
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(
    ".checkout__data-passengers-control-button"
  );
  const forms = document.querySelectorAll(
    ".checkout__data-passengers-bottom-form"
  );

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      buttons.forEach(function (btn) {
        btn.classList.remove("open");
      });
      forms.forEach(function (form) {
        form.classList.remove("open");
      });

      button.classList.add("open");
      const target = button.getAttribute("data-passangers-target");
      const targetForm = document.querySelector(
        `.checkout__data-passengers-bottom-form[data-passangers="${target}"]`
      );
      if (targetForm) {
        targetForm.classList.add("open");
      }
    });
  });
});

// mobile open result
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".checkout-mobile-open-result");
  const resultWrapper = document.querySelector(".checkout__result-wrapper");
  const svgIcon = toggleButton.querySelector(
    ".checkout-mobile-open-result svg"
  );

  toggleButton.addEventListener("click", function () {
    svgIcon.classList.toggle("open");
    resultWrapper.classList.toggle("open");
  });
});

// shipping-line slider
const shippingLineSlider = new Swiper(".shipping-line-slider", {
  slidesPerView: "auto",
  spaceBetween: 24,
  freeMode: true,
  breakpoints: {
    0: {
      slidesPerView: "auto",
      spaceBetween: 16,
    },
    1150: {
      slidesPerView: 2,
    },
  },

  pagination: {
    el: ".shipping-line__pagination",
    bulletClass: "shipping-line__pagination-item",
    bulletActiveClass: "shipping-line__pagination-item--active",
  },

  navigation: {
    nextEl: ".shipping-line-controls-button.next",
    prevEl: ".shipping-line-controls-button.prev",
  },
});

// footer scroll
document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopButton = document.querySelector(".footer__bottom-left-back");

  scrollToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// Product page heart
document.addEventListener("DOMContentLoaded", function () {
  const heart = document.querySelector(".product-price__top-buttons-heart");

  heart.addEventListener("click", function () {
    this.classList.toggle("open");
  });
});

// footer menu
document.addEventListener("DOMContentLoaded", function () {
  const menuHeaders = document.querySelectorAll(
    ".footer__bottom-mobile-menu-item-header"
  );

  menuHeaders.forEach(header => {
    header.addEventListener("click", function () {
      const subMenu = header.nextElementSibling;

      if (subMenu.classList.contains("open")) {
        subMenu.classList.remove("open");
        this.querySelector("svg").classList.remove("open");
        this.querySelector(
          ".footer__bottom-mobile-menu-item-header-title"
        ).classList.remove("open");
      } else {
        document
          .querySelectorAll(".footer__bottom-mobile-menu-item-sub.open")
          .forEach(openSubMenu => {
            openSubMenu.classList.remove("open");
            openSubMenu.previousElementSibling
              .querySelector("svg")
              .classList.remove("open");
            openSubMenu.previousElementSibling
              .querySelector(".footer__bottom-mobile-menu-item-header-title")
              .classList.remove("open");
          });
        subMenu.classList.add("open");
        this.querySelector("svg").classList.add("open");
        this.querySelector(
          ".footer__bottom-mobile-menu-item-header-title"
        ).classList.add("open");
      }
    });
  });
});

// reserv datos cruise
const reservDatosCruiseSwiper = new Swiper(".reserv-datos-cruise__slider", {
  slidesPerView: 1,
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },
});

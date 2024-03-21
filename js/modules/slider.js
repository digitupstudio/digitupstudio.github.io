// import $ from 'jquery';
// const $ = window.$;

const swiper = new Swiper('.swiper', {
    slidesPerView: 1.3,
    spaceBetween: 16,
    breakpoints: {
        280: {
            slidesPerView: 1.3,
        },
        568: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 4,
        }
    },
    navigation: {
        nextEl: '.next-slide',
        prevEl: '.prev-slide',
      },    
  });

$('.tabs .tab').click(function() {
    var tabId = $(this).data('tab');
    
    $('.tabs .tab').removeClass('active');
    $(this).addClass('active');
    
    $('.tab-pane').removeClass('active');
    $('#' + tabId).addClass('active');
    
    
});

$(document).ready(function() {
    $('.tabs .tab:first').addClass('active');
    
});

var itemTextBlocks = document.querySelectorAll('.offers__item-text');

itemTextBlocks.forEach(function(itemTextBlock) {
    var link = itemTextBlock.querySelector('a');

    link.addEventListener('mouseover', function() {
        itemTextBlock.classList.add('hovered');
    });

    link.addEventListener('mouseout', function() {
        itemTextBlock.classList.remove('hovered');
    });
});

$(document).ready(function() {
    $('.more_info_recommendation_mobile').click(function() {
        $(this).closest('.recommendations__item').toggleClass('hovered');
    });
});
document.addEventListener('DOMContentLoaded', function () {
    var offersItems = document.querySelectorAll('.offers__item');

    offersItems.forEach(function (offer) {
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

        // calendarBlock.addEventListener('mouseleave', function (event) {
        //     if (!event.relatedTarget || !calendarBlock.contains(event.relatedTarget)) {
        //         hideCalendar();
        //     }
        // });

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
});
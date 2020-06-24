$(document).ready(function () {

    function display(hours, minutes, seconds) {
        $('#hours').html(('0' + hours).slice(-2));
        $('#minutes').html(('0' + minutes).slice(-2));
        $('#seconds').html(('0' + seconds).slice(-2));
    }
    // timer
    function countdown(dateEnd) {
        let days,
            timer,
            hours,
            minutes,
            seconds;

        dateEnd = new Date(dateEnd);
        dateEnd = dateEnd.getTime();

        if (isNaN(dateEnd)) {
            return;
        }

        timer = setInterval(calculate, 1000);


        function calculate() {

            let dateStart = new Date();

            dateStart = new Date(dateStart.getUTCFullYear(),
                dateStart.getUTCMonth(),
                dateStart.getUTCDate(),
                dateStart.getUTCHours(),
                dateStart.getUTCMinutes(),
                dateStart.getUTCSeconds());

            let timeRemaining = parseInt((dateEnd - dateStart.getTime()) / 1000);

            if (timeRemaining >= 0) {
                days = parseInt(timeRemaining / 86400);
                timeRemaining = parseInt(timeRemaining % 86400);
                hours = parseInt(timeRemaining / 3600);
                timeRemaining = parseInt(timeRemaining % 3600);
                minutes = parseInt(timeRemaining / 60);
                timeRemaining = parseInt(timeRemaining % 60);
                seconds = parseInt(timeRemaining);

                display(hours, minutes, seconds);
            }
        }
    }

    countdown('09/22/4020 09:00:00 PM');

});
function APIUrl() {
    if (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') {
        return config.LocalhostURL;
    }
    else {
        return config.ProductionURL;
    }
}

function animInput() {
    $('.input-file').each(function () {
        var $input = $(this),
            $label = $input.next('.js-labelFile'),
            labelVal = $label.html();

        $input.on('change', function (element) {
            var fileName = '';
            if (element.target.value) fileName = element.target.value.split('\\').pop();
            fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass('has-file').html(labelVal);
        });
    });
}

function formatDate(date) {
    var monthNames = [
        "ENE", "FEB", "MAR",
        "ABR", "MAY", "JUN", "JUL",
        "AGO", "SEP", "OCT",
        "NOV", "DIC"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + '-' + monthNames[monthIndex] + '-' + year;
}

function showLoader() {
    var loader = document.getElementById('loader');
    loader.className += ' displayed';
}

function hideLoader() {
    var loader = document.getElementById('loader');
    loader.className = loader.className.replace(/\bdisplayed\b/g, '');
}

function error_swal(title, message) {
    swal({
        icon: "error",
        title: title,
        text: message
    });
}

function warning_swal(title, message) {
    swal({
        icon: "info",
        title: title,
        text: message
    });
}

function succes_swal(title, message) {
    swal({
        icon: "success",
        title: title,
        text: message
    });
}
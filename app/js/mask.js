$(document).ready(function () {
    var element = document.getElementById('phone');
    var maskOptions = {
        mask: '{+38} ( 000 ) 00-000-00',
        lazy: false,
        min: 5,
        max: 100
    };
    var mask = IMask(element, maskOptions);



    // get the form elements defined in your form HTML above

    const form = document.getElementById("sendToEmail");
       
    // Success and Error functions for after the form is submitted

    function success() {
        $('#form-status').text('Сообщение было отправлено, мы вам перезвоним');
    }

    function error() {
        $('#form-status').text("Упс! Чтото пошло не так!");
    }


    // helper function for sending an AJAX request

    function ajax(method, url, data, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                success(xhr.response, xhr.responseType);
            } else {
                error(xhr.status, xhr.response, xhr.responseType);
            }
        };
        xhr.send(data);
    }

    // handle the form submission event

    form.addEventListener("submit", function (ev) {
        ev.preventDefault();

        const phoneNumber = mask.unmaskedValue;
        const userName = $('#user-name').val();
        const data = new FormData(form);

        console.log(userName.trim(), phoneNumber.length);
        
        if (userName.trim() && phoneNumber.length === 13) {

            // reset values
            $('#user-name').val('');
            mask.unmaskedValue = '';

            $('#form-status').text('Сообщение было отправлено, мы вам перезвоним');

            $('#form-status').removeClass('text-danger');
            $('#form-status').addClass('text-success');

            ajax(form.method, form.action, data, success, error);
        } else {

            if (!userName.trim()) {
                $('#form-status').text('Укажите имя')
            } else if (phoneNumber.length !== 12) {
                $('#form-status').text('Укажите верный номер телефона')
            }
            $('#form-status').addClass('text-danger')

        }

    });




    // ############################################
    // email

    // const emailForm = document.getElementById('sendToEmail')
    // emailForm.addEventListener('submit', function (e) {
    //     e.preventDefault();

    //     const phoneNumber = mask.unmaskedValue;
    //     const userName = $('#user-name').val();
    //     console.log(phoneNumber.length);

    //     if (userName.trim() && phoneNumber.length === 13) {
    //         // console.log(phoneNumber);
    //         // const message = {
    //         //     phoneNumber,
    //         //     userName
    //         // }

    //         // reset values
    //         $('#user-name').val('')
    //         mask.unmaskedValue = '';

    //         $('#form-status').text('Сообщение было отправлено, мы вам перезвоним');

    //         $('#form-status').removeClass('text-danger')
    //         $('#form-status').addClass('text-success')

    //     } else {
    //         // console.log('user-name: ', userName.trim(), 'number: ', phoneNumber.length);
    //         if (!userName.trim()) {
    //             $('#form-status').text('Укажите имя')
    //         } else if (phoneNumber.length !== 12) {
    //             $('#form-status').text('Укажите верный номер телефона')
    //         }
    //         $('#form-status').addClass('text-danger')

    //         // console.log(!userName.trim());

    //     }
    // }, {
    //     passive: false
    // })





});
// public/scripts.js
$(document).ready(function () {
    // Sliding effect
    let currentIndex = 0;
    const slides = $('.slide');
    setInterval(() => {
        slides.eq(currentIndex).fadeOut(500, function () {
            currentIndex = (currentIndex + 1) % slides.length;
            slides.eq(currentIndex).fadeIn(500);
        });
    }, 3000);

    // Handle navigation clicks
    $('.nav-links a').on('click', function (event) {
        event.preventDefault();
        const targetId = $(this).attr('href');
        
        // Hide all sections
        $('section').addClass('hidden');
        
        // Show the targeted section
        $(targetId).removeClass('hidden');
    });

    // Handle contact form submission
    $('#contactForm').on('submit', function (event) {
        event.preventDefault();
        const formData = {
            email: $('#contactEmail').val(),
            message: $('#contactMessage').val(),
        };

        $.ajax({
            url: '/contact',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                $('#responseMessage').text(response.message);
                $('#contactForm')[0].reset();
            },
            error: function () {
                $('#responseMessage').text('Error sending the message.');
            },
        });
    });

    // Handle sign-up form submission
    $('#signupForm').on('submit', function (event) {
        event.preventDefault();
        const formData = {
            name: $('#signupName').val(),
            email: $('#signupEmail').val(),
            password: $('#signupPassword').val(),
        };

        $.ajax({
            url: '/signup',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                $('#signupResponseMessage').text(response.message);
                $('#signupForm')[0].reset();
            },
            error: function () {
                $('#signupResponseMessage').text('Error signing up.');
            },
        });
    });

    // Handle sign-in form submission
    $('#signinForm').on('submit', function (event) {
        event.preventDefault();
        const formData = {
            email: $('#signinEmail').val(),
            password: $('#signinPassword').val(),
        };

        $.ajax({
            url: '/signin',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                $('#signinResponseMessage').text(response.message);
                $('#signinForm')[0].reset();
            },
            error: function () {
                $('#signinResponseMessage').text('Error signing in.');
            },
        });
    });

    // Show photos after 2 seconds
    setTimeout(function() {
        $('.photo').each(function(index) {
            $(this).delay(index * 2000).fadeIn(1000);
        });
    }, 2000);
});

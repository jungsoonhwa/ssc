var jbOffset = $('#hd').offset();
$('.gnb').hover(function() {
        $('#hd').addClass('on');
        //$('#hd .logo').addClass('on');
    },
    function() {
        $('#hd').removeClass('on');

        if ($('#hd').hasClass('jb_f') == true) {} else {
            //$('#hd .logo').removeClass('on');
        }
    }
);

$('.dep1_menu').on('click', function() {
    $(this).toggleClass('btn_on');

    $('.dep2').slideUp();

    if ($(this).next('.dep2').css('display') == 'block') {
        $(this).next('.dep2').slideUp();
    } else {
        $(this).next('.dep2').slideDown();
    }

});

$('.ham_btn').on('click', function() {
    $('.mb_gnb').toggleClass('mb_gnb_on');
    $('#hd').toggleClass('mb_hd_on');
});

$('.close_btn').on('click', function() {
    $('.mb_gnb').toggleClass('mb_gnb_on');
    $('#hd').toggleClass('mb_hd_on');
});

$('.top_btn').on('click', function() {
    var ht = $('body').offset().top - 0;
    $('html,body').animate({
        scrollTop: ht
    }, 800);
});
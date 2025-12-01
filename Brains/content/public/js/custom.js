$(function(){
  $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass('show');       
    $(this).parent().toggleClass('show');   

    $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
      $('.dropdown-submenu .show').removeClass('show');  
      $('.dropdown-submenu.show').removeClass('show');
    });
    return false;
  });
});


$(function() {
  $('#main-menu').smartmenus({
    subMenusSubOffsetX: 1,
    subMenusSubOffsetY: -2
  });
});
$(function() {
  var $mainMenuState = $('#main-menu-state');
    if ($mainMenuState.length) {
      $mainMenuState.change(function(e) {
      var $menu = $('#main-menu');
      if (this.checked) {
        $menu.hide().slideDown(1000, function() { $menu.css('display', ''); });
      }
      else {
        $menu.show().slideUp(1000, function() { $menu.css('display', ''); });
        }
      });

    $(window).bind('beforeunload unload', function() {
      if ($mainMenuState[0].checked) {
        $mainMenuState[0].click();
      }
    });
  }
});

AOS.init();


$('.client-section').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    loop: true,
    autoplay: true,
    speed:1500,
    autoplaySpeed: 5000,
    arrows:false,


     responsive: [
  
    {
      breakpoint: 989,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        
      }
    },
    {
      breakpoint: 699,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 476,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});

$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function() {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
});

$('.slider').slick({
  vertical: true,
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 500
});
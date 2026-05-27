function animateValue(e, t, i, o) {
  let n = null,
    a = (r) => {
      n || (n = r);
      let l = Math.min((r - n) / o, 1);
      ((e.innerHTML = Math.floor(l * (i - t) + t) + "+"),
        l < 1 && window.requestAnimationFrame(a));
    };
  window.requestAnimationFrame(a);
}
(AOS.init(),
  document.addEventListener("DOMContentLoaded", function () {
    let e = document.getElementById("menuToggle"),
      t = document.querySelector('label[for="menuToggle"]');
    (t.addEventListener("click", function () {
      e.checked = e.checked;
    }),
      window.addEventListener("scroll", function t() {
        e.checked = !1;
      }));
  }),
  document.addEventListener("DOMContentLoaded", function () {
    let e = document.querySelectorAll(".count");
    e.forEach((e) => {
      let t = parseInt(e.getAttribute("data-start"), 10),
        i = parseInt(e.getAttribute("data-end"), 10),
        o = parseInt(e.getAttribute("data-duration"), 20);
      ((e.innerHTML = t + "+"), animateValue(e, t, i, o));
    });
  }),
  $(".projetos-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: !0,
    autoplaySpeed: 1e3,
    arrows: !0,
    dots: !1,
    adaptiveHeight: !0,
    responsive: [
      {
        breakpoint: 1121,
        settings: {
          slidesToShow: 3,
          adaptiveHeight: !0,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          adaptiveHeight: !0,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          adaptiveHeight: !0,
        },
      },
    ],
  }));
var $slider = $(".client-slider"),
  $paginationNumber = $(".pagination-number");
function padNumber(e) {
  return e < 10 ? "0" + e : e;
}
($slider.slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: !0,
  autoplaySpeed: 1e3,
  arrows: !0,
  dots: !1,
  adaptiveHeight: !0,
  responsive: [
    {
      breakpoint: 1121,
      settings: {
        slidesToShow: 3,
        autoplay: !0,
        adaptiveHeight: !0,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        autoplay: !0,
        adaptiveHeight: !0,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        autoplay: !0,
        adaptiveHeight: !0,
      },
    },
  ],
}),
  $slider.on("init reInit afterChange", function (e, t, i) {
    var o = t.currentSlide + 1,
      n = t.slideCount;
    $paginationNumber.text(padNumber(o) + "/" + padNumber(n));
  }),
  $(window).scroll(function () {
    $(this).scrollTop() >= 50
      ? $("#return-to-top").fadeIn(200)
      : $("#return-to-top").fadeOut(200);
  }),
  $("#return-to-top").click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      500,
    );
  }));

// Mobile navigation dropdown handling (screen sizes below 992px)
$(document).ready(function () {
  // Ensure the toggler button has the 'collapsed' class initially if the menu is closed
  if (!$('#navbarSupportedContent').hasClass('show')) {
    $('#navbarToggleBtn').addClass('collapsed');
  }

  // Mobile dropdown toggle on click (below 992px)
  $('.navbar-nav .dropdown-toggle').on('click', function (e) {
    if (window.innerWidth < 992) {
      e.preventDefault();
      e.stopPropagation();

      var $el = $(this);
      var $parent = $el.parent('.dropdown');
      var $menu = $el.next('.dropdown-menu');

      // Close other dropdowns with slide animation
      $('.navbar-nav .dropdown-toggle').not($el).removeClass('show');
      $('.navbar-nav .dropdown').not($parent).removeClass('show');
      $('.navbar-nav .dropdown-menu').not($menu).slideUp(300);

      // Toggle current dropdown
      $el.toggleClass('show');
      $parent.toggleClass('show');
      $menu.slideToggle(300);
    }
  });

  // Reset dropdowns when mobile menu collapses
  $('#navbarSupportedContent').on('hidden.bs.collapse', function () {
    $('.navbar-nav .dropdown').removeClass('show');
    $('.navbar-nav .dropdown-toggle').removeClass('show');
    $('.navbar-nav .dropdown-menu').css('display', '').removeClass('show');
  });

  // Reset dropdown inline styles and classes on resizing back to desktop
  $(window).on('resize', function () {
    if (window.innerWidth >= 992) {
      $('.navbar-nav .dropdown-menu').css('display', '');
      $('.navbar-nav .dropdown').removeClass('show');
      $('.navbar-nav .dropdown-toggle').removeClass('show');
    }
  });

  // Close mobile menu when clicking outside of it
  $(document).on('click', function (e) {
    if (window.innerWidth < 992) {
      var $collapse = $('#navbarSupportedContent');
      var $toggler = $('#navbarToggleBtn');

      // If the click was outside both the mobile menu and the toggler button
      if (!$collapse.is(e.target) && $collapse.has(e.target).length === 0 &&
          !$toggler.is(e.target) && $toggler.has(e.target).length === 0) {
        if ($collapse.hasClass('show')) {
          $toggler.trigger('click');
        }
      }
    }
  });
});


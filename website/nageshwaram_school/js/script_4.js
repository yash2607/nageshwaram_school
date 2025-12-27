$(document).ready(function () {
  $(document).on('click', '#newModal .close', function () {
    $('#newModal').modal('hide');
  });
});
function findData(getId) {
  if (getId != '') {
    var id = getId.split('-');
    var dataid = id[id.length - 1];
    $('.loader').fadeIn();
    if (dataid != null && dataid != '') {
      $.ajax({
        url: 'filterdata.php',
        type: 'POST',
        data: {
          dataid: dataid
        },
        success: function (response) {
          $('#filteredData').html(response);
          $('.loader').fadeOut();
        },
        error: function (xhr, status, error) {
          console.log(xhr.responseText);
          $('.loader').fadeOut();
        }
      });
    } else {
      $('.loader').fadeOut();
    }
  } else {
    $('.loader').fadeOut();
  }
}
window.onload = function () {
  duDatepicker('.datepicker', {
    maxDate: 'today',
    auto: true,
    cancelBtn: false,
    format: 'yyyy-mm-dd',
    events: {
      dateChanged: function (data) {
      }
    }
  })
}
$(document).ready(function () {
  $('.getTc').on('click', function () {
    $('.getTc').attr('disabled', 'disabled');
    $('.loader').show();
    var admissionNo = $('#admissionNo').val().trim();
    var dob = $('#dob').val();
    if (admissionNo == '') {
      alert('Kindly Enter Admission No.');
      $('.loader').hide();
      $('.getTc').removeAttr('disabled', 'disabled');
      return false;
    } else if (dob == '') {
      alert('Kindly Enter Date of Birth');
      $('.loader').hide();
      $('.getTc').removeAttr('disabled', 'disabled');
      return false;
    } else {
      $.ajax({
        url: 'searchData2.php',
        type: "GET",
        data: { admno: admissionNo, dob: dob },
        success: function (res) {
          if (res != '') {
            var data = JSON.parse(res);
            if (data.error == "error") {
              alert('Kindly enter correct Admission No. and Date of birth.');
              $('.loader').hide();
              $('.getTc').removeAttr('disabled', 'disabled');
              return false;
            } else {
              $('#getstuName').val(data.stuName);
              $('#getclassname').val(data.className);
              $('#getfathername').val(data.fatherName);
              $('#getmothername').val(data.motherName);
              $('#getstuAdmNo').val(data.enrollmentno);
              $('#getcertificateNo').val(data.transfer_certificate_no);
              $('#getDateofWithdrawal').val(data.deactive_date);
              $('.downloadBtn').attr("onclick", `window.open('${data.tcUrl}','_blank')`);
              $('.tcContainer').show();
              $('.tcGetContainer').hide();
            }
          } else {
            alert('Kindly enter correct Admission No. and Date of birth.');
          }
          $('.loader').hide();
          $('.getTc').removeAttr('disabled', 'disabled');
        }, error: function (error) {
          console.error(error);
        }
      })
    }
  });
  let mainMenuData = $('#navbarSupportedContent').html();
  $('#MobileMenu').html(mainMenuData);

  $('.leftMenuBtn').click(function () {
    // Slide up all other dropdowns
    $('.leftMenu-drop').slideUp('normal');
    $('.leftMenuBtn.leftMenuBtnActive').removeClass('leftMenuBtnActive');

    // Toggle the dropdown
    if ($(this).children('.leftMenu-drop').is(':hidden')) {
      $(this).addClass('leftMenuBtnActive');
      $(this).children('.leftMenu-drop').slideDown('normal');
    } else {
      $(this).removeClass('leftMenuBtnActive');
      $(this).children('.leftMenu-drop').slideUp('normal');
    }
  });
  let typingTimer;
  const doneTypingInterval = 10000;

  $(".searchInput").on("keyup", function () {
    clearTimeout(typingTimer);

    $("#searchBox").show();
    $('#finalSearchData').empty().append('<li><a href="javascript:void(0)">Searching...</a></li>');

    var str = $(".searchInput").val().trim();
    if (str !== '' && str !== undefined && str !== null) {
      $.ajax({
        url: "searchData.php",
        type: "GET",
        data: { menuName: str },
        success: function (res) {
          if (res !== '' && res !== undefined && res !== null) {
            $('#finalSearchData').empty().append(res);
            $("#searchBox").show();
          } else {
            $('#finalSearchData').empty().append('<li><a href="javascript:void(0)">No Result Found...</a></li>');
            $("#searchBox").show();
          }
        },
        error: function (error) {
          console.log(error);
        }
      });
    } else {
      $("#searchBox").hide();
      $('#finalSearchData').empty().append('<li><a href="javascript:void(0)">Searching...</a></li>');
    }

  });
  $(".searchInput1").on("keyup", function () {
    clearTimeout(typingTimer);

    $("#searchBox1").show();
    $('#finalSearchData1').empty().append('<li><a href="javascript:void(0)">Searching...</a></li>');

    var str = $(".searchInput1").val().trim();
    if (str !== '' && str !== undefined && str !== null) {
      $.ajax({
        url: "searchData.php",
        type: "GET",
        data: { menuName: str },
        success: function (res) {
          if (res !== '' && res !== undefined && res !== null) {
            $('#finalSearchData1').empty().append(res);
            $("#searchBox1").show();
          } else {
            $('#finalSearchData1').empty().append('<li><a href="javascript:void(0)">No Result Found...</a></li>');
            $("#searchBox1").show();
          }
        },
        error: function (error) {
          console.log(error);
        }
      });
    } else {
      $("#searchBox1").hide();
      $('#finalSearchData1').empty().append('<li><a href="javascript:void(0)">Searching...</a></li>');
    }

  });
  $(".searchInput").on("keydown", function () {
    clearTimeout(typingTimer);
    $("#searchBox").hide();
    $('#finalSearchData').empty().append('<li><a href="javascript:void(0)">Searching...</a></li>');
  });
  $(".searchInput1").on("keydown", function () {
    clearTimeout(typingTimer);
    $("#searchBox1").hide();
    $('#finalSearchData1').empty().append('<li><a href="javascript:void(0)">Searching...</a></li>');
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let currentPath = window.location.pathname.split('/').pop();
  let menuLinks = document.querySelectorAll("#leftSideMenu a");
  let menuMobileLinks = document.querySelectorAll("#navbarSupportedContent .navigation  a");

  menuLinks.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active-leftPage");

      // Get the closest parent <ul> (submenu)
      let activeLi = document.querySelector(".active-leftPage");
      if (activeLi && activeLi.parentNode.parentNode.classList.contains("leftMenu-drop")) {
        activeLi.parentNode.parentNode.style.display = "block";
        activeLi.parentNode.parentNode.parentNode.classList.add("leftMenuBtnActive");
      }
    }
  });
  menuMobileLinks.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active-leftPage");
      $('.current .dropdown-btn').addClass("open");
      $('.current ul').slideDown(500);
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var specialUrl = "https://www.dpscoimbatore.com/upload/pdf/CBSE-School-Wesbite-Mandatory-Public-Disclosure.pdf";
  document.querySelectorAll(".navigation a").forEach(function (link) {
    if (link.hostname && link.hostname !== location.hostname || link.href === specialUrl) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var specialUrl = "https://www.dpscoimbatore.com/upload/pdf/CBSE-School-Wesbite-Mandatory-Public-Disclosure.pdf";
  document.querySelectorAll("#leftSideMenu li a").forEach(function (link) {
    if (link.hostname && link.hostname !== location.hostname || link.href === specialUrl) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });
});

/* start of to the top */
$(window).scroll(function () {
  if ($(this).scrollTop() > 100) {
    $('#to-the-top').fadeIn();
  } else {
    $('#to-the-top').fadeOut();
  }
});
$('#to-the-top').click(function () { $('body,html').animate({ scrollTop: 0 }, 100); });
/* end of to the top */

!(function (e) {
  "use strict";

  function t() {
    if (
      e(".industries-covered .outer-box").length &&
      e(window).width() >= 1200
    ) {
      var t = (e(window).width() - 1200) / 2;
      e(".industries-covered .outer-box").css("margin-right", t);
    }
  }

  function n() {
    if (e(".main-header").length) {
      var t = e(window).scrollTop(),
        n = e(".main-header"),
        a = e(".scroll-to-top"),
        o = e(".main-header .sticky-header");
      t > 300
        ? (n.addClass("fixed-header"),
          o.addClass("animated slideInDown"),
          a.fadeIn(300))
        : (n.removeClass("fixed-header"),
          o.removeClass("animated slideInDown"),
          a.fadeOut(300));
    }
  }
  if (
    (t(),
      e(".time-countdown").length &&
      e(".time-countdown").each(function () {
        var t = e(this),
          n = e(this).data("countdown");
        t.countdown(n, function (t) {
          e(this).html(
            t.strftime(
              '<div class="counter-column"><span class="count">%D</span>Days</div> <div class="counter-column"><span class="count">%H</span>Hours</div>  <div class="counter-column"><span class="count">%M</span>Minutes</div>  <div class="counter-column"><span class="count">%S</span>Seconds</div>'
            )
          );
        });
      }),
      e(".preloader-close").length &&
      e(".preloader-close").on("click", function () {
        e(".loader-wrap").delay(200).fadeOut(500);
      }),
      (function (t) {
        var n = document.createElement("li");
        n.classList.add("home-icon");
        var a = document.createElement("a");
        a.href = "index.php";
        var o = document.createElement("img");
        (o.src =
          "https://resources.edunexttechnologies.com/web-data/takshila/dpscoimbatore/home-icon.svg"),
          (o.alt = "Home Logo"),
          a.appendChild(o),
          n.appendChild(a);
        var s = document.getElementsByClassName("addHome");
        if (s.length > 0)
          for (var i = 0; i < s.length; i++) {
            var l = n.cloneNode(!0);
            s[i].insertBefore(l, s[i].firstChild);
          }
        let r = window.location.href.split("/").reverse()[0];
        t.find("li").each(function () {
          let t = e(this).find("a");
          e(t).attr("href") == r && e(this).addClass("current");
        }),
          t.children("li").each(function () {
            e(this).find(".current").length && e(this).addClass("current");
          }),
          "" == r && t.find("li").eq(0).addClass("current");
      })(e(".main-menu").find(".navigation")),
      e(window).scroll(function () {
        e(this).scrollTop() > 700
          ? e(".home-menu").removeClass("menuup")
          : e(".home-menu").addClass("menuup");
      }),
      n(),
      e(".main-header li.dropdown ul").length &&
      e(".main-header .navigation li.dropdown").append(
        '<div class="dropdown-btn"><span class="fa fa-angle-right"></span></div>'
      ),
      e(".hidden-sidebar").length)
  ) {
    var a = e(".sidemenu-nav-toggler"),
      o = e(".hidden-sidebar"),
      s = e(".nav-overlay"),
      i = e(".hidden-sidebar-close");

    function t() {
      TweenMax.to(o, 0.6, {
        force3D: !1,
        left: "-480px",
        ease: Expo.easeInOut,
      }),
        o.addClass("close-sidebar"),
        s.fadeOut(500);
    }
    a.on("click", function () {
      o.hasClass("close-sidebar")
        ? (TweenMax.to(o, 0.6, {
          force3D: !1,
          left: "0",
          ease: Expo.easeInOut,
        }),
          o.removeClass("close-sidebar"),
          s.fadeIn(500))
        : t();
    }),
      s.on("click", function () {
        t();
      }),
      i.on("click", function () {
        t();
      });
  }
  if (e(".nav-overlay").length) {
    var l = e(".nav-overlay .cursor"),
      r = e(".nav-overlay .cursor-follower"),
      c = 0,
      d = 0,
      u = 0,
      p = 0;
    TweenMax.to({}, 0.016, {
      repeat: -1,
      onRepeat: function () {
        (c += (u - c) / 9),
          (d += (p - d) / 9),
          TweenMax.set(r, {
            css: {
              left: c - 22,
              top: d - 22,
            },
          }),
          TweenMax.set(l, {
            css: {
              left: u,
              top: p,
            },
          });
      },
    }),
      e(document).on("mousemove", function (e) {
        var t = window.pageYOffset || document.documentElement.scrollTop;
        (u = e.pageX), (p = e.pageY - t);
      }),
      e("button, a").on("mouseenter", function () {
        l.addClass("active"), r.addClass("active");
      }),
      e("button, a").on("mouseleave", function () {
        l.removeClass("active"), r.removeClass("active");
      }),
      e(".nav-overlay").on("mouseenter", function () {
        l.addClass("close-cursor"), r.addClass("close-cursor");
      }),
      e(".nav-overlay").on("mouseleave", function () {
        l.removeClass("close-cursor"), r.removeClass("close-cursor");
      });
  }
  if (e(".mobile-menu").length) {
    e(".mobile-menu .menu-box").niceScroll({
      cursorborder: "none",
      cursorborderradius: "0px",
      touchbehavior: !0,
      bouncescroll: !1,
      scrollspeed: 120,
      mousescrollstep: 90,
      horizrailenabled: !0,
      preservenativescrolling: !0,
      cursordragontouch: !0,
    });
    var h = e(".main-header .nav-outer .main-menu").html();
    e(".mobile-menu .menu-box .menu-outer").append(h),
      e(".mobile-menu li.dropdown").on("click", function (event) {
        event.stopPropagation();
        let menuThis = e(this);
        if (menuThis.hasClass('subMenu')) {
          menuThis.children('.sub-menu').slideToggle(500);
          menuThis.children('.dropdown-btn').toggleClass("open");
          return false;
        } else {
          e(".mobile-menu li.dropdown").not(menuThis).children('.dropdown-btn').removeClass("open");
          e(".mobile-menu li.dropdown").not(menuThis).children('ul').slideUp(500);
          menuThis.children('.dropdown-btn').toggleClass("open");
          menuThis.children('ul').slideToggle(500);
        }
      }),
      e(".mobile-nav-toggler").on("click", function () {
        e("body").addClass("mobile-menu-visible");
      }),
      e(
        ".mobile-menu .menu-backdrop,.mobile-menu .close-btn,.scroll-nav li a"
      ).on("click", function () {
        e("body").removeClass("mobile-menu-visible");
      });
  }
  e(".side-menu").length &&
    (e(".side-menu .menu-box").niceScroll({
      cursorborder: "none",
      cursorborderradius: "0px",
      touchbehavior: !0,
      bouncescroll: !1,
      scrollspeed: 120,
      mousescrollstep: 90,
      horizrailenabled: !0,
      preservenativescrolling: !0,
      cursordragontouch: !0,
    }),
      e(".side-menu li.dropdown .dropdown-btn").on("click", function () {
        e(this).toggleClass("open"), e(this).prev("ul").slideToggle(500);
      }),
      e("body").addClass("side-menu-visible"),
      e(".side-nav-toggler").on("click", function () {
        e("body").addClass("side-menu-visible");
      }),
      e(".side-menu .side-menu-resize").on("click", function () {
        e("body").toggleClass("side-menu-visible");
      }),
      e(".main-header .mobile-nav-toggler-two").on("click", function () {
        e("body").addClass("side-menu-visible-s2");
      }),
      e(".main-header .side-menu-overlay").on("click", function () {
        e("body").removeClass("side-menu-visible-s2");
      })),
    e("#search-popup").length &&
    (e(".search-toggler").on("click", function () {
      e("#search-popup").addClass("popup-visible");
    }),
      e(document).keydown(function (t) {
        27 === t.keyCode && e("#search-popup").removeClass("popup-visible");
      }),
      e(".close-search,.search-popup .overlay-layer").on("click", function () {
        e("#search-popup").removeClass("popup-visible");
      }));
  var m = new Swiper(".testimonial-thumbs", {
    loop: !1,
    spaceBetween: 10,
    slidesPerView: 3,
    initialSlide: 1,
    freeMode: !0,
    speed: 1400,
    watchSlidesVisibility: !0,
    watchSlidesProgress: !0,
    centeredSlides: !0,
    autoplay: {
      delay: 5e3,
    },
  });
  e(".swiper-container").length,
    new Swiper(".testimonial-content", {
      spaceBetween: 10,
      slidesPerView: 1,
      mousewheel: !0,
      autoplay: {
        delay: 5e3,
      },
      loop: !1,
      speed: 1400,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: m,
      },
    });

  function b() {
    if (e(".sortable-masonry").length) {
      var t = e(window),
        n = e(".sortable-masonry .items-container"),
        a = e(".filter-btns");
      n.isotope({
        filter: ".all",
        animationOptions: {
          duration: 500,
          easing: "linear",
        },
      }),
        a.find("li").on("click", function () {
          var t = e(this).attr("data-filter");
          try {
            n.isotope({
              filter: t,
              animationOptions: {
                duration: 500,
                easing: "linear",
                queue: !1,
              },
            });
          } catch (e) { }
          return !1;
        }),
        t.on("resize", function () {
          var e = a.find("li.active").attr("data-filter");
          n.isotope({
            filter: e,
            animationOptions: {
              duration: 500,
              easing: "linear",
              queue: !1,
            },
          }),
            n.isotope();
        });
      var o = e(".filter-btns li");
      o.on("click", function () {
        var t = e(this);
        t.hasClass("active") || (o.removeClass("active"), t.addClass("active"));
      }),
        n.isotope("on", "layoutComplete", function (t, n) {
          t = n.length;
          e(".filters .count").html(t);
        });
    }
  }
  if (
    (e(".languages").click(function () {
      e(".languages ul").show();
    }),
      e(".languages ul").mouseleave(function () {
        e(".languages ul").hide();
      }),
      e(".languages li a").click(function () {
        e(".languages li a").removeClass("sel"), e(this).addClass("sel");
        var t = e(this).text(),
          n = t.substring(0, 2);
        e(".languages .current").html(n),
          e(".languages .current").attr("title", t),
          e(".languages .hover").html(t);
      }),
      e(".price-range-slider").length &&
      (e(".price-range-slider").slider({
        range: !0,
        min: 10,
        max: 200,
        values: [10, 99],
        slide: function (t, n) {
          e("input.property-amount").val(n.values[0] + " - " + n.values[1]);
        },
      }),
        e("input.property-amount").val(
          e(".price-range-slider").slider("values", 0) +
          " - $" +
          e(".price-range-slider").slider("values", 1)
        )),
      e(".lazy-image").length &&
      new LazyLoad({
        elements_selector: ".lazy-image",
        load_delay: 0,
        threshold: 300,
      }),
      e(".theme_carousel").length &&
      e(".theme_carousel").each(function (t) {
        var n = {},
          a = e(this).data("options");
        e.extend(n, a), e(this).owlCarousel(n);
      }),
      e(".count-bar").length &&
      e(".count-bar").appear(
        function () {
          var t = e(this),
            n = t.data("percent");
          e(t).css("width", n).addClass("counted");
        },
        {
          accY: -50,
        }
      ),
      e(".quantity-spinner").length &&
      e("input.quantity-spinner").TouchSpin({
        verticalbuttons: !0,
      }),
      e(".count-box").length &&
      e(".count-box").appear(
        function () {
          var t = e(this),
            n = t.find(".count-text").attr("data-stop"),
            a = parseInt(t.find(".count-text").attr("data-speed"), 10);
          t.hasClass("counted") ||
            (t.addClass("counted"),
              e({
                countNum: t.find(".count-text").text(),
              }).animate(
                {
                  countNum: n,
                },
                {
                  duration: a,
                  easing: "linear",
                  step: function () {
                    t.find(".count-text").text(Math.floor(this.countNum));
                  },
                  complete: function () {
                    t.find(".count-text").text(this.countNum);
                  },
                }
              ));
        },
        {
          accY: 0,
        }
      ),
      e(".tabs-box").length &&
      e(".tabs-box .tab-buttons .tab-btn").on("click", function (t) {
        t.preventDefault();
        var n = e(e(this).attr("data-tab"));
        if (e(n).is(":visible")) return !1;
        n
          .parents(".tabs-box")
          .find(".tab-buttons")
          .find(".tab-btn")
          .removeClass("active-btn"),
          e(this).addClass("active-btn"),
          n.parents(".tabs-box").find(".tabs-content").find(".tab").fadeOut(0),
          n
            .parents(".tabs-box")
            .find(".tabs-content")
            .find(".tab")
            .removeClass("active-tab"),
          e(n).fadeIn(300),
          e(n).addClass("active-tab");
      }),
      e(".accordion-box").length &&
      e(".accordion-box").on("click", ".acc-btn", function () {
        var t = e(this).parents(".accordion-box"),
          n = e(this).parents(".accordion");
        if (
          (!0 !== e(this).hasClass("active") &&
            e(t).find(".accordion .acc-btn").removeClass("active"),
            e(this).next(".acc-content").is(":visible"))
        )
          return !1;
        e(this).addClass("active"),
          e(t).children(".accordion").removeClass("active-block"),
          e(t).find(".accordion").children(".acc-content").slideUp(300),
          n.addClass("active-block"),
          e(this).next(".acc-content").slideDown(300);
      }),
      e(".lightbox-image").length &&
      e(".lightbox-image").fancybox({
        openEffect: "fade",
        closeEffect: "fade",
        helpers: {
          media: {},
        },
      }),
      b(),
      e(".testimonial-carousel").length)
  ) {
    var v = new Swiper(".testimonial-thumbs", {
      preloadImages: !1,
      loop: !0,
      speed: 2400,
      slidesPerView: 3,
      centeredSlides: !0,
      spaceBetween: 0,
      effect: "slide",
    });
    e(".swiper-container").length,
      new Swiper(".testimonial-content", {
        preloadImages: !1,
        loop: !0,
        speed: 2400,
        spaceBetween: 0,
        effect: "slide",
        thumbs: {
          swiper: v,
        },
      });
  }
  if (
    (e(".project-tab").length &&
      e(".project-tab .project-tab-btns .p-tab-btn").on("click", function (t) {
        t.preventDefault();
        var n = e(e(this).attr("data-tab"));
        if (e(n).hasClass("actve-tab")) return !1;
        e(".project-tab .project-tab-btns .p-tab-btn").removeClass(
          "active-btn"
        ),
          e(this).addClass("active-btn"),
          e(".project-tab .p-tabs-content .p-tab").removeClass("active-tab"),
          e(n).addClass("active-tab");
      }),
      e(".single-image-carousel").length)
  )
    new Swiper(".single-image-carousel", {
      preloadImages: !1,
      loop: !0,
      speed: 1400,
      spaceBetween: 0,
      effect: "fade",
      autoplay: {
        delay: 5e3,
        disableOnInteraction: !1,
      },
      navigation: {
        nextEl: ".slider-button-next",
        prevEl: ".slider-button-prev",
      },
    });

  function f() {
    if (e(".isotope-block").length) e(".isotope-block").isotope();
  }
  (e(".project-tab").length &&
    e(".project-tab .project-tab-btns .p-tab-btn").on("click", function (t) {
      t.preventDefault();
      var n = e(e(this).attr("data-tab"));
      if (e(n).hasClass("actve-tab")) return !1;
      e(".project-tab .project-tab-btns .p-tab-btn").removeClass("active-btn"),
        e(this).addClass("active-btn"),
        e(".project-tab .p-tabs-content .p-tab").removeClass("active-tab"),
        e(n).addClass("active-tab");
    }),
    f(),
    e(".progress-levels .progress-box .bar-fill").length &&
    e(".progress-box .bar-fill").each(function () {
      var t = e(this).attr("data-percent");
      e(this).css("width", t + "%"),
        e(this)
          .children(".percent")
          .html(t + "%");
    }),
    e(".scroll-to-target").length &&
    e(".scroll-to-target").on("click", function () {
      var t = e(this).attr("data-target");
      e("html, body").animate(
        {
          scrollTop: e(t).offset().top,
        },
        1500
      );
    }),
    e(".ajax-sub-form").length > 0 &&
    (e(".ajax-sub-form").ajaxChimp({
      language: "es",
      url: "https://gmail.us17.list-manage.com/subscribe/post?u=8a43765a655b07d21fa500e4e&amp;id=2eda0a58a7",
    }),
      (e.ajaxChimp.translations.es = {
        submit: "Submitting...",
        0: "Thanks for your subscription",
        1: "Please enter a valid email",
        2: "An email address must contain a single @",
        3: "The domain portion of the email address is invalid (the portion after the @: )",
        4: "The username portion of the email address is invalid (the portion before the @: )",
        5: "This email address looks fake or invalid. Please enter a real email address",
      })),
    e(".dropdown-menu a.dropdown-toggle").length &&
    e(".dropdown-menu a.dropdown-toggle").on("click", function (t) {
      return (
        e(this).closest(".dropdown").hasClass("show") ||
        e(this)
          .closest(".dropdown")
          .first()
          .find(".show")
          .removeClass("show"),
        e(this).closest(".dropdown").toggleClass("show"),
        e(this)
          .parents("li.nav-item.dropdown.show")
          .on("hidden.bs.dropdown", function (t) {
            e(".dropdown-submenu .show").removeClass("show");
          }),
        !1
      );
    }),
    e(".wow").length) &&
    new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: !0,
      live: !0,
    }).init();
  e(".scroll-nav").length && e(".scroll-nav ul").onePageNav(),
    e(window).on("resize", function () {
      t();
    }),
    jQuery(window).on("scroll", function () {
      n();
    }),
    jQuery(window).on("load", function () {
      e(".loader-wrap").length && e(".loader-wrap").delay(1e3).fadeOut(500),
        TweenMax.to(e(".loader-wrap .overlay"), 1.2, {
          force3D: !0,
          left: "100%",
          ease: Expo.easeInOut,
        }),
        b(),
        f(),
        e(".banner-slider").length > 0 &&
        new Swiper(".banner-slider", {
          preloadImages: !1,
          loop: !0,
          grabCursor: !0,
          centeredSlides: !1,
          resistance: !0,
          resistanceRatio: 0.6,
          speed: 1400,
          spaceBetween: 0,
          parallax: !1,
          effect: "slide",
          autoplay: {
            delay: 3e3,
            disableOnInteraction: !1,
          },
          pagination: {
            el: ".banner-slider-pagination",
            clickable: !0,
          },
          navigation: {
            nextEl: ".banner-slider-button-next",
            prevEl: ".banner-slider-button-prev",
          },
        });
    });
  e(".searchToggle").on("click", function (event) {
    event.stopPropagation();
    if (e(".search-bar").is(":visible")) {
      e(".search-bar").fadeOut();
      e(".searchInput").blur();
    } else {
      e(".search-bar").fadeIn();
      e(".searchInput").focus();
    }
  });
  e('.searchInput').on("click", function (event) {
    event.stopPropagation();
  });
  e(document).on("click", function () {
    e(".search-bar").fadeOut();
  });

})(window.jQuery);

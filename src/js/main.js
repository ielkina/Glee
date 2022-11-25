"use strict";

$(function () {

  $('.hero-slider').slick({
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000
  })
  //Product фильтр
  var containerEl = document.querySelector('.catalog');
  var mixer = mixitup(containerEl);
  // ------------------------------------------------------------------------
});

// $(document).ready(function () {
//   $(".design-filter__item").click(function () {
//     var name = $(this).attr('data-filter-item');
//     if (name == "all") {
//       $(".design-catalog__item").show('2000');
//     } else {
//       $(".design-catalog__item").not("." + name).hide('2000');
//       $(".design-catalog__item").filter("." + name).show('2000');
//     }
//   })

//   $(".design-filter__item li").click(function () {
//     $(this).addClass("active").siblings().removeClass("active");
//   })
// })
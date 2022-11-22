document.addEventListener("DOMContentLoaded", () => {
  //Mobile Menu
  const burger = document.querySelector(".burger"); //наша кнопка
  // const mobileMenu = document.querySelector(".menu__list"); //мобильное меню
  const mobileMenu = document.querySelector(".navbar"); //мобильное меню
  const mobileLogo = document.querySelector(".logo")//лого
  const bodyLock = document.querySelector("body"); //ищем как селектор ТЕГА

  burger.addEventListener("click", () => {
    // mobileMenu.classList.toggle("menu__list--active"); //когда меню открыто
    mobileMenu.classList.toggle("navbar--active"); //когда меню открыто
    // if (mobileMenu.classList.contains("menu__list--active")) {
    if (mobileMenu.classList.contains("navbar--active")) {
      //Проверяем, есть ли у меню активный класс
      burger.classList.add("burger--active"); //Когда открыто, иконка становится крестиком
      bodyLock.classList.add("lock"); //Блокируем скролл при открытом меню
    } else {
      //Когда нету активного класса у меню
      burger.classList.remove("burger--active"); //Возвращает в исходное состояние
      bodyLock.classList.remove("lock"); //Разрешаем скроллить
    }
  });
  document.addEventListener("click", function (e) {
    if (e.target !== burger && e.target !== mobileMenu) {
      burger.classList.remove("burger--active");
      // mobileMenu.classList.remove("menu__list--active");
      mobileMenu.classList.remove("navbar--active");
      bodyLock.classList.remove("lock");
    }
  });
});
$(function () {
  $('.reviews-slider').slick({
    dots: true,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"><svg class="slick-prev__icon"><use class="slick-prev__icon-use" xlink:href="img/sprite.svg#icon-prev-arrow"></use></svg></button >',
    nextArrow: '<button type="button" class="slick-next"><svg class="slick-next__icon"><use class="slick-next__icon-use" xlink:href="img/sprite.svg#icon-next-arrow"></use></svg></button>'
  });
  var mixer = mixitup('.popular-food');
})


const filterBox = document.querySelectorAll('.design-catalog');
document.querySelector('.design-filter').addEventListener('click', event => {
  if (event.target.tagName !== 'button') return false;
  let filterClass = event.target.dataset['filter'];
  filterBox.forEach(elem => {
    elem.classList.remove('hide');
    if (!elem.classList.contains(filterClass) && filterClass !== 'all') {
      elem.classList.add('hide');
    }
  });
});

$(document).ready(function () {
  var activeCat = "";
  function filterGroup(group) {
    if (activeCat != group) {
      $("li").filter("." + group).show();
      $("li").filter(":not(." + group + ")").hide();
      activeCat = group;
    }
  }

  $(".all").click(function () {
    $("li").show();
    activeCat = "all";
  });
  $(".furnitures").click(function () { filterGroup("furnitures"); });
  $(".chairs").click(function () { filterGroup("chairs"); });
  $(".lighting").click(function () { filterGroup("lighting"); });
  $(".decor").click(function () { filterGroup("decor"); });
});

$(document).ready(function () {

  var activeCat = "";
  function filterGroup(group) {
    if (activeCat != group) {
      $("li").filter("." + group).show();
      $("li").filter(":not(." + group + ")").hide();
      activeCat = group;
    }
  }

  $(".all").click(function () {
    $("li").show();
    activeCat = ".all";
  });
  $(".furnitures").click(function () { filterGroup("furnitures"); });
  $(".chairs").click(function () { filterGroup("chairs"); });
  $(".lighting").click(function () { filterGroup("lighting"); });
  $(".decor").click(function () { filterGroup("decor"); });
});

let sortBtn = document.querySelector('.design-filter').children;
let sortItem = document.querySelector('.design-catalog__item').children;
for (let i = 0; i < sortBtn.length; i++) {
  sortBtn[i].addEventListener('click', function () {
    for (let j = 0; j < sortBtn.length; j++) {
      sortBtn[j].classList.remove('current');
    }

    this.classList.add('current');


    let targetData = this.getAttribute('data-target');

    for (let k = 0; k < sortItem.length; k++) {
      sortItem[k].classList.remove('active');
      sortItem[k].classList.add('delete');

      if (sortItem[k].getAttribute('data-item') == targetData || targetData == "all") {
        sortItem[k].classList.remove('delete');
        sortItem[k].classList.add('active');
      }
    }
  });
}


$(document).ready(function () {
  $(".design-filter__link").click(function () {
    var name = $(this).attr('data-filter');
    if (name == "all") {
      $(".shot-thumbnail").show('2000');
    } else {
      $(".shot-thumbnail").not("." + name).hide('2000');
      $(".shot-thumbnail").filter("." + name).show('2000');
    }
  })

  $(".design-filter li").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
  })
})
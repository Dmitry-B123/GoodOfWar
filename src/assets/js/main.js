const classes = {
   hidden: "hidden",
   active: "active",
   opened: "opened",
   hidden: "hidden-anim",
};

// 1 burger
const burgerBtn = document.querySelector('.btn-burger');
const burgerMenu = document.querySelector('.header__menu-bar');

burgerBtn.addEventListener('click', function () {
   burgerMenu.classList.toggle('header__menu-active');
});

// 2 btn langs
const langBtn = document.querySelectorAll('.header__langs');
const langMenu = document.querySelectorAll('.lang-block');

langBtn.forEach((langs) => {
   langMenu.forEach((lang) => lang.classList.remove('lang-block-active'));

   langs.addEventListener('click', (e) => {
      langMenu.forEach((lang) => lang.classList.toggle('lang-block-active'));
   });
});

// 3 scroll menu
const linkMenu = document.querySelectorAll('.header__link');

function toScrollSection(e) {
   e.preventDefault();
   const href = e.currentTarget.getAttribute("href");

   if (!href && !href.starsWith('#')) return;

   const section = href.slice(1);
   const top = document.getElementById(section)?.offsetTop || 0;
   window.scrollTo({ top, behavior: "smooth" });
}

linkMenu.forEach((link) => link.addEventListener('click', toScrollSection));

// 4 timer
const formatValue = (value) => (value < 10 ? `0${value}` : value);

const getTimerValues = (diff) => ({
   secconds: (diff / 1000) % 60,
   minutes: (diff / (1000 * 60)) % 60,
   hours: (diff / (1000 * 3600)) % 24,
   days: (diff / (1000 * 3600 * 24)) % 30,
});

const setTimeValues = (values) => {
   Object.entries(values).forEach(([key, value]) => {
      const timeValue = document.getElementById(key);
      timeValue.innerText = formatValue(Math.floor(value));
   });
};

const startTimer = (data) => {
   const id = setInterval(() => {
      const diff = new Date(data).getTime() - new Date().getTime();

      if (diff < 0) {
         clearInterval(id);
         return;
      }
      setTimeValues(getTimerValues(diff));
   }, 1000)
};

startTimer('December 17, 2022 00:00:00');

// 5 video

let isPlay = false;
const video = document.getElementById('video');
const videoBtn = document.querySelector('.btn-play');

const handleVideo = ({ target }) => {
   const info = target.parentElement;

   isPlay = !isPlay;
   info.classList.toggle(classes.hidden, isPlay);
   target.innerText = isPlay ? "Pause" : "Play";
   isPlay ? video.play() : video.pause();
};

videoBtn.addEventListener('click', handleVideo);

// 6 explore checkbox
const checkboxes = {
   req: ["minimum", "recomended"],
   versions: ["standard", "limited"],
}

const checkInput = document.querySelectorAll(".switch-checkbox");

const handleCheckBox = ({ currentTarget: { checked, name } }) => {
   const { active } = classes;
   const value = checkboxes[name][Number(checked)];

   const list = document.getElementById(value);
   const tabs = document.querySelectorAll(`[data-${name}]`);
   const siblings = list.parentElement.children;

   for (const item of siblings) item.classList.remove(active);
   for (const tab of tabs) {
      tab.classList.remove(active);
      tab.dataset[name] === value && tab.classList.add(active);
   }

   list.classList.add(active);
};

checkInput.forEach((check) => check.addEventListener("click", handleCheckBox));

// 7 slider slick on jquery
$(document).ready(function () {
   $('.swiper-wrapper').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      prevArrow: $('.swiper-button-prev'),
      nextArrow: $('.swiper-button-next'),
      responsive: [
         {
            breakpoint: 1500,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1
            }
         },
         {
            breakpoint: 1000,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }
      ]
   });
});

// 8 accordion 
const itemFaq = document.querySelectorAll('.accordion__block');

const handFaqBlocks = ({ currentTarget: target }) => {
   target.classList.toggle(classes.opened);
   const isOpened = target.classList.contains(classes.opened);
   const height = target.querySelector('p').clientHeight;
   const content = target.querySelector('.accordion__description');

   content.style.height = `${isOpened ? height : 0}px`;
};

itemFaq.forEach((item) => item.addEventListener("click", handFaqBlocks));

// 9 scroll animation section
const sections = document.querySelectorAll('.s');

const handleScroll = () => {
   const { scrollY: y, innerHeight: h } = window;
   sections.forEach((sec) => {
      if (y > sec.offsetTop - h / 1.5) {
         sec.classList.add(classes.hidden);
      } else if (y < sec.offsetTop - h) {
         sec.classList.remove(classes.hidden);
      }
   });
};

window.addEventListener('scroll', handleScroll);

// 10 switch languages

// для кнопов в html указали data-lang="en" и data-lang="ru"
// для измененных значений в html указали data-text="editions" и т.д.

const languages = {
   en: {
      editions: "Editions",
      controller: "Controller",
      about: "About",
      explore: "Explore",
      news: "News",
      faq: "FAQ",
   },
   ru: {
      editions: "Издания",
      controller: "Джойстик",
      about: "Об игре",
      explore: "Исследовать",
      news: "Новости",
      faq: "Помощь",
   },
};

const langs = document.querySelectorAll('.lang');

const setTexts = () => {
   const lang = localStorage.getItem("lang") || "en";
   const content = languages[lang];

   Object.entries(content).forEach(([key, value]) => {
      const items = document.querySelectorAll(`[data-text="${key}"]`);
      items.forEach((item) => (item.innerText = value));
   });
};

const toggleLanguage = ({ target }) => {
   const { lang } = target.dataset;

   if (!lang) return;

   localStorage.setItem("lang", lang);
   setTexts();
};

setTexts();

langs.forEach((lang) => lang.addEventListener("click", toggleLanguage));
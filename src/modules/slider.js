import Swiper, { Autoplay, Navigation, Pagination } from 'swiper';

Swiper.use([Autoplay, Navigation, Pagination]);

export const slider = () => {
    const swiper = new Swiper('.swiper', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        loop: true
    });
}
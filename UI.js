'use strict';

// MODAL

const modals = document.querySelectorAll('.modals');
const overlay = document.querySelector('.overlay');
const btnShowModal = document.querySelectorAll('.showModal');
const btnCloseModal = document.querySelectorAll('.closeModal');


// functions
const openModal = function (modalNb) {
    modals.forEach(el => {
        el.style.opacity = '0';
        el.classList.add('d-none');
    });

    const elment = document.querySelector(`.${modalNb}`);

    setTimeout(() => {
        elment.style.opacity = '1';
    }, 300);
    elment.classList.remove('d-none');
    overlay.classList.remove('d-none');
};

const closeModal = function (element) {
    setTimeout(() => {
        element.style.opacity = '0';
        element.classList.add('d-none');
        overlay.classList.add('d-none');
    }, 300);
}

// event listeners
btnShowModal.forEach(button => {
    button.addEventListener('click', function (e) {
        const modalNb = `modal${e.target.textContent}`;
        openModal(modalNb);
    });
});

btnCloseModal.forEach(button => {
    button.addEventListener('click', function (e) {
        const element = e.target.closest('div');
        closeModal(element);
    });
});

overlay.addEventListener('click', function () {
    modals.forEach(el => {
        setTimeout(() => {
            el.style.opacity = '0';
            el.classList.add('d-none');
            overlay.classList.add('d-none');
        }, 300);
    });
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        modals.forEach(el => {
            setTimeout(() => {
                el.style.opacity = '0';
                el.classList.add('d-none');
                overlay.classList.add('d-none');
            }, 300);
        });
    }
});


// TABBED COMPONENTS
const tabs = document.querySelectorAll('.tabs__tab');
const tabsContainer = document.querySelector('.tabs__tab-container');
const tabsContent = document.querySelectorAll('.tabs__tab-content');

tabsContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.tabs__tab');
    if (!clicked) return;
    tabs.forEach(tab => tab.classList.remove('tabs__tab--active'));
    tabsContent.forEach(cont => cont.classList.remove('tabs__content--active'));
    // activate tab
    clicked.classList.add('tabs__tab--active');
    // activate content
    document.querySelector(`.tabs__content--${clicked.dataset.tab}`).classList.add('tabs__content--active');

});

// Analog clock
const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
    const now = new Date();
    // seconds
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    //minutes
    const mins = now.getMinutes();
    const minDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
    minsHand.style.transform = `rotate(${minDegrees}deg)`;
    // hours
    const hour = now.getHours();
    const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
};

setInterval(setDate, 1000);
setDate();

// digital clock
const digitalClock = document.querySelector('.digital-clock');
const tick = () => {
    const now = new Date();
    const h = `${now.getHours()}`.padStart(2, 0);
    const m = `${now.getMinutes()}`.padStart(2, 0);
    const s = `${now.getSeconds()}`.padStart(2, 0);
    const html = `<span>${h} : ${m}</span>`;
    digitalClock.innerHTML = html;
};

setInterval(tick, 1000);

// SLIDER

const slider = function () {
    const slides = document.querySelectorAll('.slide');
    const bntLeft = document.querySelector('.slider__btn--left');
    const bntRight = document.querySelector('.slider__btn--right');

    let currentSlide = 0;
    const maxSlide = slides.length;

    // create dots
    const dotsContainer = document.querySelector('.dots');
    const createDots = function () {
        slides.forEach((_, i) => {
            dotsContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
        });
    };

    // activate dot
    const activateDot = function (slide) {
        document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
    };

    const goToSlide = function (slide) {
        slides.forEach((sl, i) => sl.style.transform = `translateX(${100 * (i - slide)}%)`);
    };

    // next slide
    const nextSlide = function () {
        if (currentSlide === maxSlide - 1) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        goToSlide(currentSlide);
        activateDot(currentSlide);
    };

    //previous slide
    const previousSlide = function () {
        if (currentSlide === 0) {
            currentSlide = maxSlide - 1;
        } else {
            currentSlide--;
        }
        goToSlide(currentSlide);
        activateDot(currentSlide);
    };

    // initialisation
    const init = function () {
        goToSlide(0);
        createDots();
        activateDot(0);
    };
    init();

    // event handlers
    bntRight.addEventListener('click', nextSlide);
    bntLeft.addEventListener('click', previousSlide);
    // keyborard arrow keys
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') previousSlide();
        else if (e.key === 'ArrowRight') nextSlide();
    });

    // navigate with dots
    dotsContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots__dot')) {
            const slide = e.target.dataset.slide;
            goToSlide(slide);
            activateDot(slide);
        }
    });

};

slider();



// FAQ

const titles = document.querySelectorAll('.faq__title');

titles.forEach(t => t.addEventListener('click', function (e) {
    e.preventDefault();
    const faq = e.target.closest('.faq');
    const content = faq.querySelector('.faq__content');
    const img = faq.querySelector('img');

    if (content.classList.contains('d-none')) {
        content.classList.remove('d-none');
        img.setAttribute('src', 'img/minus.png');
    } else {
        content.classList.add('d-none');
        img.setAttribute('src', 'img/plus.png');
    }
}));
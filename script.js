"use strict";

const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const navListsWrapper = document.querySelector(".nav__lists");
const navLists = document.querySelectorAll(".nav__list");
const ham = document.querySelector(".hamburger");
const hamOverlay = document.querySelector(".ham__overlay");
const hero = document.querySelector(".hero");

//My Hamburger template
// requirements:
// 1. nav list (ul) contaier
// 3. an overlay empty div in html body as direct child el.

// hamburger function

const hamFunc = function (navListContnr, overlay, hamMenuState) {
    console.log(hamMenuState);

    const initHam = function () {
        // initiate hamburgerMenu
        navListContnr.classList.add("nav__toggle");
    };

    const terminateHam = function () {
        // terminate hamburgerMenu
        navListContnr.classList.remove("nav__toggle");
        overlay.style.display = "none";
    };

    ham.addEventListener("click", () => {
        // checking for Hamburger state to initiate or terminate
        if (!hamMenuState) {
            initHam(navListContnr);
            // display overlay
            overlay.style.display = "block";
        } else {
            terminateHam(navListContnr);
        }

        overlay.addEventListener("click", () => {
            terminateHam(navListContnr);

            // set hamMenuState to false
            hamMenuState = false;
        });

        // set hamburger back to default (terminate condition)
        hamMenuState = !hamMenuState;
    });

    return { terminateHam, initHam, hamMenuState };
};

let { terminateHam, initHam, hamMenuState } = hamFunc(
    navListsWrapper,
    hamOverlay,
    false
);

// scroll page into view on navLink click functionality
const navLinksScrollerFunc = function (e) {
    e.preventDefault();
    terminateHam();

    hamFunc(navListsWrapper, hamOverlay, false);

    const ListclickTarget = e.target.closest(".nav__link");
    if (!ListclickTarget) return;

    const id = ListclickTarget.getAttribute("href");
    document.querySelector(`#${id}`).scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
};

navLists.forEach(li => li.addEventListener("click", navLinksScrollerFunc));

// sticky nav functionality
const navHeight = nav.getBoundingClientRect().height;

const navSticky = new IntersectionObserver(
    function (entries) {
        const [entry] = entries;

        if (!entry.isIntersecting) {
            nav.classList.add("sticky");
            hero.style.marginTop = `${navHeight}px`;
        } else {
            nav.classList.remove("sticky");
            hero.style.marginTop = 0;

            console.log(hamMenuState);
        }
    },
    {
        root: null,
        threshold: 0,
        rootMargin: `-${navHeight}px`
    }
).observe(header);

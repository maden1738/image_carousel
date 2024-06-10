import "./style.css";

let IMG_WIDTH = document.querySelector<HTMLImageElement>(".images")!.width;
let TRANSITION_TIME = 500;
let HOLD_TIME = 5000;
let currentImageIndex = 0;

const carouselContainer = document.querySelector<HTMLDivElement>(
     ".carousel-container"
)!;
const wrapper = document.querySelector<HTMLDivElement>(
     ".carousel-image-wrapper"
)!;
const prevButton = document.querySelector<HTMLButtonElement>(".prev-button")!;
const nextButton = document.querySelector<HTMLButtonElement>(".next-button")!;
const images = document.querySelectorAll<HTMLImageElement>(".images")!;
const form = document.querySelector(".form")!;

form.addEventListener("submit", (event) => {
     event.preventDefault();
     TRANSITION_TIME = (event.target as HTMLFormElement).transition_time.value;
     wrapper.style.transition = `left ${TRANSITION_TIME}ms ease-in-out`;
     HOLD_TIME = (event.target as HTMLFormElement).hold_time.value;
});

wrapper.style.transition = `left ${TRANSITION_TIME}ms ease-in-out`;

// container that holds the navigation dots
const dotsArr: HTMLDivElement[] = [];
const dotsContainer = document.createElement("div");
dotsContainer.setAttribute(
     "style",
     "display: flex; gap: 1rem; position: absolute; left: 50%; transform: translateX(-50%); bottom: 1rem;"
);
carouselContainer.appendChild(dotsContainer);

// creating dots equal to the number of images
for (let i = 0; i < images.length; i++) {
     const dot = document.createElement("div");
     dot.setAttribute("class", "dot");
     dot.setAttribute("id", `dot-${String(i)}`);
     dot.setAttribute(
          "style",
          "width: 0.75rem; background-color: rgb(220, 211, 211); height: 0.75rem;border-radius: 50%; cursor: pointer; transition: all 0.5s ease-out"
     );
     dot.addEventListener("click", () => {
          clearInterval(intervalId); // reset slideshow timer
          slideShow();
          currentImageIndex = i;
          updateCarousel();
     });
     dotsContainer.appendChild(dot);
     dotsArr.push(dot);
}

// first dot is filled by default
const initialDot = document.getElementById("dot-0");
if (initialDot) {
     initialDot.style.background = "#994984";
     initialDot.style.scale = "1.4";
}

function updateCarousel() {
     wrapper.style.left = `${currentImageIndex * IMG_WIDTH * -1}px`;

     //updating navigation dots
     const presentDot = document.getElementById(
          `dot-${String(currentImageIndex)}`
     )!;
     dotsArr.forEach((dot) => {
          if (dot.id === presentDot.id) {
               dot.style.background = "#994984";
               dot.style.scale = "1.4";
          } else {
               dot.style.background = "#FFF";
               dot.style.scale = "1";
          }
     });
}

// slide show
let intervalId: number;
function slideShow() {
     intervalId = setInterval(() => {
          next();
     }, HOLD_TIME);
}

function prev() {
     clearInterval(intervalId); // slideshow timer is reset
     if (currentImageIndex > 0) {
          currentImageIndex--;
     } else {
          currentImageIndex = images.length - 1;
     }
     updateCarousel();
     slideShow();
}

function next() {
     clearInterval(intervalId);

     if (currentImageIndex < images.length - 1) {
          currentImageIndex++;
     } else {
          currentImageIndex = 0;
     }
     updateCarousel();
     slideShow();
}

slideShow();

//handling button clicks
nextButton.addEventListener("click", () => {
     next();
});
prevButton.addEventListener("click", () => {
     prev();
});

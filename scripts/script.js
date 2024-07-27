const slidersElements = document.querySelectorAll(
  ".app-main-content-offers-swiper"
);

slidersElements.forEach((slidersElement) => {
  let slider = slidersElement.children[1];
  console.log(slider);
  let mouseDown = false;
  let startX, scrollLeft;
  const blueSliderBar = slidersElement.children[2].children[0];
  const startDragging = (e) => {
    mouseDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  };

  const stopDragging = (e) => {
    mouseDown = false;
  };

  const move = (e) => {
    e.preventDefault();
    if (!mouseDown) {
      return;
    }
    const x = e.pageX - slider.offsetLeft;
    const scroll = x - startX;
    slider.scrollLeft = scrollLeft - scroll;

    updateBlueSliderBar();
  };

  const updateBlueSliderBar = () => {
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    const scrollRatio = slider.scrollLeft / maxScrollLeft;
    const barMaxWidth = slider.clientWidth;
    const barWidth = blueSliderBar.offsetWidth; // Width of the blue slider bar
    const barLeft = scrollRatio * (barMaxWidth - barWidth);
    blueSliderBar.style.transform = `translateX(${barLeft}px)`;
  };

  // Initial update
  updateBlueSliderBar();

  // Add the event listeners
  slider.addEventListener("mousemove", move, false);
  slider.addEventListener("mousedown", startDragging, false);
  slider.addEventListener("mouseup", stopDragging, false);
  slider.addEventListener("mouseleave", stopDragging, false);

  slider.addEventListener("scroll", updateBlueSliderBar);
});

// burger button

const burgerButton = document.querySelector(".app-header-burger");
let burgerButtonClicked = false;

burgerButton.addEventListener("click", () => {
  burgerButtonClicked = !burgerButtonClicked;
  burgerButtonClicked
    ? burgerButton.classList.add("app-header-burger-active")
    : burgerButton.classList.remove("app-header-burger-active");
});

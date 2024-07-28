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
    const barLeft = scrollRatio * (barMaxWidth - barWidth) *(maxScrollLeft > 0 ? 1 : 0);;
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
const menu = document.querySelector(".app-main-menu-container");
const menuFooter = document.querySelector(".app-footer-menu");
const main = document.querySelector(".app-main-content-container");
const footer = document.querySelector("footer");
let burgerButtonClicked = false;


burgerButton.addEventListener("click", () => {
  burgerButtonClicked = !burgerButtonClicked;
  if (burgerButtonClicked) {
    burgerButton.classList.add("app-header-burger-active");
    menu.style.display = "flex";
    menuFooter.style.display = "flex";
    main.style.display = "none";
    footer.style.display = "none";
    window.addEventListener("resize", function () {
        if (window.matchMedia("(min-width: 990px)").matches) {
          burgerButton.classList.remove("app-header-burger-active");
          menu.style.display = "none";
          menuFooter.style.display = "none";
          main.style.display = "flex";
          footer.style.display = "flex";
          burgerButtonClicked = false;
        }
      });
  } else {
    burgerButton.classList.remove("app-header-burger-active");
    menu.style.display = "none";
    menuFooter.style.display = "none";
    main.style.display = "flex";
    footer.style.display = "flex";
  }
});

document.querySelectorAll(".app-main-menu-header").forEach((header) => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;
    const icon = header.querySelector(".app-main-menu-header-icon");
    const isOpen = content.style.maxHeight;

    // Close all open menus
    document.querySelectorAll(".app-main-menu-content").forEach((item) => {
      item.style.maxHeight = null;
    });
    document.querySelectorAll(".app-main-menu-header-icon").forEach((icon) => {
      icon.classList.remove("open");
    });

    if (!isOpen) {
      content.style.maxHeight = content.scrollHeight + "px";
      icon.classList.add("open");
    }
  });
});


document.getElementById('stickyButton').addEventListener('click', function() {
    document.getElementById('expandedContent').style.display = 'block';
    document.getElementById('closeButton').style.display = 'flex';
    document.getElementById('stickyButton').style.display = 'none';
});

document.getElementById('closeButton').addEventListener('click', function() {
    document.getElementById('expandedContent').style.display = 'none';
    document.getElementById('stickyButton').style.display = 'flex';
    document.getElementById('closeButton').style.display = 'none';

});
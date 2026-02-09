import "./style.css";

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${index * 0.1}s`;
  observer.observe(element);
});

const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
    alert("Danke! Wir melden uns zeitnah bei Ihnen.");
  });
}

const modalTriggers = document.querySelectorAll("[data-modal]");
const modals = document.querySelectorAll(".modal");

const closeModal = (modal) => {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
};

const openModal = (modal) => {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
};

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const target = trigger.getAttribute("data-modal");
    const modal = document.getElementById(target);
    if (modal) {
      openModal(modal);
    }
  });
});

modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });

  const closeButton = modal.querySelector(".modal-close");
  if (closeButton) {
    closeButton.addEventListener("click", () => closeModal(modal));
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modals.forEach((modal) => closeModal(modal));
  }
});

const carousels = document.querySelectorAll("[data-carousel]");

carousels.forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const viewport = carousel.querySelector(".carousel-viewport");
  const cards = Array.from(track.children);
  let index = 0;

  const getGap = () => {
    const styles = getComputedStyle(track);
    return parseFloat(styles.columnGap || styles.gap || "0");
  };

  const getVisibleCount = (cardWidth, gap) => {
    const viewportWidth = viewport.getBoundingClientRect().width;
    return Math.max(1, Math.floor((viewportWidth + gap) / (cardWidth + gap)));
  };

  const update = () => {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = getGap();
    const visible = getVisibleCount(cardWidth, gap);
    const maxIndex = Math.max(0, cards.length - visible);
    index = Math.min(index, maxIndex);
    track.style.transform = `translateX(${-(cardWidth + gap) * index}px)`;
  };

  window.addEventListener("resize", update);
  update();
});

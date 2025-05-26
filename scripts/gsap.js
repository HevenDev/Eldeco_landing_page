document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Helper to split text into spans per letter
  function splitTextToSpans(id) {
    const el = document.getElementById(id);
    const text = el.textContent;
    el.innerHTML = "";
    text.split("").forEach((letter) => {
      const span = document.createElement("span");
      span.textContent = letter;
      span.style.color = "#aaa"; // initial gray
      el.appendChild(span);
    });
  }

  // Split heading and paragraph text
  splitTextToSpans("animate-heading");
  splitTextToSpans("animate-paragraph");

  const headingSpans = document.querySelectorAll("#animate-heading span");
  const paragraphSpans = document.querySelectorAll("#animate-paragraph span");
  const allSpans = [...headingSpans, ...paragraphSpans];

  // Text color animation linked to scroll progress (scrub: true)
  gsap.to(allSpans, {
    color: "#101214",
    ease: "none",
    stagger: 0.02,
    scrollTrigger: {
      trigger: "#image-container",
      start: "top 50%",
      end: "bottom 60%",
      scrub: true,
      once: true,
    },
  });
// =======about =======
  // Image scale animation on scroll, once only (no scrub)
  gsap.fromTo(
    "#about-image",
    { scale: 0.75 },
    {
      scale: 1,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#image-container",
        start: "top 80%",
        toggleActions: "play none none none", // play once on enter
      },
    }
  );
// ======= amenities =======
  gsap.utils.toArray(".amenity-card").forEach((card) => {
    gsap.from(card, {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none none",
        once: true,
      },
    });
  });
// ======= floor plans=======
  gsap.from("#floor-plans", {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#floor-plans",
      start: "top 85%",
      toggleActions: "play none none none",
      once: true,
    },
  });

  // Animate each floor plan card fade + slide + image zoom
  gsap.utils.toArray(".floor-item").forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: i * 0.25,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    // Image zoom inside each card
    const img = card.querySelector("img");
    gsap.fromTo(
      img,
      { scale: 1.1 },
      {
        scale: 1,
        duration: 1.2,
        delay: i * 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );
  });
// ======= Gallery gsap =======
  gsap.utils.toArray(".gallery-img").forEach((img, index) => {
    gsap.fromTo(img,
      { autoAlpha: 0, scale: 0.9 },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 1,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: img,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true
        }
      }
    );
  });
  // ========= Location ============
  gsap.from("#location-list li", {
    opacity: 0,
    x: -50,
    stagger: 0.1,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#location-list",
      start: "top 90%",
    }
  });

  // Animate the map
  gsap.from("#location-map", {
    opacity: 0,
    scale: 0.9,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#location-map",
      start: "top 90%",
    }
  });

  // ======= Contact ========
    gsap.from("#contact-img", {
    opacity: 0,
    x: -100,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#contact-img",
      start: "top 80%",
    }
  });

  // Animate form
  gsap.from("#contact-form", {
    opacity: 0,
    y: 100,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#contact-form",
      start: "top 85%",
    }
  });
  // ====== Footer =======
   gsap.from("#footer-logo", {
    opacity: 0,
    x: -50,
    duration: 1,
    scrollTrigger: {
      trigger: "#footer",
      start: "top 85%",
    },
  });

  gsap.from("#footer-links", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.2,
    scrollTrigger: {
      trigger: "#footer",
      start: "top 85%",
    },
  });

  gsap.from("#footer-contact", {
    opacity: 0,
    x: 50,
    duration: 1,
    delay: 0.4,
    scrollTrigger: {
      trigger: "#footer",
      start: "top 85%",
    },
  });

  gsap.from("#footer-cta", {
    opacity: 0,
    y: 40,
    duration: 1,
    delay: 0.6,
    scrollTrigger: {
      trigger: "#footer",
      start: "top 85%",
    },
  });


});

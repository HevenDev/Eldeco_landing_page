document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menuButton");
  const closeButton = document.getElementById("closeButton");
  const nav = document.getElementById("sideNav");
  const navLinks = document.querySelectorAll(".nav_ul li");

  // Set initial nav position off-screen
  gsap.set(nav, { x: "-100%" });

  // Timeline for menu animation
  const tl = gsap.timeline({ paused: true });

  // Animate nav in and stagger list items
  tl.to(nav, { x: "0%", duration: 0.7, ease: "power3.out" }).from(
    navLinks,
    {
      x: -30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
    },
    "-=0.4"
  );

  // Open menu
  menuButton.addEventListener("click", () => {
    tl.play();
  });

  // Close menu
  closeButton.addEventListener("click", () => {
    tl.reverse();
  });

  // Optional: Close when link clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => tl.reverse());
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // ========Popup form ========
  document.getElementById("thankYouOkayBtn").addEventListener("click", () => {
    window.location.reload();
  });
  const queryBtns = document.querySelectorAll(".query_form");
  const popupOverlay = document.getElementById("popupFormOverlay");
  const popupBox = document.getElementById("popupFormBox");
  const popupClose = document.getElementById("popupCloseBtn");

  // Function to open popup with animation
  function openPopup() {
    popupOverlay.classList.remove("hidden");
    gsap.fromTo(
      popupBox,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  }

  // Function to close popup with animation
  function closePopup() {
    gsap.to(popupBox, {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        popupOverlay.classList.add("hidden");
      },
    });
  }

  // Open popup on button click
  queryBtns.forEach((btn) => {
    btn.addEventListener("click", openPopup);
  });

  // Close popup on close button click
  popupClose.addEventListener("click", closePopup);

  // Close popup on clicking outside popup box
  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) {
      closePopup();
    }
  });

  // Show popup automatically after 7 seconds, only once per user
  window.addEventListener("load", () => {
    setTimeout(() => {
      openPopup();
    }, 7000);
  });

  const endpoint =
    "https://script.google.com/macros/s/AKfycbyhoUOhgEcRgvScZEaW-7iZdsIE1on-wW0hx8zZDbDlC9eB229FVOKry2HAfANbAfJI/exec";

  function handleFormSubmit(formId, btnId, statusId) {
    const form = document.getElementById(formId);
    const btn = document.getElementById(btnId);
    const status = document.getElementById(statusId);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const contact = form.contact.value.trim();
      const email = form.email.value.trim();

      // Validation
      if (!name || !contact || !email) {
        status.textContent = "Please fill in all required fields.";
        status.className = "text-red-600 text-sm";
        status.classList.remove("hidden");
        return;
      }

      if (!/^\d{10}$/.test(contact)) {
        status.textContent = "Please enter a valid 10-digit mobile number.";
        status.className = "text-red-600 text-sm";
        status.classList.remove("hidden");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = "Please enter a valid email address.";
        status.className = "text-red-600 text-sm";
        status.classList.remove("hidden");
        return;
      }

      // Submit
      btn.disabled = true;
      btn.textContent = "Sending...";
      status.classList.add("hidden");

      try {
        const formData = new FormData(form);
        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          status.textContent = "Your query has been submitted successfully!";
          status.className = "text-green-600 text-sm";
          status.classList.remove("hidden");
          form.reset();
          btn.textContent = "Submitted!";
          closePopup(); // Closes form popup

         window.location.href = "thankyou.html";

        } else {
          throw new Error("Form submission failed.");
        }
      } catch (error) {
        status.textContent = "Something went wrong. Please try again.";
        status.className = "text-red-600 text-sm";
        status.classList.remove("hidden");
        btn.textContent = "Try Again";
      } finally {
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent =
            formId === "contactForm" ? "Submit" : "Talk to Our Expert Now";
        }, 3000);
      }
    });
  }

  // Attach handler to both forms
  handleFormSubmit("contactForm", "contactBtn", "contactStatus");
  handleFormSubmit("expertForm", "expertBtn", "expertStatus");
});

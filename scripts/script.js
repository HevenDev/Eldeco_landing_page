document.addEventListener("DOMContentLoaded", ()=> {
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
})
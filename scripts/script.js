document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const closeMenu = document.getElementById("closeMenu");
  const navbarNav = document.getElementById("navbarNav");
  const navLinks = document.querySelectorAll(".nav-close");

  // Toggle menu when clicking the hamburger button
  menuToggle.addEventListener("click", function () {
      navbarNav.classList.add("show");
  });

  // Close menu when clicking the close button
  closeMenu.addEventListener("click", function () {
      navbarNav.classList.remove("show");
  });

  // Close menu when clicking on any nav link
  navLinks.forEach(link => {
      link.addEventListener("click", function () {
          navbarNav.classList.remove("show");
      });
  });

  // Close menu when clicking outside of it
  document.addEventListener("click", function (event) {
      if (!navbarNav.contains(event.target) && !menuToggle.contains(event.target)) {
          navbarNav.classList.remove("show");
      }
  });
});

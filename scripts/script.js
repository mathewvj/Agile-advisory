document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const closeMenu = document.getElementById("closeMenu");
    const navbarNav = document.getElementById("navbarNav");
    const navLinks = document.querySelectorAll(".nav-close");

    // Open Navbar on Click
    menuToggle.addEventListener("click", function () {
      navbarNav.classList.toggle("show");
    });

    // Close Navbar on Close Button Click
    closeMenu.addEventListener("click", function () {
      navbarNav.classList.remove("show");
    });

    // Close Navbar on Clicking a Nav Link
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navbarNav.classList.remove("show");
      });
    });
  });
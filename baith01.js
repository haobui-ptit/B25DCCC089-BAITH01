document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  const themeToggleBtn = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.setAttribute("data-theme", "dark");
    themeToggleBtn.querySelector("i").classList.replace("fa-moon", "fa-sun");
  }

  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.body.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.body.removeAttribute("data-theme");
      themeToggleBtn.querySelector("i").classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "light");
    } else {
      document.body.setAttribute("data-theme", "dark");
      themeToggleBtn.querySelector("i").classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "dark");
    }
  });

  const menuBtn = document.getElementById("menu-btn");
  const navMenu = document.getElementById("nav-menu");

  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });
  const searchInput = document.getElementById("project-search");
  const tagButtons = document.querySelectorAll(".tag-btn");
  const projectCards = document.querySelectorAll(".project-card");
  let activeTag = "all";

  function filterProjects() {
    const query = searchInput.value.toLowerCase().trim();

    projectCards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const desc = card.querySelector("p").textContent.toLowerCase();
      const tags = card.getAttribute("data-tags");

      const matchesSearch = title.includes(query) || desc.includes(query);
      const matchesTag = activeTag === "all" || tags.includes(activeTag);

      if (matchesSearch && matchesTag) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }

  searchInput.addEventListener("input", filterProjects);

  tagButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tagButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeTag = btn.getAttribute("data-tag");
      filterProjects();
    });
  });

  const messageInput = document.getElementById("message");
  const charCount = document.getElementById("char-count");

  messageInput.addEventListener("input", () => {
    charCount.textContent = messageInput.value.length;
  });
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const successMsg = document.getElementById("form-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

   
    document.querySelectorAll(".error-msg").forEach((el) => (el.textContent = ""));
    successMsg.style.display = "none";

  
    if (nameInput.value.trim().length < 3) {
      document.getElementById("name-error").textContent = "Họ tên phải có ít nhất 3 ký tự.";
      isValid = false;
    }

  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      document.getElementById("email-error").textContent = "Địa chỉ email không đúng định dạng.";
      isValid = false;
    }

  
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(phoneInput.value.trim())) {
      document.getElementById("phone-error").textContent = "Số điện thoại không hợp lệ (10 chữ số).";
      isValid = false;
    }

    // Validate Lời nhắn (>= 10 ký tự)
    if (messageInput.value.trim().length < 10) {
      document.getElementById("message-error").textContent = "Lời nhắn phải có tối thiểu 10 ký tự.";
      isValid = false;
    }

    // Nếu hợp lệ
    if (isValid) {
      successMsg.style.display = "block";
      form.reset();
      charCount.textContent = "0";
    }
  });
});
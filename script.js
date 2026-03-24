// CodeBhumi Main Script

document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle Logic
  const themeToggleParam = document.getElementById("theme-toggle");
  const htmlEl = document.documentElement;
  if(themeToggleParam) {
    const icon = themeToggleParam.querySelector("i");
    
    // Check local storage for theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      htmlEl.setAttribute("data-theme", savedTheme);
      icon.className = savedTheme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    } else {
      htmlEl.setAttribute("data-theme", "dark");
      icon.className = "fa-solid fa-sun";
    }

    themeToggleParam.addEventListener("click", () => {
      const currentTheme = htmlEl.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      
      htmlEl.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      
      icon.className = newTheme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    });
  }

  // 1. Sticky Navbar
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navBtn = document.querySelector(".nav-btn");
  
  mobileToggle.addEventListener("click", () => {
    // Basic toggle logic (would need more CSS to perfectly animate a dropdown)
    if (navLinks.style.display === "flex") {
      navLinks.style.display = "none";
      navBtn.style.display = "none";
    } else {
      navLinks.style.display = "flex";
      navLinks.style.flexDirection = "column";
      navLinks.style.position = "absolute";
      navLinks.style.top = "70px";
      navLinks.style.left = "0";
      navLinks.style.width = "100%";
      navLinks.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--nav-bg').trim() || "rgba(15, 23, 42, 0.95)";
      navLinks.style.padding = "2rem 0";
      navBtn.style.display = "inline-block";
      navBtn.style.margin = "1rem auto";
    }
  });

  // Reset mobile menu styles on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      navLinks.style.display = "flex";
      navLinks.style.flexDirection = "row";
      navLinks.style.position = "static";
      navLinks.style.backgroundColor = "transparent";
      navLinks.style.padding = "0";
      navBtn.style.display = "inline-block";
      navBtn.style.margin = "0";
    } else {
      navLinks.style.display = "none";
      navBtn.style.display = "none";
    }
  });

  // 3. Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Collapse mobile menu if open
        if (window.innerWidth <= 900) {
          navLinks.style.display = "none";
          navBtn.style.display = "none";
        }
      }
    });
  });

  // 4. Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.about-card, .item-card, .event-card, .trait-badge');
  
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    });
  }, revealOptions);

  revealElements.forEach(el => {
    el.classList.add('reveal-hidden');
    revealObserver.observe(el);
  });

  // 5. Tech Grid Background Canvas Animation (Hero Section)
  const canvas = document.getElementById('tech-grid');
  if(canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    
    // Set canvas dimensions
    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particles
    const particles = [];
    const particleCount = Math.min(Math.floor(width * height / 15000), 100);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'dark' 
          ? 'rgba(16, 185, 129, 0.5)' 
          : 'rgba(16, 185, 129, 0.2)'; // Greenish tint
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            const alpha = 0.2 - dist/750;
            ctx.strokeStyle = document.documentElement.getAttribute('data-theme') === 'dark' 
              ? `rgba(59, 130, 246, ${alpha})`
              : `rgba(16, 185, 129, ${alpha * 0.5})`; // Blueish/Greenish connections
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }
    
    animate();
  }

  // 6. Typewriter Effect
  const phrases = ["Igniting Technology & Innovation", "Building the Future of Tech", "Empowering Student Developers"];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterElement = document.getElementById("typewriter");
  
  function typeWriter() {
    if(!typewriterElement) return;
    
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }
    
    typewriterElement.textContent = currentPhrase.substring(0, charIndex);
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500; // Pause before typing next
    }
    
    setTimeout(typeWriter, typeSpeed);
  }
  
  if(typewriterElement) {
    setTimeout(typeWriter, 1000);
  }

  // 7. Parallax effect on Hero Content
  const heroContent = document.getElementById("hero-content");
  if(heroContent) {
    document.addEventListener("mousemove", (e) => {
      const x = (window.innerWidth / 2 - e.pageX) / 50;
      const y = (window.innerHeight / 2 - e.pageY) / 50;
      heroContent.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
});

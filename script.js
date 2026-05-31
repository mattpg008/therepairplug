// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.count);
    const duration = 2000; // 2 seconds
    const start = Date.now();
    
    function updateCount() {
      const now = Date.now();
      const progress = Math.min((now - start) / duration, 1);
      const current = Math.floor(progress * target);
      
      counter.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target.toLocaleString();
      }
    }
    
    updateCount();
  });
}

// Intersection Observer for lazy animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.hasAttribute('data-count')) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    }
  });
}, observerOptions);

// Watch counters
document.querySelectorAll('[data-count]').forEach(counter => {
  observer.observe(counter);
});

// Quote Form Calculator
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  const serviceType = document.getElementById('serviceType');
  const urgency = document.getElementById('urgency');
  const projectSize = document.getElementById('projectSize');
  const quoteOutput = document.getElementById('quoteOutput');
  const quoteTextLink = document.getElementById('quoteTextLink');
  
  function calculateQuote() {
    const base = parseFloat(serviceType.value);
    const urgencyMultiplier = parseFloat(urgency.value);
    const sizeMultiplier = parseFloat(projectSize.value);
    
    const low = Math.round(base * urgencyMultiplier * sizeMultiplier);
    const high = Math.round(low * 1.5);
    
    quoteOutput.textContent = `$${low}-$${high}`;
    
    const message = `Hi The Repair Plug, I'd like a quote for: ${serviceType.options[serviceType.selectedIndex].text}. Estimate: $${low}-$${high}`;
    quoteTextLink.href = `sms:+13146436788?body=${encodeURIComponent(message)}`;
  }
  
  serviceType.addEventListener('change', calculateQuote);
  urgency.addEventListener('change', calculateQuote);
  projectSize.addEventListener('change', calculateQuote);
}

// House Zone Interactivity
const houseZones = document.querySelectorAll('[data-house-info]');
const houseTitle = document.getElementById('houseTitle');
const houseInfo = document.getElementById('houseInfo');

houseZones.forEach(zone => {
  zone.addEventListener('mouseenter', () => {
    houseTitle.textContent = zone.textContent;
    houseInfo.textContent = zone.dataset.houseInfo;
    zone.style.opacity = '0.8';
  });
  
  zone.addEventListener('mouseleave', () => {
    houseTitle.textContent = 'Hover a house zone';
    houseInfo.textContent = 'Roof, kitchen, bathroom, and garage hotspots reveal the services The Repair Plug can handle.';
    zone.style.opacity = '1';
  });
});

// Touch support for mobile
houseZones.forEach(zone => {
  zone.addEventListener('touchstart', () => {
    houseTitle.textContent = zone.textContent;
    houseInfo.textContent = zone.dataset.houseInfo;
  });
});

// Emergency Modal
const emergencyModal = document.querySelector('.emergency-modal');
const emergencyOpen = document.querySelector('.emergency-open');
const emergencyClose = document.querySelector('[data-close-emergency]');

if (emergencyOpen) {
  emergencyOpen.addEventListener('click', () => {
    emergencyModal.setAttribute('aria-hidden', 'false');
  });
}

if (emergencyClose) {
  emergencyClose.addEventListener('click', () => {
    emergencyModal.setAttribute('aria-hidden', 'true');
  });
}

// Close modal on outside click
if (emergencyModal) {
  emergencyModal.addEventListener('click', (e) => {
    if (e.target === emergencyModal) {
      emergencyModal.setAttribute('aria-hidden', 'true');
    }
  });
}

// Booking Form Text Link Generation
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  const bookingTextLink = document.getElementById('bookingTextLink');
  const calendarBookingLink = document.getElementById('calendarBookingLink');
  
  bookingForm.addEventListener('change', () => {
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const zip = document.getElementById('customerZip').value;
    const service = document.getElementById('bookingService').value;
    const time = document.getElementById('preferredTime').value;
    const details = document.getElementById('jobDetails').value;
    
    const message = `Hi The Repair Plug, I'd like to book a repair.\n\nName: ${name}\nPhone: ${phone}\nZIP: ${zip}\nService: ${service}\nPreferred Time: ${time}\n\nDetails: ${details}`;
    
    bookingTextLink.href = `sms:+13146436788?body=${encodeURIComponent(message)}`;
  });
}

// Fit text for dynamic content
function fitText() {
  const fitTextElements = document.querySelectorAll('.fit-text');
  fitTextElements.forEach(el => {
    let fontSize = 2;
    el.style.fontSize = fontSize + 'rem';
    
    while (el.scrollWidth > el.offsetWidth && fontSize > 0.5) {
      fontSize -= 0.1;
      el.style.fontSize = fontSize + 'rem';
    }
  });
}

// Run fit text on load and resize
window.addEventListener('load', fitText);
window.addEventListener('resize', fitText);

// Response time ticker (simulates live updates)
const responseTimeEl = document.getElementById('responseTime');
if (responseTimeEl) {
  setInterval(() => {
    const currentTime = parseInt(responseTimeEl.textContent);
    const variance = Math.floor(Math.random() * 5) - 2;
    const newTime = Math.max(5, currentTime + variance);
    responseTimeEl.textContent = newTime;
  }, 5000);
}

// Job ticker scroll
const jobTicker = document.querySelector('.job-ticker');
if (jobTicker) {
  let scrollPosition = 0;
  
  setInterval(() => {
    const firstJob = jobTicker.querySelector('span');
    if (firstJob) {
      const clone = firstJob.cloneNode(true);
      jobTicker.appendChild(clone);
      firstJob.remove();
    }
  }, 4000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Cursor tool (optional - creates custom cursor effect)
const cursorTool = document.querySelector('.cursor-tool');
if (cursorTool) {
  document.addEventListener('mousemove', (e) => {
    cursorTool.style.left = e.clientX + 'px';
    cursorTool.style.top = e.clientY + 'px';
  });
}

// Sparks canvas animation (optional)
const canvas = document.getElementById('sparks');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  fitText();
});

// Add active state to navigation links
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

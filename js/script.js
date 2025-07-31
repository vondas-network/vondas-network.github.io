/*AOS.init({
    duration: 1000,
    once: true
  });*/

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navItems = navLinks.querySelectorAll('a');

// Toggle menu open/close
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

function scrollWithOffset(targetId) {
    const isMobile = window.innerWidth <= 768;
    const headerOffset = isMobile ? 250 : 50; // Increase for mobile
    const target = document.getElementById(targetId);
    if (!target) return;

    const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: y,
        behavior: 'smooth'
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollWithOffset(targetId);

        // Close mobile nav
        if (navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
        }
    });
});

window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) {
        const id = hash.substring(1);
        setTimeout(() => {
            scrollWithOffset(id);
        }, 100);
    }
});


document.querySelectorAll('.value-list li').forEach(card => {
    const isTouchDevice = ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    if (!isTouchDevice) {
        // Desktop hover flip: flip on mouseenter, flip back on mouseleave
        card.addEventListener('mouseenter', () => {
            card.classList.add('flipped');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('flipped');
        });
    } else {
        // Mobile tap toggle flip
        let flipTimeout;

        card.addEventListener('click', () => {
            if (card.classList.contains('flipped')) {
                card.classList.remove('flipped');
                clearTimeout(flipTimeout);
            } else {
                card.classList.add('flipped');

                // Auto flip back after 15 seconds
                flipTimeout = setTimeout(() => {
                    card.classList.remove('flipped');
                }, 15000);
            }
        });
    }
});

fetch('./data/datafile.json')
    .then(response => response.json())
    .then(data => {
        const gallery = document.getElementById('projectGallery');

        data.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';

            card.innerHTML = `
        <a class="projCardText" href="${project.link || '#'}" target="_blank">
          <h4>${project.title}</h4>
          <p>${project.tagline}</p>
          <br>
          <img src="${project.image}" alt="${project.title}">
        </a>
      `;

            gallery.appendChild(card);
        });
    });



console.log(`
 /\\_/\\  
( o.o ) 
 > ^ <       hi.

`);
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll reveal animations
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Accordion Logic
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Stat Counter Animation
    const animateStats = () => {
        document.querySelectorAll('.stat-number').forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const count = +stat.innerText.replace(/[^0-9]/g, '');
            const increment = target / 100;

            if (count < target) {
                const newValue = Math.ceil(count + increment);
                if (stat.innerText.includes('₹')) {
                    stat.innerText = `₹${newValue.toLocaleString()}`;
                } else if (stat.innerText.includes('%') || stat.getAttribute('data-target') === "100") {
                   stat.innerText = `${newValue}%`;
                } else {
                    stat.innerText = newValue;
                }
                setTimeout(animateStats, 20);
            } else {
                if (stat.innerText.includes('₹')) {
                    stat.innerText = `₹${target.toLocaleString()}`;
                } else if (stat.getAttribute('data-target') === "100") {
                    stat.innerText = `100%`;
                } else {
                    stat.innerText = target;
                }
            }
        });
    };

    // Trigger stat animation when impact section is in view
    const impactSection = document.querySelector('#impact');
    const impactObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateStats();
            impactObserver.unobserve(impactSection);
        }
    }, { threshold: 0.5 });

    if (impactSection) impactObserver.observe(impactSection);

    // Ecosystem Tag Highlight
    document.querySelectorAll('.eco-tag').forEach(tag => {
        tag.addEventListener('mouseover', () => {
            document.querySelector('.ecosystem-map img').style.filter = 'drop-shadow(0 0 60px rgba(247, 255, 152, 0.4)) scale(1.02)';
        });
        tag.addEventListener('mouseout', () => {
            document.querySelector('.ecosystem-map img').style.filter = 'drop-shadow(0 0 40px rgba(247, 255, 152, 0.2))';
        });
    });

    // Simple interaction: Button scale effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'scale(0.95)';
        });
        btn.addEventListener('mouseup', () => {
            btn.style.transform = '';
        });
    });
});

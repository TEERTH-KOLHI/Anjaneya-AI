document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll reveal animations
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
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
            const isActive = item.classList.contains('is-open');

            // Close all items
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('is-open'));

            if (!isActive) {
                item.classList.add('is-open');
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

    // 8. Mobile Menu Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isOpen = navLinks.classList.contains('active');
            menuToggle.innerHTML = isOpen ? '<i class="ri-close-line"></i>' : '<i class="ri-menu-line"></i>';
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="ri-menu-line"></i>';
            });
        });
    }

    // Dynamic Rainbow Background
    const rainbowContainer = document.querySelector('.rainbow-container');
    if (rainbowContainer) {
        const barCount = 25;
        const animationTime = 45;
        const palette = [
            ['#e879f9', '#60a5fa', '#94e2d2'],
            ['#e879f9', '#94e2d2', '#60a5fa'],
            ['#94e2d2', '#e879f9', '#60a5fa'],
            ['#94e2d2', '#60a5fa', '#e879f9'],
            ['#60a5fa', '#94e2d2', '#e879f9'],
            ['#60a5fa', '#e879f9', '#94e2d2']
        ];

        for (let i = 1; i <= barCount; i++) {
            const bar = document.createElement('div');
            bar.className = 'rainbow';
            const colors = palette[Math.floor(Math.random() * palette.length)];
            const duration = animationTime - (animationTime / barCount / 2) * i;
            const delay = -(i / barCount) * animationTime;

            bar.style.boxShadow = `
                -130px 0 80px 40px white,
                -50px 0 50px 25px ${colors[0]},
                0 0 50px 25px ${colors[1]},
                50px 0 50px 25px ${colors[2]},
                130px 0 80px 40px white
            `;
            bar.style.animationDuration = `${duration}s`;
            bar.style.animationDelay = `${delay}s`;
            rainbowContainer.appendChild(bar);
        }
    }
    // Link Ecosystem Animation (Authority Flow)
    const initAuthoritySurge = () => {
        const canvas = document.getElementById('authority-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const container = canvas.parentElement;
        const fill = container.querySelector('.meter-fill');
        const marker = container.querySelector('.meter-marker');

        let width, height, time = 0;
        let mainNode, satellites = [], particles = [];

        const resize = () => {
            width = canvas.width = container.offsetWidth;
            height = canvas.height = container.offsetHeight;
            initScene();
        };

        class Node {
            constructor(x, y, radius, label, isMain = false) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.label = label;
                this.isMain = isMain;
                this.pulse = 0;
            }
            draw() {
                this.pulse += 0.05;
                const p = Math.sin(this.pulse) * 5;
                
                // Glow
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius + 15 + p, 0, Math.PI * 2);
                ctx.fillStyle = this.isMain ? 'rgba(247, 255, 152, 0.15)' : 'rgba(255, 255, 255, 0.05)';
                ctx.fill();

                // Core
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius + p * 0.5, 0, Math.PI * 2);
                ctx.fillStyle = this.isMain ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.8)';
                ctx.fill();

                // Label
                ctx.fillStyle = 'white';
                ctx.font = `bold ${this.isMain ? '14px' : '10px'} Inter, sans-serif`;
                ctx.textAlign = 'center';
                ctx.fillText(this.label, this.x, this.y + this.radius + 20);
            }
        }

        class Particle {
            constructor(startNode, endNode) {
                this.start = startNode;
                this.end = endNode;
                this.progress = Math.random();
                this.speed = 0.005 + Math.random() * 0.01;
            }
            update() {
                this.progress += this.speed;
                if (this.progress > 1) {
                    this.progress = 0;
                    if (this.end.isMain) {
                        this.end.pulse += 0.5; // Pulse the main node on hit
                    }
                }
            }
            draw() {
                const x = this.start.x + (this.end.x - this.start.x) * this.progress;
                const y = this.start.y + (this.end.y - this.start.y) * this.progress;

                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fillStyle = 'var(--primary-color)';
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'var(--primary-color)';
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        const initScene = () => {
            satellites = [];
            particles = [];
            mainNode = new Node(width / 2, height / 2, 25, "Your Website", true);

            const labels = ["Forbes PR", "Tech Journal", "DA 60+ Blog", "Wiki Link", "High-DA Guest Post"];
            const count = labels.length;
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2;
                const dist = Math.min(width, height) * 0.35;
                const x = width / 2 + Math.cos(angle) * dist;
                const y = height / 2 + Math.sin(angle) * dist;
                const sat = new Node(x, y, 8, labels[i]);
                satellites.push(sat);
                
                // Add particles for each link
                for(let j = 0; j < 3; j++) {
                    particles.push(new Particle(sat, mainNode));
                }
            }
        };

        const animate = () => {
            time += 0.02;
            ctx.clearRect(0, 0, width, height);

            // 1. Draw Background Connections
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.setLineDash([5, 5]);
            satellites.forEach(sat => {
                ctx.beginPath();
                ctx.moveTo(sat.x, sat.y);
                ctx.lineTo(mainNode.x, mainNode.y);
                ctx.stroke();
            });
            ctx.setLineDash([]);

            // 2. Draw Particles (Energy Flow)
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // 3. Draw Nodes
            satellites.forEach(sat => sat.draw());
            mainNode.draw();

            // 4. Update UI Meter (Simulate Rank Rise)
            if(fill && marker) {
                const pos = 70 + Math.sin(time) * 10;
                fill.style.width = `${pos}%`;
                marker.style.right = `${100 - pos}%`;
                marker.innerText = Math.max(1, Math.floor(11 - (pos/10)));
            }

            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        animate();
    };

    initAuthoritySurge();

    // Hero Video Switcher Logic
    const initVideoSwitcher = () => {
        const pillButtonOnText = document.querySelector('.pill-button-selection_on');
        const pillButtonOffText = document.querySelector('.pill-button-selection_off');
        const pillButtonHighlight = document.querySelector('.pill-button-highlight');
        const pillButtonInput = document.querySelector('.pill-button-input');
        const pillSelections = document.querySelectorAll('.pill-button-selection');
        const videoContainers = document.querySelectorAll('.hero-video-overlay .video-container');

        if (!pillButtonOnText || !pillButtonHighlight) return;

        const updateHighlight = (el) => {
            pillButtonHighlight.style.width = el.offsetWidth + 'px';
            pillButtonHighlight.style.left = el.offsetLeft + 'px';
        };

        // Initial Cold Start - using small timeout to ensure layout is ready
        setTimeout(() => {
            const activeInitial = document.querySelector('.pill-button-selection_active');
            if (activeInitial) updateHighlight(activeInitial);
        }, 100);

        pillSelections.forEach(btn => {
            btn.addEventListener('click', () => {
                if (!btn.classList.contains('pill-button-selection_active')) {
                    pillSelections.forEach(s => s.classList.remove('pill-button-selection_active'));
                    btn.classList.add('pill-button-selection_active');

                    const videoId = btn.getAttribute('data-video');

                    if (btn.classList.contains('pill-button-selection_off') && pillButtonInput) {
                        pillButtonInput.checked = false;
                        updateHighlight(btn);
                    } else if (pillButtonInput) {
                        pillButtonInput.checked = true;
                        updateHighlight(btn);
                    }

                    // Switch Video Container
                    videoContainers.forEach(container => {
                        const video = container.querySelector('video');
                        container.classList.remove('active');
                        if (container.id === `video-${videoId}`) {
                            container.classList.add('active');
                            if (video) video.play();
                        } else {
                            if (video) video.pause();
                        }
                    });
                }
            });
        });

        // Handle resize to keep highlight aligned
        window.addEventListener('resize', () => {
            const active = document.querySelector('.pill-button-selection_active');
            if (active) updateHighlight(active);
        });
    };

    const initVideoControls = () => {
        const containers = document.querySelectorAll('.video-container');
        const overlay = document.querySelector('.hero-video-overlay');
        const backdrop = document.querySelector('.video-overlay-backdrop');

        containers.forEach(container => {
            const video = container.querySelector('video');
            const playPauseBtn = container.querySelector('.play-pause');
            const volumeBtn = container.querySelector('.volume-toggle');
            const resizeBtn = container.querySelector('.resize-btn');
            const progressBar = container.querySelector('.progress-bar');
            const progressContainer = container.querySelector('.progress-container');

            if (!video || !playPauseBtn || !volumeBtn || !progressBar || !progressContainer) return;

            // Play/Pause
            playPauseBtn.addEventListener('click', () => {
                if (video.paused) {
                    video.volume = 1.0; // Ensure volume is full
                    video.play();
                    playPauseBtn.innerHTML = '<i class="ri-pause-fill"></i>';
                } else {
                    video.pause();
                    playPauseBtn.innerHTML = '<i class="ri-play-fill"></i>';
                }
            });

            // Volume Toggle
            volumeBtn.addEventListener('click', () => {
                video.muted = !video.muted;
                if (!video.muted) video.volume = 1.0; // Set to full volume when unmuted
                volumeBtn.innerHTML = video.muted ? '<i class="ri-volume-mute-fill"></i>' : '<i class="ri-volume-up-fill"></i>';
            });

            // Resize Toggle (Expand/Contract)
            if (resizeBtn && overlay && backdrop) {
                resizeBtn.addEventListener('click', () => {
                    const isExpanded = overlay.classList.contains('is-expanded');
                    
                    if (!isExpanded) {
                        overlay.classList.add('is-expanded');
                        backdrop.classList.add('active');
                        resizeBtn.innerHTML = '<i class="ri-close-line"></i>';
                        document.body.style.overflow = 'hidden'; 
                        
                        // Move to root for perfect centering
                        document.body.insertBefore(overlay, backdrop);
                        
                        setTimeout(() => {
                            video.play();
                        }, 50);
                    } else {
                        contractVideo(container);
                    }
                });
            }

            function contractVideo(targetContainer) {
                overlay.classList.remove('is-expanded');
                backdrop.classList.remove('active');
                const btn = targetContainer.querySelector('.resize-btn');
                if (btn) btn.innerHTML = '<i class="ri-aspect-ratio-line"></i>';
                document.body.style.overflow = '';
                
                // Move back to hero content
                const heroContent = document.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.appendChild(overlay);
                }
                
                setTimeout(() => {
                    video.play();
                }, 50);
            }

            // Close when clicking backdrop
            if (backdrop) {
                backdrop.onclick = () => {
                    if (overlay.classList.contains('is-expanded')) {
                        contractVideo(container);
                    }
                };
            }

            // Progress Update
            video.addEventListener('timeupdate', () => {
                const progress = (video.currentTime / video.duration) * 100;
                progressBar.style.width = `${progress}%`;
            });

            // Seek
            progressContainer.addEventListener('click', (e) => {
                const rect = progressContainer.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                video.currentTime = pos * video.duration;
            });
            
            // Sync play/pause icon initially
            video.addEventListener('play', () => {
                playPauseBtn.innerHTML = '<i class="ri-pause-fill"></i>';
            });
            video.addEventListener('pause', () => {
                playPauseBtn.innerHTML = '<i class="ri-play-fill"></i>';
            });
        });
    };

    initVideoSwitcher();
    initVideoControls();
});

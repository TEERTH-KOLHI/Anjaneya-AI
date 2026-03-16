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
    // Authority Surge Canvas Animation (Iteration 2)
    const initAuthoritySurge = () => {
        const canvas = document.getElementById('authority-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const container = canvas.parentElement;
        const fill = container.querySelector('.meter-fill');
        const marker = container.querySelector('.meter-marker');
        
        let width, height, time = 0;
        let results = [];
        let ribbons = [];

        const resize = () => {
            width = canvas.width = container.offsetWidth;
            height = canvas.height = container.offsetHeight;
            initScene();
        };

        const initScene = () => {
            results = [];
            const count = 5;
            for(let i = 0; i < count; i++) {
                results.push({
                    y: height * 0.2 + (i * height * 0.15),
                    width: width * 0.6,
                    height: 40,
                    opacity: 0.1 + (i * 0.05),
                    isHero: i === 2 // Assume index 2 is the rising one
                });
            }
        };

        class Ribbon {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() < 0.5 ? -50 : width + 50;
                this.y = height * Math.random();
                this.cp1x = width * Math.random();
                this.cp1y = height * Math.random();
                this.cp2x = width * Math.random();
                this.cp2y = height * Math.random();
                this.targetX = width / 2;
                this.targetY = height * 0.4;
                this.progress = 0;
                this.speed = 0.005 + Math.random() * 0.01;
                this.color = `hsla(${190 + Math.random() * 60}, 100%, 70%, ${0.2 + Math.random() * 0.3})`;
            }
            update() {
                this.progress += this.speed;
                if(this.progress >= 1) this.reset();
            }
            draw() {
                const t = this.progress;
                const invT = 1 - t;
                // Cubic Bezier calculation
                const x = invT**3 * this.x + 3 * invT**2 * t * this.cp1x + 3 * invT * t**2 * this.cp2x + t**3 * this.targetX;
                const y = invT**3 * this.y + 3 * invT**2 * t * this.cp1y + 3 * invT * t**2 * this.cp2y + t**3 * this.targetY;

                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.bezierCurveTo(this.cp1x, this.cp1y, this.cp2x, this.cp2y, x, y);
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 1;
                ctx.stroke();

                // Head glow
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        for(let i = 0; i < 15; i++) ribbons.push(new Ribbon());

        const animate = () => {
            time += 0.01;
            ctx.clearRect(0, 0, width, height);

            // 1. Draw Background Grid
            ctx.strokeStyle = 'rgba(255,255,255,0.03)';
            ctx.lineWidth = 1;
            for(let i = 0; i < width; i += 40) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, height);
                ctx.stroke();
            }
            for(let i = 0; i < height; i += 40) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(width, i);
                ctx.stroke();
            }

            // 2. Rising Effect Logic
            const elevation = Math.sin(time * 0.5) * 20;
            const heroY = height * 0.4 + elevation;

            // 3. Draw Ribbons
            ribbons.forEach(r => {
                r.targetY = heroY;
                r.update();
                r.draw();
            });

            // 4. Draw SERP Results
            results.forEach(res => {
                let y = res.y;
                if(res.isHero) {
                    y = heroY;
                    ctx.fillStyle = `rgba(247, 255, 152, 0.1)`;
                    ctx.strokeStyle = `var(--primary-color)`;
                    ctx.lineWidth = 2;
                    // Hero Glow
                    ctx.shadowBlur = 30;
                    ctx.shadowColor = 'rgba(247, 255, 152, 0.3)';
                } else {
                    ctx.fillStyle = `rgba(255, 255, 255, ${res.opacity})`;
                    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                    ctx.lineWidth = 1;
                }

                const rx = (width - res.width) / 2;
                ctx.beginPath();
                ctx.roundRect(rx, y, res.width, res.height, 8);
                ctx.fill();
                ctx.stroke();
                ctx.shadowBlur = 0;

                // Skeleton lines inside
                ctx.fillStyle = res.isHero ? 'rgba(247, 255, 152, 0.3)' : 'rgba(255,255,255,0.05)';
                ctx.fillRect(rx + 20, y + 15, res.width * 0.4, 4);
                ctx.fillRect(rx + 20, y + 25, res.width * 0.2, 4);
            });

            // 5. Update UI Meter
            if(fill && marker) {
                const pos = 90 - (elevation + 20); // Mapping elevation to position
                fill.style.width = `${pos}%`;
                marker.style.right = `${100 - pos}%`;
                marker.innerText = Math.max(1, Math.floor(10 - (pos/10)));
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
        const pillButtons = document.querySelectorAll('.pill-btn');
        const videoContainers = document.querySelectorAll('.hero-video-overlay .video-container');

        if (!pillButtons.length || !videoContainers.length) return;

        pillButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const videoId = btn.getAttribute('data-video');

                // Update Buttons
                pillButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update Video Containers
                videoContainers.forEach(container => {
                    const video = container.querySelector('video');
                    container.classList.remove('active');
                    if (container.id === `video-${videoId}`) {
                        container.classList.add('active');
                        // Ensure the new active video plays if it's the expected behavior
                    } else {
                        // Pause the inactive video
                        if (video) video.pause();
                    }
                });
            });
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

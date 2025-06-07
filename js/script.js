document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // Direct button handlers for the hero section buttons
    const skillsButton = document.querySelector('.hero-buttons .primary-btn');
    const contactButton = document.querySelector('.hero-buttons .secondary-btn');
    
    if (skillsButton) {
        console.log('Skills button found:', skillsButton);
        skillsButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scrollToSection(targetId);
        });
    } else {
        console.log('Skills button not found');
    }
    
    if (contactButton) {
        console.log('Contact button found:', contactButton);
        contactButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scrollToSection(targetId);
        });
    } else {
        console.log('Contact button not found');
    }
    
    // Function to handle scrolling to sections
    function scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            console.log('Scrolling to:', targetId);
            const offsetTop = targetElement.offsetTop;
            
            // Check if we're in mobile view (no sidebar)
            const isMobile = window.matchMedia('(max-width: 768px)').matches;
            const headerHeight = isMobile ? document.querySelector('header').offsetHeight : 0;
            
            window.scrollTo({
                top: offsetTop - headerHeight,
                behavior: 'smooth'
            });
            
            // Update active nav item
            const navLinks = document.querySelectorAll('nav a');
            navLinks.forEach(item => item.classList.remove('active'));
            
            const correspondingNavLink = document.querySelector(`nav a[href="${targetId}"]`);
            if (correspondingNavLink) {
                correspondingNavLink.classList.add('active');
            }
        } else {
            console.log('Target section not found:', targetId);
        }
    }
    
    // Sidebar toggle functionality
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const body = document.body;
    
    // Check if the sidebar was closed in a previous session
    const sidebarState = localStorage.getItem('sidebarState');
    if (sidebarState === 'closed') {
        body.classList.add('sidebar-closed');
    }
    
    sidebarToggle.addEventListener('click', function() {
        body.classList.toggle('sidebar-closed');
        
        // Save the state to localStorage
        if (body.classList.contains('sidebar-closed')) {
            localStorage.setItem('sidebarState', 'closed');
        } else {
            localStorage.setItem('sidebarState', 'open');
        }
    });
    
    // Gestion du formulaire de contact
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animation de chargement
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Envoi en cours...';
            button.disabled = true;
            
            // Simuler un délai d'envoi (remplacer par un vrai envoi AJAX dans un environnement de production)
            setTimeout(() => {
                formMessage.textContent = 'Merci pour votre message ! Je vous répondrai dès que possible.';
                formMessage.style.opacity = '0';
                formMessage.style.display = 'block';
                
                // Fade in animation
                setTimeout(() => {
                    formMessage.style.transition = 'opacity 0.5s ease';
                    formMessage.style.opacity = '1';
                }, 10);
                
                form.reset();
                button.textContent = originalText;
                button.disabled = false;
            }, 1500);
        });
    }
    
    // Fix navigation buttons
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                scrollToSection(targetId);
            }
        });
    });
    
    // Détecter la section active lors du défilement
    const sections = document.querySelectorAll('section[id]');
    
    function setActiveNavItem() {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const headerHeight = isMobile ? document.querySelector('header').offsetHeight : 0;
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - headerHeight - 20 && window.scrollY < sectionTop + sectionHeight - headerHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavItem);
    window.addEventListener('load', setActiveNavItem);
    
    // Animation d'apparition des éléments au défilement
    const fadeInElements = document.querySelectorAll('.project-card:not(.hidden-project), .skill-category, .about-content');
    
    const fadeInOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeInElements.forEach(element => {
        element.classList.add('fade-in-element');
        fadeInObserver.observe(element);
    });

    // Afficher plus/moins de projets
    const showMoreBtn = document.getElementById('show-more-btn');
    const showLessBtn = document.getElementById('show-less-btn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    
    if (showMoreBtn && showLessBtn && hiddenProjects.length > 0) {
        showMoreBtn.addEventListener('click', function() {
            hiddenProjects.forEach((project, index) => {
                project.style.display = 'block';
                project.style.opacity = '0';
                
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'translateY(0)';
                }, index * 100);
            });
            
            showMoreBtn.style.display = 'none';
            showLessBtn.style.display = 'block';
        });

        showLessBtn.addEventListener('click', function() {
            hiddenProjects.forEach((project) => {
                project.style.opacity = '0';
                project.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            });
            
            showLessBtn.style.display = 'none';
            showMoreBtn.style.display = 'block';
        });
    }

    // Project Filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(',');
                
                if (filter === 'all') {
                    // Pour le filtre "all", on affiche seulement les 3 premiers projets
                    if (card.classList.contains('hidden-project')) {
                        card.style.display = 'none';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                    } else {
                        card.style.display = 'block';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }
                    
                    if (showMoreBtn) showMoreBtn.style.display = 'block';
                } else {
                    // Pour les autres filtres, on vérifie si la catégorie est présente
                    if (categories.includes(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                    
                    if (showMoreBtn) showMoreBtn.style.display = 'none';
                }
            });
        });
    });
    
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const timelineObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                timelineObserver.unobserve(entry.target);
            }
        });
    }, timelineOptions);
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.6s ease';
        timelineObserver.observe(item);
    });
});
document.addEventListener('DOMContentLoaded', function() {
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
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop;
                    const headerHeight = document.querySelector('header').offsetHeight;
                    
                    window.scrollTo({
                        top: offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                    
                    // Update active state
                    navLinks.forEach(item => item.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Fix hero buttons scrolling
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop;
                const headerHeight = document.querySelector('header').offsetHeight;
                
                window.scrollTo({
                    top: offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Détecter la section active lors du défilement
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.querySelector('header').offsetHeight;
    
    function setActiveNavItem() {
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

    // Afficher plus de projets
    const showMoreBtn = document.getElementById('show-more-btn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    
    if (showMoreBtn && hiddenProjects.length > 0) {
        showMoreBtn.addEventListener('click', function() {
            hiddenProjects.forEach((project, index) => {
                project.style.display = 'block';
                
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'translateY(0)';
                }, index * 100);
            });
            
            this.style.display = 'none';
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
                const category = card.getAttribute('data-category');
                
                if (filter === 'all') {
                    // Pour le filtre "all", on affiche seulement les 3 premiers projets et on garde le bouton "Afficher plus"
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
                    // Pour les autres filtres, on affiche tous les projets correspondants
                    if (category === filter) {
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
}); 
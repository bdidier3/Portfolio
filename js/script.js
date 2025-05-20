document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simuler l'envoi du formulaire
            try {
                // Ici, vous pouvez ajouter votre logique d'envoi de formulaire
                console.log('Données du formulaire:', data);
                alert('Message envoyé avec succès!');
                contactForm.reset();
            } catch (error) {
                console.error('Erreur:', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        });
    }

    // Animation du header au scroll
    let lastScroll = 0;
    const header = document.querySelector('.header-main');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
});
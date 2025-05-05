// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des animations AOS
    AOS.init({
        duration: 1000,
        once: false,
        mirror: true,
        offset: 100
    });

    // Gestion de la navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const navItems = document.querySelectorAll('.nav-links a');

    // Menu hamburger sur mobile
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Animation des barres du hamburger
            const spans = this.querySelectorAll('span');
            spans[0].classList.toggle('rotate-down');
            spans[1].classList.toggle('fade-out');
            spans[2].classList.toggle('rotate-up');
        });
    }

    // Navigation fluide
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Fermer le menu mobile si ouvert
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.classList.remove('rotate-down', 'fade-out', 'rotate-up');
                });
            }

            // Navigation fluide vers la section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - navbar.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Changer le style de la navbar au scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Mettre en surbrillance le lien actif
        highlightActiveNavLink();
    });

    // Fonction pour mettre en surbrillance le lien actif
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // Animation du texte d'accueil
    const accueilContent = document.querySelector('.accueil-content');
    if (accueilContent) {
        const title = accueilContent.querySelector('h1');
        const subtitle = accueilContent.querySelector('h2');
        const text = accueilContent.querySelector('p');
        const btn = accueilContent.querySelector('.btn-download');
        
        if (title) title.classList.add('fade-in');
        if (subtitle) {
            subtitle.style.opacity = '0';
            setTimeout(() => {
                subtitle.classList.add('fade-in');
                subtitle.style.opacity = '1';
            }, 300);
        }
        if (text) {
            text.style.opacity = '0';
            setTimeout(() => {
                text.classList.add('fade-in');
                text.style.opacity = '1';
            }, 600);
        }
        if (btn) {
            btn.style.opacity = '0';
            setTimeout(() => {
                btn.classList.add('fade-in');
                btn.style.opacity = '1';
            }, 900);
        }
    }

    // Animation des particules d'arrière-plan
    createParticles();

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simuler l'envoi du formulaire
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Réinitialiser le formulaire
                this.reset();
                submitBtn.textContent = 'Envoyé !';
                
                // Créer une notification
                showNotification('Message envoyé avec succès !');
                
                // Réinitialiser le bouton après 3 secondes
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Fonction pour créer une notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animer l'apparition
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Disparition après 3 secondes
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Fonction pour créer des particules d'arrière-plan
    function createParticles() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const particles = document.createElement('div');
            particles.className = 'particles';
            
            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Position aléatoire
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                const size = Math.random() * (10 - 2) + 2;
                const delay = Math.random() * 5;
                const duration = Math.random() * (15 - 5) + 5;
                
                particle.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${posX}%;
                    top: ${posY}%;
                    opacity: ${Math.random() * 0.5};
                    animation-delay: ${delay}s;
                    animation-duration: ${duration}s;
                `;
                
                particles.appendChild(particle);
            }
            
            section.appendChild(particles);
        });
    }

    // Animation au survol des cartes de projet
    const projetCards = document.querySelectorAll('.projet-card');
    
    projetCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Position X relative à la carte
            const y = e.clientY - rect.top;  // Position Y relative à la carte
            
            // Calculer l'angle de rotation basé sur la position du curseur
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Ajout de styles CSS pour les nouvelles animations
    addAnimationStyles();
});

// Fonction pour ajouter les styles CSS pour les animations
function addAnimationStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerHTML = `
        /* Styles pour les particules */
        .particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -1;
        }
        
        .particle {
            position: absolute;
            background-color: rgba(108, 99, 255, 0.2);
            border-radius: 50%;
            pointer-events: none;
            animation: float-particle 10s infinite linear;
        }
        
        @keyframes float-particle {
            0% {
                transform: translateY(0) rotate(0deg);
            }
            50% {
                transform: translateY(-100px) rotate(180deg);
            }
            100% {
                transform: translateY(0) rotate(360deg);
            }
        }
        
        /* Styles pour la notification */
        .notification {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--primary-color);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        /* Animation des barres du menu hamburger */
        .nav-toggle span {
            transition: all 0.3s ease;
        }
        
        .nav-toggle .rotate-down {
            transform: translateY(9px) rotate(45deg);
        }
        
        .nav-toggle .fade-out {
            opacity: 0;
        }
        
        .nav-toggle .rotate-up {
            transform: translateY(-9px) rotate(-45deg);
        }
    `;
    document.head.appendChild(styleSheet);
}
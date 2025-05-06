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

    // Créer la modal pour le document
    createDocumentModal();

    // Gestionnaire d'événements pour l'aperçu du document
    const documentPreview = document.querySelector('.document-preview');
    if (documentPreview) {
        documentPreview.addEventListener('click', function() {
            const modal = document.querySelector('.document-modal');
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Empêcher le défilement du body
            }
        });
    }

    // Fonction pour créer la modal du document
    function createDocumentModal() {
        // Créer la structure de la modal
        const modal = document.createElement('div');
        modal.className = 'document-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'document-modal-content';
        
        // Placeholder ou image si elle existe déjà
        const img = document.createElement('img');
        img.className = 'document-modal-img';
        img.src = document.querySelector('.document-preview img')?.src || '#';
        img.alt = 'Document agrandi';
        
        // Si pas d'image encore, utiliser un placeholder
        if (img.src === window.location.href + '#') {
            const placeholder = document.createElement('div');
            placeholder.className = 'document-placeholder';
            placeholder.style.width = '800px';
            placeholder.style.height = '600px';
            
            const icon = document.createElement('i');
            icon.className = 'fas fa-file-alt';
            
            const text = document.createElement('p');
            text.textContent = 'Document à venir';
            
            placeholder.appendChild(icon);
            placeholder.appendChild(text);
            
            modalContent.appendChild(placeholder);
        } else {
            modalContent.appendChild(img);
        }
        
        // Bouton de fermeture
        const closeBtn = document.createElement('div');
        closeBtn.className = 'document-modal-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        
        // Contrôles de zoom
        const zoomControls = document.createElement('div');
        zoomControls.className = 'document-modal-zoom-controls';
        
        const zoomInBtn = document.createElement('div');
        zoomInBtn.className = 'zoom-btn zoom-in';
        zoomInBtn.innerHTML = '<i class="fas fa-search-plus"></i>';
        
        const zoomOutBtn = document.createElement('div');
        zoomOutBtn.className = 'zoom-btn zoom-out';
        zoomOutBtn.innerHTML = '<i class="fas fa-search-minus"></i>';
        
        const resetZoomBtn = document.createElement('div');
        resetZoomBtn.className = 'zoom-btn reset-zoom';
        resetZoomBtn.innerHTML = '<i class="fas fa-undo"></i>';
        
        zoomControls.appendChild(zoomInBtn);
        zoomControls.appendChild(resetZoomBtn);
        zoomControls.appendChild(zoomOutBtn);
        
        modal.appendChild(modalContent);
        modal.appendChild(closeBtn);
        modal.appendChild(zoomControls);
        
        document.body.appendChild(modal);
        
        // Gestionnaires d'événements pour la modal
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restaurer le défilement du body
        });
        
        // Fermer la modal en cliquant à l'extérieur du contenu
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Échapper pour fermer la modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Variables pour le zoom
        let scale = 1;
        const ZOOM_STEP = 0.2;
        const MAX_ZOOM = 3;
        const MIN_ZOOM = 0.5;
        
        // Fonctions de zoom
        zoomInBtn.addEventListener('click', function() {
            if (scale < MAX_ZOOM) {
                scale += ZOOM_STEP;
                applyZoom();
            }
        });
        
        zoomOutBtn.addEventListener('click', function() {
            if (scale > MIN_ZOOM) {
                scale -= ZOOM_STEP;
                applyZoom();
            }
        });
        
        resetZoomBtn.addEventListener('click', function() {
            scale = 1;
            applyZoom();
        });
        
        function applyZoom() {
            const contentImg = modalContent.querySelector('img');
            if (contentImg) {
                contentImg.style.transform = `scale(${scale})`;
            }
        }
        
        // Support du zoom avec la molette de la souris
        modalContent.addEventListener('wheel', function(e) {
            e.preventDefault();
            if (e.deltaY < 0 && scale < MAX_ZOOM) {
                // Zoom in
                scale += ZOOM_STEP;
            } else if (e.deltaY > 0 && scale > MIN_ZOOM) {
                // Zoom out
                scale -= ZOOM_STEP;
            }
            applyZoom();
        });
        
        // Support du pincement pour les appareils tactiles
        let initialDistance = 0;
        
        modalContent.addEventListener('touchstart', function(e) {
            if (e.touches.length === 2) {
                initialDistance = Math.hypot(
                    e.touches[0].pageX - e.touches[1].pageX,
                    e.touches[0].pageY - e.touches[1].pageY
                );
            }
        });
        
        modalContent.addEventListener('touchmove', function(e) {
            if (e.touches.length === 2) {
                e.preventDefault();
                
                const currentDistance = Math.hypot(
                    e.touches[0].pageX - e.touches[1].pageX,
                    e.touches[0].pageY - e.touches[1].pageY
                );
                
                if (initialDistance > 0) {
                    const delta = currentDistance - initialDistance;
                    
                    if (delta > 10 && scale < MAX_ZOOM) {
                        // Zoom in (pincement écartement)
                        scale += ZOOM_STEP;
                        applyZoom();
                    } else if (delta < -10 && scale > MIN_ZOOM) {
                        // Zoom out (pincement rapprochement)
                        scale -= ZOOM_STEP;
                        applyZoom();
                    }
                    
                    if (Math.abs(delta) > 10) {
                        initialDistance = currentDistance;
                    }
                }
            }
        });
    }
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
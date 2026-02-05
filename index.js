document.addEventListener('DOMContentLoaded', () => {
    // 1. Script para el año actual en el footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    
    // 2. Lógica para el botón "Volver Arriba"
    const backToTopButton = document.getElementById('btn-back-to-top');

    if (backToTopButton) {
        // Mostrar u ocultar el botón al hacer scroll y ajustar posición
        window.onscroll = function() {
            const footer = document.querySelector('footer');
            let scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
            let pageHeight = document.documentElement.scrollHeight;
            let viewportHeight = window.innerHeight;
            
            // Mostrar/ocultar el botón
            if (scrollPosition > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
            
            // Ajustar posición del botón para que no tape el footer
            if (footer) {
                let footerHeight = footer.offsetHeight;
                let distanceToBottom = pageHeight - scrollPosition - viewportHeight;
                
                // Si estamos cerca del footer, posicionar el botón encima de él
                if (distanceToBottom < footerHeight + 100) {
                    let newBottom = footerHeight + 20;
                    backToTopButton.style.bottom = newBottom + 'px';
                } else {
                    // Si no, mantener la posición normal
                    if (window.innerWidth <= 992) {
                        backToTopButton.style.bottom = '15px';
                    } else {
                        backToTopButton.style.bottom = '20px';
                    }
                }
            }
        };

        // Al hacer clic, subir a la parte superior de la página
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 3. Menú hamburguesa
    const menuToggle = document.querySelector('.menu-toggle');
    const menuLinks = document.getElementById('menu-links');

    if (menuToggle && menuLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            menuLinks.classList.toggle('is-open');
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Cerrar menú al hacer click en un enlace
        const links = menuLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuLinks.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
});
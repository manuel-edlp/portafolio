// Función para obtener el año actual e inyectarlo en el footer
function updateFooterYear() {
    const yearSpan = document.getElementById('current-year');

    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }
}
document.addEventListener('DOMContentLoaded', updateFooterYear);



document.addEventListener('DOMContentLoaded', () => {
    // 1. Script para el año actual en el footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // 2. Lógica para el botón "Volver Arriba"
    const backToTopButton = document.getElementById('btn-back-to-top');

    // Mostrar u ocultar el botón al hacer scroll
    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    };

    // Al hacer clic, subir a la parte superior de la página
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Desplazamiento suave
        });
    });
});


    document.addEventListener('DOMContentLoaded', () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const menuLinks = document.getElementById('menu-links');

        menuToggle.addEventListener('click', () => {
            // Alternar la clase 'is-open' en el contenedor de enlaces
            menuLinks.classList.toggle('is-open');
            
            // Actualizar el atributo aria-expanded para accesibilidad
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Opcional: Cerrar el menú después de hacer clic en un enlace (navegación)
        const links = menuLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                // Solo cerrar si el menú está abierto
                if (menuLinks.classList.contains('is-open')) {
                    menuLinks.classList.remove('is-open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    });
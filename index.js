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
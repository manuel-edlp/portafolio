// Función para obtener el año actual e inyectarlo en el footer
function updateFooterYear() {
    const yearSpan = document.getElementById('current-year');

    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }
}
document.addEventListener('DOMContentLoaded', updateFooterYear);
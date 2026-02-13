/**
 * project-gallery.js
 * Centraliza la lógica de la galería de capturas y el modal para todos los proyectos.
 * Inyecta automáticamente el HTML del modal si existen capturas en la página.
 */

document.addEventListener('DOMContentLoaded', function () {
    const capturas = document.querySelectorAll('.captura-item');

    // Si no hay capturas, no hace falta el modal
    if (capturas.length === 0) return;

    // 1. Inyectar el HTML del modal al final del body si no existe
    if (!document.getElementById('miModal')) {
        const modalHTML = `
            <div id="miModal" class="modal">
                <span class="cerrar" id="modal-close">
                    <i class="fa-solid fa-xmark"></i>
                </span>

                <a class="prev" id="modal-prev">&#10094;</a>
                <a class="next" id="modal-next">&#10095;</a>

                <div class="modal-content" id="modal-scroll-container">
                    <div class="modal-zoom-container">
                        <img id="imagen-modal" src="" alt="Imagen ampliada" class="modal-imagen">
                        <div id="descripcion-modal" class="modal-descripcion"></div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // 2. Referencias a elementos del modal
    const modal = document.getElementById("miModal");
    const modalImagen = document.getElementById("imagen-modal");
    const modalDescripcion = document.getElementById("descripcion-modal");
    const btnCerrar = document.getElementById("modal-close");
    const btnPrev = document.getElementById("modal-prev");
    const btnNext = document.getElementById("modal-next");
    let indiceActual = 0;

    // 3. Función para abrir la modal y cargar la imagen
    function abrirModal(index) {
        if (index >= 0 && index < capturas.length) {
            resetZoom(); // Resetear zoom antes de cargar nueva imagen
            indiceActual = index;
            const captura = capturas[indiceActual];
            const img = captura.querySelector('img');
            const fig = captura.querySelector('figcaption');

            if (img) modalImagen.src = img.src;
            if (fig) modalDescripcion.innerHTML = fig.innerHTML;

            modal.style.display = "block";
            document.body.style.overflow = 'hidden';

            // Centrar la modal
            modal.scrollTop = 0;
        }
    }

    // 4. Función para cambiar de imagen
    function cambiarCaptura(direccion) {
        let nuevoIndice = indiceActual + direccion;
        if (nuevoIndice >= capturas.length) {
            nuevoIndice = 0;
        } else if (nuevoIndice < 0) {
            nuevoIndice = capturas.length - 1;
        }
        abrirModal(nuevoIndice);
    }

    // --- Lógica de Zoom Profesional ---
    function toggleZoom(e) {
        if (e) e.stopPropagation();

        const isZoomed = modal.classList.contains('is-zoomed');

        if (!isZoomed) {
            modal.classList.add('is-zoomed');
        } else {
            modal.classList.remove('is-zoomed');
        }
    }

    function resetZoom() {
        modal.classList.remove('is-zoomed');
        const container = document.getElementById('modal-scroll-container');
        if (container) {
            container.scrollTop = 0;
            container.scrollLeft = 0;
        }
    }

    // --- Lógica de Arrastre (Drag and Scroll) Pro ---
    const scrollContainer = document.getElementById('modal-scroll-container');
    let isDown = false;
    let startX;
    let startY;
    let scrollLeft;
    let scrollTop;
    let moved = false; // Para distinguir click de arrastre

    scrollContainer.addEventListener('mousedown', (e) => {
        if (!modal.classList.contains('is-zoomed')) return;

        // Solo arrastrar con botón izquierdo
        if (e.button !== 0) return;

        isDown = true;
        moved = false;
        scrollContainer.style.cursor = 'grabbing';

        startX = e.pageX - scrollContainer.offsetLeft;
        startY = e.pageY - scrollContainer.offsetTop;
        scrollLeft = scrollContainer.scrollLeft;
        scrollTop = scrollContainer.scrollTop;
    });

    scrollContainer.addEventListener('mouseleave', () => {
        if (isDown) {
            isDown = false;
            scrollContainer.style.cursor = modal.classList.contains('is-zoomed') ? 'zoom-out' : 'zoom-in';
        }
    });

    scrollContainer.addEventListener('mouseup', (e) => {
        if (isDown) {
            isDown = false;
            scrollContainer.style.cursor = modal.classList.contains('is-zoomed') ? 'zoom-out' : 'zoom-in';
        }
    });

    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown || !modal.classList.contains('is-zoomed')) return;

        const x = e.pageX - scrollContainer.offsetLeft;
        const y = e.pageY - scrollContainer.offsetTop;
        const walkX = (x - startX) * 1.5;
        const walkY = (y - startY) * 1.5;

        // Si el movimiento es mayor a 5px, se considera arrastre
        if (Math.abs(x - startX) > 5 || Math.abs(y - startY) > 5) {
            moved = true;
        }

        if (moved) {
            e.preventDefault();
            scrollContainer.scrollLeft = scrollLeft - walkX;
            scrollContainer.scrollTop = scrollTop - walkY;
        }
    });

    // Toggle Zoom con protección de arrastre
    function handleImageClick(e) {
        if (moved) {
            moved = false;
            return;
        }
        toggleZoom(e);
    }

    modalImagen.addEventListener('click', handleImageClick);

    // Evitar que el navegador intente arrastrar la imagen como un archivo
    modalImagen.addEventListener('dragstart', (e) => e.preventDefault());

    // Click en el contenedor para quitar zoom si está activo (solo si no se arrastró)
    scrollContainer.addEventListener('click', (e) => {
        // Si se hace click en el fondo (fuera de la imagen y desc)
        if (modal.classList.contains('is-zoomed') && e.target === scrollContainer) {
            resetZoom();
        }
    });

    // 5. Configurar Event Listeners
    capturas.forEach((captura, index) => {
        captura.addEventListener('click', () => abrirModal(index));
    });

    // Cerrar modal
    if (btnCerrar) {
        btnCerrar.onclick = () => {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
            resetZoom();
        };
    }

    // Navegación con flechas del modal
    if (btnPrev) {
        btnPrev.onclick = (e) => {
            e.stopPropagation();
            cambiarCaptura(-1);
        };
    }
    if (btnNext) {
        btnNext.onclick = (e) => {
            e.stopPropagation();
            cambiarCaptura(1);
        };
    }

    // Cerrar al hacer clic fuera de la imagen (en el fondo oscuro)
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
            resetZoom();
        }
    });

    // Navegación con el teclado
    document.addEventListener('keydown', (event) => {
        if (modal.style.display === "block") {
            if (event.key === "ArrowRight") {
                cambiarCaptura(1);
            } else if (event.key === "ArrowLeft") {
                cambiarCaptura(-1);
            } else if (event.key === "Escape") {
                modal.style.display = "none";
                document.body.style.overflow = 'auto';
                resetZoom();
            }
        }
    });
});

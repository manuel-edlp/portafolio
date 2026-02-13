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
                <div class="modal-content">
                    <a class="prev" id="modal-prev">&#10094;</a>

                    <span class="cerrar" id="modal-close">
                        <i class="fa-solid fa-circle-xmark"></i>
                    </span>

                    <img id="imagen-modal" src="" alt="Imagen ampliada" class="modal-imagen">
                    <div id="descripcion-modal" class="modal-descripcion"></div>

                    <a class="next" id="modal-next">&#10095;</a>
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

    // 5. Configurar Event Listeners
    capturas.forEach((captura, index) => {
        captura.addEventListener('click', () => abrirModal(index));
    });

    // Cerrar modal
    if (btnCerrar) {
        btnCerrar.onclick = () => {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
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
            }
        }
    });
});

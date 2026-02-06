// Lista de proyectos ordenados como aparecen en la página principal
const projects = [
    { name: "Fondo Blanco", path: "fondo-blanco.html" },
    { name: "Hogares del Sol", path: "hogares-del-sol.html" },
    { name: "Ticket", path: "ticket.html" },
    { name: "Leyendas del Sur", path: "leyendas-del-sur.html" },
    { name: "Jornadas", path: "jornadas.html" },
    { name: "CNEISI", path: "cneisi.html" },
    { name: "VetCloud", path: "vetcloud.html" },
    { name: "Agremiación Odontológica", path: "agremiacion.html" }
];

// Función para obtener el índice del proyecto actual basado en la URL
function getCurrentProjectIndex() {
    // Obtener el nombre del archivo actual de varias formas diferentes
    let currentPage = window.location.pathname.split('/').pop() || '';
    
    // Remover parámetros de query si existen
    currentPage = currentPage.split('?')[0];
    
    // Remover hash si existe
    currentPage = currentPage.split('#')[0];
    
    // Si currentPage está vacío, intentar otro método
    if (!currentPage) {
        const href = window.location.href;
        currentPage = href.split('/').pop().split('?')[0].split('#')[0];
    }
    
    
    
    
    
    // Buscar coincidencia exacta
    let index = projects.findIndex(project => project.path === currentPage);
    
    // Si no encuentra coincidencia exacta, intentar con búsqueda más flexible
    if (index === -1) {
        console.warn("⚠ No coincidencia exacta para:", currentPage);
        console.warn("⚠ Proyectos disponibles:", projects.map(p => p.path));
        
        // Intentar búsqueda insensible a mayúsculas/minúsculas
        index = projects.findIndex(project => project.path.toLowerCase() === currentPage.toLowerCase());
        if (index !== -1) {
            
        }
    }
    
    if (index === -1) {
        console.warn("ERROR: Proyecto no encontrado en la lista");
    } else {
        
    }
    
    return index;
}

// Función para cargar la navegación entre proyectos
function loadProjectNavigation() {
    
    
    const currentIndex = getCurrentProjectIndex();
    
    if (currentIndex === -1) {
        console.error("Proyecto no encontrado en la lista, saltando navegación");
        return;
    }
    
    
    
    const hasPrevious = currentIndex > 0;
    const hasNext = currentIndex < projects.length - 1;
    
    
    
    const previousProject = hasPrevious ? projects[currentIndex - 1] : null;
    const nextProject = hasNext ? projects[currentIndex + 1] : null;
    
    
    // Crear el contenedor de navegación
    const navContainer = document.createElement('div');
    navContainer.id = 'navegacion-proyectos';
    navContainer.className = 'nav-proyectos-contenedor';
    
    let navHTML = '<div class="nav-proyectos">';
    
    // Botón anterior
    if (hasPrevious) {
        navHTML += `
            <a href="${previousProject.path}" class="btn-nav-proyecto btn-anterior">
                <i class="fa-solid fa-arrow-left"></i> ${previousProject.name}
            </a>
        `;
    } else {
        navHTML += '<div class="btn-nav-proyecto btn-anterior disabled"></div>';
    }
    
    // Botón siguiente
    if (hasNext) {
        navHTML += `
            <a href="${nextProject.path}" class="btn-nav-proyecto btn-siguiente">
                ${nextProject.name} <i class="fa-solid fa-arrow-right"></i>
            </a>
        `;
    } else {
        navHTML += '<div class="btn-nav-proyecto btn-siguiente disabled"></div>';
    }
    
    navHTML += '</div>';
    navContainer.innerHTML = navHTML;
    
    // Intentar insertar antes del div de contacto
    const contactDiv = document.getElementById('contacto');
    if (contactDiv) {
        
        contactDiv.parentNode.insertBefore(navContainer, contactDiv);
        
    } else {
        console.warn("⚠ No encontrado #contacto, intentando #contenido-principal");
        // Si no existe #contacto, insertar al final de #contenido-principal
        const contentDiv = document.getElementById('contenido-principal');
        if (contentDiv) {
            
            contentDiv.appendChild(navContainer);
            
        } else {
            console.error("✗ ERROR: No se encontró #contacto ni #contenido-principal para insertar navegación");
        }
    }
}

// Cargar la navegación cuando el DOM esté listo

document.addEventListener('DOMContentLoaded', loadProjectNavigation);

// Fallback: Si el DOM ya está listo cuando se carga el script, ejecutar la función inmediatamente
if (document.readyState === 'loading') {
    
} else {
    
    loadProjectNavigation();
}

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
        window.onscroll = function () {
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

    // 4. Filtros y Búsqueda de Proyectos
    const searchInput = document.getElementById('busqueda');
    const filterBtns = document.querySelectorAll('.filtro-btn');
    const langFilterBtns = document.querySelectorAll('.filtro-lang-btn');
    const projects = document.querySelectorAll('.proyecto');

    function filterProjects() {
        const searchTerm = (searchInput.value || "").toLowerCase().trim();

        // Buscamos el botón activo específicamente dentro de cada grupo
        const activeFilterBtn = document.querySelector('.filtros-categorias .filtro-btn.active');
        const activeFilter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';

        const activeLangBtn = document.querySelector('.filtros-lenguajes .filtro-lang-btn.active');
        const activeLang = activeLangBtn ? activeLangBtn.dataset.lang : 'all';

        projects.forEach(project => {
            const tags = (project.dataset.tags || "").toLowerCase();
            const langs = (project.dataset.languages || "").toLowerCase();
            const title = (project.querySelector('strong') ? project.querySelector('strong').textContent : "").toLowerCase();
            const desc = (project.querySelector('.proyecto-descripcion') ? project.querySelector('.proyecto-descripcion').textContent : "").toLowerCase();

            const matchesSearch = !searchTerm ||
                title.includes(searchTerm) ||
                desc.includes(searchTerm) ||
                tags.includes(searchTerm) ||
                langs.includes(searchTerm);

            const matchesCategory = activeFilter === 'all' || tags.includes(activeFilter);
            const matchesLang = activeLang === 'all' ||
                langs.includes(activeLang) ||
                (activeLang === 'javascript' && langs.includes('reactnative')) ||
                (activeLang === 'react' && langs.includes('reactnative'));

            if (matchesSearch && matchesCategory && matchesLang) {
                project.style.display = 'flex';
            } else {
                project.style.display = 'none';
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterProjects);
    }

    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterProjects();
            });
        });
    }

    if (langFilterBtns) {
        langFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                langFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterProjects();
            });
        });
    }
});
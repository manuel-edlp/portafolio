(function() {
    // 1. Detección inmediata para evitar parpadeo (FOIT)
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Priorizamos el tema guardado, si no existe, el valor por defecto es 'dark'.
    const initialTheme = savedTheme || 'dark';
    document.documentElement.setAttribute('data-theme', initialTheme);

    // 2. Configuración una vez cargado el DOM
    document.addEventListener('DOMContentLoaded', () => {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        // Función para actualizar el icono
        const updateIcon = (theme) => {
            const isDark = theme === 'dark';
            themeToggle.innerHTML = isDark 
                ? '<i class="fa-solid fa-sun"></i>' 
                : '<i class="fa-solid fa-moon"></i>';
            themeToggle.title = isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
        };

        // Inicializar icono
        updateIcon(initialTheme);

        // Lógica del switch
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
        });
    });
})();

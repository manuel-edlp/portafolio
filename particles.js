class Particle {
    constructor(canvas, ctx, mouse) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.mouse = mouse;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.velocityX = (Math.random() - 0.5) * 1.5;
        this.velocityY = (Math.random() - 0.5) * 1.5;

        // Colores
        const colors = [
            '#0077B6', // Azul principal
            '#00B4D8', // Azul claro
            '#90E0EF', // Celeste
            '#48CAE4', // Turquesa
            '#023E8A', // Azul oscuro
            '#0096C7'  // Azul brillante
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    update() {
        // Movimiento básico
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Rebote en bordes
        if (this.x > this.canvas.width || this.x < 0) {
            this.velocityX = -this.velocityX;
        }
        if (this.y > this.canvas.height || this.y < 0) {
            this.velocityY = -this.velocityY;
        }

        // Interacción con el mouse
        const dx = this.mouse.x - this.x;
        const dy = this.mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const magnetRadius = 150;

        if (distance < magnetRadius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (magnetRadius - distance) / magnetRadius;

            // Empujar partículas lejos del mouse (efecto Antigravity)
            this.x -= forceDirectionX * force * 3;
            this.y -= forceDirectionY * force * 3;
        }
    }
}

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null };
        this.numberOfParticles = 200;

        this.init();
        this.animate();

        window.addEventListener('resize', () => {
            this.setCanvasSize();
            this.init();
        });

        // Eventos del mouse relativos al contenedor principal
        const mainContainer = document.getElementById('contenido-principal');
        mainContainer.addEventListener('mousemove', (e) => {
            const rect = mainContainer.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        mainContainer.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    setCanvasSize() {
        const mainContainer = document.getElementById('contenido-principal');
        this.canvas.width = mainContainer.offsetWidth;
        this.canvas.height = mainContainer.offsetHeight;
    }

    init() {
        this.setCanvasSize();
        this.particles = [];
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this.canvas, this.ctx, this.mouse));
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            this.particles[i].draw();
        }

        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});

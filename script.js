// ==========================================
// 1. CONFIGURACIÓN DEL FONDO (Vanta.js)
// ==========================================
let vantaEffect = null; 

function initBackground() {
    if (vantaEffect) vantaEffect.destroy();

    vantaEffect = VANTA.FOG({
        el: "#animated-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: window.innerHeight, // Forzamos el alto de la ventana
        minWidth: window.innerWidth,
        highlightColor: 0xff2222,
        midColor: 0x440000,
        lowColor: 0x0,
        baseColor: 0x050505,
        blurFactor: 0.60,
        speed: 1.00,
        scale: 1.00,
        scaleMobile: 1.00
    });
}

// Escuchamos el cambio de orientación para re-dibujar el fondo
window.addEventListener('orientationchange', () => {
    setTimeout(initBackground, 200);
});

// ==========================================
// 2. LÓGICA DEL MENÚ Y NAVEGACIÓN
// ==========================================

function initNav() {
    const links = document.querySelectorAll('.menu a');
    const indicator = document.querySelector('.nav-indicator');

    function move(el) {
        if(!el || !indicator) return;
        const parentLi = el.parentElement;

        gsap.to(indicator, {
            // Usamos la posición del LI respecto a su padre (el UL)
            x: parentLi.offsetLeft, 
            width: parentLi.offsetWidth,
            duration: 0.5,
            ease: "power2.out"
        });
    }

    // 1. Posición inicial: Esperamos un suspiro a que el CSS asiente
    setTimeout(() => {
        const activeLink = document.querySelector('.menu a.active') || links[0];
        move(activeLink);
    }, 200);

    // 2. Eventos de click
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            move(link);
        });
    });

    // 3. Re-ajustar si el usuario gira el móvil o cambia el tamaño de ventana
    window.addEventListener('resize', () => {
        const active = document.querySelector('.menu a.active') || links[0];
        move(active);
    });
}

// ==========================================
// 3. ANIMACIONES GSAP (Entradas y Flotación)
// ==========================================
function initAnimations() {
    // 1. Limpieza para evitar duplicados
    gsap.killTweensOf(".menu");
    gsap.killTweensOf(".card-entry");

    // 2. Forzamos el estado inicial de centrado para el menú
    // xPercent: -50 es el equivalente a translateX(-50%)
    gsap.set(".menu", { xPercent: -50, left: "50%" });

    // 3. Animación de entrada (Caída inicial)
    gsap.from(".menu", {
        y: -7,
        opacity: 0,
        duration: 2,
        ease: "power3.out"
    });

    // 4. FLOTACIÓN DEL MENÚ (Para todos los dispositivos)
    gsap.to(".menu", {
        y: 4, 
        xPercent: -50, // Mantenemos el centrado horizontal en cada frame
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // FLOTACIÓN DE LAS CARDS (Más suave para tarjetas grandes)
    gsap.to(".card-entry", {
        y: -15, // Bajamos de 15 a 10 para que sea más elegante
        duration: 3, // Un poco más lento
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.6 // El efecto "ola" entre tarjetas se nota más
    });
}

// ==========================================
// EJECUCIÓN (Llamamos a las funciones)
// ==========================================

window.addEventListener('load', () => {
    initNav();
    initAnimations();
    initBackground(); // ¡No olvides llamarla aquí también!
});
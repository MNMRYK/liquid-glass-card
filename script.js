// ==========================================
// 1. CONFIGURACIÓN DEL FONDO (Vanta.js)
// ==========================================
function initBackground() {
    VANTA.FOG({
        el: "#animated-bg",
        mouseControls: true,
        touchControls: true,
        highlightColor: 0x222222,
        midColor: 0x111111,
        lowColor: 0x0,
        baseColor: 0x50505,
        blurFactor: 0.60,
        speed: 1.00
    });
}

// ==========================================
// 2. LÓGICA DEL MENÚ Y NAVEGACIÓN
// ==========================================
function initNav() {
    const links = document.querySelectorAll('.menu a');
    const indicator = document.querySelector('.nav-indicator');

    function move(el) {
        // Obtenemos el LI padre para calcular la posición real en la lista
        const parentLi = el.parentElement;

        gsap.to(indicator, {
            left: parentLi.offsetLeft,
            width: parentLi.offsetWidth,
            duration: 1.2,
            ease: "elastic.out(1, 0.9)"
        });

        // Efecto "Gota" (Se estira al viajar)
        gsap.fromTo(indicator,
            { scaleX: 1.2, scaleY: 1.2 },
            { scaleX: 1, scaleY: 1, duration: 0.7, ease: "back.out(2)" }
        );
    }

    // Posición inicial en el primer elemento
    if (links.length > 0) move(links[0]);

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            move(e.currentTarget); // Mueve la gota al enlace clicado
        });
    });
}

// ==========================================
// 3. ANIMACIONES GSAP (Entradas y Flotación)
// ==========================================
function initAnimations() {
    // Línea de tiempo de entrada inicial
    const tl = gsap.timeline();

    tl.from(".menu", {
        y: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    })
    .from(".menu li", {
        opacity: 0,
        y: 20,
        stagger: 0.1
    }, "-=0.8");

    // Flotación suave constante (menú)
    gsap.to(".menu", {
        y: "+=10",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Flotación constante para las tarjetas (desincronizada del menú)
    gsap.to(".card-entry", {
        y: "+=15",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
            each: 0.5,
        }
    });
}

// ==========================================
// EJECUCIÓN (Llamamos a las funciones)
// ==========================================
initBackground();

window.addEventListener('load', () => {
    initNav();
    initAnimations();
});
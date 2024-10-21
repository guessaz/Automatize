// Função para animar os números de contagem
function animateValue(element, start, end, duration, isPercentage = false) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = progress * (end - start) + start;

        // Formatar o valor conforme o tipo
        if (isPercentage) {
            element.innerText = value.toFixed(1) + "%"; // Formatar como porcentagem
        } else {
            element.innerText = Math.floor(value).toLocaleString("pt-BR"); // Formatar como número inteiro
        }

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Função para verificar quando o número entra no viewport
function observeNumbers() {
    const numbers = document.querySelectorAll(".inter-infos li span");
    const options = {
        root: null,
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Identificar se o número deve ser tratado como porcentagem
                const isPercentage = element.innerText.includes("%");
                // Remover caracteres não numéricos (para valores normais e porcentagem)
                const targetValue = element.innerText.replace(/[^\d.,]/g, "");

                // Converter valor alvo corretamente
                let finalValue;
                if (isPercentage) {
                    finalValue = parseFloat(targetValue.replace(",", ".")); // Para porcentagem (pode ter vírgula)
                } else {
                    finalValue = parseInt(targetValue.replace(/\./g, "")); // Para números inteiros (remover pontos)
                }

                // Iniciar a animação
                animateValue(element, 0, finalValue, 2000, isPercentage);

                observer.unobserve(element); // Parar de observar após a contagem
            }
        });
    }, options);

    numbers.forEach((number) => {
        observer.observe(number);
    });
}

// Iniciar a observação quando a página estiver carregada
window.addEventListener("DOMContentLoaded", observeNumbers);

// Controle do menu hambúrguer
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu-bar ul");

hamburger.addEventListener("click", () => {
    menu.classList.toggle("show");
    hamburger.classList.toggle("active"); // Adiciona a classe 'active' ao hambúrguer
});

// Animação para os cards quando entram no viewport
const cardObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.1 }
);

const cards = document.querySelectorAll(".cards_1 ul li");
cards.forEach((card) => cardObserver.observe(card));

// Função para fixar o header ao rolar 40px e mudar a cor
window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    if (header) { // Verifica se o elemento existe
        if (window.scrollY > 40) {
            header.classList.add("fixed-header");
        } else {
            header.classList.remove("fixed-header");
        }
    }
});

// Outra função de scroll para header.topside
window.addEventListener("scroll", function () {
    const headerTopside = document.querySelector("header.topside");
    if (headerTopside) { // Verifica se o elemento existe
        if (window.pageYOffset > 20) {
            headerTopside.classList.add("fixed");
        } else {
            headerTopside.classList.remove("fixed");
        }
    }
});

// Configuração do Particles.js
particlesJS("particles-js", {
    particles: {
        number: {
            value: 50, // Quantidade de partículas reduzida
            density: {
                enable: true,
                value_area: 800, // Área de densidade das partículas
            },
        },
        color: {
            value: "#ffffff", // Cor das bolinhas
        },
        shape: {
            type: "circle", // Forma das partículas (bolinhas)
            stroke: {
                width: 0,
                color: "#000000",
            },
        },
        opacity: {
            value: 0.5, // Opacidade das bolinhas
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
            },
        },
        size: {
            value: 5, // Tamanho das bolinhas
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false,
            },
        },
        line_linked: {
            enable: true, // Linhas conectando as bolinhas
            distance: 150, // Distância entre as bolinhas para conectar as linhas
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true, // Permite movimento das bolinhas
            speed: 3, // Velocidade reduzida
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
            },
        },
    },
    interactivity: {
        detect_on: "canvas", // Detecta interações no canvas
        events: {
            onhover: {
                enable: true, // Habilita interatividade com o mouse
                mode: "repulse", // Afasta as bolinhas quando o mouse passa
            },
            onclick: {
                enable: true, // Habilita clique nas bolinhas
                mode: "push", // Adiciona mais bolinhas ao clicar
            },
            resize: true, // Responsividade da tela
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1,
                },
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
            push: {
                particles_nb: 4,
            },
            remove: {
                particles_nb: 2,
            },
        },
    },
    retina_detect: true, // Ajusta para displays retina
});

// Observador para itens da seção inter-infos
document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".inter-infos ul li");

    const observerOptions = {
        root: null,
        threshold: 0.1, // Quando 10% do item estiver visível, a animação é disparada
    };

    const interInfosObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Parar de observar após a animação ser disparada
            }
        });
    }, observerOptions);

    items.forEach((item) => {
        interInfosObserver.observe(item);
    });
});



// Controle do Dark Mode
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;
const headerTopside = document.querySelector("header.topside");
const interInfos = document.querySelector(".inter-infos");
const sectionSlide = document.querySelector(".section-slide");
const middleDesign = document.querySelector(".middle-design");

// Verificar se o usuário já tem uma preferência de modo escuro
if (localStorage.getItem("darkMode") === "enabled") {
    darkModeToggle.checked = true;
    enableDarkMode();
}

// Alternar o modo escuro
darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

function enableDarkMode() {
    body.classList.add("dark-mode");
    if (headerTopside) headerTopside.classList.add("dark-mode");
    if (interInfos) interInfos.classList.add("dark-mode");
    if (sectionSlide) sectionSlide.classList.add("dark-mode");
    if (middleDesign) middleDesign.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
}

function disableDarkMode() {
    body.classList.remove("dark-mode");
    if (headerTopside) headerTopside.classList.remove("dark-mode");
    if (interInfos) interInfos.classList.remove("dark-mode");
    if (sectionSlide) sectionSlide.classList.remove("dark-mode");
    if (middleDesign) middleDesign.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
}


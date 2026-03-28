/*
  SCRIPT DE INTERACTIVIDAD DEL SITIO MODERN WARFARE
  Este archivo maneja:
  - Sistema de tema oscuro/claro con persistencia en localStorage
  - Panel de personajes con acordeón interactivo
  - Accesibilidad con soporte de teclado (Enter/Space)
  - Inicialización de funcionalidades cuando el DOM carga
*/

// Función simple de bienvenida
// Se dispara cuando el usuario hace click en el botón "Explorar" en la página principal
function saludo() {
	alert("Bienvenido a la saga Modern Warfare");
}

// Función auxiliar para mapear nombres de personajes a IDs de panel
// Permite pasar nombres completos y convertirlos a IDs utilisados en los panels
// Ejemplo: "Captain Price" -> "price"
function mostrarPersonaje(nombre) {
	const mapa = {
		"Captain Price": "price",
		"Soap MacTavish": "soap",
		Ghost: "ghost",
		Makarov: "makarov"
	};
	const objetivo = mapa[nombre];

	if (objetivo) {
		alternarPanelPersonaje(objetivo);
	}
}

// FUNCIÓN PRINCIPAL DE ACORDEÓN DE PERSONAJES
// Alterna la visibilidad de un panel de personaje específico
// Cierra todos los demás panels abiertos (solo uno abierto a la vez)
// Actualiza atributos aria-expanded para accesibilidad
function alternarPanelPersonaje(idPanel) {
	// Obtiene referencias a todos los botones y panels de personajes
	const triggers = document.querySelectorAll(".character-trigger");
	const paneles = document.querySelectorAll(".character-detail");
	const panelObjetivo = document.getElementById("panel-" + idPanel);

	if (!panelObjetivo) {
		return;
	}

	// Verifica si el panel ya estaba abierto (tiene hidden)
	const estabaAbierto = !panelObjetivo.hasAttribute("hidden");

	// PASO 1: Cierra todos los panels añadiendo el atributo hidden
	paneles.forEach(function (panel) {
		panel.setAttribute("hidden", "hidden");
	});

	// PASO 2: Marca todos los botones como cerrados (aria-expanded="false")
	triggers.forEach(function (trigger) {
		trigger.setAttribute("aria-expanded", "false");
	});

	// PASO 3: Si el panel NO estaba abierto, lo abre
	// Si el usuario hace click en el mismo botón dos veces, cierra el panel (toggle)
	if (!estabaAbierto) {
		panelObjetivo.removeAttribute("hidden");
		const triggerObjetivo = document.querySelector('.character-trigger[data-target="' + idPanel + '"]');
		if (triggerObjetivo) {
			triggerObjetivo.setAttribute("aria-expanded", "true");
		}
	}
}

// Función que aplica el tema seleccionado
// - Modifica el atributo data-theme en <body>
// - Cambia el texto del botón "Tema" dinámicamente
// - Las variables CSS se redefinen automáticamente en styles.css según data-theme
function aplicarTema(tema) {
	// Establece el tema en el elemento body
	// Las variables CSS en :root o body[data-theme="light"] se aplican automáticamente
	document.body.setAttribute("data-theme", tema);
	const botonTema = document.getElementById("themeToggle");

	// Actualiza el texto del botón para mostrar cuál es la siguiente opción
	if (botonTema) {
		botonTema.textContent = tema === "light" ? "Modo oscuro" : "Modo claro";
	}
}

// FUNCIÓN DE INICIALIZACIÓN DE TEMA
// Ejecuta cuando la página carga para restaurar el tema del usuario
// Prioridad: localStorage > preferencia del sistema > tema oscuro por defecto
function inicializarTema() {
	// PASO 1: Intenta obtener el tema guardado en localStorage
	const temaGuardado = localStorage.getItem("mw-theme");

	// PASO 2: Si hay tema guardado, úsalo. Si no, checkea preferencia del sistema
	const temaPreferido =
		temaGuardado ||
		(window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

	// PASO 3: Aplica el tema elegido
	aplicarTema(temaPreferido);

	// PASO 4: Agrega listener al botón de tema para alternar entre claro y oscuro
	const botonTema = document.getElementById("themeToggle");
	if (botonTema) {
		botonTema.addEventListener("click", function () {
// FUNCIÓN DE ACCESIBILIDAD - Atajos de teclado para personajes
// Permite usar Enter o Espacio para abrir/cerrar un panel de personaje
// Mejora la accesibilidad para usuarios que navegan con teclado
function inicializarAtajosPersonajes() {
	// Obtiene todos los botones de personajes
	const personajes = document.querySelectorAll(".character-trigger");

	personajes.forEach(function (item) {
		// EVENT 1: Click con mouse
		item.addEventListener("click", function () {
			alternarPanelPersonaje(item.dataset.target);
		});

		// EVENT 2: Teclado (Enter o Espacio)
		item.addEventListener("keydown", function (event) {
			// Verifica si se presionó Enter o Espacio
			if (event.key === "Enter" || event.key === " ") {
				// Previene el comportamiento por defecto (scroll con espacio)
				event.preventDefault();
				// Abre/cierra el panel de personaje

function inicializarAtajosPersonajes() {
	const personajes = document.querySelectorAll(".character-trigger");

	personajes.forEach(function (item) {
		item.addEventListener("click", function () {
			alternarPanelPersonaje(item.dataset.target);
		});

// EVENT: DOM COMPLETAMENTE CARGADO
// Este es el punto de entrada principal del script
// Se ejecuta cuando el navegador ha construido completamente el árbol DOM
// Inicializa todas las funcionalidades interactivas del sitio
document.addEventListener("DOMContentLoaded", function () {
	// Restaura el tema del usuario y configura el toggle
	inicializarTema();
	// Configura listeners de teclado para personajes= "Enter" || event.key === " ") {
				event.preventDefault();
				alternarPanelPersonaje(item.dataset.target);
			}
		});
	});
}

document.addEventListener("DOMContentLoaded", function () {
	inicializarTema();
	inicializarAtajosPersonajes();
});

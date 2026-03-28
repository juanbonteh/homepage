function saludo() {
	alert("Bienvenido a la saga Modern Warfare");
}

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

function alternarPanelPersonaje(idPanel) {
	const triggers = document.querySelectorAll(".character-trigger");
	const paneles = document.querySelectorAll(".character-detail");
	const panelObjetivo = document.getElementById("panel-" + idPanel);

	if (!panelObjetivo) {
		return;
	}

	const estabaAbierto = !panelObjetivo.hasAttribute("hidden");

	paneles.forEach(function (panel) {
		panel.setAttribute("hidden", "hidden");
	});

	triggers.forEach(function (trigger) {
		trigger.setAttribute("aria-expanded", "false");
	});

	if (!estabaAbierto) {
		panelObjetivo.removeAttribute("hidden");
		const triggerObjetivo = document.querySelector('.character-trigger[data-target="' + idPanel + '"]');
		if (triggerObjetivo) {
			triggerObjetivo.setAttribute("aria-expanded", "true");
		}
	}
}

function aplicarTema(tema) {
	document.body.setAttribute("data-theme", tema);
	const botonTema = document.getElementById("themeToggle");

	if (botonTema) {
		botonTema.textContent = tema === "light" ? "Modo oscuro" : "Modo claro";
	}
}

function inicializarTema() {
	const temaGuardado = localStorage.getItem("mw-theme");
	const temaPreferido =
		temaGuardado ||
		(window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

	aplicarTema(temaPreferido);

	const botonTema = document.getElementById("themeToggle");
	if (botonTema) {
		botonTema.addEventListener("click", function () {
			const actual = document.body.getAttribute("data-theme") || "dark";
			const siguiente = actual === "dark" ? "light" : "dark";
			localStorage.setItem("mw-theme", siguiente);
			aplicarTema(siguiente);
		});
	}
}

function inicializarAtajosPersonajes() {
	const personajes = document.querySelectorAll(".character-trigger");

	personajes.forEach(function (item) {
		item.addEventListener("click", function () {
			alternarPanelPersonaje(item.dataset.target);
		});

		item.addEventListener("keydown", function (event) {
			if (event.key === "Enter" || event.key === " ") {
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

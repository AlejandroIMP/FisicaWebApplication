// Definición de todas las fórmulas (mismo esquema que tu objeto de tiro vertical)
const formulas = {
    x_t: [
        {
        label: "x(t) = v₀·cos(θ)·t",
        requiere: ["v0", "theta", "t"],
        func: ({ v0, theta, t }) => {
            const rad = theta * Math.PI / 180;
            return { val: v0 * Math.cos(rad) * t, unit: "m" };
        }
        }
    ],
    y_t: [
        {
        label: "y(t) = v₀·sin(θ)·t − ½·g·t²",
        requiere: ["v0", "theta", "t", "g"],
        func: ({ v0, theta, t, g }) => {
            const rad = theta * Math.PI / 180;
            return { val: v0 * Math.sin(rad) * t - 0.5 * g * t * t, unit: "m" };
        }
        }
    ],
    vx: [
        {
        label: "vₓ = v₀·cos(θ)",
        requiere: ["v0", "theta"],
        func: ({ v0, theta }) => {
            const rad = theta * Math.PI / 180;
            return { val: v0 * Math.cos(rad), unit: "m/s" };
        }
        }
    ],
    vy_t: [
        {
        label: "vᵧ(t) = v₀·sin(θ) − g·t",
        requiere: ["v0", "theta", "t", "g"],
        func: ({ v0, theta, t, g }) => {
            const rad = theta * Math.PI / 180;
            return { val: v0 * Math.sin(rad) - g * t, unit: "m/s" };
        }
        }
    ],
    v_t: [
        {
        label: "v(t) = √(vₓ² + vᵧ²)",
        requiere: ["v0", "theta", "t", "g"],
        func: ({ v0, theta, t, g }) => {
            const rad = theta * Math.PI / 180;
            const vx = v0 * Math.cos(rad);
            const vy = v0 * Math.sin(rad) - g * t;
            return { val: Math.sqrt(vx * vx + vy * vy), unit: "m/s" };
        }
        }
    ],
    theta: [
        {
        label: "θ = arctan(v₀ᵧ / v₀ₓ)",
        requiere: ["v0y", "v0x"],
        func: ({ v0y, v0x }) => {
            const ang = Math.atan2(v0y, v0x) * 180 / Math.PI;
            return { val: ang, unit: "°" };
        }
        }
    ],
    y_max: [
        {
        label: "yₘₐₓ = (v₀·sin(θ))² / (2·g)",
        requiere: ["v0", "theta", "g"],
        func: ({ v0, theta, g }) => {
            const rad = theta * Math.PI / 180;
            return { val: (v0 * Math.sin(rad)) ** 2 / (2 * g), unit: "m" };
        }
        }
    ],
    t_subida: [
        {
        label: "t_subida = v₀·sin(θ) / g",
        requiere: ["v0", "theta", "g"],
        func: ({ v0, theta, g }) => {
            const rad = theta * Math.PI / 180;
            return { val: (v0 * Math.sin(rad)) / g, unit: "s" };
        }
        }
    ],
    t_total: [
        {
        label: "t_total = 2·v₀·sin(θ) / g",
        requiere: ["v0", "theta", "g"],
        func: ({ v0, theta, g }) => {
            const rad = theta * Math.PI / 180;
            return { val: (2 * v0 * Math.sin(rad)) / g, unit: "s" };
        }
        }
    ],
    R: [
        {
        label: "R = v₀²·sin(2θ) / g",
        requiere: ["v0", "theta", "g"],
        func: ({ v0, theta, g }) => {
            const rad2 = 2 * theta * Math.PI / 180;
            return { val: (v0 ** 2) * Math.sin(rad2) / g, unit: "m" };
        }
        }
    ],
    v0: [
        {
        label: "v₀ = √(R·g / sin(2θ))",
        requiere: ["R", "theta", "g"],
        func: ({ R, theta, g }) => {
            const rad2 = 2 * theta * Math.PI / 180;
            return { val: Math.sqrt(R * g / Math.sin(rad2)), unit: "m/s" };
        }
        }
    ],
    v0x: [
        {
        label: "v₀ₓ = v₀·cos(θ)",
        requiere: ["v0", "theta"],
        func: ({ v0, theta }) => {
            const rad = theta * Math.PI / 180;
            return { val: v0 * Math.cos(rad), unit: "m/s" };
        }
        }
    ],
    v0y: [
        {
        label: "v₀ᵧ = v₀·sin(θ)",
        requiere: ["v0", "theta"],
        func: ({ v0, theta }) => {
            const rad = theta * Math.PI / 180;
            return { val: v0 * Math.sin(rad), unit: "m/s" };
        }
        }
    ]
    };

    // Referencias a elementos HTML
    const selectVar = document.getElementById("selectVariable");
    const selectForm = document.getElementById("selectFormula");
    const resultadoDiv = document.getElementById("resultado");
    const btnCalcular = document.getElementById("btnCalcular");
    const inputsContainer = document.getElementById("inputs");

    // Al cambiar la variable, llenamos las fórmulas disponibles y ocultamos/mostramos inputs
    selectVar.addEventListener("change", () => {
    const key = selectVar.value;
    selectForm.innerHTML = '<option value="">-- Seleccionar fórmula --</option>';
    resultadoDiv.textContent = "";
    // Ocultar todos los inputs
    Array.from(inputsContainer.children).forEach(div => div.style.display = "none");

    if (!formulas[key]) return;

    // Llenar selectForm con las fórmulas
    formulas[key].forEach((obj, idx) => {
        const opt = document.createElement("option");
        opt.value = idx;
        opt.textContent = obj.label;
        selectForm.appendChild(opt);
    });

    // Mostrar solo los inputs que requiere la primera fórmula (índice 0)
    const necesita = formulas[key][0].requiere;
    necesita.forEach(campo => {
        const div = inputsContainer.querySelector(`[data-key="${campo}"]`);
        if (div) div.style.display = "block";
    });
    });

    // Al cambiar la fórmula, mostramos/ocultamos inputs según “requiere”
    selectForm.addEventListener("change", () => {
    const key = selectVar.value;
    const idx = parseInt(selectForm.value, 10);
    resultadoDiv.textContent = "";
    Array.from(inputsContainer.children).forEach(div => div.style.display = "none");

    if (!formulas[key] || isNaN(idx)) return;
    const necesita = formulas[key][idx].requiere;
    necesita.forEach(campo => {
        const div = inputsContainer.querySelector(`[data-key="${campo}"]`);
        if (div) div.style.display = "block";
    });
    });

    // Función principal de “Calcular”
    btnCalcular.addEventListener("click", calcular);

    function calcular() {
    const key = selectVar.value;
    const fi = selectForm.value;
    if (!formulas[key] || fi === "") {
        resultadoDiv.textContent = "Primero selecciona variable y fórmula.";
        return;
    }

    // Leer todos los valores posibles
    const vals = {
        x: parseFloat(document.getElementById("x")?.value),
        y: parseFloat(document.getElementById("y")?.value),
        v0: parseFloat(document.getElementById("v0")?.value),
        vx: parseFloat(document.getElementById("vx")?.value),
        vy: parseFloat(document.getElementById("vy")?.value),
        v0x: parseFloat(document.getElementById("v0x")?.value),
        v0y: parseFloat(document.getElementById("v0y")?.value),
        theta: parseFloat(document.getElementById("theta")?.value),
        t: parseFloat(document.getElementById("t")?.value),
        g: parseFloat(document.getElementById("g")?.value)
    };

    // Ejecutar la función correspondiente
    const { val, unit } = formulas[key][fi].func(vals);
    if (isNaN(val)) {
        resultadoDiv.textContent = "Revisa los datos ingresados.";
        limpiarAnimacion();
        return;
    }

    resultadoDiv.textContent = `Resultado: ${val.toFixed(2)} ${unit}`;

    // Animación solo si corresponde a estas variables:
    if (["t_total", "R", "y_max", "x_t", "y_t", "t_subida"].includes(key)) {
        animarTiroParabolico(key, val, {
        v0: vals.v0,
        theta: vals.theta,
        g: vals.g,
        t: vals.t
        });
    } else {
        limpiarAnimacion();
    }
    }

    // Limpia el proyectil (lo vuelve a “invisible” y lo ubica en origen)
    function limpiarAnimacion() {
    const proyectil = document.getElementById("proyectil");
    proyectil.style.transition = "none";
    proyectil.style.bottom = "0px";
    proyectil.style.left = "0px";
    proyectil.style.opacity = "0";
    }

    /**
     * Animar el proyectil en trayectoria parabólica para varios casos:
     *  - "t_total" o "R": recorre toda la parábola hasta el impacto.
     *  - "y_max": sube hasta la altura máxima y se detiene ahí.
     *  - "t_subida": sube durante ese tiempo (hacia la altura máxima).
     *  - "x_t" o "y_t": sube hasta la altura y posición correspondientes al tiempo t.
     *
     * @param {string} tipo - clave de la variable ("t_total", "R", "y_max", "x_t", "y_t", "t_subida")
     * @param {number} val  - valor calculado de la variable (en caso de t_subida y y_max, val indica tiempo o altura, etc)
     * @param {object} datos - { v0, theta, g, t } necesarios para cálculos internos
     */
    function animarTiroParabolico(tipo, val, datos) {
    const proyectil = document.getElementById("proyectil");
    const cont = document.getElementById("animacion-container");

    // Reinicio inmediato:
    proyectil.style.transition = "none";
    proyectil.style.bottom = "0px";
    proyectil.style.left = "0px";
    proyectil.style.opacity = "1";

    // Pequeña pausa para “resetear” posición
    setTimeout(() => {
        const { v0, theta, g, t } = datos;
        const rad = theta * Math.PI / 180;
        const v0x = v0 * Math.cos(rad);
        const v0y = v0 * Math.sin(rad);

        // Calcular tiempos y valores físicos:
        const tTotal = (2 * v0y) / g;
        const R = (v0 ** 2 * Math.sin(2 * rad)) / g;
        const yMax = (v0y ** 2) / (2 * g);

        // Escalas de píxeles: ancho y alto del contenedor
        const anchoCont = cont.clientWidth;
        const altoCont = cont.clientHeight;
        const scaleX = anchoCont / (R || 1);
        const scaleY = altoCont / (yMax * 1.2 || 1);

        let tiempoObjetivo, alturaObjetivo, distanciaObjetivo;
        let duracionAnim; // en segundos

        if (tipo === "t_total" || tipo === "R") {
        tiempoObjetivo = tTotal;
        duracionAnim = tTotal;
        } else if (tipo === "y_max") {
        // La altura máxima se alcanza en tSubida = v0y / g
        tiempoObjetivo = v0y / g;
        duracionAnim = 1.5; // 1.5s fijos para mostrar subida
        } else if (tipo === "t_subida") {
        tiempoObjetivo = val;    // val ya es t_subida
        duracionAnim = val;
        } else if (tipo === "x_t" || tipo === "y_t") {
        tiempoObjetivo = t;      // “t” ingresado por el usuario
        duracionAnim = t;
        } else {
        tiempoObjetivo = tTotal;
        duracionAnim = tTotal;
        }

        // Ahora animamos de 0 hasta tiempoObjetivo
        let tActual = 0;
        const pasos = 120; // fotogramas aproximados
        const dT = tiempoObjetivo / pasos;

        function moverFrame() {
        // Calcular posición física en este instante:
        const xFis = v0x * tActual;
        const yFis = v0y * tActual - 0.5 * g * tActual * tActual;
        // Si pedimos "y_max" o "t_subida", yFis no puede superar yMax:
        let yPlot = yFis;
        if (tipo === "y_max" || tipo === "t_subida") {
            if (yPlot > yMax) yPlot = yMax;
        }
        // Si pedimos "y_t", val no es tiempo: val es la altura
        if (tipo === "y_t") {
            yPlot = val;
        }
        // Si pedimos "x_t", val no es tiempo: val es posición en x
        let xPlot = xFis;
        if (tipo === "x_t") {
            xPlot = val;
        }

        // Transformar a píxeles dentro del contenedor
        const px = xPlot * scaleX;
        const py = yPlot * scaleY;

        // Convertimos a “bottom” y “left” para CSS:
        const bottomPx = Math.min(altoCont - 20, py); // restamos 20px radio del proyectil
        const leftPx   = Math.min(anchoCont - 20, px);

        proyectil.style.transition = "none";
        proyectil.style.bottom = bottomPx + "px";
        proyectil.style.left   = leftPx + "px";

        tActual += dT;
        if (tActual <= tiempoObjetivo) {
            requestAnimationFrame(moverFrame);
        } else {
            // Detener y desvanecer después de 0.5s de reposo
            setTimeout(() => {
            proyectil.style.transition = "opacity 0.5s ease";
            proyectil.style.opacity = "0";
            }, 500);
        }
        }

        // Iniciar animación
        moverFrame();
    }, 100);
    }

    // Al cargar la página, ocultamos la bolita
    window.addEventListener("load", () => {
    limpiarAnimacion();
    });

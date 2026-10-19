document.addEventListener("DOMContentLoaded", () => {
  inicializarNavegacion();
  inicializarETL();
  inicializarCuestionario();
  inicializarDashboard();
});

function inicializarNavegacion() {
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = [...document.querySelectorAll("main section[id]")];
  const scrollTopButton = document.querySelector(".scroll-top");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${id}`;
          link.classList.toggle("active", isActive);
        });
      });
    },
    { threshold: 0.45 }
  );

  sections.forEach((section) => observer.observe(section));

  window.addEventListener("scroll", () => {
    if (!scrollTopButton) return;
    scrollTopButton.classList.toggle("visible", window.scrollY > 260);
  });
}

function inicializarETL() {
  const toggleButton = document.getElementById("toggle-etl-demo");
  const etlDemo = document.getElementById("etl-demo");

  if (!toggleButton || !etlDemo) return;

  toggleButton.addEventListener("click", () => {
    const isHidden = etlDemo.hasAttribute("hidden");
    if (isHidden) {
      etlDemo.removeAttribute("hidden");
      toggleButton.textContent = "Ocultar ejemplo de ETL";
      return;
    }

    etlDemo.setAttribute("hidden", "hidden");
    toggleButton.textContent = "Ver ejemplo de ETL";
  });
}

const preguntas = [
  {
    pregunta: "¿Qué diferencia hay entre datos e información en BI?",
    opciones: [
      "Los datos son hechos sin contexto y la información es su análisis y organización.",
      "La información siempre reemplaza a los datos en una tabla.",
      "Los datos son decisiones y la información es un gráfico solo.",
      "No existe diferencia real entre ambos conceptos."
    ],
    correcta: 0,
    explicacion: "Los datos brutos requieren organización, análisis y contexto para convertirse en información útil para la toma de decisiones."
  },
  {
    pregunta: "¿Cuál es el objetivo principal del proceso ETL?",
    opciones: [
      "Preparar los datos para análisis mediante extracción, transformación y carga.",
      "Generar únicamente gráficos de Excel para presentaciones.",
      "Eliminar todos los datos del sistema operativo.",
      "Crear reportes a mano en documentos PDF."
    ],
    correcta: 0,
    explicacion: "ETL extrae información, la limpia y la prepara para su uso en análisis y dashboards."
  },
  {
    pregunta: "¿Qué indicador ayuda a decidir si un dato presenta un error de calidad?",
    opciones: [
      "Valores nulos, duplicados o inconsistencias de formato en un conjunto de registros.",
      "El número de columnas en el archivo.",
      "La fecha actual del sistema.",
      "La cantidad de usuarios conectados."
    ],
    correcta: 0,
    explicacion: "Los errores de calidad aparecen en datos vacíos, registros duplicados, valores inconsistentes o formatos desordenados."
  },
  {
    pregunta: "¿Por qué un dashboard resulta útil para la toma de decisiones?",
    opciones: [
      "Porque resume indicadores clave en una vista clara y facilita la comparación rápida.",
      "Porque reemplaza completamente la necesidad de analizar los datos.",
      "Porque evita cualquier interpretación humana del problema.",
      "Porque siempre muestra la verdad absoluta sin necesidad de contexto."
    ],
    correcta: 0,
    explicacion: "Los dashboards permiten visualizar tendencias, anomalías y desempeño a través de indicadores clave en un formato comprensible."
  },
  {
    pregunta: "¿Qué tipo de gráfico es más adecuado para comparar puntos acumulados por equipo en una temporada?",
    opciones: [
      "Gráfico de barras verticales.",
      "Gráfico de líneas con sólo un punto.",
      "Mapa geográfico sin datos.",
      "Diagrama de flujo sin escala."
    ],
    correcta: 0,
    explicacion: "Las barras permiten comparar de forma directa el rendimiento entre equipos."
  },
  {
    pregunta: "Si una empresa observa un aumento de gastos y una caída de ingresos, ¿qué paso del BI es más necesario?",
    opciones: [
      "Analizar el problema con datos por período, categoría y fuente de gasto.",
      "Cerrar la empresa inmediatamente sin revisión adicional.",
      "Cambiar la marca por completo sin mirar el historial.",
      "Ignorar el problema porque parece temporal."
    ],
    correcta: 0,
    explicacion: "La identificación del problema y el análisis basado en datos permiten explicar la causa y proponer alternativas."
  },
  {
    pregunta: "¿Cuál es la mejor definición de una decisión estratégica?",
    opciones: [
      "Una decisión orientada a objetivos de largo plazo y dirección general de la organización.",
      "Una revisión diaria de la caja de un negocio.",
      "Un ajuste de horario de un empleado sin contexto.",
      "Una decisión sin datos ni objetivos claros."
    ],
    correcta: 0,
    explicacion: "Las decisiones estratégicas marcan rumbo y requieren análisis amplio y anticipado."
  },
  {
    pregunta: "¿Qué sucede en la fase de transformación dentro del ETL?",
    opciones: [
      "Se corrigen formatos, inconsistencias y duplicados para mejorar la calidad del dato.",
      "Se eliminan todas las columnas para ahorrar espacio.",
      "Se convierten los datos en imágenes para presentarlos.",
      "Se cambian los nombres de los usuarios sin ningún criterio."
    ],
    correcta: 0,
    explicacion: "La transformación mejora la calidad de los datos antes de que se usen en análisis o dashboards."
  },
  {
    pregunta: "En un dashboard deportivo, ¿qué resultado debe interpretarse como una buena señal de rendimiento?",
    opciones: [
      "Un equipo con mayor diferencia de goles, más puntos y continuidad en resultados positivos.",
      "Cualquier equipo que tenga más fotos en redes sociales.",
      "Un equipo con menos partidos jugados por definición.",
      "Un equipo con más espectadores sin importar sus resultados."
    ],
    correcta: 0,
    explicacion: "La diferencia de goles, los puntos y la consistencia son indicadores clave del rendimiento deportivo."
  },
  {
    pregunta: "¿Qué función cumple la validación de datos antes del análisis?",
    opciones: [
      "Reducir errores y garantizar que la información sea confiable para la decisión.",
      "Aumentar los datos sin necesidad de inspeccionarlos.",
      "Cambiar el resultado esperado para ajustar un informe.",
      "Ocultar información de lo que no interesa."
    ],
    correcta: 0,
    explicacion: "La validación permite detectar problemas para que el análisis no se base en información defectuosa."
  },
  {
    pregunta: "¿Cuál de estas opciones representa mejor la diferencia entre decisiones tácticas y operativas?",
    opciones: [
      "Las tácticas ajustan la estrategia de corto plazo y las operativas mejoran ejecución diaria.",
      "Las tácticas sustituye completamente a las operativas.",
      "Las operativas solo se toman en el tablero de dirección.",
      "No existe diferencia real entre ambos tipos."
    ],
    correcta: 0,
    explicacion: "Las decisiones tácticas orientan el curso de acción y las operativas gestionan la ejecución diaria."
  },
  {
    pregunta: "Si un dashboard muestra varios indicadores a la vez, ¿qué es lo más importante antes de tomar una decisión?",
    opciones: [
      "Interpretar el contexto, comparar tendencias y revisar la calidad de los datos.",
      "Elegir solo la métrica más llamativa del diseño.",
      "Tomar la decisión sin leer explicación alguna.",
      "Cambiar todos los indicadores cada vez que se observe una variación."
    ],
    correcta: 0,
    explicacion: "La interpretación del contexto y la calidad de los datos es clave para convertir la información en decisión inteligente."
  }
];

const state = {
  preguntaActual: 0,
  puntos: 0,
  racha: 0,
  mejorResultado: Number(localStorage.getItem("biBestScore") || 0),
  insignias: JSON.parse(localStorage.getItem("biBadges") || "[]"),
  respondida: false,
  respuestasGuardadas: [],
  resultados: []
};

function inicializarCuestionario() {
  const quizContent = document.getElementById("quizContent");
  const quizResult = document.getElementById("quizResult");
  if (!quizContent || !quizResult) return;

  const renderQuestion = () => {
    const pregunta = preguntas[state.preguntaActual];
    if (!pregunta) return;

    const porcentaje = ((state.preguntaActual + 1) / preguntas.length) * 100;
    const progressBar = document.getElementById("quizProgressBar");
    const progressText = document.getElementById("quizProgressText");
    const scoreElement = document.getElementById("quizPuntos");
    const rachaElement = document.getElementById("quizRacha");

    if (progressBar) progressBar.style.width = `${porcentaje}%`;
    if (progressText) progressText.textContent = `Pregunta ${state.preguntaActual + 1} de ${preguntas.length}`;
    if (scoreElement) scoreElement.textContent = state.puntos;
    if (rachaElement) rachaElement.textContent = state.racha;

    quizResult.classList.add("hidden");
    quizResult.innerHTML = "";

    const preguntaElement = document.createElement("div");
    preguntaElement.innerHTML = `
      <h3 class="quiz-question">${pregunta.pregunta}</h3>
      <ul class="answer-list">
        ${pregunta.opciones
          .map(
            (opcion, index) => `
              <li>
                <button class="answer-option" type="button" data-index="${index}" aria-label="Respuesta ${index + 1}">
                  ${opcion}
                </button>
              </li>
            `
          )
          .join("")}
      </ul>
      <div class="quiz-actions">
        <button class="btn btn-ghost" id="btnPrevQuiz" type="button" ${state.preguntaActual === 0 ? "disabled" : ""}>Anterior</button>
        <button class="btn btn-primary" id="btnNextQuiz" type="button" disabled>Siguiente</button>
      </div>
    `;

    quizContent.innerHTML = "";
    quizContent.appendChild(preguntaElement);

    const options = quizContent.querySelectorAll(".answer-option");
    const nextButton = document.getElementById("btnNextQuiz");
    const prevButton = document.getElementById("btnPrevQuiz");

    options.forEach((option) => {
      option.addEventListener("click", () => {
        if (state.respondida) return;
        state.respondida = true;
        options.forEach((btn) => {
          btn.disabled = true;
          btn.classList.remove("selected");
        });
        option.classList.add("selected");
        nextButton.disabled = false;

        const selectedIndex = Number(option.dataset.index);
        const isCorrect = selectedIndex === pregunta.correcta;
        state.resultados[state.preguntaActual] = isCorrect;
        state.respuestasGuardadas[state.preguntaActual] = selectedIndex;

        if (isCorrect) {
          state.puntos += 100;
          state.racha += 1;
          option.classList.add("correct");
        } else {
          state.racha = 0;
          option.classList.add("incorrect");
          const correctButton = Array.from(options).find((btn) => Number(btn.dataset.index) === pregunta.correcta);
          if (correctButton) correctButton.classList.add("correct");
        }

        const feedback = document.createElement("div");
        feedback.className = `quiz-feedback ${isCorrect ? "success" : "error"}`;
        feedback.innerHTML = `
          <strong>${isCorrect ? "Correcto" : "Incorrecto"}.</strong>
          <div>${pregunta.explicacion}</div>
        `;
        quizContent.appendChild(feedback);

        const scoreElement = document.getElementById("quizPuntos");
        const rachaElement = document.getElementById("quizRacha");
        if (scoreElement) scoreElement.textContent = state.puntos;
        if (rachaElement) rachaElement.textContent = state.racha;

        const buttonText = isCorrect ? "Siguiente" : "Siguiente";
        nextButton.textContent = buttonText;
      });
    });

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        if (state.preguntaActual > 0) {
          state.preguntaActual -= 1;
          state.respondida = false;
          renderQuestion();
        }
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        if (!state.respondida) return;

        if (state.preguntaActual < preguntas.length - 1) {
          state.preguntaActual += 1;
          state.respondida = false;
          renderQuestion();
          return;
        }

        mostrarResultadoFinal();
      });
    }
  };

  const mostrarResultadoFinal = () => {
    const totalPreguntas = preguntas.length;
    const aciertos = state.resultados.filter(Boolean).length;
    const porcentaje = Math.round((aciertos / totalPreguntas) * 100);

    let nivel = "Principiante";
    if (porcentaje >= 80) nivel = "Experto";
    else if (porcentaje >= 50) nivel = "Intermedio";

    const medallas = [];
    if (aciertos >= 3) medallas.push("Explorador de datos");
    if (aciertos >= 6) medallas.push("Maestro ETL");
    if (aciertos >= 9) medallas.push("Analista BI");

    if (porcentaje > state.mejorResultado) {
      state.mejorResultado = porcentaje;
      localStorage.setItem("biBestScore", String(porcentaje));
    }

    const storedBadges = JSON.parse(localStorage.getItem("biBadges") || "[]");
    medallas.forEach((badge) => {
      if (!storedBadges.includes(badge)) storedBadges.push(badge);
    });
    localStorage.setItem("biBadges", JSON.stringify(storedBadges));
    state.insignias = storedBadges;

    quizContent.innerHTML = "";
    quizResult.classList.remove("hidden");
    quizResult.innerHTML = `
      <h3>Resultado final</h3>
      <p>Tu puntuación fue <strong>${state.puntos}</strong> puntos.</p>
      <p>Porcentaje de aciertos: <strong>${porcentaje}%</strong></p>
      <p>Nivel: <strong>${nivel}</strong></p>
      <p>Mejor resultado guardado: <strong>${state.mejorResultado}%</strong></p>
      <div class="quiz-badges">
        ${medallas.length ? medallas.map((badge) => `<span class="quiz-badge">${badge}</span>`).join("") : '<span class="quiz-badge">Sigue practicando</span>'}
      </div>
      <div class="quiz-actions">
        <button class="btn btn-primary" type="button" id="btnRepeatQuiz">Repetir cuestionario</button>
        <button class="btn btn-ghost" type="button" id="btnBackStudy">Volver a estudiar</button>
      </div>
    `;

    document.getElementById("btnRepeatQuiz").addEventListener("click", () => resetQuiz());
    document.getElementById("btnBackStudy").addEventListener("click", () => {
      document.getElementById("fundamentos").scrollIntoView({ behavior: "smooth" });
    });

    const scoreElement = document.getElementById("quizPuntos");
    const rachaElement = document.getElementById("quizRacha");
    if (scoreElement) scoreElement.textContent = state.puntos;
    if (rachaElement) rachaElement.textContent = state.racha;
  };

  const resetQuiz = () => {
    state.preguntaActual = 0;
    state.puntos = 0;
    state.racha = 0;
    state.respondida = false;
    state.respuestasGuardadas = [];
    state.resultados = [];
    renderQuestion();
  };

  renderQuestion();
}

const equipos = ["Equipo A", "Equipo B", "Equipo C", "Equipo D", "Equipo E", "Equipo F"];

const partidos = [
  { id: 1, jornada: 1, local: "Equipo A", visitante: "Equipo B", golesLocal: 2, golesVisitante: 1, estado: "disputado" },
  { id: 2, jornada: 1, local: "Equipo C", visitante: "Equipo D", golesLocal: 1, golesVisitante: 1, estado: "disputado" },
  { id: 3, jornada: 1, local: "Equipo E", visitante: "Equipo F", golesLocal: 2, golesVisitante: 0, estado: "disputado" },
  { id: 4, jornada: 2, local: "Equipo A", visitante: "Equipo C", golesLocal: 1, golesVisitante: 0, estado: "disputado" },
  { id: 5, jornada: 2, local: "Equipo D", visitante: "Equipo E", golesLocal: 2, golesVisitante: 2, estado: "disputado" },
  { id: 6, jornada: 2, local: "Equipo B", visitante: "Equipo F", golesLocal: 3, golesVisitante: 1, estado: "disputado" },
  { id: 7, jornada: 3, local: "Equipo A", visitante: "Equipo D", golesLocal: 3, golesVisitante: 2, estado: "disputado" },
  { id: 8, jornada: 3, local: "Equipo B", visitante: "Equipo E", golesLocal: 1, golesVisitante: 1, estado: "disputado" },
  { id: 9, jornada: 3, local: "Equipo C", visitante: "Equipo F", golesLocal: 0, golesVisitante: 2, estado: "disputado" },
  { id: 10, jornada: 4, local: "Equipo A", visitante: "Equipo E", golesLocal: 2, golesVisitante: 1, estado: "disputado" },
  { id: 11, jornada: 4, local: "Equipo B", visitante: "Equipo C", golesLocal: 3, golesVisitante: 0, estado: "disputado" },
  { id: 12, jornada: 4, local: "Equipo D", visitante: "Equipo F", golesLocal: 1, golesVisitante: 0, estado: "disputado" },
  { id: 13, jornada: 5, local: "Equipo A", visitante: "Equipo F", golesLocal: 2, golesVisitante: 2, estado: "disputado" },
  { id: 14, jornada: 5, local: "Equipo B", visitante: "Equipo D", golesLocal: 1, golesVisitante: 2, estado: "disputado" },
  { id: 15, jornada: 5, local: "Equipo C", visitante: "Equipo E", golesLocal: 1, golesVisitante: 1, estado: "disputado" },
  { id: 16, jornada: 6, local: "Equipo A", visitante: "Equipo B", golesLocal: 1, golesVisitante: 3, estado: "disputado" },
  { id: 17, jornada: 6, local: "Equipo C", visitante: "Equipo E", golesLocal: 2, golesVisitante: 1, estado: "disputado" },
  { id: 18, jornada: 6, local: "Equipo D", visitante: "Equipo F", golesLocal: 0, golesVisitante: 1, estado: "disputado" },
  { id: 19, jornada: 7, local: "Equipo A", visitante: "Equipo E", golesLocal: null, golesVisitante: null, estado: "pendiente" },
  { id: 20, jornada: 7, local: "Equipo C", visitante: "Equipo F", golesLocal: null, golesVisitante: null, estado: "pendiente" }
];

let chartInstances = {};

function inicializarDashboard() {
  const jornadaFiltro = document.getElementById("jornadaFiltro");
  const equipoFiltro = document.getElementById("equipoFiltro");
  const periodoFiltro = document.getElementById("periodoFiltro");
  const btnReset = document.getElementById("resetFilters");
  const exportClasificacionCsv = document.getElementById("exportClasificacionCsv");
  const exportPartidosCsv = document.getElementById("exportPartidosCsv");

  if (!jornadaFiltro || !equipoFiltro || !periodoFiltro || !btnReset) return;

  cargarOpcionesFiltros();
  jornadaFiltro.addEventListener("change", actualizarDashboard);
  equipoFiltro.addEventListener("change", actualizarDashboard);
  periodoFiltro.addEventListener("change", actualizarDashboard);
  btnReset.addEventListener("click", () => {
    jornadaFiltro.value = "todos";
    equipoFiltro.value = "todos";
    periodoFiltro.value = "todos";
    actualizarDashboard();
  });

  if (exportClasificacionCsv) exportClasificacionCsv.addEventListener("click", () => exportarCSV(generarClasificacion(filtrarPartidos()), "clasificacion.csv"));
  if (exportPartidosCsv) exportPartidosCsv.addEventListener("click", () => exportarCSV(filtrarPartidos(), "partidos-filtrados.csv"));

  actualizarDashboard();
}

function cargarOpcionesFiltros() {
  const jornadaFiltro = document.getElementById("jornadaFiltro");
  const equipoFiltro = document.getElementById("equipoFiltro");

  const jornadas = [...new Set(partidos.map((partido) => partido.jornada))].sort((a, b) => a - b);

  jornadaFiltro.innerHTML = ['<option value="todos">Todas</option>']
    .concat(jornadas.map((jornada) => `<option value="${jornada}">Jornada ${jornada}</option>`))
    .join("");

  equipoFiltro.innerHTML = ['<option value="todos">Todos los equipos</option>']
    .concat(equipos.map((equipo) => `<option value="${equipo}">${equipo}</option>`))
    .join("");
}

function filtrarPartidos() {
  const jornadaFiltro = document.getElementById("jornadaFiltro");
  const equipoFiltro = document.getElementById("equipoFiltro");
  const periodoFiltro = document.getElementById("periodoFiltro");

  const jornadaSeleccionada = jornadaFiltro ? jornadaFiltro.value : "todos";
  const equipoSeleccionado = equipoFiltro ? equipoFiltro.value : "todos";
  const periodoSeleccionado = periodoFiltro ? periodoFiltro.value : "todos";

  let filtrados = partidos.filter((partido) => {
    const jornadaValida = jornadaSeleccionada === "todos" || Number(partido.jornada) === Number(jornadaSeleccionada);
    const equipoValido = equipoSeleccionado === "todos" || partido.local === equipoSeleccionado || partido.visitante === equipoSeleccionado;

    let periodoValido = true;
    if (periodoSeleccionado === "inicio") {
      periodoValido = Number(partido.jornada) <= 3;
    } else if (periodoSeleccionado === "fin") {
      periodoValido = Number(partido.jornada) > 3;
    }

    return jornadaValida && equipoValido && periodoValido;
  });

  return filtrados.filter((partido) => partido.estado === "disputado");
}

function generarClasificacion(partidosFiltrados = filtrarPartidos()) {
  const resultados = equipos.map((equipo) => {
    const encuentros = partidosFiltrados.filter((partido) => partido.local === equipo || partido.visitante === equipo);
    let partidosJugados = 0;
    let victorias = 0;
    let empates = 0;
    let derrotas = 0;
    let golesFavor = 0;
    let golesContra = 0;
    let puntos = 0;

    encuentros.forEach((encuentro) => {
      partidosJugados += 1;
      if (encuentro.local === equipo) {
        golesFavor += Number(encuentro.golesLocal || 0);
        golesContra += Number(encuentro.golesVisitante || 0);
        if (encuentro.golesLocal > encuentro.golesVisitante) {
          victorias += 1;
          puntos += 3;
        } else if (encuentro.golesLocal === encuentro.golesVisitante) {
          empates += 1;
          puntos += 1;
        } else {
          derrotas += 1;
        }
      }

      if (encuentro.visitante === equipo) {
        golesFavor += Number(encuentro.golesVisitante || 0);
        golesContra += Number(encuentro.golesLocal || 0);
        if (encuentro.golesVisitante > encuentro.golesLocal) {
          victorias += 1;
          puntos += 3;
        } else if (encuentro.golesVisitante === encuentro.golesLocal) {
          empates += 1;
          puntos += 1;
        } else {
          derrotas += 1;
        }
      }
    });

    return {
      equipo,
      partidosJugados,
      victorias,
      empates,
      derrotas,
      golesFavor,
      golesContra,
      diferenciaGoles: golesFavor - golesContra,
      puntos
    };
  }).filter((equipo) => equipo.partidosJugados > 0);

  return resultados.sort((a, b) => {
    if (b.puntos !== a.puntos) return b.puntos - a.puntos;
    if (b.diferenciaGoles !== a.diferenciaGoles) return b.diferenciaGoles - a.diferenciaGoles;
    return b.golesFavor - a.golesFavor;
  });
}

function actualizarDashboard() {
  const partidosFiltrados = filtrarPartidos();
  const clasificacion = generarClasificacion(partidosFiltrados);
  actualizarIndicadores(partidosFiltrados, clasificacion);
  actualizarGraficos(partidosFiltrados, clasificacion);
  renderizarTablaPartidos(partidosFiltrados);
  renderizarTablaClasificacion(clasificacion);
}

function calcularResumenResultados(clasificacion) {
  const victorias = clasificacion.reduce((total, equipo) => total + Number(equipo.victorias || 0), 0);
  const empates = clasificacion.reduce((total, equipo) => total + Number(equipo.empates || 0), 0);
  const derrotas = clasificacion.reduce((total, equipo) => total + Number(equipo.derrotas || 0), 0);

  return { victorias, empates, derrotas };
}

function actualizarIndicadores(partidosFiltrados, clasificacion) {
  const totalPartidos = partidosFiltrados.length;
  const golesTotales = partidosFiltrados.reduce((total, partido) => total + Number(partido.golesLocal || 0) + Number(partido.golesVisitante || 0), 0);
  const promedioGoles = totalPartidos > 0 ? (golesTotales / totalPartidos).toFixed(2) : "Sin datos disponibles";
  const lider = clasificacion.length ? clasificacion[0] : null;
  const resumen = calcularResumenResultados(clasificacion);

  const setMetric = (id, value) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.textContent = value;
  };

  setMetric("kpiPartidos", totalPartidos > 0 ? totalPartidos : "Sin datos disponibles");
  setMetric("kpiGoles", totalPartidos > 0 ? golesTotales : "Sin datos disponibles");
  setMetric("kpiPromedio", totalPartidos > 0 ? `${promedioGoles}` : "Sin datos disponibles");
  setMetric("kpiLider", lider ? `${lider.equipo} (${lider.puntos} pts)` : "Sin datos disponibles");
  setMetric("kpiVictorias", resumen.victorias > 0 ? resumen.victorias : "Sin datos disponibles");
  setMetric("kpiEmpates", resumen.empates > 0 ? resumen.empates : "Sin datos disponibles");
}

function actualizarGraficos(partidosFiltrados, clasificacion) {
  if (typeof Chart === "undefined") {
    document.querySelectorAll("canvas").forEach((canvas) => {
      const parent = canvas.parentElement;
      if (parent) {
        parent.innerHTML = '<p class="chart-fallback">No se pudo cargar Chart.js. Verifica la conexión o intenta recargar la página.</p>';
      }
    });
    return;
  }

  const puntosData = clasificacion.map((equipo) => ({ label: equipo.equipo, value: equipo.puntos }));
  const resultadosData = calcularResumenResultados(clasificacion);

  const golesPorJornada = [];
  const jornadas = [...new Set(partidosFiltrados.map((partido) => partido.jornada))].sort((a, b) => a - b);
  jornadas.forEach((jornada) => {
    const jornadaPartidos = partidosFiltrados.filter((partido) => partido.jornada === jornada);
    const totalGoles = jornadaPartidos.reduce((total, partido) => total + Number(partido.golesLocal || 0) + Number(partido.golesVisitante || 0), 0);
    golesPorJornada.push({ label: `J${jornada}`, value: totalGoles });
  });

  const golesPorEquipo = clasificacion.map((equipo) => ({
    label: equipo.equipo,
    favor: equipo.golesFavor,
    contra: equipo.golesContra
  }));

  const golesLocal = partidosFiltrados.reduce((total, partido) => total + Number(partido.golesLocal || 0), 0);
  const golesVisitante = partidosFiltrados.reduce((total, partido) => total + Number(partido.golesVisitante || 0), 0);

  const promedioPorJornada = jornadas.map((jornada) => {
    const jornadaPartidos = partidosFiltrados.filter((partido) => partido.jornada === jornada);
    const totalGoles = jornadaPartidos.reduce((total, partido) => total + Number(partido.golesLocal || 0) + Number(partido.golesVisitante || 0), 0);
    const media = jornadaPartidos.length ? totalGoles / jornadaPartidos.length : 0;
    return { label: `J${jornada}`, value: Number(media.toFixed(2)) };
  });

  const barConfig = {
    type: "bar",
    data: {
      labels: puntosData.map((item) => item.label),
      datasets: [{
        label: "Puntos",
        data: puntosData.map((item) => item.value),
        backgroundColor: "#3a86ff",
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => `${context.dataset.label}: ${context.parsed.y} puntos`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "Puntos" }
        },
        x: {
          title: { display: true, text: "Equipos" }
        }
      }
    }
  };

  const donutConfig = {
    type: "doughnut",
    data: {
      labels: ["Victorias", "Empates", "Derrotas"],
      datasets: [{
        data: [resultadosData.victorias, resultadosData.empates, resultadosData.derrotas],
        backgroundColor: ["#1dbf73", "#ffb703", "#ef476f"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" },
        title: { display: true, text: "Distribución de resultados por equipo" }
      }
    }
  };

  const lineConfig = {
    type: "line",
    data: {
      labels: golesPorJornada.map((item) => item.label),
      datasets: [{
        label: "Goles registrados",
        data: golesPorJornada.map((item) => item.value),
        borderColor: "#1e63d6",
        backgroundColor: "rgba(30, 99, 214, 0.12)",
        fill: true,
        tension: 0.35
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "Goles" }
        },
        x: {
          title: { display: true, text: "Jornada" }
        }
      }
    }
  };

  const horizontalConfig = {
    type: "bar",
    data: {
      labels: golesPorEquipo.map((item) => item.label),
      datasets: [
        { label: "Goles a favor", data: golesPorEquipo.map((item) => item.favor), backgroundColor: "#3a86ff" },
        { label: "Goles en contra", data: golesPorEquipo.map((item) => item.contra), backgroundColor: "#ef476f" }
      ]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" }
      },
      scales: {
        x: { beginAtZero: true, title: { display: true, text: "Goles" } },
        y: { title: { display: true, text: "Equipo" } }
      }
    }
  };

  const localVisitanteConfig = {
    type: "bar",
    data: {
      labels: ["Local", "Visitante"],
      datasets: [{
        label: "Goles",
        data: [golesLocal, golesVisitante],
        backgroundColor: ["#1dbf73", "#0d2343"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { display: true, text: "Comparación de goles como local y visitante" }
      },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: "Goles" } }
      }
    }
  };

  const areaConfig = {
    type: "line",
    data: {
      labels: promedioPorJornada.map((item) => item.label),
      datasets: [{
        label: "Promedio de goles",
        data: promedioPorJornada.map((item) => item.value),
        backgroundColor: "rgba(29, 191, 115, 0.18)",
        borderColor: "#1dbf73",
        fill: true,
        tension: 0.28
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: "Promedio" } },
        x: { title: { display: true, text: "Jornada" } }
      }
    }
  };

  const chartOrder = [
    ["chartPuntos", barConfig],
    ["chartResultados", donutConfig],
    ["chartGolesJornada", lineConfig],
    ["chartGolesEquipo", horizontalConfig],
    ["chartLocalVisitante", localVisitanteConfig],
    ["chartPromedioJornada", areaConfig]
  ];

  chartOrder.forEach(([id, config]) => {
    const canvas = document.getElementById(id);
    if (!canvas) return;

    if (chartInstances[id]) {
      chartInstances[id].destroy();
    }

    chartInstances[id] = new Chart(canvas, config);
  });
}

function renderizarTablaClasificacion(clasificacion) {
  const body = document.getElementById("clasificacionBody");
  if (!body) return;

  if (!clasificacion.length) {
    body.innerHTML = '<tr><td colspan="10">Sin datos disponibles</td></tr>';
    return;
  }

  body.innerHTML = clasificacion
    .map((equipo, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${equipo.equipo}</td>
        <td>${equipo.partidosJugados}</td>
        <td>${equipo.victorias}</td>
        <td>${equipo.empates}</td>
        <td>${equipo.derrotas}</td>
        <td>${equipo.golesFavor}</td>
        <td>${equipo.golesContra}</td>
        <td>${equipo.diferenciaGoles}</td>
        <td>${equipo.puntos}</td>
      </tr>
    `)
    .join("");
}

function renderizarTablaPartidos(partidosFiltrados) {
  const body = document.getElementById("partidosBody");
  if (!body) return;

  if (!partidosFiltrados.length) {
    body.innerHTML = '<tr><td colspan="6">Sin datos disponibles</td></tr>';
    return;
  }

  body.innerHTML = partidosFiltrados
    .map((partido) => `
      <tr>
        <td>${partido.jornada}</td>
        <td>${partido.local}</td>
        <td>${partido.golesLocal ?? "-"}</td>
        <td>${partido.golesVisitante ?? "-"}</td>
        <td>${partido.visitante}</td>
        <td><span class="status-pill ${partido.estado}">${partido.estado === "disputado" ? "Disputado" : "Pendiente"}</span></td>
      </tr>
    `)
    .join("");
}

function exportarCSV(data, filename) {
  if (!data || !data.length) {
    alert("No hay datos disponibles para exportar.");
    return;
  }

  const rows = Array.isArray(data) ? data : [data];
  const headers = Object.keys(rows[0]);
  const csv = [headers.join(",")]
    .concat(
      rows.map((row) => headers.map((header) => `"${String(row[header] ?? "").replace(/"/g, '""')}"`).join(","))
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

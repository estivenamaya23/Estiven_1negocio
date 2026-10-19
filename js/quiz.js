const quizApp = (() => {
  const quizData = [
    {
      question: '¿Qué diferencia existe entre datos e información en BI?',
      options: [
        'Los datos son hechos sin contexto y la información es el resultado de analizarlos y organizarlos.',
        'Los datos siempre son gráficos y la información es texto.',
        'La información no requiere análisis.',
        'No existe diferencia entre ambos conceptos.'
      ],
      answer: 0,
      explanation: 'La información nace cuando los datos se organizan, validan y analizan para generar sentido.'
    },
    {
      question: '¿Cuál es el objetivo principal del proceso ETL?',
      options: [
        'Preparar los datos para análisis mediante extracción, transformación y carga.',
        'Cambiar el diseño del sitio web.',
        'Eliminar todos los informes del negocio.',
        'Generar solamente métricas sin validación.'
      ],
      answer: 0,
      explanation: 'ETL permite extraer, limpiar y cargar datos en una estructura útil para reportes y análisis.'
    },
    {
      question: '¿Qué es un dashboard?',
      options: [
        'Una vista visual que reúne indicadores clave y facilita la decisiones.',
        'Un documento con texto únicamente.',
        'Una base de datos sin estructura.',
        'Una herramienta para crear códigos.'
      ],
      answer: 0,
      explanation: 'Los dashboards convierten métricas complejas en información clara y fácil de interpretar.'
    },
    {
      question: '¿Qué indica una decisión proactiva en BI?',
      options: [
        'Actuar antes de que se produzca un problema grave, usando alertas y métricas.',
        'Esperar a que el problema ocurra para reaccionar.',
        'No usar datos para tomar decisiones.',
        'Cambiar la estrategia sin validar resultados.'
      ],
      answer: 0,
      explanation: 'La proactividad permite anticipar riesgos y oportunidades antes de que impacten la operación.'
    },
    {
      question: '¿Cuál de estos elementos es clave para garantizar calidad de datos?',
      options: [
        'Eliminar duplicados, corregir nulos y validar formatos.',
        'Duplicar los datos para asegurar su valor.',
        'Ocultar información sin revisar.',
        'Cambiar los nombres sin criterio.'
      ],
      answer: 0,
      explanation: 'La calidad de datos depende de la limpieza, la validación y la consistencia de la información.'
    },
    {
      question: '¿Qué tipo de decisión suele estar enfocada en objetivos de largo plazo?',
      options: [
        'Estratégica.',
        'Técnica puntual.',
        'Operativa rutinaria.',
        'Manual y aislada.'
      ],
      answer: 0,
      explanation: 'Las decisiones estratégicas orientan la dirección del negocio a mediano o largo plazo.'
    },
    {
      question: '¿Cómo ayuda BI a un equipo comercial?',
      options: [
        'Analizando ventas, clientes y tendencias para ajustar estrategias.',
        'Eliminando la necesidad de planificar.',
        'Sincronizando todos los datos al azar.',
        'Desestimando indicadores de rendimiento.'
      ],
      answer: 0,
      explanation: 'BI ayuda a identificar oportunidades, patrones y riesgos para mejorar la gestión comercial.'
    },
    {
      question: '¿Qué es importante al interpretar un KPI?',
      options: [
        'Compararlo con contexto, historial y objetivo de negocio.',
        'Usarlo sin revisar su origen.',
        'Tomarlo como verdad absoluta sin contexto.',
        'No compartirlo con el equipo.'
      ],
      answer: 0,
      explanation: 'Un KPI debe analizarse dentro de su contexto para evitar conclusiones erróneas.'
    },
    {
      question: '¿Cuál es una buena práctica en un proceso ETL?',
      options: [
        'Validar datos antes de cargarlos para reportes analíticos.',
        'Cargar datos sin limpiar formatos.',
        'Guardar duplicados para mayor volumen.',
        'Quitar todas las columnas de referencia.'
      ],
      answer: 0,
      explanation: 'La validación evita errores en análisis, dashboards y decisiones.'
    },
    {
      question: '¿Qué aporta la visualización de datos en BI?',
      options: [
        'Facilita la comprensión rápida de tendencias y anomalías.',
        'Reemplaza por completo el juicio humano.',
        'Elimina la necesidad de análisis.',
        'Reduce toda la información a una sola cifra.'
      ],
      answer: 0,
      explanation: 'La visualización permite detectar patrones y comunicar hallazgos de manera clara.'
    }
  ];

  const state = {
    index: 0,
    score: 0,
    hintsUsed: 0,
    maxHints: 2,
    answered: false,
    isFinished: false,
    bestScore: Number(localStorage.getItem('biBestScore')) || 0
  };

  function init() {
    const root = document.getElementById('quizContainer');
    if (!root) return;

    root.innerHTML = '';
    renderQuestion(root);
  }

  function renderQuestion(root) {
    const current = quizData[state.index];
    const progress = ((state.index + 1) / quizData.length) * 100;

    const html = `
      <div class="quiz-shell">
        <div class="quiz-header">
          <div class="flex-grow-1">
            <div class="small text-uppercase fw-bold text-primary">Pregunta ${state.index + 1} / ${quizData.length}</div>
            <div class="progress mt-2">
              <div class="progress-bar" role="progressbar" aria-label="Progreso del cuestionario" aria-valuenow="${Math.round(progress)}" aria-valuemin="0" aria-valuemax="100" style="width: ${progress}%"></div>
            </div>
          </div>
          <span class="quiz-score">Puntuación: ${state.score} pts</span>
        </div>

        <h3 class="fw-bold mb-3">${current.question}</h3>
        <ul class="answer-list" aria-live="polite">
          ${current.options
            .map(
              (option, idx) => `
                <li>
                  <button class="answer-option" type="button" data-index="${idx}" aria-label="Seleccionar opción ${idx + 1}">${option}</button>
                </li>
              `
            )
            .join('')}
        </ul>

        <div class="quiz-actions">
          <div class="d-flex gap-2 flex-wrap">
            <button id="fiftyButton" class="btn btn-outline-primary btn-sm" type="button" ${state.hintsUsed >= state.maxHints || state.answered ? 'disabled' : ''}>50/50</button>
            <button id="skipButton" class="btn btn-outline-secondary btn-sm" type="button" ${state.hintsUsed >= state.maxHints || state.answered ? 'disabled' : ''}>Saltar</button>
          </div>
          <button id="nextButton" class="btn btn-primary" type="button" ${state.answered ? '' : 'disabled'}>${state.index === quizData.length - 1 ? 'Finalizar' : 'Siguiente'}</button>
        </div>
      </div>
    `;

    root.innerHTML = html;

    const optionButtons = root.querySelectorAll('.answer-option');
    optionButtons.forEach((button) => {
      button.addEventListener('click', () => chooseAnswer(button, root));
    });

    const fiftyButton = document.getElementById('fiftyButton');
    const skipButton = document.getElementById('skipButton');
    const nextButton = document.getElementById('nextButton');

    fiftyButton?.addEventListener('click', () => useFifty(root));
    skipButton?.addEventListener('click', () => skipQuestion(root));
    nextButton?.addEventListener('click', () => nextQuestion(root));
  }

  function chooseAnswer(button, root) {
    if (state.answered) return;

    const current = quizData[state.index];
    const selectedIndex = Number(button.dataset.index);
    const selectedButtons = root.querySelectorAll('.answer-option');

    state.answered = true;

    selectedButtons.forEach((btn) => {
      btn.disabled = true;
      btn.classList.remove('selected');
      if (Number(btn.dataset.index) === current.answer) {
        btn.classList.add('correct');
      }
    });

    button.classList.add('selected');

    if (selectedIndex === current.answer) {
      state.score += 10;
      button.classList.add('correct');
      showFeedback(root, true, current.explanation);
    } else {
      button.classList.add('incorrect');
      showFeedback(root, false, current.explanation);
    }

    const nextButton = document.getElementById('nextButton');
    nextButton.disabled = false;

    const fiftyButton = document.getElementById('fiftyButton');
    const skipButton = document.getElementById('skipButton');
    fiftyButton.disabled = true;
    skipButton.disabled = true;
  }

  function useFifty(root) {
    if (state.hintsUsed >= state.maxHints || state.answered) return;

    state.hintsUsed += 1;
    const current = quizData[state.index];
    const wrongIndexes = [0, 1, 2, 3].filter((idx) => idx !== current.answer);

    const toHide = wrongIndexes.slice(0, 2);
    root.querySelectorAll('.answer-option').forEach((button) => {
      const idx = Number(button.dataset.index);
      if (toHide.includes(idx)) {
        button.style.display = 'none';
      }
    });

    document.getElementById('fiftyButton').disabled = true;
    document.getElementById('skipButton').disabled = state.hintsUsed >= state.maxHints;
  }

  function skipQuestion(root) {
    if (state.hintsUsed >= state.maxHints || state.answered) return;

    state.hintsUsed += 1;
    state.answered = true;
    nextQuestion(root);
  }

  function nextQuestion(root) {
    if (!state.answered && !state.isFinished) return;

    if (state.index < quizData.length - 1) {
      state.index += 1;
      state.answered = false;
      renderQuestion(root);
      return;
    }

    finishQuiz(root);
  }

  function showFeedback(root, isCorrect, explanation) {
    const feedback = document.createElement('div');
    feedback.className = `quiz-feedback ${isCorrect ? 'success' : 'error'}`;
    feedback.innerHTML = `
      <strong>${isCorrect ? 'Correcto' : 'Incorrecto'}.</strong>
      <div class="mt-2">${explanation}</div>
    `;
    root.appendChild(feedback);
  }

  function finishQuiz(root) {
    state.isFinished = true;

    const total = quizData.length * 10;
    const percentage = Math.round((state.score / total) * 100);
    let medal = '🎯 Sigue practicando';
    if (percentage >= 90) medal = '🥇 Oro';
    else if (percentage >= 70) medal = '🥈 Plata';
    else if (percentage >= 50) medal = '🥉 Bronce';

    if (state.score > state.bestScore) {
      state.bestScore = state.score;
      localStorage.setItem('biBestScore', String(state.score));
    }

    root.innerHTML = `
      <div class="quiz-result">
        <h3 class="fw-bold mb-3">Resultado final</h3>
        <p class="mb-2">Puntaje total: <strong>${state.score}</strong> puntos</p>
        <p class="mb-2">Porcentaje: <strong>${percentage}%</strong></p>
        <p class="mb-3">Medalla: <strong>${medal}</strong></p>
        <div class="badge-row mb-3">
          <span class="medal">🏆 Mejor puntaje: ${state.bestScore}</span>
        </div>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-light" type="button" id="restartQuiz">Reiniciar</button>
          <a class="btn btn-outline-light" href="index.html#bi-section">Volver a estudiar</a>
        </div>
      </div>
    `;

    const restartButton = document.getElementById('restartQuiz');
    restartButton?.addEventListener('click', () => resetQuiz(root));
  }

  function resetQuiz(root) {
    state.index = 0;
    state.score = 0;
    state.hintsUsed = 0;
    state.answered = false;
    state.isFinished = false;
    renderQuestion(root);
  }

  return { init, resetQuiz };
})();

window.quizApp = quizApp;

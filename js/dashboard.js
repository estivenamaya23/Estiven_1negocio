const dashboardData = {
  teams: [
    'LDU Quito',
    'Barcelona SC',
    'Emelec',
    'Independiente del Valle',
    'Delfín SC',
    'Mushuc Runa',
    'El Nacional',
    'Aucas'
  ],
  matches: [
    { round: 1, home: 'LDU Quito', away: 'Barcelona SC', homeGoals: 2, awayGoals: 1 },
    { round: 1, home: 'Emelec', away: 'Delfín SC', homeGoals: 1, awayGoals: 1 },
    { round: 1, home: 'Independiente del Valle', away: 'Aucas', homeGoals: 2, awayGoals: 0 },
    { round: 1, home: 'Mushuc Runa', away: 'El Nacional', homeGoals: 0, awayGoals: 1 },
    { round: 2, home: 'Barcelona SC', away: 'Emelec', homeGoals: 3, awayGoals: 2 },
    { round: 2, home: 'Delfín SC', away: 'Mushuc Runa', homeGoals: 1, awayGoals: 2 },
    { round: 2, home: 'Aucas', away: 'LDU Quito', homeGoals: 0, awayGoals: 2 },
    { round: 2, home: 'El Nacional', away: 'Independiente del Valle', homeGoals: 1, awayGoals: 2 },
    { round: 3, home: 'LDU Quito', away: 'Mushuc Runa', homeGoals: 2, awayGoals: 1 },
    { round: 3, home: 'Barcelona SC', away: 'Aucas', homeGoals: 1, awayGoals: 1 },
    { round: 3, home: 'Emelec', away: 'El Nacional', homeGoals: 2, awayGoals: 2 },
    { round: 3, home: 'Independiente del Valle', away: 'Delfín SC', homeGoals: 3, awayGoals: 1 },
    { round: 4, home: 'Delfín SC', away: 'LDU Quito', homeGoals: 0, awayGoals: 3 },
    { round: 4, home: 'Mushuc Runa', away: 'Barcelona SC', homeGoals: 1, awayGoals: 2 },
    { round: 4, home: 'Aucas', away: 'Emelec', homeGoals: 1, awayGoals: 2 },
    { round: 4, home: 'El Nacional', away: 'Independiente del Valle', homeGoals: 0, awayGoals: 1 },
    { round: 5, home: 'LDU Quito', away: 'El Nacional', homeGoals: 2, awayGoals: 0 },
    { round: 5, home: 'Barcelona SC', away: 'Delfín SC', homeGoals: 2, awayGoals: 0 },
    { round: 5, home: 'Emelec', away: 'Independiente del Valle', homeGoals: 1, awayGoals: 1 },
    { round: 5, home: 'Mushuc Runa', away: 'Aucas', homeGoals: 2, awayGoals: 1 },
    { round: 6, home: 'Independiente del Valle', away: 'LDU Quito', homeGoals: 1, awayGoals: 1 },
    { round: 6, home: 'Delfín SC', away: 'Aucas', homeGoals: 2, awayGoals: 1 },
    { round: 6, home: 'El Nacional', away: 'Barcelona SC', homeGoals: 0, awayGoals: 3 },
    { round: 6, home: 'Mushuc Runa', away: 'Emelec', homeGoals: 1, awayGoals: 2 },
    { round: 7, home: 'Emelec', away: 'LDU Quito', homeGoals: 0, awayGoals: 1 },
    { round: 7, home: 'Barcelona SC', away: 'Independiente del Valle', homeGoals: 2, awayGoals: 2 },
    { round: 7, home: 'Aucas', away: 'El Nacional', homeGoals: 2, awayGoals: 1 },
    { round: 7, home: 'Delfín SC', away: 'Mushuc Runa', homeGoals: 2, awayGoals: 2 },
    { round: 8, home: 'LDU Quito', away: 'Delfín SC', homeGoals: 2, awayGoals: 0 },
    { round: 8, home: 'Independiente del Valle', away: 'Emelec', homeGoals: 3, awayGoals: 1 },
    { round: 8, home: 'El Nacional', away: 'Mushuc Runa', homeGoals: 1, awayGoals: 1 },
    { round: 8, home: 'Aucas', away: 'Barcelona SC', homeGoals: 0, awayGoals: 2 }
  ],
  scorers: [
    { player: 'A. Valencia', team: 'LDU Quito', goals: 8 },
    { player: 'D. S. Valenzuela', team: 'Barcelona SC', goals: 7 },
    { player: 'J. Cazares', team: 'Independiente del Valle', goals: 6 },
    { player: 'M. Cevallos', team: 'Emelec', goals: 5 },
    { player: 'E. Mena', team: 'Delfín SC', goals: 5 },
    { player: 'S. Rueda', team: 'Mushuc Runa', goals: 4 }
  ]
};

let chartInstances = {};

const dashboardApp = {
  init() {
    const jornadaFilter = document.getElementById('jornadaFilter');
    const teamFilter = document.getElementById('teamFilter');
    const resetBtn = document.getElementById('resetFilters');
    const exportButton = document.getElementById('exportStanding');

    if (!jornadaFilter || !teamFilter || !resetBtn) return;

    this.populateFilters();
    jornadaFilter.addEventListener('change', () => this.renderDashboard());
    teamFilter.addEventListener('change', () => this.renderDashboard());
    resetBtn.addEventListener('click', () => {
      jornadaFilter.value = 'all';
      teamFilter.value = 'all';
      this.renderDashboard();
    });
    exportButton?.addEventListener('click', () => {
      const standings = this.getStandings(this.getFilteredMatches());
      this.exportCsv(standings, 'tabla-posiciones.csv');
    });

    this.renderDashboard();
  },

  populateFilters() {
    const jornadaFilter = document.getElementById('jornadaFilter');
    const teamFilter = document.getElementById('teamFilter');
    const rounds = [...new Set(dashboardData.matches.map((match) => match.round))].sort((a, b) => a - b);

    jornadaFilter.innerHTML = ['<option value="all">Todas</option>']
      .concat(rounds.map((round) => `<option value="${round}">Jornada ${round}</option>`))
      .join('');

    teamFilter.innerHTML = ['<option value="all">Todos los equipos</option>']
      .concat(dashboardData.teams.map((team) => `<option value="${team}">${team}</option>`))
      .join('');
  },

  getFilteredMatches() {
    const jornadaFilter = document.getElementById('jornadaFilter');
    const teamFilter = document.getElementById('teamFilter');

    const selectedRound = jornadaFilter?.value || 'all';
    const selectedTeam = teamFilter?.value || 'all';

    return dashboardData.matches.filter((match) => {
      const roundMatch = selectedRound === 'all' || Number(match.round) === Number(selectedRound);
      const teamMatch = selectedTeam === 'all' || match.home === selectedTeam || match.away === selectedTeam;
      return roundMatch && teamMatch;
    });
  },

  getStandings(matches) {
    const standingsMap = new Map();

    dashboardData.teams.forEach((team) => {
      standingsMap.set(team, {
        team,
        pj: 0,
        pg: 0,
        pe: 0,
        pp: 0,
        gf: 0,
        gc: 0,
        dg: 0,
        pts: 0
      });
    });

    matches.forEach((match) => {
      const home = standingsMap.get(match.home);
      const away = standingsMap.get(match.away);

      home.pj += 1;
      away.pj += 1;
      home.gf += match.homeGoals;
      home.gc += match.awayGoals;
      away.gf += match.awayGoals;
      away.gc += match.homeGoals;

      if (match.homeGoals > match.awayGoals) {
        home.pg += 1;
        home.pts += 3;
        away.pp += 1;
      } else if (match.homeGoals < match.awayGoals) {
        away.pg += 1;
        away.pts += 3;
        home.pp += 1;
      } else {
        home.pe += 1;
        away.pe += 1;
        home.pts += 1;
        away.pts += 1;
      }

      home.dg = home.gf - home.gc;
      away.dg = away.gf - away.gc;
    });

    return [...standingsMap.values()]
      .filter((team) => team.pj > 0)
      .sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);
  },

  renderDashboard() {
    const matches = this.getFilteredMatches();
    const standings = this.getStandings(matches);
    this.updateKpis(matches, standings);
    this.renderStandings(standings);
    this.renderCharts(matches, standings);
  },

  updateKpis(matches, standings) {
    const totalGoals = matches.reduce((sum, match) => sum + match.homeGoals + match.awayGoals, 0);
    const avgGoals = matches.length ? (totalGoals / matches.length).toFixed(2) : '0.00';
    const leader = standings[0]?.team || 'Sin datos';
    const topScorer = [...dashboardData.scorers].sort((a, b) => b.goals - a.goals)[0];

    const distribution = {
      local: 0,
      empate: 0,
      visitante: 0
    };

    matches.forEach((match) => {
      if (match.homeGoals > match.awayGoals) distribution.local += 1;
      else if (match.homeGoals < match.awayGoals) distribution.visitante += 1;
      else distribution.empate += 1;
    });

    const resultText = Object.entries(distribution).sort((a, b) => b[1] - a[1])[0];

    document.getElementById('kpiMatches').textContent = matches.length || '0';
    document.getElementById('kpiGoals').textContent = matches.length ? totalGoals : '0';
    document.getElementById('kpiAvgGoals').textContent = matches.length ? avgGoals : '0.00';
    document.getElementById('kpiLeader').textContent = leader;
    document.getElementById('kpiTopScorer').textContent = topScorer ? `${topScorer.player} (${topScorer.goals})` : '-';
    document.getElementById('kpiResult').textContent = resultText ? `${resultText[0]} (${resultText[1]})` : '-';
  },

  renderStandings(standings) {
    const tbody = document.getElementById('standingsTableBody');

    if (!tbody) return;

    if (!standings.length) {
      tbody.innerHTML = '<tr><td colspan="10" class="text-center">Sin datos disponibles</td></tr>';
      return;
    }

    tbody.innerHTML = standings.map((team, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${team.team}</td>
        <td>${team.pj}</td>
        <td>${team.pg}</td>
        <td>${team.pe}</td>
        <td>${team.pp}</td>
        <td>${team.gf}</td>
        <td>${team.gc}</td>
        <td>${team.dg}</td>
        <td>${team.pts}</td>
      </tr>
    `).join('');
  },

  renderCharts(matches, standings) {
    const goalBarData = standings.slice(0, 8).map((team) => ({
      team: team.team,
      goals: team.gf
    }));

    const resultDistribution = {
      local: matches.filter((match) => match.homeGoals > match.awayGoals).length,
      empate: matches.filter((match) => match.homeGoals === match.awayGoals).length,
      visitante: matches.filter((match) => match.homeGoals < match.awayGoals).length
    };

    const rounds = [...new Set(matches.map((match) => match.round))].sort((a, b) => a - b);
    const goalTrend = rounds.map((round) => ({
      label: `J${round}`,
      value: matches.filter((match) => match.round === round).reduce((sum, match) => sum + match.homeGoals + match.awayGoals, 0)
    }));

    const topScorers = [...dashboardData.scorers].sort((a, b) => b.goals - a.goals).slice(0, 5);

    this.drawChart('goalsByTeamChart', {
      type: 'bar',
      data: {
        labels: goalBarData.map((entry) => entry.team),
        datasets: [{
          label: 'Goles',
          data: goalBarData.map((entry) => entry.goals),
          backgroundColor: '#2c7ef7',
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Goles' } }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });

    this.drawChart('resultChart', {
      type: 'doughnut',
      data: {
        labels: ['Local', 'Empate', 'Visitante'],
        datasets: [{
          data: [resultDistribution.local, resultDistribution.empate, resultDistribution.visitante],
          backgroundColor: ['#2c7ef7', '#f5b700', '#1ecb8a']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });

    this.drawChart('goalsTrendChart', {
      type: 'line',
      data: {
        labels: goalTrend.map((item) => item.label),
        datasets: [{
          label: 'Goles por jornada',
          data: goalTrend.map((item) => item.value),
          borderColor: '#1768d9',
          backgroundColor: 'rgba(23,104,217,0.12)',
          tension: 0.32,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Goles' } },
          x: { title: { display: true, text: 'Jornada' } }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });

    this.drawChart('topScorersChart', {
      type: 'bar',
      data: {
        labels: topScorers.map((player) => player.player),
        datasets: [{
          label: 'Goles',
          data: topScorers.map((player) => player.goals),
          backgroundColor: '#1ecb8a',
          borderRadius: 8
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { beginAtZero: true, title: { display: true, text: 'Goles' } }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  },

  drawChart(id, config) {
    const canvas = document.getElementById(id);
    if (!canvas) return;

    if (chartInstances[id]) {
      chartInstances[id].destroy();
    }

    chartInstances[id] = new Chart(canvas, config);
  },

  exportCsv(rows, filename) {
    if (!rows.length) {
      alert('No hay datos para exportar.');
      return;
    }

    const headers = Object.keys(rows[0]);
    const csv = [headers.join(',')]
      .concat(rows.map((row) => headers.map((key) => `"${String(row[key] ?? '').replace(/"/g, '""')}"`).join(',')))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  dashboardApp.init();
});

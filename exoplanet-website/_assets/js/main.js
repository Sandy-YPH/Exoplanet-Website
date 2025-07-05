// Smooth scrolling for navigation (optional, can be done with CSS scroll-behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile navigation toggle
document.getElementById('nav-trigger').addEventListener('change', function() {
  const triggerDiv = this.nextElementSibling.nextElementSibling;
  if (this.checked) {
    triggerDiv.classList.add('active');
  } else {
    triggerDiv.classList.remove('active');
  }
});


// Chart.js integration for analysis.html
document.addEventListener('DOMContentLoaded', function() {
  const chartCanvas = document.getElementById('similarityChart');
  if (chartCanvas) {
    fetch('{{ "/_data/exoplanets.json" | relative_url }}')
      .then(response => response.json())
      .then(data => {
        const planetNames = data.map(p => p.pl_name);
        const similarityScores = data.map(p => p.similarity_score);
        const masses = data.map(p => p.pl_bmasse);
        const radii = data.map(p => p.pl_rade);
        const temperatures = data.map(p => p.T_eq_corrected);

        new Chart(chartCanvas, {
          type: 'bar', // You can change to 'line', 'radar', etc.
          data: {
            labels: planetNames,
            datasets: [
              {
                label: 'Similarity Score (ESI)',
                data: similarityScores,
                backgroundColor: 'rgba(233, 69, 96, 0.7)', // Highlight color
                borderColor: 'rgba(233, 69, 96, 1)',
                borderWidth: 1
              },
              {
                label: 'Mass (Earth Masses)',
                data: masses,
                backgroundColor: 'rgba(112, 161, 255, 0.7)', // Link color
                borderColor: 'rgba(112, 161, 255, 1)',
                borderWidth: 1
              },
              {
                label: 'Radius (Earth Radii)',
                data: radii,
                backgroundColor: 'rgba(15, 52, 96, 0.7)', // Accent color
                borderColor: 'rgba(15, 52, 96, 1)',
                borderWidth: 1
              },
              {
                label: 'Equilibrium Temperature (K)',
                data: temperatures,
                backgroundColor: 'rgba(255, 206, 86, 0.7)', // Another color
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)' // Lighter grid lines for dark mode
                },
                ticks: {
                  color: 'rgba(224, 224, 224, 0.8)' // Text color for ticks
                }
              },
              x: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                  color: 'rgba(224, 224, 224, 0.8)'
                }
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: 'rgba(224, 224, 224, 0.9)' // Legend text color
                }
              },
              tooltip: {
                backgroundColor: 'rgba(26, 26, 46, 0.9)', // Background of tooltip
                titleColor: 'rgba(233, 69, 96, 1)', // Title color in tooltip
                bodyColor: 'rgba(224, 224, 224, 0.9)' // Body text color in tooltip
              }
            }
          }
        });
      })
      .catch(error => console.error('Error loading exoplanet data:', error));
  }
});

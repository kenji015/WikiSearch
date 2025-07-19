async function searchWikipedia() {
      const query = document.getElementById('searchInput').value;
      const resultsContainer = document.getElementById('results');
      const iframe = document.getElementById('articleViewer');
      iframe.style.display = 'none'; // Artikelanzeige ausblenden
      resultsContainer.innerHTML = ''; // Ergebnisse leeren

      if (!query.trim()) return;

      const apiUrl = `https://de.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.query.search.length === 0) {
          resultsContainer.innerHTML = "<p>Keine Ergebnisse gefunden.</p>";
          return;
        }

        data.query.search.forEach(item => {
          const resultDiv = document.createElement('div');
          resultDiv.className = 'result';
          resultDiv.innerHTML = `
            <strong>${item.title}</strong>
            <p>${item.snippet}...</p>
          `;
          resultDiv.onclick = () => {
            const articleUrl = `https://de.wikipedia.org/wiki/${encodeURIComponent(item.title)}`;
            iframe.src = articleUrl;
            iframe.style.display = 'block';
            iframe.scrollIntoView({ behavior: 'smooth' });
          };
          resultsContainer.appendChild(resultDiv);
        });

      } catch (error) {
        console.error('Fehler beim Abrufen der Wikipedia-Daten:', error);
        resultsContainer.innerHTML = "<p>Fehler beim Laden der Ergebnisse.</p>";
      }
    }
// Fonction pour récupérer les données des coins depuis DexScreener
async function fetchDexScreenerData() {
  const response = await fetch('https://api.dexscreener.com/latest/dex/pairs');
  const data = await response.json();
  return data.data;  // Récupère la liste des paires de tokens
}

// Fonction pour vérifier la sécurité d'un coin via RugCheck
async function checkRugCheck(contractAddress) {
  const url = `https://api.rugcheck.xyz/v1/check/${contractAddress}`;
  const response = await fetch(url);
  const result = await response.json();
  return result;  // Retourne le résultat de la vérification
}

// Fonction pour filtrer les coins et afficher les résultats
async function getCoinData() {
  const coins = await fetchDexScreenerData(); // Récupère les coins depuis DexScreener

  // Pour chaque coin, vérifie la sécurité via RugCheck
  for (let coin of coins) {
    const contractAddress = coin.contractAddress; // On suppose qu'il y a un champ 'contractAddress'
    
    if (contractAddress) {
      const rugCheckResult = await checkRugCheck(contractAddress);
      
      // Crée un élément HTML pour afficher les informations sur le coin
      const coinElement = document.createElement('div');
      coinElement.classList.add('coin');
      
      coinElement.innerHTML = `
        <h3>${coin.name} (${coin.symbol})</h3>
        <p>Prix: $${coin.price}</p>
        <p>Volume: $${coin.volume}</p>
        <p>Risque de Rug Pull: ${rugCheckResult.isSafe ? 'Sûr' : 'Risque élevé'}</p>
      `;
      
      document.getElementById('coins-list').appendChild(coinElement);
    }
  }
}

// Fonction pour appliquer des filtres sur les coins (volume et prix)
function filterCoins() {
  const volumeFilter = document.getElementById('volume').value;
  const priceFilter = document.getElementById('price').value;
  
  // Appliquer des filtres sur la liste des coins
  // (Logique de filtrage à ajouter en fonction de tes besoins)
}

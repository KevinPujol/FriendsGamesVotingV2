import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, set, get, child, remove, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

// --- Configuration ---
// TODO: Reemplaza con tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBZXEEhkXGqq5C8ku1b7putXdtCftlJQDQ",
    authDomain: "app-votacion-juegos.firebaseapp.com",
    // IMPORTANTE: Si tu base de datos no está en Europa, cambia esta URL.
    // Puedes ver la URL correcta en la consola de Firebase -> Realtime Database.
    databaseURL: "https://app-votacion-juegos-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "app-votacion-juegos",
    storageBucket: "app-votacion-juegos.firebasestorage.app",
    messagingSenderId: "1005697502178",
    appId: "1:1005697502178:web:bd812f03ab1e6a5e2707bb",
    measurementId: "G-WF4WDGRHTW"
};

// Initialize Firebase
let app, db;
try {
    app = initializeApp(firebaseConfig);
    db = getDatabase(app);
} catch (e) {
    console.error("Firebase no configurado. El modo offline/demo está activo.", e);
}

// --- Data ---
const PLAYERS = [
    "Voro", "Kevin", "Uri", "Olga", "Roger",
    "Silvia", "Álex", "Gemma", "Bela", "Javi", "Jessica"
];

const GAMES = [
    {
        "id": "game_1",
        "title": "Tres en Raya con Flip de Vaso",
        "videoId": "B4zOCQUgeE_",
        "platform": "instagram"
    },
    {
        "id": "game_2",
        "title": "Carrera del Papel Higiénico con Copa",
        "videoId": "CM13zpYBGgD",
        "platform": "instagram"
    },
    {
        "id": "game_3",
        "title": "Cluedo Asesino en Vivo",
        "videoId": "DPjb_a5CJl8",
        "platform": "instagram"
    },
    {
        "id": "game_4",
        "title": "Murder Mystery con ChatGPT",
        "videoId": "DPS2nVaiIV9",
        "platform": "instagram"
    },
    {
        "id": "game_5",
        "title": "Pupurrí — Retos con Vasos",
        "videoId": "BzUZfPEAhna",
        "platform": "instagram"
    },
    {
        "id": "game_6",
        "title": "Escala del 1 al 10",
        "videoId": "DNq3ce4N-gr",
        "platform": "instagram"
    },
    {
        "id": "game_7",
        "title": "Cambio de Pose a Oscuras",
        "videoId": "DRw25oCCKnv",
        "platform": "instagram"
    },
    {
        "id": "game_8",
        "title": "Karaoke a Ciegas",
        "videoId": "DQcl1kYkYBW",
        "platform": "instagram"
    },
    {
        "id": "game_9",
        "title": "Pupurrí — Retos de Aire y Equilibrio",
        "videoId": "DRkWw-hjvaA",
        "platform": "instagram"
    },
    {
        "id": "game_10",
        "title": "Giro y Salto",
        "videoId": "DRkfSoAidxV",
        "platform": "instagram"
    },
    {
        "id": "game_11",
        "title": "Hungry Hippos Humanos",
        "videoId": "DRNsNWvjR4g",
        "platform": "instagram"
    },
    {
        "id": "game_12",
        "title": "Ciego vs Ciego",
        "videoId": "DRsHviykqZO",
        "platform": "instagram"
    },
    {
        "id": "game_13",
        "title": "Encuentra tu Animal",
        "videoId": "DRvIHyvkSuc",
        "platform": "instagram"
    },
    {
        "id": "game_14",
        "title": "Sin Derramar",
        "videoId": "DR767hgCABP",
        "platform": "instagram"
    },
    {
        "id": "game_15",
        "title": "El Golpe Perfecto (Whitney Houston)",
        "videoId": "DRqxi6pjIk_",
        "platform": "instagram"
    },
    {
        "id": "game_16",
        "title": "Pupurrí — Colores, Ceguera y Aire",
        "videoId": "DSA11s8iWah",
        "platform": "instagram"
    },
    {
        "id": "game_17",
        "title": "Las 15 Palabras",
        "videoId": "DRsBtP9CLPu",
        "platform": "instagram"
    },
    {
        "id": "game_18",
        "title": "La Encuesta Incómoda",
        "videoId": "DSL-rB2Ecq5",
        "platform": "instagram"
    },
    {
        "id": "game_19",
        "title": "La Plancha Triangular",
        "videoId": "DRnOO3BEpBr",
        "platform": "instagram"
    },
    {
        "id": "game_20",
        "title": "Levántate sin Soltar la Escoba",
        "videoId": "DQo65wDDfoh",
        "platform": "instagram"
    },
    {
        "id": "game_21",
        "title": "Dedos al Vaso",
        "videoId": "DNNbjVLT0Hq",
        "platform": "instagram"
    },
    {
        "id": "game_22",
        "title": "La Salchicha Péndulo",
        "videoId": "DMrV9FORVYK",
        "platform": "instagram"
    },
    {
        "id": "game_23",
        "title": "Péndulo Humano",
        "videoId": "DOdpABOkqi3",
        "platform": "instagram"
    },
    {
        "id": "game_24",
        "title": "Movimiento Asignado",
        "videoId": "DRbLx-ej146",
        "platform": "instagram"
    },
    {
        "id": "game_25",
        "title": "Mano al Vaso",
        "videoId": "DR-c9Ehj8Y0",
        "platform": "instagram"
    },
    {
        "id": "game_26",
        "title": "Pulso de Piernas",
        "videoId": "DPkHxWCDcYj",
        "platform": "instagram"
    },
    {
        "id": "game_27",
        "title": "Misiones Secretas",
        "videoId": "DRlnc49EVgb",
        "platform": "instagram"
    },
    {
        "id": "game_28",
        "title": "Gallinita Ciega Terror",
        "videoId": "DRlLN8sjVPr",
        "platform": "instagram"
    },
    {
        "id": "game_29",
        "title": "Diana a Ciegas",
        "videoId": "DQ40ZCwjOUW",
        "platform": "instagram"
    },
    {
        "id": "game_30",
        "title": "Tres en Raya Humano",
        "videoId": "DSaLibjFBUd",
        "platform": "instagram"
    },
    {
        "id": "game_31",
        "title": "Pisaglobos",
        "videoId": "DSEbx0DkQT5",
        "platform": "instagram"
    },
    {
        "id": "game_32",
        "title": "Pasos a Ciegas",
        "videoId": "DNx-CDB2sJ9",
        "platform": "instagram"
    },
    {
        "id": "game_33",
        "title": "La Oreo Voladora",
        "videoId": "DRhiZTaEeFj",
        "platform": "instagram"
    },
    {
        "id": "game_34",
        "title": "Poses Congeladas (familia de montaje)",
        "videoId": "DNXbFK4Mf69",
        "platform": "instagram"
    },
    {
        "id": "game_35",
        "title": "Puntería con Cono",
        "videoId": "DP544u8E8u0",
        "platform": "instagram"
    },
    {
        "id": "game_36",
        "title": "Imita el Producto",
        "videoId": "DP9DmUtCAIc",
        "platform": "instagram"
    }
];

const MAX_VOTES = 10;

// --- State ---
let currentPlayer = null;
let currentVotes = []; // Array of game IDs

// --- DOM Elements ---
const authScreen = document.getElementById('auth-screen');
const votingScreen = document.getElementById('voting-screen');
const playersList = document.getElementById('players-list');
const currentPlayerNameEl = document.getElementById('current-player-name');
const votesRemainingEl = document.getElementById('votes-remaining');
const gamesFeed = document.getElementById('games-feed');

// --- Initialization ---
function init() {
    renderPlayersList();
}

// --- Auth Logic ---
function renderPlayersList() {
    playersList.innerHTML = '';
    PLAYERS.forEach(player => {
        const btn = document.createElement('button');
        btn.className = 'player-btn';
        btn.textContent = player;
        btn.onclick = () => login(player);
        playersList.appendChild(btn);
    });
}

async function login(player) {
    currentPlayer = player;
    currentPlayerNameEl.textContent = player;

    // Switch screens
    authScreen.classList.remove('active');
    authScreen.classList.add('hidden');
    setTimeout(() => {
        authScreen.style.display = 'none';
        votingScreen.style.display = 'flex'; // Restore layout
        votingScreen.classList.remove('hidden');
        votingScreen.classList.add('active');
    }, 500);

    await loadVotes();
    renderGames();
    updateVoteCounter();
}

// --- Voting Logic ---
async function loadVotes() {
    if (!db) return; // Offline mode

    const dbRef = ref(db);
    try {
        const snapshot = await get(child(dbRef, `votes/${currentPlayer}`));
        if (snapshot.exists()) {
            const data = snapshot.val();
            // Convert object { gameId: timestamp } to array of gameIds
            currentVotes = Object.keys(data || {});
        } else {
            currentVotes = [];
        }
    } catch (error) {
        console.error("Error cargando votos:", error);
    }
}

function renderGames() {
    gamesFeed.innerHTML = '';
    GAMES.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';

        // Check if voted
        const isVoted = currentVotes.includes(game.id);

        card.innerHTML = `
            <div class="game-content">
                <div class="loader-container" id="loader-${game.id}">
                    <div class="spinner"></div>
                </div>
                <iframe 
                    src="https://www.instagram.com/p/${game.videoId}/embed" 
                    frameborder="0" 
                    scrolling="no" 
                    allowtransparency="true"
                    onload="document.getElementById('loader-${game.id}').style.display='none'"
                    style="width: 100%; height: 100%; position: relative; z-index: 2;">
                </iframe>
            </div>
            
            <div class="game-info-section">
                <div class="game-text">
                    <h2>${game.title}</h2>
                    <a href="https://www.instagram.com/p/${game.videoId}/" target="_blank">
                        Abrir en Instagram <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
                <button class="vote-action-btn ${isVoted ? 'voted' : ''}" onclick="toggleVote('${game.id}', this)">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        `;
        gamesFeed.appendChild(card);
    });
}

window.toggleVote = async function (gameId, btnElement) {
    if (currentVotes.includes(gameId)) {
        // Remove vote
        currentVotes = currentVotes.filter(id => id !== gameId);
        btnElement.classList.remove('voted');
        await syncVote(gameId, false);
    } else {
        // Add vote
        if (currentVotes.length >= MAX_VOTES) {
            alert(`Solo puedes votar por ${MAX_VOTES} juegos.`);
            return;
        }
        currentVotes.push(gameId);
        btnElement.classList.add('voted');
        await syncVote(gameId, true);
    }
    updateVoteCounter();
};

function updateVoteCounter() {
    const remaining = MAX_VOTES - currentVotes.length;
    votesRemainingEl.textContent = remaining;

    // Update badge color logic if needed
    if (remaining === 0) {
        votesRemainingEl.parentElement.style.background = 'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)';
    } else {
        votesRemainingEl.parentElement.style.background = ''; // default css
    }
}

async function syncVote(gameId, isAdding) {
    if (!db) return;

    try {
        const voteRef = ref(db, `votes/${currentPlayer}/${gameId}`);
        if (isAdding) {
            await set(voteRef, Date.now());
        } else {
            await remove(voteRef);
        }
    } catch (e) {
        console.error("Error guardando voto:", e);
        alert("Error de conexión. Inténtalo de nuevo.");
    }
}

// Start
init();

// CDN URLs for game assets
const assetsURLs = [
    "https://cdn.jsdelivr.net/gh/Toaster68/assets@main/zones.json",
    "https://cdn.jsdelivr.net/gh/Toaster68/assets@latest/zones.json",
    "https://cdn.jsdelivr.net/gh/Toaster68/assets@master/zones.json",
    "https://cdn.jsdelivr.net/gh/Toaster68/assets/zones.json"
];
let assetsURL = assetsURLs[Math.floor(Math.random() * assetsURLs.length)];
const coverURL = "https://cdn.jsdelivr.net/gh/Toaster68/covers@main";
const htmlURL = "https://cdn.jsdelivr.net/gh/Toaster68/html@main";

let gamelist = [];
let popularityData = {};
const gameViewer = document.getElementById('gameViewer');
let gameFrame = document.getElementById('gameFrame');

// Initialize when DOM is ready
if (document.readyState === "complete") {
    initializeGames();
} else {
    document.addEventListener("DOMContentLoaded", initializeGames);
}

function initializeGames() {
    loadGames();
    setupSearchListener();
}

async function loadGames() {
    try {
        // Try to get latest commit SHA for cache busting
        let sha;
        try {
            const shaResponse = await fetch("https://api.github.com/repos/Toaster68/assets/commits?t=" + Date.now());
            if (shaResponse && shaResponse.status === 200) {
                const shaJson = await shaResponse.json();
                sha = shaJson[0]['sha'];
                if (sha) {
                    assetsURL = `https://cdn.jsdelivr.net/gh/Toaster68/assets@${sha}/zones.json`;
                }
            }
        } catch (error) {
            console.log("Could not fetch latest SHA, using default URL");
        }

        // Fetch game data
        const response = await fetch(assetsURL + "?t=" + Date.now());
        const data = await response.json();
        gamelist = data;

        // Fetch popularity data
        await fetchPopularity();

        // Sort and display games
        sortGames();

        // Check for direct game link
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (id) {
            const game = gamelist.find(g => g.id + '' == id + '');
            if (game) {
                openGame(game);
            }
        }
    } catch (error) {
        console.error("Error loading games:", error);
        document.getElementById('games').innerHTML = `Error loading games: ${error}`;
    }
}

async function fetchPopularity() {
    try {
        const response = await fetch("https://data.jsdelivr.com/v1/stats/packages/gh/Toaster68/html@main/files?period=year");
        const data = await response.json();
        data.forEach(file => {
            const idMatch = file.name.match(/\/(\d+)\.html$/);
            if (idMatch) {
                const id = parseInt(idMatch[1]);
                popularityData[id] = file.hits.total;
            }
        });
    } catch (error) {
        console.log("Could not fetch popularity data");
        popularityData[0] = 0;
    }
}

function sortGames() {
    const sortBy = document.getElementById('sortOptions').value;
    
    if (sortBy === 'name') {
        gamelist.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'id') {
        gamelist.sort((a, b) => a.id - b.id);
    } else if (sortBy === 'popular') {
        gamelist.sort((a, b) => (popularityData[b.id] || 0) - (popularityData[a.id] || 0));
    }
    
    // Keep special items at top
    gamelist.sort((a, b) => (a.id === -1 ? -1 : b.id === -1 ? 1 : 0));
    
    displayGames(gamelist);
}

function displayGames(games) {
    const container = document.getElementById('games');
    container.innerHTML = "";
    
    games.forEach((game) => {
        const gameElement = document.createElement("div");
        gameElement.className = "game";
        gameElement.onclick = () => openGame(game);
        
        const img = document.createElement("img");
        img.src = game.cover.replace("{COVER_URL}", coverURL).replace("{HTML_URL}", htmlURL);
        img.alt = game.name;
        img.loading = "lazy";
        
        const title = document.createElement("h1");
        title.textContent = game.name;
        
        gameElement.appendChild(img);
        gameElement.appendChild(title);
        container.appendChild(gameElement);
    });
    
    if (container.innerHTML === "") {
        container.innerHTML = "No games found.";
    } else {
        document.getElementById("allSummary").textContent = `All Games (${games.length})`;
    }
}

function openGame(game) {
    if (game.url.startsWith("http")) {
        window.open(game.url, "_blank");
    } else {
        const url = game.url.replace("{COVER_URL}", coverURL).replace("{HTML_URL}", htmlURL);
        fetch(url + "?t=" + Date.now())
            .then(response => response.text())
            .then(html => {
                if (gameFrame.contentDocument === null) {
                    gameFrame = document.createElement("iframe");
                    gameFrame.id = "gameFrame";
                    gameViewer.appendChild(gameFrame);
                }
                gameFrame.contentDocument.open();
                gameFrame.contentDocument.write(html);
                gameFrame.contentDocument.close();
                
                document.getElementById('gameName').textContent = game.name;
                document.getElementById('gameId').textContent = game.id;
                gameViewer.style.display = "flex";
                
                const url = new URL(window.location);
                url.searchParams.set('id', game.id);
                history.pushState(null, '', url.toString());
            })
            .catch(error => alert("Failed to load game: " + error));
    }
}

function closeGame() {
    gameViewer.style.display = "none";
    if (gameFrame.parentNode) {
        gameViewer.removeChild(gameFrame);
    }
    const url = new URL(window.location);
    url.searchParams.delete('id');
    history.pushState(null, '', url.toString());
}

function fullscreenGame() {
    if (gameFrame.requestFullscreen) {
        gameFrame.requestFullscreen();
    } else if (gameFrame.mozRequestFullScreen) {
        gameFrame.mozRequestFullScreen();
    } else if (gameFrame.webkitRequestFullscreen) {
        gameFrame.webkitRequestFullscreen();
    } else if (gameFrame.msRequestFullscreen) {
        gameFrame.msRequestFullscreen();
    }
}

function setupSearchListener() {
    const searchBar = document.getElementById('gamesearch');
    if (searchBar) {
        searchBar.addEventListener('input', searchGames);
    }
}

function searchGames() {
    const query = document.getElementById('gamesearch').value.toLowerCase();
    const filteredGames = gamelist.filter(game => 
        game.name.toLowerCase().includes(query)
    );
    displayGames(filteredGames);
}

// Data export/import functions
function sanitizeData(obj, maxStringLen = 1000, maxArrayLen = 10000) {
    if (typeof obj === 'string') {
        return obj.length > maxStringLen ? obj.slice(0, maxStringLen) + '...[truncated]' : obj;
    }
    
    if (obj instanceof Uint8Array) {
        if (obj.length > maxArrayLen) {
            return `[Uint8Array too large (${obj.length} bytes), truncated]`;
        }
        return obj;
    }
    
    if (Array.isArray(obj)) {
        return obj.map(item => sanitizeData(item, maxStringLen, maxArrayLen));
    }
    
    if (obj && typeof obj === 'object') {
        const newObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = sanitizeData(obj[key], maxStringLen, maxArrayLen);
            }
        }
        return newObj;
    }
    
    return obj;
}

async function saveData() {
    alert("This might take a while, don't touch anything other than this OK button");
    const result = {};
    result.cookies = document.cookie;
    result.localStorage = {...localStorage};
    result.sessionStorage = {...sessionStorage};
    result.indexedDB = {};
    
    const dbs = await indexedDB.databases();
    for (const dbInfo of dbs) {
        if (!dbInfo.name) continue;
        result.indexedDB[dbInfo.name] = {};
        await new Promise((resolve, reject) => {
            const openRequest = indexedDB.open(dbInfo.name, dbInfo.version);
            openRequest.onerror = () => reject(openRequest.error);
            openRequest.onsuccess = () => {
                const db = openRequest.result;
                const storeNames = Array.from(db.objectStoreNames);
                if (storeNames.length === 0) {
                    resolve();
                    return;
                }
                const transaction = db.transaction(storeNames, "readonly");
                const storePromises = [];
                for (const storeName of storeNames) {
                    result.indexedDB[dbInfo.name][storeName] = [];
                    const store = transaction.objectStore(storeName);
                    const getAllRequest = store.getAll();
                    const p = new Promise((res, rej) => {
                        getAllRequest.onsuccess = () => {
                            result.indexedDB[dbInfo.name][storeName] = sanitizeData(getAllRequest.result, 1000, 100);
                            res();
                        };
                        getAllRequest.onerror = () => rej(getAllRequest.error);
                    });
                    storePromises.push(p);
                }
                Promise.all(storePromises).then(() => resolve());
            };
        });
    }

    result.caches = {};
    const cacheNames = await caches.keys();
    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        result.caches[cacheName] = [];
        for (const req of requests) {
            const response = await cache.match(req);
            if (!response) continue;
            const cloned = response.clone();
            const contentType = cloned.headers.get('content-type') || '';
            let body;
            try {
                if (contentType.includes('application/json')) {
                    body = await cloned.json();
                } else if (contentType.includes('text') || contentType.includes('javascript')) {
                    body = await cloned.text();
                } else {
                    const buffer = await cloned.arrayBuffer();
                    body = btoa(String.fromCharCode(...new Uint8Array(buffer)));
                }
            } catch (e) {
                body = '[Unable to read body]';
            }
            result.caches[cacheName].push({
                url: req.url,
                body,
                contentType
            });
        }
    }
    
    alert("Done, wait for the download to come");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([JSON.stringify(result)], {
        type: "application/octet-stream"
    }));
    link.download = `${Date.now()}.data`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

async function loadData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async function (e) {
        const data = JSON.parse(e.target.result);
        if (data.cookies) {
            data.cookies.split(';').forEach(cookie => {
                document.cookie = cookie.trim();
            });
        }
        
        if (data.localStorage) {
            for (const key in data.localStorage) {
                localStorage.setItem(key, data.localStorage[key]);
            }
        }
        
        if (data.sessionStorage) {
            for (const key in data.sessionStorage) {
                sessionStorage.setItem(key, data.sessionStorage[key]);
            }
        }
        
        if (data.indexedDB) {
            for (const dbName in data.indexedDB) {
                const stores = data.indexedDB[dbName];
                await new Promise((resolve, reject) => {
                    const request = indexedDB.open(dbName, 1);
                    request.onupgradeneeded = e => {
                        const db = e.target.result;
                        for (const storeName in stores) {
                            if (!db.objectStoreNames.contains(storeName)) {
                                db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
                            }
                        }
                    };
                    request.onsuccess = e => {
                        const db = e.target.result;
                        const transaction = db.transaction(Object.keys(stores), 'readwrite');
                        transaction.onerror = () => reject(transaction.error);
                        let pendingStores = Object.keys(stores).length;
                        
                        for (const storeName in stores) {
                            const objectStore = transaction.objectStore(storeName);
                            objectStore.clear().onsuccess = () => {
                                for (const item of stores[storeName]) {
                                    objectStore.put(item);
                                }
                                pendingStores--;
                                if (pendingStores === 0) resolve();
                            };
                        }
                    };
                    request.onerror = () => reject(request.error);
                });
            }
        }
        
        if (data.caches) {
            for (const cacheName in data.caches) {
                const cache = await caches.open(cacheName);
                await cache.keys().then(keys => Promise.all(keys.map(k => cache.delete(k))));
                
                for (const entry of data.caches[cacheName]) {
                    let responseBody;
                    if (entry.contentType.includes('application/json')) {
                        responseBody = JSON.stringify(entry.body);
                    } else if (entry.contentType.includes('text') || entry.contentType.includes('javascript')) {
                        responseBody = entry.body;
                    } else {
                        const binaryStr = atob(entry.body);
                        const len = binaryStr.length;
                        const bytes = new Uint8Array(len);
                        for (let i = 0; i < len; i++) {
                            bytes[i] = binaryStr.charCodeAt(i);
                        }
                        responseBody = bytes.buffer;
                    }
                    const headers = new Headers({ 'content-type': entry.contentType });
                    const response = new Response(responseBody, { headers });
                    await cache.put(entry.url, response);
                }
            }
        }
        alert("Data loaded");
    };
    alert("This might take a while, don't touch anything other than this OK button");
    reader.readAsText(file);
}

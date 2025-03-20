// ------------------------------
// Tu código original
// ------------------------------

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBziV6Jvh9KQZpsh8HtCtbX51H_qKJgZzM",
  authDomain: "ometv-67dc0.firebaseapp.com",
  databaseURL: "https://ometv-67dc0-default-rtdb.firebaseio.com",
  projectId: "ometv-67dc0",
  storageBucket: "ometv-67dc0.firebasestorage.app",
  messagingSenderId: "874118207646",
  appId: "1:874118207646:web:0068f610484d73705ec38f",
  measurementId: "G-NNSSK6W00L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Función para detectar el dispositivo
function detectDevice() {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'ios';
  } else if (/android/.test(userAgent)) {
    return 'android';
  }
  return 'desktop';
}

// Función para detectar país
async function detectCountry() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code;
  } catch (error) {
    console.error('Error detecting country:', error);
    return 'US';
  }
}

// Función mejorada para verificar si una app está disponible basada en su fecha de lanzamiento
function isAppReleased(releaseDate) {
    if (!releaseDate) return true;
    const now = new Date();
    const release = new Date(releaseDate);
    return now >= release;
}

// Función mejorada para formatear el tiempo restante
function getTimeUntilRelease(releaseDate) {
    const now = new Date();
    const release = new Date(releaseDate);
    
    if (now >= release) return null;
    
    const diffTime = Math.abs(release - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 30) {
        const diffMonths = Math.floor(diffDays / 30);
        return `${diffMonths} mes${diffMonths > 1 ? 'es' : ''}`;
    } else if (diffDays > 0) {
        return `${diffDays} día${diffDays > 1 ? 's' : ''}`;
    } else {
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
        return `${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    }
}

// Array de apps con información de banners y gradientes
const apps = [{
    name: "Facebook",
    developer: "Meta",
    packageName: "com.facebook.katana",
    category: "Redes sociales",
    rating: 4.2,
    size: "85.7 MB",
    icon: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    description: "Facebook es una red social donde los usuarios pueden compartir contenido.",
    downloads: "186M+",
    bannerGradient: "45deg, #1877f2, #0a3d62",
    security: false,
    version: "497.0.0.47.36",
    isAvailable: true,
    releaseDate: "2024-01-01T00:00:00",
    allowedCountries: ["Global"],
    platforms: {
      android: "https://play.google.com/store/apps/details?id=com.facebook.katana",
      ios: "https://apps.apple.com/us/app/facebook/id284882215"
    },
    previousVersions: ["496.0.0.45.65", "495.0.0.45.201", "494.1.0.56.73"],
    media: [{
        type: "image",
        url: "/api/placeholder/200/400"
      },
      {
        type: "video",
        url: "dQw4w9WgXcQ"
      },
      {
        type: "image",
        url: "/api/placeholder/200/400"
      }
    ]
  },

  {
    "name": "小红书 - 你的生活指南",
    "developer": "Xingin Information Technology (Shanghai) Co., Ltd",
    "packageName": "com.xingin.xhs",
    "category": "Redes Sociales",
    "rating": 4.5,
    "size": "460.3 MB",
    "icon": "https://img.utdstc.com/icon/7a0/428/7a04288acb3629d00aaa8937410ef4559ffde7f7261acf1768096874404caf5b:200",
    "description": "RedNote, conocida en China como Xiaohongshu o 'pequeño libro rojo', es una plataforma de redes sociales que permite a los usuarios compartir fotos, videos y experiencias de vida.",
    "downloads": "22K+",
    "bannerGradient": "45deg, #FF0000, #FF4500",
    "security": true,
    "version": "8.69.4",
    "isAvailable": true,
    "releaseDate": "2013-06-06T00:00:00",
    "allowedCountries": ["CN", "HK", "TW", "SG", "JP"],
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.xingin.xhs",
      "ios": "https://apps.apple.com/us/app/rednote-share-connect-love/id741292507"
    },
    "previousVersions": ["8.69.3", "8.68.1", "8.67.5"],
    "media": [
      {
        "type": "image",
        "url": "https://cdn6.aptoide.com/imgs/a/2/6/a267811e6da9b0021d56c9011e08e6c4_screen.png"
      },
      {
        "type": "image",
        "url": "https://cdn6.aptoide.com/imgs/8/7/d/87d12064a89075b09501c34bf417c25d_screen.png"
      },
      {
        "type": "image",
        "url": "https://cdn6.aptoide.com/imgs/d/8/9/d8989b80da53f5a720eab48b81393287_screen.png"
      }
    ]
  },

  {
    "name": "Uber",
    "developer": "Uber Technologies, Inc.",
    "packageName": "com.ubercab",
    "category": "Transporte",
    "rating": 4.2,
    "size": "75 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/5968/5968733.png",
    "description": "Uber es una aplicación que conecta a conductores con pasajeros para viajes urbanos a pedido.",
    "downloads": "500M+",
    "bannerGradient": "45deg, #000000, #333333",
    "security": true,
    "version": "4.441.10000",
    "isAvailable": true,
    "releaseDate": "2009-03-01T00:00:00",
    "allowedCountries": ["US", "UK", "BR", "MX", "IN", "AU", "CA", "FR", "DE", "JP"],
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.ubercab",
      "ios": "https://apps.apple.com/app/uber/id368677368"
    },
    "previousVersions": ["4.440.10000", "4.439.10000", "4.438.10000"],
    "media": [
      {
        "type": "image",
        "url": "https://play-lh.googleusercontent.com/uber-screenshot1.jpg"
      },
      {
        "type": "image",
        "url": "https://play-lh.googleusercontent.com/uber-screenshot2.jpg"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=UberDemo"
      }
    ]
  },
  {
    "name": "Duolingo",
    "developer": "Duolingo",
    "packageName": "com.duolingo",
    "category": "Educación",
    "rating": 4.7,
    "size": "60 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/5968/5968746.png",
    "description": "Duolingo es una plataforma de aprendizaje de idiomas que combina lecciones con juegos interactivos.",
    "downloads": "500M+",
    "bannerGradient": "45deg, #58CC02, #4CAF50",
    "security": true,
    "version": "5.112.4",
    "isAvailable": true,
    "releaseDate": "2011-11-30T00:00:00",
    "allowedCountries": ["US", "BR", "MX", "JP", "IN", "DE", "FR", "RU", "ES", "IT"],
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.duolingo",
      "ios": "https://apps.apple.com/app/duolingo/id570060128"
    },
    "previousVersions": ["5.112.3", "5.112.2", "5.111.5"],
    "media": [
      {
        "type": "image",
        "url": "https://play-lh.googleusercontent.com/duolingo-screenshot1.jpg"
      },
      {
        "type": "image",
        "url": "https://play-lh.googleusercontent.com/duolingo-screenshot2.jpg"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=DuolingoDemo"
      }
    ]
  },
  {
    "name": "Google Drive",
    "developer": "Google LLC",
    "packageName": "com.google.android.apps.docs",
    "category": "Productividad",
    "rating": 4.4,
    "size": "70 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/2965/2965327.png",
    "description": "Google Drive es un servicio de almacenamiento en la nube que permite guardar y compartir archivos.",
    "downloads": "5B+",
    "bannerGradient": "45deg, #0F9D58, #0B8043",
    "security": true,
    "version": "2.23.055.0",
    "isAvailable": true,
    "releaseDate": "2012-04-24T00:00:00",
    "allowedCountries": ["US", "IN", "BR", "JP", "DE", "UK", "FR", "IT", "ES", "CA"],
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.google.android.apps.docs",
      "ios": "https://apps.apple.com/app/google-drive/id507874739"
    },
    "previousVersions": ["2.23.054.0", "2.23.053.0", "2.23.052.0"],
    "media": [
      {
        "type": "image",
        "url": "https://play-lh.googleusercontent.com/drive-screenshot1.jpg"
      },
      {
        "type": "image",
        "url": "https://play-lh.googleusercontent.com/drive-screenshot2.jpg"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=GoogleDriveDemo"
      }
    ]
  },
  {
    name: "Threads",
    developer: "Meta",
    packageName: "com.instagram.threads",
    category: "Redes sociales",
    rating: 4.0,
    size: "64.3 MB",
    icon: "https://cdn.prod.website-files.com/63c5640295a3b83ae7861a3c/64da4f65aad5dfeae27e70c3_Threads%20logo.png",
    description: "Threads es la nueva app de texto de Instagram. Comparte actualizaciones y únete a conversaciones.",
    downloads: "100M+",
    bannerGradient: "45deg, #000000, #333333",
    security: true,
    version: "1.0.0",
    isAvailable: true,
    releaseDate: "2024-09-15T00:00:00",
    allowedCountries: ["US", "ES", "MX", "AR", "CO", "PE", "CL"],
    platforms: {
      android: "https://play.google.com/store/apps/details?id=com.instagram.threads",
      ios: "https://apps.apple.com/us/app/threads-an-instagram-app/id6446901002"
    },
    previousVersions: [],
    media: [{
        type: "image",
        url: "/api/placeholder/200/400"
      },
      {
        type: "video",
        url: "dQw4w9WgXcQ"
      },
      {
        type: "image",
        url: "/api/placeholder/200/400"
      }
    ]
  }
];

// Nueva función para filtrar apps por país
async function filterAppsByCountry(appsToFilter) {
  try {
    const userCountry = await detectCountry();
    return appsToFilter.filter(app => app.allowedCountries.includes(userCountry));
  } catch (error) {
    console.error('Error filtering apps by country:', error);
    return appsToFilter;
  }
}

function parseDownloads(downloads) {
  if (downloads.includes('B+')) {
    return parseFloat(downloads.replace('B+', '')) * 1000000000;
  }
  return parseInt(downloads.replace('M+', '')) * 1000000;
}

function getStoreLink(app) {
  const device = detectDevice();
  if (!app.isAvailable || !isAppReleased(app.releaseDate)) {
    return null;
  }
  if (device === 'ios' && app.platforms.ios) {
    return app.platforms.ios;
  } else if (device === 'android' && app.platforms.android) {
    return app.platforms.android;
  }
  return app.platforms.android || app.platforms.ios;
}

async function displayFeaturedApps() {
  const featuredApps = document.getElementById('featuredApps');
  featuredApps.innerHTML = '';

  // Filtrar apps por país
  const availableApps = await filterAppsByCountry(apps);
  
  if (availableApps.length === 0) {
    featuredApps.innerHTML = `
      <div class="no-apps-message">
        <h2>Apps no disponibles</h2>
        <p>Lo sentimos, no hay aplicaciones disponibles en tu región en este momento.</p>
      </div>
    `;
    return;
  }

  const sortedApps = [...availableApps].sort((a, b) => {
    return parseDownloads(b.downloads) - parseDownloads(a.downloads);
  });
  const top10Apps = sortedApps.slice(0, 10);

  const posterSection = document.createElement('section');
  posterSection.innerHTML = `<h2 class="section-title">Top 10 Aplicaciones Destacadas</h2>`;
  const postersContainer = document.createElement('div');
  postersContainer.className = 'app-posters';
  
  top10Apps.forEach(app => {
    const isReleased = isAppReleased(app.releaseDate);
    const poster = document.createElement('div');
    poster.className = 'app-poster';
    poster.style.background = `linear-gradient(${app.bannerGradient})`;
    poster.innerHTML = `
      <div class="poster-gradient">
        <div class="poster-content">
          <img src="${app.icon}" class="poster-icon" alt="${app.name}">
          <div class="poster-title">${app.name}</div>
          <div class="poster-subtitle">${app.category}</div>
          ${!isReleased ? 
            `<div class="coming-soon-badge">Próximamente - ${getTimeUntilRelease(app.releaseDate)}</div>` : 
            ''}
        </div>
      </div>
    `;
    poster.addEventListener('click', () => openAppModal(app));
    postersContainer.appendChild(poster);
  });
  
  posterSection.appendChild(postersContainer);
  featuredApps.appendChild(posterSection);

  // Resto de las secciones con filtrado por país
  [
    {
      title: "Top 10 Últimas Actualizaciones",
      apps: [...availableApps].sort((a, b) => b.version.localeCompare(a.version)).slice(0, 10)
    },
    {
      title: "Top 5 Aplicaciones Más Descargadas",
      apps: [...availableApps].sort((a, b) => parseDownloads(b.downloads) - parseDownloads(a.downloads)).slice(0, 5)
    },
    {
      title: "Nuevos Lanzamientos",
      apps: [...availableApps].filter(app => !isAppReleased(app.releaseDate)).slice(0, 5)
    },
    {
      title: "Top 10 Redes Sociales",
      apps: availableApps.filter(app => app.category.toLowerCase() === 'redes sociales')
        .sort((a, b) => parseDownloads(b.downloads) - parseDownloads(a.downloads))
        .slice(0, 10)
    }
  ].forEach(section => {
    if (section.apps.length > 0) {
      const sectionElement = document.createElement('section');
      sectionElement.className = 'category-section';
      sectionElement.innerHTML = `
        <h2 class="section-title">${section.title}</h2>
        <div class="horizontal-scroll">
          ${section.apps.map(app => createAppCard(app)).join('')}
        </div>
      `;
      featuredApps.appendChild(sectionElement);
    }
  });
}

function createAppCard(app) {
  const isReleased = isAppReleased(app.releaseDate);
  return `
    <div class="app-card" onclick="openAppModal(${JSON.stringify(app).replace(/\"/g, '&quot;')})">
      <div class="app-header">
        <img class="app-icon" src="${app.icon}" alt="${app.name}">
        <div class="app-info">
          <div class="app-name">${app.name}</div>
          <div class="app-developer">
            <span class="developer-link" onclick="showDeveloperApps('${app.developer}', event)">${app.developer}</span>
          </div>
          <div class="package-name">${app.packageName || 'No disponible'}</div>
          <div class="rating">
            <span class="stars">★★★★★</span>
            <span>${app.rating}</span>
          </div>
          ${!isReleased ? 
            `<div class="coming-soon-tag">Próximamente - ${getTimeUntilRelease(app.releaseDate)}</div>` : 
            ''}
        </div>
      </div>
    </div>
  `;
}

async function openAppModal(app) {
  const storeLink = getStoreLink(app);
  const countryCode = await detectCountry();
  const isAvailableInCountry = app.allowedCountries.includes(countryCode);
  const isReleased = isAppReleased(app.releaseDate);
  
  let availabilityWarning = '';
  
  if (!isReleased) {
    const timeRemaining = getTimeUntilRelease(app.releaseDate);
    availabilityWarning = `
      <div class="availability-warning coming-soon">
        <i class="fas fa-clock"></i>
        Próximamente - Disponible en ${timeRemaining}
      </div>
    `;
  } else if (!isAvailableInCountry) {
    availabilityWarning = `
      <div class="availability-warning">
        <i class="fas fa-exclamation-triangle"></i>
        Esta aplicación no está disponible en su país (${countryCode}).
      </div>
    `;
  }

  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = `
    <div class="modal-banner" style="background: linear-gradient(${app.bannerGradient})">
      <div class="modal-banner-content">
        <img class="modal-banner-icon" src="${app.icon}" alt="${app.name}">
        <h2>${app.name}</h2>
      </div>
    </div>

    ${availabilityWarning}

    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Categoría</div>
        <div>${app.category}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Package Name</div>
        <div>${app.packageName || 'No disponible'}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Versión</div>
        <div>${app.version}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Tamaño</div>
        <div>${app.size}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Descargas</div>
        <div>${app.downloads}</div>
      </div>
    </div>

    <div class="media-container">
      <div class="media-wrapper">
        ${app.media.map(item => {
          if (item.type === 'image') {
            return `<img src="${item.url}" alt="Screenshot" class="media-item">`;
          } else {
            return `
              <div class="media-item video" data-video-id="${item.url}">
                <div class="video-overlay">
                  <i class="fas fa-play"></i>
                </div>
                <img src="https://img.youtube.com/vi/${item.url}/0.jpg" alt="Video thumbnail">
              </div>
            `;
          }
        }).join('')}
      </div>
      <div class="carousel-dots">
        ${app.media.map((_, index) => `
          <div class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
        `).join('')}
      </div>
    </div>

    <p>${app.description}</p>

    <div class="action-buttons">
     ${isAvailableInCountry && isReleased && storeLink
        ? `<a href="${storeLink}" class="action-btn primary-btn" target="_blank">
             Descargar ${detectDevice() === 'ios' ? 'en App Store' : 'en Play Store'}
           </a>`
        : `<button class="action-btn primary-btn" disabled>
             ${!isReleased ? 'Próximamente' : 'Bloqueada'}
           </button>`
      }
      <button class="action-btn secondary-btn" onclick="togglePreviousVersions('${app.name}')">
        Ver versiones anteriores
      </button>
    </div>

    <div class="security-info ${app.security ? 'secure' : ''}">
      <div class="virustotal-badge">
        <i class="fas fa-shield-alt"></i> Verificado por VirusTotal
      </div>
      <p>Esta aplicación ha pasado nuestras verificaciones de seguridad.</p>
    </div>

    <div class="previous-versions" id="${app.name}-versions" style="display:none;">
      <h4>Versiones anteriores:</h4>
      <ul>
        ${app.previousVersions.map(version => `<li>${version}</li>`).join('')}
      </ul>
    </div>
  `;

  document.getElementById('appModal').classList.add('active');
  initializeCarousel();
  initializeVideoPlayers();
}

function initializeCarousel() {
  const container = document.querySelector('.media-container');
  const wrapper = container.querySelector('.media-wrapper');
  const dots = container.querySelectorAll('.carousel-dot');
  let currentIndex = 0;

  function updateCarousel(index) {
    const slideWidth = container.querySelector('.media-item').offsetWidth + 15;
    wrapper.style.transform = `translateX(-${slideWidth * index}px)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel(currentIndex);
    });
  });
}

function initializeVideoPlayers() {
  const videoItems = document.querySelectorAll('.media-item.video');
  videoItems.forEach(item => {
    const overlay = item.querySelector('.video-overlay');
    const videoId = item.dataset.videoId;
    overlay.addEventListener('click', () => {
      item.innerHTML = `
        <iframe 
          src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>`;
    });
  });
}

function togglePreviousVersions(appName) {
  const versionsDiv = document.getElementById(`${appName}-versions`);
  versionsDiv.style.display = versionsDiv.style.display === 'none' ? 'block' : 'none';
}

function showDeveloperApps(developer, event) {
  event.stopPropagation();
  const developerModal = document.getElementById('developerModal');
  const developerApps = document.getElementById('developerApps');
  const developerAppList = apps.filter(app => app.developer === developer);
  developerApps.innerHTML = developerAppList.map(app => createAppCard(app)).join('');
  developerModal.style.display = 'block';
}

// Función mejorada para mostrar apps filtradas
async function displayApps(appsToDisplay) {
  const appsContainer = document.getElementById('appsContainer');
  const featuredApps = document.getElementById('featuredApps');
  
  // Filtrar por país
  const availableApps = await filterAppsByCountry(appsToDisplay);
  
  if (availableApps.length > 0) {
    featuredApps.style.display = 'none';
    appsContainer.style.display = 'block';
    appsContainer.innerHTML = '';
    availableApps.forEach(app => {
      const appCard = document.createElement('div');
      appCard.classList.add('app-card');
      appCard.innerHTML = createAppCard(app);
      appCard.addEventListener('click', (e) => {
        if (!e.target.classList.contains('developer-link')) {
          openAppModal(app);
        }
      });
      appsContainer.appendChild(appCard);
    });
  } else {
    appsContainer.innerHTML = `
      <div class="no-apps-message">
        <h2>No se encontraron aplicaciones</h2>
        <p>No hay aplicaciones disponibles en tu región que coincidan con tu búsqueda.</p>
      </div>
    `;
    appsContainer.style.display = 'block';
    featuredApps.style.display = 'none';
  }
}

// Event Listeners
document.getElementById('searchInput').addEventListener('input', async (e) => {
  const searchTerm = e.target.value.toLowerCase();
  if (searchTerm) {
    const filteredApps = apps.filter(app =>
      app.name.toLowerCase().includes(searchTerm) ||
      app.developer.toLowerCase().includes(searchTerm) ||
      app.category.toLowerCase().includes(searchTerm)
    );
    await displayApps(filteredApps);
  } else {
    await displayFeaturedApps();
  }
});

document.getElementById('backButton').addEventListener('click', () => {
  document.getElementById('appModal').classList.remove('active');
});

document.getElementById('closeDeveloperModal').addEventListener('click', () => {
  document.getElementById('developerModal').style.display = 'none';
});

document.getElementById('developerModal').addEventListener('click', (e) => {
  if (e.target.id === 'developerModal') {
    document.getElementById('developerModal').style.display = 'none';
  }
});

// Estilos CSS
const styles = `
.coming-soon {
    background-color: #4a90e2;
    color: white;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    gap: 10px;
}

.coming-soon i {
    font-size: 1.2em;
}

.coming-soon-badge {
    background-color: #4a90e2;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8em;
    margin-top: 5px;
}

.coming-soon-tag {
    background-color: #4a90e2;
    color: white;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 0.75em;
    margin-top: 5px;
    display: inline-block;
}

.app-card:hover .coming-soon-tag {
    background-color: #357abd;
}

.media-container {
    position: relative;
    overflow: hidden;
    margin: 20px 0;
}

.media-wrapper {
    display: flex;
    transition: transform 0.3s ease;
    gap: 15px;
}

.media-item {
    flex: 0 0 auto;
    width: 100%;
    max-width: 300px;
    border-radius: 8px;
    overflow: hidden;
}

.carousel-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 10px;
}

.carousel-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ddd;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.carousel-dot.active {
    background-color: #4a90e2;
}

.availability-warning {
    background-color: #ff4444;
    color: white;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    gap: 10px;
}

.availability-warning.coming-soon {
    background-color: #4a90e2;
}

.action-btn[disabled] {
    background-color: #cccccc;
    cursor: not-allowed;
}

.no-apps-message {
    text-align: center;
    padding: 40px 20px;
    background: #f5f5f5;
    border-radius: 8px;
    margin: 20px 0;
}

.no-apps-message h2 {
    color: #333;
    margin-bottom: 10px;
}

.no-apps-message p {
    color: #666;
    max-width: 600px;
    margin: 0 auto;
}
`;

// Agregar los estilos al documento
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Inicializar la visualización de aplicaciones
displayFeaturedApps();

// ------------------------------
// Funcionalidad de traducción colaborativa en tiempo real
// ------------------------------

// Importa las funciones necesarias del SDK de Firebase Realtime Database
import { getDatabase, ref, update, onValue } from "firebase/database";

// Inicializa la base de datos utilizando la app ya inicializada
const database = getDatabase(app);

/**
 * Habilita la edición en línea para elementos translatables.
 * Los elementos deben tener la clase "translatable".
 * Cada elemento solo se puede editar 2 veces.
 */
function enableInlineTranslation() {
  document.body.addEventListener('click', function(event) {
    let target = event.target;
    if (target.classList.contains('translatable') && !target.isContentEditable) {
      // Verificar si el elemento ya alcanzó el límite de 2 ediciones
      let editCount = parseInt(target.getAttribute('data-edit-count') || "0", 10);
      if (editCount >= 2) {
        console.log('Límite de ediciones alcanzado para este elemento.');
        return; // No permitir más ediciones
      }

      event.stopPropagation();
      // Habilitar el modo edición
      target.contentEditable = true;
      target.focus();

      // Crear botón de guardar
      let saveBtn = document.createElement('button');
      saveBtn.textContent = 'Guardar';
      saveBtn.style.marginLeft = '10px';
      saveBtn.style.fontSize = '0.9em';
      saveBtn.style.cursor = 'pointer';
      // Insertar el botón justo después del elemento editable
      target.parentNode.insertBefore(saveBtn, target.nextSibling);

      // Listener para guardar los cambios
      saveBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        // Obtener el nuevo texto editado
        let newText = target.innerText;
        // Desactivar el modo edición
        target.contentEditable = false;
        saveBtn.remove();
        // Usar el atributo id del elemento para identificar la traducción en Firebase.
        // Si no tiene id, se le asigna uno único.
        let translationKey = target.id || 'trans_' + Math.random().toString(36).substr(2, 9);
        target.id = translationKey; // Asigna el id si no estaba definido

        // Incrementar el contador de ediciones
        editCount++;
        target.setAttribute('data-edit-count', editCount);

        // Actualizar el valor en Firebase Realtime Database
        const translationRef = ref(database, 'translations/' + translationKey);
        update(translationRef, {
          text: newText,
          editCount: editCount
        })
        .then(() => {
          console.log('Traducción actualizada en Firebase.');
        })
        .catch((error) => {
          console.error('Error actualizando la traducción:', error);
        });
      });
    }
  });
}

/**
 * Escucha en tiempo real los cambios en las traducciones almacenadas en Firebase
 * y actualiza el contenido de los elementos correspondientes.
 */
function listenForTranslationUpdates() {
  const translationsRef = ref(database, 'translations/');
  onValue(translationsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      Object.keys(data).forEach(key => {
        const elem = document.getElementById(key);
        if (elem && elem.innerText !== data[key].text) {
          elem.innerText = data[key].text;
          if (data[key].editCount !== undefined) {
            elem.setAttribute('data-edit-count', data[key].editCount);
          }
        }
      });
    }
  });
}

// Inicializar las funciones de traducción una vez cargado el DOM
document.addEventListener('DOMContentLoaded', () => {
  enableInlineTranslation();
  listenForTranslationUpdates();
});
 

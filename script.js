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
    version: "497.0.0.79.36",
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
    "name": "TikTok Lite",
    "developer": "TikTok Pte. Ltd.",
    "packageName": "com.zhiliaoapp.musically.go",
    "category": "Entretenimiento",
    "rating": 4.2,
    "size": "45 MB",
    "icon": "https://img.utdstc.com/icon/f02/722/f02722184e010a9bfeebdeb4b5f57db1cac50688db6f959c297940ae3c4d7002:200",
    "description": "TikTok Lite es la versión ligera y optimizada de la aplicación de vídeos cortos TikTok. Su menor tamaño y menor consumo de recursos la hace ideal para ser utilizada en dispositivos que tengan menos potencia o capacidades más limitadas.",
    "downloads": "2M+",
    "bannerGradient": "45deg, #FF0050, #FF2C55",
    "security": true,
    "version": "29.1.2",
    "isAvailable": true,
    "releaseDate": "2018-08-06T00:00:00",
    "allowedCountries": ["Global"],
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.zhiliaoapp.musically.go",
      "ios": "https://apps.apple.com/app/tiktok-lite/id6447160980"
    },
    "previousVersions": ["29.1.1", "29.0.9", "28.9.3"],
    "media": [
      {
        "type": "image",
        "url": "https://play-lh.googleusercontent.com/tiktok-lite-screenshot1.jpg"
      },
      {
        "type": "image",
        "url": "https://play-lh.googleusercontent.com/tiktok-lite-screenshot2.jpg"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=TikTokLiteDemo"
      }
    ]
  },
  {
    "name": "VK",
    "developer": "VK.com",
    "packageName": "com.vkontakte.android",
    "category": "Redes Sociales",
    "rating": 4.3,
    "size": "100 MB",
    "icon": "https://img.utdstc.com/icon/ed3/892/ed389254a73efcef2537d5234aa57495563852c43970586b58f836db4284f112:200",
    "description": "VK es una red social popular en Rusia, que permite a los usuarios comunicarse, compartir contenido multimedia y unirse a comunidades.",
    "downloads": "45M+",
    "bannerGradient": "45deg, #0077FF, #0055CC",
    "security": true,
    "version": "9.8.2",
    "isAvailable": true,
    "releaseDate": "2006-10-10T00:00:00",
    "allowedCountries": ["RU", "US", "BY", "KZ", "UA"],
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.vkontakte.android",
      "ios": "https://apps.apple.com/app/vk-social-network/id564177498"
    },
    "previousVersions": ["9.8.1", "9.7.5", "9.6.3"],
    "media": [
      {
        "type": "image",
        "url": "https://play-lh.googleusercontent.com/vk-screenshot1.jpg"
      },
      {
        "type": "image",
        "url": "https://play-lh.googleusercontent.com/vk-screenshot2.jpg"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=VKDemo"
      }
    ]
  },



  {
    "name": "Call of Duty Mobile",
    "developer": "Activision Publishing, Inc.",
    "packageName": "com.activision.callofduty.shooter",
    "category": "Juegos",
    "rating": 4.3,
    "size": "1.8 GB",
    "icon": "https://cdn-icons-png.flaticon.com/512/588/588267.png",
    "description": "Call of Duty: Mobile es un juego de disparos en primera persona que ofrece modos multijugador y Battle Royale.",
    "downloads": "500M+",
    "bannerGradient": "45deg, #131313, #000000",
    "security": true,
    "version": "1.0.40",
    "isAvailable": true,
    "releaseDate": "2019-10-01T00:00:00",
    "allowedCountries": ["US", "BR", "IN", "MX", "JP", "UK", "DE", "FR", "RU", "KR"],
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.activision.callofduty.shooter",
      "ios": "https://apps.apple.com/app/call-of-duty/id1287282214"
    },
    "previousVersions": ["1.0.39", "1.0.38", "1.0.37"],
    "media": [
      {
        "type": "image",
        "url": "https://play-lh.googleusercontent.com/cod-screenshot1.jpg"
      },
      {
        "type": "image",
        "url": "https://play-lh.googleusercontent.com/cod-screenshot2.jpg"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=CODMobileDemo"
      }
    ]
  },

  {
    "name": "Threads",
    "developer": "Meta",
    "packageName": "com.instagram.threads",
    "category": "Redes sociales",
    "rating": 4.0,
    "size": "64.3 MB",
    "icon": "https://cdn.prod.website-files.com/63c5640295a3b83ae7861a3c/64da4f65aad5dfeae27e70c3_Threads%20logo.png",
    "description": "Threads es la nueva app de texto de Instagram. Comparte actualizaciones y únete a conversaciones.",
    "downloads": "100M+",
    "bannerGradient": "45deg, #000000, #333333",
    "security": true,
    "version": "1.0.0",
    "isAvailable": true,
    "releaseDate": "2024-09-15T00:00:00",
    "allowedCountries": ["US", "ES", "MX", "AR", "CO", "PE", "CL"],
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.instagram.threads",
      "ios": "https://apps.apple.com/us/app/threads-an-instagram-app/id6446901002"
    },
    "previousVersions": [],
    "media": [{
        type: "image",
        "url": "/api/placeholder/200/400"
      },
      {
        "type": "video",
        "url": "dQw4w9WgXcQ"
      },
      {
        "type": "image",
        "url": "/api/placeholder/200/400"
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
  title: "Recomendadas",
  apps: [...availableApps].filter(app => app.rating >= 4.5).slice(0, 5)
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

function isVerifiedDeveloper(developer) {
  const devApps = apps.filter(app => app.developer === developer);
  const totalDownloads = devApps.reduce((sum, app) => sum + parseDownloads(app.downloads), 0);
  return devApps.length > 1 && totalDownloads > 3000000;
}

function createAppCard(app) {
  const isReleased = isAppReleased(app.releaseDate);
  const isVerified = isVerifiedDeveloper(app.developer);
  return `
    <div class="app-card">
      <div class="app-header" onclick="openAppModal(${JSON.stringify(app).replace(/\"/g, '&quot;')})">
        <img class="app-icon" src="${app.icon}" alt="${app.name}">
        <div class="app-info">
          <div class="app-name">${app.name}</div>
          <div class="app-developer">
            <span class="developer-link" onclick="event.stopPropagation(); showDeveloperApps('${app.developer}', event)">${app.developer}</span>
            ${isVerified ? '<i class="fas fa-check-circle verified-badge"></i>' : ''}
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
    <div class="modal-header-new">
      <div class="app-icon-container">
        <img class="app-icon-new" src="${app.icon}" alt="${app.name}">
      </div>
      <div class="app-info-new">
        <div class="app-name-new">${app.name}</div>
        <div class="app-version">Versión ${app.version}</div>
        <div class="app-developer-new">
          ${app.developer}
          ${isVerifiedDeveloper(app.developer) ? '<i class="fas fa-check-circle verified-badge"></i>' : ''}
        </div>
        <div class="app-category">${app.category}</div>
        <div class="package-name">${app.packageName}</div>
        </div>
    </div>

    <div class="app-details-scroll">
      <div class="detail-item">
        <div class="detail-label">Calificación</div>
        <div class="detail-value">★ ${app.rating}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Tamaño</div>
        <div class="detail-value">${app.size}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Descargas</div>
        <div class="detail-value">${app.downloads}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Versión</div>
        <div class="detail-value">${app.version}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Categoría</div>
        <div class="detail-value">${app.category}</div>
      </div>
    </div>

    <div class="rating-system">
      <div class="star-rating">
        ${[1, 2, 3, 4, 5].map(star => `
          <span class="star" data-rating="${star}" onclick="saveRating('${app.name}', ${star})">★</span>
        `).join('')}
      </div>
      <div id="ratingStats"></div>
    </div>

    <div class="action-container">
      ${isAvailableInCountry && isReleased && storeLink
        ? `<a href="${storeLink}" class="action-btn primary-btn" target="_blank">
             Descargar ${detectDevice() === 'ios' ? 'en App Store' : 'en Play Store'}
           </a>`
        : `<button class="action-btn primary-btn" disabled>
             ${!isReleased ? 'Próximamente' : 'No disponible'}
           </button>`
      }
      <button class="action-btn secondary-btn" onclick="togglePreviousVersions('${app.name}')">
        Ver versiones anteriores
      </button>
    </div>

    ${availabilityWarning}



    ${app.media && app.media.length > 0 ? `
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
  ` : ''}

    <p>${app.description}</p>

    ${isVerifiedDeveloper(app.developer) ? `
    <div class="developer-verification">
      <div class="verification-badge">
        <i class="fas fa-check-circle"></i> Desarrollador Verificado
      </div>
      <p>Este desarrollador tiene múltiples aplicaciones exitosas.</p>
    </div>
    ` : ''}

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
  const items = container.querySelectorAll('.media-item');
  let currentIndex = 0;
  let startX, currentX;
  let isDragging = false;

  function updateCarousel(index) {
    currentIndex = index;
    const slideWidth = container.querySelector('.media-item').offsetWidth + 15;
    wrapper.style.transform = `translateX(-${slideWidth * index}px)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  function handleTouchStart(e) {
    startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
    isDragging = true;
    wrapper.style.transition = 'none';
  }

  function handleTouchMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    currentX = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
    const diff = currentX - startX;
    const slideWidth = container.querySelector('.media-item').offsetWidth+ 15;
    wrapper.style.transform = `translateX(${-currentIndex * slideWidth + diff}px)`;
  }

  function handleTouchEnd() {
    if (!isDragging) return;
    isDragging = false;
    wrapper.style.transition = 'transform 0.3s ease';
    const slideWidth = container.querySelector('.media-item').offsetWidth + 15;
    const diff = currentX - startX;
    if (Math.abs(diff) > slideWidth / 3) {
      if (diff > 0 && currentIndex > 0) {
        updateCarousel(currentIndex - 1);
      } else if (diff < 0 && currentIndex < items.length - 1) {
        updateCarousel(currentIndex + 1);
      } else {
        updateCarousel(currentIndex);
      }
    } else {
      updateCarousel(currentIndex);
    }
  }

  // Eventos táctiles y de mouse
  wrapper.addEventListener('mousedown', handleTouchStart);
  wrapper.addEventListener('touchstart', handleTouchStart);
  wrapper.addEventListener('mousemove', handleTouchMove);
  wrapper.addEventListener('touchmove', handleTouchMove);
  wrapper.addEventListener('mouseup', handleTouchEnd);
  wrapper.addEventListener('touchend', handleTouchEnd);
  wrapper.addEventListener('mouseleave', handleTouchEnd);

  // Click en puntos
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => updateCarousel(index));
  });

  // Vista completa al hacer clic en imagen
  items.forEach((item, index) => {
    if (!item.classList.contains('video')) {
      item.addEventListener('click', () => {
        const fullscreenView = document.createElement('div');
        fullscreenView.className = 'fullscreen-view';
        fullscreenView.innerHTML = `
          <div class="fullscreen-content">
            <img src="${item.src}" alt="Fullscreen">
            <div class="fullscreen-nav">
              ${index > 0 ? '<button class="nav-prev">❮</button>' : ''}
              ${index < items.length - 1 ? '<button class="nav-next">❯</button>' : ''}
            </div>
            <button class="close-fullscreen">✕</button>
          </div>
        `;
        document.body.appendChild(fullscreenView);

        const closeBtn = fullscreenView.querySelector('.close-fullscreen');
        const prevBtn = fullscreenView.querySelector('.nav-prev');
        const nextBtn = fullscreenView.querySelector('.nav-next');

        closeBtn.addEventListener('click', () => fullscreenView.remove());
        if (prevBtn) prevBtn.addEventListener('click', () => {
          const prevItem = items[index - 1];
          if (!prevItem.classList.contains('video')) {
            fullscreenView.querySelector('img').src = prevItem.src;
          }
        });
        if (nextBtn) nextBtn.addEventListener('click', () => {
          const nextItem = items[index + 1];
          if (!nextItem.classList.contains('video')) {
            fullscreenView.querySelector('img').src = nextItem.src;
          }
        });
      });
    }
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

/* Rating System Styles */
.rating-system {
  margin-bottom: 20px;
}

.star-rating {
  display: flex;
}

.star {
  font-size: 2em;
  cursor: pointer;
  color: #ccc; /* Default color */
}

.star:hover,
.star.active {
  color: gold; /* Hover and active color */
}

#ratingStats {
  margin-top: 10px;
  font-style: italic;
}
`;

// Agregar los estilos al documento
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Dark Mode Functions
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// FAQ Functions
function showFaqSupport() {
    document.getElementById('settingsModal').style.display = 'none';
    document.getElementById('faqModal').style.display = 'block';
}

function showFaqArticle(articleId) {
    if (articleId === 'about') {
        document.getElementById('beappInfoModal').style.display = 'block';
        document.getElementById('faqModal').style.display = 'none';
    }
}

// FAQ Search
document.getElementById('faqSearch')?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const text = item.querySelector('h3').textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? 'flex' : 'none';
    });
});

// Settings Modal Functions
document.getElementById('settingsIcon').addEventListener('click', () => {
    document.getElementById('settingsModal').style.display = 'block';
});

document.getElementById('closeSettings').addEventListener('click', () => {
    document.getElementById('settingsModal').style.display = 'none';
});

function showBeappInfo() {
    document.getElementById('settingsModal').style.display = 'none';
    document.getElementById('beappInfoModal').style.display = 'block';
}

function backToSettings() {
    document.getElementById('beappInfoModal').style.display = 'none';
    document.getElementById('settingsModal').style.display = 'block';
}

// Websites data
const websites = [
  {
    name: "Google",
    url: "https://www.google.com",
    icon: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
    category: "Search Engine",
    developer: "Google LLC",
    description: "The world's most popular search engine.",
    rating: 4.8
  },
  {
    name: "Wikipedia",
    url: "https://www.wikipedia.org",
    icon: "https://cdn-icons-png.flaticon.com/512/2111/2111728.png",
    category: "Encyclopedia",
    developer: "Wikimedia Foundation",
    description: "The free online encyclopedia.",
    rating: 4.6
  },
  {
    name: "GitHub",
    url: "https://github.com",
    icon: "https://cdn-icons-png.flaticon.com/512/733/733609.png",
    category: "Development",
    developer: "GitHub Inc.",
    description: "Development platform for hosting and collaborating on code.",
    rating: 4.7
  }
];

function createWebsiteCard(website) {
  return `
    <div class="app-card" onclick="openWebsiteModal(${JSON.stringify(website).replace(/\"/g, '&quot;')})">
      <div class="app-header">
        <img class="app-icon" src="${website.icon}" alt="${website.name}">
        <div class="app-info">
          <div class="app-name">${website.name}</div>
          <div class="app-developer">${website.developer}</div>
          <div class="app-category">${website.category}</div>
          <div class="rating">
            <span class="stars">★★★★★</span>
            <span>${website.rating}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getWebsiteClicks() {
  return Math.floor(Math.random() * (1000000 - 10000) + 10000);
}

function openWebsiteModal(website) {
  const clicks = getWebsiteClicks();
  const isVerifiedDev = website.rating >= 4.5;
  const modalContent = document.getElementById('modalContent');
  
  modalContent.innerHTML = `
    <div class="modal-header-new">
      <div class="app-icon-container">
        <img class="app-icon-new" src="${website.icon}" alt="${website.name}">
      </div>
      <div class="app-info-new">
        <div class="app-name-new">${website.name}</div>
        <div class="app-developer-new">
          ${website.developer}
          ${isVerifiedDev ? '<i class="fas fa-check-circle verified-badge"></i>' : ''}
        </div>
        <div class="app-category">${website.category}</div>
        <div class="website-stats">
          <i class="fas fa-mouse-pointer"></i> ${clicks.toLocaleString()} clicks aproximados
        </div>
      </div>
    </div>
    
    <div class="app-details-scroll">
      <div class="detail-item">
        <div class="detail-label">Rating</div>
        <div class="detail-value">★ ${website.rating}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Categoría</div>
        <div class="detail-value">${website.category}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Clicks</div>
        <div class="detail-value">${clicks.toLocaleString()}</div>
      </div>
    </div>

    <div class="media-container">
      <div class="media-wrapper">
        <img src="${website.icon}" class="media-item" alt="${website.name}">
      </div>
      <div class="carousel-dots">
        <div class="carousel-dot active" data-index="0"></div>
      </div>
    </div>

    <div class="action-container">
      <a href="${website.url}" class="action-btn primary-btn" target="_blank">Visitar Sitio Web</a>
    </div>
    <p>${website.description}</p>
  `;
  
  document.getElementById('appModal').classList.add('active');
  initializeCarousel();
}

function showWebsitesSection() {
  document.getElementById('featuredApps').style.display = 'none';
  document.getElementById('gamesSection').style.display = 'none';
  document.getElementById('editorialSection').style.display = 'none';
  document.getElementById('websitesSection').style.display = 'block';

  const websitesContainer = document.getElementById('websitesContainer');
  websitesContainer.innerHTML = websites.map(website => createWebsiteCard(website)).join('');

  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  document.querySelector('.nav-item[href="#websites"]').classList.add('active');
}

// Navigation Functions
function showGamesSection() {
    document.getElementById('featuredApps').style.display = 'none';
    document.getElementById('gamesSection').style.display = 'block';
    document.getElementById('editorialSection').style.display = 'none';

    // Filter and display only games
    const gameApps = apps.filter(app => app.category === 'Juegos');
    const gamesContainer = document.getElementById('gamesContainer');
    gamesContainer.innerHTML = gameApps.map(app => createAppCard(app)).join('');

    // Update active navigation
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item[href="#games"]').classList.add('active');
}

function showEditorialSection() {
    document.getElementById('featuredApps').style.display = 'none';
    document.getElementById('gamesSection').style.display = 'none';
    document.getElementById('editorialSection').style.display = 'block';
    document.getElementById('websitesSection').style.display = 'none';

    // Update active navigation
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item[href="#editorial"]').classList.add('active');
}

// Home navigation
document.querySelector('.nav-item[href="#"]').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('featuredApps').style.display = 'block';
    document.getElementById('gamesSection').style.display = 'none';
    document.getElementById('editorialSection').style.display = 'none';
    document.getElementById('websitesSection').style.display = 'none';

    // Update active navigation
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    e.currentTarget.classList.add('active');
});

// Control de scroll para la barra de navegación
let lastScrollPosition = 0;
document.addEventListener('scroll', () => {
  const bottomNav = document.querySelector('.bottom-nav');
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScrollPosition) {
    // Scrolling down
    bottomNav.style.transform = 'translateY(100%)';
  } else {
    // Scrolling up
    bottomNav.style.transform = 'translateY(0)';
  }
  lastScrollPosition = currentScroll;
});

// Inicializar la visualización de aplicaciones
displayFeaturedApps();

// Function to save rating using local storage
function saveRating(appName, rating) {
  const ratings = JSON.parse(localStorage.getItem('appRatings')) || {};
  ratings[appName] = rating;
  localStorage.setItem('appRatings', JSON.stringify(ratings));
  updateRatingStats(appName);
  // Update star visual
  const stars = document.querySelectorAll(`.star-rating span.star`);
  stars.forEach(star => star.classList.remove('active'));
  const ratedStars = document.querySelectorAll(`.star-rating span.star[data-rating="${rating}"]`);
  ratedStars.forEach(star => star.classList.add('active'));
}

// Function to update rating statistics
function updateRatingStats(appName) {
  const ratings = JSON.parse(localStorage.getItem('appRatings')) || {};
  const appRatings = Object.values(ratings).filter(rating => rating); // Filter out undefined ratings
  const avgRating = appRatings.reduce((sum, rating) => sum + rating, 0) / appRatings.length || 0;
  const ratingStatsDiv = document.getElementById('ratingStats');
  ratingStatsDiv.innerHTML = `
    Promedio: ${avgRating.toFixed(1)} estrellas (${appRatings.length} votos)
  `;
}

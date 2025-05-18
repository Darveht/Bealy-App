function showAppOfDayModal(app) {
  const modal = document.createElement('div');
  modal.className = 'fullscreen-modal active';
  modal.innerHTML = `
    <div class="modal-content">
      <img src="${app.icon}" alt="${app.name}" style="width: 200px; height: 200px; border-radius: 30px; margin: 20px auto; display: block;">
      <h2 style="text-align: center; margin: 20px 0;">${app.name}</h2>
      <p style="text-align: center; margin: 20px 0;">${app.description}</p>
      <div style="text-align: center; margin-top: 30px;">
        <button class="action-btn primary-btn notify-btn">
          <i class="fas fa-bell"></i> Notificar cuando esté disponible
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
  
  const notifyBtn = modal.querySelector('.notify-btn');
  notifyBtn.addEventListener('click', () => {
    showNotification();
    modal.remove();
  });
}

function showNotification() {
  const notification = document.createElement('div');
  notification.className = 'notification-popup';
  notification.innerHTML = `
    <i class="fas fa-bell bell-icon"></i>
    <span>¡Te notificaremos cuando la app esté disponible!</span>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
    const bellIcon = notification.querySelector('.bell-icon');
    bellIcon.classList.add('animate');
  }, 100);
  
  setTimeout(() => {
    const bellIcon = notification.querySelector('.bell-icon');
    bellIcon.classList.add('animate');
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }, 100);
}

function shareApp(app) {
  if (navigator.share) {
    navigator.share({
      title: app.name,
      text: `¡Descubre ${app.name}! ${app.description}`,
      url: window.location.href
    });
  } else {
    // Fallback para navegadores que no soportan Web Share API
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = window.location.href;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    
    const notification = document.createElement('div');
    notification.className = 'notification-popup show';
    notification.innerHTML = `
      <i class="fas fa-check"></i>
      <span>¡Enlace copiado al portapapeles!</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Recomendación de apps similares por categoría
function getSimilarApps(currentApp) {
  return apps
    .filter(app => 
      app.category === currentApp.category && 
      app.name !== currentApp.name
    )
    .slice(0, 5);
}

// Algoritmo de recomendación basado en categoría y rating
function getRecommendedApps(currentApp) {
  return apps
    .filter(app => 
      app.name !== currentApp.name &&
      (app.category === currentApp.category ||
       app.developer === currentApp.developer ||
       Math.abs(app.rating - currentApp.rating) < 0.5)
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);
}

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

// Función para detectar país y actualizar la interfaz
async function detectCountry() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    const countryElement = document.getElementById('user-country');
    if (countryElement) {
      countryElement.innerHTML = `Tu país: ${data.country_name} (${data.country_code})`;
    }
    return data.country_code;
  } catch (error) {
    console.error('Error detecting country:', error);
    const countryElement = document.getElementById('user-country');
    if (countryElement) {
      countryElement.innerHTML = 'No se pudo detectar tu país';
    }
    return 'US';
  }
}

// Función mejorada para filtrar apps por país
async function filterAppsByCountry(appsToFilter) {
  try {
    const userCountry = await detectCountry();
    const filteredApps = appsToFilter.filter(app => {
      const isAvailable = app.allowedCountries.includes('Global') || 
                         app.allowedCountries.includes(userCountry);
      
      if (!isAvailable) {
        console.log(`App ${app.name} no disponible en ${userCountry}`);
      }
      
      return isAvailable;
    });
    
    return filteredApps;
  } catch (error) {
    console.error('Error filtrando apps por país:', error);
    return appsToFilter;
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
    downloads: "987.8M+",
    bannerGradient: "45deg, #1877f2, #0a3d62",
    security: false,
    version: "497.0.0.79.36",
    isAvailable: false,
    releaseDate: "2024-01-01T00:00:00",
    allowedCountries: ["US", "CA", "GB", "AU", "NZ", "MX", "BR", "IN", "JP", "DE", "FR", "ES"],
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
    "name": "Instagram",
    "developer": "Meta",
    "packageName": "com.instagram.android",
    "category": "Redes sociales",
    "rating": 4.5,
    "size": "90 MB",
    "icon": "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
    "description": "Instagram es una red social para compartir fotos y videos.",
    "downloads": "999M+",
    "bannerGradient": "45deg, #833AB4, #FD1D1D, #F56040",
    "security": false,
    "version": "250.0.0.12.34",
    "isAvailable": true,
    "releaseDate": "2024-05-01T00:00:00",
    "allowedCountries": ["US", "CA", "GB", "AU", "NZ", "MX", "BR", "IN", "JP", "DE", "FR", "ES"],
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.instagram.android",
      "ios": "https://apps.apple.com/us/app/instagram/id389801252"
    },
    "previousVersions": ["249.0.0.11.22", "248.0.0.10.11", "247.0.0.9.10"],
    "media": [
      {
        "type": "image",
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
  },
  {
    "name": "WhatsApp",
    "developer": "Meta",
    "packageName": "com.whatsapp",
    "category": "Comunicación",
    "rating": 4.3,
    "size": "50 MB",
    "icon": "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
    "description": "WhatsApp es una aplicación de mensajería instantánea.",
    "downloads": "5B+",
    "bannerGradient": "45deg, #25D366, #128C7E",
    "security": true,
    "version": "2.24.10.74",
    "isAvailable": true,
    "releaseDate": "2024-05-15T00:00:00",
    "allowedCountries": ["US", "CA", "GB", "AU", "NZ", "MX", "BR", "IN", "JP", "DE", "FR", "ES"],
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.whatsapp",
      "ios": "https://apps.apple.com/us/app/whatsapp-messenger/id310633997"
    },
    "previousVersions": ["2.24.9.78", "2.24.8.85", "2.24.7.79"],
    "media": [
      {
        "type": "image",
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
  },
  {
    "name": "Messenger",
    "developer": "Meta",
    "packageName": "com.facebook.orca",
    "category": "Comunicación",
    "rating": 4.1,
    "size": "60 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/3621/3621443.png",
    "description": "Messenger es una aplicación de mensajería para usuarios de Facebook.",
    "downloads": "868M+",
    "bannerGradient": "45deg, #006AFF, #0084FF",
    "security": false,
    "version": "450.0.0.43.109",
    "isAvailable": true,
    "releaseDate": "2024-05-10T00:00:00",
    "allowedCountries": ["US", "CA", "GB", "AU", "NZ", "MX", "BR", "IN", "JP", "DE", "FR", "ES"],
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.facebook.orca",
      "ios": "https://apps.apple.com/us/app/messenger/id454638411"
    },
    "previousVersions": ["449.0.0.41.107", "448.0.0.39.105", "447.0.0.37.103"],
    "media": [
      {
        "type": "image",
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
  },     
       {
  "name": "Revolut",
  "developer": "Revolut Ltd",
  "packageName": "com.revolut.revolut",
  "category": "Finanzas",
  "rating": 4.6,
  "size": "96 MB",
  "icon": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo4bDTL3GlEUF3XveYEges63qOtfgNfPzZXcKYDxsTwfrvE6Bk1-FT_7w&s=10",
  "description": "Revolut es una aplicación financiera que ofrece servicios bancarios modernos como cuentas digitales, tarjetas de débito, transferencias internacionales, inversión en acciones y criptomonedas, y control de gastos.",
  "downloads": "222.5K+",
  "bannerGradient": "45deg, #1000C9, #00BFFF",
  "security": true,
  "version": "10.12.1",
  "isAvailable": true,
  "releaseDate": "2015-07-01T00:00:00",
  "allowedCountries": ["US","MX", "GB", "IE", "FR", "DE", "ES", "IT", "AU", "SG", "LT"],
  "platforms": {
    "android": "https://play.google.com/store/apps/details?id=com.revolut.revolut",
    "ios": "https://apps.apple.com/app/revolut/id932493046"
  },
  "previousVersions": ["10.11.2", "10.10.0", "10.9.5"],
  "media": [
    {
      "type": "image",
      "url": "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/52/2f/da/522fdac2-35f3-570d-af9b-f4a7327f0180/Screen_1_1242x2688_mx-ES.jpg/300x0w.jpg"
    },
    {
      "type": "image",
      "url": "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/a2/94/b7/a294b71f-0703-38d5-346c-bbe03e0ffb9c/Screen_6_2048x2732_es-ES.jpg/643x0w.jpg"
    },
    {
      "type": "video",
      "url": "https://www.youtube.com/watch?v=RevolutDemo"
    }
  ]
},      
   {
    "name": "TikTok",
    "developer": "ByteDance",
    "packageName": "com.zhiliaoapp.musically",
    "category": "Redes sociales",
    "rating": 4.4,
    "size": "100 MB",
    "icon": "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg",
    "description": "TikTok es una plataforma de videos cortos que permite a los usuarios crear y compartir contenido creativo.",
    "downloads": "5.8B+",
    "bannerGradient": "45deg, #FF0050, #00F2EA",
    "security": false,
    "version": "36.0.0",
    "isAvailable": false,
    "releaseDate": "2024-10-01T00:00:00",
    "allowedCountries": ["US", "CA", "GB", "AU", "NZ", "MX", "BR", "IN", "JP", "DE", "FR", "ES"],
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.zhiliaoapp.musically",
      "ios": "https://apps.apple.com/us/app/tiktok/id835599320"
    },
    "previousVersions": ["35.9.0", "35.8.0", "35.7.0"],
    "media": [
      {
        "type": "image",
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
  },
  {
    "name": "Douyin",
    "developer": "ByteDance",
    "packageName": "com.ss.android.ugc.aweme",
    "category": "Redes sociales",
    "rating": 4.5,
    "size": "95 MB",
    "icon": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Douyin_logo.svg",
    "description": "Douyin es la versión china de TikTok, enfocada en videos cortos y comercio electrónico.",
    "downloads": "700M+",
    "bannerGradient": "45deg, #FF0000, #FFD700",
    "security": false,
    "version": "28.0.0",
    "isAvailable": true,
    "releaseDate": "2024-09-15T00:00:00",
    "allowedCountries": ["CN"],
    "platforms": {
      "android": "https://www.douyin.com/download",
      "ios": "https://www.douyin.com/download"
    },
    "previousVersions": ["27.9.0", "27.8.0", "27.7.0"],
    "media": [
      {
        "type": "image",
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
  },
  {
    "name": "CapCut",
    "developer": "ByteDance",
    "packageName": "com.lemon.lvoverseas",
    "category": "Edición de video",
    "rating": 4.6,
    "size": "80 MB",
    "icon": "https://upload.wikimedia.org/wikipedia/commons/1/1b/CapCut_logo.svg",
    "description": "CapCut es una herramienta de edición de video y fotos con funciones avanzadas de IA.",
    "downloads": "1B+",
    "bannerGradient": "45deg, #00C4B4, #7B68EE",
    "security": false,
    "version": "12.0.0",
    "isAvailable": false,
    "releaseDate": "2024-10-09T00:00:00",
    "allowedCountries": ["US", "CA", "GB", "AU", "NZ", "MX", "BR", "IN", "JP", "DE", "FR", "ES"],
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.lemon.lvoverseas",
      "ios": "https://apps.apple.com/us/app/capcut-video-editor/id1506865452"
    },
    "previousVersions": ["11.9.0", "11.8.0", "11.7.0"],
    "media": [
      {
        "type": "image",
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
  },
  {
    "name": "Lemon8",
    "developer": "ByteDance",
    "packageName": "com.bd.lemon8",
    "category": "Redes sociales",
    "rating": 4.3,
    "size": "70 MB",
    "icon": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Lemon8_logo.png",
    "description": "Lemon8 es una plataforma de redes sociales centrada en estilo de vida y contenido visual.",
    "downloads": "50M+",
    "bannerGradient": "45deg, #FFD700, #FF6347",
    "security": false,
    "version": "5.0.0",
    "isAvailable": false,
    "releaseDate": "2024-08-01T00:00:00",
    "allowedCountries": ["US", "CA", "GB", "AU", "NZ", "MX", "BR", "IN", "JP", "DE", "FR", "ES"],
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.bd.lemon8",
      "ios": "https://apps.apple.com/us/app/lemon8/id1541578250"
    },
    "previousVersions": ["4.9.0", "4.8.0", "4.7.0"],
    "media": [
      {
        "type": "image",
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
  },
  {
    "name": "Hypic",
    "developer": "ByteDance",
    "packageName": "com.bytedance.hypic",
    "category": "Edición de fotos",
    "rating": 4.2,
    "size": "65 MB",
    "icon": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Hypic_logo.png",
    "description": "Hypic es una aplicación de edición de fotos con herramientas de IA para retoques y efectos.",
    "downloads": "10M+",
    "bannerGradient": "45deg, #FF69B4, #8A2BE2",
    "security": false,
    "version": "3.0.0",
    "isAvailable": false,
    "releaseDate": "2024-07-15T00:00:00",
    "allowedCountries": ["US", "CA", "GB", "AU", "NZ", "MX", "BR", "IN", "JP", "DE", "FR", "ES"],
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.bytedance.hypic",
      "ios": "https://apps.apple.com/us/app/hypic-photo-editor-ai-art/id1623904357"
    },
    "previousVersions": ["2.9.0", "2.8.0", "2.7.0"],
    "media": [
      {
        "type": "image",
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
  },
  {
    "name": "Toutiao",
    "developer": "ByteDance",
    "packageName": "com.ss.android.article.news",
    "category": "Noticias",
    "rating": 4.1,
    "size": "55 MB",
    "icon": "https://upload.wikimedia.org/wikipedia/commons/2/2a/Toutiao_logo.png",
    "description": "Toutiao es una plataforma de noticias personalizada para usuarios en China.",
    "downloads": "300M+",
    "bannerGradient": "45deg, #FF4500, #FFD700",
    "security": false,
    "version": "9.0.0",
    "isAvailable": true,
    "releaseDate": "2024-06-01T00:00:00",
    "allowedCountries": ["CN"],
    "platforms": {
      "android": "https://www.toutiao.com/download",
      "ios": "https://www.toutiao.com/download"
    },
    "previousVersions": ["8.9.0", "8.8.0", "8.7.0"],
    "media": [
      {
        "type": "image",
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
  },
  {
    "name": "Xigua Video",
    "developer": "ByteDance",
    "packageName": "com.ss.android.ugc.xigua",
    "category": "Video",
    "rating": 4.0,
    "size": "60 MB",
    "icon": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Xigua_Video_logo.png",
    "description": "Xigua Video es una plataforma de videos cortos y largos en China.",
    "downloads": "100M+",
    "bannerGradient": "45deg, #FF6347, #FFA500",
    "security": false,
    "version": "8.0.0",
    "isAvailable": true,
    "releaseDate": "2024-05-20T00:00:00",
    "allowedCountries": ["CN"],
    "platforms": {
      "android": "https://www.ixigua.com/download",
      "ios": "https://www.ixigua.com/download"
    },
    "previousVersions": ["7.9.0", "7.8.0", "7.7.0"],
    "media": [
      {
        "type": "image",
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
  },
  {
    "name": "Lark",
    "developer": "ByteDance",
    "packageName": "com.larksuite.lark",
    "category": "Productividad",
    "rating": 4.2,
    "size": "120 MB",
    "icon": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Lark_logo.png",
    "description": "Lark es una suite de colaboración empresarial con herramientas de comunicación y gestión.",
    "downloads": "10M+",
    "bannerGradient": "45deg, #00B7D6, #0078D4",
    "security": true,
    "version": "7.0.0",
    "isAvailable": true,
    "releaseDate": "2024-04-15T00:00:00",
    "allowedCountries": ["US", "CA", "GB", "AU", "NZ", "MX", "BR", "IN", "JP", "DE", "FR", "ES"],
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.larksuite.lark",
      "ios": "https://apps.apple.com/us/app/lark-meetings/id1497811009"
    },
    "previousVersions": ["6.9.0", "6.8.0", "6.7.0"],
    "media": [
      {
        "type": "image",
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
  },
  {
    "name": "Helo",
    "developer": "ByteDance",
    "packageName": "com.helo.android",
    "category": "Redes sociales",
    "rating": 4.1,
    "size": "75 MB",
    "icon": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Helo_logo.png",
    "description": "Helo es una plataforma social para compartir contenido en idiomas regionales.",
    "downloads": "50M+",
    "bannerGradient": "45deg, #FF4500, #FFD700",
    "security": false,
    "version": "4.0.0",
    "isAvailable": true,
    "releaseDate": "2024-03-01T00:00:00",
    "allowedCountries": ["IN"],
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.helo.android",
      "ios": "https://apps.apple.com/in/app/helo/id1456079477"
    },
    "previousVersions": ["3.9.0", "3.8.0", "3.7.0"],
    "media": [
      {
        "type": "image",
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
    "releaseDate": "2025-05-28T00:00:00",
    "allowedCountries": ["US", "CA", "GB", "AU", "NZ", "MX", "BR", "IN", "JP", "DE", "FR", "ES"],
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
  "name": "Gemini",
  "developer": "Google LLC",
  "packageName": "com.google.gemini",
  "category": "Productividad",
  "rating": 4.3,
  "size": "50 MB",
  "icon": "https://play-lh.googleusercontent.com/Pkwn0AbykyjSuCdSYCbq0dvOqHP-YXcbBLTZ8AOUZhvnRuhUnZ2aJrw_YCf6kVMcZ4PM=w480-h960",
  "description": "Gemini es una aplicación impulsada por IA que ofrece asistencia conversacional, generación de contenido y respuestas inteligentes para mejorar la productividad y creatividad de los usuarios.",
  "downloads": "9K+",
  "bannerGradient": "45deg, #1A73E8, #FFFFFF",
  "security": true,
  "version": "1.2.3",
  "isAvailable": true,
  "releaseDate": "2024-05-28T00:00:00",
  "allowedCountries": ["US", "CA", "GB", "AU", "NZ", "FR", "DE", "ES", "IT", "IN"],
  "platforms": {
    "android": "https://play.google.com/store/apps/details?id=com.google.gemini",
    "ios": "https://apps.apple.com/app/gemini/id1677739987"
  },
  "previousVersions": ["1.2.2", "1.2.1", "1.1.0"],
  "media": [
    {
      "type": "image",
      "url": "https://play-lh.googleusercontent.com/gemini_screenshot1.jpg"
    },
    {
      "type": "image",
      "url": "https://play-lh.googleusercontent.com/gemini_screenshot2.jpg"
    },
    {
      "type": "video",
      "url": "https://www.youtube.com/watch?v=GeminiDemo"
    }
  ]
},
   {
  "name": "Grok",
  "developer": "X Corp.",
  "packageName": "com.xai.grok",
  "category": "Productividad",
  "rating": 4.8,
  "size": "60 MB",
  "icon": "https://play-lh.googleusercontent.com/dQRKhi30KpzG3gww3TdVLzyIAVuOAWylnAcgnEUxqfpm2A8dEt2sgApVvtKAy-DO8aI=w480-h960",
  "description": "Grok, creado por xAI, es una aplicación de IA conversacional que proporciona respuestas útiles y veraces, con funciones como modo de voz y acceso a funciones avanzadas para usuarios suscritos.",
  "downloads": "26M+",
  "bannerGradient": "45deg, #0A2540, #FFFFFF",
  "security": true,
  "version": "1.1.0",
  "isAvailable": true,
  "releaseDate": "2025-05-27T00:00:00",
  "allowedCountries": ["US", "MX", "CA", "GB", "AU", "NZ", "FR", "DE", "ES", "IT"],
  "platforms": {
    "android": "https://play.google.com/store/apps/details?id=com.xai.grok",
    "ios": "https://apps.apple.com/app/grok/id1666848348"
  },
  "previousVersions": ["1.0.9", "1.0.8", "1.0.7"],
  "media": [
    {
      "type": "image",
      "url": "https://play-lh.googleusercontent.com/grok_screenshot1.jpg"
    },
    {
      "type": "image",
      "url": "https://play-lh.googleusercontent.com/grok_screenshot2.jpg"
    },
    {
      "type": "video",
      "url": "https://www.youtube.com/watch?v=GrokDemo"
    }
  ]
},           
      {
  "name": "YouTube",
  "developer": "Google LLC",
  "packageName": "com.google.android.youtube",
  "category": "Entretenimiento",
  "rating": 4.2,
  "size": "135 MB",
  "icon": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjX5LVxRxYR6uDz_MyBLBgi6ihUSOBsm4g_XUvyBwt4b6INTXV2THSdouK&s=10",
  "description": "YouTube es una plataforma de videos donde los usuarios pueden ver, subir, comentar y compartir contenido multimedia de todo tipo, desde entretenimiento hasta educación.",
  "downloads": "87M+",
  "bannerGradient": "45deg, #FF0000, #282828",
  "security": true,
  "version": "20.20.35",
  "isAvailable": true,
  "releaseDate": "2005-12-15T00:00:00",
  "allowedCountries": ["US", "CA", "GB", "AU", "NZ", "MX", "BR", "IN", "JP", "DE", "FR", "ES"],
  "platforms": {
    "android": "https://play.google.com/store/apps/details?id=com.google.android.youtube",
    "ios": "https://apps.apple.com/app/youtube-watch-listen-stream/id544007664"
  },
  "previousVersions": ["19.19.34", "19.18.33", "19.17.32"],
  "media": [
    {
      "type": "image",
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2K2R8wqExZOWpxBSm5dnJCMebfVn0hOSWeLKyu8IIvolBjW-GvqxPPeA&s=10"
    },
    {
      "type": "image",
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0a0XPPgsd_h78NcHc8t3iELtjS6_Vc5IbQRBbBmhvkV_dgbaaZkeqs52X&s=10"
    },
    {
      "type": "video",
      "url": "https://www.youtube.com/watch?v=YouTubeDemo"
    }
  ]
},        
     {
  "name": "Among Us",
  "developer": "Innersloth LLC",
  "packageName": "com.innersloth.spacemafia",
  "category": "Juegos",
  "rating": 3.8,
  "size": "150 MB",
  "icon": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH5kwAJ6UBsqDvkyCKyjGNXpAqtLtMB0ED9jh0sGpZeAUPnrrW8BJsLCtF&s=10",
  "description": "Among Us es un juego multijugador en línea donde los jugadores trabajan en equipo para completar tareas, mientras intentan descubrir quiénes son los impostores infiltrados en la nave.",
  "downloads": "24M+",
  "bannerGradient": "45deg, #8A00D4, #FF0266",
  "security": true,
  "version": "2024.3.5",
  "isAvailable": true,
  "releaseDate": "2018-06-15T00:00:00",
  "allowedCountries": ["US", "CA", "GB", "AU", "MX", "BR", "DE", "FR", "JP", "KR"],
  "platforms": {
    "android": "https://play.google.com/store/apps/details?id=com.innersloth.spacemafia",
    "ios": "https://apps.apple.com/app/among-us/id1351168404"
  },
  "previousVersions": ["2024.2.1", "2023.12.12", "2023.10.24"],
  "media": [
    {
      "type": "image",
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEnCFwQIw8tkKGKRPQGskN7yZTwEUBSYF0Web2Jc6ekPOLGPPxyIiMq3Fh&s=10"
    },
    {
      "type": "image",
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxowrQieXVxcsKXISf8cqB97ZpDDMNgV_ISEcrmKkILVdjzYPIMcoJvySY&s=10"
    },
    {
      "type": "video",
      "url": "https://youtu.be/p0aHDT8wwrw?si=zjbUPvoNlgYvlCSZ"
    }
  ]
},    
    {
  "name": "Netflix",
  "developer": "Netflix, Inc.",
  "packageName": "com.netflix.mediaclient",
  "category": "Entretenimiento",
  "rating": 4.1,
  "size": "26 MB",
  "icon": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU3_FUVPsUWnfx0QU6CEByIfTew5jRQDkqakK-hmaQ3-VQ4wCzYO06kWs&s=10",
  "description": "Netflix es una plataforma de streaming donde puedes ver series, películas, documentales y más desde cualquier dispositivo conectado a internet.",
  "downloads": "79M+",
  "bannerGradient": "45deg, #E50914, #221F1F",
  "security": true,
  "version": "8.104.0",
  "isAvailable": true,
  "releaseDate": "2025-05-11T00:00:00",
  "allowedCountries": ["US", "CA", "GB", "AU", "NZ", "MX", "BR", "IN", "JP", "FR", "DE", "ES", "IT", "KR"],
  "platforms": {
    "android": "https://play.google.com/store/apps/details?id=com.netflix.mediaclient",
    "ios": "https://apps.apple.com/app/netflix/id363590051"
  },
  "previousVersions": ["8.105.1", "8.104.0", "8.103.1"],
  "media": [
    {
      "type": "image",
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI0LgqRAMAl19zN7GxROEvvUqysW2hwaFwk5Tj3Ckw5_hMYTLJkjN7V72w&s=10"
    },
    {
      "type": "image",
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMkdclk8qxprdD7pGKTp2-f5ccnPoI2PUrAYROhYnTCb0U2QzFL2yvi40&s=10"
    },
    {
      "type": "video",
      "url": "https://www.youtube.com/watch?v=O4XHCg1AaGQ"
    }
  ]
},        
   {
  "name": "VSCO",
  "developer": "VSCO",
  "packageName": "com.vsco.cam",
  "category": "Fotografía",
  "rating": 4.1,
  "size": "70 MB",
  "icon": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRla6UOCH5XlcDVIJhkgONdg0NwUMt96eKUJA&s",
  "description": "VSCO es una aplicación de edición fotográfica y comunidad creativa donde los usuarios pueden aplicar filtros profesionales, ajustar parámetros avanzados y compartir su trabajo artístico.",
  "downloads": "20K+",
  "bannerGradient": "45deg, #000000, #FFFFFF",
  "security": true,
  "version": "360",
  "isAvailable": true,
  "releaseDate": "2013-06-04T00:00:00",
  "allowedCountries": ["US", "CA", "GB", "AU", "NZ", "FR", "DE", "ES", "IT", "BR"],
  "platforms": {
    "android": "https://play.google.com/store/apps/details?id=com.vsco.cam",
    "ios": "https://apps.apple.com/app/vsco-photo-video-editor/id588013838"
  },
  "previousVersions": ["359", "358", "357.1"],
  "media": [
    {
      "type": "image",
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7mt6KSNE1IQgc6vNlAO7Hp36z_1V7fpOe6I3Lsz8t19VR7pKRzszEk0g&s=10"
    },
    {
      "type": "image",
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLhg0rXaOOFJn1QwoYWgIzZ1fgZM1vj92sVfEV3R-QNnf7QUi9N14v3wMM&s=10"
    },
    {
      "type": "video",
      "url": "https://www.youtube.com/watch?v=VscoDemo"
    }
  ]
},   
    {
  "name": "Edits, una app de Instagram",
  "developer": "Meta",
  "packageName": "com.edits.app",
  "category": "Fotografía",
  "rating": 4.6,
  "size": "75 MB",
  "icon": "https://play-lh.googleusercontent.com/BZSkyLJNJnqp91FtE1iSskcsalt9oJiepU_GEgr_bB5hVg5x8CUzHLoMmc2lNzm16Q=w480-h960",
  "description": "Edits es una app de creación de videos de Instagram que permite convertir ideas en videos fácilmente desde el teléfono. Cuenta con todas las herramientas que necesitas para facilitar tu proceso creativo, todo en un solo lugar.",
  "downloads": "2M+",
  "bannerGradient": "45deg, #FF0000, #0000FF",
  "security": true,
  "version": "1.0",
  "isAvailable": true,
  "releaseDate": "2025-06-01T00:00:00",
  "allowedCountries": ["US", "CA", "GB", "AU", "NZ", "FR", "DE", "ES", "IT", "BR", "MX"],
  "platforms": {
    "android": "https://play.google.com/store/apps/details?id=com.instagram.basel&pcampaignid=web_share",
    "ios": "https://apps.apple.com/us/app/edits-una-app-de-instagram/id6738967378?l=es-MX"
  },
  "previousVersions": ["0.9", "0.8"],
  "media": [
    {
      "type": "image",
      "url": "https://example.com/edits-screenshot1.png"
    },
    {
      "type": "image",
      "url": "https://play-lh.googleusercontent.com/NIEse_gfxOAFPizPGcmkAji5kdGLGQse5tA2yy7JEDynX-1RVhjvxLWRg3JuPfQz5Q=w5120-h2880"
    },
    {
      "type": "video",
      "url": "https://www.youtube.com/watch?v=EditsDemo"
    }
  ]
},          
   {
    "name": "Flip",
    "developer": "Flip Fit, Inc.",
    "packageName": "co.flip",
    "category": "Compras",
    "rating": 4.6,
    "size": "85 MB",
    "icon": "https://img.utdstc.com/icon/b2c/5f3/b2c5f3e8b756d80e5efbc15c7c08aaae02a367fa4028d0e897bad6b4c635a460:200",
    "description": "Flip es una aplicación de compras sociales donde los usuarios pueden ver reseñas en video y comprar productos directamente desde la plataforma.",
    "downloads": "4.3K+",
    "bannerGradient": "45deg, #00C853, #008744",
    "security": true,
    "version": "5.3.0",
    "isAvailable": true,
    "releaseDate": "2021-03-12T00:00:00",
    "allowedCountries": ["US", "CA", "GB", "AU", "NZ"],
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=co.flip",
      "ios": "https://apps.apple.com/app/flip-shop-with-your-friends/id1562633109"
    },
    "previousVersions": ["5.2.9", "5.2.5", "5.1.8"],
    "media": [
      {
        "type": "image",
        "url": "https://play-lh.googleusercontent.com/flip-screenshot1.jpg"
      },
      {
        "type": "image",
        "url": "https://play-lh.googleusercontent.com/flip-screenshot2.jpg"
      },
      {
        "type": "video",
        "url": "https://www.youtube.com/watch?v=FlipDemo"
      }
    ]
  },
   {
  "name": "Strava",
  "developer": "Strava Inc.",
  "packageName": "com.strava",
  "category": "Salud y bienestar",
  "rating": 4.6,
  "size": "53 MB",
  "icon": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq6-pAhborcUk1Nz7Pq09HRX56U038t6CmnsfmDM3iWuzFWZ_rE4DzpQvX&s=10",
  "description": "Strava es una aplicación para deportistas que permite registrar actividades como correr, andar en bicicleta, nadar y más, con seguimiento GPS, análisis de rendimiento y funciones sociales.",
  "downloads": "752.8K",
  "bannerGradient": "45deg, #FC4C02, #FF8330",
  "security": true,
  "version": "340.10",
  "isAvailable": true,
  "releaseDate": "2011-05-01T00:00:00",
  "allowedCountries": ["US", "CA", "GB", "AU", "NZ", "FR", "DE", "IT", "ES", "BR"],
  "platforms": {
    "android": "https://play.google.com/store/apps/details?id=com.strava",
    "ios": "https://apps.apple.com/app/strava-run-ride-swim/id426826309"
  },
  "previousVersions": ["340.9", "339.0", "338.5"],
  "media": [
    {
      "type": "image",
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5kktkm-uZhBYdx8RfLTrQX7MT1Se_d2n1y69SzlTK0IOuk3Gqo9LFD7xB&s=10"
    },
    {
      "type": "image",
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf1UJC8CvBmg76ds48nRCV6tKwb_rs5baEXESEax4iaVXzI-vaQo6dUrkC&s=10"
    },
    {
      "type": "video",
      "url": "https://www.youtube.com/watch?v=StravaDemo"
    }
  ]
},           
 {
  "name": "X",
  "developer": "X Corp.",
  "packageName": "com.twitter.android",
  "category": "Redes Sociales",
  "rating": 4.8,
  "size": "110 MB",
  "icon": "https://img.freepik.com/vector-gratis/nuevo-diseno-icono-x-logotipo-twitter-2023_1017-45418.jpg",
  "description": "X es una red social donde los usuarios pueden compartir pensamientos, noticias y multimedia en tiempo real a través de publicaciones llamadas 'posts'.",
  "downloads": "159M+",
  "bannerGradient": "45deg, #000000, #1DA1F2",
  "security": true,
  "version": "10.25.0",
  "isAvailable": true,
  "releaseDate": "2006-07-15T00:00:00",
  "allowedCountries": ["US", "CA", "GB", "AU", "NZ", "MX", "BR", "IN", "JP", "DE"],
  "platforms": {
    "android": "https://play.google.com/store/apps/details?id=com.twitter.android",
    "ios": "https://apps.apple.com/app/x/id333903271"
  },
  "previousVersions": ["10.24.0", "10.23.1", "10.22.5"],
  "media": [
    {
      "type": "image",
      "url": "https://pbs.twimg.com/media/F0x_example1.jpg"
    },
    {
      "type": "image",
      "url": "https://pbs.twimg.com/media/F0x_example2.jpg"
    },
    {
      "type": "video",
      "url": "https://www.youtube.com/watch?v=twitterDemo"
    }
  ]
},   
   {
    "name": "Discord",
    "developer": "Discord Inc.",
    "packageName": "com.discord",
    "category": "Comunicación",
    "rating": 4.5,
    "size": "80 MB",
    "icon": "https://www.svgrepo.com/show/353655/discord-icon.svg",
    "description": "Discord es una plataforma de comunicación diseñada para gamers, comunidades y amigos, que permite chats de texto, voz y video en servidores personalizados.",
    "downloads": "92M+",
    "bannerGradient": "45deg, #7289DA, #424549",
    "security": true,
    "version": "175.15",
    "isAvailable": true,
    "releaseDate": "2015-05-13T00:00:00",
    "allowedCountries": ["US", "CA", "GB", "AU", "MX", "BR", "DE", "FR", "JP", "KR"],
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.discord",
      "ios": "https://apps.apple.com/app/discord-chat-for-gamers/id985746746"
    },
    "previousVersions": ["175.14", "175.13", "175.12"],
    "media": [
      {
        "type": "image",
        "url": "https://example.com/discord_image1.png"
      },
      {
        "type": "image",
        "url": "https://example.com/discord_image2.png"
      },
      {
        "type": "video",
        "url": "https://example.com/discord_video.mp4"
      }
    ]
  },
  {
    "name": "Zoom",
    "developer": "Zoom Video Communications, Inc.",
    "packageName": "us.zoom.videomeetings",
    "category": "Productividad",
    "rating": 4.2,
    "size": "70 MB",
    "icon": "https://static.wikia.nocookie.net/callofduty/images/d/d6/App_Icon_COD_Mobile.png/revision/latest?cb=20190601124644",
    "description": "Zoom es una aplicación de videoconferencias que permite a los usuarios realizar reuniones virtuales, webinars y colaborar en tiempo real desde cualquier lugar.",
    "downloads": "9M+",
    "bannerGradient": "45deg, #0B5CFF, #2AB8F6",
    "security": true,
    "version": "5.17.0",
    "isAvailable": true,
    "releaseDate": "2012-09-01T00:00:00",
    "allowedCountries": ["US", "CA", "GB", "AU", "MX", "BR", "DE", "FR", "JP", "KR"],
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=us.zoom.videomeetings",
      "ios": "https://apps.apple.com/app/zoom-cloud-meetings/id546505307"
    },
    "previousVersions": ["5.16.9", "5.16.8", "5.16.7"],
    "media": [
      {
        "type": "image",
        "url": "https://example.com/zoom_image1.png"
      },
      {
        "type": "image",
        "url": "https://example.com/zoom_image2.png"
      },
      {
        "type": "video",
        "url": "https://example.com/zoom_video.mp4"
      }
    ]
  },
  {
    "name": "Candy Crush Saga",
    "developer": "King",
    "packageName": "com.king.candycrushsaga",
    "category": "Juegos",
    "rating": 4.6,
    "size": "90 MB",
    "icon": "https://images.dwncdn.net/images/t_app-icon-l/p/4e04077a-9b2b-11e6-9532-00163ec9f5fa/669609965/2111_4-77643134-logo",
    "description": "Candy Crush Saga es un juego de rompecabezas adictivo donde los jugadores combinan dulces para superar niveles y ganar recompensas.",
    "downloads": "38.9M+",
    "bannerGradient": "45deg, #FF69B4, #FFD700",
    "security": true,
    "version": "1.275.0.3",
    "isAvailable": true,
    "releaseDate": "2012-11-14T00:00:00",
    "allowedCountries": ["US", "CA", "GB", "AU", "MX", "BR", "DE", "FR", "JP", "KR"],
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.king.candycrushsaga",
      "ios": "https://apps.apple.com/app/candy-crush-saga/id553834731"
    },
    "previousVersions": ["1.274.0.2", "1.273.0.1", "1.272.0.0"],
    "media": [
      {
        "type": "image",
        "url": "https://example.com/candycrush_image1.png"
      },
      {
        "type": "image",
        "url": "https://example.com/candycrush_image2.png"
      },
      {
        "type": "video",
        "url": "https://example.com/candycrush_video.mp4"
      }
    ]
  },           
    {
  "name": "Reddit",
  "developer": "reddit inc.",
  "packageName": "com.reddit.frontpage",
  "category": "Utilidades ",
  "rating": null,
  "size": "118.5MB",
  "icon": "https://cdn6.aptoide.com/imgs/0/5/c/05c2271c0e114965490bee7962608507_icon.png?w=128",
  "description": "Reddit es el lugar más diverso de la red, donde gente de todo el mundo se reúne para compartir pasiones, ideas y experiencias, y tener las conversaciones más auténticas e interesantes de Internet.\n\n¿Quieres hacer preguntas, compartir opiniones, pedir un consejo, participar en un debate de política actual, o simplemente pasar el rato viendo memes, bromas y vídeos divertidos? En Reddit encontrarás subreddits para todo lo que puedas imaginar, con la mayor variedad de temas, desde lo más popular a lo más específico: Aquí es donde comunidades de gaming, foros de Internet, deportes, creadores de memes y fandoms se mezclan con streamers, aficionados a las noticias y redes sociales, expertos, profesionales veteranos, artistas y creadores de todo tipo. ¡un foro para cualquier tema que te interese!\n\nCon más de 100.000 comunidades sobre todos los temas que te puedas imaginar, Reddit es la plataforma donde podrás descubrir cosas nuevas. Aquí puedes profundizar sobre aquello que más te interese y debatir sobre cualquier tema a través de distintas comunidades. Siempre hay nuevos temas por explorar y cada experiencia, interés o hobby tiene su espacio en esta comunidad global.\n\n¿Quieres compartir tus opiniones e ideas en un debate, incluso de forma anónima? ¿Necesitas consejo o inspiración? ¿Te apasiona la historia o el fútbol? ¿Eres experto en series de televisión? ¿O buscas un buen meme para enviarle a tus amigos? En Reddit, las posibilidades son infinitas. Cada día, millones de usuarios comparten sus ideas, opiniones e intereses en este increíble foro virtual.",
  "downloads": "12.3M+",
  "bannerGradient": "45deg, #00C853, #008744",
  "security": true,
  "version": "2025.19.0",
  "isAvailable": true,
  "releaseDate": "2004-05-11T00:00:00",
  "allowedCountries": [
    "US",
    "CA",
    "GB",
    "AU",
    "NZ",
    "MX",
    "ES",
    "AR",
    "CO",
    "DO",
    "CU",
    "HN",
    "NI",
    "FR",
    "IT",
    "CN",
    "JP",
    "ID",
    "VN"
  ],
  "platforms": {
    "android": "https://play.google.com/store/apps/details?id=com.reddit.frontpage&pcampaignid=web_share",
    "ios": "https://apps.apple.com/us/app/reddit/id1064216828?l=es-MX"
  },
  "previousVersions": [
    "2025.19.0"
  ],
  "media": [
    {
      "type": "image",
      "url": "https://cdn6.aptoide.com/imgs/e/5/8/e58e11595e3638b5f527ea2a702e9cef_screen.png"
    },
    {
      "type": "image",
      "url": "https://cdn6.aptoide.com/imgs/e/6/9/e6933c11ac7571eaa16866bec5883730_screen.png"
    },
    {
      "type": "image",
      "url": "https://cdn6.aptoide.com/imgs/4/2/7/42718296fc6aeec8f7265f3fd2329ef3_screen.png"
    }
  ]
},          
  {
    "name": "Clapper",
    "developer": "Clapper Media Group Inc.",
    "packageName": "com.clapper.video",
    "category": "Redes Sociales",
    "rating": 4.4,
    "size": "347MB",
    "icon": "https://img.utdstc.com/icon/5f4/694/5f46941008be96f49123247309e5d2e280f04a3d108579ea6a39d75974b34ce6:200",
    "description": "Clapper es una plataforma de videos cortos que permite a los usuarios expresarse libremente y compartir contenido sin censura.",
    "downloads": "193K+",
    "bannerGradient": "45deg, #FF6600, #FF3300",
    "security": true,
    "version": "8.8.1",
    "isAvailable": true,
    "releaseDate": "2020-06-15T00:00:00",
    "allowedCountries": ["US", "CA", "GB", "AU", "BR", "MX"],
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.clapper.video",
      "ios": "https://apps.apple.com/app/clapper/id1516466348"
    },
    "previousVersions": ["2.8.0", "2.7.5", "2.7.1"],
    "media": [
      {
        "type": "image",
        "url": "https://cdn6.aptoide.com/imgs/a/1/d/a1d4ac6417cef6357b5bd3ae88a2f27b_screen.png"
      },
      {
        "type": "image",
        "url": "https://cdn6.aptoide.com/imgs/8/8/b/88bdd486e5194faecad9291b243e071c_screen.png"
      },
      {
        "type": "image",
        "url": "https://cdn6.aptoide.com/imgs/6/d/e/6de1a5c58001c2140fba0d48f4034ce3_screen.png"
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
    "downloads": "4M+",
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
    "icon": "https://img.utdstc.com/icon/398/3aa/3983aa6b3ad0e1723ab331d6ef41c6ceb9bdd0d6c93acb57b4ce352c06ddc01b:200",
    "description": "Call of Duty: Mobile es un juego de disparos en primera persona que ofrece modos multijugador y Battle Royale.",
    "downloads": "43.7M+",
    "bannerGradient": "45deg, #131313, #000000",
    "security": true,
    "version": "1.0.40",
    "isAvailable": false,
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
    "downloads": "79M+",
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

function simulateDownload(btn) {
  btn.disabled = true;
  const originalText = btn.innerHTML;
  btn.innerHTML = `
    <div class="download-progress">
      <div class="download-bar"></div>
      <span class="download-text">0%</span>
    </div>
  `;
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Completado';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }, 1000);
      }, 500);
    }
    const bar = btn.querySelector('.download-bar');
    const text = btn.querySelector('.download-text');
    if (bar && text) {
      bar.style.width = `${progress}%`;
      text.textContent = `${Math.round(progress)}%`;
    }
  }, 200);
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
  
  // Find upcoming app release
  const upcomingApp = apps.find(app => !isAppReleased(app.releaseDate));
  
  if (upcomingApp) {
    const appOfDaySection = document.createElement('div');
    appOfDaySection.className = 'app-of-day';
    appOfDaySection.innerHTML = `
      <div class="app-of-day-content">
        <img src="${upcomingApp.icon}" alt="${upcomingApp.name}" class="app-of-day-icon">
        <div class="app-of-day-info">
          <span class="app-of-day-tag">App del Día</span>
          <h2>${upcomingApp.name}</h2>
          <p>¡Próximo lanzamiento!</p>
          <div class="share-buttons">
            <button class="share-button notify-btn">
              <i class="fas fa-bell"></i> Notificar
            </button>
            <button class="share-button share-btn">
              <i class="fas fa-share-alt"></i> Compartir
            </button>
          </div>
        </div>
      </div>
    `;
    
    appOfDaySection.addEventListener('click', () => showAppOfDayModal(upcomingApp));
    featuredApps.appendChild(appOfDaySection);
    
    // Add notification functionality
    const notifyBtn = appOfDaySection.querySelector('.notify-btn');
    notifyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showNotification();
    });
    
    // Add share functionality
    const shareBtn = appOfDaySection.querySelector('.share-btn');
    shareBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      shareApp(upcomingApp);
    });
  }

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

    

    <div class="action-container">
      ${isAvailableInCountry && isReleased && storeLink
        ? `<button onclick="simulateDownload(this); setTimeout(() => window.open('${storeLink}', '_blank'), 2500)" class="action-btn primary-btn">
             Descargar ${detectDevice() === 'ios' ? 'en App Store' : 'en Play Store'}
           </button>`
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

    <!-- Similar Apps Section -->
    <div class="similar-apps-section">
      <h3>Apps en la misma categoría</h3>
      <div class="horizontal-scroll">
        ${getSimilarApps(app).map(similarApp => createAppCard(similarApp)).join('')}
      </div>
    </div>

    <!-- Recommendations Section -->
    <div class="recommendations-section">
      <h3>Quizás te pueden gustar</h3>
      <div class="horizontal-scroll">
        ${getRecommendedApps(app).map(recApp => createAppCard(recApp)).join('')}
      </div>
    </div>

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
// Add loading animation during search
document.getElementById('searchInput').addEventListener('input', async (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const appsContainer = document.getElementById('appsContainer');
  
  if (searchTerm) {
    // Show loading animation
    appsContainer.innerHTML = `
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Buscando aplicaciones...</p>
      </div>
    `;
    appsContainer.style.display = 'block';
    document.getElementById('featuredApps').style.display = 'none';
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
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

// Función para mostrar/ocultar la barra de búsqueda
document.querySelector('.search-toggle').addEventListener('click', () => {
    document.querySelector('.search-container').classList.toggle('active');
});

// Función para el menú lateral usando el nuevo botón
document.querySelector('.menu-toggle').addEventListener('click', toggleMenu);

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
    document.getElementById('websitesSection').style.display = 'none';

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
document.querySelector('.menu-item[href="#"]').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('featuredApps').style.display = 'block';
    document.getElementById('gamesSection').style.display = 'none';
    document.getElementById('editorialSection').style.display = 'none';
    document.getElementById('websitesSection').style.display = 'none';
    displayFeaturedApps(); // Aseguramos que se muestren las apps destacadas

    // Update active navigation
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    e.currentTarget.classList.add('active');
});

// Función para controlar el menú lateral
function toggleMenu() {
    const menu = document.querySelector('.side-menu');
    menu.classList.toggle('active');
}

// Actualizar elementos activos del menú
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        toggleMenu(); // Cerrar el menú después de seleccionar
    });
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

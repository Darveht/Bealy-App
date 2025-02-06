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
    releaseDate: "2024-01-01T00:00:00", // Ya disponible
    allowedCountries: ["ES", "MX", "AR", "CO", "PE", "CL"],
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
    "name": "Picta",
    "developer": "Universidad de Ciencias Informáticas (UCI)",
    "packageName": "com.uci.picta",
    "category": "Entretenimiento",
    "rating": 4.5,
    "size": "90 MB",
    "icon": "https://cubapk.com/media/repo/icons-640/cu.picta.android.10909.png",
    "description": "Picta es la plataforma de streaming cubana desarrollada por la UCI.",
    "downloads": "193 M",
    "bannerGradient": "45deg, #FF0000, #CC0000",
    "security": false,
    "version": "20.05.35",
    "isAvailable": true,
    releaseDate: "2025-02-07T00:00:00", // Ya disponible
    "allowedCountries": ["CU"],
    "platforms": {
        "android": "https://apklis.cu/com.uci.picta",
        "ios": "https://apps.apple.com/cu/app/picta/id1448744738"
    },
    "previousVersions": ["16.20.34", "16.20.33", "16.20.32"],
    "media": [
        {
            "type": "image",
            "url": "/api/placeholder/200/400"
        },
        {
            "type": "video",
            "url": "videoYouTubeId"
        },
        {
            "type": "image",
            "url": "/api/placeholder/200/400"
        }
    ]
},
         {
  name: "WhatsApp",
  developer: "WhatsApp Inc.",
  packageName: "com.whatsapp",
  category: "Mensajería",
  rating: 4.3,
  size: "75 MB",
  icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
  description: "WhatsApp es una aplicación de mensajería instantánea para conectar a las personas.",
  downloads: "294M+",
  bannerGradient: "45deg, #25D366, #075E54",
  security: true,
  version: "2.21.20.17",
  isAvailable: true,
  allowedCountries: ["US", "ES", "IN", "BR", "MX"],
  platforms: {
    android: "https://play.google.com/store/apps/details?id=com.whatsapp",
    ios: "https://apps.apple.com/app/whatsapp-messenger/id310633997"
  },
  previousVersions: ["2.21.20.16", "2.21.20.15", "2.21.20.14"],
  media: [{
      type: "image",
      url: "/api/placeholder/200/400"
    },
    {
      type: "video",
      url: "abc123example"
    },
    {
      type: "image",
      url: "/api/placeholder/200/400"
    }
  ]
},

  {
    name: "X",
    developer: "Twitter, Inc.",
    packageName: "com.twitter.android",
    category: "Redes sociales",
    rating: 4.0,
    size: "50 MB",
    icon: "https://cdn6.aptoide.com/imgs/e/9/f/e9f0145ff2d872f7c9b58c238c6bbd6a_icon.png?w=128",
    description: "La aplicación X es la plaza digital global de confianza para todo el mundo.X te permite:,Postear contenidos para que los vea todo el mundo y participar en conversaciones públicas,Mantenerte al día de las últimas noticias y seguir tus intereses mantenerte mejor informado gracias al contexto adicional de Notas de la comunidad,transmitir en directo con Espacios para audio o transmitir vídeos en directo,Conectar directamente con tus clientes para hacer crecer tu negocio",
    downloads: "23M+",
    bannerGradient: "45deg, #1DA1F2, #0D8BF2",
    security: false,
    version: "9.2.0",
    isAvailable: true,
    allowedCountries: [ "ES", "GB", "CA", "AU"],
    platforms: {
      android: "https://play.google.com/store/apps/details?id=com.twitter.android",
      ios: "https://apps.apple.com/app/twitter/id333903271"
    },
    previousVersions: ["9.1.0", "9.0.0", "8.9.0"],
    media: [
      {
        type: "image",
        url: "https://cdn6.aptoide.com/imgs/b/e/d/bed33ccca12359a842ca74215931031d_screen.png"
      },

      {
        type: "image",
        url: "https://cdn6.aptoide.com/imgs/9/5/b/95b73aec2115f55c14263bc5436f6ade_screen.png"
      }
    ]
  },
  {
    name: "LinkedIn",
    developer: "LinkedIn Corporation",
    packageName: "com.linkedin.android",
    category: "Profesional",
    rating: 4.3,
    size: "70 MB",
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    description: "LinkedIn es una red social orientada a profesionales y empresas.",
    downloads: "6M+",
    bannerGradient: "45deg, #0077B5, #005582",
    security: false,
    version: "5.0.0",
    isAvailable: true,
    allowedCountries: ["US", "ES", "MX", "BR", "IN"],
    platforms: {
      android: "https://play.google.com/store/apps/details?id=com.linkedin.android",
      ios: "https://apps.apple.com/app/linkedin/id288429040"
    },
    previousVersions: ["4.9.0", "4.8.0", "4.7.0"],
    media: [
      {
        type: "image",
        url: "https://cdn.dribbble.com/users/1525393/screenshots/6420056/comp_4.gif"
      }
  
    ]
  },
  {
    name: "Snapchat",
    developer: "Snap Inc.",
    packageName: "com.snapchat.android",
    category: "Mensajería",
    rating: 4.1,
    size: "45 MB",
    icon: "https://cdn6.aptoide.com/imgs/4/a/b/4ab59bf6437538d0d99264293ef3c479_icon.png?w=128",
    description: "Snapchat es una aplicación de mensajería efímera y filtros creativos.",
    downloads: "64M+",
    bannerGradient: "45deg, #FFFC00, #FFFC00",
    security: false,
    version: "10.50.0.0",
    isAvailable: true,
    allowedCountries: ["US", "ES", "MX", "GB", "FR"],
    platforms: {
      android: "https://play.google.com/store/apps/details?id=com.snapchat.android",
      ios: "https://apps.apple.com/app/snapchat/id447188370"
    },
    previousVersions: ["10.49.0.0", "10.48.0.0", "10.47.0.0"],
    media: [
      {
        type: "image",
        url: "https://techcrunch.com/wp-content/uploads/2014/02/ivkd8z9.gif"
      },
      {
        type: "video",
        url: "https://youtu.be/pDZ4Li5hFao"
      },
      {
        type: "image",
        url: "/api/placeholder/200/400"
      }
    ]
  },
  {
    name: "TikTok",
    developer: "TikTok Inc.",
    packageName: "com.zhiliaoapp.musically",
    category: "Entretenimiento",
    rating: 4.5,
    size: "80 MB",
    icon: "https://upload.wikimedia.org/wikipedia/en/0/08/TikTok_logo.svg",
    description: "TikTok es una plataforma para crear y ver videos cortos.",
    downloads: "22M+",
    bannerGradient: "45deg, #69C9D0, #EE1D52",
    security: false,
    version: "21.1.0",
    isAvailable: true,
    allowedCountries: [ "ES", "MX", "BR", "IN"],
    platforms: {
      android: "https://play.google.com/store/apps/details?id=com.zhiliaoapp.musically",
      ios: "https://apps.apple.com/app/tiktok/id835599320"
    },
    previousVersions: ["21.0.0", "20.9.0", "20.8.0"],
    media: [
      {
        type: "image",
        url: "/api/placeholder/200/400"
      },
      {
        type: "video",
        url: "videoTikTokId"
      },
      {
        type: "image",
        url: "/api/placeholder/200/400"
      }
    ]
  },
  {
    name: "Pinterest",
    developer: "Pinterest, Inc.",
    packageName: "com.pinterest",
    category: "Estilo de vida",
    rating: 4.2,
    size: "60 MB",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png",
    description: "Pinterest es una plataforma para descubrir ideas e inspiraciones visuales.",
    downloads: "20.9 M",
    bannerGradient: "45deg, #E60023, #B30017",
    security: false,
    version: "8.3.0",
    isAvailable: true,
    allowedCountries: ["US", "ES", "CU","MX", "GB"],
    platforms: {
      android: "https://play.google.com/store/apps/details?id=com.pinterest",
      ios: "https://apps.apple.com/app/pinterest/id429047995"
    },
    previousVersions: ["8.2.0", "8.1.0", "8.0.0"],
    media: [
      {
        type: "image",
        url: ""
      },
      {
        type: "video",
        url: "videoPinterestId"
      },
      {
        type: "image",
        url: "/api/placeholder/200/400"
      }
    ]
  },
      {
    name: "Edits, an Instagram app",
    developer: "Instagram, Inc.",
    packageName: "com.instagramedit",
    category: "Estilo de vida",
    rating: 0.0,
    size: "60 MB",
    icon: "https://2.img-dpreview.com/files/p/E~TS940x788~articles/4018562730/instagram-edits-app-logo-on-white.jpeg",
    description: "Make videos you're proud to share with Edits, the new video creation app from Instagram. Edits is a free video editor that makes it easy for creators to ...",
    downloads: "0",
    bannerGradient: "45deg, #E60023, #B30017",
    security: false,
    version: "1.0.1",
    isAvailable: true,
    releaseDate: "2025-03-13T00:00:00", // Ya disponible
    allowedCountries: [ "US","ES", "CU","MX", "GB"],
    platforms: {
      android: "https://apps.apple.com/mx/app/edits-an-instagram-app/id6738967378",
      ios: "https://apps.apple.com/mx/app/edits-an-instagram-app/id6738967378"
    },
    previousVersions: ["8.2.0", "8.1.0", "8.0.0"],
    media: [
      {
        type: "image",
        url: ""
      },
      {
        type: "video",
        url: "videoPinterestId"
      },
      {
        type: "image",
        url: "/api/placeholder/200/400"
      }
    ]
  },         
  {
    name: "Reddit",
    developer: "Reddit Inc.",
    packageName: "com.reddit.frontpage",
    category: "Foros",
    rating: 4.4,
    size: "55 MB",
    icon: "https://img.utdstc.com/icon/bde/8fb/bde8fb5ef1c8cd4c5d94ff4b38784b4fe284ed29369e0653edc5571a7a8199cb:200",
    description: "Reddit es una comunidad en línea para discutir temas de todo tipo.",
    downloads: "3.1M+",
    bannerGradient: "45deg, #FF4500, #CC3700",
    security: false,
    version: "2025.05.0",
    isAvailable: true,
    allowedCountries: ["US", "ES", "MX", "GB"],
    platforms: {
      android: "https://play.google.com/store/apps/details?id=com.reddit.frontpage",
      ios: "https://apps.apple.com/app/reddit/id1064216828"
    },
    previousVersions: ["2021.32.0", "2021.31.0", "2021.30.0"],
    media: [
      {
        type: "image",
        url: "/api/placeholder/200/400"
      },
      {
        type: "video",
        url: "videoRedditId"
      },
      {
        type: "image",
        url: "/api/placeholder/200/400"
      }
    ]
  },

  {
    name: "YouTube",
    developer: "Google LLC",
    packageName: "com.google.android.youtube",
    category: "Entretenimiento",
    rating: 4.5,
    size: "90 MB",
    icon: "https://img.utdstc.com/icon/367/c07/367c07a62d78fa7d0253ec501c789b8251ac8fb62e2d0185ed38c9417af1bed0:200",
    description: "YouTube es la plataforma líder para compartir y ver videos.",
    downloads: "193 M",
    bannerGradient: "45deg, #FF0000, #CC0000",
    security: false,
    version: "20.05.35",
    isAvailable: true,
    allowedCountries: ["US", "ES", "MX", "IN", "BR"],
    platforms: {
      android: "https://play.google.com/store/apps/details?id=com.google.android.youtube",
      ios: "https://apps.apple.com/app/youtube-watch-listen-stream/id544007664"
    },
    previousVersions: ["16.20.34", "16.20.33", "16.20.32"],
    media: [
      {
        type: "image",
        url: "/api/placeholder/200/400"
      },
      {
        type: "video",
        url: "videoYouTubeId"
      },
      {
        type: "image",
        url: "/api/placeholder/200/400"
      }
    ]
  },
  {
    name: "Gmail",
    developer: "Google LLC",
    packageName: "com.google.android.gm",
    category: "Correo",
    rating: 4.4,
    size: "35 MB",
    icon: "https://img.utdstc.com/icon/724/b32/724b323eaeb45d27cbc027972516215a0ee3358c6f20840b66474470182e7110:200",
    description: "Gmail es el servicio de correo electrónico de Google.",
    downloads: "22.3M+",
    bannerGradient: "45deg, #D93025, #C5221F",
    security: true,
    version: "2025.01.19.721010531.Release",
    isAvailable: true,
    allowedCountries: ["US", "ES", "MX", "GB", "FR"],
    platforms: {
      android: "https://play.google.com/store/apps/details?id=com.google.android.gm",
      ios: "https://apps.apple.com/app/gmail-email-by-google/id422689480"
    },
    previousVersions: ["2021.03.14", "2021.03.13", "2021.03.12"],
    media: [
      {
        type: "image",
        url: "/api/placeholder/200/400"
      },
      {
        type: "video",
        url: "videoGmailId"
      },
      {
        type: "image",
        url: "/api/placeholder/200/400"
      }
    ]
  },
  {
    name: "Google Maps",
    developer: "Google LLC",
    packageName: "com.google.android.apps.maps",
    category: "Navegación",
    rating: 4.6,
    size: "65 MB",
    icon: "https://img.utdstc.com/icon/917/982/917982f428a3667861b22835169e9012f3fcc9bb364266024f27b25d2c26a9cd:200",
    description: "Google Maps ofrece navegación y mapas detallados para ubicar destinos.",
    downloads: "29.9 M",
    bannerGradient: "45deg, #4285F4, #3367D6",
    security: true,
    version: "11.45.0",
    isAvailable: true,
    allowedCountries: ["US", "ES", "MX", "CA", "FR"],
    platforms: {
      android: "https://play.google.com/store/apps/details?id=com.google.android.apps.maps",
      ios: "https://apps.apple.com/app/google-maps-transit-food/id585027354"
    },
    previousVersions: ["11.44.0", "11.43.0", "11.42.0"],
    media: [
      {
        type: "image",
        url: "/api/placeholder/200/400"
      },
      {
        type: "video",
        url: "videoMapsId"
      },
      {
        type: "image",
        url: "/api/placeholder/200/400"
      }
    ]
  },
  {
    name: "Google Drive",
    developer: "Google LLC",
    packageName: "com.google.android.apps.docs",
    category: "Productividad",
    rating: 4.3,
    size: "50 MB",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png",
    description: "Google Drive es un servicio de almacenamiento y sincronización en la nube.",
    downloads: "5B+",
    bannerGradient: "45deg, #4285F4, #34A853",
    security: true,
    version: "2.20.0",
    isAvailable: true,
    allowedCountries: ["US", "ES", "MX", "IN"],
    platforms: {
      android: "https://play.google.com/store/apps/details?id=com.google.android.apps.docs",
      ios: "https://apps.apple.com/app/google-drive/id507874739"
    },
    previousVersions: ["2.19.0", "2.18.0", "2.17.0"],
    media: [
      {
        type: "image",
        url: "/api/placeholder/200/400"
      },
      {
        type: "video",
        url: "videoDriveId"
      },
      {
        type: "image",
        url: "/api/placeholder/200/400"
      }
    ]
  },
  {
    name: "Uber",
    developer: "Uber Technologies Inc.",
    packageName: "com.ubercab",
    category: "Transporte",
    rating: 4.2,
    size: "85 MB",
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.svg",
    description: "Uber es una plataforma para solicitar servicios de transporte.",
    downloads: "500M+",
    bannerGradient: "45deg, #000000, #434343",
    security: true,
    version: "9.41.0",
    isAvailable: true,
    allowedCountries: ["US", "ES", "MX", "CA"],
    platforms: {
      android: "https://play.google.com/store/apps/details?id=com.ubercab",
      ios: "https://apps.apple.com/app/uber/id368677368"
    },
    previousVersions: ["9.40.0", "9.39.0", "9.38.0"],
    media: [
      {
        type: "image",
        url: "/api/placeholder/200/400"
      },
      {
        type: "video",
        url: "videoUberId"
      },
      {
        type: "image",
        url: "/api/placeholder/200/400"
      }
    ]
  },
  {
    name: "Airbnb",
    developer: "Airbnb, Inc.",
    packageName: "com.airbnb.android",
    category: "Viajes",
    rating: 4.5,
    size: "110 MB",
    icon: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
    description: "Airbnb conecta viajeros con anfitriones de todo el mundo para reservar alojamientos.",
    downloads: "200M+",
    bannerGradient: "45deg, #FF5A5F, #D64242",
    security: true,
    version: "21.0.0",
    isAvailable: true,
    allowedCountries: ["US", "ES", "MX", "GB", "FR"],
    platforms: {
      android: "https://play.google.com/store/apps/details?id=com.airbnb.android",
      ios: "https://apps.apple.com/app/airbnb/id401626263"
    },
    previousVersions: ["20.9.0", "20.8.0", "20.7.0"],
    media: [
      {
        type: "image",
        url: "/api/placeholder/200/400"
      },
      {
        type: "video",
        url: "videoAirbnbId"
      },
      {
        type: "image",
        url: "/api/placeholder/200/400"
      }
    ]
  },
  {
    name: "Slack",
    developer: "Slack Technologies",
    packageName: "com.Slack",
    category: "Productividad",
    rating: 4.4,
    size: "60 MB",
    icon: "https://img.utdstc.com/icon/720/b00/720b002083e219959f2e503f2f197151e1f691c583a552512a594cb94e2d243d:200",
    description: "Slack es una plataforma de comunicación colaborativa para equipos.",
    downloads: "402.5 k",
    bannerGradient: "45deg, #4A154B, #3F0E40",
    security: true,
    version: "21.04.0",
    isAvailable: true,
    allowedCountries: ["US", "ES", "MX", "GB"],
    platforms: {
      android: "https://play.google.com/store/apps/details?id=com.Slack",
      ios: "https://apps.apple.com/app/slack/id618783545"
    },
    previousVersions: ["21.03.0", "21.02.0", "21.01.0"],
    media: [
      {
        type: "image",
        url: "/api/placeholder/200/400"
      },
      {
        type: "video",
        url: "videoSlackId"
      },
      {
        type: "image",
        url: "/api/placeholder/200/400"
      }
    ]
  },
  {
    name: "Trello",
    developer: "Atlassian",
    packageName: "com.trello",
    category: "Productividad",
    rating: 4.5,
    size: "35 MB",
    icon: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Trello_logo.svg",
    description: "Trello es una herramienta de gestión de proyectos basada en tableros visuales.",
    downloads: "10M+",
    bannerGradient: "45deg, #0079BF, #005A8C",
    security: true,
    version: "12.3.0",
    isAvailable: true,
    allowedCountries: ["US", "ES", "MX", "CA"],
    platforms: {
      android: "https://play.google.com/store/apps/details?id=com.trello",
      ios: "https://apps.apple.com/app/trello/id461504587"
    },
    previousVersions: ["12.2.0", "12.1.0", "12.0.0"],
    media: [
      {
        type: "image",
        url: "/api/placeholder/200/400"
      },
      {
        type: "video",
        url: "videoTrelloId"
      },
      {
        type: "image",
        url: "/api/placeholder/200/400"
      }
    ]
  },
  {
    name: "Zoom",
    developer: "Zoom Video Communications",
    packageName: "us.zoom.videomeetings",
    category: "Videoconferencias",
    rating: 4.7,
    size: "85 MB",
    icon: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Logo.svg",
    description: "Zoom es una plataforma para videoconferencias y reuniones virtuales.",
    downloads: "1B+",
    bannerGradient: "45deg, #2D8CFF, #005FCC",
    security: true,
    version: "5.7.1",
    isAvailable: true,
    allowedCountries: ["US", "ES", "MX", "GB", "AU"],
    platforms: {
      android: "https://play.google.com/store/apps/details?id=us.zoom.videomeetings",
      ios: "https://apps.apple.com/app/zoom-cloud-meetings/id546505307"
    },
    previousVersions: ["5.7.0", "5.6.9", "5.6.8"],
    media: [
      {
        type: "image",
        url: "/api/placeholder/200/400"
      },
      {
        type: "video",
        url: "videoZoomId"
      },
      {
        type: "image",
        url: "/api/placeholder/200/400"
      }
    ]
  },
  {
    name: "Microsoft Teams",
    developer: "Microsoft Corporation",
    packageName: "com.microsoft.teams",
    category: "Productividad",
    rating: 4.3,
    size: "100 MB",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg",
    description: "Microsoft Teams es una herramienta para colaboración y comunicación en empresas.",
    downloads: "500M+",
    bannerGradient: "45deg, #6264A7, #464775",
    security: true,
    version: "2.0.0",
    isAvailable: true,
    allowedCountries: ["US", "ES", "MX", "CA"],
    platforms: {
      android: "https://play.google.com/store/apps/details?id=com.microsoft.teams",
      ios: "https://apps.apple.com/app/microsoft-teams/id1113153706"
    },
    previousVersions: ["1.9.9", "1.9.8", "1.9.7"],
    media: [
      {
        type: "image",
        url: "/api/placeholder/200/400"
      },
      {
        type: "video",
        url: "videoTeamsId"
      },
      {
        type: "image",
        url: "/api/placeholder/200/400"
      }
    ]
  },
  {
    name: "Skype",
    developer: "Microsoft Corporation",
    packageName: "com.skype.raider",
    category: "Comunicación",
    rating: 4.0,
    size: "40 MB",
    icon: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Skype_logo.svg",
    description: "Skype es una aplicación para llamadas y videollamadas.",
    downloads: "1B+",
    bannerGradient: "45deg, #00AFF0, #0086C0",
    security: true,
    version: "8.68.0.92",
    isAvailable: true,
    allowedCountries: ["US", "ES", "MX", "GB"],
    platforms: {
      android: "https://play.google.com/store/apps/details?id=com.skype.raider",
      ios: "https://apps.apple.com/app/skype-for-iphone/id304878510"
    },
    previousVersions: ["8.67.0.90", "8.66.0.88", "8.65.0.86"],
    media: [
      {
        type: "image",
        url: "/api/placeholder/200/400"
      },
      {
        type: "video",
        url: "videoSkypeId"
      },
      {
        type: "image",
        url: "/api/placeholder/200/400"
      }
    ]
  },
  {
    name: "Outlook",
    developer: "Microsoft Corporation",
    packageName: "com.microsoft.office.outlook",
    category: "Correo",
    rating: 4.2,
    size: "50 MB",
    icon: "https://upload.wikimedia.org/wikipedia/commons/5/55/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg",
    description: "Outlook es un cliente de correo electrónico y calendario de Microsoft.",
    downloads: "500M+",
    bannerGradient: "45deg, #0072C6, #005A9E",
    security: true,
    version: "4.2208.0",
    isAvailable: true,
    allowedCountries: ["US", "ES", "MX", "GB", "CA"],
    platforms: {
      android: "https://play.google.com/store/apps/details?id=com.microsoft.office.outlook",
      ios: "https://apps.apple.com/app/microsoft-outlook/id951937596"
    },
    previousVersions: ["4.2207.0", "4.2206.0", "4.2205.0"],
    media: [
      {
        type: "image",
        url: "/api/placeholder/200/400"
      },
      {
        type: "video",
        url: "videoOutlookId"
      },
      {
        type: "image",
        url: "/api/placeholder/200/400"
      }
    ]
  },
  {
    name: "Dropbox",
    developer: "Dropbox Inc.",
    packageName: "com.dropbox.android",
    category: "Productividad",
    rating: 4.2,
    size: "45 MB",
    icon: "https://upload.wikimedia.org/wikipedia/commons/7/79/Dropbox_logo_2017.svg",
    description: "Dropbox es un servicio de almacenamiento y compartición de archivos en la nube.",
    downloads: "100M+",
    bannerGradient: "45deg, #0061FF, #0040C0",
    security: true,
    version: "123.4.5",
    isAvailable: true,
    allowedCountries: ["US", "ES", "MX", "GB", "FR"],
    platforms: {
      android: "https://play.google.com/store/apps/details?id=com.dropbox.android",
      ios: "https://apps.apple.com/app/dropbox/id327630330"
    },
    previousVersions: ["123.4.4", "123.4.3", "123.4.2"],
    media: [
      {
        type: "image",
        url: "/api/placeholder/200/400"
      },
      {
        type: "video",
        url: "videoDropboxId"
      },
      {
        type: "image",
        url: "/api/placeholder/200/400"
      }
    ]
  },

{
  name: "Evernote",
  developer: "Evernote Corporation",
  packageName: "com.evernote",
  category: "Productividad",
  rating: 4.1,
  size: "95 MB",
  icon: "https://upload.wikimedia.org/wikipedia/commons/3/35/Evernote_logo.svg",
  description: "Evernote es una aplicación para tomar notas y organizar tus ideas.",
  downloads: "100M+",
  bannerGradient: "45deg, #2dbe60, #007d51",
  security: true,
  version: "10.23.6",
  isAvailable: true,
  allowedCountries: ["US", "ES", "MX", "FR", "DE"],
  platforms: {
    android: "https://play.google.com/store/apps/details?id=com.evernote",
    ios: "https://apps.apple.com/app/evernote/id281796108"
  },
  previousVersions: ["10.23.5", "10.23.4", "10.23.3"],
  media: [{
      type: "image",
      url: "/api/placeholder/200/400"
    },
    {
      type: "video",
      url: "exampleVideoId1"
    },
    {
      type: "image",
      url: "/api/placeholder/200/400"
    }
  ]
},        
    {
  name: "Instagram",
  developer: "Meta",
  packageName: "com.instagram.android",
  category: "Redes sociales",
  rating: 4.5,
  size: "70 MB",
  icon: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
  description: "Instagram es una red social para compartir fotos y videos.",
  downloads: "500M+",
  bannerGradient: "45deg, #833ab4, #fd1d1d, #fcb045",
  security: false,
  version: "200.0.0.0.123",
  isAvailable: true,
  allowedCountries: ["US", "ES", "MX", "BR", "AR"],
  platforms: {
    android: "https://play.google.com/store/apps/details?id=com.instagram.android",
    ios: "https://apps.apple.com/app/instagram/id389801252"
  },
  previousVersions: ["199.0.0.0.120", "198.0.0.0.115", "197.0.0.0.110"],
  media: [{
      type: "image",
      url: "/api/placeholder/200/400"
    },
    {
      type: "video",
      url: "9bZkp7q19f0"
    },
    {
      type: "image",
      url: "/api/placeholder/200/400"
    }
  ]
},          
  {
    name: "Duolingo",
    developer: "Duolingo, Inc.",
    packageName: "com.duolingo", // Added package name
    category: "Educación",
    rating: 4.7,
    size: "Varía según el dispositivo",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Duolingo_logo_2021.svg",
    description: "Duolingo es una plataforma de aprendizaje de idiomas que ofrece lecciones interactivas a través de juegos y desafíos.",
    downloads: "3M+",
    bannerGradient: "45deg, #6DBE45, #4A9F32",
    security: true,
    version: "5.91.0",
    isAvailable: true,
    allowedCountries: ["US", "MX", "AR", "BR", "CO", "CL", "ES", "GB", "FR", "DE", "IT", "IN", "ZA", "PH", "AU"],
    platforms: {
      android: "https://play.google.com/store/apps/details?id=com.duolingo",
      ios: "https://apps.apple.com/us/app/duolingo-language-lessons/id570060128"
    },
    previousVersions: ["5.90.0", "5.89.0", "5.88.0"],
    media: [{
        type: "image",
        url: "/api/placeholder/200/400"
      },
      {
        type: "image",
        url: "/api/placeholder/200/400"
      },
      {
        type: "image",
        url: "/api/placeholder/200/400"
      }
    ]
  }
  // Aquí puedes agregar más aplicaciones siguiendo la misma estructura
];      
 

function parseDownloads(downloads) {
  if (downloads.includes('B+')) {
    return parseFloat(downloads.replace('B+', '')) * 1000000000;
  }
  return parseInt(downloads.replace('M+', '')) * 1000000;
}

function getStoreLink(app) {
  const device = detectDevice();
  // Verificar si la app está disponible y ha sido lanzada
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

function displayFeaturedApps() {
  const featuredApps = document.getElementById('featuredApps');
  featuredApps.innerHTML = '';

  const sortedApps = [...apps].sort((a, b) => {
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

  // Resto de las secciones
  [
    {
      title: "Top 10 Últimas Actualizaciones",
      apps: [...apps].sort((a, b) => b.version.localeCompare(a.version)).slice(0, 10)
    },
    {
      title: "Top 5 Aplicaciones Más Descargadas",
      apps: [...apps].sort((a, b) => parseDownloads(b.downloads) - parseDownloads(a.downloads)).slice(0, 5)
    },
    {
      title: "Nuevos Lanzamientos",
      apps: [...apps].filter(app => !isAppReleased(app.releaseDate)).slice(0, 5)
    },
    {
      title: "Top 10 Redes Sociales",
      apps: apps.filter(app => app.category.toLowerCase() === 'redes sociales')
        .sort((a, b) => parseDownloads(b.downloads) - parseDownloads(a.downloads))
        .slice(0, 10)
    }
  ].forEach(section => {
    const sectionElement = document.createElement('section');
    sectionElement.className = 'category-section';
    sectionElement.innerHTML = `
      <h2 class="section-title">${section.title}</h2>
      <div class="horizontal-scroll">
        ${section.apps.map(app => createAppCard(app)).join('')}
      </div>
    `;
    featuredApps.appendChild(sectionElement);
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

// Función para mostrar las apps
function displayApps(filteredApps) {
  const appsContainer = document.getElementById('appsContainer');
  const featuredApps = document.getElementById('featuredApps');
  if (filteredApps.length > 0) {
    featuredApps.style.display = 'none';
    appsContainer.style.display = 'block';
    appsContainer.innerHTML = '';
    filteredApps.forEach(app => {
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
    appsContainer.style.display = 'none';
    featuredApps.style.display = 'block';
  }
}
// Event Listeners
document.getElementById('searchInput').addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  if (searchTerm) {
    const filteredApps = apps.filter(app =>
      app.name.toLowerCase().includes(searchTerm) ||
      app.developer.toLowerCase().includes(searchTerm) ||
      app.category.toLowerCase().includes(searchTerm)
    );
    displayApps(filteredApps);
  } else {
    displayFeaturedApps();
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



`;

// Agregar los estilos al documento
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Inicializar la visualización de aplicaciones
displayFeaturedApps();

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
    "name": "TikTok Lite",
    "developer": "TikTok Pte. Ltd.",
    "packageName": "com.zhiliaoapp.musically.go",
    "category": "Entretenimiento",
    "rating": 4.2,
    "size": "45 MB",
    "icon": "https://img.utdstc.com/icon/f02/722/f02722184e010a9bfeebdeb4b5f57db1cac50688db6f959c297940ae3c4d7002:200",
    "description": "TikTok Lite es la versión ligera y optimizada de la aplicación de vídeos cortos TikTok. Su menor tamaño y menor consumo de recursos la hace ideal para ser utilizada en dispositivos que tengan menos potencia o capacidades más limitadas.",
    "downloads": "19M+",
    "bannerGradient": "45deg, #FF0050, #FF2C55",
    "security": true,
    "version": "29.1.2",
    "isAvailable": true,
    "releaseDate": "2018-08-06T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.zhiliaoapp.musically.go",
      "ios": "https://apps.apple.com/app/tiktok-lite/id6447160980"
    }
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
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.vkontakte.android",
      "ios": "https://apps.apple.com/app/vk-social-network/id564177498"
    }
  },
  {
    "name": "Messenger Lite",
    "developer": "Meta Platforms, Inc.",
    "packageName": "com.facebook.mlite",
    "category": "Mensajería",
    "rating": 4.1,
    "size": "20 MB",
    "icon": "https://img.utdstc.com/icon/28d/aea/28daea3ff2e293ad6275ff85256ff13a82144f3348ec886f4954755940cf6104:200",
    "description": "Messenger Lite es una versión más ligera de Messenger, que permite enviar mensajes y hacer llamadas con menor consumo de datos.",
    "downloads": "76.3M+",
    "bannerGradient": "45deg, #0084FF, #0066CC",
    "security": true,
    "version": "335.0.0.10.104",
    "isAvailable": true,
    "releaseDate": "2016-10-02T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.facebook.mlite",
      "ios": "https://apps.apple.com/app/messenger-lite/id1234567890"
    }
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
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=co.flip",
      "ios": "https://apps.apple.com/app/flip-shop-with-your-friends/id1562633109"
    }
  },
  {
    "name": "Clapper",
    "developer": "Clapper Media Group Inc.",
    "packageName": "com.clapper.video",
    "category": "Redes Sociales",
    "rating": 4.4,
    "size": "60 MB",
    "icon": "https://img.utdstc.com/icon/5f4/694/5f46941008be96f49123247309e5d2e280f04a3d108579ea6a39d75974b34ce6:200",
    "description": "Clapper es una plataforma de videos cortos que permite a los usuarios expresarse libremente y compartir contenido sin censura.",
    "downloads": "10M+",
    "bannerGradient": "45deg, #FF6600, #FF3300",
    "security": true,
    "version": "2.8.1",
    "isAvailable": true,
    "releaseDate": "2020-06-15T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.clapper.video",
      "ios": "https://apps.apple.com/app/clapper/id1516466348"
    }
  },
  {
    "name": "toDus",
    "developer": "ETECSA",
    "packageName": "cu.etecsa.todus",
    "category": "Mensajería",
    "rating": 3.1,
    "size": "20 MB",
    "icon": "https://todus.cu/page/images/logo.png",
    "description": "toDus es una aplicación de mensajería instantánea desarrollada en Cuba, que permite a los usuarios enviar mensajes de texto, voz, imágenes y videos de forma gratuita.",
    "downloads": "12M+",
    "bannerGradient": "45deg, #00BFFF, #00BFFF",
    "security": false,
    "version": "1.0.0",
    "isAvailable": true,
    "releaseDate": "2018-02-08T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=cu.etecsa.todus",
      "ios": "https://apps.apple.com/app/todus/id1234567890"
    }
  },
  {
    "name": "RedNote",
    "developer": "Xingin Information Technology (Shanghai) Co., Ltd",
    "packageName": "com.xingin.xhs",
    "category": "Redes Sociales",
    "rating": 4.9,
    "size": "460.3 MB",
    "icon": "https://img.utdstc.com/icon/7a0/428/7a04288acb3629d00aaa8937410ef4559ffde7f7261acf1768096874404caf5b:200",
    "description": "RedNote, conocida en China como Xiaohongshu o 'pequeño libro rojo', es una plataforma de redes sociales que permite a los usuarios compartir fotos, videos y experiencias de vida.",
    "downloads": "112.4K+",
    "bannerGradient": "45deg, #FF0000, #FF4500",
    "security": true,
    "version": "8.69.4",
    "isAvailable": true,
    "releaseDate": "2013-06-06T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.xingin.xhs",
      "ios": "https://apps.apple.com/us/app/rednote-share-connect-love/id741292507"
    }
  },
  {
    "name": "Transfermóvil",
    "developer": "ETECSA",
    "packageName": "cu.etecsa.transfermovil",
    "category": "Finanzas",
    "rating": 4.2,
    "size": "25 MB",
    "icon": "https://www.etecsa.cu/img/aplicaciones/transfermovil.png",
    "description": "Transfermóvil es una aplicación bancaria que facilita las transacciones financieras y el pago de servicios públicos desde dispositivos móviles.",
    "downloads": "13M+",
    "bannerGradient": "45deg, #FF6347, #FF6347",
    "security": true,
    "version": "2.0.0",
    "isAvailable": true,
    "releaseDate": "2016-02-09T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=cu.etecsa.transfermovil",
      "ios": "https://apps.apple.com/app/transfermovil/id1234567890"
    }
  },
  {
    "name": "Apklis",
    "developer": "CubaSoft",
    "packageName": "cu.cubasoft.apklis",
    "category": "Herramientas",
    "rating": 3.5,
    "size": "30 MB",
    "icon": "https://archive.apklis.cu/application/icon/cu.uci.android.apklis-v20240514.png",
    "description": "Apklis es la tienda de aplicaciones oficial de Cuba, que ofrece una amplia variedad de aplicaciones tanto cubanas como internacionales, adaptadas a las necesidades locales.",
    "downloads": "12M+",
    "bannerGradient": "45deg, #32CD32, #32CD32",
    "security": true,
    "version": "3.0.0",
    "isAvailable": true,
    "releaseDate": "2017-02-08T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=cu.cubasoft.apklis",
      "ios": "https://apps.apple.com/app/apklis/id1234567890"
    }
  },
  {
    "name": "Snapchat",
    "developer": "Snap Inc.",
    "packageName": "com.snapchat.android",
    "category": "Mensajería",
    "rating": 4.1,
    "size": "45 MB",
    "icon": "https://cdn6.aptoide.com/imgs/4/a/b/4ab59bf6437538d0d99264293ef3c479_icon.png?w=128",
    "description": "Snapchat es una aplicación de mensajería efímera y filtros creativos.",
    "downloads": "64M+",
    "bannerGradient": "45deg, #FFFC00, #FFFC00",
    "security": false,
    "version": "10.50.0.0",
    "isAvailable": true,
    "releaseDate": "2011-07-08T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.snapchat.android",
      "ios": "https://apps.apple.com/app/snapchat/id447188370"
    }
  },
  {
    "name": "Facebook",
    "developer": "Meta",
    "packageName": "com.facebook.katana",
    "category": "Redes sociales",
    "rating": 4.2,
    "size": "85.7 MB",
    "icon": "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    "description": "Facebook es una red social donde los usuarios pueden compartir contenido.",
    "downloads": "186M+",
    "bannerGradient": "45deg, #1877f2, #0a3d62",
    "security": false,
    "version": "497.0.0.47.36",
    "isAvailable": true,
    "releaseDate": "2004-02-04T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.facebook.katana",
      "ios": "https://apps.apple.com/us/app/facebook/id284882215"
    }
  },
  {
    "name": "WhatsApp",
    "developer": "Meta Platforms, Inc.",
    "packageName": "com.whatsapp",
    "category": "Mensajería",
    "rating": 4.7,
    "size": "38 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/124/124034.png",
    "description": "WhatsApp es una aplicación de mensajería que permite enviar mensajes de texto, llamadas de voz y videollamadas de forma segura.",
    "downloads": "5B+",
    "bannerGradient": "45deg, #25D366, #25D366",
    "security": true,
    "version": "2.23.7.76",
    "isAvailable": true,
    "releaseDate": "2009-01-01T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.whatsapp",
      "ios": "https://apps.apple.com/app/whatsapp-messenger/id310633997"
    }
  },
  {
    "name": "Telegram",
    "developer": "Telegram Messenger LLP",
    "packageName": "org.telegram.messenger",
    "category": "Mensajería",
    "rating": 4.6,
    "size": "30 MB",
    "icon": "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/335_Telegram_logo-512.png",
    "description": "Telegram es una aplicación de mensajería segura y rápida, que permite compartir mensajes, archivos, imágenes y más.",
    "downloads": "500M+",
    "bannerGradient": "45deg, #0088CC, #0088CC",
    "security": true,
    "version": "9.1.4",
    "isAvailable": true,
    "releaseDate": "2013-08-14T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=org.telegram.messenger",
      "ios": "https://apps.apple.com/app/telegram/id686449807"
    }
  },
  {
    "name": "Signal",
    "developer": "Signal Foundation",
    "packageName": "org.thoughtcrime.securesms",
    "category": "Mensajería",
    "rating": 4.8,
    "size": "30 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/4423/4423638.png",
    "description": "Signal es una aplicación de mensajería privada que ofrece comunicaciones seguras a través de cifrado de extremo a extremo.",
    "downloads": "100M+",
    "bannerGradient": "45deg, #4A90E2, #4A90E2",
    "security": true,
    "version": "5.37.7",
    "isAvailable": true,
    "releaseDate": "2014-07-29T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=org.thoughtcrime.securesms",
      "ios": "https://apps.apple.com/app/signal/id874139669"
    }
  },
  {
    "name": "LinkedIn",
    "developer": "LinkedIn Corporation",
    "packageName": "com.linkedin.android",
    "category": "Profesional",
    "rating": 4.3,
    "size": "70 MB",
    "icon": "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    "description": "LinkedIn es una red social orientada a profesionales y empresas.",
    "downloads": "6M+",
    "bannerGradient": "45deg, #0077B5, #005582",
    "security": false,
    "version": "5.0.0",
    "isAvailable": true,
    "releaseDate": "2003-05-05T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.linkedin.android",
      "ios": "https://apps.apple.com/app/linkedin/id288429040"
    }
  },
  {
    "name": "Instagram",
    "developer": "Meta Platforms, Inc.",
    "packageName": "com.instagram.android",
    "category": "Redes Sociales",
    "rating": 4.5,
    "size": "55 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/174/174855.png",
    "description": "Instagram es una red social para compartir fotos y vídeos, que permite aplicar filtros y efectos a las imágenes.",
    "downloads": "1B+",
    "bannerGradient": "45deg, #C13584, #E1306C",
    "security": true,
    "version": "278.0.0.19.118",
    "isAvailable": true,
    "releaseDate": "2010-10-06T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.instagram.android",
      "ios": "https://apps.apple.com/app/instagram/id389801252"
    }
  },
  {
    "name": "Twitter",
    "developer": "X Corp.",
    "packageName": "com.twitter.android",
    "category": "Redes Sociales",
    "rating": 4.3,
    "size": "40 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/124/124021.png",
    "description": "Twitter es una plataforma de microblogging para compartir mensajes cortos de hasta 280 caracteres.",
    "downloads": "500M+",
    "bannerGradient": "45deg, #1DA1F2, #1A91DA",
    "security": true,
    "version": "9.72.0-release.0",
    "isAvailable": true,
    "releaseDate": "2006-03-21T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.twitter.android",
      "ios": "https://apps.apple.com/app/twitter/id333903271"
    }
  },
  {
    "name": "Spotify",
    "developer": "Spotify AB",
    "packageName": "com.spotify.music",
    "category": "Música",
    "rating": 4.4,
    "size": "80 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/174/174872.png",
    "description": "Spotify es un servicio de streaming de música que ofrece millones de canciones y podcasts.",
    "downloads": "1B+",
    "bannerGradient": "45deg, #1DB954, #1AA34A",
    "security": true,
    "version": "8.8.12.510",
    "isAvailable": true,
    "releaseDate": "2008-10-07T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.spotify.music",
      "ios": "https://apps.apple.com/app/spotify/id324684580"
    }
  },
  {
    "name": "YouTube",
    "developer": "Google LLC",
    "packageName": "com.google.android.youtube",
    "category": "Entretenimiento",
    "rating": 4.2,
    "size": "98 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
    "description": "YouTube es una plataforma para ver, subir y compartir vídeos en línea.",
    "downloads": "10B+",
    "bannerGradient": "45deg, #FF0000, #CC0000",
    "security": true,
    "version": "17.36.37",
    "isAvailable": true,
    "releaseDate": "2005-02-14T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.google.android.youtube",
      "ios": "https://apps.apple.com/app/youtube/id544007664"
    }
  },
  {
    "name": "Netflix",
    "developer": "Netflix, Inc.",
    "packageName": "com.netflix.mediaclient",
    "category": "Entretenimiento",
    "rating": 4.4,
    "size": "95 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/5977/5977590.png",
    "description": "Netflix es un servicio de streaming que ofrece una amplia variedad de series, películas y documentales.",
    "downloads": "1B+",
    "bannerGradient": "45deg, #E50914, #B00710",
    "security": true,
    "version": "8.62.0",
    "isAvailable": true,
    "releaseDate": "1997-08-29T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.netflix.mediaclient",
      "ios": "https://apps.apple.com/app/netflix/id363590051"
    }
  },
  {
    "name": "Disney+",
    "developer": "Disney",
    "packageName": "com.disney.disneyplus",
    "category": "Entretenimiento",
    "rating": 4.3,
    "size": "90 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/5968/5968643.png",
    "description": "Disney+ es un servicio de streaming que ofrece películas y series de Disney, Pixar, Marvel, Star Wars y National Geographic.",
    "downloads": "500M+",
    "bannerGradient": "45deg, #0063E5, #0054C3",
    "security": true,
    "version": "2.19.0",
    "isAvailable": true,
    "releaseDate": "2019-11-12T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.disney.disneyplus",
      "ios": "https://apps.apple.com/app/disney/id1446075923"
    }
  },
  {
    "name": "Amazon Prime Video",
    "developer": "Amazon Mobile LLC",
    "packageName": "com.amazon.avod.thirdpartyclient",
    "category": "Entretenimiento",
    "rating": 4.1,
    "size": "85 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/5968/5968901.png",
    "description": "Amazon Prime Video es un servicio de streaming que ofrece películas, series y contenido original de Amazon.",
    "downloads": "500M+",
    "bannerGradient": "45deg, #00A8E1, #0096C7",
    "security": true,
    "version": "3.0.356.32547",
    "isAvailable": true,
    "releaseDate": "2006-09-07T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.amazon.avod.thirdpartyclient",
      "ios": "https://apps.apple.com/app/amazon-prime-video/id545519333"
    }
  },
  {
    "name": "HBO Max",
    "developer": "WarnerMedia",
    "packageName": "com.hbo.hbonow",
    "category": "Entretenimiento",
    "rating": 3.8,
    "size": "85 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/5968/5968701.png",
    "description": "HBO Max es un servicio de streaming que ofrece contenido de HBO, Warner Bros., DC, Cartoon Network y más.",
    "downloads": "100M+",
    "bannerGradient": "45deg, #5E2AB9, #501DA3",
    "security": true,
    "version": "52.50.0.219",
    "isAvailable": true,
    "releaseDate": "2020-05-27T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.hbo.hbonow",
      "ios": "https://apps.apple.com/app/hbo-max/id971265422"
    }
  },
  {
    "name": "Google Maps",
    "developer": "Google LLC",
    "packageName": "com.google.android.apps.maps",
    "category": "Navegación",
    "rating": 4.3,
    "size": "120 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/888/888865.png",
    "description": "Google Maps es una aplicación de mapas que ofrece navegación GPS, información de tráfico en tiempo real y mapas de lugares de todo el mundo.",
    "downloads": "10B+",
    "bannerGradient": "45deg, #4285F4, #34A853",
    "security": true,
    "version": "11.88.0",
    "isAvailable": true,
    "releaseDate": "2005-02-08T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.google.android.apps.maps",
      "ios": "https://apps.apple.com/app/google-maps/id585027354"
    }
  },
  {
    "name": "Pinterest",
    "developer": "Pinterest Inc.",
    "packageName": "com.pinterest",
    "category": "Redes Sociales",
    "rating": 4.6,
    "size": "50 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/174/174863.png",
    "description": "Pinterest es una plataforma para descubrir y guardar ideas creativas para proyectos e intereses.",
    "downloads": "500M+",
    "bannerGradient": "45deg, #E60023, #C8081C",
    "security": true,
    "version": "10.36.0",
    "isAvailable": true,
    "releaseDate": "2010-03-01T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.pinterest",
      "ios": "https://apps.apple.com/app/pinterest/id429047995"
    }
  },
  {
    "name": "Shazam",
    "developer": "Apple Inc.",
    "packageName": "com.shazam.android",
    "category": "Música",
    "rating": 4.7,
    "size": "40 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/732/732270.png",
    "description": "Shazam es una aplicación que identifica música, películas, anuncios y programas de televisión, basándose en una breve muestra de audio.",
    "downloads": "1B+",
    "bannerGradient": "45deg, #0689FF, #0570D4",
    "security": true,
    "version": "14.17.0",
    "isAvailable": true,
    "releaseDate": "2002-08-19T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.shazam.android",
      "ios": "https://apps.apple.com/app/shazam/id284993459"
    }
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
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.ubercab",
      "ios": "https://apps.apple.com/app/uber/id368677368"
    }
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
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.duolingo",
      "ios": "https://apps.apple.com/app/duolingo/id570060128"
    }
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
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.google.android.apps.docs",
      "ios": "https://apps.apple.com/app/google-drive/id507874739"
    }
  },
  {
    "name": "Gmail",
    "developer": "Google LLC",
    "packageName": "com.google.android.gm",
    "category": "Comunicación",
    "rating": 4.3,
    "size": "65 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/5968/5968534.png",
    "description": "Gmail es un servicio de correo electrónico gratuito proporcionado por Google.",
    "downloads": "10B+",
    "bannerGradient": "45deg, #D44638, #B23121",
    "security": true,
    "version": "2023.05.28.555629978",
    "isAvailable": true,
    "releaseDate": "2004-04-01T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.google.android.gm",
      "ios": "https://apps.apple.com/app/gmail/id422689480"
    }
  },
  {
    "name": "Google Chrome",
    "developer": "Google LLC",
    "packageName": "com.android.chrome",
    "category": "Navegadores",
    "rating": 4.1,
    "size": "100 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/888/888846.png",
    "description": "Google Chrome es un navegador web rápido y seguro desarrollado por Google.",
    "downloads": "10B+",
    "bannerGradient": "45deg, #4285F4, #3367D6",
    "security": true,
    "version": "113.0.5672.76",
    "isAvailable": true,
    "releaseDate": "2008-09-02T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.android.chrome",
      "ios": "https://apps.apple.com/app/google-chrome/id535886823"
    }
  },
  {
    "name": "Zoom",
    "developer": "Zoom Video Communications, Inc.",
    "packageName": "us.zoom.videomeetings",
    "category": "Comunicación",
    "rating": 4.2,
    "size": "85 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/4401/4401470.png",
    "description": "Zoom es una plataforma de videoconferencias y llamadas en línea.",
    "downloads": "500M+",
    "bannerGradient": "45deg, #2D8CFF, #2681E6",
    "security": true,
    "version": "5.14.7.17797",
    "isAvailable": true,
    "releaseDate": "2011-01-01T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=us.zoom.videomeetings",
      "ios": "https://apps.apple.com/app/zoom-cloud-meetings/id546505307"
    }
  },
  {
    "name": "Skype",
    "developer": "Microsoft Corporation",
    "packageName": "com.skype.raider",
    "category": "Comunicación",
    "rating": 4.1,
    "size": "80 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/174/174869.png",
    "description": "Skype es una aplicación que permite llamadas de voz y video, mensajería instantánea y compartir archivos.",
    "downloads": "1B+",
    "bannerGradient": "45deg, #00AFF0, #0078D7",
    "security": true,
    "version": "8.93.0.404",
    "isAvailable": true,
    "releaseDate": "2003-08-29T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.skype.raider",
      "ios": "https://apps.apple.com/app/skype/id304878510"
    }
  },
  {
    "name": "Microsoft Teams",
    "developer": "Microsoft Corporation",
    "packageName": "com.microsoft.teams",
    "category": "Comunicación",
    "rating": 4.3,
    "size": "95 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/2504/2504903.png",
    "description": "Microsoft Teams es una plataforma de comunicación y colaboración que combina chat, videoconferencias, almacenamiento de archivos e integración de aplicaciones.",
    "downloads": "500M+",
    "bannerGradient": "45deg, #6264A7, #5558A5",
    "security": true,
    "version": "1416/1.0.0.2023071002",
    "isAvailable": true,
    "releaseDate": "2017-03-14T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.microsoft.teams",
      "ios": "https://apps.apple.com/app/microsoft-teams/id1113153706"
    }
  },
  {
    "name": "Google Classroom",
    "developer": "Google LLC",
    "packageName": "com.google.android.apps.classroom",
    "category": "Educación",
    "rating": 4.0,
    "size": "60 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/2965/2965306.png",
    "description": "Google Classroom es una plataforma educativa gratuita desarrollada por Google para escuelas.",
    "downloads": "500M+",
    "bannerGradient": "45deg, #0F9D58, #0B8043",
    "security": true,
    "version": "8.5.2.25",
    "isAvailable": true,
    "releaseDate": "2014-08-12T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.google.android.apps.classroom",
      "ios": "https://apps.apple.com/app/google-classroom/id924620788"
    }
  },
  {
    "name": "Google Meet",
    "developer": "Google LLC",
    "packageName": "com.google.android.apps.meetings",
    "category": "Comunicación",
    "rating": 4.1,
    "size": "65 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/2991/2991108.png",
    "description": "Google Meet es una aplicación de videoconferencias desarrollada por Google.",
    "downloads": "1B+",
    "bannerGradient": "45deg, #00897B, #00796B",
    "security": true,
    "version": "2023.04.27.521805208",
    "isAvailable": true,
    "releaseDate": "2017-02-28T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.google.android.apps.meetings",
      "ios": "https://apps.apple.com/app/google-meet/id1013231476"
    }
  },
  {
    "name": "PayPal",
    "developer": "PayPal, Inc.",
    "packageName": "com.paypal.android.p2pmobile",
    "category": "Finanzas",
    "rating": 4.4,
    "size": "70 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/174/174861.png",
    "description": "PayPal es un servicio de pagos en línea que permite a los usuarios enviar y recibir dinero a nivel mundial.",
    "downloads": "500M+",
    "bannerGradient": "45deg, #003087, #002366",
    "security": true,
    "version": "8.26.0",
    "isAvailable": true,
    "releaseDate": "1998-12-01T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.paypal.android.p2pmobile",
      "ios": "https://apps.apple.com/app/paypal/id283646709"
    }
  },
  {
    "name": "Cash App",
    "developer": "Block, Inc.",
    "packageName": "com.squareup.cash",
    "category": "Finanzas",
    "rating": 4.5,
    "size": "65 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/8442/8442629.png",
    "description": "Cash App es una aplicación de pagos móviles que permite a los usuarios transferir dinero entre sí.",
    "downloads": "100M+",
    "bannerGradient": "45deg, #00D632, #00B32C",
    "security": true,
    "version": "3.79.0",
    "isAvailable": true,
    "releaseDate": "2013-10-15T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.squareup.cash",
      "ios": "https://apps.apple.com/app/cash-app/id711923939"
    }
  },
  {
    "name": "Venmo",
    "developer": "PayPal, Inc.",
    "packageName": "com.venmo",
    "category": "Finanzas",
    "rating": 4.3,
    "size": "55 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/887/887397.png",
    "description": "Venmo es un servicio de pagos móviles que facilita las transferencias de dinero entre amigos y familiares.",
    "downloads": "50M+",
    "bannerGradient": "45deg, #3D95CE, #3681B3",
    "security": true,
    "version": "9.30.0",
    "isAvailable": true,
    "releaseDate": "2009-01-01T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.venmo",
      "ios": "https://apps.apple.com/app/venmo/id351727428"
    }
  },
  {
    "name": "Clubhouse",
    "developer": "Alpha Exploration Co.",
    "packageName": "com.clubhouse.app",
    "category": "Redes Sociales",
    "rating": 3.7,
    "size": "50 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/8751/8751401.png",
    "description": "Clubhouse es una red social basada en audio que permite a los usuarios participar en conversaciones de voz.",
    "downloads": "10M+",
    "bannerGradient": "45deg, #F1C40F, #D4AC0D",
    "security": true,
    "version": "1.0.38",
    "isAvailable": true,
    "releaseDate": "2020-03-17T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.clubhouse.app",
      "ios": "https://apps.apple.com/app/clubhouse/id1503133294"
    }
  },
  {
    "name": "Twitch",
    "developer": "Twitch Interactive, Inc.",
    "packageName": "tv.twitch.android.app",
    "category": "Entretenimiento",
    "rating": 4.2,
    "size": "90 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/5968/5968819.png",
    "description": "Twitch es una plataforma de streaming en vivo que se centra en videojuegos, música, deportes y contenido creativo.",
    "downloads": "100M+",
    "bannerGradient": "45deg, #6441A5, #552F99",
    "security": true,
    "version": "15.4.0",
    "isAvailable": true,
    "releaseDate": "2011-06-06T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=tv.twitch.android.app",
      "ios": "https://apps.apple.com/app/twitch/id460177396"
    }
  },
  {
    "name": "Discord",
    "developer": "Discord Inc.",
    "packageName": "com.discord",
    "category": "Comunicación",
    "rating": 4.6,
    "size": "80 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/5968/5968759.png",
    "description": "Discord es una aplicación de mensajería instantánea y chat de voz diseñada para comunidades en línea.",
    "downloads": "500M+",
    "bannerGradient": "45deg, #7289DA, #5B73BC",
    "security": true,
    "version": "180.15",
    "isAvailable": true,
    "releaseDate": "2015-05-13T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.discord",
      "ios": "https://apps.apple.com/app/discord/id985746746"
    }
  },
  {
    "name": "Minecraft",
    "developer": "Mojang",
    "packageName": "com.mojang.minecraftpe",
    "category": "Juegos",
    "rating": 4.5,
    "size": "150 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/2199/2199529.png",
    "description": "Minecraft es un juego de mundo abierto que permite a los jugadores construir y explorar mundos virtuales hechos de bloques.",
    "downloads": "100M+",
    "bannerGradient": "45deg, #44A842, #388C38",
    "security": true,
    "version": "1.20.12",
    "isAvailable": true,
    "releaseDate": "2011-11-18T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.mojang.minecraftpe",
      "ios": "https://apps.apple.com/app/minecraft/id479516143"
    }
  },
  {
    "name": "Roblox",
    "developer": "Roblox Corporation",
    "packageName": "com.roblox.client",
    "category": "Juegos",
    "rating": 4.4,
    "size": "120 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/3992/3992429.png",
    "description": "Roblox es una plataforma de juegos en línea donde los usuarios pueden crear y jugar juegos creados por otros usuarios.",
    "downloads": "500M+",
    "bannerGradient": "45deg, #FF0000, #D60001",
    "security": true,
    "version": "2.610.441",
    "isAvailable": true,
    "releaseDate": "2006-09-01T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.roblox.client",
      "ios": "https://apps.apple.com/app/roblox/id431946152"
    }
  },
  {
    "name": "Candy Crush Saga",
    "developer": "King",
    "packageName": "com.king.candycrushsaga",
    "category": "Juegos",
    "rating": 4.6,
    "size": "100 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/5968/5968713.png",
    "description": "Candy Crush Saga es un juego de puzle de combinación de dulces que ofrece cientos de niveles de juego.",
    "downloads": "1B+",
    "bannerGradient": "45deg, #FA4673, #E02B57",
    "security": true,
    "version": "1.252.0.1",
    "isAvailable": true,
    "releaseDate": "2012-04-12T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.king.candycrushsaga",
      "ios": "https://apps.apple.com/app/candy-crush-saga/id553834731"
    }
  },
  {
    "name": "Clash of Clans",
    "developer": "Supercell",
    "packageName": "com.supercell.clashofclans",
    "category": "Juegos",
    "rating": 4.5,
    "size": "180 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/5968/5968715.png",
    "description": "Clash of Clans es un juego de estrategia multijugador donde los jugadores construyen aldeas, entrenan tropas y atacan a otros jugadores.",
    "downloads": "500M+",
    "bannerGradient": "45deg, #FFB800, #E5A600",
    "security": true,
    "version": "15.547.11",
    "isAvailable": true,
    "releaseDate": "2012-08-02T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.supercell.clashofclans",
      "ios": "https://apps.apple.com/app/clash-of-clans/id529479190"
    }
  },
  {
    "name": "PUBG Mobile",
    "developer": "KRAFTON, Inc.",
    "packageName": "com.tencent.ig",
    "category": "Juegos",
    "rating": 4.2,
    "size": "700 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/871/871378.png",
    "description": "PUBG Mobile es un juego de batalla real donde 100 jugadores luchan en una isla hasta que solo queda uno.",
    "downloads": "1B+",
    "bannerGradient": "45deg, #F5821F, #E56D15",
    "security": true,
    "version": "2.7.0",
    "isAvailable": true,
    "releaseDate": "2018-02-09T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.tencent.ig",
      "ios": "https://apps.apple.com/app/pubg-mobile/id1330123889"
    }
  },
  {
    "name": "Among Us",
    "developer": "InnerSloth LLC",
    "packageName": "com.innersloth.spacemafia",
    "category": "Juegos",
    "rating": 4.3,
    "size": "160 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/5968/5968756.png",
    "description": "Among Us es un juego multijugador online donde los jugadores intentan preparar su nave espacial para la salida, mientras que uno o más impostores intentan matar al resto de la tripulación.",
    "downloads": "500M+",
    "bannerGradient": "45deg, #2EAAE1, #278CCB",
    "security": true,
    "version": "2022.12.14",
    "isAvailable": true,
    "releaseDate": "2018-07-25T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.innersloth.spacemafia",
      "ios": "https://apps.apple.com/app/among-us/id1351168404"
    }
  },
  {
    "name": "Genshin Impact",
    "developer": "miHoYo Limited",
    "packageName": "com.miHoYo.GenshinImpact",
    "category": "Juegos",
    "rating": 4.4,
    "size": "350 MB",
    "icon": "https://icon-library.com/images/genshin-impact-icon/genshin-impact-icon-16.jpg",
    "description": "Genshin Impact es un juego de acción RPG de mundo abierto con un sistema de combate basado en elementos y un mundo para explorar.",
    "downloads": "100M+",
    "bannerGradient": "45deg, #59C2FF, #4A9CDB",
    "security": true,
    "version": "3.7.0",
    "isAvailable": true,
    "releaseDate": "2020-09-28T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.miHoYo.GenshinImpact",
      "ios": "https://apps.apple.com/app/genshin-impact/id1517783697"
    }
  },
  {
    "name": "Free Fire",
    "developer": "Garena International",
    "packageName": "com.dts.freefireth",
    "category": "Juegos",
    "rating": 4.2,
    "size": "720 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/11169/11169898.png",
    "description": "Garena Free Fire es un juego de batalla real móvil donde 50 jugadores luchan por la supervivencia en una isla remota.",
    "downloads": "1B+",
    "bannerGradient": "45deg, #F60000, #D20000",
    "security": true,
    "version": "1.100.1",
    "isAvailable": true,
    "releaseDate": "2017-12-04T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.dts.freefireth",
      "ios": "https://apps.apple.com/app/garena-free-fire/id1300146617"
    }
  },
  {
    "name": "Pokémon GO",
    "developer": "Niantic, Inc.",
    "packageName": "com.nianticlabs.pokemongo",
    "category": "Juegos",
    "rating": 4.0,
    "size": "350 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/528/528098.png",
    "description": "Pokémon GO es un juego de realidad aumentada basado en la ubicación donde los jugadores capturan, entrenan y combaten Pokémon.",
    "downloads": "500M+",
    "bannerGradient": "45deg, #3B4CCA, #3240A8",
    "security": true,
    "version": "0.285.0",
    "isAvailable": true,
    "releaseDate": "2016-07-06T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.nianticlabs.pokemongo",
      "ios": "https://apps.apple.com/app/pokemon-go/id1094591345"
    }
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
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.activision.callofduty.shooter",
      "ios": "https://apps.apple.com/app/call-of-duty/id1287282214"
    }
  },
  {
    "name": "Mobile Legends",
    "developer": "Moonton",
    "packageName": "com.mobile.legends",
    "category": "Juegos",
    "rating": 4.2,
    "size": "600 MB",
    "icon": "https://cdn-icons-png.flaticon.com/512/732/732097.png",
    "description": "Mobile Legends: Bang Bang es un juego MOBA para móviles con batallas 5v5 en tiempo real.",
    "downloads": "500M+",
    "bannerGradient": "45deg, #0051FF, #003EC4",
    "security": true,
    "version": "1.7.96.8501",
    "isAvailable": true,
    "releaseDate": "2016-11-14T00:00:00",
    "platforms": {
      "android": "https://play.google.com/store/apps/details?id=com.mobile.legends",
      "ios": "https://apps.apple.com/app/mobile-legends-bang-bang/id1160056295"
    }
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

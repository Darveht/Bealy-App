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
  "description": "TikTok Lite es la versión ligera y optimizada de la aplicación de vídeos cortos TikTok. Su menor tamaño y menor consumo de recursos la hace ideal para ser utilizada en dispositivos que tengan menos potencia o capacidades más limitadas. Al igual que TikTok, TikTok Lite te permite descubrir, crear y compartir videos cortos de forma sencilla y rápida, a la vez que mantienes todas las funcionalidades esenciales.",
  "downloads": "19M+",
  "bannerGradient": "45deg, #FF0050, #FF2C55",
  "security": true,
  "version": "29.1.2",
  "isAvailable": true,
  "releaseDate": "2018-08-06T00:00:00",
  "allowedCountries": ["US", "IN", "BR", "ID"],
  "platforms": {
    "android": "https://play.google.com/store/apps/details?id=com.zhiliaoapp.musically.go",
    "ios": "https://apps.apple.com/app/tiktok-lite/id6447160980"
  },
  "previousVersions": ["29.1.1", "29.0.9", "28.9.3"],
  "media": [
    {
      "type": "image",
      "url": "https://play-lh.googleusercontent.com/screenshot1.jpg"
    },
    {
      "type": "image",
      "url": "https://play-lh.googleusercontent.com/screenshot2.jpg"
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
  "allowedCountries": ["RU","US", "BY", "KZ", "UA"],
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
  "name": "Messenger Lite",
  "developer": "Meta Platforms, Inc.",
  "packageName": "com.facebook.mlite",
  "category": "Mensajería",
  "rating": 4.1,
  "size": "20 MB",
  "icon": "https://img.utdstc.com/icon/28d/aea/28daea3ff2e293ad6275ff85256ff13a82144f3348ec886f4954755940cf6104:200",
  "description": "Messenger Lite es una versión más ligera de Messenger, que permite enviar mensajes y hacer llamadas con menor consumo de datos.",
  "downloads": "76.3 M+",
  "bannerGradient": "45deg, #0084FF, #0066CC",
  "security": true,
  "version": "335.0.0.10.104",
  "isAvailable": true,
  "releaseDate": "2016-10-02T00:00:00",
  "allowedCountries": ["US", "IN", "BR", "ID"],
  "platforms": {
    "android": "https://play.google.com/store/apps/details?id=com.facebook.mlite",
    "ios": "https://apps.apple.com/app/messenger-lite/id1234567890"
  },
  "previousVersions": ["334.0.0.10.104", "333.0.0.10.103", "332.0.0.10.102"],
  "media": [
    {
      "type": "image",
      "url": "https://play-lh.googleusercontent.com/messenger-lite-screenshot1.jpg"
    },
    {
      "type": "image",
      "url": "https://play-lh.googleusercontent.com/messenger-lite-screenshot2.jpg"
    },
    {
      "type": "video",
      "url": "https://www.youtube.com/watch?v=MessengerLiteDemo"
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
  "allowedCountries": ["US", "CA"],
  "platforms": {
    "android": "https://play.google.com/store/apps/details?id=co.flip",
    "ios": "https://apps.apple.com/app/flip-shop-with-your-friends/id1562633109"
  },
  "previousVersions": ["5.2.9", "5.2.8", "5.2.7"],
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
  "allowedCountries": ["US", "CA", "UK", "AU"],
  "platforms": {
    "android": "https://play.google.com/store/apps/details?id=com.clapper.video",
    "ios": "https://apps.apple.com/app/clapper/id1516466348"
  },
  "previousVersions": ["2.8.0", "2.7.9", "2.7.8"],
  "media": [
    {
      "type": "image",
      "url": "https://play-lh.googleusercontent.com/clapper-screenshot1.jpg"
    },
    {
      "type": "image",
      "url": "https://play-lh.googleusercontent.com/clapper-screenshot2.jpg"
    },
    {
      "type": "video",
      "url": "https://www.youtube.com/watch?v=ClapperDemo"
    }
  ]
},
    {
      "name": "toDus",
      "developer": "ETECSA",
      "packageName": "cu.etecsa.todus",
      "category": "Mensajería",
      "rating": 3.1,
      "size": "20 MB",
      "icon": "https://todus.cu/page/images/logo.png",
      "description": "toDus es una aplicación de mensajería instantánea desarrollada en Cuba, que permite a los usuarios enviar mensajes de texto, voz, imágenes y videos de forma gratuita, utilizando la red de datos móviles nacional.",
      "downloads": "12M+",
      "bannerGradient": "45deg, #00BFFF, #00BFFF",
      "security": false,
      "version": "1.0.0",
      "isAvailable": true,
      "releaseDate": "2025-02-08T00:00:00",
      "allowedCountries": ["CU", "US"],
      "platforms": {
        "android": "https://play.google.com/store/apps/details?id=cu.etecsa.todus",
        "ios": "https://apps.apple.com/app/todus/id1234567890"
      },
      "previousVersions": ["0.9.9", "0.9.8", "0.9.7"],
      "media": [
        {
          "type": "image",
          "url": "https://archive.apklis.cu/application/screenshot/application/screenshot/81295523-0690-4d89-9dc9-4e484910e7ea.png"
        },
        {
          "type": "image",
          "url": "https://archive.apklis.cu/application/screenshot/application/screenshot/e6083911-edaf-4094-80fc-d9672e0c0f3b.png"
        },
        {
          "type": "video",
          "url": "https://youtu.be/3t6zqH7WEdI"
        }
      ]
    },
    {
  "name": "RedNote",
  "developer": "Xingin Information Technology (Shanghai) Co., Ltd",
  "packageName": "com.xingin.xhs",
  "category": "Redes Sociales",
  "rating": 4.9,
  "size": "460.3 MB",
  "icon": "https://img.utdstc.com/icon/7a0/428/7a04288acb3629d00aaa8937410ef4559ffde7f7261acf1768096874404caf5b:200",
  "description": "RedNote, conocida en China como Xiaohongshu o 'pequeño libro rojo', es una plataforma de redes sociales que permite a los usuarios compartir fotos, videos y experiencias de vida. Es popular por su enfoque en contenido auténtico y útil, abarcando temas como moda, música, recetas de cocina, ideas de decoración del hogar y consejos de viaje.",
  "downloads": "112.4mil+",
  "bannerGradient": "45deg, #FF0000, #FF4500",
  "security": true,
  "version": "8.69.4",
  "isAvailable": true,
  "releaseDate": "2013-06-06T00:00:00",
  "allowedCountries": ["CN", "US", "CU"],
  "platforms": {
    "android": "https://play.google.com/store/apps/details?id=com.xingin.xhs",
    "ios": "https://apps.apple.com/us/app/rednote-share-connect-love/id741292507"
  },
  "previousVersions": ["8.69.3", "8.69.2", "8.69.1"],
  "media": [
    {
      "type": "image",
      "url": "https://img.utdstc.com/screen/5e0/926/5e09260c00ae3250846f1736bf8f2132ccb3affca5db372621a96680c926d2dc:800"
    },
    {
      "type": "image",
      "url": "https://img.utdstc.com/screen/bc8/97f/bc897f6c25113b3eb7103e6a098dd961bdb9dc06c876c2f34c25c69474d42570:800"
    },
    {
      "type": "video",
      "url": "https://www.youtube.com/watch?v=EujHBexDrsQ"
    }
  ]
},
    {
      "name": "Transfermóvil",
      "developer": "ETECSA",
      "packageName": "cu.etecsa.transfermovil",
      "category": "Finanzas",
      "rating": 4.2,
      "size": "25 MB",
      "icon": "https://lh6.googleusercontent.com/proxy/C4Yl_goGRs79Ki5EceZXTbUYcebnVImhgVmPT8_fWnQl7ZpN849aNn-RYPIxbwfeLbhf2TadmYuQETR9vMUPtS4t4UHfM0EXanLM133g9n_7fJDgIUwKWady0Bn2EZLw7nAML1Lczq3c",
      "description": "Transfermóvil es una aplicación bancaria que facilita las transacciones financieras y el pago de servicios públicos desde dispositivos móviles. Los usuarios pueden recargar saldo telefónico, pagar facturas de electricidad y agua, y transferir dinero entre cuentas bancarias.",
      "downloads": "13M+",
      "bannerGradient": "45deg, #FF6347, #FF6347",
      "security": true,
      "version": "2.0.0",
      "isAvailable": true,
      "releaseDate": "2025-02-09T00:00:00",
      "allowedCountries": ["CU","US"],
      "platforms": {
        "android": "https://play.google.com/store/apps/details?id=cu.etecsa.transfermovil",
        "ios": "https://apps.apple.com/app/transfermovil/id1234567890"
      },
      "previousVersions": ["1.9.9", "1.9.8", "1.9.7"],
      "media": [
        {
          "type": "image",
          "url": "https://upload.wikimedia.org/wikipedia/commons/0/0d/Logo_Transfermovil.png"
        },
        {
          "type": "video",
          "url": "https://youtu.be/3t6zqH7WEdI"
        }
      ]
    },
    {
      "name": "Apklis",
      "developer": "CubaSoft",
      "packageName": "cu.cubasoft.apklis",
      "category": "Herramientas",
      "rating": 3.5,
      "size": "30 MB",
      "icon": "https://archive.apklis.cu/application/icon/cu.uci.android.apklis-v20240514.png",
      "description": "Apklis es la tienda de aplicaciones oficial de Cuba, que ofrece una amplia variedad de aplicaciones tanto cubanas como internacionales, adaptadas a las necesidades locales. Permite a los desarrolladores cubanos distribuir sus aplicaciones de manera efectiva.",
      "downloads": "12M+",
      "bannerGradient": "45deg, #32CD32, #32CD32",
      "security": true,
      "version": "3.0.0",
      "isAvailable": true,
      "releaseDate": "2025-02-08T00:00:00",
      "allowedCountries": ["CU","MX"],
      "platforms": {
        "android": "https://play.google.com/store/apps/details?id=cu.cubasoft.apklis",
        "ios": "https://apps.apple.com/app/apklis/id1234567890"
      },
      "previousVersions": ["2.9.9", "2.9.8", "2.9.7"],
      "media": [
        {
          "type": "image",
          "url": "https://www.citmatel.cu/sites/default/files/apklis-captura-movil.png"
        },
        {
          "type": "video",
          "url": "https://youtu.be/3t6zqH7WEdI"
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
    allowedCountries: ["US", "CA","MX"],
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
  "releaseDate": "2024-01-01T00:00:00",
  "allowedCountries": ["ES", "MX", "AR", "CO", "PE", "CL", "BR", "US", "CA", "IN", "GB", "FR", "IT", "RU", "PH", "NG", "ZA", "EG", "JP", "KR", "ID", "NG", "MY", "SG", "TH", "VN", "PK", "SA", "AU", "LK", "BN", "KH", "DO", "PA", "GT", "CU", "HN", "JM", "CU", "ZW", "NG"],
  "platforms": {
    "android": "https://play.google.com/store/apps/details?id=com.facebook.katana",
    "ios": "https://apps.apple.com/us/app/facebook/id284882215"
  },
  "previousVersions": ["496.0.0.45.65", "495.0.0.45.201", "494.1.0.56.73"],
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
  "allowedCountries": ["US", "IN", "BR", "MX", "AR"],
  "platforms": {
    "android": "https://play.google.com/store/apps/details?id=com.whatsapp",
    "ios": "https://apps.apple.com/app/whatsapp-messenger/id310633997"
  },
  "previousVersions": ["2.23.7.75", "2.23.7.74", "2.23.7.73"],
  "media": [
    {
      "type": "image",
      "url": "https://upload.wikimedia.org/wikipedia/commons/6/67/WhatsApp_Logo_2022.svg"
    },
    {
      "type": "video",
      "url": "https://youtu.be/J8CPO7v3w8M"
    },
    {
      "type": "image",
      "url": "/api/placeholder/200/400"
    }
  ]
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
  "allowedCountries": ["US","MX", "RU", "IN", "BR", "VN"],
  "platforms": {
    "android": "https://play.google.com/store/apps/details?id=org.telegram.messenger",
    "ios": "https://apps.apple.com/app/telegram/id686449807"
  },
  "previousVersions": ["9.1.3", "9.1.2", "9.1.1"],
  "media": [
    {
      "type": "image",
      "url": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Telegram_2019_logo.svg"
    },
    {
      "type": "video",
      "url": "https://youtu.be/9VAsHSH5f_4"
    },
    {
      "type": "image",
      "url": "/api/placeholder/200/400"
    }
  ]
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
  "allowedCountries": ["US","MX","IN", "GB", "BR", "ZA"],
  "platforms": {
    "android": "https://play.google.com/store/apps/details?id=org.thoughtcrime.securesms",
    "ios": "https://apps.apple.com/app/signal/id874139669"
  },
  "previousVersions": ["5.37.6", "5.37.5", "5.37.4"],
  "media": [
    {
      "type": "image",
      "url": "https://upload.wikimedia.org/wikipedia/commons/4/42/Signal-Logo.svg"
    },
    {
      "type": "video",
      "url": "https://youtu.be/4S6LwVxIMKw"
    },
    {
      "type": "image",
      "url": "/api/placeholder/200/400"
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
     releaseDate: "2025-02-09T00:00:00",  
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
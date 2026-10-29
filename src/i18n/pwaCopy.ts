import type { Locale } from "@/i18n/config"

type PwaCopy = {
  install: string
  installTitle: string
  installBody: string
  installAction: string
  notNow: string
  close: string
  iosTitle: string
  iosBody: string
  iosShare: string
  iosAdd: string
  macosTitle: string
  macosBody: string
  macosStepFile: string
  macosStepDock: string
  desktopTitle: string
  desktopBody: string
  desktopHint: string
  desktopOpenLogin: string
}

type FaqCopy = { question: string; answer: string }

export const pwaMessages: Record<Locale, PwaCopy> = {
  en: {
    install: "Install app",
    installTitle: "Install {name}",
    installBody:
      "Add {name} to this phone or computer and open it like any other app — on Android, iPhone, iPad, Windows, or Mac.",
    installAction: "Install",
    notNow: "Not now",
    close: "Close",
    iosTitle: "Add to Home Screen",
    iosBody:
      "On iPhone or iPad, tap Share, then Add to Home Screen. {name} will appear with your other apps.",
    iosShare: "Tap the Share button in Safari.",
    iosAdd: "Choose Add to Home Screen, then Add.",
    macosTitle: "Add to Dock",
    macosBody: "In Safari on a Mac, add {name} to the Dock. The app opens at Sign in in its own window.",
    macosStepFile: "Open the File menu, or the Share button.",
    macosStepDock: "Choose Add to Dock.",
    desktopTitle: "Install {name}",
    desktopBody: "Install {name} on this Windows PC or Mac. The app opens at Sign in, like any other desktop app.",
    desktopHint:
      "Use Install in the address bar so Windows and Mac both open the app at the login screen.",
    desktopOpenLogin: "Go to Sign in",
  },
  es: {
    install: "Instalar app",
    installTitle: "Instalar {name}",
    installBody:
      "Añada {name} a este teléfono u ordenador y ábrala como cualquier otra aplicación, en Android, iPhone, iPad, Windows o Mac.",
    installAction: "Instalar",
    notNow: "Ahora no",
    close: "Cerrar",
    iosTitle: "Añadir a la pantalla de inicio",
    iosBody:
      "En iPhone o iPad, pulse Compartir y luego Añadir a pantalla de inicio. {name} aparecerá con sus otras apps.",
    iosShare: "Pulse el botón Compartir en Safari.",
    iosAdd: "Elija Añadir a pantalla de inicio y luego Añadir.",
    macosTitle: "Añadir al Dock",
    macosBody: "En Safari en un Mac, añada {name} al Dock. La app abre en Iniciar sesión, en su propia ventana.",
    macosStepFile: "Abra el menú Archivo o el botón Compartir.",
    macosStepDock: "Elija Añadir al Dock.",
    desktopTitle: "Instalar {name}",
    desktopBody: "Instale {name} en este PC Windows o Mac. La app abre en Iniciar sesión, como cualquier otra app de escritorio.",
    desktopHint:
      "Use Instalar en la barra de direcciones para que Windows y Mac abran la app en la pantalla de inicio de sesión.",
    desktopOpenLogin: "Ir a Iniciar sesión",
  },
  fr: {
    install: "Installer l’app",
    installTitle: "Installer {name}",
    installBody:
      "Ajoutez {name} à ce téléphone ou ordinateur et ouvrez-la comme n’importe quelle autre application — sur Android, iPhone, iPad, Windows ou Mac.",
    installAction: "Installer",
    notNow: "Pas maintenant",
    close: "Fermer",
    iosTitle: "Ajouter à l’écran d’accueil",
    iosBody:
      "Sur iPhone ou iPad, touchez Partager, puis Ajouter à l’écran d’accueil. {name} apparaîtra avec vos autres apps.",
    iosShare: "Touchez le bouton Partager dans Safari.",
    iosAdd: "Choisissez Ajouter à l’écran d’accueil, puis Ajouter.",
    macosTitle: "Ajouter au Dock",
    macosBody: "Dans Safari sur un Mac, ajoutez {name} au Dock. L’app s’ouvre sur Connexion, dans sa propre fenêtre.",
    macosStepFile: "Ouvrez le menu Fichier, ou le bouton Partager.",
    macosStepDock: "Choisissez Ajouter au Dock.",
    desktopTitle: "Installer {name}",
    desktopBody:
      "Installez {name} sur ce PC Windows ou Mac. L’app s’ouvre sur Connexion, comme n’importe quelle application de bureau.",
    desktopHint:
      "Utilisez Installer dans la barre d’adresse pour que Windows et Mac ouvrent l’app sur l’écran de connexion.",
    desktopOpenLogin: "Aller à Connexion",
  },
  pt: {
    install: "Instalar app",
    installTitle: "Instalar {name}",
    installBody:
      "Adicione {name} a este telemóvel ou computador e abra-a como qualquer outra aplicação — no Android, iPhone, iPad, Windows ou Mac.",
    installAction: "Instalar",
    notNow: "Agora não",
    close: "Fechar",
    iosTitle: "Adicionar ao ecrã de início",
    iosBody:
      "No iPhone ou iPad, toque em Partilhar e depois em Adicionar ao ecrã de início. {name} aparece com as outras apps.",
    iosShare: "Toque no botão Partilhar no Safari.",
    iosAdd: "Escolha Adicionar ao ecrã de início e depois Adicionar.",
    macosTitle: "Adicionar ao Dock",
    macosBody: "No Safari num Mac, adicione {name} ao Dock. A app abre em Entrar, numa janela própria.",
    macosStepFile: "Abra o menu Ficheiro ou o botão Partilhar.",
    macosStepDock: "Escolha Adicionar ao Dock.",
    desktopTitle: "Instalar {name}",
    desktopBody:
      "Instale {name} neste PC Windows ou Mac. A app abre em Entrar, como qualquer outra aplicação de ambiente de trabalho.",
    desktopHint:
      "Use Instalar na barra de endereço para que Windows e Mac abram a app no ecrã de entrada.",
    desktopOpenLogin: "Ir para Entrar",
  },
  ar: {
    install: "تثبيت التطبيق",
    installTitle: "تثبيت {name}",
    installBody:
      "أضف {name} إلى هذا الهاتف أو الحاسوب وافتحه كأي تطبيق آخر — على أندرويد وiPhone وiPad وWindows وMac.",
    installAction: "تثبيت",
    notNow: "ليس الآن",
    close: "إغلاق",
    iosTitle: "إضافة إلى الشاشة الرئيسية",
    iosBody:
      "على iPhone أو iPad، اضغط مشاركة ثم إضافة إلى الشاشة الرئيسية. سيظهر {name} مع تطبيقاتك الأخرى.",
    iosShare: "اضغط زر المشاركة في سفاري.",
    iosAdd: "اختر إضافة إلى الشاشة الرئيسية ثم إضافة.",
    macosTitle: "إضافة إلى Dock",
    macosBody: "في سفاري على Mac، أضف {name} إلى Dock. يفتح التطبيق على تسجيل الدخول في نافذته الخاصة.",
    macosStepFile: "افتح قائمة ملف أو زر المشاركة.",
    macosStepDock: "اختر إضافة إلى Dock.",
    desktopTitle: "تثبيت {name}",
    desktopBody: "ثبّت {name} على جهاز Windows أو Mac هذا. يفتح التطبيق على تسجيل الدخول كأي تطبيق سطح مكتب.",
    desktopHint:
      "استخدم تثبيت في شريط العنوان حتى يفتح Windows وMac التطبيق على شاشة تسجيل الدخول.",
    desktopOpenLogin: "الانتقال إلى تسجيل الدخول",
  },
  zh: {
    install: "安装应用",
    installTitle: "安装 {name}",
    installBody:
      "将 {name} 添加到这台手机或电脑，像其他应用一样打开——适用于 Android、iPhone、iPad、Windows 和 Mac。",
    installAction: "安装",
    notNow: "暂不",
    close: "关闭",
    iosTitle: "添加到主屏幕",
    iosBody: "在 iPhone 或 iPad 上，点共享，然后点添加到主屏幕。{name} 会和其他应用一起出现。",
    iosShare: "在 Safari 中点共享按钮。",
    iosAdd: "选择添加到主屏幕，然后点添加。",
    macosTitle: "添加到程序坞",
    macosBody: "在 Mac 的 Safari 中，将 {name} 添加到程序坞。应用会在独立窗口中打开登录页。",
    macosStepFile: "打开“文件”菜单或共享按钮。",
    macosStepDock: "选择添加到程序坞。",
    desktopTitle: "安装 {name}",
    desktopBody: "在这台 Windows 电脑或 Mac 上安装 {name}。应用会像其他桌面应用一样打开登录页。",
    desktopHint: "使用地址栏中的“安装”，让 Windows 和 Mac 都从登录页打开应用。",
    desktopOpenLogin: "前往登录",
  },
  hi: {
    install: "ऐप इंस्टॉल करें",
    installTitle: "{name} इंस्टॉल करें",
    installBody:
      "{name} को इस फ़ोन या कंप्यूटर पर जोड़ें और किसी भी अन्य ऐप की तरह खोलें — Android, iPhone, iPad, Windows या Mac पर।",
    installAction: "इंस्टॉल",
    notNow: "अभी नहीं",
    close: "बंद करें",
    iosTitle: "होम स्क्रीन पर जोड़ें",
    iosBody:
      "iPhone या iPad पर शेयर टैप करें, फिर होम स्क्रीन पर जोड़ें। {name} आपके अन्य ऐप के साथ दिखेगा।",
    iosShare: "Safari में शेयर बटन टैप करें।",
    iosAdd: "होम स्क्रीन पर जोड़ें चुनें, फिर जोड़ें।",
    macosTitle: "Dock में जोड़ें",
    macosBody: "Mac पर Safari में {name} को Dock में जोड़ें। ऐप अपनी विंडो में साइन इन पर खुलेगा।",
    macosStepFile: "फ़ाइल मेनू या शेयर बटन खोलें।",
    macosStepDock: "Dock में जोड़ें चुनें।",
    desktopTitle: "{name} इंस्टॉल करें",
    desktopBody: "इस Windows PC या Mac पर {name} इंस्टॉल करें। ऐप साइन इन पर खुलेगा, जैसे कोई और डेस्कटॉप ऐप।",
    desktopHint:
      "एड्रेस बार में इंस्टॉल इस्तेमाल करें ताकि Windows और Mac दोनों ऐप को लॉगिन स्क्रीन पर खोलें।",
    desktopOpenLogin: "साइन इन पर जाएँ",
  },
  sw: {
    install: "Sakinisha programu",
    installTitle: "Sakinisha {name}",
    installBody:
      "Ongeza {name} kwenye simu au kompyuta hii na uifungue kama programu nyingine yoyote — kwenye Android, iPhone, iPad, Windows, au Mac.",
    installAction: "Sakinisha",
    notNow: "Sio sasa",
    close: "Funga",
    iosTitle: "Ongeza kwenye skrini ya nyumbani",
    iosBody:
      "Kwenye iPhone au iPad, gusa Shiriki, kisha Ongeza kwenye skrini ya nyumbani. {name} itaonekana pamoja na programu zako nyingine.",
    iosShare: "Gusa kitufe cha Shiriki katika Safari.",
    iosAdd: "Chagua Ongeza kwenye skrini ya nyumbani, kisha Ongeza.",
    macosTitle: "Ongeza kwenye Dock",
    macosBody: "Katika Safari kwenye Mac, ongeza {name} kwenye Dock. Programu inafunguka kwenye Ingia katika dirisha lake.",
    macosStepFile: "Fungua menyu ya Faili, au kitufe cha Shiriki.",
    macosStepDock: "Chagua Ongeza kwenye Dock.",
    desktopTitle: "Sakinisha {name}",
    desktopBody:
      "Sakinisha {name} kwenye kompyuta hii ya Windows au Mac. Programu inafunguka kwenye Ingia, kama programu nyingine ya kompyuta.",
    desktopHint:
      "Tumia Sakinisha kwenye upau wa anwani ili Windows na Mac zifungue programu kwenye skrini ya kuingia.",
    desktopOpenLogin: "Nenda Ingia",
  },
}

export const pwaFaq: Record<Locale, FaqCopy> = {
  en: {
    question: "Can I install Agrocyms on my phone or computer?",
    answer:
      "Yes. Agrocyms is a progressive web app. On Android, Windows, and most desktop browsers, use Install when it appears. On iPhone and iPad, tap Share then Add to Home Screen. On a Mac in Safari, choose File then Add to Dock.",
  },
  es: {
    question: "¿Puedo instalar Agrocyms en el teléfono o el ordenador?",
    answer:
      "Sí. Agrocyms es una aplicación web progresiva. En Android, Windows y la mayoría de navegadores de escritorio, use Instalar cuando aparezca. En iPhone e iPad, pulse Compartir y luego Añadir a pantalla de inicio. En un Mac con Safari, elija Archivo y luego Añadir al Dock.",
  },
  fr: {
    question: "Puis-je installer Agrocyms sur mon téléphone ou ordinateur ?",
    answer:
      "Oui. Agrocyms est une application web progressive. Sur Android, Windows et la plupart des navigateurs de bureau, utilisez Installer lorsqu’il apparaît. Sur iPhone et iPad, touchez Partager puis Ajouter à l’écran d’accueil. Sur un Mac dans Safari, choisissez Fichier puis Ajouter au Dock.",
  },
  pt: {
    question: "Posso instalar a Agrocyms no telemóvel ou no computador?",
    answer:
      "Sim. A Agrocyms é uma aplicação web progressiva. No Android, Windows e na maioria dos browsers de computador, use Instalar quando aparecer. No iPhone e iPad, toque em Partilhar e depois em Adicionar ao ecrã de início. Num Mac no Safari, escolha Ficheiro e depois Adicionar ao Dock.",
  },
  ar: {
    question: "هل يمكنني تثبيت Agrocyms على الهاتف أو الحاسوب؟",
    answer:
      "نعم. Agrocyms تطبيق ويب تقدمي. على أندرويد وWindows ومعظم متصفحات الحاسوب استخدم تثبيت عند ظهوره. على iPhone وiPad اضغط مشاركة ثم إضافة إلى الشاشة الرئيسية. على Mac في سفاري اختر ملف ثم إضافة إلى Dock.",
  },
  zh: {
    question: "可以在手机或电脑上安装 Agrocyms 吗？",
    answer:
      "可以。Agrocyms 是渐进式网页应用。在 Android、Windows 和多数桌面浏览器中，出现“安装”时点选即可。在 iPhone 和 iPad 上，点共享再点添加到主屏幕。在 Mac 的 Safari 中，选择文件，再选择添加到程序坞。",
  },
  hi: {
    question: "क्या मैं Agrocyms को फ़ोन या कंप्यूटर पर इंस्टॉल कर सकता हूँ?",
    answer:
      "हाँ। Agrocyms एक प्रोग्रेसिव वेब ऐप है। Android, Windows और अधिकांश डेस्कटॉप ब्राउज़र पर इंस्टॉल दिखने पर उसे चुनें। iPhone और iPad पर शेयर फिर होम स्क्रीन पर जोड़ें टैप करें। Mac पर Safari में फ़ाइल फिर Dock में जोड़ें चुनें।",
  },
  sw: {
    question: "Naweza kusakinisha Agrocyms kwenye simu au kompyuta?",
    answer:
      "Ndiyo. Agrocyms ni programu ya wavuti inayoendelea. Kwenye Android, Windows, na vivinjari vingi vya kompyuta, tumia Sakinisha inapoonekana. Kwenye iPhone na iPad, gusa Shiriki kisha Ongeza kwenye skrini ya nyumbani. Kwenye Mac katika Safari, chagua Faili kisha Ongeza kwenye Dock.",
  },
}

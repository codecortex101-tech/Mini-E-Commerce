import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "es" | "fr" | "de" | "hi" | "ar";

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    // Common
    addToCart: "Add to Cart",
    wishlist: "Wishlist",
    cart: "Cart",
    checkout: "Checkout",
    products: "Products",
    search: "Search",
    login: "Login",
    logout: "Logout",
    register: "Register",
    profile: "Profile",
    orders: "Orders",
    price: "Price",
    rating: "Rating",
    reviews: "Reviews",
    description: "Description",
    quantity: "Quantity",
    total: "Total",
    subtotal: "Subtotal",
    shipping: "Shipping",
    tax: "Tax",
    discount: "Discount",
    continue: "Continue",
    placeOrder: "Place Order",
    back: "Back",
    home: "Home",
    dashboard: "Dashboard",
  },
  es: {
    addToCart: "Añadir al Carrito",
    wishlist: "Lista de Deseos",
    cart: "Carrito",
    checkout: "Pago",
    products: "Productos",
    search: "Buscar",
    login: "Iniciar Sesión",
    logout: "Cerrar Sesión",
    register: "Registrarse",
    profile: "Perfil",
    orders: "Pedidos",
    price: "Precio",
    rating: "Calificación",
    reviews: "Reseñas",
    description: "Descripción",
    quantity: "Cantidad",
    total: "Total",
    subtotal: "Subtotal",
    shipping: "Envío",
    tax: "Impuesto",
    discount: "Descuento",
    continue: "Continuar",
    placeOrder: "Realizar Pedido",
    back: "Atrás",
    home: "Inicio",
    dashboard: "Panel",
  },
  fr: {
    addToCart: "Ajouter au Panier",
    wishlist: "Liste de Souhaits",
    cart: "Panier",
    checkout: "Commande",
    products: "Produits",
    search: "Rechercher",
    login: "Connexion",
    logout: "Déconnexion",
    register: "S'inscrire",
    profile: "Profil",
    orders: "Commandes",
    price: "Prix",
    rating: "Note",
    reviews: "Avis",
    description: "Description",
    quantity: "Quantité",
    total: "Total",
    subtotal: "Sous-total",
    shipping: "Expédition",
    tax: "Taxe",
    discount: "Réduction",
    continue: "Continuer",
    placeOrder: "Passer la Commande",
    back: "Retour",
    home: "Accueil",
    dashboard: "Tableau de Bord",
  },
  de: {
    addToCart: "In den Warenkorb",
    wishlist: "Wunschliste",
    cart: "Warenkorb",
    checkout: "Zur Kasse",
    products: "Produkte",
    search: "Suchen",
    login: "Anmelden",
    logout: "Abmelden",
    register: "Registrieren",
    profile: "Profil",
    orders: "Bestellungen",
    price: "Preis",
    rating: "Bewertung",
    reviews: "Bewertungen",
    description: "Beschreibung",
    quantity: "Menge",
    total: "Gesamt",
    subtotal: "Zwischensumme",
    shipping: "Versand",
    tax: "Steuer",
    discount: "Rabatt",
    continue: "Weiter",
    placeOrder: "Bestellung Aufgeben",
    back: "Zurück",
    home: "Startseite",
    dashboard: "Dashboard",
  },
  hi: {
    addToCart: "कार्ट में जोड़ें",
    wishlist: "इच्छा सूची",
    cart: "कार्ट",
    checkout: "चेकआउट",
    products: "उत्पाद",
    search: "खोजें",
    login: "लॉग इन",
    logout: "लॉग आउट",
    register: "पंजीकरण",
    profile: "प्रोफ़ाइल",
    orders: "ऑर्डर",
    price: "मूल्य",
    rating: "रेटिंग",
    reviews: "समीक्षाएं",
    description: "विवरण",
    quantity: "मात्रा",
    total: "कुल",
    subtotal: "उप-योग",
    shipping: "शिपिंग",
    tax: "कर",
    discount: "छूट",
    continue: "जारी रखें",
    placeOrder: "ऑर्डर करें",
    back: "वापस",
    home: "होम",
    dashboard: "डैशबोर्ड",
  },
  ar: {
    addToCart: "أضف إلى السلة",
    wishlist: "قائمة الأمنيات",
    cart: "السلة",
    checkout: "الدفع",
    products: "المنتجات",
    search: "بحث",
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    register: "التسجيل",
    profile: "الملف الشخصي",
    orders: "الطلبات",
    price: "السعر",
    rating: "التقييم",
    reviews: "المراجعات",
    description: "الوصف",
    quantity: "الكمية",
    total: "المجموع",
    subtotal: "المجموع الفرعي",
    shipping: "الشحن",
    tax: "الضريبة",
    discount: "الخصم",
    continue: "متابعة",
    placeOrder: "تقديم الطلب",
    back: "رجوع",
    home: "الرئيسية",
    dashboard: "لوحة التحكم",
  },
};

type I18nContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
};

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language") as Language;
    return saved || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const isRTL = language === "ar";

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }
  return context;
};

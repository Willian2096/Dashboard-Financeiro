// window.storage polyfill using localStorage
window.storage = {
  get: function(key) {
    try { return Promise.resolve({ value: localStorage.getItem(key) }); }
    catch(e) { return Promise.resolve({ value: null }); }
  },
  set: function(key, value) {
    try { localStorage.setItem(key, value); } catch(e) {}
    return Promise.resolve();
  },
  remove: function(key) {
    try { localStorage.removeItem(key); } catch(e) {}
    return Promise.resolve();
  }
};
// Normalize lucide-react global (different UMD builds may use different names)
window.LucideReact = window.LucideReact || window.lucideReact || window['lucide-react'] || {};

const {
  useState,
  useCallback,
  useRef,
  useEffect
} = React;
const {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  CartesianGrid
} = Recharts;
const {
  Home,
  ShoppingBag,
  CreditCard,
  ArrowLeftRight,
  PieChart: PieIcon,
  Target,
  TrendingUp,
  TrendingDown,
  FileText,
  Calendar,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  User,
  PlusCircle,
  Menu,
  BarChart2,
  Shield,
  Repeat2,
  Wallet,
  PiggyBank
} = LucideReact;

// --─ THEME ------------------------------------------------------
const DK = {
  bg: "#09091a",
  sb: "#0e0e20",
  card: "#13132a",
  cardHov: "#1a1a38",
  border: "#1e1e3e",
  borderAlt: "#131328",
  text: "#ffffff",
  mid: "#e0e0ff",
  muted: "#c0c0e8",
  dim: "#a0a0cc",
  inp: "#09091a",
  overlay: "rgba(0,0,0,0.85)"
};
const LK = {
  bg: "#f0f0f8",
  sb: "#ffffff",
  card: "#ffffff",
  cardHov: "#f8f8ff",
  border: "#e0e0f0",
  borderAlt: "#ebebfb",
  text: "#111130",
  mid: "#333360",
  muted: "#5555a0",
  dim: "#9090c0",
  inp: "#ebebf8",
  overlay: "rgba(0,0,0,0.55)"
};
const ORANGE = "#f97316";
const PALETTE = ["#f97316", "#3b82f6", "#ec4899", "#a855f7", "#22c55e", "#eab308", "#94a3b8", "#06b6d4", "#ef4444", "#84cc16"];

// --─ CATALOG ----------------------------------------------------─
const CARD_CATALOG = [{
  id: "nubank",
  name: "Nubank",
  color: "#820AD1",
  icon: "💜"
}, {
  id: "itau",
  name: "Itau",
  color: "#F9811A",
  icon: "🟠"
}, {
  id: "santander",
  name: "Santander",
  color: "#EC0000",
  icon: "🔴"
}, {
  id: "bradesco",
  name: "Bradesco",
  color: "#CC092F",
  icon: "❤️"
}, {
  id: "inter",
  name: "Inter",
  color: "#FF7A00",
  icon: "🟧"
}, {
  id: "mercadopago",
  name: "Mercado Pago",
  color: "#009EE3",
  icon: "🔵"
}, {
  id: "picpay",
  name: "PicPay",
  color: "#11C76F",
  icon: "🟢"
}, {
  id: "c6",
  name: "C6 Bank",
  color: "#323232",
  icon: "⬛"
}, {
  id: "caixa",
  name: "Caixa",
  color: "#005CA9",
  icon: "🔷"
}, {
  id: "bb",
  name: "Banco do Brasil",
  color: "#F8C300",
  icon: "🟡"
}, {
  id: "pix",
  name: "Pix",
  color: "#32BCAD",
  icon: "🔑"
}, {
  id: "debito",
  name: "Debito",
  color: "#3b82f6",
  icon: "💳"
}, {
  id: "dinheiro",
  name: "Dinheiro",
  color: "#eab308",
  icon: "💵"
}];
const PINNED = ["pix", "debito", "dinheiro"];
const DEFAULT_ACTIVE = [...PINNED];

// -- FINANCE LIFE LOGO - Opção 1: Badge quadrado FL + Wordmark ----
const FLLogo = ({
  size = 36
}) => {
  const r = Math.round(size * 0.22);
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 52 52",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "fl-bg",
    x1: "0",
    y1: "0",
    x2: "52",
    y2: "52",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#E8583A"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#3A5F8A"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "fl-shine",
    x1: "0",
    y1: "0",
    x2: "26",
    y2: "26",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(255,255,255,0.22)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(255,255,255,0)"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "52",
    height: "52",
    rx: r,
    fill: "url(#fl-bg)"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "52",
    height: "52",
    rx: r,
    fill: "url(#fl-shine)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "26",
    y: "34",
    textAnchor: "middle",
    fill: "white",
    fontFamily: "'DM Sans','Syne',system-ui,sans-serif",
    fontSize: "22",
    fontWeight: "800",
    letterSpacing: "-1"
  }, "FL"));
};
const FLLogoFull = ({
  iconSize = 36,
  textSize = 17
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    alignItems: "center",
    gap: 10
  }
}, /*#__PURE__*/React.createElement(FLLogo, {
  size: iconSize
}), /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    flexDirection: "column",
    lineHeight: 1.1
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: textSize,
    fontWeight: 800,
    color: "#ffffff",
    letterSpacing: -0.4,
    fontFamily: "'DM Sans',sans-serif"
  }
}, "Finance"), /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: textSize,
    fontWeight: 700,
    background: "linear-gradient(90deg,#E8583A,#3A5F8A)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: -0.4,
    fontFamily: "'DM Sans',sans-serif"
  }
}, "Life")));

// versão para tema light (texto escuro)
const FLLogoFullLight = ({
  iconSize = 36,
  textSize = 17
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    alignItems: "center",
    gap: 10
  }
}, /*#__PURE__*/React.createElement(FLLogo, {
  size: iconSize
}), /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    flexDirection: "column",
    lineHeight: 1.1
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: textSize,
    fontWeight: 800,
    color: "#111130",
    letterSpacing: -0.4,
    fontFamily: "'DM Sans',sans-serif"
  }
}, "Finance"), /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: textSize,
    fontWeight: 700,
    background: "linear-gradient(90deg,#E8583A,#3A5F8A)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: -0.4,
    fontFamily: "'DM Sans',sans-serif"
  }
}, "Life")));

// -- PREMIUM ICON SVGs --------------------------------------------─
const CAT_ICONS = {
  "Alimentação": (s = 32) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 100 100",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "ic-bg-ali",
    cx: "40%",
    cy: "35%",
    r: "65%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#FF9A3C"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#E05A00"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "ic-bun",
    x1: "0%",
    y1: "0%",
    x2: "0%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#D4892A"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#A05A10"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "ic-shine",
    x1: "0%",
    y1: "0%",
    x2: "60%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(255,255,255,0.25)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(255,255,255,0)"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "100",
    rx: "22",
    fill: "url(#ic-bg-ali)"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "100",
    rx: "22",
    fill: "url(#ic-shine)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "50",
    cy: "26",
    rx: "26",
    ry: "9",
    fill: "url(#ic-bun)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "50",
    cy: "22",
    rx: "26",
    ry: "7",
    fill: "#D4892A"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "44",
    cy: "19",
    rx: "3",
    ry: "1.5",
    fill: "#B36A10",
    transform: "rotate(-15,44,19)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "56",
    cy: "18",
    rx: "3",
    ry: "1.5",
    fill: "#B36A10",
    transform: "rotate(15,56,18)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "42",
    cy: "19",
    rx: "6",
    ry: "2.5",
    fill: "rgba(255,255,255,0.3)",
    transform: "rotate(-20,42,19)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 36 Q30 30 40 35 Q50 29 60 34 Q70 29 78 36 L78 41 Q70 37 60 42 Q50 37 40 41 Q30 38 22 41 Z",
    fill: "#4ADE80"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "24",
    y: "41",
    width: "52",
    height: "6",
    rx: "2",
    fill: "#EF4444"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 47 L78 47 L82 53 L18 53 Z",
    fill: "#FBBF24"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "21",
    y: "53",
    width: "58",
    height: "13",
    rx: "5",
    fill: "#92400E"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "21",
    y: "53",
    width: "58",
    height: "5",
    rx: "5",
    fill: "#A16207"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "32",
    y1: "56",
    x2: "32",
    y2: "62",
    stroke: "#78350F",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "45",
    y1: "56",
    x2: "45",
    y2: "62",
    stroke: "#78350F",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "58",
    y1: "56",
    x2: "58",
    y2: "62",
    stroke: "#78350F",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "50",
    cy: "70",
    rx: "29",
    ry: "7",
    fill: "#C87820"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "50",
    cy: "68",
    rx: "29",
    ry: "5",
    fill: "#D4892A"
  })),
  "Transporte": (s = 32) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 100 100",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "ic-bg-tra",
    cx: "40%",
    cy: "35%",
    r: "65%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#4A9EFF"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#1A5FCC"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "ic-pump",
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#7DD3FC"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#2563EB"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "ic-shine2",
    x1: "0%",
    y1: "0%",
    x2: "60%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(255,255,255,0.25)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(255,255,255,0)"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "100",
    rx: "22",
    fill: "url(#ic-bg-tra)"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "100",
    rx: "22",
    fill: "url(#ic-shine2)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "22",
    y: "24",
    width: "42",
    height: "55",
    rx: "6",
    fill: "#1E40AF"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "22",
    y: "24",
    width: "42",
    height: "55",
    rx: "6",
    fill: "url(#ic-pump)",
    opacity: "0.6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "27",
    y: "30",
    width: "32",
    height: "18",
    rx: "4",
    fill: "#0F172A"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "28",
    y: "31",
    width: "30",
    height: "16",
    rx: "3",
    fill: "#1E3A5F"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "30",
    y: "34",
    width: "26",
    height: "3",
    rx: "1.5",
    fill: "#60A5FA"
  }), /*#__PURE__*/React.createElement("text", {
    x: "43",
    y: "44",
    fontSize: "5",
    fill: "#7DD3FC",
    textAnchor: "middle",
    fontFamily: "sans-serif",
    fontWeight: "bold"
  }, "R$ 5,89"), /*#__PURE__*/React.createElement("rect", {
    x: "27",
    y: "52",
    width: "14",
    height: "10",
    rx: "3",
    fill: "#2563EB"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "45",
    y: "52",
    width: "14",
    height: "10",
    rx: "3",
    fill: "#16A34A"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "64",
    y: "28",
    width: "6",
    height: "30",
    rx: "3",
    fill: "#93C5FD"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "70",
    y: "26",
    width: "14",
    height: "5",
    rx: "2.5",
    fill: "#7DD3FC"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "70",
    y: "42",
    width: "5",
    height: "16",
    rx: "2",
    fill: "#60A5FA"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "68",
    y: "54",
    width: "9",
    height: "6",
    rx: "3",
    fill: "#3B82F6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "72",
    cy: "62",
    r: "2",
    fill: "#FBBF24",
    opacity: "0.9"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "72",
    cy: "62",
    r: "4",
    fill: "#FBBF24",
    opacity: "0.2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "20",
    y: "80",
    width: "60",
    height: "4",
    rx: "2",
    fill: "rgba(255,255,255,0.15)"
  })),
  "Compras": (s = 32) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 100 100",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "ic-bg-com",
    cx: "40%",
    cy: "35%",
    r: "65%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#FF6EB4"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#C0247A"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "ic-bag",
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#F9A8D4"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#DB2777"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "ic-shine3",
    x1: "0%",
    y1: "0%",
    x2: "60%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(255,255,255,0.25)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(255,255,255,0)"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "100",
    rx: "22",
    fill: "url(#ic-bg-com)"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "100",
    rx: "22",
    fill: "url(#ic-shine3)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "40",
    y: "38",
    width: "36",
    height: "40",
    rx: "5",
    fill: "rgba(255,255,255,0.4)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M48 38 Q48 27 58 27 Q68 27 68 38",
    fill: "none",
    stroke: "rgba(255,255,255,0.7)",
    strokeWidth: "3",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "24",
    y: "42",
    width: "36",
    height: "40",
    rx: "5",
    fill: "#FBCFE8"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "24",
    y: "42",
    width: "36",
    height: "40",
    rx: "5",
    fill: "url(#ic-bag)",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M32 42 Q32 30 42 30 Q52 30 52 42",
    fill: "none",
    stroke: "#DB2777",
    strokeWidth: "3.5",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "24",
    y: "42",
    width: "10",
    height: "40",
    rx: "5",
    fill: "rgba(255,255,255,0.2)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "28",
    y1: "58",
    x2: "56",
    y2: "58",
    stroke: "rgba(219,39,119,0.4)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "42",
    cy: "52",
    r: "4",
    fill: "rgba(255,255,255,0.4)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "42",
    y: "55",
    textAnchor: "middle",
    fontSize: "6",
    fill: "#C026D3"
  }, "★")),
  "Assinaturas": (s = 32) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 100 100",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "ic-bg-ass",
    cx: "40%",
    cy: "35%",
    r: "65%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#A855F7"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#6B21A8"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "ic-shine4",
    x1: "0%",
    y1: "0%",
    x2: "60%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(255,255,255,0.25)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(255,255,255,0)"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "100",
    rx: "22",
    fill: "url(#ic-bg-ass)"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "100",
    rx: "22",
    fill: "url(#ic-shine4)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "27",
    y: "18",
    width: "46",
    height: "70",
    rx: "9",
    fill: "#1E1B4B"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "27",
    y: "18",
    width: "46",
    height: "70",
    rx: "9",
    fill: "rgba(168,85,247,0.25)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "30",
    y: "24",
    width: "40",
    height: "52",
    rx: "5",
    fill: "#0F0A1E"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "33",
    y: "27",
    width: "10",
    height: "10",
    rx: "3",
    fill: "#8B5CF6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "46",
    y: "27",
    width: "10",
    height: "10",
    rx: "3",
    fill: "#06B6D4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "59",
    y: "27",
    width: "10",
    height: "10",
    rx: "3",
    fill: "#F59E0B"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "33",
    y: "40",
    width: "10",
    height: "10",
    rx: "3",
    fill: "#EC4899"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "46",
    y: "40",
    width: "10",
    height: "10",
    rx: "3",
    fill: "#22C55E"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "59",
    y: "40",
    width: "10",
    height: "10",
    rx: "3",
    fill: "#F97316"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "65",
    r: "10",
    fill: "rgba(139,92,246,0.85)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M44 65 A6 6 0 0 1 56 65",
    fill: "none",
    stroke: "white",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M54 62 L56 65 L59 63",
    fill: "none",
    stroke: "white",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "84",
    r: "3",
    fill: "rgba(168,85,247,0.6)",
    stroke: "rgba(255,255,255,0.3)",
    strokeWidth: "1"
  })),
  "Saúde": (s = 32) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 100 100",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "ic-bg-sau",
    cx: "40%",
    cy: "35%",
    r: "65%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#22C55E"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#15803D"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "ic-shine5",
    x1: "0%",
    y1: "0%",
    x2: "60%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(255,255,255,0.25)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(255,255,255,0)"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "100",
    rx: "22",
    fill: "url(#ic-bg-sau)"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "100",
    rx: "22",
    fill: "url(#ic-shine5)"
  }), /*#__PURE__*/React.createElement("g", {
    transform: "rotate(-35,50,50)"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "20",
    y: "43",
    width: "60",
    height: "14",
    rx: "7",
    fill: "white"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "20",
    y: "43",
    width: "30",
    height: "14",
    rx: "7",
    fill: "#86EFAC"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "35",
    cy: "43",
    rx: "8",
    ry: "4",
    fill: "rgba(255,255,255,0.5)"
  })), /*#__PURE__*/React.createElement("rect", {
    x: "57",
    y: "45",
    width: "10",
    height: "3",
    rx: "1.5",
    fill: "#15803D",
    transform: "rotate(-35,62,46.5)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "60.5",
    y: "41.5",
    width: "3",
    height: "10",
    rx: "1.5",
    fill: "#15803D",
    transform: "rotate(-35,62,46.5)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "50",
    cy: "50",
    rx: "32",
    ry: "16",
    fill: "none",
    stroke: "rgba(134,239,172,0.35)",
    strokeWidth: "2",
    transform: "rotate(-35,50,50)"
  })),
  "Lazer": (s = 32) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 100 100",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "ic-bg-laz",
    cx: "40%",
    cy: "35%",
    r: "65%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#A855F7"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#6B21A8"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "ic-shine6",
    x1: "0%",
    y1: "0%",
    x2: "60%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(255,255,255,0.25)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(255,255,255,0)"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "100",
    rx: "22",
    fill: "url(#ic-bg-laz)"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "100",
    rx: "22",
    fill: "url(#ic-shine6)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 45 Q15 30 30 28 L70 28 Q85 30 85 45 L80 68 Q78 80 68 78 L58 70 Q55 68 50 68 Q45 68 42 70 L32 78 Q22 80 20 68 Z",
    fill: "#2D1B69"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 45 Q15 30 30 28 L70 28 Q85 30 85 45 L80 68 Q78 80 68 78 L58 70 Q55 68 50 68 Q45 68 42 70 L32 78 Q22 80 20 68 Z",
    fill: "rgba(168,85,247,0.25)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "22",
    y: "44",
    width: "20",
    height: "6",
    rx: "3",
    fill: "#6D28D9"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "28",
    y: "38",
    width: "6",
    height: "18",
    rx: "3",
    fill: "#6D28D9"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "70",
    cy: "38",
    r: "5",
    fill: "#EC4899"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "80",
    cy: "46",
    r: "5",
    fill: "#F97316"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "70",
    cy: "54",
    r: "5",
    fill: "#22C55E"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "46",
    r: "5",
    fill: "#3B82F6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "43",
    y: "44",
    width: "7",
    height: "5",
    rx: "2.5",
    fill: "rgba(255,255,255,0.3)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "50",
    y: "44",
    width: "7",
    height: "5",
    rx: "2.5",
    fill: "rgba(255,255,255,0.3)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "62",
    r: "7",
    fill: "#4C1D95"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "62",
    r: "4",
    fill: "#6D28D9"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "63",
    cy: "62",
    r: "7",
    fill: "#4C1D95"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "63",
    cy: "62",
    r: "4",
    fill: "#6D28D9"
  })),
  "Outros": (s = 32) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 100 100",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "ic-bg-out",
    cx: "40%",
    cy: "35%",
    r: "65%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#64748B"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#334155"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "ic-shine7",
    x1: "0%",
    y1: "0%",
    x2: "60%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(255,255,255,0.2)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(255,255,255,0)"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "100",
    rx: "22",
    fill: "url(#ic-bg-out)"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "100",
    rx: "22",
    fill: "url(#ic-shine7)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 52 L50 64 L82 52 L82 78 Q82 82 78 83 L22 83 Q18 82 18 78 Z",
    fill: "#475569"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 52 L18 78 Q18 82 22 83 L50 83 L50 64 Z",
    fill: "#334155"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50 64 L50 83 L78 83 Q82 82 82 78 L82 52 Z",
    fill: "#3B4D60"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 52 L50 40 L82 52 L50 64 Z",
    fill: "#64748B"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50 40 L50 64",
    stroke: "#FBBF24",
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M34 46 L66 58",
    stroke: "#FBBF24",
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "35",
    y: "68",
    width: "20",
    height: "9",
    rx: "2",
    fill: "rgba(255,255,255,0.15)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 52 L34 45 L50 40 L50 44 L34 49 L18 56 Z",
    fill: "rgba(255,255,255,0.1)"
  }))
};
const DEFAULT_CATS = [{
  name: "Alimentação",
  emoji: "🍔",
  color: "#f97316"
}, {
  name: "Transporte",
  emoji: "⛽",
  color: "#3b82f6"
}, {
  name: "Compras",
  emoji: "🛍️",
  color: "#ec4899"
}, {
  name: "Assinaturas",
  emoji: "📱",
  color: "#a855f7"
}, {
  name: "Saúde",
  emoji: "💊",
  color: "#22c55e"
}, {
  name: "Lazer",
  emoji: "🎬",
  color: "#eab308"
}, {
  name: "Outros",
  emoji: "📦",
  color: "#94a3b8"
}];
const DEFAULT_CFG = {
  salary: 5000,
  fixed: 3250,
  savings: 500
};
const MONTHS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const MONTHS_SHORT = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const INSTALLS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 18, 24];
const EMOJIS = ["🍔", "⛽", "🛍️", "📱", "💊", "🎬", "📦", "🏠", "✈️", "🎓", "💰", "🐾", "🎁", "🍺", "🔧", "📚", "🏋️", "🎮"];

// --─ HELPERS ----------------------------------------------------─
const fmt = v => `R$ ${Number(v || 0).toLocaleString("pt-BR", {
  minimumFractionDigits: 2
})}`;
const fmtShort = v => v >= 1000 ? `R$ ${(v / 1000).toFixed(1)}k` : `R$ ${v.toFixed(0)}`;
const fmtDate = d => new Date(d + "T12:00:00").toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "short"
});
const mKey = (y, m) => `${y}-${String(m + 1).padStart(2, "0")}`;
const today = new Date();

// --─ KEYWORD CLASSIFIER ------------------------------------------
const KW = [{
  c: "Alimentação",
  kw: ["mercado", "supermercado", "ifood", "ifd", "restaurante", "burger", "pizza", "lanche", "padaria", "panificadora", "açougue", "sushi", "doce", "sorvete", "pastel", "bistro", "betao", "goiabao", "rede store", "cacau", "caramel", "comida", "mcdonald", "subway"]
}, {
  c: "Transporte",
  kw: ["uber", "99app", "gasolina", "combustivel", "posto", "auto posto", "postozz", "estacionamento", "pedagio", "metro", "onibus", "motos", "moto", "sem parar", "dr motos"]
}, {
  c: "Compras",
  kw: ["amazon", "mercado livre", "americanas", "shopee", "aliexpress", "shein", "riachuelo", "c&a", "renner", "zara", "vivara", "casas bahia", "magazine", "extra", "kabum", "mercatooutlet", "lojas", "loja", "store", "shop"]
}, {
  c: "Assinaturas",
  kw: ["spotify", "netflix", "youtube", "prime", "disney", "hbo", "globoplay", "apple", "google", "microsoft", "adobe", "canva", "claude", "openai", "kiwify", "hotmart", "udemy", "deezer", "twitch", "kindle", "unltd", "max"]
}, {
  c: "Saúde",
  kw: ["farmacia", "drogaria", "droga", "saude", "health", "unimed", "amil", "hapvida", "dentista", "medico", "consulta", "clinica", "hospital", "laboratorio", "exame", "remedio", "academia", "gym", "smartfit", "bluefit", "rd saude"]
}, {
  c: "Lazer",
  kw: ["cinema", "teatro", "show", "ingresso", "ticketmaster", "eventim", "sympla", "game", "steam", "playstation", "xbox", "nintendo", "viagem", "hotel", "booking", "airbnb", "turismo"]
}];
const classifyLocal = t => {
  const s = t.toLowerCase();
  for (const r of KW) if (r.kw.some(k => s.includes(k))) return r.c;
  return "Outros";
};
const parseInstallment = t => {
  const m = t.match(/[Pp]arcela\s+(\d+)\s*\/\s*(\d+)/);
  return m ? {
    current: +m[1],
    total: +m[2]
  } : null;
};
const stripInstallment = t => t.replace(/\s*[\[(]?[Pp]arcela\s+\d+\s*\/\s*\d+[\])]?\s*/g, "").trim();
const generateFuture = item => {
  const inst = parseInstallment(item.title);
  if (!inst || inst.current >= inst.total) return [];
  const sid = `inst-${item.id}`,
    [y, m] = item.date.split("-").map(Number),
    clean = stripInstallment(item.title),
    out = [];
  for (let i = inst.current + 1; i <= inst.total; i++) {
    let fm = m + (i - inst.current),
      fy = y;
    while (fm > 12) {
      fm -= 12;
      fy++;
    }
    out.push({
      monthKey: `${fy}-${String(fm).padStart(2, "0")}`,
      expense: {
        id: `${sid}-p${i}-${Date.now() + i}`,
        date: `${fy}-${String(fm).padStart(2, "0")}-10`,
        title: `${clean} (Parcela ${i}/${inst.total})`,
        amount: item.amount,
        category: item.category,
        paymentMethod: item.paymentMethod || "nubank",
        isInstallment: true,
        seriesId: sid,
        installmentCurrent: i,
        installmentTotal: inst.total
      }
    });
  }
  return out;
};
const parseText = (raw, fallbackDate) => {
  const lines = raw.split(/\n|;/).map(l => l.trim()).filter(Boolean);
  const results = [];
  const amtRe = /R\$\s*([\d.]*[\d],\d{2}|\d+[.,]\d{2})/g;
  for (const line of lines) {
    if (/^(pagamento|credito|cr\u00e9dito|juros|iof|cet|multa|total da fatura|limite|vencimento|emitido|parcela de fatura|pagamento minimo)/i.test(line)) continue;
    const amounts = [...line.matchAll(amtRe)].map(m => parseFloat(m[1].replace(/\./g, "").replace(",", ".")));
    if (!amounts.length) {
      const simple = line.match(/^(\d+[.,]?\d*)\s+(.+)$/) || line.match(/^(.+?)\s+(\d+[.,]\d*)$/);
      if (simple) {
        const s1 = simple[1],
          s2 = simple[2];
        const amt = parseFloat((s1 && s1.match(/^\d/) ? s1 : s2).replace(",", "."));
        if (amt > 0 && amt < 50000) {
          const desc = (s1 && s1.match(/[a-zA-Z]/) ? s1 : s2) || line;
          results.push({
            title: desc.trim(),
            amount: amt,
            date: fallbackDate,
            category: classifyLocal(desc)
          });
        }
      }
      continue;
    }
    const amount = amounts[amounts.length - 1];
    if (!amount || amount <= 0 || amount > 50000) continue;
    let desc = line.replace(/R\$\s*[\d.,]+/g, "").trim();
    const datePfx = desc.match(/^(\d{1,2})\/(\d{1,2})\s*/);
    let expDate = fallbackDate;
    if (datePfx) {
      const [, d, m] = datePfx;
      const y = fallbackDate.slice(0, 4);
      expDate = `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
      desc = desc.replace(datePfx[0], "").trim();
    }
    if (!desc || desc.length < 2) continue;
    const instA = desc.match(/[Pp]arcela\s+(\d+)\s+de\s+(\d+)/);
    if (instA) desc = desc.replace(instA[0], `(Parcela ${instA[1]}/${instA[2]})`).replace(/\s+/g, " ").trim();
    results.push({
      title: desc,
      amount,
      date: expDate,
      category: classifyLocal(desc)
    });
  }
  return results;
};
const parseCSV = text => {
  const lines = text.trim().split("\n").slice(1);
  return lines.map(l => {
    const parts = l.split(",");
    const date = (parts[0] || '').trim();
    const title = parts.slice(1, parts.length - 1).join(",").trim().replace(/^"|"$/g, "");
    const amount = parseFloat(parts[parts.length - 1]);
    if (!amount || amount <= 0 || !title) return null;
    const inst = title.match(/[Pp]arcela\s+(\d+)\s*[\/de]+\s*(\d+)/);
    const cleanTitle = inst ? title.replace(inst[0], `(Parcela ${inst[1]}/${inst[2]})`) : title;
    return {
      date,
      title: cleanTitle,
      amount,
      category: classifyLocal(title)
    };
  }).filter(Boolean);
};

// --─ INITIAL DATA ------------------------------------------------─
const MAY = [{
  id: 1,
  date: "2026-05-25",
  title: "Spotify",
  amount: 31.90,
  category: "Assinaturas",
  paymentMethod: "nubank"
}, {
  id: 2,
  date: "2026-05-24",
  title: "Rd Saude Online",
  amount: 35.04,
  category: "Saúde",
  paymentMethod: "nubank"
}, {
  id: 3,
  date: "2026-05-24",
  title: "Braz Auto Posto",
  amount: 50.00,
  category: "Transporte",
  paymentMethod: "nubank"
}, {
  id: 4,
  date: "2026-05-24",
  title: "Mercatooutlet",
  amount: 119.90,
  category: "Compras",
  paymentMethod: "nubank"
}, {
  id: 5,
  date: "2026-05-24",
  title: "Universe Burger",
  amount: 70.30,
  category: "Alimentação",
  paymentMethod: "pix"
}, {
  id: 6,
  date: "2026-05-23",
  title: "Braz Auto Posto",
  amount: 50.00,
  category: "Transporte",
  paymentMethod: "nubank"
}, {
  id: 7,
  date: "2026-05-23",
  title: "Supermercado Novo Braz",
  amount: 53.54,
  category: "Alimentação",
  paymentMethod: "debito"
}, {
  id: 8,
  date: "2026-05-23",
  title: "iFood",
  amount: 17.99,
  category: "Alimentação",
  paymentMethod: "nubank"
}, {
  id: 9,
  date: "2026-05-22",
  title: "Panificadora Paes Rico",
  amount: 15.00,
  category: "Alimentação",
  paymentMethod: "dinheiro"
}, {
  id: 10,
  date: "2026-05-22",
  title: "Super Betao Supermercado",
  amount: 191.74,
  category: "Alimentação",
  paymentMethod: "debito"
}, {
  id: 11,
  date: "2026-05-21",
  title: "Caramellat",
  amount: 29.42,
  category: "Alimentação",
  paymentMethod: "nubank"
}, {
  id: 12,
  date: "2026-05-18",
  title: "Pix Gilberto",
  amount: 12.00,
  category: "Outros",
  paymentMethod: "pix"
}, {
  id: 13,
  date: "2026-05-17",
  title: "Restaurante Top",
  amount: 26.95,
  category: "Alimentação",
  paymentMethod: "pix"
}, {
  id: 14,
  date: "2026-05-17",
  title: "Auto Posto Igualdade",
  amount: 50.00,
  category: "Transporte",
  paymentMethod: "nubank"
}, {
  id: 15,
  date: "2026-05-16",
  title: "Dr Motos (Parcela 1/2)",
  amount: 99.50,
  category: "Transporte",
  paymentMethod: "nubank",
  isInstallment: true,
  seriesId: "inst-15",
  installmentCurrent: 1,
  installmentTotal: 2
}, {
  id: 16,
  date: "2026-05-15",
  title: "Aliexpress",
  amount: 39.57,
  category: "Compras",
  paymentMethod: "nubank"
}, {
  id: 17,
  date: "2026-05-15",
  title: "Uber",
  amount: 6.91,
  category: "Transporte",
  paymentMethod: "nubank"
}, {
  id: 18,
  date: "2026-05-15",
  title: "iFood - Dyene",
  amount: 53.00,
  category: "Alimentação",
  paymentMethod: "nubank"
}, {
  id: 19,
  date: "2026-05-14",
  title: "Supermercado Brasil",
  amount: 5.25,
  category: "Alimentação",
  paymentMethod: "debito"
}, {
  id: 20,
  date: "2026-05-14",
  title: "Posto Parauna",
  amount: 50.00,
  category: "Transporte",
  paymentMethod: "nubank"
}, {
  id: 21,
  date: "2026-05-13",
  title: "Pastelaria",
  amount: 56.00,
  category: "Alimentação",
  paymentMethod: "pix"
}, {
  id: 22,
  date: "2026-05-12",
  title: "Claude.Ai Subscription",
  amount: 114.14,
  category: "Assinaturas",
  paymentMethod: "nubank"
}, {
  id: 23,
  date: "2026-05-11",
  title: "Auto Posto Igualdade",
  amount: 50.00,
  category: "Transporte",
  paymentMethod: "nubank"
}, {
  id: 24,
  date: "2026-05-10",
  title: "Americanas (Parcela 1/2)",
  amount: 70.00,
  category: "Compras",
  paymentMethod: "nubank",
  isInstallment: true,
  seriesId: "inst-24",
  installmentCurrent: 1,
  installmentTotal: 2
}, {
  id: 25,
  date: "2026-05-10",
  title: "iFood - Cleomenes",
  amount: 56.20,
  category: "Alimentação",
  paymentMethod: "nubank"
}, {
  id: 26,
  date: "2026-05-10",
  title: "Cacau Show",
  amount: 78.97,
  category: "Alimentação",
  paymentMethod: "nubank"
}, {
  id: 27,
  date: "2026-05-10",
  title: "Riachuelo",
  amount: 49.99,
  category: "Compras",
  paymentMethod: "nubank"
}, {
  id: 28,
  date: "2026-05-09",
  title: "Pix Isabella",
  amount: 17.77,
  category: "Outros",
  paymentMethod: "pix"
}, {
  id: 29,
  date: "2026-05-08",
  title: "Casas Bahia (Parcela 1/3)",
  amount: 49.68,
  category: "Compras",
  paymentMethod: "nubank",
  isInstallment: true,
  seriesId: "inst-29",
  installmentCurrent: 1,
  installmentTotal: 3
}, {
  id: 30,
  date: "2026-05-07",
  title: "iFood - Dyene",
  amount: 44.93,
  category: "Alimentação",
  paymentMethod: "nubank"
}, {
  id: 31,
  date: "2026-05-06",
  title: "Bistro 15",
  amount: 14.00,
  category: "Alimentação",
  paymentMethod: "pix"
}, {
  id: 32,
  date: "2026-05-05",
  title: "Posto C",
  amount: 30.00,
  category: "Transporte",
  paymentMethod: "nubank"
}, {
  id: 33,
  date: "2026-05-04",
  title: "Rede Store Supermercado",
  amount: 459.67,
  category: "Alimentação",
  paymentMethod: "debito"
}, {
  id: 34,
  date: "2026-05-03",
  title: "Posto Moinhos dos Ventos",
  amount: 50.00,
  category: "Transporte",
  paymentMethod: "nubank"
}, {
  id: 35,
  date: "2026-05-03",
  title: "Panificadora Paes Rico",
  amount: 15.85,
  category: "Alimentação",
  paymentMethod: "dinheiro"
}, {
  id: 36,
  date: "2026-05-02",
  title: "Kiwify (Parcela 2/2)",
  amount: 45.79,
  category: "Assinaturas",
  paymentMethod: "nubank",
  isInstallment: true,
  seriesId: "inst-36",
  installmentCurrent: 2,
  installmentTotal: 2
}, {
  id: 37,
  date: "2026-05-02",
  title: "Mercado Livre (Parcela 3/3)",
  amount: 98.90,
  category: "Compras",
  paymentMethod: "nubank",
  isInstallment: true,
  seriesId: "inst-37",
  installmentCurrent: 3,
  installmentTotal: 3
}];
const JUN_INST = [{
  id: "ji15",
  date: "2026-06-10",
  title: "Dr Motos (Parcela 2/2)",
  amount: 99.50,
  category: "Transporte",
  paymentMethod: "nubank",
  isInstallment: true,
  seriesId: "inst-15",
  installmentCurrent: 2,
  installmentTotal: 2
}, {
  id: "ji24",
  date: "2026-06-10",
  title: "Americanas (Parcela 2/2)",
  amount: 70.00,
  category: "Compras",
  paymentMethod: "nubank",
  isInstallment: true,
  seriesId: "inst-24",
  installmentCurrent: 2,
  installmentTotal: 2
}, {
  id: "ji29",
  date: "2026-06-10",
  title: "Casas Bahia (Parcela 2/3)",
  amount: 49.68,
  category: "Compras",
  paymentMethod: "nubank",
  isInstallment: true,
  seriesId: "inst-29",
  installmentCurrent: 2,
  installmentTotal: 3
}];
const JUL_INST = [{
  id: "ji29b",
  date: "2026-07-10",
  title: "Casas Bahia (Parcela 3/3)",
  amount: 49.68,
  category: "Compras",
  paymentMethod: "nubank",
  isInstallment: true,
  seriesId: "inst-29",
  installmentCurrent: 3,
  installmentTotal: 3
}];
const INIT_STORE = {
  "2026-05": MAY,
  "2026-06": JUN_INST,
  "2026-07": JUL_INST
};
const HIST_TOTALS = {
  "2025-12": 1890,
  "2026-01": 2100,
  "2026-02": 1750,
  "2026-03": 2200,
  "2026-04": 1997,
  "2026-05": 2533
};

// --─ NAV ITEMS ----------------------------------------------------
const NAV = [{
  id: "resumo",
  label: "Resumo",
  Icon: Home,
  color: "#f97316"
}, {
  id: "gastos",
  label: "Gastos",
  Icon: ShoppingBag,
  color: "#ec4899"
}, {
  id: "cartoes",
  label: "Cartões",
  Icon: CreditCard,
  color: "#a855f7"
}, {
  id: "transacoes",
  label: "Transações",
  Icon: ArrowLeftRight,
  color: "#3b82f6"
}, {
  id: "wallet",
  label: "Apple Wallet",
  Icon: Wallet,
  color: "#32BCAD"
}, {
  id: "orcamentos",
  label: "Orçamentos",
  Icon: PieIcon,
  color: "#06b6d4"
}, {
  id: "metas",
  label: "Metas",
  Icon: Target,
  color: "#22c55e"
}, {
  id: "investimentos",
  label: "Investimentos",
  Icon: TrendingUp,
  color: "#eab308"
}, {
  id: "relatorios",
  label: "Relatórios",
  Icon: FileText,
  color: "#8b5cf6"
}, {
  id: "calendario",
  label: "Calendário",
  Icon: Calendar,
  color: "#f43f5e"
}, {
  id: "lembretes",
  label: "Lembretes",
  Icon: Bell,
  color: "#f97316"
}];

// --─ PRESENTATIONAL COMPONENTS ----------------------------------─
function StatCard({
  label,
  value,
  sub,
  color,
  icon,
  onClick,
  t
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      background: t.card,
      borderRadius: 16,
      border: `1px solid ${t.border}`,
      padding: "16px 18px",
      cursor: onClick ? "pointer" : "default"
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      marginBottom: 8
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: t.dim,
      letterSpacing: 2,
      textTransform: "uppercase",
      fontWeight: 600,
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      color: color || t.text,
      letterSpacing: -.5
    }
  }, value), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: t.muted,
      marginTop: 4
    }
  }, sub));
}
function CatIcon({
  cat,
  size,
  catMap
}) {
  const sz = size || 32;
  const IconSVG = typeof CAT_ICONS !== "undefined" && CAT_ICONS[cat];
  if (IconSVG) return /*#__PURE__*/React.createElement("div", {
    style: {
      width: sz,
      height: sz,
      flexShrink: 0,
      borderRadius: sz * 0.22,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, IconSVG(sz));
  const cfg = (catMap || {})[cat] || {
    emoji: "📦",
    color: "#94a3b8"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: sz,
      height: sz,
      borderRadius: 99,
      background: cfg.color + "22",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: sz * 0.45,
      flexShrink: 0
    }
  }, cfg.emoji);
}
function TxRow({
  e,
  showRemove,
  catMap,
  cardMap,
  onRemove,
  t
}) {
  const cd = (cardMap || {})[e.paymentMethod];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "13px 18px",
      borderBottom: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement(CatIcon, {
    cat: e.category,
    size: 36,
    catMap: catMap
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: t.text,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      flex: 1,
      marginRight: 8
    }
  }, e.title, e.isInstallment && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 6,
      fontSize: 9,
      background: "rgba(234,179,8,0.18)",
      color: "#eab308",
      padding: "2px 5px",
      borderRadius: 4
    }
  }, "PARCELA")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: t.text,
      whiteSpace: "nowrap",
      flexShrink: 0
    }
  }, fmt(e.amount))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: t.muted
    }
  }, e.category), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, cd && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: cd.color,
      fontWeight: 500
    }
  }, cd.icon, " ", cd.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: t.dim
    }
  }, "· ", fmtDate(e.date))))), showRemove && /*#__PURE__*/React.createElement("button", {
    onClick: () => onRemove(e.id),
    style: {
      background: "none",
      border: "none",
      color: t.dim,
      cursor: "pointer",
      fontSize: 16,
      flexShrink: 0
    }
  }, "×"));
}
function App() {
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("resumo");
  const [sbCollapsed, setSbCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  const [curY, setCurY] = useState(2026);
  const [curM, setCurM] = useState(4);
  const [store, setStore] = useState(INIT_STORE);
  const [config, setConfig] = useState(DEFAULT_CFG);
  const [cats, setCats] = useState(DEFAULT_CATS);
  const [activeCardIds, setActiveCardIds] = useState(DEFAULT_ACTIVE);
  const [customCards, setCustomCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    email: "",
    goal: "",
    photo: ""
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    mode: "login"
  });
  const [loginErr, setLoginErr] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showRecentTx, setShowRecentTx] = useState(true);
  const [showAccount, setShowAccount] = useState(false);
  const [showParcelas, setShowParcelas] = useState(false);
  const [showNewCard, setShowNewCard] = useState(false);
  const [showNewCat, setShowNewCat] = useState(false);
  const [showCardPicker, setShowCardPicker] = useState(false);
  const [cfgDraft, setCfgDraft] = useState(DEFAULT_CFG);
  const [newCat, setNewCat] = useState({
    name: "",
    emoji: "🏷️",
    color: PALETTE[7]
  });
  const [newCard, setNewCard] = useState({
    name: "",
    icon: "💳",
    color: PALETTE[0]
  });
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Alimentação",
    date: today.toISOString().slice(0, 10),
    paymentMethod: "pix",
    isInstallment: false,
    installCount: 2,
    isFixed: false
  });
  const [formErr, setFormErr] = useState("");
  const [aiText, setAiText] = useState("");
  const [aiErr, setAiErr] = useState("");
  const [csvLoad, setCsvLoad] = useState(false);
  const [pdfMsg, setPdfMsg] = useState("");
  const [filterCat, setFilterCat] = useState(null);
  const [filterCard, setFilterCard] = useState(null);
  const [goalForm, setGoalForm] = useState({
    name: "",
    target: "",
    saved: "",
    deadline: "",
    category: "",
    icon: "🎯"
  });
  const [goals, setGoals] = useState([{
    id: 1,
    name: "Viagem dos sonhos",
    icon: "✈️",
    category: "Lazer",
    target: 15000,
    saved: 8250,
    deadline: "2026-12-15",
    color: "#22c55e"
  }, {
    id: 2,
    name: "Reserva de emergência",
    icon: "🛡️",
    category: "Segurança",
    target: 5000,
    saved: 150,
    deadline: null,
    color: "#3b82f6"
  }]);
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickForm, setQuickForm] = useState({
    title: "",
    amount: "",
    category: "Alimentação",
    paymentMethod: "pix"
  });
  // -- Wallet states (must be at App level - Rules of Hooks)
  const [walletText, setWalletText] = useState("");
  const [walletParsed, setWalletParsed] = useState(null);
  const [walletCat, setWalletCat] = useState("Alimentação");
  const [walletMethod, setWalletMethod] = useState("pix");
  const [walletTitle, setWalletTitle] = useState("");
  const [walletSaved, setWalletSaved] = useState(false);
  const [walletHistory, setWalletHistory] = useState([]);
  // -- Make sync states
  const [makeWebhookUrl, setMakeWebhookUrl] = useState("");
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncPreview, setSyncPreview] = useState(null);
  const [syncMsg, setSyncMsg] = useState("");
  // Make sync states
  const [makeWebhook, setMakeWebhook] = useState("");
  const [makeSheetId, setMakeSheetId] = useState("");
  const [syncStatus, setSyncStatus] = useState("idle"); // idle | loading | success | error
  const [syncResult, setSyncResult] = useState(null);
  const [syncCount, setSyncCount] = useState(0);
  const [walletTab, setWalletTab] = useState("sync"); // sync | manual | guide

  const fileRef = useRef();
  const pdfRef = useRef();
  const t = dark ? DK : LK;
  const budget = config.salary - config.fixed - config.savings;
  const key = mKey(curY, curM);
  const expenses = store[key] || [];
  const catMap = Object.fromEntries(cats.map(c => [c.name, c]));
  const allCardOptions = [...CARD_CATALOG, ...customCards];
  const cards = allCardOptions.filter(c => activeCardIds.includes(c.id));
  const cardMap = Object.fromEntries(allCardOptions.map(c => [c.id, c]));
  const setExpenses = useCallback(fn => {
    setStore(prev => ({
      ...prev,
      [key]: typeof fn === "function" ? fn(prev[key] || []) : fn
    }));
  }, [key]);
  const mergeInstallments = useCallback((newItems, targetKey) => {
    setStore(prev => {
      const next = {
        ...prev
      };
      const existing = prev[targetKey] || [];
      next[targetKey] = [...existing, ...newItems];
      newItems.forEach(item => {
        generateFuture(item).forEach(({
          monthKey: mk,
          expense
        }) => {
          const cur = next[mk] || prev[mk] || [];
          const dup = cur.some(e => e.seriesId === expense.seriesId && e.installmentCurrent === expense.installmentCurrent);
          if (!dup) next[mk] = [...cur, expense];
        });
      });
      return next;
    });
  }, []);
  useEffect(() => {
    (async () => {
      try {
        await window.storage.set("fl_store", JSON.stringify(store));
      } catch {}
    })();
  }, [store]);
  useEffect(() => {
    (async () => {
      try {
        await window.storage.set("fl_cfg", JSON.stringify({
          config,
          cats,
          activeCardIds,
          customCards,
          dark,
          profile,
          isLoggedIn,
          goals,
          makeWebhookUrl
        }));
      } catch {}
    })();
  }, [config, cats, activeCardIds, customCards, dark, profile, isLoggedIn, goals, makeWebhookUrl]);
  useEffect(() => {
    (async () => {
      try {
        const s = await window.storage.get("fl_store");
        const c = await window.storage.get("fl_cfg");
        if (s && s.value) {
          const v = JSON.parse(s.value);
          setStore({
            ...INIT_STORE,
            ...v
          });
        }
        if (c && c.value) {
          const v = JSON.parse(c.value);
          if (v.config) {
            setConfig(v.config);
            setCfgDraft(v.config);
          }
          if (v.cats) setCats(v.cats);
          if (v.activeCardIds) setActiveCardIds(v.activeCardIds);
          if (v.customCards) setCustomCards(v.customCards);
          if (typeof v.dark === "boolean") setDark(v.dark);
          if (v.profile) setProfile(v.profile);
          if (v.isLoggedIn) setIsLoggedIn(true);
          if (v.goals) setGoals(v.goals);
          if (v.makeWebhookUrl) setMakeWebhookUrl(v.makeWebhookUrl);
        }
      } catch {}
    })();
  }, []);
  const goMonth = dir => {
    let m = curM + dir,
      y = curY;
    if (m < 0) {
      m = 11;
      y--;
    }
    if (m > 11) {
      m = 0;
      y++;
    }
    setCurM(m);
    setCurY(y);
  };
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const remaining = budget - total;
  const pct = Math.min(total / budget * 100, 100);
  const overBudget = total > budget;
  const pctColor = pct > 90 ? "#ef4444" : pct > 70 ? "#f97316" : "#22c55e";
  const allMonths = Object.keys(store).filter(k => store[k] && store[k].length).sort();
  const prevKey = curM === 0 ? `${curY - 1}-12` : `${curY}-${String(curM).padStart(2, "0")}`;
  const prevTotal = (store[prevKey] || []).reduce((s, e) => s + e.amount, 0);
  const diff = total - prevTotal;
  const byCategory = Object.entries(expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {})).map(([name, value]) => ({
    name,
    value
  })).sort((a, b) => b.value - a.value);
  const installInMonth = expenses.filter(e => e.isInstallment);
  const installTotal = installInMonth.reduce((s, e) => s + e.amount, 0);
  const byCard = allCardOptions.map(c => ({
    ...c,
    total: expenses.filter(e => e.paymentMethod === c.id).reduce((s, e) => s + e.amount, 0),
    count: expenses.filter(e => e.paymentMethod === c.id).length
  })).filter(c => c.count > 0);
  const todayMK = mKey(today.getFullYear(), today.getMonth());
  const futureInstByMonth = (() => {
    const map = {};
    Object.entries(store).forEach(([mk, items]) => {
      if (mk < key) return;
      const t = (items || []).filter(e => e.isInstallment).reduce((s, e) => s + e.amount, 0);
      if (t > 0) map[mk] = t;
    });
    return map;
  })();
  const submitForm = () => {
    if (!form.title.trim()) {
      setFormErr("Digite um nome.");
      return;
    }
    const amt = parseFloat(String(form.amount).replace(",", "."));
    if (!amt || amt <= 0) {
      setFormErr("Valor inválido.");
      return;
    }
    setFormErr("");
    const title = form.isInstallment ? `${form.title.trim()} (Parcela 1/${form.installCount})` : form.title.trim();
    mergeInstallments([{
      id: Date.now(),
      date: form.date,
      title,
      amount: amt,
      category: form.category,
      paymentMethod: form.paymentMethod,
      isFixed: form.isFixed
    }], key);
    setForm(f => ({
      ...f,
      title: "",
      amount: "",
      isInstallment: false,
      installCount: 2,
      isFixed: false
    }));
  };
  const classifyText = useCallback(() => {
    if (!aiText.trim()) return;
    setAiErr("");
    const ds = `${curY}-${String(curM + 1).padStart(2, "0")}-15`;
    const items = parseText(aiText, ds);
    if (!items.length) {
      setAiErr("Nenhum gasto reconhecido.");
      return;
    }
    mergeInstallments(items.map((e, i) => ({
      ...e,
      id: Date.now() + i,
      paymentMethod: form.paymentMethod
    })), key);
    setAiText("");
    setPage("transacoes");
  }, [aiText, curY, curM, key, form.paymentMethod, mergeInstallments]);
  const handleCSV = useCallback(async file => {
    if (!file) return;
    setCsvLoad(true);
    try {
      const text = await file.text();
      const items = parseCSV(text);
      if (!items.length) {
        setAiErr("Nenhuma transação.");
        setCsvLoad(false);
        return;
      }
      const [fy, fm] = items[0].date.split("-").map(Number);
      const csvKey = `${fy}-${String(fm).padStart(2, "0")}`;
      mergeInstallments(items.map((e, i) => ({
        ...e,
        id: Date.now() + i,
        paymentMethod: "nubank"
      })), csvKey);
      setCurY(fy);
      setCurM(fm - 1);
      setPage("resumo");
    } catch (e) {
      setAiErr(e.message);
    }
    setCsvLoad(false);
  }, [mergeInstallments]);
  const removeExpense = id => setExpenses(prev => prev.filter(e => e.id !== id));
  const C = (extra = {}) => ({
    background: t.card,
    borderRadius: 16,
    border: `1px solid ${t.border}`,
    ...extra
  });
  const inp = (extra = {}) => ({
    background: t.inp,
    border: `1px solid ${t.border}`,
    borderRadius: 10,
    color: t.text,
    fontSize: 14,
    padding: "10px 12px",
    width: "100%",
    fontFamily: "inherit",
    outline: "none",
    ...extra
  });
  const lbl = {
    fontSize: 14,
    color: t.dim,
    letterSpacing: 2,
    textTransform: "uppercase",
    fontWeight: 600,
    marginBottom: 5,
    display: "block"
  };
  const sheet = {
    position: "fixed",
    inset: 0,
    background: t.overlay,
    zIndex: 200,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center"
  };
  const panel = {
    background: t.sb,
    borderRadius: "20px 20px 0 0",
    border: `1px solid ${t.border}`,
    width: "100%",
    maxWidth: 520,
    maxHeight: "90vh",
    overflowY: "auto",
    padding: "20px 20px 40px"
  };

  // Inner TxRow using closures
  const TxRowInner = ({
    e,
    showRemove
  }) => {
    const cd = (cardMap || {})[e.paymentMethod];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "13px 18px",
        borderBottom: `1px solid ${t.borderAlt}`
      }
    }, /*#__PURE__*/React.createElement(CatIcon, {
      cat: e.category,
      size: 36,
      catMap: catMap
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: t.text,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        flex: 1,
        marginRight: 8
      }
    }, e.title, e.isInstallment && /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 6,
        fontSize: 9,
        background: "rgba(234,179,8,0.18)",
        color: "#eab308",
        padding: "2px 5px",
        borderRadius: 4
      }
    }, "PARCELA")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: t.text,
        whiteSpace: "nowrap",
        flexShrink: 0
      }
    }, fmt(e.amount))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: t.muted
      }
    }, e.category), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4
      }
    }, cd && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: cd.color,
        fontWeight: 500
      }
    }, cd.icon, " ", cd.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: t.dim
      }
    }, "· ", fmtDate(e.date))))), showRemove && /*#__PURE__*/React.createElement("button", {
      onClick: () => removeExpense(e.id),
      style: {
        background: "none",
        border: "none",
        color: t.dim,
        cursor: "pointer",
        fontSize: 16,
        flexShrink: 0
      }
    }, "×"));
  };

  // -- LOGIN SCREEN ----------------------------------------------
  if (!isLoggedIn) return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: DK.bg,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 24px",
      fontFamily: "'DM Sans',sans-serif"
    }
  }, /*#__PURE__*/React.createElement("style", null, `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0}input,button{font-family:inherit;outline:none}`), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(FLLogo, {
    size: 80
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 34,
      fontWeight: 700,
      letterSpacing: -.5,
      background: "linear-gradient(90deg,#E8583A,#2A5EA8)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: 10
    }
  }, "Finance Life"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: DK.muted,
      lineHeight: 1.6
    }
  }, "Controle financeiro inteligente", /*#__PURE__*/React.createElement("br", null), "para você alcançar seus objetivos")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      marginBottom: 48,
      width: "100%",
      maxWidth: 320
    }
  }, [["📊", "Dashboard completo com gráficos"], ["💳", "Controle por cartão e forma de pagamento"], ["🎯", "Metas e objetivos financeiros"], ["📄", "Importação de faturas CSV"]].map(([emoji, text]) => /*#__PURE__*/React.createElement("div", {
    key: text,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 16px",
      background: DK.card,
      borderRadius: 14,
      border: `1px solid ${DK.border}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, emoji), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: DK.mid
    }
  }, text)))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 320,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsLoggedIn(true),
    style: {
      width: "100%",
      background: "linear-gradient(135deg,#E8583A,#3A5F8A)",
      border: "none",
      color: "#fff",
      padding: "16px",
      borderRadius: 16,
      fontSize: 16,
      fontWeight: 700,
      cursor: "pointer",
      boxShadow: "0 6px 24px rgba(232,88,58,0.35)",
      letterSpacing: .3
    }
  }, "Entrar no Finance Life →"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => alert("Configure OAuth Google no Supabase."),
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      padding: "12px",
      borderRadius: 12,
      border: `1px solid ${DK.border}`,
      background: DK.card,
      color: DK.mid,
      fontSize: 15,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#4285F4",
    d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#34A853",
    d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FBBC05",
    d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#EA4335",
    d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
  })), "Google"), /*#__PURE__*/React.createElement("button", {
    onClick: () => alert("Configure OAuth Microsoft no Supabase."),
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      padding: "12px",
      borderRadius: 12,
      border: "none",
      background: "#0078d4",
      color: "#fff",
      fontSize: 15,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 23 23"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#f3f3f3",
    d: "M0 0h23v23H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#f35325",
    d: "M1 1h10v10H1z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#81bc06",
    d: "M12 1h10v10H12z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#05a6f0",
    d: "M1 12h10v10H1z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#ffba08",
    d: "M12 12h10v10H12z"
  })), "Microsoft"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      fontSize: 15,
      color: DK.dim,
      textAlign: "center"
    }
  }, "Versão demo • Dados salvos localmente"));

  // -- SIDEBAR --------------------------------------------------─
  const sbW = sbCollapsed ? 60 : 220;
  const renderSidebar = () => /*#__PURE__*/React.createElement("div", {
    style: {
      width: sbW,
      minHeight: "100vh",
      background: t.sb,
      borderRight: `1px solid ${t.border}`,
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      transition: "width .25s",
      overflow: "hidden",
      position: "sticky",
      top: 0,
      height: "100vh"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: sbCollapsed ? "14px 0" : "18px 16px",
      display: "flex",
      alignItems: "center",
      gap: 10,
      borderBottom: `1px solid ${t.border}`,
      justifyContent: sbCollapsed ? "center" : "flex-start"
    }
  }, sbCollapsed ? /*#__PURE__*/React.createElement(FLLogo, {
    size: 38
  }) : dark ? /*#__PURE__*/React.createElement(FLLogoFull, {
    iconSize: 38,
    textSize: 17
  }) : /*#__PURE__*/React.createElement(FLLogoFullLight, {
    iconSize: 38,
    textSize: 17
  })), /*#__PURE__*/React.createElement("div", {
    onClick: () => setSbCollapsed(v => !v),
    style: {
      padding: "8px",
      display: "flex",
      justifyContent: sbCollapsed ? "center" : "flex-end",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 24,
      height: 24,
      borderRadius: 6,
      background: t.border,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, sbCollapsed ? /*#__PURE__*/React.createElement(ChevronRight, {
    size: 13,
    color: t.muted
  }) : /*#__PURE__*/React.createElement(ChevronLeft, {
    size: 13,
    color: t.muted
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: "8px",
      overflowY: "auto"
    }
  }, NAV.map(n => {
    const active = page === n.id;
    const {
      Icon
    } = n;
    return /*#__PURE__*/React.createElement("div", {
      key: n.id,
      onClick: () => setPage(n.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: sbCollapsed ? "10px 0" : "10px 12px",
        borderRadius: 12,
        cursor: "pointer",
        marginBottom: 2,
        background: active ? dark ? "rgba(232,88,58,0.12)" : "rgba(232,88,58,0.08)" : "transparent",
        transition: "all .15s",
        justifyContent: sbCollapsed ? "center" : "flex-start",
        borderLeft: active ? "3px solid #E8583A" : "3px solid transparent"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 32,
        height: 32,
        borderRadius: 9,
        background: active ? `${n.color}25` : dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      size: 16,
      color: active ? n.color : t.muted,
      strokeWidth: active ? 2.2 : 1.8
    })), !sbCollapsed && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: active ? 600 : 400,
        color: active ? "#E8583A" : t.muted,
        whiteSpace: "nowrap"
      }
    }, n.label));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: `1px solid ${t.border}`,
      padding: "8px"
    }
  }, [[Settings, "Configurações", () => setShowSettings(true)], [HelpCircle, "Ajuda", () => {}]].map(([Icon, lb, fn]) => /*#__PURE__*/React.createElement("div", {
    key: lb,
    onClick: fn,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: sbCollapsed ? "10px 0" : "10px 12px",
      borderRadius: 10,
      cursor: "pointer",
      marginBottom: 2,
      justifyContent: sbCollapsed ? "center" : "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 9,
      background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    size: 16,
    color: t.muted,
    strokeWidth: 1.8
  })), !sbCollapsed && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: t.muted
    }
  }, lb))), /*#__PURE__*/React.createElement("div", {
    onClick: () => setShowAccount(true),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: sbCollapsed ? "10px 0" : "10px 12px",
      borderRadius: 10,
      cursor: "pointer",
      background: t.cardHov,
      marginBottom: 4,
      justifyContent: sbCollapsed ? "center" : "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 99,
      background: "linear-gradient(135deg,#E8583A,#3A5F8A)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      flexShrink: 0,
      border: `2px solid rgba(232,88,58,0.3)`
    }
  }, profile.photo ? /*#__PURE__*/React.createElement("img", {
    src: profile.photo,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    },
    alt: ""
  }) : /*#__PURE__*/React.createElement(User, {
    size: 16,
    color: "#fff",
    strokeWidth: 2
  })), !sbCollapsed && /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: t.text,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, profile.name ? "Olá, " + profile.name.split(" ")[0] : "Olá, Usuário"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: t.muted
    }
  }, "Ver perfil"))), /*#__PURE__*/React.createElement("div", {
    onClick: () => {
      if (window.confirm("Sair da conta?")) setIsLoggedIn(false);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: sbCollapsed ? "10px 0" : "10px 12px",
      borderRadius: 10,
      cursor: "pointer",
      justifyContent: sbCollapsed ? "center" : "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 9,
      background: "rgba(239,68,68,0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(LogOut, {
    size: 16,
    color: "#ef4444",
    strokeWidth: 1.8
  })), !sbCollapsed && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: "#ef4444"
    }
  }, "Sair"))));
  const renderMonthNav = compact => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: compact ? 12 : 16,
      marginBottom: compact ? 20 : 24,
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => goMonth(-1),
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: t.card,
      border: `1px solid ${t.border}`,
      color: t.muted,
      fontSize: 16,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "‹"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: compact ? 18 : 22,
      fontWeight: 600
    }
  }, MONTHS[curM], " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.muted,
      fontWeight: 400,
      fontSize: compact ? 14 : 16
    }
  }, curY)), allMonths.length > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 5,
      marginTop: 4
    }
  }, allMonths.slice(0, 5).map(mk => {
    const active = mk === key;
    return /*#__PURE__*/React.createElement("div", {
      key: mk,
      onClick: () => {
        const [y, m] = mk.split("-").map(Number);
        setCurY(y);
        setCurM(m - 1);
      },
      style: {
        width: active ? 14 : 5,
        height: 5,
        borderRadius: 99,
        background: active ? "#E8583A" : t.border,
        cursor: "pointer",
        transition: "all .2s"
      }
    });
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: () => goMonth(+1),
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: t.card,
      border: `1px solid ${t.border}`,
      color: t.muted,
      fontSize: 16,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "›"));

  // Wallet parser (outside pageContent - pure function, no hooks)
  const parseWalletText = raw => {
    if (!raw || !raw.trim()) return null;
    const txt = raw.trim();
    const m1 = txt.match(/R\$\s*([\d.]+,\d{2})/);
    const m2 = txt.match(/R\$\s*(\d+\.\d{2})/);
    const m3 = txt.match(/(\d+,\d{2})/);
    const m4 = txt.match(/(\d+\.\d{2})/);
    const amtMatch = m1 && m1[1] || m2 && m2[1] || m3 && m3[1] || m4 && m4[1];
    const amount = amtMatch ? parseFloat(amtMatch.replace(/\./g, "").replace(",", ".")) : null;
    const stopWords = /aprovad|compra|d\u00e9bito|cr\u00e9dito|pagamento|wallet|apple pay|google pay|transa|r\$|pix|enviado|recebido|fatura|limite|saldo|\d/i;
    const lines = txt.split(/[\n\u2022\u00b7-]/).map(l => l.trim()).filter(l => l.length > 2 && !stopWords.test(l));
    const merchant = lines[0] || null;
    const lower = txt.toLowerCase();
    let method = "pix";
    if (lower.includes("nubank") || lower.includes("nu ")) method = "nubank";else if (lower.includes("inter")) method = "inter";else if (lower.includes("ita\u00fa") || lower.includes("itau")) method = "itau";else if (lower.includes("bradesco")) method = "bradesco";else if (lower.includes("santander")) method = "santander";else if (lower.includes("mercado pago")) method = "mercadopago";else if (lower.includes("c6")) method = "c6";else if (lower.includes("caixa")) method = "caixa";else if (lower.includes("picpay")) method = "picpay";else if (lower.includes("d\u00e9bito") || lower.includes("debito")) method = "debito";else if (lower.includes("dinheiro") || lower.includes("esp\u00e9cie")) method = "dinheiro";
    return {
      amount,
      merchant,
      method,
      raw: txt
    };
  };
  const pageContent = () => {
    const px = {
      padding: isMobile ? "16px 14px 32px" : "28px 28px 40px",
      flex: 1,
      overflowY: "auto",
      maxWidth: 980
    };
    if (page === "resumo") {
      const monthlyData = Object.entries({
        ...HIST_TOTALS,
        [key]: total
      }).sort().map(([k, v]) => {
        const [y, m] = k.split("-").map(Number);
        return {
          month: MONTHS_SHORT[m - 1],
          year: y,
          fullLabel: `${MONTHS_SHORT[m - 1]} ${y}`,
          key: k,
          value: k === key ? total : v,
          isCurrent: k === key
        };
      });
      const chartMin = Math.min(...monthlyData.map(d => d.value)) * 0.85;
      const chartMax = Math.max(...monthlyData.map(d => d.value)) * 1.08;
      return /*#__PURE__*/React.createElement("div", {
        style: px
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 4,
          textAlign: "center"
        }
      }, "Resumo"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          color: t.muted,
          marginBottom: 24,
          textAlign: "center"
        }
      }, "Visão geral das suas finanças"), renderMonthNav(false), !showQuickAdd ? /*#__PURE__*/React.createElement("div", {
        onClick: () => setShowQuickAdd(true),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "linear-gradient(135deg,rgba(232,88,58,0.12),rgba(58,95,138,0.12))",
          border: "1px dashed rgba(232,88,58,0.4)",
          borderRadius: 16,
          padding: "14px 18px",
          marginBottom: 16,
          cursor: "pointer",
          transition: "all .15s"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "linear-gradient(135deg,#E8583A,#3A5F8A)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 4px 12px rgba(232,88,58,0.35)"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: "#fff",
          fontSize: 20,
          fontWeight: 700,
          lineHeight: 1
        }
      }, "+")), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 600,
          color: t.text
        }
      }, "Registrar gasto rápido"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: t.muted,
          marginTop: 1
        }
      }, "Toque para adicionar em segundos")), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 20,
          color: "rgba(232,88,58,0.5)"
        }
      }, "›")) : /*#__PURE__*/React.createElement("div", {
        style: {
          ...C({
            padding: "18px",
            marginBottom: 16
          }),
          border: "1px solid rgba(232,88,58,0.3)",
          background: dark ? "rgba(232,88,58,0.04)" : "rgba(232,88,58,0.02)"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 32,
          height: 32,
          borderRadius: 9,
          background: "linear-gradient(135deg,#E8583A,#3A5F8A)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: "#fff",
          fontSize: 16,
          fontWeight: 700
        }
      }, "+")), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 15,
          fontWeight: 700,
          color: t.text
        }
      }, "Novo gasto")), /*#__PURE__*/React.createElement("button", {
        onClick: () => setShowQuickAdd(false),
        style: {
          background: "none",
          border: "none",
          color: t.dim,
          fontSize: 20,
          cursor: "pointer",
          lineHeight: 1
        }
      }, "×")), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "center",
          marginBottom: 16
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: t.muted,
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 6
        }
      }, "VALOR (R$)"), /*#__PURE__*/React.createElement("input", {
        autoFocus: true,
        type: "number",
        min: "0",
        step: "0.01",
        placeholder: "0,00",
        value: quickForm.amount,
        onChange: e => setQuickForm(f => ({
          ...f,
          amount: e.target.value
        })),
        style: {
          background: "none",
          border: "none",
          fontSize: 44,
          fontWeight: 700,
          color: quickForm.amount ? "#E8583A" : t.dim,
          textAlign: "center",
          width: "100%",
          fontFamily: "inherit",
          outline: "none",
          letterSpacing: -1
        }
      })), /*#__PURE__*/React.createElement("input", {
        type: "text",
        placeholder: "Descrição (ex: Mercado, Uber...)",
        value: quickForm.title,
        onChange: e => setQuickForm(f => ({
          ...f,
          title: e.target.value
        })),
        style: {
          background: t.inp,
          border: `1px solid ${t.border}`,
          borderRadius: 12,
          color: t.text,
          fontSize: 15,
          padding: "11px 14px",
          width: "100%",
          fontFamily: "inherit",
          outline: "none",
          marginBottom: 12
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 7,
          overflowX: "auto",
          paddingBottom: 4,
          marginBottom: 12,
          scrollbarWidth: "none"
        }
      }, cats.map(c => /*#__PURE__*/React.createElement("button", {
        key: c.name,
        onClick: () => setQuickForm(f => ({
          ...f,
          category: c.name
        })),
        style: {
          flexShrink: 0,
          padding: "6px 12px",
          borderRadius: 20,
          border: `1px solid ${quickForm.category === c.name ? c.color : t.border}`,
          background: quickForm.category === c.name ? `${c.color}22` : "none",
          color: quickForm.category === c.name ? c.color : t.muted,
          fontSize: 13,
          cursor: "pointer",
          fontFamily: "inherit",
          fontWeight: quickForm.category === c.name ? 600 : 400,
          transition: "all .12s",
          whiteSpace: "nowrap"
        }
      }, c.emoji, " ", c.name))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 7,
          flexWrap: "wrap",
          marginBottom: 16
        }
      }, cards.map(c => /*#__PURE__*/React.createElement("button", {
        key: c.id,
        onClick: () => setQuickForm(f => ({
          ...f,
          paymentMethod: c.id
        })),
        style: {
          padding: "5px 11px",
          borderRadius: 20,
          border: `1px solid ${quickForm.paymentMethod === c.id ? c.color : t.border}`,
          background: quickForm.paymentMethod === c.id ? `${c.color}22` : "none",
          color: quickForm.paymentMethod === c.id ? c.color : t.muted,
          fontSize: 13,
          cursor: "pointer",
          fontFamily: "inherit",
          fontWeight: quickForm.paymentMethod === c.id ? 600 : 400,
          transition: "all .12s"
        }
      }, c.icon, " ", c.name))), /*#__PURE__*/React.createElement("button", {
        onClick: () => {
          const amt = parseFloat(String(quickForm.amount).replace(",", "."));
          if (!amt || amt <= 0) return;
          const title = quickForm.title.trim() || quickForm.category;
          mergeInstallments([{
            id: Date.now(),
            date: today.toISOString().slice(0, 10),
            title,
            amount: amt,
            category: quickForm.category,
            paymentMethod: quickForm.paymentMethod
          }], key);
          setQuickForm({
            title: "",
            amount: "",
            category: "Alimentação",
            paymentMethod: "pix"
          });
          setShowQuickAdd(false);
        },
        disabled: !quickForm.amount || parseFloat(String(quickForm.amount).replace(",", ".")) < 0.01,
        style: {
          width: "100%",
          background: "linear-gradient(135deg,#E8583A,#3A5F8A)",
          border: "none",
          color: "#fff",
          padding: "14px",
          borderRadius: 12,
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "inherit",
          opacity: !quickForm.amount || parseFloat(String(quickForm.amount).replace(",", ".")) < 0.01 ? 0.4 : 1,
          boxShadow: "0 4px 16px rgba(232,88,58,0.3)",
          letterSpacing: .3,
          transition: "opacity .15s"
        }
      }, "Salvar gasto ", quickForm.amount ? `· ${fmt(parseFloat(String(quickForm.amount).replace(",", ".")))}` : "", " ✓")), /*#__PURE__*/React.createElement("div", {
        style: {
          ...C({
            padding: "22px 22px 18px",
            marginBottom: 16
          })
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 16
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: t.dim,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 4
        }
      }, "TOTAL GASTO"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 34,
          fontWeight: 700,
          color: overBudget ? "#ef4444" : t.text,
          letterSpacing: -1
        }
      }, fmt(total)), prevTotal > 0 && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: diff > 0 ? "#ef4444" : "#22c55e",
          marginTop: 4
        }
      }, diff > 0 ? "▲" : "▼", " ", fmt(Math.abs(diff)), " vs mês anterior")), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: t.dim,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 4
        }
      }, "ORÇAMENTO LIVRE"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 24,
          fontWeight: 600,
          color: t.mid
        }
      }, fmt(budget)))), /*#__PURE__*/React.createElement("div", {
        style: {
          background: t.inp,
          borderRadius: 99,
          height: 6,
          overflow: "hidden",
          marginBottom: 8
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          height: "100%",
          width: `${pct}%`,
          background: pctColor,
          borderRadius: 99,
          transition: "width .6s"
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: installTotal > 0 ? 14 : 0
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 14,
          color: overBudget ? "#ef4444" : t.dim
        }
      }, overBudget ? `⚠️ R$ ${(total - budget).toLocaleString("pt-BR", {
        minimumFractionDigits: 2
      })} acima do orçamento` : `${fmt(remaining)} restando`), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 14,
          color: pctColor,
          fontWeight: 600
        }
      }, pct.toFixed(0), "%")), installTotal > 0 && /*#__PURE__*/React.createElement("div", {
        onClick: () => setShowParcelas(true),
        style: {
          background: "rgba(234,179,8,0.07)",
          border: "1px solid rgba(234,179,8,0.2)",
          borderRadius: 12,
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          cursor: "pointer",
          marginBottom: 14
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 20
        }
      }, "💳"), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          color: "#eab308",
          fontWeight: 500
        }
      }, "Parcelas neste mês"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          color: "#806020"
        }
      }, installInMonth.length, " parcelado", installInMonth.length !== 1 ? "s" : "")), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 16,
          fontWeight: 700,
          color: "#eab308"
        }
      }, fmt(installTotal)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          color: "#806020"
        }
      }, "Ver todas ›"))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 6
        }
      }, [{
        label: "SALÁRIO",
        value: config.salary,
        color: "#3b82f6",
        Icon: BarChart2
      }, {
        label: "FIXAS",
        value: config.fixed,
        color: "#ef4444",
        Icon: Repeat2
      }, {
        label: "POUPANÇA",
        value: config.savings,
        color: "#22c55e",
        Icon: PiggyBank
      }].map(({
        label,
        value,
        color,
        Icon
      }) => /*#__PURE__*/React.createElement("div", {
        key: label,
        onClick: () => setShowSettings(true),
        style: {
          background: t.inp,
          borderRadius: 12,
          border: `1px solid ${t.border}`,
          padding: 2,
          cursor: "pointer"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
          borderRadius: 10,
          border: `1px solid ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"}`,
          padding: "12px 10px",
          height: 106,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        size: 16,
        color: color,
        strokeWidth: 2
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: t.dim,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 4,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }
      }, label), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 700,
          color: t.text,
          lineHeight: 1.2
        }
      }, fmt(value))))))), /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 6,
          background: t.inp,
          borderRadius: 12,
          border: `1px solid ${remaining >= 0 ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
          padding: 2
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
          borderRadius: 10,
          border: `1px solid ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"}`,
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8
        }
      }, /*#__PURE__*/React.createElement(TrendingUp, {
        size: 15,
        color: remaining >= 0 ? "#22c55e" : "#ef4444",
        strokeWidth: 2
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          color: t.dim,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          fontWeight: 600
        }
      }, "DISPONÍVEL")), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 700,
          color: remaining >= 0 ? "#22c55e" : "#ef4444"
        }
      }, fmt(remaining))))), byCategory.length > 0 && /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 14,
          marginBottom: 16
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: C({
          padding: "18px"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: t.dim,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 18
        }
      }, "GASTOS POR CATEGORIA"), byCategory.map(cat => {
        const cfg = catMap[cat.name] || {
          emoji: "📦",
          color: "#94a3b8"
        };
        const pct2 = total > 0 ? cat.value / total * 100 : 0;
        return /*#__PURE__*/React.createElement("div", {
          key: cat.name,
          style: {
            marginBottom: 14
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 6
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8
          }
        }, /*#__PURE__*/React.createElement(CatIcon, {
          cat: cat.name,
          size: 28,
          catMap: catMap
        }), /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 15,
            color: t.mid,
            fontWeight: 500
          }
        }, cat.name)), /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 10
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 15,
            fontWeight: 700,
            color: t.text
          }
        }, fmt(cat.value)), /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 13,
            color: t.dim,
            minWidth: 30,
            textAlign: "right"
          }
        }, pct2.toFixed(0), "%"))), /*#__PURE__*/React.createElement("div", {
          style: {
            background: t.inp,
            borderRadius: 99,
            height: 8,
            overflow: "hidden"
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            height: "100%",
            width: `${pct2}%`,
            background: `linear-gradient(90deg,${cfg.color}cc,${cfg.color})`,
            borderRadius: 99,
            transition: "width .6s ease"
          }
        })));
      })), /*#__PURE__*/React.createElement("div", {
        style: C({
          padding: "18px"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: t.dim,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 14
        }
      }, "EVOLUÇÃO DOS GASTOS"), /*#__PURE__*/React.createElement(ResponsiveContainer, {
        width: "100%",
        height: 200
      }, /*#__PURE__*/React.createElement(LineChart, {
        data: monthlyData,
        margin: {
          top: 16,
          right: 8,
          left: 8,
          bottom: 0
        }
      }, /*#__PURE__*/React.createElement(CartesianGrid, {
        strokeDasharray: "3 3",
        stroke: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)",
        vertical: false
      }), /*#__PURE__*/React.createElement(XAxis, {
        dataKey: "fullLabel",
        tick: {
          fill: t.muted,
          fontSize: 11,
          fontWeight: 500
        },
        axisLine: false,
        tickLine: false
      }), /*#__PURE__*/React.createElement(YAxis, {
        domain: [chartMin, chartMax],
        tick: {
          fill: t.dim,
          fontSize: 10
        },
        axisLine: false,
        tickLine: false,
        tickFormatter: v => fmtShort(v),
        width: 48
      }), /*#__PURE__*/React.createElement(Tooltip, {
        formatter: (v, _, p) => [fmt(v), p.payload && p.payload.fullLabel || ""],
        contentStyle: {
          background: t.card,
          border: `1px solid #E8583A44`,
          borderRadius: 12,
          color: t.text,
          fontSize: 13,
          padding: "10px 14px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)"
        },
        labelStyle: {
          display: "none"
        },
        cursor: {
          stroke: "#E8583A",
          strokeWidth: 1,
          strokeDasharray: "4 4"
        }
      }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
        id: "lineGrad",
        x1: "0",
        y1: "0",
        x2: "0",
        y2: "1"
      }, /*#__PURE__*/React.createElement("stop", {
        offset: "5%",
        stopColor: "#E8583A",
        stopOpacity: 0.25
      }), /*#__PURE__*/React.createElement("stop", {
        offset: "95%",
        stopColor: "#E8583A",
        stopOpacity: 0
      }))), /*#__PURE__*/React.createElement(Line, {
        type: "monotone",
        dataKey: "value",
        stroke: "#E8583A",
        strokeWidth: 2.5,
        dot: props => {
          const {
            cx,
            cy,
            payload
          } = props;
          if (payload.isCurrent) return /*#__PURE__*/React.createElement("circle", {
            key: cx,
            cx: cx,
            cy: cy,
            r: 6,
            fill: "#E8583A",
            stroke: "#fff",
            strokeWidth: 2
          });
          return /*#__PURE__*/React.createElement("circle", {
            key: cx,
            cx: cx,
            cy: cy,
            r: 4,
            fill: "#E8583A",
            stroke: "#E8583A",
            strokeWidth: 1
          });
        },
        activeDot: {
          r: 7,
          fill: "#E8583A",
          stroke: "#fff",
          strokeWidth: 2
        }
      }))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 12,
          padding: "10px 12px",
          background: t.inp,
          borderRadius: 10
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: t.dim,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 2
        }
      }, "Este mês"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 16,
          fontWeight: 700,
          color: t.text
        }
      }, fmt(total))), prevTotal > 0 && /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: t.dim,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 2
        }
      }, "Variação"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 16,
          fontWeight: 700,
          color: diff > 0 ? "#ef4444" : "#22c55e"
        }
      }, diff > 0 ? "▲" : "▼", " ", Math.abs(diff / prevTotal * 100).toFixed(1), "%")), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: t.dim,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 2
        }
      }, "Média"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 16,
          fontWeight: 700,
          color: t.mid
        }
      }, fmt(Object.values(HIST_TOTALS).reduce((s, v) => s + v, 0) / Object.values(HIST_TOTALS).length)))))), /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: 16
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: t.dim,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 10
        }
      }, "INSIGHTS DO MÊS"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10
        }
      }, byCategory[0] && /*#__PURE__*/React.createElement("div", {
        style: C({
          padding: "14px 16px"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement(CatIcon, {
        cat: byCategory[0] && byCategory[0].name,
        size: 38,
        catMap: catMap
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: t.muted,
          marginBottom: 2
        }
      }, "Maior gasto"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 700,
          color: t.text
        }
      }, byCategory[0].name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 16,
          fontWeight: 700,
          color: "#E8583A",
          marginTop: 2
        }
      }, fmt(byCategory[0].value)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: t.dim,
          marginTop: 2
        }
      }, (byCategory[0].value / total * 100).toFixed(0), "% do total")), /*#__PURE__*/React.createElement("div", {
        style: C({
          padding: "14px 16px"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 38,
          height: 38,
          borderRadius: 12,
          background: diff > 0 ? "rgba(239,68,68,0.15)" : "rgba(34,197,94,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10
        }
      }, diff > 0 ? /*#__PURE__*/React.createElement(TrendingUp, {
        size: 18,
        color: "#ef4444"
      }) : /*#__PURE__*/React.createElement(TrendingDown, {
        size: 18,
        color: "#22c55e"
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: t.muted,
          marginBottom: 2
        }
      }, "Em relação a ", MONTHS_SHORT[curM === 0 ? 11 : curM - 1]), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 16,
          fontWeight: 700,
          color: diff > 0 ? "#ef4444" : "#22c55e",
          marginTop: 2
        }
      }, prevTotal > 0 ? fmt(Math.abs(diff)) : "—"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: t.dim,
          marginTop: 2
        }
      }, prevTotal > 0 ? diff > 0 ? "a mais" : "a menos" : "sem dados anteriores")), /*#__PURE__*/React.createElement("div", {
        style: C({
          padding: "14px 16px"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 38,
          height: 38,
          borderRadius: 12,
          background: "rgba(59,130,246,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement(Shield, {
        size: 18,
        color: "#3b82f6"
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: t.muted,
          marginBottom: 2
        }
      }, "Orçamento diário"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 16,
          fontWeight: 700,
          color: t.text,
          marginTop: 2
        }
      }, fmt(budget / 30)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: t.dim,
          marginTop: 2
        }
      }, "Meta por dia")), /*#__PURE__*/React.createElement("div", {
        style: C({
          padding: "14px 16px"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 38,
          height: 38,
          borderRadius: 12,
          background: "rgba(168,85,247,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement(Target, {
        size: 18,
        color: "#a855f7"
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: t.muted,
          marginBottom: 2
        }
      }, "Meta mensal"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 16,
          fontWeight: 700,
          color: "#a855f7",
          marginTop: 2
        }
      }, fmt(config.savings)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: t.dim,
          marginTop: 2
        }
      }, "Poupança atual"), /*#__PURE__*/React.createElement("div", {
        style: {
          background: t.inp,
          borderRadius: 99,
          height: 4,
          overflow: "hidden",
          marginTop: 6
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          height: "100%",
          width: `${Math.min(config.savings / config.salary * 100, 100)}%`,
          background: "#a855f7",
          borderRadius: 99
        }
      }))))), expenses.length > 0 && /*#__PURE__*/React.createElement("div", {
        style: C()
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          padding: "14px 18px",
          borderBottom: `1px solid ${t.borderAlt}`,
          display: "flex",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 15,
          color: t.dim,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 600
        }
      }, "TRANSAÇÕES RECENTES")), expenses.slice(0, 3).map(e => /*#__PURE__*/React.createElement(TxRowInner, {
        key: e.id,
        e: e,
        showRemove: false
      })), showRecentTx && expenses.slice(3, 6).map(e => /*#__PURE__*/React.createElement(TxRowInner, {
        key: e.id,
        e: e,
        showRemove: false
      })), expenses.length > 3 && /*#__PURE__*/React.createElement("div", {
        onClick: () => setShowRecentTx(v => !v),
        style: {
          padding: "13px 18px",
          textAlign: "center",
          cursor: "pointer",
          borderTop: `1px solid ${t.borderAlt}`
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          color: t.muted,
          fontWeight: 500
        }
      }, showRecentTx ? "Mostrar menos ▲" : `Ver mais ${expenses.length - 3} gastos ▼`)), (showRecentTx || expenses.length <= 3) && /*#__PURE__*/React.createElement("div", {
        onClick: () => setPage("transacoes"),
        style: {
          padding: "13px 18px",
          display: "flex",
          justifyContent: "flex-end",
          borderTop: `1px solid ${t.borderAlt}`,
          cursor: "pointer"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          color: "#E8583A",
          fontWeight: 500
        }
      }, "Ver todas as ", expenses.length, " transações →"))));
    }
    if (page === "gastos") {
      const biggest = expenses.reduce((m, e) => e.amount > m.amount ? e : m, {
        amount: 0,
        title: "—"
      });
      const topCat = byCategory[0];
      const daysInMonth = new Date(curY, curM + 1, 0).getDate();
      const avgPerDay = total / daysInMonth;
      const weeklyData = [1, 2, 3, 4].map(w => ({
        label: `Sem ${w}`,
        valor: expenses.filter(e => {
          const d = +e.date.split("-")[2];
          return d >= (w - 1) * 7 + 1 && d <= w * 7;
        }).reduce((s, e) => s + e.amount, 0)
      }));
      const visExp = expenses.filter(e => {
        if (filterCat && e.category !== filterCat) return false;
        if (filterCard && e.paymentMethod !== filterCard) return false;
        return true;
      });
      return /*#__PURE__*/React.createElement("div", {
        style: px
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 4
        }
      }, "Gastos"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          color: t.muted,
          marginBottom: 24
        }
      }, "Acompanhe e entenda seus gastos"), renderMonthNav(true), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr",
          gap: 10,
          marginBottom: 16
        }
      }, /*#__PURE__*/React.createElement(StatCard, {
        t: t,
        label: "Gasto Total",
        value: fmt(total),
        sub: prevTotal > 0 ? `${diff > 0 ? "▲" : "▼"} ${(Math.abs(diff) / prevTotal * 100).toFixed(1)}% vs. ${MONTHS_SHORT[curM === 0 ? 11 : curM - 1]}` : "—",
        color: overBudget ? "#ef4444" : t.text,
        icon: "💰"
      }), /*#__PURE__*/React.createElement(StatCard, {
        t: t,
        label: "Média por dia",
        value: fmt(avgPerDay),
        sub: `${daysInMonth} dias neste mês`,
        icon: "📅"
      }), /*#__PURE__*/React.createElement(StatCard, {
        t: t,
        label: "Maior gasto",
        value: fmt(biggest.amount),
        sub: biggest.title,
        icon: "📌"
      }), /*#__PURE__*/React.createElement(StatCard, {
        t: t,
        label: "Categoria lider",
        value: topCat && topCat.name || "—",
        sub: topCat ? `${(topCat.value / total * 100).toFixed(0)}% do total` : "—",
        color: topCat ? catMap[topCat.name] && catMap[topCat.name].color : t.text,
        icon: "🏆"
      })), diff > 0 && prevTotal > 0 && /*#__PURE__*/React.createElement("div", {
        style: {
          ...C({
            padding: "14px 18px",
            marginBottom: 14
          }),
          display: "flex",
          alignItems: "center",
          gap: 12,
          border: "1px solid rgba(232,88,58,0.3)",
          background: "rgba(232,88,58,0.05)"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 20
        }
      }, "📈"), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          fontSize: 15,
          color: t.mid
        }
      }, "Você gastou ", /*#__PURE__*/React.createElement("strong", {
        style: {
          color: "#E8583A"
        }
      }, (diff / prevTotal * 100).toFixed(0), "% mais"), " que no mês anterior."), /*#__PURE__*/React.createElement("button", {
        onClick: () => setShowSettings(true),
        style: {
          background: "none",
          border: "1px solid #E8583A",
          color: "#E8583A",
          padding: "6px 14px",
          borderRadius: 8,
          fontSize: 14,
          cursor: "pointer",
          fontFamily: "inherit",
          whiteSpace: "nowrap"
        }
      }, "Definir limite")), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 8,
          marginBottom: 16,
          flexWrap: "wrap"
        }
      }, cats.map(c => /*#__PURE__*/React.createElement("button", {
        key: c.name,
        onClick: () => setFilterCat(filterCat === c.name ? null : c.name),
        style: {
          padding: "7px 14px",
          borderRadius: 20,
          border: `1px solid ${filterCat === c.name ? c.color : t.border}`,
          background: filterCat === c.name ? `${c.color}18` : "none",
          color: filterCat === c.name ? c.color : t.muted,
          fontSize: 14,
          cursor: "pointer",
          fontFamily: "inherit"
        }
      }, c.emoji, " ", c.name))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          marginBottom: 16
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: C({
          padding: "18px"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 600,
          color: t.mid,
          marginBottom: 14
        }
      }, "Gastos por categoria"), byCategory.map(c => {
        const cfg = catMap[c.name] || {
          color: "#94a3b8",
          emoji: "📦"
        };
        return /*#__PURE__*/React.createElement("div", {
          key: c.name,
          style: {
            marginBottom: 10
          },
          onClick: () => setFilterCat(filterCat === c.name ? null : c.name)
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 4
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 14,
            color: t.mid
          }
        }, c.name), /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            gap: 8
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 14,
            fontWeight: 600
          }
        }, fmt(c.value)), /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 15,
            color: t.dim
          }
        }, (c.value / total * 100).toFixed(0), "%"))), /*#__PURE__*/React.createElement("div", {
          style: {
            background: t.inp,
            borderRadius: 99,
            height: 5,
            overflow: "hidden"
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            height: "100%",
            width: `${c.value / total * 100}%`,
            background: cfg.color,
            borderRadius: 99,
            transition: "width .5s"
          }
        })));
      })), /*#__PURE__*/React.createElement("div", {
        style: C({
          padding: "18px"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 600,
          color: t.mid,
          marginBottom: 14
        }
      }, "Gastos por semana"), /*#__PURE__*/React.createElement(ResponsiveContainer, {
        width: "100%",
        height: 200
      }, /*#__PURE__*/React.createElement(BarChart, {
        data: weeklyData
      }, /*#__PURE__*/React.createElement(XAxis, {
        dataKey: "label",
        tick: {
          fill: t.dim,
          fontSize: 9
        },
        axisLine: false,
        tickLine: false
      }), /*#__PURE__*/React.createElement(YAxis, {
        hide: true
      }), /*#__PURE__*/React.createElement(Tooltip, {
        formatter: v => [fmt(v), ""],
        contentStyle: {
          background: t.card,
          border: `1px solid ${t.border}`,
          borderRadius: 8,
          color: t.text,
          fontSize: 12
        }
      }), /*#__PURE__*/React.createElement(Bar, {
        dataKey: "valor",
        fill: "#E8583A",
        radius: [6, 6, 0, 0]
      }))))), /*#__PURE__*/React.createElement("div", {
        style: C()
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          padding: "14px 18px",
          borderBottom: `1px solid ${t.borderAlt}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 15,
          color: t.dim,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 600
        }
      }, visExp.length, " TRANSAÇÕES · ", fmt(visExp.reduce((s, e) => s + e.amount, 0))), filterCat && /*#__PURE__*/React.createElement("button", {
        onClick: () => setFilterCat(null),
        style: {
          background: "none",
          border: "none",
          color: t.muted,
          fontSize: 14,
          cursor: "pointer",
          fontFamily: "inherit"
        }
      }, "Limpar ×")), visExp.map(e => /*#__PURE__*/React.createElement(TxRowInner, {
        key: e.id,
        e: e,
        showRemove: true
      }))));
    }
    if (page === "cartoes") {
      const totalCards = byCard.reduce((s, c) => s + c.total, 0);
      const avgCard = byCard.length > 0 ? totalCards / byCard.length : 0;
      const biggestCard = byCard.reduce((m, c) => c.total > m.total ? c : m, {
        total: 0,
        name: "—"
      });
      return /*#__PURE__*/React.createElement("div", {
        style: px
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 4
        }
      }, "Cartões"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          color: t.muted,
          marginBottom: 24
        }
      }, "Acompanhe seus gastos por cartão"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr",
          gap: 10,
          marginBottom: 16
        }
      }, /*#__PURE__*/React.createElement(StatCard, {
        t: t,
        label: "Gasto total",
        value: fmt(totalCards),
        sub: `${byCard.reduce((s, c) => s + c.count, 0)} transações`,
        icon: "💳"
      }), /*#__PURE__*/React.createElement(StatCard, {
        t: t,
        label: "Média por cartão",
        value: fmt(avgCard),
        sub: "Este mês",
        icon: "📊"
      }), /*#__PURE__*/React.createElement(StatCard, {
        t: t,
        label: "Maior gasto",
        value: fmt(biggestCard.total),
        sub: biggestCard.name,
        color: "#E8583A",
        icon: "🏆"
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr",
          gap: 10,
          marginBottom: 10
        }
      }, byCard.map(c => /*#__PURE__*/React.createElement("div", {
        key: c.id,
        onClick: () => setFilterCard(filterCard === c.id ? null : c.id),
        style: {
          borderRadius: 16,
          padding: "16px",
          cursor: "pointer",
          background: `linear-gradient(135deg,${c.color}cc,${c.color}88)`,
          border: `1px solid ${c.color}44`
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 12
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 22
        }
      }, c.icon), /*#__PURE__*/React.createElement("div", {
        style: {
          width: 8,
          height: 8,
          borderRadius: 99,
          background: "rgba(255,255,255,0.5)"
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 600,
          color: "#fff",
          marginBottom: 4
        }
      }, c.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 18,
          fontWeight: 700,
          color: "#fff"
        }
      }, fmt(c.total)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: "rgba(255,255,255,0.7)",
          marginTop: 4
        }
      }, (c.total / totalCards * 100).toFixed(0), "% · ", c.count, " transações"), /*#__PURE__*/React.createElement("div", {
        style: {
          background: "rgba(255,255,255,0.2)",
          borderRadius: 99,
          height: 3,
          marginTop: 10,
          overflow: "hidden"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          height: "100%",
          width: `${c.total / totalCards * 100}%`,
          background: "rgba(255,255,255,0.8)",
          borderRadius: 99
        }
      })))), /*#__PURE__*/React.createElement("div", {
        onClick: () => setShowCardPicker(v => !v),
        style: {
          borderRadius: 16,
          padding: "16px",
          cursor: "pointer",
          background: showCardPicker ? "rgba(99,102,241,0.12)" : t.card,
          border: `1px dashed ${showCardPicker ? "#6366f1" : t.border}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          minHeight: 120
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 36,
          height: 36,
          borderRadius: 99,
          background: showCardPicker ? "#6366f1" : t.inp,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          color: showCardPicker ? "#fff" : t.dim
        }
      }, showCardPicker ? "×" : "+"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 15,
          color: showCardPicker ? "#6366f1" : t.dim,
          fontWeight: 500
        }
      }, "Adicionar banco"))), showCardPicker && /*#__PURE__*/React.createElement("div", {
        style: {
          ...C({
            padding: "16px",
            marginBottom: 10
          }),
          border: "1px solid rgba(99,102,241,0.3)"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: "#6366f1",
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 12
        }
      }, "Selecione os bancos que você usa"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr",
          gap: 7
        }
      }, allCardOptions.filter(c => !PINNED.includes(c.id)).map(c => {
        const active = activeCardIds.includes(c.id);
        return /*#__PURE__*/React.createElement("div", {
          key: c.id,
          onClick: () => setActiveCardIds(prev => active ? prev.filter(id => id !== c.id) : [...prev, c.id]),
          style: {
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "8px 10px",
            borderRadius: 10,
            cursor: "pointer",
            background: active ? `${c.color}22` : t.inp,
            border: `1px solid ${active ? c.color : t.border}`
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 13
          }
        }, c.icon), /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 15,
            flex: 1,
            color: active ? t.text : t.muted,
            fontWeight: active ? 600 : 400
          }
        }, c.name), active && /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 15,
            color: c.color
          }
        }, "✓"));
      }))), byCard.length > 0 && /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          marginBottom: 16
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: C({
          padding: "18px"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 600,
          marginBottom: 14
        }
      }, "Gastos por cartão"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 14,
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
        width: 120,
        height: 120
      }, /*#__PURE__*/React.createElement(PieChart, null, /*#__PURE__*/React.createElement(Pie, {
        data: byCard,
        dataKey: "total",
        cx: "50%",
        cy: "50%",
        innerRadius: 30,
        outerRadius: 55,
        paddingAngle: 2
      }, byCard.map(c => /*#__PURE__*/React.createElement(Cell, {
        key: c.id,
        fill: c.color
      }))))), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, byCard.map(c => /*#__PURE__*/React.createElement("div", {
        key: c.id,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 5
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 6,
          height: 6,
          borderRadius: 99,
          background: c.color,
          flexShrink: 0
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 15,
          color: t.muted,
          flex: 1
        }
      }, c.icon, " ", c.name), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 15,
          fontWeight: 600
        }
      }, (c.total / totalCards * 100).toFixed(0), "%")))))), /*#__PURE__*/React.createElement("div", {
        style: C({
          padding: "18px"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 600,
          marginBottom: 14
        }
      }, "💡 Insights"), byCard[0] && /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
          marginBottom: 12,
          padding: "10px",
          background: t.inp,
          borderRadius: 10
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 18
        }
      }, byCard[0].icon), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: t.mid
        }
      }, /*#__PURE__*/React.createElement("strong", {
        style: {
          color: byCard[0].color
        }
      }, byCard[0].name), " é seu cartão mais utilizado este mês.")), byCard.find(c => c.id === "pix") && /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
          padding: "10px",
          background: t.inp,
          borderRadius: 10
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 18
        }
      }, "🔑"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: t.mid
        }
      }, "Você fez ", /*#__PURE__*/React.createElement("strong", {
        style: {
          color: "#32BCAD"
        }
      }, byCard.find(c => c.id === "pix").count, " transferências"), " via Pix neste mês.")))), /*#__PURE__*/React.createElement("div", {
        style: C()
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          padding: "14px 18px",
          borderBottom: `1px solid ${t.borderAlt}`
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 15,
          color: t.dim,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 600
        }
      }, "LANÇAMENTOS POR CARTÃO")), byCard.map(c => {
        const cardExp = expenses.filter(e => e.paymentMethod === c.id);
        const isFiltered = filterCard === c.id;
        return /*#__PURE__*/React.createElement("div", {
          key: c.id
        }, /*#__PURE__*/React.createElement("div", {
          onClick: () => setFilterCard(isFiltered ? null : c.id),
          style: {
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 18px",
            cursor: "pointer",
            background: isFiltered ? `${c.color}10` : t.card,
            borderBottom: `1px solid ${t.borderAlt}`
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 18
          }
        }, c.icon), /*#__PURE__*/React.createElement("div", {
          style: {
            flex: 1
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 15,
            fontWeight: 600,
            color: c.color
          }
        }, c.name), /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 15,
            color: t.muted,
            marginLeft: 8
          }
        }, c.count, " transações")), /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 14,
            fontWeight: 700
          }
        }, fmt(c.total)), /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 14,
            color: t.dim
          }
        }, isFiltered ? "▲" : "▼")), isFiltered && cardExp.map(e => /*#__PURE__*/React.createElement(TxRowInner, {
          key: e.id,
          e: e,
          showRemove: true
        })));
      })));
    }
    if (page === "transacoes") {
      const sorted = [...expenses].sort((a, b) => b.date.localeCompare(a.date));
      const visExp = sorted.filter(e => {
        if (filterCat && e.category !== filterCat) return false;
        if (filterCard && e.paymentMethod !== filterCard) return false;
        return true;
      });
      const daysInMonth = new Date(curY, curM + 1, 0).getDate();
      const daylyData = Array.from({
        length: daysInMonth
      }, (_, i) => {
        const d = String(i + 1).padStart(2, "0");
        const saidas = expenses.filter(e => e.date === `${curY}-${String(curM + 1).padStart(2, "0")}-${d}`).reduce((s, e) => s + e.amount, 0);
        return {
          day: i + 1,
          saidas: Math.round(saidas)
        };
      }).filter(d => d.saidas > 0);
      return /*#__PURE__*/React.createElement("div", {
        style: px
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 28,
          fontWeight: 700
        }
      }, "Transações"), /*#__PURE__*/React.createElement("button", {
        onClick: () => setPage("adicionar"),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 18px",
          borderRadius: 12,
          background: "#E8583A",
          border: "none",
          color: "#fff",
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "inherit"
        }
      }, "+ Nova")), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          color: t.muted,
          marginBottom: 24
        }
      }, "Todas as movimentações financeiras"), renderMonthNav(true), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr",
          gap: 10,
          marginBottom: 16
        }
      }, /*#__PURE__*/React.createElement(StatCard, {
        t: t,
        label: "Total de saídas",
        value: fmt(total),
        sub: `${expenses.length} saídas`,
        color: "#ef4444",
        icon: "↓"
      }), /*#__PURE__*/React.createElement(StatCard, {
        t: t,
        label: "Saldo do período",
        value: fmt(-total),
        sub: total > 0 ? "Déficit" : "Positivo",
        color: "#ef4444",
        icon: "↔️"
      }), /*#__PURE__*/React.createElement(StatCard, {
        t: t,
        label: "Media diaria",
        value: fmt(total / 30),
        sub: "30 dias no mes",
        icon: "📊"
      }), /*#__PURE__*/React.createElement(StatCard, {
        t: t,
        label: "Maior transação",
        value: fmt(expenses.reduce((m, e) => e.amount > m ? e.amount : m, 0)),
        sub: "Este mês",
        icon: "📌"
      })), daylyData.length > 0 && /*#__PURE__*/React.createElement("div", {
        style: {
          ...C({
            padding: "18px",
            marginBottom: 16
          })
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 600,
          marginBottom: 14
        }
      }, "Gastos por dia"), /*#__PURE__*/React.createElement(ResponsiveContainer, {
        width: "100%",
        height: 140
      }, /*#__PURE__*/React.createElement(BarChart, {
        data: daylyData
      }, /*#__PURE__*/React.createElement(XAxis, {
        dataKey: "day",
        tick: {
          fill: t.dim,
          fontSize: 9
        },
        axisLine: false,
        tickLine: false
      }), /*#__PURE__*/React.createElement(YAxis, {
        hide: true
      }), /*#__PURE__*/React.createElement(Tooltip, {
        formatter: v => [fmt(v), "Saídas"],
        contentStyle: {
          background: t.card,
          border: `1px solid ${t.border}`,
          borderRadius: 8,
          color: t.text,
          fontSize: 12
        }
      }), /*#__PURE__*/React.createElement(Bar, {
        dataKey: "saidas",
        fill: "#E8583A",
        radius: [4, 4, 0, 0]
      })))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 8,
          marginBottom: 14,
          flexWrap: "wrap"
        }
      }, [["Todos", null], ["Pix", "pix"], ["Cartão", "nubank"], ["Parcelados", "inst"]].map(([label, fc]) => /*#__PURE__*/React.createElement("button", {
        key: label,
        onClick: () => setFilterCard(fc),
        style: {
          padding: "7px 14px",
          borderRadius: 20,
          border: `1px solid ${filterCard === fc ? "#E8583A" : t.border}`,
          background: filterCard === fc ? "rgba(232,88,58,0.1)" : "none",
          color: filterCard === fc ? "#E8583A" : t.muted,
          fontSize: 14,
          cursor: "pointer",
          fontFamily: "inherit"
        }
      }, label))), /*#__PURE__*/React.createElement("div", {
        style: C()
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          padding: "14px 18px",
          borderBottom: `1px solid ${t.borderAlt}`,
          display: "flex",
          justifyContent: "space-between"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 15,
          color: t.dim,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 600
        }
      }, visExp.length, " TRANSAÇÕES"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 15,
          color: t.muted
        }
      }, "Mais recente")), visExp.map(e => /*#__PURE__*/React.createElement(TxRowInner, {
        key: e.id,
        e: e,
        showRemove: true
      })), visExp.length === 0 && /*#__PURE__*/React.createElement("div", {
        style: {
          padding: "40px",
          textAlign: "center",
          color: t.dim
        }
      }, "Nenhuma transação encontrada")));
    }
    if (page === "metas") {
      const totalMeta = goals.reduce((s, g) => s + g.target, 0);
      const totalSaved = goals.reduce((s, g) => s + g.saved, 0);
      return /*#__PURE__*/React.createElement("div", {
        style: px
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 28,
          fontWeight: 700
        }
      }, "Metas"), /*#__PURE__*/React.createElement("button", {
        onClick: () => setShowNewGoal(true),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 18px",
          borderRadius: 12,
          background: "rgba(168,85,247,0.1)",
          border: "1px solid #a855f7",
          color: "#a855f7",
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "inherit"
        }
      }, "+ Nova meta")), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          color: t.muted,
          marginBottom: 24
        }
      }, "Sonhos que você planeja, conquistas que você alcança."), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr",
          gap: 10,
          marginBottom: 20
        }
      }, /*#__PURE__*/React.createElement(StatCard, {
        t: t,
        label: "Total em metas",
        value: fmt(totalMeta),
        sub: `${goals.length} metas ativas`,
        icon: "🎯"
      }), /*#__PURE__*/React.createElement(StatCard, {
        t: t,
        label: "Total guardado",
        value: fmt(totalSaved),
        sub: `${(totalSaved / totalMeta * 100).toFixed(0)}% do total`,
        color: "#22c55e",
        icon: "📈"
      }), /*#__PURE__*/React.createElement(StatCard, {
        t: t,
        label: "Falta concluir",
        value: fmt(totalMeta - totalSaved),
        sub: `${(100 - totalSaved / totalMeta * 100).toFixed(0)}% do total`,
        color: "#eab308",
        icon: "⏳"
      }), /*#__PURE__*/React.createElement(StatCard, {
        t: t,
        label: "Conclusões",
        value: "0",
        sub: "Últimos 12 meses",
        icon: "🏆"
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 20
        }
      }, goals.map(g => {
        const pct2 = Math.min(g.saved / g.target * 100, 100);
        return /*#__PURE__*/React.createElement("div", {
          key: g.id,
          style: C({
            padding: "18px 20px"
          })
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 14
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            width: 46,
            height: 46,
            borderRadius: 12,
            background: `${g.color}22`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            flexShrink: 0
          }
        }, g.icon), /*#__PURE__*/React.createElement("div", {
          style: {
            flex: 1,
            minWidth: 0
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 4
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 14,
            fontWeight: 600,
            color: t.text
          }
        }, g.name), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 14,
            fontWeight: 700,
            color: g.color
          }
        }, fmt(g.saved), " ", /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 15,
            color: t.muted,
            fontWeight: 400
          }
        }, "de ", fmt(g.target)))), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 15,
            color: t.muted,
            marginBottom: 8
          }
        }, g.category || "Geral", g.deadline && ` · até ${new Date(g.deadline).toLocaleDateString("pt-BR")}`), /*#__PURE__*/React.createElement("div", {
          style: {
            background: t.inp,
            borderRadius: 99,
            height: 6,
            overflow: "hidden"
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            height: "100%",
            width: `${pct2}%`,
            background: g.color,
            borderRadius: 99,
            transition: "width .5s"
          }
        }))), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 15,
            fontWeight: 700,
            color: g.color,
            marginLeft: 16,
            minWidth: 36,
            textAlign: "right"
          }
        }, pct2.toFixed(0), "%")));
      })), showNewGoal && /*#__PURE__*/React.createElement("div", {
        style: C({
          padding: "18px"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 600,
          marginBottom: 14
        }
      }, "Nova meta"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
        style: lbl
      }, "Nome"), /*#__PURE__*/React.createElement("input", {
        value: goalForm.name,
        onChange: e => setGoalForm(f => ({
          ...f,
          name: e.target.value
        })),
        placeholder: "Ex: Viagem para o Japão",
        style: inp()
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
        style: lbl
      }, "Ícone"), /*#__PURE__*/React.createElement("input", {
        value: goalForm.icon,
        onChange: e => setGoalForm(f => ({
          ...f,
          icon: e.target.value
        })),
        style: inp()
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
        style: lbl
      }, "Meta total (R$)"), /*#__PURE__*/React.createElement("input", {
        value: goalForm.target,
        onChange: e => setGoalForm(f => ({
          ...f,
          target: e.target.value
        })),
        type: "number",
        style: inp()
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
        style: lbl
      }, "Já guardei (R$)"), /*#__PURE__*/React.createElement("input", {
        value: goalForm.saved,
        onChange: e => setGoalForm(f => ({
          ...f,
          saved: e.target.value
        })),
        type: "number",
        style: inp()
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
        style: lbl
      }, "Prazo (opcional)"), /*#__PURE__*/React.createElement("input", {
        value: goalForm.deadline,
        onChange: e => setGoalForm(f => ({
          ...f,
          deadline: e.target.value
        })),
        type: "date",
        style: inp()
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
        style: lbl
      }, "Categoria"), /*#__PURE__*/React.createElement("input", {
        value: goalForm.category,
        onChange: e => setGoalForm(f => ({
          ...f,
          category: e.target.value
        })),
        placeholder: "Viagem, Moradia...",
        style: inp()
      }))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => {
          if (!goalForm.name || !goalForm.target) return;
          setGoals(prev => [...prev, {
            id: Date.now(),
            name: goalForm.name,
            icon: goalForm.icon || "🎯",
            category: goalForm.category,
            target: parseFloat(goalForm.target) || 0,
            saved: parseFloat(goalForm.saved) || 0,
            deadline: goalForm.deadline || null,
            color: PALETTE[goals.length % PALETTE.length]
          }]);
          setGoalForm({
            name: "",
            target: "",
            saved: "",
            deadline: "",
            category: "",
            icon: "🎯"
          });
          setShowNewGoal(false);
        },
        style: {
          flex: 1,
          background: "#a855f7",
          border: "none",
          color: "#fff",
          padding: "11px",
          borderRadius: 10,
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "inherit"
        }
      }, "Criar meta"), /*#__PURE__*/React.createElement("button", {
        onClick: () => setShowNewGoal(false),
        style: {
          padding: "11px 18px",
          background: "none",
          border: `1px solid ${t.border}`,
          color: t.muted,
          borderRadius: 10,
          fontSize: 15,
          cursor: "pointer",
          fontFamily: "inherit"
        }
      }, "Cancelar"))));
    }
    if (page === "adicionar") {
      return /*#__PURE__*/React.createElement("div", {
        style: px
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 24
        }
      }, "Adicionar Gasto"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 14,
          maxWidth: 520
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: C({
          padding: "18px",
          overflow: "visible"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: t.dim,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 16
        }
      }, "LANÇAMENTO MANUAL"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
        style: lbl
      }, "Descrição"), /*#__PURE__*/React.createElement("input", {
        value: form.title,
        onChange: e => setForm(f => ({
          ...f,
          title: e.target.value
        })),
        placeholder: "Ex: Mercado",
        style: inp()
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
        style: lbl
      }, "Valor (R$)"), /*#__PURE__*/React.createElement("input", {
        value: form.amount,
        onChange: e => setForm(f => ({
          ...f,
          amount: e.target.value
        })),
        placeholder: "0,00",
        type: "number",
        min: "0",
        step: "0.01",
        style: inp()
      }))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginBottom: 14
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
        style: lbl
      }, "Categoria"), /*#__PURE__*/React.createElement("select", {
        value: form.category,
        onChange: e => setForm(f => ({
          ...f,
          category: e.target.value
        })),
        style: inp({
          cursor: "pointer"
        })
      }, cats.map(c => /*#__PURE__*/React.createElement("option", {
        key: c.name,
        value: c.name
      }, c.emoji, " ", c.name)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
        style: lbl
      }, "Data"), /*#__PURE__*/React.createElement("input", {
        type: "date",
        value: form.date,
        onChange: e => setForm(f => ({
          ...f,
          date: e.target.value
        })),
        style: inp()
      }))), /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: 14
        }
      }, /*#__PURE__*/React.createElement("label", {
        style: lbl
      }, "Forma de pagamento"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 7,
          flexWrap: "wrap"
        }
      }, cards.map(c => /*#__PURE__*/React.createElement("button", {
        key: c.id,
        onClick: () => setForm(f => ({
          ...f,
          paymentMethod: c.id
        })),
        style: {
          background: form.paymentMethod === c.id ? c.color : dark ? "#1a1a2e" : t.cardHov,
          border: `1px solid ${form.paymentMethod === c.id ? c.color : t.border}`,
          color: form.paymentMethod === c.id ? "#fff" : t.muted,
          padding: "6px 12px",
          borderRadius: 20,
          fontSize: 14,
          cursor: "pointer",
          fontFamily: "inherit",
          fontWeight: form.paymentMethod === c.id ? 600 : 400,
          transition: "all .15s"
        }
      }, c.icon, " ", c.name)))), /*#__PURE__*/React.createElement("div", {
        style: {
          background: t.inp,
          borderRadius: 12,
          padding: "12px 14px",
          marginBottom: 14
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          color: t.text,
          fontWeight: 500
        }
      }, "💳 Compra parcelada?"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: t.dim,
          marginTop: 2
        }
      }, "Próximas parcelas criadas automaticamente")), /*#__PURE__*/React.createElement("div", {
        onClick: () => setForm(f => ({
          ...f,
          isInstallment: !f.isInstallment
        })),
        style: {
          width: 44,
          height: 24,
          borderRadius: 99,
          background: form.isInstallment ? "#22c55e" : t.border,
          cursor: "pointer",
          position: "relative",
          transition: "background .2s",
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          top: 2,
          left: form.isInstallment ? 20 : 2,
          width: 20,
          height: 20,
          borderRadius: 99,
          background: "#fff",
          transition: "left .2s",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)"
        }
      }))), form.isInstallment && /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          marginTop: 10
        }
      }, INSTALLS.map(n => /*#__PURE__*/React.createElement("button", {
        key: n,
        onClick: () => setForm(f => ({
          ...f,
          installCount: n
        })),
        style: {
          background: form.installCount === n ? "#E8583A" : dark ? "#1a1a2e" : t.cardHov,
          border: `1px solid ${form.installCount === n ? "#E8583A" : t.border}`,
          color: form.installCount === n ? "#fff" : t.muted,
          width: 36,
          height: 32,
          borderRadius: 8,
          fontSize: 14,
          cursor: "pointer",
          fontFamily: "inherit",
          fontWeight: form.installCount === n ? 700 : 400,
          transition: "all .15s"
        }
      }, n, "x")))), /*#__PURE__*/React.createElement("div", {
        style: {
          background: t.inp,
          borderRadius: 12,
          padding: "12px 14px"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          color: t.text,
          fontWeight: 500
        }
      }, "🔒 Conta fixa?"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: t.dim,
          marginTop: 2
        }
      }, "Vai aparecer todo mês automaticamente")), /*#__PURE__*/React.createElement("div", {
        onClick: () => setForm(f => ({
          ...f,
          isFixed: !f.isFixed
        })),
        style: {
          width: 44,
          height: 24,
          borderRadius: 99,
          background: form.isFixed ? "#3b82f6" : t.border,
          cursor: "pointer",
          position: "relative",
          transition: "background .2s",
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          top: 2,
          left: form.isFixed ? 20 : 2,
          width: 20,
          height: 20,
          borderRadius: 99,
          background: "#fff",
          transition: "left .2s",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)"
        }
      })))), formErr && /*#__PURE__*/React.createElement("div", {
        style: {
          color: "#ef4444",
          fontSize: 14,
          marginBottom: 10
        }
      }, formErr), /*#__PURE__*/React.createElement("button", {
        onClick: submitForm,
        style: {
          width: "100%",
          background: "#E8583A",
          border: "none",
          color: "#fff",
          padding: "13px",
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "inherit",
          marginTop: 14
        }
      }, form.isInstallment ? `+ Adicionar (${form.installCount}x de ${form.amount ? fmt(parseFloat(String(form.amount).replace(",", "."))) : "R$ 0,00"})` : "+ Adicionar Gasto")), /*#__PURE__*/React.createElement("div", {
        style: C({
          padding: "18px"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: t.dim,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 4
        }
      }, "⚡ CLASSIFICAR COM IA"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: t.muted,
          marginBottom: 10,
          lineHeight: 1.5
        }
      }, "Digite gastos ou cole texto de qualquer fatura - classificação instantânea"), /*#__PURE__*/React.createElement("textarea", {
        value: aiText,
        onChange: e => setAiText(e.target.value),
        onKeyDown: e => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            classifyText();
          }
        },
        placeholder: "Ex: 50 mercado, 30 uber, 15 lanche...",
        rows: 4,
        style: {
          ...inp(),
          resize: "none",
          lineHeight: 1.6,
          marginBottom: 10
        }
      }), aiErr && /*#__PURE__*/React.createElement("div", {
        style: {
          color: "#ef4444",
          fontSize: 14,
          marginBottom: 8
        }
      }, aiErr), /*#__PURE__*/React.createElement("button", {
        onClick: classifyText,
        disabled: !aiText.trim(),
        style: {
          width: "100%",
          background: "#6366f1",
          border: "none",
          color: "#fff",
          padding: "11px",
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "inherit",
          opacity: !aiText.trim() ? 0.4 : 1
        }
      }, "⚡ Classificar →")), /*#__PURE__*/React.createElement("div", {
        style: C({
          padding: "18px"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: t.dim,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 8
        }
      }, "📊 IMPORTAR CSV - NUBANK"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: t.muted,
          lineHeight: 1.5,
          marginBottom: 12
        }
      }, "No app: ", /*#__PURE__*/React.createElement("strong", {
        style: {
          color: t.mid
        }
      }, "Cartão → Fatura → Exportar → CSV")), /*#__PURE__*/React.createElement("button", {
        onClick: () => fileRef.current.click(),
        style: {
          width: "100%",
          background: dark ? "#13132a" : "#f0f0ff",
          border: `1px solid ${dark ? "#22224a" : t.border}`,
          color: t.muted,
          padding: "11px",
          borderRadius: 12,
          fontSize: 15,
          cursor: "pointer",
          fontFamily: "inherit"
        }
      }, csvLoad ? "⏳ Processando..." : "📂 Selecionar CSV"), /*#__PURE__*/React.createElement("input", {
        ref: fileRef,
        type: "file",
        accept: ".csv",
        style: {
          display: "none"
        },
        onChange: e => handleCSV(e.target.files[0])
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          ...C({
            padding: "18px"
          }),
          border: "1px solid rgba(99,102,241,0.3)",
          background: dark ? "rgba(99,102,241,0.04)" : "rgba(99,102,241,0.02)"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 4
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 32,
          height: 32,
          borderRadius: 9,
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          flexShrink: 0
        }
      }, "⚡"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: "#818cf8",
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 700
        }
      }, "SINCRONIZAR COM MAKE"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: t.muted
        }
      }, "Importa do Google Sheets automaticamente"))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          margin: "12px 0",
          padding: "8px 12px",
          background: t.inp,
          borderRadius: 10,
          border: `1px solid ${makeWebhookUrl ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.06)"}`
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 8,
          height: 8,
          borderRadius: 99,
          background: makeWebhookUrl ? "#22c55e" : "#94a3b8",
          flexShrink: 0
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          color: makeWebhookUrl ? "#22c55e" : t.dim
        }
      }, makeWebhookUrl ? "✓ Webhook configurado" : "Webhook não configurado"), makeWebhookUrl && /*#__PURE__*/React.createElement("button", {
        onClick: () => setMakeWebhookUrl(""),
        style: {
          marginLeft: "auto",
          background: "none",
          border: "none",
          color: t.dim,
          fontSize: 12,
          cursor: "pointer",
          fontFamily: "inherit"
        }
      }, "Remover")), !makeWebhookUrl && /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: 12
        }
      }, /*#__PURE__*/React.createElement("label", {
        style: {
          ...lbl,
          marginBottom: 6
        }
      }, "URL do Webhook (Make)"), /*#__PURE__*/React.createElement("input", {
        placeholder: "https://hook.eu1.make.com/xxxxxxxx",
        style: inp({
          fontSize: 13
        }),
        onChange: e => {
          const v = e.target.value.trim();
          if (v.startsWith("https://hook")) {
            setMakeWebhookUrl(v);
            setSyncMsg("✓ Webhook salvo!");
            setTimeout(() => setSyncMsg(""), 3000);
          }
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: t.dim,
          marginTop: 6
        }
      }, "Cole a URL do seu cenário Make aqui")), syncPreview && syncPreview.length > 0 && /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: 12
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: "#818cf8",
          fontWeight: 600,
          marginBottom: 8
        }
      }, syncPreview.length, " transações encontradas - confirme para importar:"), /*#__PURE__*/React.createElement("div", {
        style: {
          maxHeight: 220,
          overflowY: "auto",
          borderRadius: 10,
          border: `1px solid ${t.border}`
        }
      }, syncPreview.map((e, i) => /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 12px",
          borderBottom: i < syncPreview.length - 1 ? `1px solid ${t.borderAlt}` : "none"
        }
      }, /*#__PURE__*/React.createElement(CatIcon, {
        cat: e.category,
        size: 32,
        catMap: catMap
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: t.text,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }
      }, e.title), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: t.muted
        }
      }, e.category, " · ", fmtDate(e.date))), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 700,
          color: t.text,
          flexShrink: 0
        }
      }, fmt(e.amount))))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 8,
          marginTop: 10
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => {
          mergeInstallments(syncPreview.map((e, i) => ({
            ...e,
            id: Date.now() + i
          })), key);
          setSyncPreview(null);
          setSyncMsg(`✓ ${syncPreview.length} transações importadas!`);
          setTimeout(() => setSyncMsg(""), 4000);
        },
        style: {
          flex: 1,
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
          border: "none",
          color: "#fff",
          padding: "11px",
          borderRadius: 10,
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "inherit"
        }
      }, "✓ Confirmar importação"), /*#__PURE__*/React.createElement("button", {
        onClick: () => setSyncPreview(null),
        style: {
          padding: "11px 16px",
          background: "none",
          border: `1px solid ${t.border}`,
          color: t.muted,
          borderRadius: 10,
          fontSize: 14,
          cursor: "pointer",
          fontFamily: "inherit"
        }
      }, "Cancelar"))), syncMsg && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: "#22c55e",
          marginBottom: 10,
          fontWeight: 500
        }
      }, syncMsg), /*#__PURE__*/React.createElement("button", {
        onClick: async () => {
          if (!makeWebhookUrl) {
            setSyncMsg("⚠️ Configure o webhook primeiro.");
            setTimeout(() => setSyncMsg(""), 3000);
            return;
          }
          setSyncLoading(true);
          setSyncMsg("");
          try {
            const res = await fetch(makeWebhookUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                action: "get_pending",
                month: key
              })
            });
            const data = await res.json();
            // Espera array: [{date, title, amount, bank, type}]
            const rows = Array.isArray(data) ? data : data.rows || data.transactions || [];
            if (!rows.length) {
              setSyncMsg("✓ Nenhuma transação nova no Sheets.");
              setSyncLoading(false);
              return;
            }
            const parsed = rows.map(r => ({
              date: r.date || r.data || today.toISOString().slice(0, 10),
              title: r.title || r.comerciante || r.merchant || "Importado",
              amount: parseFloat(String(r.amount || r.valor || 0).replace(",", ".")),
              category: classifyLocal(r.title || r.comerciante || r.merchant || ""),
              paymentMethod: (() => {
                const b = (r.bank || r.banco || "").toLowerCase();
                if (b.includes("santander")) return "santander";
                if (b.includes("nubank")) return "nubank";
                if (b.includes("inter")) return "inter";
                if (b.includes("itau") || b.includes("ita\u00fa")) return "itau";
                const tp = (r.type || r.tipo || "").toLowerCase();
                if (tp.includes("debit") || tp.includes("d\u00e9bit") || tp.includes("debit")) return "debito";
                if (tp.includes("pix")) return "pix";
                return "nubank";
              })()
            })).filter(r => r.amount > 0);
            setSyncPreview(parsed);
          } catch (err) {
            setSyncMsg("❌ Erro ao conectar com o Make. Verifique a URL.");
          }
          setSyncLoading(false);
        },
        disabled: syncLoading,
        style: {
          width: "100%",
          background: syncLoading ? "rgba(99,102,241,0.4)" : "linear-gradient(135deg,#6366f1,#8b5cf6)",
          border: "none",
          color: "#fff",
          padding: "13px",
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 600,
          cursor: syncLoading ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8
        }
      }, syncLoading ? "⏳ Buscando transações..." : "⚡ Sincronizar agora"), /*#__PURE__*/React.createElement("details", {
        style: {
          marginTop: 14
        }
      }, /*#__PURE__*/React.createElement("summary", {
        style: {
          fontSize: 13,
          color: "#818cf8",
          cursor: "pointer",
          fontWeight: 600,
          letterSpacing: .5,
          userSelect: "none"
        }
      }, "📖 Como configurar o Make + Google Sheets"), /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          gap: 10
        }
      }, [{
        n: "1",
        title: "Crie a planilha no Google Sheets",
        desc: 'Colunas: data | comerciante | valor | banco | tipo | importado',
        cor: "#f97316"
      }, {
        n: "2",
        title: "Crie o Atalho no iPhone",
        desc: "App Atalhos → + → \"Quando receber notificação de Santander/Nubank\" → Adicionar linha no Sheets",
        cor: "#ec4899"
      }, {
        n: "3",
        title: "Crie uma conta no Make (gratuito)",
        desc: "make.com → Criar conta → Novo cenário",
        cor: "#6366f1"
      }, {
        n: "4",
        title: "Monte o cenário no Make",
        desc: "Módulo: Google Sheets → Pesquisar Linhas (importado = não) → Webhook de resposta",
        cor: "#8b5cf6"
      }, {
        n: "5",
        title: "Copie a URL do Webhook",
        desc: "No Make: Add trigger → Webhook → Custom webhook → Copie a URL e cole aqui em cima",
        cor: "#22c55e"
      }, {
        n: "6",
        title: "Teste!",
        desc: 'Toque em "Sincronizar agora" - as compras novas aparecem para confirmar',
        cor: "#32BCAD"
      }].map(({
        n,
        title,
        desc,
        cor
      }) => /*#__PURE__*/React.createElement("div", {
        key: n,
        style: {
          display: "flex",
          gap: 12,
          padding: "10px 12px",
          background: t.inp,
          borderRadius: 10,
          border: `1px solid ${t.border}`
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 26,
          height: 26,
          borderRadius: 99,
          background: `${cor}22`,
          border: `1px solid ${cor}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          fontWeight: 700,
          color: cor
        }
      }, n)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: t.text,
          marginBottom: 2
        }
      }, title), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: t.muted,
          lineHeight: 1.5
        }
      }, desc)))), /*#__PURE__*/React.createElement("div", {
        style: {
          padding: "10px 12px",
          background: "rgba(34,197,94,0.06)",
          borderRadius: 10,
          border: "1px solid rgba(34,197,94,0.2)"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#22c55e",
          fontWeight: 600,
          marginBottom: 4
        }
      }, "💡 Dica - coluna \"importado\""), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: t.muted,
          lineHeight: 1.5
        }
      }, "Depois de importar, o Make deve marcar a coluna \"importado\" como \"sim\" para não duplicar. Configure um módulo \"Atualizar linha\" no cenário.")))))));
    }

    // -- APPLE WALLET ----------------------------------------------
    if (page === "wallet") {
      const handleWalletPaste = txt => {
        setWalletText(txt);
        setWalletSaved(false);
        if (!txt.trim()) {
          setWalletParsed(null);
          return;
        }
        const parsed = parseWalletText(txt);
        setWalletParsed(parsed);
        if (parsed && parsed.merchant) {
          setWalletTitle(parsed.merchant);
          setWalletCat(classifyLocal(parsed.merchant));
        }
        if (parsed && parsed.method) setWalletMethod(parsed.method);
      };
      const saveWallet = () => {
        if (!walletParsed && walletParsed.amount) return;
        const entry = {
          id: Date.now(),
          date: today.toISOString().slice(0, 10),
          title: walletTitle || walletParsed.merchant || walletCat,
          amount: walletParsed.amount,
          category: walletCat,
          paymentMethod: walletMethod
        };
        mergeInstallments([entry], key);
        setWalletHistory(h => [{
          ...entry,
          savedAt: new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
          })
        }, ...h.slice(0, 4)]);
        setWalletText("");
        setWalletParsed(null);
        setWalletTitle("");
        setWalletSaved(true);
        setTimeout(() => setWalletSaved(false), 3000);
      };
      const handleSync = async () => {
        if (!makeWebhook.trim()) {
          alert("Cole a URL do webhook do Make primeiro.");
          return;
        }
        setSyncStatus("loading");
        setSyncResult(null);
        try {
          const res = await fetch(makeWebhook.trim(), {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              action: "get_transactions",
              month: key
            })
          });
          const data = await res.json();
          const rows = Array.isArray(data) ? data : data.transactions || data.rows || [];
          if (!rows.length) {
            setSyncStatus("error");
            setSyncResult({
              msg: "Nenhuma transação encontrada no Sheets."
            });
            return;
          }
          const items = rows.map((r, i) => ({
            id: Date.now() + i,
            date: r.date || today.toISOString().slice(0, 10),
            title: r.title || r.comerciante || r.merchant || "Importado",
            amount: parseFloat(String(r.amount || r.valor || 0).replace(",", ".")),
            category: r.category || r.categoria || classifyLocal(r.title || r.merchant || ""),
            paymentMethod: r.paymentMethod || r.metodo || "santander"
          })).filter(r => r.amount > 0);
          const targetKey = items[0] && items[0].date && items[0].date.slice(0, 7) || key;
          mergeInstallments(items, targetKey);
          setSyncCount(c => c + items.length);
          setSyncStatus("success");
          setSyncResult({
            count: items.length,
            items: items.slice(0, 5)
          });
        } catch (e) {
          setSyncStatus("error");
          setSyncResult({
            msg: e.message || "Erro ao conectar. Verifique a URL."
          });
        }
      };
      const cardInfo = cardMap[walletMethod] || {
        color: "#94a3b8",
        icon: "💳",
        name: "Outro"
      };
      const TABS = [{
        id: "sync",
        label: "🔄 Make Sync"
      }, {
        id: "manual",
        label: "✍️ Manual"
      }, {
        id: "guide",
        label: "📖 Guia"
      }];
      return /*#__PURE__*/React.createElement("div", {
        style: px
      }, /*#__PURE__*/React.createElement("style", null, `@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "center",
          marginBottom: 20
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 60,
          height: 60,
          borderRadius: 16,
          background: "linear-gradient(135deg,#1c1c1e,#3a3a3c)",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 28
        }
      }, "🍎")), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 4
        }
      }, "Finance Life × Make"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: t.muted
        }
      }, "Importação automática via Google Sheets")), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 6,
          marginBottom: 20,
          background: t.card,
          borderRadius: 14,
          padding: 4,
          border: `1px solid ${t.border}`
        }
      }, TABS.map(tab => /*#__PURE__*/React.createElement("button", {
        key: tab.id,
        onClick: () => setWalletTab(tab.id),
        style: {
          flex: 1,
          padding: "9px 4px",
          borderRadius: 10,
          border: "none",
          background: walletTab === tab.id ? "linear-gradient(135deg,#E8583A,#3A5F8A)" : "none",
          color: walletTab === tab.id ? "#fff" : t.muted,
          fontSize: 12,
          fontWeight: walletTab === tab.id ? 700 : 400,
          cursor: "pointer",
          fontFamily: "inherit",
          transition: "all .2s"
        }
      }, tab.label))), walletTab === "sync" && /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 14
        }
      }, syncCount > 0 && /*#__PURE__*/React.createElement("div", {
        style: {
          ...C({
            padding: "14px 16px"
          }),
          background: "rgba(34,197,94,0.06)",
          border: "1px solid rgba(34,197,94,0.2)",
          display: "flex",
          alignItems: "center",
          gap: 12
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 22
        }
      }, "✅"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 600,
          color: "#22c55e"
        }
      }, syncCount, " transações importadas nesta sessão"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: t.muted
        }
      }, "Salvas em ", MONTHS[curM]))), /*#__PURE__*/React.createElement("div", {
        style: C({
          padding: "18px"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: t.dim,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 10
        }
      }, "⚙️ WEBHOOK DO MAKE"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: t.muted,
          marginBottom: 10,
          lineHeight: 1.6
        }
      }, "Cole a URL do webhook gerado no Make. Você só faz isso uma vez."), /*#__PURE__*/React.createElement("input", {
        value: makeWebhook,
        onChange: e => setMakeWebhook(e.target.value),
        placeholder: "https://hook.eu1.make.com/xxxxxxxxxxxxxxxx",
        style: {
          background: t.inp,
          border: `1px solid ${makeWebhook ? "rgba(232,88,58,0.4)" : t.border}`,
          borderRadius: 10,
          color: t.text,
          fontSize: 13,
          padding: "11px 12px",
          width: "100%",
          fontFamily: "monospace",
          outline: "none",
          marginBottom: 10
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: t.dim,
          display: "flex",
          alignItems: "center",
          gap: 6
        }
      }, /*#__PURE__*/React.createElement("span", null, "💡"), " Sem webhook ainda? Veja a aba ", /*#__PURE__*/React.createElement("span", {
        onClick: () => setWalletTab("guide"),
        style: {
          color: "#E8583A",
          cursor: "pointer",
          fontWeight: 600
        }
      }, "📖 Guia"))), /*#__PURE__*/React.createElement("button", {
        onClick: handleSync,
        disabled: syncStatus === "loading",
        style: {
          width: "100%",
          padding: "16px",
          borderRadius: 14,
          border: "none",
          background: syncStatus === "loading" ? t.card : "linear-gradient(135deg,#E8583A,#3A5F8A)",
          color: syncStatus === "loading" ? t.muted : "#fff",
          fontSize: 16,
          fontWeight: 700,
          cursor: syncStatus === "loading" ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          boxShadow: syncStatus === "loading" ? "none" : "0 6px 20px rgba(232,88,58,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          transition: "all .2s"
        }
      }, syncStatus === "loading" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
        style: {
          display: "inline-block",
          animation: "spin 1s linear infinite"
        }
      }, "⏳"), " Buscando...") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "🔄"), " Sincronizar agora")), syncStatus === "success" && syncResult && /*#__PURE__*/React.createElement("div", {
        style: {
          ...C({
            padding: "18px"
          }),
          border: "1px solid rgba(34,197,94,0.3)",
          background: "rgba(34,197,94,0.04)"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          color: "#22c55e",
          marginBottom: 14
        }
      }, "✅ ", syncResult.count, " transação(ões) importada(s)!"), syncResult.items.map((e, i) => /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 0",
          borderBottom: i < syncResult.items.length - 1 ? `1px solid ${t.borderAlt}` : "none"
        }
      }, /*#__PURE__*/React.createElement(CatIcon, {
        cat: e.category,
        size: 32,
        catMap: catMap
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: t.text,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }
      }, e.title), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: t.muted
        }
      }, e.category, " · ", fmtDate(e.date))), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 700,
          color: "#22c55e"
        }
      }, fmt(e.amount)))), syncResult.count > 5 && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: t.muted,
          textAlign: "center",
          marginTop: 10
        }
      }, "+", syncResult.count - 5, " mais importadas"), /*#__PURE__*/React.createElement("button", {
        onClick: () => setPage("transacoes"),
        style: {
          width: "100%",
          marginTop: 14,
          padding: "10px",
          borderRadius: 10,
          background: "none",
          border: `1px solid ${t.border}`,
          color: t.muted,
          fontSize: 13,
          cursor: "pointer",
          fontFamily: "inherit"
        }
      }, "Ver todas as transações →")), syncStatus === "error" && syncResult && /*#__PURE__*/React.createElement("div", {
        style: {
          ...C({
            padding: "16px"
          }),
          border: "1px solid rgba(239,68,68,0.3)",
          background: "rgba(239,68,68,0.04)"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 600,
          color: "#ef4444",
          marginBottom: 4
        }
      }, "❌ Erro na sincronização"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: t.muted
        }
      }, syncResult.msg)), /*#__PURE__*/React.createElement("div", {
        style: C({
          padding: "16px"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: t.dim,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 10
        }
      }, "📋 FORMATO JSON ESPERADO"), /*#__PURE__*/React.createElement("div", {
        style: {
          background: "#0a0a1a",
          borderRadius: 10,
          padding: "12px 14px",
          fontFamily: "monospace",
          fontSize: 11,
          color: "#22c55e",
          lineHeight: 1.8,
          overflowX: "auto"
        }
      }, "[\n  {\n    \"date\": \"2026-05-31\",\n    \"title\": \"Autoposto Vera Cruz\",\n    \"amount\": \"50.00\",\n    \"paymentMethod\": \"santander\"\n  }\n]"))), walletTab === "manual" && /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 14
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: C({
          padding: "18px"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: t.dim,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 10
        }
      }, "✍️ ENTRADA MANUAL"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: t.muted,
          marginBottom: 12,
          lineHeight: 1.6
        }
      }, "Digite ou cole o texto da notificação. O app extrai valor e comerciante automaticamente."), /*#__PURE__*/React.createElement("div", {
        style: {
          position: "relative"
        }
      }, /*#__PURE__*/React.createElement("textarea", {
        value: walletText,
        onChange: e => handleWalletPaste(e.target.value),
        placeholder: "Cartão Santander\nAutoposto Vera Cruz\nR$ 50,00",
        rows: 4,
        style: {
          background: t.inp,
          border: `1px solid ${walletParsed ? "rgba(50,188,173,0.4)" : t.border}`,
          borderRadius: 12,
          color: t.text,
          fontSize: 14,
          padding: "12px 14px",
          width: "100%",
          fontFamily: "inherit",
          outline: "none",
          resize: "none",
          lineHeight: 1.6
        }
      }), walletText && /*#__PURE__*/React.createElement("button", {
        onClick: () => {
          setWalletText("");
          setWalletParsed(null);
          setWalletTitle("");
        },
        style: {
          position: "absolute",
          top: 10,
          right: 10,
          background: "none",
          border: "none",
          color: t.dim,
          fontSize: 18,
          cursor: "pointer"
        }
      }, "×")), /*#__PURE__*/React.createElement("button", {
        onClick: async () => {
          try {
            const txt = await navigator.clipboard.readText();
            handleWalletPaste(txt);
          } catch {
            alert("Cole manualmente no campo acima.");
          }
        },
        style: {
          width: "100%",
          marginTop: 10,
          padding: "11px",
          borderRadius: 12,
          background: "none",
          border: `1px solid ${t.border}`,
          color: t.muted,
          fontSize: 14,
          cursor: "pointer",
          fontFamily: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8
        }
      }, /*#__PURE__*/React.createElement("span", null, "📋"), " Colar da área de transferência")), walletParsed && !walletSaved && /*#__PURE__*/React.createElement("div", {
        style: {
          ...C({
            padding: "20px"
          }),
          border: "1px solid rgba(50,188,173,0.3)"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: "#32BCAD",
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 14
        }
      }, "✦ CONFIRME OS DADOS"), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "center",
          marginBottom: 16
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 42,
          fontWeight: 700,
          color: "#32BCAD",
          letterSpacing: -2
        }
      }, walletParsed.amount ? fmt(walletParsed.amount) : /*#__PURE__*/React.createElement("span", {
        style: {
          color: t.dim,
          fontSize: 20
        }
      }, "Valor não encontrado"))), /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: 12
        }
      }, /*#__PURE__*/React.createElement("label", {
        style: {
          fontSize: 12,
          color: t.dim,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 6,
          display: "block"
        }
      }, "COMERCIANTE"), /*#__PURE__*/React.createElement("input", {
        value: walletTitle,
        onChange: e => setWalletTitle(e.target.value),
        placeholder: "Nome do estabelecimento",
        style: {
          background: t.inp,
          border: `1px solid ${t.border}`,
          borderRadius: 10,
          color: t.text,
          fontSize: 15,
          padding: "10px 12px",
          width: "100%",
          fontFamily: "inherit",
          outline: "none"
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: 12
        }
      }, /*#__PURE__*/React.createElement("label", {
        style: {
          fontSize: 12,
          color: t.dim,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 8,
          display: "block"
        }
      }, "CATEGORIA"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 6,
          overflowX: "auto",
          paddingBottom: 4,
          scrollbarWidth: "none"
        }
      }, cats.map(c => /*#__PURE__*/React.createElement("button", {
        key: c.name,
        onClick: () => setWalletCat(c.name),
        style: {
          flexShrink: 0,
          padding: "6px 12px",
          borderRadius: 20,
          border: `1px solid ${walletCat === c.name ? c.color : t.border}`,
          background: walletCat === c.name ? `${c.color}22` : "none",
          color: walletCat === c.name ? c.color : t.muted,
          fontSize: 13,
          cursor: "pointer",
          fontFamily: "inherit",
          fontWeight: walletCat === c.name ? 600 : 400,
          whiteSpace: "nowrap"
        }
      }, c.emoji, " ", c.name)))), /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: 16
        }
      }, /*#__PURE__*/React.createElement("label", {
        style: {
          fontSize: 12,
          color: t.dim,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 8,
          display: "block"
        }
      }, "PAGAMENTO"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 6,
          flexWrap: "wrap"
        }
      }, cards.map(c => /*#__PURE__*/React.createElement("button", {
        key: c.id,
        onClick: () => setWalletMethod(c.id),
        style: {
          padding: "6px 12px",
          borderRadius: 20,
          border: `1px solid ${walletMethod === c.id ? c.color : t.border}`,
          background: walletMethod === c.id ? `${c.color}22` : "none",
          color: walletMethod === c.id ? c.color : t.muted,
          fontSize: 13,
          cursor: "pointer",
          fontFamily: "inherit",
          fontWeight: walletMethod === c.id ? 600 : 400
        }
      }, c.icon, " ", c.name)))), /*#__PURE__*/React.createElement("button", {
        onClick: saveWallet,
        disabled: !walletParsed.amount,
        style: {
          width: "100%",
          padding: "15px",
          borderRadius: 14,
          border: "none",
          background: "linear-gradient(135deg,#32BCAD,#1a8a7e)",
          color: "#fff",
          fontSize: 16,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "inherit",
          boxShadow: "0 6px 20px rgba(50,188,173,0.3)",
          opacity: !walletParsed.amount ? 0.4 : 1
        }
      }, "✓ Confirmar e salvar")), walletSaved && /*#__PURE__*/React.createElement("div", {
        style: {
          ...C({
            padding: "20px"
          }),
          border: "1px solid rgba(34,197,94,0.3)",
          textAlign: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 36,
          marginBottom: 8
        }
      }, "✅"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 16,
          fontWeight: 700,
          color: "#22c55e"
        }
      }, "Gasto registrado!")), walletHistory.length > 0 && /*#__PURE__*/React.createElement("div", {
        style: C({
          padding: "18px"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: t.dim,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 14
        }
      }, "IMPORTADOS HOJE"), walletHistory.map((e, i) => /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 0",
          borderBottom: i < walletHistory.length - 1 ? `1px solid ${t.borderAlt}` : "none"
        }
      }, /*#__PURE__*/React.createElement(CatIcon, {
        cat: e.category,
        size: 32,
        catMap: catMap
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: t.text,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }
      }, e.title), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: t.muted
        }
      }, e.category, " · ", e.savedAt)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 700,
          color: "#22c55e"
        }
      }, fmt(e.amount))))), !walletParsed && !walletSaved && /*#__PURE__*/React.createElement("div", {
        style: C({
          padding: "18px"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: t.dim,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 12
        }
      }, "EXEMPLOS PARA TESTAR"), [{
        banco: "Santander 🔴",
        txt: "Cartão Santander\nAutoposto Vera Cruz. Goiânia, GO\nR$ 50,00"
      }, {
        banco: "Nubank 💜",
        txt: "Nubank\nCompra aprovada\nR$ 45,90 • iFood"
      }, {
        banco: "Inter 🟧",
        txt: "Inter\nCompra no débito\nR$ 120,00 - Supermercado Extra"
      }].map(({
        banco,
        txt
      }) => /*#__PURE__*/React.createElement("div", {
        key: banco,
        onClick: () => handleWalletPaste(txt),
        style: {
          background: t.inp,
          borderRadius: 12,
          padding: "12px 14px",
          marginBottom: 8,
          cursor: "pointer",
          border: `1px solid ${t.border}`
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: t.muted,
          marginBottom: 4,
          fontWeight: 600
        }
      }, banco, " - toque para testar"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: t.dim,
          lineHeight: 1.6,
          fontFamily: "monospace",
          whiteSpace: "pre"
        }
      }, txt))))), walletTab === "guide" && /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 12
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          ...C({
            padding: "18px"
          }),
          background: dark ? "rgba(232,88,58,0.05)" : "rgba(232,88,58,0.03)",
          border: "1px solid rgba(232,88,58,0.2)"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: "#E8583A",
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 14
        }
      }, "🔁 FLUXO COMPLETO"), [{
        n: "1",
        icon: "📲",
        title: "Notificação chega",
        desc: "Santander notifica cada compra no iPhone"
      }, {
        n: "2",
        icon: "⚡",
        title: "Atalho captura",
        desc: "App Atalhos lê e salva automaticamente no Google Sheets"
      }, {
        n: "3",
        icon: "📊",
        title: "Sheets recebe",
        desc: "Cada compra vira uma linha nova na planilha"
      }, {
        n: "4",
        icon: "🔄",
        title: "Você sincroniza",
        desc: "Toca 'Sincronizar agora' - Make le e importa tudo"
      }, {
        n: "5",
        icon: "✅",
        title: "Pronto!",
        desc: "Transações entram classificadas automaticamente"
      }].map(({
        n,
        icon,
        title,
        desc
      }) => /*#__PURE__*/React.createElement("div", {
        key: n,
        style: {
          display: "flex",
          gap: 12,
          marginBottom: 12,
          alignItems: "flex-start"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 28,
          height: 28,
          borderRadius: 99,
          background: "rgba(232,88,58,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 2
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          color: "#E8583A"
        }
      }, n)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 600,
          color: t.text
        }
      }, icon, " ", title), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: t.muted,
          marginTop: 2
        }
      }, desc))))), /*#__PURE__*/React.createElement("div", {
        style: C({
          padding: "18px"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: t.dim,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 10
        }
      }, "PASSO 1 - ATALHO DO iPHONE"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: t.muted,
          marginBottom: 12,
          lineHeight: 1.6
        }
      }, "Abra ", /*#__PURE__*/React.createElement("strong", {
        style: {
          color: t.mid
        }
      }, "Atalhos"), " → ", /*#__PURE__*/React.createElement("strong", {
        style: {
          color: t.mid
        }
      }, "Automação"), " → ", /*#__PURE__*/React.createElement("strong", {
        style: {
          color: t.mid
        }
      }, "Nova Automação"), " → ", /*#__PURE__*/React.createElement("strong", {
        style: {
          color: t.mid
        }
      }, "App"), " → selecione ", /*#__PURE__*/React.createElement("strong", {
        style: {
          color: t.mid
        }
      }, "Santander"), " → \"Ao Abrir\". Adicione estas ações:"), [{
        n: 1,
        acao: "Obter conteúdo da área de transferência",
        tip: "Captura o texto da notificação que você copiou"
      }, {
        n: 2,
        acao: "Dividir texto por nova linha",
        tip: "Separa banco / comerciante / valor"
      }, {
        n: 3,
        acao: "Obter item - Posicao 2 - Variavel Comerciante",
        tip: "Pega o nome do estabelecimento"
      }, {
        n: 4,
        acao: "Obter item - Posicao 3 - Variavel Valor",
        tip: "Pega o valor da compra"
      }, {
        n: 5,
        acao: "Adicionar linha no Google Sheets",
        tip: "Colunas: Data | Comerciante | Valor | santander"
      }].map(({
        n,
        acao,
        tip
      }) => /*#__PURE__*/React.createElement("div", {
        key: n,
        style: {
          display: "flex",
          gap: 10,
          marginBottom: 8,
          padding: "10px 12px",
          background: t.inp,
          borderRadius: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 22,
          height: 22,
          borderRadius: 99,
          background: "rgba(232,88,58,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10,
          fontWeight: 700,
          color: "#E8583A"
        }
      }, n)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: t.text
        }
      }, acao), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: t.muted,
          marginTop: 2
        }
      }, tip))))), /*#__PURE__*/React.createElement("div", {
        style: C({
          padding: "18px"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: t.dim,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 10
        }
      }, "PASSO 2 - GOOGLE SHEETS"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: t.muted,
          marginBottom: 10,
          lineHeight: 1.6
        }
      }, "Crie uma planilha em ", /*#__PURE__*/React.createElement("strong", {
        style: {
          color: "#22c55e"
        }
      }, "sheets.google.com"), " com essas colunas na linha 1:"), /*#__PURE__*/React.createElement("div", {
        style: {
          background: "#0a0a1a",
          borderRadius: 10,
          padding: "12px 14px",
          fontFamily: "monospace",
          fontSize: 12,
          color: "#22c55e",
          lineHeight: 2
        }
      }, "A: date \xA0 B: title \xA0 C: amount \xA0 D: paymentMethod")), /*#__PURE__*/React.createElement("div", {
        style: C({
          padding: "18px"
        })
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: t.dim,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 10
        }
      }, "PASSO 3 - MAKE (gratuito)"), [["1. Acesse", "make.com → crie conta gratuita"], ["2. Novo cenário", "Clique em + Criar cenário"], ["3. Módulo 1", "Webhook → Webhook personalizado → copie a URL"], ["4. Módulo 2", "Google Sheets → Pesquisar linhas → conecte sua planilha"], ["5. Módulo 3", "Webhook → Resposta → retorna o array JSON das linhas"], ["6. Ative", "Ligue o cenário → cole a URL na aba 🔄 Make Sync"]].map(([titulo, desc], i) => /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          display: "flex",
          gap: 10,
          marginBottom: 10,
          alignItems: "flex-start"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 6,
          height: 6,
          borderRadius: 99,
          background: "#E8583A",
          flexShrink: 0,
          marginTop: 6
        }
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: t.mid
        }
      }, titulo, ": "), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          color: t.muted
        }
      }, desc)))), /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 12,
          padding: "12px",
          background: "rgba(232,88,58,0.08)",
          borderRadius: 10,
          border: "1px solid rgba(232,88,58,0.2)"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#E8583A",
          fontWeight: 600,
          marginBottom: 4
        }
      }, "⚡ Importante"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: t.muted,
          lineHeight: 1.6
        }
      }, "Configure o Webhook → Resposta com ", /*#__PURE__*/React.createElement("strong", {
        style: {
          color: t.mid
        }
      }, "Content-type: application/json"), ". O Finance Life aceita o array automaticamente e classifica cada transação."))), /*#__PURE__*/React.createElement("button", {
        onClick: () => setWalletTab("sync"),
        style: {
          width: "100%",
          padding: "14px",
          borderRadius: 14,
          border: "none",
          background: "linear-gradient(135deg,#E8583A,#3A5F8A)",
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "inherit",
          boxShadow: "0 6px 20px rgba(232,88,58,0.3)"
        }
      }, "Já configurei → Ir para Sincronizar →")));
    }
    return /*#__PURE__*/React.createElement("div", {
      style: {
        ...px,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 48,
        marginBottom: 16
      }
    }, "🚀"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 24,
        fontWeight: 700,
        marginBottom: 8
      }
    }, labels[page] || page), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: t.muted,
        textAlign: "center"
      }
    }, "Esta seção está em desenvolvimento.", /*#__PURE__*/React.createElement("br", null), "Em breve estará disponível."));
  };

  // -- MOBILE NAV ------------------------------------------------
  const MOBILE_NAV = [{
    id: "resumo",
    label: "Resumo",
    Icon: Home
  }, {
    id: "transacoes",
    label: "Trans.",
    Icon: ArrowLeftRight
  }, {
    id: "wallet",
    label: "Wallet",
    Icon: Wallet
  }, {
    id: "gastos",
    label: "Gastos",
    Icon: ShoppingBag
  }, {
    id: "adicionar",
    label: "Adicionar",
    Icon: PlusCircle
  }];
  const renderMobileHeader = () => /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: t.sb,
      borderBottom: `1px solid ${t.border}`,
      padding: "12px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, dark ? /*#__PURE__*/React.createElement(FLLogoFull, {
    iconSize: 36,
    textSize: 17
  }) : /*#__PURE__*/React.createElement(FLLogoFullLight, {
    iconSize: 36,
    textSize: 17
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDark(d => !d),
    style: {
      background: t.card,
      border: `1px solid ${t.border}`,
      width: 32,
      height: 32,
      borderRadius: 9,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: t.muted,
      fontSize: 14
    }
  }, dark ? "☀️" : "🌙"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowMobileMenu(v => !v),
    style: {
      background: t.card,
      border: `1px solid ${t.border}`,
      width: 32,
      height: 32,
      borderRadius: 9,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Menu, {
    size: 16,
    color: t.muted
  }))));
  const renderMobileBottomNav = () => /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: t.sb,
      borderTop: `1px solid ${t.border}`,
      display: "flex",
      padding: "6px 0 10px"
    }
  }, MOBILE_NAV.map(n => {
    const active = page === n.id;
    const {
      Icon
    } = n;
    const navColor = (NAV.find(x => x.id === n.id) || {
      color: '#E8583A'
    }).color || "#E8583A";
    return /*#__PURE__*/React.createElement("div", {
      key: n.id,
      onClick: () => {
        setPage(n.id);
        setShowMobileMenu(false);
      },
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        cursor: "pointer",
        padding: "4px 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 10,
        background: active ? `${navColor}20` : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all .15s"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      size: 18,
      color: active ? navColor : t.muted,
      strokeWidth: active ? 2.2 : 1.8
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: active ? navColor : t.muted,
        fontWeight: active ? 600 : 400
      }
    }, n.label));
  }));
  const renderMobileMenu = () => showMobileMenu && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 100,
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "rgba(0,0,0,0.5)"
    },
    onClick: () => setShowMobileMenu(false)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 280,
      background: t.sb,
      height: "100%",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      padding: "20px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 8px 20px",
      borderBottom: `1px solid ${t.border}`,
      marginBottom: 12
    }
  }, dark ? /*#__PURE__*/React.createElement(FLLogoFull, {
    iconSize: 40,
    textSize: 18
  }) : /*#__PURE__*/React.createElement(FLLogoFullLight, {
    iconSize: 40,
    textSize: 18
  })), NAV.map(n => {
    const active = page === n.id;
    const {
      Icon
    } = n;
    return /*#__PURE__*/React.createElement("div", {
      key: n.id,
      onClick: () => {
        setPage(n.id);
        setShowMobileMenu(false);
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px",
        borderRadius: 12,
        cursor: "pointer",
        marginBottom: 2,
        background: active ? "rgba(232,88,58,0.1)" : "transparent",
        borderLeft: active ? "3px solid #E8583A" : "3px solid transparent"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 32,
        height: 32,
        borderRadius: 9,
        background: active ? `${n.color}25` : dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      size: 16,
      color: active ? n.color : t.muted,
      strokeWidth: active ? 2.2 : 1.8
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: active ? 600 : 400,
        color: active ? "#E8583A" : t.muted
      }
    }, n.label));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: `1px solid ${t.border}`,
      marginTop: "auto",
      paddingTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => {
      setShowSettings(true);
      setShowMobileMenu(false);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px",
      borderRadius: 10,
      cursor: "pointer",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 9,
      background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Settings, {
    size: 16,
    color: t.muted
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: t.muted
    }
  }, "Configurações")), /*#__PURE__*/React.createElement("div", {
    onClick: () => setShowMobileMenu(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px",
      borderRadius: 10,
      cursor: "pointer",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 9,
      background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(HelpCircle, {
    size: 16,
    color: t.muted
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: t.muted
    }
  }, "Ajuda")), /*#__PURE__*/React.createElement("div", {
    onClick: () => {
      setShowAccount(true);
      setShowMobileMenu(false);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "12px",
      borderRadius: 10,
      cursor: "pointer",
      background: t.cardHov,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 99,
      background: "linear-gradient(135deg,#E8583A,#3A5F8A)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      flexShrink: 0
    }
  }, profile.photo ? /*#__PURE__*/React.createElement("img", {
    src: profile.photo,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    },
    alt: ""
  }) : /*#__PURE__*/React.createElement(User, {
    size: 16,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: t.text
    }
  }, profile.name ? "Olá, " + profile.name.split(" ")[0] : "Olá, Usuário"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: t.muted
    }
  }, "Ver perfil"))), /*#__PURE__*/React.createElement("div", {
    onClick: () => {
      if (window.confirm("Sair?")) setIsLoggedIn(false);
      setShowMobileMenu(false);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px",
      borderRadius: 10,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 9,
      background: "rgba(239,68,68,0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(LogOut, {
    size: 16,
    color: "#ef4444"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: "#ef4444"
    }
  }, "Sair")))));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      minHeight: "100vh",
      background: t.bg,
      color: t.text,
      fontFamily: "'DM Sans',sans-serif"
    }
  }, /*#__PURE__*/React.createElement("style", null, `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}
        input,textarea,button,select{font-family:inherit;outline:none}
      `), !isMobile && renderSidebar(), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0,
      minHeight: "100vh"
    }
  }, isMobile && renderMobileHeader(), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      overflowY: "auto",
      paddingBottom: isMobile ? "80px" : 0
    }
  }, pageContent())), isMobile && renderMobileBottomNav(), isMobile && renderMobileMenu(), showParcelas && /*#__PURE__*/React.createElement("div", {
    style: sheet,
    onClick: e => {
      if (e.target === e.currentTarget) setShowParcelas(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: panel
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 4,
      background: t.border,
      borderRadius: 99,
      margin: "0 auto 18px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600
    }
  }, "💳 Parcelas Ativas"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowParcelas(false),
    style: {
      background: "none",
      border: "none",
      color: t.muted,
      fontSize: 20,
      cursor: "pointer"
    }
  }, "×")), Object.entries(futureInstByMonth).sort().map(([mk, val]) => {
    const [y, m] = mk.split("-").map(Number);
    const isCur = mk === key;
    return /*#__PURE__*/React.createElement("div", {
      key: mk,
      onClick: () => {
        const [fy, fm] = mk.split("-").map(Number);
        setCurY(fy);
        setCurM(fm - 1);
        setShowParcelas(false);
        setPage("transacoes");
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: isCur ? "rgba(234,179,8,0.08)" : t.inp,
        border: `1px solid ${isCur ? "rgba(234,179,8,0.2)" : t.border}`,
        borderRadius: 12,
        padding: "10px 14px",
        cursor: "pointer",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: isCur ? "#eab308" : t.muted,
        fontWeight: isCur ? 600 : 400
      }
    }, MONTHS[m - 1], " ", y, " ", isCur && "(este mês)")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: isCur ? "#eab308" : t.text
      }
    }, fmt(val)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        color: t.dim
      }
    }, "›"));
  }))), showAccount && /*#__PURE__*/React.createElement("div", {
    style: sheet,
    onClick: e => {
      if (e.target === e.currentTarget) setShowAccount(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: panel
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 4,
      background: t.border,
      borderRadius: 99,
      margin: "0 auto 18px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      marginBottom: 18
    }
  }, "👤 Minha Conta"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginBottom: 20,
      padding: "16px",
      background: t.inp,
      borderRadius: 16,
      border: `1px solid ${t.border}`
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      cursor: "pointer",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: 99,
      background: "linear-gradient(135deg,#E8583A,#3A5F8A)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 28,
      overflow: "hidden",
      border: `3px solid ${t.border}`
    }
  }, profile.photo ? /*#__PURE__*/React.createElement("img", {
    src: profile.photo,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    },
    alt: ""
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#fff"
    }
  }, "👤")), /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*",
    style: {
      display: "none"
    },
    onChange: e => {
      const f = e.target.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = ev => setProfile(p => ({
        ...p,
        photo: ev.target.result
      }));
      r.readAsDataURL(f);
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600
    }
  }, profile.name || "Seu nome"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: t.muted,
      marginTop: 2
    }
  }, profile.email || "seu@email.com"))), [["name", "👤 Nome completo", "Seu nome"], ["phone", "📱 Telefone", "(00) 00000-0000"], ["email", "✉️ E-mail", "seu@email.com"]].map(([field, label, ph]) => /*#__PURE__*/React.createElement("div", {
    key: field,
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      ...lbl,
      marginBottom: 5
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    value: profile[field],
    onChange: e => setProfile(p => ({
      ...p,
      [field]: e.target.value
    })),
    placeholder: ph,
    style: inp()
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowAccount(false),
    style: {
      width: "100%",
      background: "#E8583A",
      border: "none",
      color: "#fff",
      padding: "13px",
      borderRadius: 14,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "inherit",
      marginBottom: 10
    }
  }, "Salvar perfil"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (window.confirm("Sair?")) setIsLoggedIn(false);
      setShowAccount(false);
    },
    style: {
      width: "100%",
      background: "none",
      border: `1px solid ${t.border}`,
      color: t.muted,
      padding: "11px",
      borderRadius: 14,
      fontSize: 15,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "Sair da conta"))), showSettings && /*#__PURE__*/React.createElement("div", {
    style: sheet,
    onClick: e => {
      if (e.target === e.currentTarget) setShowSettings(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: panel
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 4,
      background: t.border,
      borderRadius: 99,
      margin: "0 auto 18px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600
    }
  }, "⚙️ Configurações"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setDark(d => !d),
    style: {
      background: t.inp,
      border: `1px solid ${t.border}`,
      color: t.muted,
      padding: "6px 12px",
      borderRadius: 8,
      fontSize: 15,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, dark ? "☀️ Claro" : "🌙 Escuro")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: t.dim,
      letterSpacing: 2,
      textTransform: "uppercase",
      fontWeight: 600,
      marginBottom: 10
    }
  }, "ORÇAMENTO MENSAL"), [["salary", "💰 Salário líquido"], ["fixed", "🏠 Contas fixas"], ["savings", "🐷 Poupança mensal"]].map(([field, label]) => /*#__PURE__*/React.createElement("div", {
    key: field,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: t.inp,
      borderRadius: 12,
      padding: "12px 14px",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 15,
      color: t.muted,
      flex: 1,
      margin: 0
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: t.dim
    }
  }, "R$"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: cfgDraft[field],
    onChange: e => setCfgDraft(p => ({
      ...p,
      [field]: Number(e.target.value)
    })),
    style: {
      background: "none",
      border: `1px solid ${t.border}`,
      borderRadius: 8,
      color: t.text,
      fontSize: 14,
      padding: "5px 10px",
      width: 90,
      textAlign: "right"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.inp,
      borderRadius: 12,
      padding: "12px 14px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: t.muted
    }
  }, "🎯 Orçamento livre"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: cfgDraft.salary - cfgDraft.fixed - cfgDraft.savings >= 0 ? "#22c55e" : "#ef4444"
    }
  }, fmt(cfgDraft.salary - cfgDraft.fixed - cfgDraft.savings))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setConfig(cfgDraft);
      setShowSettings(false);
    },
    style: {
      width: "100%",
      background: "#E8583A",
      border: "none",
      color: "#fff",
      padding: "13px",
      borderRadius: 14,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "inherit",
      marginBottom: 20
    }
  }, "Salvar"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: t.dim,
      letterSpacing: 2,
      textTransform: "uppercase",
      fontWeight: 600,
      marginBottom: 10
    }
  }, "BACKUP DOS DADOS"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(34,197,94,0.06)",
      border: "1px solid rgba(34,197,94,0.2)",
      borderRadius: 14,
      padding: "14px",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "#86efac",
      marginBottom: 10,
      lineHeight: 1.5
    }
  }, "📱 ", /*#__PURE__*/React.createElement("strong", null, "Como salvar no iPhone:"), " Exporte o backup → compartilhe → salve nos Arquivos do iPhone. Para restaurar, cole o texto abaixo."), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const backup = JSON.stringify({
        store,
        config,
        cats,
        activeCardIds,
        customCards,
        goals,
        makeWebhookUrl,
        version: "1.0",
        date: new Date().toISOString()
      });
      const blob = new Blob([backup], {
        type: "application/json"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `finance-life-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    },
    style: {
      width: "100%",
      background: "linear-gradient(135deg,#22c55e,#16a34a)",
      border: "none",
      color: "#fff",
      padding: "12px",
      borderRadius: 12,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "inherit",
      marginBottom: 8
    }
  }, "📥 Exportar backup (.json)"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: t.dim,
      marginBottom: 8
    }
  }, "Ou copie o código abaixo e guarde em qualquer lugar:"), /*#__PURE__*/React.createElement("textarea", {
    readOnly: true,
    value: JSON.stringify({
      store,
      config,
      cats,
      goals,
      makeWebhookUrl
    }),
    style: {
      width: "100%",
      background: t.inp,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      color: t.muted,
      fontSize: 10,
      padding: "8px",
      resize: "none",
      fontFamily: "monospace",
      height: 60
    },
    onClick: e => {
      e.target.select();
      document.execCommand("copy");
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#22c55e",
      marginTop: 4
    }
  }, "Toque no texto acima para copiar")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(59,130,246,0.06)",
      border: "1px solid rgba(59,130,246,0.2)",
      borderRadius: 14,
      padding: "14px",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "#93c5fd",
      marginBottom: 8,
      fontWeight: 600
    }
  }, "🔄 Restaurar backup"), /*#__PURE__*/React.createElement("textarea", {
    placeholder: "Cole aqui o código do backup...",
    id: "restoreInput",
    style: {
      width: "100%",
      background: t.inp,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      color: t.text,
      fontSize: 12,
      padding: "8px",
      resize: "none",
      fontFamily: "monospace",
      height: 60,
      marginBottom: 8
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      try {
        const el = document.getElementById("restoreInput");
        const data = JSON.parse(el.value);
        if (data.store) setStore({
          ...INIT_STORE,
          ...data.store
        });
        if (data.config) {
          setConfig(data.config);
          setCfgDraft(data.config);
        }
        if (data.cats) setCats(data.cats);
        if (data.goals) setGoals(data.goals);
        if (data.makeWebhookUrl) setMakeWebhookUrl(data.makeWebhookUrl);
        el.value = "";
        alert("Backup restaurado com sucesso!");
        setShowSettings(false);
      } catch (e) {
        alert("Código inválido. Verifique e tente novamente.");
      }
    },
    style: {
      width: "100%",
      background: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
      border: "none",
      color: "#fff",
      padding: "12px",
      borderRadius: 12,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "🔄 Restaurar dados")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(239,68,68,0.06)",
      border: "1px solid rgba(239,68,68,0.2)",
      borderRadius: 14,
      padding: "14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "#fca5a5",
      marginBottom: 6,
      fontWeight: 600
    }
  }, "⚠️ Zona de perigo"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: t.muted,
      marginBottom: 10,
      lineHeight: 1.5
    }
  }, "Apaga todas as transações e restaura o app para o estado inicial. Esta ação não pode ser desfeita."), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (window.confirm("Tem certeza? Isso apaga TODAS as transações e dados do app. Esta ação não pode ser desfeita.")) {
        if (window.confirm("Confirme novamente — todos os dados serão perdidos!")) {
          setStore(INIT_STORE);
          setConfig(DEFAULT_CFG);
          setCfgDraft(DEFAULT_CFG);
          setCats(DEFAULT_CATS);
          setGoals([]);
          setActiveCardIds(DEFAULT_ACTIVE);
          setCustomCards([]);
          setProfile({
            name: "",
            phone: "",
            email: "",
            goal: "",
            photo: ""
          });
          setMakeWebhookUrl("");
          setShowSettings(false);
          setIsLoggedIn(false);
        }
      }
    },
    style: {
      width: "100%",
      background: "rgba(239,68,68,0.15)",
      border: "1px solid rgba(239,68,68,0.4)",
      color: "#ef4444",
      padding: "12px",
      borderRadius: 12,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "🗑️ Apagar todos os dados e reiniciar")))));
}
const root = ReactDOM.createRoot(document.getElementById("fl-root"));
root.render(React.createElement(App));
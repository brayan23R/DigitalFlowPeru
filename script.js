if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
const navigationEntry = performance.getEntriesByType('navigation')[0];
if (navigationEntry?.type === 'reload') {
  history.replaceState(null, '', `${location.pathname}${location.search}`);
  window.scrollTo(0, 0);
}
window.addEventListener('pageshow', event => {
  if (event.persisted || navigationEntry?.type === 'reload') window.scrollTo(0, 0);
});

const nav = document.querySelector('.site-nav');
const menu = document.querySelector('.menu-toggle');
const navLinks = [...document.querySelectorAll('.site-nav a')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function closeMenu() {
  nav.classList.remove('is-open');
  menu.setAttribute('aria-expanded', 'false');
}
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menu.setAttribute('aria-expanded', String(open));
});
navLinks.forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') { closeMenu(); menu.focus(); }
});
const robot = document.querySelector('.robot-sequence');
let greetingTimer;
function greet() {
  if (reducedMotion.matches) return;
  clearTimeout(greetingTimer);
  robot.classList.remove('is-greeting');
  void robot.offsetWidth;
  robot.classList.add('is-greeting');
  greetingTimer = setTimeout(() => robot.classList.remove('is-greeting'), 4400);
}
if ('IntersectionObserver' in window) {
  let wasVisible = false;
  new IntersectionObserver(entries => {
    const visible = entries[0].isIntersecting;
    if (visible && !wasVisible) greet();
    wasVisible = visible;
  }, {threshold: .3}).observe(document.querySelector('.hero-visual'));
} else greet();
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('.faq-item').forEach(other => {
      if (other !== item) other.open = false;
    });
  });
});

const serviceDetails = {
  software: {
    title: 'Software',
    summary: 'Construimos CRM, ERP, plataformas y sistemas a medida para ordenar tu operación y hacerla crecer.',
    items: ['Aplicaciones web corporativas', 'Plataformas y sistemas a medida', 'CRM y ERP para centralizar la operación', 'Bases de datos y paneles de control', 'Integraciones con tus herramientas']
  },
  automation: {
    title: 'Automatización e inteligencia artificial',
    summary: 'Conectamos tareas, datos y modelos de IA para que tu equipo ahorre tiempo y trabaje con más precisión.',
    items: ['Automatización de tareas y flujos', 'Integración de inteligencia artificial', 'Asistentes internos y atención digital', 'Conexión entre formularios, CRM y datos', 'Métricas y mejora continua']
  },
  cloud: {
    title: 'Cloud computing',
    summary: 'Diseñamos infraestructura en la nube para que tus sistemas estén disponibles, seguros y preparados para crecer.',
    items: ['Arquitectura y despliegue en la nube', 'Escalabilidad y continuidad operativa', 'Respaldos, monitoreo y recuperación', 'Seguridad y permisos de acceso', 'Soporte de infraestructura']
  },
  experience: {
    title: 'Aplicaciones y experiencia digital',
    summary: 'Diseñamos experiencias claras y rápidas para que tus clientes y equipos puedan usar la tecnología sin fricción.',
    items: ['Diseño UX/UI para productos digitales', 'Web corporativa y landing pages', 'Prototipos y pruebas de uso', 'Diseño responsive para cada pantalla', 'Experiencias preparadas para convertir']
  },
  data: {
    title: 'Integraciones y datos',
    summary: 'Ordenamos la información de tu empresa y conectamos tus sistemas para que puedas decidir mejor.',
    items: ['Modelado y estructura de datos', 'Integración entre plataformas', 'Mantenimiento y optimización', 'Reportes y paneles de control', 'Seguridad y control de accesos']
  },
  support: {
    title: 'Soporte',
    summary: 'Brindamos soporte técnico continuo para que tus aplicaciones y sistemas sigan funcionando.',
    items: ['Soporte técnico 24 horas, los 7 días', 'Mantenimiento correctivo y preventivo', 'Actualizaciones y mejoras continuas', 'Monitoreo y atención de incidencias', 'Tres años de soporte para aplicaciones construidas por nosotros']
  }
};

const serviceDetailsEnglish = {
  software: { title: 'Software', summary: 'We build CRM, ERP, platforms, and custom systems that organize your operation and help it grow.', items: ['Corporate web applications', 'Custom platforms and systems', 'CRM and ERP to centralize operations', 'Databases and control panels', 'Integrations with your tools'] },
  automation: { title: 'Automation and artificial intelligence', summary: 'We connect tasks, data, and AI models so your team saves time and works with greater precision.', items: ['Task and workflow automation', 'Artificial intelligence integration', 'Internal assistants and digital support', 'Connections between forms, CRM, and data', 'Metrics and continuous improvement'] },
  cloud: { title: 'Cloud computing', summary: 'We design cloud infrastructure that keeps your systems available, secure, and ready to grow.', items: ['Cloud architecture and deployment', 'Scalability and operational continuity', 'Backups, monitoring, and recovery', 'Security and access permissions', 'Infrastructure support'] },
  experience: { title: 'Applications and digital experience', summary: 'We design clear, fast experiences so customers and teams can use technology without friction.', items: ['UX/UI design for digital products', 'Corporate websites and landing pages', 'Prototypes and usability tests', 'Responsive design for every screen', 'Experiences built to convert'] },
  data: { title: 'Integrations and data', summary: 'We organize your company information and connect your systems so you can make better decisions.', items: ['Data modeling and structure', 'Integration between platforms', 'Maintenance and optimization', 'Reports and control panels', 'Security and access control'] },
  support: { title: 'Support', summary: 'We provide continuous technical support so your applications and systems keep working.', items: ['Technical support 24 hours a day, 7 days a week', 'Corrective and preventive maintenance', 'Updates and continuous improvements', 'Monitoring and incident response', 'Three years of support for applications we build'] }
};

const serviceModal = document.querySelector('#servicio-detalle');
const serviceTitle = document.querySelector('#service-modal-title');
const serviceSummary = document.querySelector('#service-modal-summary');
const serviceList = document.querySelector('#service-modal-list');
const serviceContact = document.querySelector('#service-modal-contact');
let lastServiceTrigger;

function closeServiceModal() {
  if (!serviceModal) return;
  serviceModal.hidden = true;
  document.body.classList.remove('modal-open');
  lastServiceTrigger?.focus();
}

document.querySelectorAll('.service-detail-trigger').forEach(trigger => {
  trigger.addEventListener('click', event => {
    event.preventDefault();
    const card = trigger.closest('[data-service]');
    const detail = (currentLanguage === 'en' ? serviceDetailsEnglish : serviceDetails)[card?.dataset.service];
    if (!detail || !serviceModal) return;
    lastServiceTrigger = trigger;
    serviceTitle.textContent = detail.title;
    serviceSummary.textContent = detail.summary;
    serviceList.replaceChildren(...detail.items.map(item => {
      const li = document.createElement('li');
      li.textContent = item;
      return li;
    }));
    serviceContact.href = `mailto:digitalflowperu@gmail.com?subject=${encodeURIComponent(`Solicitar proyecto: ${detail.title}`)}`;
    serviceModal.hidden = false;
    document.body.classList.add('modal-open');
    serviceModal.querySelector('.service-modal-close').focus();
  });
});
document.querySelectorAll('[data-close-service]').forEach(element => element.addEventListener('click', closeServiceModal));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && serviceModal && !serviceModal.hidden) closeServiceModal();
});

const reviewsViewport = document.querySelector('.reviews-viewport');
const reviewsTrack = document.querySelector('#reviews-track');
const reviewForm = document.querySelector('#review-form');
const reviewFormToggle = document.querySelector('#open-review-form');
const reviewFormStatus = document.querySelector('#review-form-status');
let reviewFrame;

function updateActiveReview() {
  if (!reviewsViewport || !reviewsTrack) return;
  const center = reviewsViewport.getBoundingClientRect().left + reviewsViewport.clientWidth / 2;
  let closest;
  let distance = Infinity;
  reviewsTrack.querySelectorAll('.review-card').forEach(card => {
    const box = card.getBoundingClientRect();
    const currentDistance = Math.abs((box.left + box.width / 2) - center);
    if (currentDistance < distance) { distance = currentDistance; closest = card; }
  });
  reviewsTrack.querySelectorAll('.review-card').forEach(card => card.classList.toggle('is-active', card === closest));
}

reviewsViewport?.addEventListener('scroll', () => {
  cancelAnimationFrame(reviewFrame);
  reviewFrame = requestAnimationFrame(updateActiveReview);
}, { passive: true });
reviewsTrack?.addEventListener('click', event => {
  const card = event.target.closest('.review-card');
  if (card) card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
});
window.addEventListener('resize', updateActiveReview);
updateActiveReview();

const translations = {
  'Digital Flow Perú | Software y soluciones tecnológicas': 'Digital Flow Peru | Software and technology solutions',
  'PERÚ / SOLUCIONES TECNOLÓGICAS': 'PERU / TECHNOLOGY SOLUTIONS',
  'MENÚ': 'MENU', 'Abrir menú': 'Open menu', 'Inicio': 'Home', 'Servicios': 'Services', 'Experiencias': 'Experiences', 'Preguntas': 'FAQ', 'Contactar': 'Contact',
  'Software que convierte tus retos en': 'Software that turns your challenges into', 'resultados.': 'results.',
  'Diseñamos y desarrollamos aplicaciones, automatizaciones e infraestructura tecnológica para que tu empresa avance con más velocidad, orden y control.': 'We design and develop applications, automations, and technology infrastructure so your company can move faster, with more order and control.',
  'Explorar soluciones': 'Explore solutions', 'Ver experiencias': 'View experiences', 'Software a medida': 'Custom software', 'Automatización e inteligencia artificial': 'Automation and artificial intelligence', 'Soporte y evolución': 'Support and evolution', 'Cloud computing': 'Cloud computing',
  'Enfoque en resultados': 'Focus on results', 'Entrega clara y eficiente': 'Clear and efficient delivery', 'Seguridad y calidad': 'Security and quality', 'Acompañamiento continuo': 'Continuous support',
  'SERVICIOS': 'SERVICES', 'Tecnología': 'Technology', 'a tu alcance.': 'within reach.',
  'Expertos en ingeniería y tecnología, convertimos tus necesidades en sistemas útiles, seguros y escalables. Integramos datos y herramientas para que tu equipo trabaje mejor y llegue más lejos.': 'We turn your needs into useful, secure, and scalable systems. We integrate data and tools so your team can work better and go further.',
  'Software': 'Software', 'Construcción de CRM, ERP, plataformas y sistemas a medida preparados para crecer contigo.': 'CRM, ERP, platforms, and custom systems built to grow with you.', 'Descubrir': 'Discover',
  'Conectamos herramientas, modelos y flujos para reducir tareas y tomar mejores decisiones.': 'We connect tools, models, and workflows to reduce repetitive tasks and improve decisions.',
  'Diseñamos entornos en la nube ordenados, disponibles, escalables y preparados para tu operación.': 'We design organized, available, scalable cloud environments ready for your operation.',
  'Aplicaciones y experiencia digital': 'Applications and digital experience', 'Diseñamos productos digitales claros, rápidos y fáciles de usar en cada pantalla.': 'We design clear, fast digital products that are easy to use on every screen.',
  'Integraciones y datos': 'Integrations and data', 'Conectamos tus sistemas, organizamos tu información y creamos una operación más inteligente.': 'We connect your systems, organize your information, and create a smarter operation.',
  'Soporte': 'Support', 'Soporte técnico continuo para que tus aplicaciones y sistemas sigan funcionando.': 'Continuous technical support so your applications and systems keep working.',
  'EXPERIENCIAS': 'EXPERIENCES', 'Ideas que se convierten en': 'Ideas that become', 'soluciones reales.': 'real solutions.', 'Diseñamos soluciones digitales para que tu empresa trabaje mejor y crezca.': 'We design digital solutions so your company can work better and grow.',
  'MODA Y COMERCIO': 'FASHION AND COMMERCE', 'Tienda de ropa y calzado en Cajamarca para damas y caballeros, con catálogo de moda y atención directa.': 'Fashion and footwear store in Cajamarca for women and men, with a clear catalog and direct support.', 'Visitar proyecto ↗': 'Visit project ↗', 'Abrir sitio ↗': 'Open site ↗',
  'IMPORTACIONES Y SUMINISTROS': 'IMPORTS AND SUPPLIES', 'Catálogo de máquinas, insumos de sublimación, papelería, oficina y artículos de merchandising.': 'Catalog of machines, sublimation supplies, stationery, office products, and merchandising items.',
  'CONSTRUCCIÓN E INGENIERÍA': 'CONSTRUCTION AND ENGINEERING', 'Presentación corporativa de una constructora con servicios, trayectoria, proyectos y contacto.': 'Corporate presentation for a construction company with services, experience, projects, and contact.',
  'INMOBILIARIA': 'REAL ESTATE', 'Portafolio inmobiliario con departamentos, residenciales, proyectos y rutas de contacto.': 'Real estate portfolio with apartments, residential projects, and contact options.',
  'INFRAESTRUCTURA': 'INFRASTRUCTURE', 'Web corporativa para mostrar líneas de negocio, proyectos de infraestructura y novedades.': 'Corporate website for business lines, infrastructure projects, and updates.',
  'SALUD Y SERVICIOS': 'HEALTH AND SERVICES', 'Experiencia informativa para una clínica dental con servicios, atención integral y agenda.': 'Informative experience for a dental clinic with services, complete care, and appointments.',
  'CONSTRUCCIÓN Y DISEÑO 3D': 'CONSTRUCTION AND 3D DESIGN', 'Servicios de construcción, remodelación, estructuras metálicas, electricidad y diseño interior en 3D.': 'Construction, remodeling, metal structures, electrical work, and 3D interior design services.',
  'RESEÑAS': 'REVIEWS', 'Nuestros clientes nos respaldan.': 'Our clients support our progress.', 'Muchas gracias por el buen trabajo. Ropa y Estilo quedó claro, ordenado y listo para mostrar nuestro catálogo.': 'Thank you very much for the great work. Ropa y Estilo is clear, organized, and ready to showcase our catalog.', 'Proyecto: Ropa y Estilo': 'Project: Ropa y Estilo', 'Excelente trabajo con la página de Importaciones Facundo. Muchas gracias, el catálogo quedó práctico y fácil de presentar.': 'Excellent work on the Importaciones Facundo website. Thank you very much; the catalog is practical and easy to present.', 'Proyecto: Importaciones Facundo': 'Project: Importaciones Facundo', 'Muchas gracias por la seguridad y el acompañamiento. El proyecto de Carmen quedó terminado y nos dejó muy satisfechos.': 'Thank you very much for the security and support. The Carmen project was completed and left us very satisfied.', 'Proyecto: Carmen Grupo Inca': 'Project: Carmen Grupo Inca', 'Agradezco el buen trabajo realizado para Portillo. La presentación de nuestros proyectos quedó profesional y clara.': 'Thank you for the great work on Portillo. The presentation of our projects is now professional and clear.', 'Proyecto: Portillo': 'Project: Portillo', 'Muchas gracias por el trabajo en Constructora Málaga. El resultado quedó perfecto para mostrar nuestros servicios y proyectos.': 'Thank you very much for the work on Constructora Málaga. The result is perfect for presenting our services and projects.', 'Proyecto: Constructora Málaga': 'Project: Constructora Málaga', 'Estamos muy a gusto con el trabajo realizado para Clínica Dental Caso Lay. Gracias por la confianza y por cuidar cada detalle.': 'We are very happy with the work completed for Clínica Dental Caso Lay. Thank you for your trust and for caring about every detail.', 'Proyecto: Clínica Dental Caso Lay': 'Project: Clínica Dental Caso Lay', 'Excelente trabajo con la web de BS Construcción. Muchas gracias, el proyecto quedó completo y listo para nuestros clientes.': 'Excellent work on the BS Construcción website. Thank you very much; the project is complete and ready for our clients.', 'Proyecto: BS Construcción S.R.L.': 'Project: BS Construcción S.R.L.', 'Excelente trabajo: realizaron el mantenimiento de nuestra nube en AWS. Muchas gracias por la seguridad y la atención recibida.': 'Excellent work maintaining our AWS cloud. Thank you very much for the security and support.', 'Proyecto: Mantenimiento AWS': 'Project: AWS maintenance', 'Me ayudaron con la migración de mis datos de Excel a una base de datos en la nube de Azure. Excelente trabajo, muchas gracias.': 'They helped migrate my Excel data to an Azure cloud database. Excellent work, thank you very much.', 'Proyecto: Migración a Azure': 'Project: Azure migration', 'Gracias por integrar nuestros datos y ordenar la operación. El sistema quedó terminado, claro y preparado para seguir creciendo.': 'Thank you for integrating our data and organizing our operation. The system is complete, clear, and ready to grow.', 'Proyecto: Integración de datos': 'Project: Data integration',
  'Agregar nueva reseña': 'Add a new review', 'Nombre': 'Name', 'Correo': 'Email', 'Calificación': 'Rating', '5 de 7 estrellas': '5 of 7 stars', '6 de 7 estrellas': '6 of 7 stars', '7 de 7 estrellas': '7 of 7 stars', 'Descripción': 'Description', 'Agregar reseña': 'Add review',
  'TECNOLOGÍAS': 'TECHNOLOGIES', 'Lo que imaginamos,': 'What we imagine,', 'lo hacemos.': 'we build.', 'Elige una solución y descubre con qué tecnologías podemos construir para tu empresa.': 'Choose a solution and discover which technologies we can build for your company.', 'Aplicaciones empresariales': 'Enterprise applications', 'Interactividad web': 'Web interactivity', 'Plataformas web': 'Web platforms', 'Información organizada': 'Organized information', 'Datos relacionales': 'Relational data', 'Consultas y análisis': 'Queries and analytics', 'Automatización e IA': 'Automation and AI', 'Software y servicios': 'Software and services', 'Aplicaciones robustas': 'Robust applications', 'Interfaces consistentes': 'Consistent interfaces', 'Diseño responsive': 'Responsive design', 'Componentes interactivos': 'Interactive components',
  'NOSOTROS': 'ABOUT US', 'Un equipo tecnológico para avanzar con': 'A technology team to move forward with', 'claridad.': 'clarity.', 'años de experiencia': 'years of experience', 'Construimos relaciones de trabajo basadas en diagnóstico, comunicación y resultados que se pueden ver.': 'We build working relationships based on diagnosis, communication, and visible results.',
  'PREGUNTAS FRECUENTES': 'FAQ', 'Preguntas': 'Frequently', 'frecuentes.': 'asked questions.', '¿Cuál es el proceso para crear una solución?': 'What is the process for creating a solution?', 'Comenzamos con una conversación para entender tu negocio. Luego definimos la dirección, diseñamos la experiencia, desarrollamos la solución, hacemos pruebas y la dejamos lista para crecer contigo.': 'We start with a conversation to understand your business. Then we define the direction, design the experience, build the solution, test it, and leave it ready to grow with you.', '¿Cuánto tiempo toma un proyecto?': 'How long does a project take?', 'Depende del alcance. Una landing page puede estar lista en pocos días; una web corporativa, un sistema o una automatización requieren un cronograma definido desde el inicio.': 'It depends on the scope. A landing page can be ready in a few days; a corporate website, system, or automation needs a timeline defined from the start.', '¿Puedo solicitar cambios después del lanzamiento?': 'Can I request changes after launch?', 'Sí. Trabajamos con una base ordenada para que tu solución pueda mantenerse, actualizarse y crecer cuando tu empresa lo necesite.': 'Yes. We build on an organized foundation so your solution can be maintained, updated, and expanded when your company needs it.', '¿También brindan soporte y mantenimiento?': 'Do you also provide support and maintenance?', 'Ofrecemos soporte técnico, mejoras, mantenimiento de bases de datos, acompañamiento en la nube y atención para que tu operación continúe sin interrupciones.': 'We provide technical support, improvements, database maintenance, cloud support, and assistance so your operation continues without interruptions.',
  'Tu próxima solución tecnológica': 'Your next technology solution', 'empieza aquí.': 'starts here.', 'Hablemos': 'Let’s talk', 'Empresa de tecnología en crecimiento que ayuda a empresas y pymes a desarrollar sus productos digitales.': 'A growing technology company helping businesses and SMEs build their digital products.', 'Contacto': 'Contact', 'Términos y condiciones': 'Terms and conditions', 'Política de privacidad': 'Privacy policy', 'El contenido de este sitio es informativo. Cada proyecto se define mediante una propuesta y un acuerdo de servicio personalizado.': 'The content of this site is informational. Each project is defined through a proposal and a tailored service agreement.', 'Los datos recibidos por contacto se utilizan únicamente para responder consultas y preparar propuestas.': 'Contact data is used only to answer inquiries and prepare proposals.', 'Volver arriba ↑': 'Back to top ↑', 'SERVICIO / DIGITAL FLOW PERÚ': 'SERVICE / DIGITAL FLOW PERU', 'Solicitar este proyecto': 'Request this project', 'Digital Flow Perú, inicio': 'Digital Flow Peru, home', 'Lo que hacemos': 'What we do', 'Especialidades': 'Specialties', 'Robot tecnológico saludando en el Home': 'Greeting technology robot on Home', 'Carrusel de reseñas': 'Reviews carousel', 'Tecnologías con las que trabajamos': 'Technologies we work with', 'Enlaces del pie de página': 'Footer links', 'Más de dos años de experiencia': 'More than two years of experience'
};
const languageToggle = document.querySelector('#language-toggle');
let currentLanguage = localStorage.getItem('digitalFlowLanguage') || 'es';
const originalTextNodes = new WeakMap();
const originalAttributes = new WeakMap();
function normalizeText(value) { return value.replace(/\s+/g, ' ').trim(); }
function translatedValue(value, language) {
  const core = normalizeText(value);
  if (!core) return value;
  if (language === 'es') return core;
  return translations[core] || core;
}
function applyLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!node.parentElement.closest('script,style,textarea,input,select')) nodes.push(node);
  }
  nodes.forEach(node => {
    const original = originalTextNodes.get(node) || node.nodeValue;
    originalTextNodes.set(node, original);
    const leading = original.match(/^\s*/)?.[0] || '';
    const trailing = original.match(/\s*$/)?.[0] || '';
    const core = normalizeText(original);
    const value = language === 'es' ? core : (translations[core] || core);
    node.nodeValue = `${leading}${value}${trailing}`;
  });
  document.querySelectorAll('[aria-label],[title],[alt]').forEach(element => {
    const saved = originalAttributes.get(element) || {};
    ['aria-label','title','alt'].forEach(attribute => {
      const value = element.getAttribute(attribute);
      if (value && !saved[attribute]) saved[attribute] = value;
      const original = saved[attribute];
      if (!original) return;
      const core = normalizeText(original);
      const translated = language === 'en' ? (translations[core] || core.replace(/^(\d+) de 7 estrellas$/, '$1 of 7 stars')) : core;
      if (translated) element.setAttribute(attribute, translated);
    });
    originalAttributes.set(element, saved);
  });
  document.title = language === 'en' ? translations['Digital Flow Perú | Software y soluciones tecnológicas'] : 'Digital Flow Perú | Software y soluciones tecnológicas';
  if (languageToggle) {
    languageToggle.innerHTML = language === 'es'
      ? '<svg class="flag-icon" data-flag="es" viewBox="0 0 36 24" aria-hidden="true" focusable="false"><rect width="36" height="24" rx="3" fill="#AA151B"/><rect y="6" width="36" height="12" fill="#F1BF00"/></svg>'
      : '<svg class="flag-icon" data-flag="en" viewBox="0 0 36 24" aria-hidden="true" focusable="false"><rect width="36" height="24" rx="3" fill="#012169"/><path d="M0 0 36 24M36 0 0 24" stroke="#fff" stroke-width="6"/><path d="M0 0 36 24M36 0 0 24" stroke="#C8102E" stroke-width="2.4"/><path d="M18 0v24M0 12h36" stroke="#fff" stroke-width="8"/><path d="M18 0v24M0 12h36" stroke="#C8102E" stroke-width="4"/></svg>';
    languageToggle.setAttribute('aria-label', language === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish');
    languageToggle.setAttribute('title', language === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish');
  }
  localStorage.setItem('digitalFlowLanguage', language);
}
languageToggle?.addEventListener('click', () => applyLanguage(currentLanguage === 'es' ? 'en' : 'es'));

function buildReviewCard(review) {
  const card = document.createElement('article');
  card.className = 'review-card';
  card.dataset.rating = String(review.rating);
  const initials = review.name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase();
  const top = document.createElement('div');
  top.className = 'review-top';
  const avatar = document.createElement('span');
  avatar.className = 'review-avatar';
  avatar.textContent = initials || 'DF';
  const info = document.createElement('div');
  const name = document.createElement('h3');
  name.textContent = review.name;
  const email = document.createElement('p');
  email.textContent = review.email;
  info.append(name, email);
  top.append(avatar, info);
  const stars = document.createElement('div');
  stars.className = 'review-stars';
  stars.setAttribute('aria-label', `${review.rating} de 7 estrellas`);
  for (let i = 1; i <= 7; i += 1) {
    const star = document.createElement('span');
    star.textContent = '★';
    if (i <= review.rating) star.className = 'active';
    stars.append(star);
  }
  const description = document.createElement('p');
  description.textContent = review.description;
  const project = document.createElement('small');
  project.textContent = currentLanguage === 'en' ? 'Project: New review' : 'Proyecto: Nueva reseña';
  card.append(top, stars, description, project);
  return card;
}

if (reviewFormToggle && reviewForm) {
  reviewFormToggle.addEventListener('click', () => {
    reviewForm.hidden = !reviewForm.hidden;
    if (!reviewForm.hidden) reviewForm.elements.name.focus();
  });
  reviewForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(reviewForm);
    const review = {
      name: String(formData.get('name')).trim(),
      email: String(formData.get('email')).trim(),
      rating: Number(formData.get('rating')),
      description: String(formData.get('description')).trim()
    };
    const saved = JSON.parse(localStorage.getItem('digitalFlowReviews') || '[]');
    saved.push(review);
    localStorage.setItem('digitalFlowReviews', JSON.stringify(saved));
    reviewsTrack.append(buildReviewCard(review));
    reviewForm.reset();
    reviewForm.hidden = true;
    reviewFormStatus.textContent = 'Reseña agregada.';
    reviewsTrack.lastElementChild.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    setTimeout(() => { reviewFormStatus.textContent = ''; }, 3500);
    setTimeout(updateActiveReview, 500);
  });
  try {
    JSON.parse(localStorage.getItem('digitalFlowReviews') || '[]').forEach(review => reviewsTrack.append(buildReviewCard(review)));
  } catch { localStorage.removeItem('digitalFlowReviews'); }
  setTimeout(() => {
    const startingCard = reviewsTrack.children[1];
    startingCard?.scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' });
    updateActiveReview();
  }, 50);
}

const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } });
}, { threshold: .12 }) : null;
document.querySelectorAll('.reveal').forEach(element => revealObserver ? revealObserver.observe(element) : element.classList.add('is-visible'));
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
  document.body.classList.remove('page-shift');
  requestAnimationFrame(() => document.body.classList.add('page-shift'));
  setTimeout(() => document.body.classList.remove('page-shift'), 700);
}));
const heroVisual = document.querySelector('.hero-visual');
heroVisual?.addEventListener('pointermove', event => {
  const box = heroVisual.getBoundingClientRect();
  heroVisual.style.setProperty('--pointer-x', `${((event.clientX - box.left) / box.width - .5) * 8}deg`);
  heroVisual.style.setProperty('--pointer-y', `${((event.clientY - box.top) / box.height - .5) * -8}deg`);
});
heroVisual?.addEventListener('pointerleave', () => {
  heroVisual.style.setProperty('--pointer-x', '0deg');
  heroVisual.style.setProperty('--pointer-y', '0deg');
});
applyLanguage(currentLanguage);


// Google Ads / Tag Manager readiness: emit a lead event only when a tag manager
// or analytics container has been configured by the site owner.
document.querySelectorAll('[data-conversion]').forEach(element => {
  element.addEventListener('click', () => {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: 'generate_lead', lead_type: element.dataset.conversion });
    }
  });
});

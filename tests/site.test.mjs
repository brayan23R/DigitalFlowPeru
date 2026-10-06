import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const html = readFileSync('src/pages/index.astro', 'utf8');
const script = readFileSync('public/script.js', 'utf8');

const localTechnologyAssets = [
  'java-original.svg', 'javascript-original.svg', 'laravel-original.svg',
  'postgresql-original.svg', 'mysql-original.svg', 'microsoftsqlserver-original.svg',
  'python-original.svg', 'csharp-original.svg', 'typescript-original.svg',
  'tailwindcss-original.svg', 'css3-original.svg', 'react-original.svg'
];

test('la página tiene SEO base y cobertura GEO de Perú', () => {
  assert.match(html, /<title>DigitalFlow \| Perú/);
  assert.match(html, /canonical/);
  assert.match(html, /geo\.region.*PE/);
  assert.match(html, /areaServed/);
  assert.match(html, /application\/ld\+json/);
});

test('los logos y recursos críticos se sirven localmente', () => {
  assert.doesNotMatch(html, /cdn\.jsdelivr\.net|simpleicons\.org/);
  for (const file of localTechnologyAssets) {
    assert.ok(existsSync(`public/assets/technology/${file}`), file);
    assert.match(html, new RegExp(`/assets/technology/${file}`));
  }
  assert.ok(existsSync('public/assets/robot-rest.webp'));
  assert.ok(existsSync('public/assets/robot-greeting.webp'));
});

test('la carga inicial no desplaza la página al carrusel y el refresh vuelve al Home', () => {
  assert.match(script, /history\.replaceState/);
  assert.match(script, /requestAnimationFrame\(updateActiveReview\)/);
  assert.doesNotMatch(script, /startingCard\.scrollIntoView/);
});

test('las reseñas nuevas se guardan en el navegador', () => {
  assert.match(script, /localStorage\.setItem\('digitalFlowReviews'/);
  assert.match(html, /CRM a medida/);
  assert.match(html, /sistema para controlar mejor mis clientes/);
  assert.match(html, /Buen trabajo\./);
  assert.match(html, /inventario a medida/);
  assert.equal((html.match(/class=\"review-card/g) || []).length, 11);
  assert.doesNotMatch(html, /@example\.com/);
});


test('el contacto flotante usa una burbuja y ofrece WhatsApp y correo', () => {
  assert.match(html, /contact-fab/);
  assert.match(html, /contact-popover/);
  assert.match(html, /wa\.me\/51960247396/);
  assert.match(html, /whatsapp-icon/);
  assert.match(html, /mailto:digitalflowperu@gmail\.com/);
  assert.doesNotMatch(html, /floating-contact/);
});

test('el nombre para compartir usa DigitalFlow', () => {
  assert.match(html, /og:site_name.*DigitalFlow \| Perú/);
  assert.match(html, /<title>DigitalFlow \| Perú/);
});

# 🎠 SimpleCarouselJS

C'est un carousel léger, responsive, personnalisable et sans dépendance, développé en JavaScript moderne.

---

## 🧩 Fonctionnalités

✅ Support des animations slide et fade
✅ Navigation précédent / suivant
✅ Pagination dynamique
✅ Autoplay (avec pause au survol)
✅ Responsive & moderne
✅ Accessibilité : ARIA + navigation clavier
✅ Léger, sans dépendance externe

---

## 📦 Installation

```bash
npm install simple-carousel-js
```

## Ou en incluant directement le script dans votre HTML

```html
<script src="carousel.js"></script>
<link rel="stylesheet" href="carousel.css" />
```

## 🚀 Utilisation Basique

Vous pouvez utiliser cette structure HTML par defaut ci dessous:

```html
<div class="carousel">
  <div class="carousel-slide">Slide 1</div>
  <div class="carousel-slide">Slide 2</div>
  <div class="carousel-slide">Slide 3</div>
  <button class="carousel-prev">←</button>
  <button class="carousel-next">→</button>
</div>
```

```js
import Carousel from "simple-carousel-js";

new Carousel({
  selector: ".carousel",
  autoplay: true,
  interval: 5000,
  loop: true,
  animation: "slide",
});
```

## ⚙️ Options disponibles

Voici la liste des options disponibles lors de l'initialisation du carousel :

| Option      | Type      | Par défaut          | Description                                                       |
| ----------- | --------- | ------------------- | ----------------------------------------------------------------- |
| `selector`  | `string`  | `.carousel`         | Sélecteur du conteneur principal du carousel                      |
| `autoplay`  | `boolean` | `false`             | Active ou désactive la lecture automatique                        |
| `interval`  | `number`  | `3000`              | Intervalle en millisecondes entre les slides en autoplay          |
| `loop`      | `boolean` | `false`             | Active ou non le retour au premier slide à la fin                 |
| `animation` | `string`  | `"slide"`           | Type d'animation : `"slide"` ou `"fade"`                          |
| `selectors` | `object`  | _(voir ci-dessous)_ | Permet de personnaliser les noms de classes utilisés dans le HTML |

## 🎯 selectors (personnalisation des classes)

Vous pouvez modifier les noms des classes utilisées dans votre HTML pour qu'elles correspondent à votre propre structure CSS. Voici la structure par défaut :

```js
selectors: {
  slide: ".carousel-slide",
  prevBtn: ".carousel-prev",
  nextBtn: ".carousel-next",
  dot: ".carousel-dot",
  paginationContainer: ".carousel-pagination"
}
```

### Exemple d'utilisation avec des classes personnalisées :

```js
new Carousel({
  selector: "#mon-carousel",
  autoplay: true,
  animation: "fade",
  selectors: {
    slide: ".mon-slide",
    prevBtn: ".btn-gauche",
    nextBtn: ".btn-droite",
    dot: ".puce",
    paginationContainer: ".pagination",
  },
});
```

## Assurez-vous que votre HTML correspond bien à ces nouvelles classes :

```html
<div id="mon-carousel">
  <div class="mon-slide">1</div>
  <div class="mon-slide">2</div>
  <div class="mon-slide">3</div>

  <button class="btn-gauche">←</button>
  <button class="btn-droite">→</button>

  <div class="pagination"></div>
</div>
```

## 💡 Exemples d'intégration

Avec plusieurs carousels sur une page
Avec du contenu HTML dans les slides
Avec des styles CSS personnalisés

## 🎨 Personnalisation via CSS

Le module SimpleCarouselJS est livré avec un style moderne, responsive et accessible par défaut, utilisant des variables CSS. Vous pouvez facilement les surcharger dans votre propre CSS pour adapter le design à votre site.

## 🧩 Variables CSS disponibles

Voici la liste des variables que vous pouvez redéfinir :

```css
:root {
  --carousel-width: 90%;
  --carousel-max-width: 600px;
  --carousel-height: auto;
  --carousel-bg: #eee;
  --dot-active-color: #333;
  --dot-inactive-color: #ccc;
  --arrow-bg: rgba(0, 0, 0, 0.5);
  --arrow-color: #fff;
  --transition-duration: 0.7s;
}
```

## 💡 Exemple de surcharge

```css
:root {
  --carousel-width: 100%;
  --carousel-max-width: 800px;
  --carousel-bg: #fff;
  --dot-active-color: #007bff;
  --arrow-bg: rgba(0, 0, 0, 0.6);
}
```

## NOTE:Vous pouvez aussi modifier la classe .carousel, .carousel-slide, .carousel-dot, etc., directement dans votre feuille de style pour un contrôle total.

```css
.carousel {
  position: relative;
  overflow: hidden;
}

.carousel-slide {
  width: 100%;
  flex-shrink: 0;
}

.carousel-,
.carousel-pagination {
  position: absolute;
  z-index: 10;
}
/* Les animations sont contrôlées par la classe CSS : */
.carousel--fade .carousel-slide {
  transition: opacity 0.5s ease;
}
```

## NOTE: Si vous utiliser votre propre structure html assurez vous que ca correspond bien au css

### 📱 Responsive intégré

Le style par défaut utilise @media pour s'adapter aux petits écrans (max-width: 768px). Vous pouvez personnaliser le aspect-ratio, la taille des flèches, la taille de la police, etc., en fonction de vos besoins.

Vous pouvez styliser librement le carousel :

## 📦 À venir dans les prochaines versions

Support du swipe mobile
Callback personnalisé (onSlideChange)
Thèmes CSS modernes
Support de plusieurs types d’animations (zoom, etc.)
🛠 Développement

## 🧑‍💻 Contribution

```bash
git clone https://github.com/ton-nom/carousel.git
cd carousel
npm install
npm run dev
```

Les contributions sont les bienvenues ! Créez une issue ou une pull request.

## 📄 Licence

MIT © @Mouridev

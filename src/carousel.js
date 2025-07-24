export default class Carousel {
  constructor(options = {}) {
    // 1. Définir les options par défaut
    const defaults = {
      selector: ".carousel", // classe du container
      autoplay: false, // pas d'autoplay par défaut
      interval: 3000, // 3 secondes entre chaque slide
      loop: false, // ne boucle pas par défaut
      animation: "slide", // type d’animation
      selectors: {
        slide: ".carousel-slide", // classe des slides
        prevBtn: ".carousel-prev", // classe du bouton précédent
        nextBtn: ".carousel-next", // classe du bouton suivant
        dot: ".carousel-dot", // classe des dots de pagination
        paginationContainer: ".carousel-pagination", // (facultatif pour le moment)
      },
    };

    // 2. Fusionner avec les options passées par l'utilisateur
    this.options = { ...defaults, ...options };

    // 3. Récupérer le container DOM
    this.container = document.querySelector(this.options.selector);

    // 4. Vérification
    if (!this.container) {
      throw new Error(
        `Carousel: Aucun élément trouvé pour le sélecteur ${this.options.selector}`
      );
    }

    // 5. Initialiser l'état interne
    this.index = 0;
    this.timer = null;
    this.slides = [];

    // 6. Initialiser le carousel
    this.init();
  }

  init() {
    // Récupérer les slides à l'intérieur du container
    this.slides = this.container.querySelectorAll(this.options.selectors.slide);
    if (this.slides.length === 0) {
      throw new Error(
        "Carousel: Aucun slide trouvé (classe .carousel-slide attendue)"
      );
    }
    // Debug
    console.log(`Carousel initialisé avec ${this.slides.length} slide(s)`);

    // Attributs ARIA pour l'accessibilité
    this.container.setAttribute("role", "region");
    this.container.setAttribute("aria-label", "Carousel d’images");

    this.slides.forEach((slide, i) => {
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "slide");
    });

    this.showSlide(this.index); // Affiche le slide initial
    this.bindNavigationButtons(); // Active les boutons
    this.startAutoplay(); // Démarre l'autoplay si activé
    this.initPagination(); // Initialise la pagination
    this.container.setAttribute("data-animation", this.options.animation); // Définit l'animation
    this.container.addEventListener("mouseenter", () => this.stopAutoplay());
    this.container.addEventListener("mouseleave", () => this.startAutoplay());

    // TO DO : ajouter navigation, autoplay, animation, etc.
  }
  // Méthodes pour la navigation
  showSlide(index) {
    // Sécurité : s'assurer que l'index est dans les bornes
    if (index < 0 || index >= this.slides.length) return;

    // Retirer la classe "active" de tous les slides
    this.slides.forEach((slide, i) => {
      slide.classList.remove("active");
      slide.setAttribute("aria-hidden", i !== index);
    });

    // Ajouter la classe "active" au slide ciblé
    this.slides[index].classList.add("active");

    // Mettre à jour l’index courant
    this.index = index;
    // Mettre à jour la pagination si elle existe
    this.updatePagination();
  }

  showNext() {
    let nextIndex = this.index + 1;

    // Si on atteint la fin
    if (nextIndex >= this.slides.length) {
      if (this.options.loop) {
        nextIndex = 0;
      } else {
        return; // Ne rien faire si on ne veut pas boucler
      }
    }

    this.showSlide(nextIndex);
  }

  showPrev() {
    let prevIndex = this.index - 1;

    // Si on est au début
    if (prevIndex < 0) {
      if (this.options.loop) {
        prevIndex = this.slides.length - 1;
      } else {
        return;
      }
    }

    this.showSlide(prevIndex);
  }

  bindNavigationButtons() {
    const prevBtn = this.container.querySelector(
      this.options.selectors.prevBtn
    );
    const nextBtn = this.container.querySelector(
      this.options.selectors.nextBtn
    );

    if (prevBtn) {
      prevBtn.addEventListener("click", () => this.showPrev());
      prevBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.showPrev();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => this.showNext());
      nextBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.showNext();
        }
      });
    }
  }
  // Méthode pour démarrer l'autoplay
  startAutoplay() {
    if (!this.options.autoplay) return;

    this.timer = setInterval(() => {
      this.showNext();
    }, this.options.interval);
  }
  // Méthode pour arrêter l'autoplay
  stopAutoplay() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
  // Methode pour gerer la pagination
  initPagination() {
    // Créer un conteneur pour les dots
    this.paginationContainer = document.createElement("div");
    this.paginationContainer.classList.add(
      this.options.selectors.paginationContainer.replace(".", "")
    );

    // Créer un dot pour chaque slide
    this.slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.classList.add(this.options.selectors.dot.replace(".", ""));
      if (i === this.index) dot.classList.add("active");

      dot.setAttribute("data-index", i);

      dot.setAttribute("aria-label", `Aller au slide ${i + 1}`);
      dot.setAttribute("aria-controls", this.slides[i].id || `slide-${i}`);
      // Events
      dot.addEventListener("click", () => {
        this.showSlide(i);
      });

      this.paginationContainer.appendChild(dot);
    });

    // Ajouter le conteneur à la fin du carousel
    this.container.appendChild(this.paginationContainer);
  }

  updatePagination() {
    if (!this.paginationContainer) return;
    const dots = this.paginationContainer.querySelectorAll(
      this.options.selectors.dot
    );

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === this.index);
    });
  }
}

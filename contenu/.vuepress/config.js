module.exports = {
    title: "Meubles design",
    themeConfig: {
      nav: [
        {
          text: "Boutique",
          link: "/boutique"
        },
        {
          text: "Créations",
          link: "/creations"
        },
        {
            text: "Conseils",
            link: "/blog"
        },
        {
            text: "A propos",
            link: "/about"
        },
      ]
    },
    head: [
      ['script', { type : "text/javascript", src : "https://cdn.jsdelivr.net/npm/lozad/dist/lozad.min.js" }],
      ['script', { type : "text/javascript", src : "https://checkout.stripe.com/checkout.js" }],
    ],
    postcss: {
        plugins: [
          require("tailwindcss")("./tailwind.config.js"),
          require("autoprefixer")
        ]
    }
  };

module.exports = {
    title: "Maké Maké",
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
    postcss: {
        plugins: [
          require("tailwindcss")("./tailwind.config.js"),
          require("autoprefixer")
        ]
    }
  };

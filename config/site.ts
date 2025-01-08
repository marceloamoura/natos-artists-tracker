export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Natos - Radar de Artistas",
  description: "Natos - Radar de Artistas é uma aplicação web que permite a visualização de informações sobre artistas musicais.",
  navItems: [
    {
      label: "Início",
      href: "/",
    },
    {
      label: "Gráficos",
      href: "/graficos",
    },
    {
      label: "Artístas",
      href: "/artistas",
    },
  ],
  navMenuItems: [
    {
      label: "Início",
      href: "/",
    },
    {
      label: "Gráficos",
      href: "/graficos",
    },
    {
      label: "Artístas",
      href: "/artistas",
    },
  ],
  links: {
    github: "https://github.com/NonattoDev/natos-artists-tracker",
    instagram: "https://www.instagram.com/natosentretenimento/",
  },
};

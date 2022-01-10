export const links = [
  {
    url: "https://juicebox.money/#/p/satrabrunndao",
    label: "juicebox",
  },
  {
    url: "https://twitter.com/SatraBrunn",
    label: "twitter",
  },
  {
    url: "https://discord.gg/aDZJNKtuY4",
    label: "discord",
  },
  {
    url:
      "https://satrabrunn.notion.site/S-tra-Brunn-DAO-Notion-2ecbecf19ac3455a83ef6b6206e193bc",
    label: "notion",
  },
  {
    url: "https://github.com/filipv-eth/SatraBrunnDAO-interface",
    label: "github",
  },
];

export const linkLabels = {
  juicebox: 0,
  twitter: 1,
  discrod: 2,
  notion: 3,
  github: 4,
};

export function getLink(label) {
  return links[linkLabels[label]]?.url;
}

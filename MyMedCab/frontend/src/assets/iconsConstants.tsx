// Auto-generated mapping for icon assets.
// Drop icon files into `src/assets/icons/` and they'll be available via this map.

type IconMap = Record<string, string>;

// Use Vite's import.meta.glob to lazily import assets and expose their URLs.
// This will include any file inside `src/assets/icons`.
const modules = import.meta.glob("../assets/icons/**", {
  as: "url",
  eager: true,
});

// Build a friendly map: use the filename (without folders) as the key by default.
const icons: IconMap = {};

Object.entries(modules).forEach(([path, url]) => {
  // path example: '../assets/icons/foo.svg' or '../assets/icons/set/foo.svg'
  const parts = path.split("/");
  const filename = parts[parts.length - 1];
  const key = filename.replace(/\.[^/.]+$/, ""); // remove extension
  icons[key] = url as string;
});

export const getIcon = (name: string): string | undefined => icons[name];

export default icons;

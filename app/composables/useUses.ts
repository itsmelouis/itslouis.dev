export interface UsesItem {
  /** Iconify name — Lucide (`i-lucide-*`) for hardware, Simple Icons (`i-simple-icons-*`) for brands. */
  icon: string
  name: string
  note?: string
  /** Short role label shown above the name in the `grid` layout (e.g. `CPU`, `GPU`). */
  label?: string
  /** External link to the product or project. Omit for items without a canonical page. */
  to?: string
}

export interface UsesCategory {
  name: string
  slug: string
  /** `list` (default) renders hairline rows; `grid` renders product cards. */
  layout?: 'list' | 'grid'
  items: UsesItem[]
}

export function useUses(): UsesCategory[] {
  return [
    {
      name: 'Hardware',
      slug: 'hardware',
      items: [
        { icon: 'i-lucide-laptop', name: 'MacBook Air M2', note: 'My daily driver', to: 'https://www.apple.com/macbook-air/' },
        { icon: 'i-lucide-monitor', name: 'Samsung Odyssey G50D', note: '27" · QHD 1440p · 180 Hz Fast IPS', to: 'https://amzn.to/44jXjQo' },
        { icon: 'i-lucide-keyboard', name: 'EPOMAKER × Aula F75', note: '75% gasket · LEOBOG Reaper switches', to: 'https://amzn.to/4ozsmkw' },
        { icon: 'i-lucide-mouse', name: 'Endgame Gear XM2we', note: 'Wireless mouse', to: 'https://amzn.to/3QaOxkv' },
        { icon: 'i-lucide-headphones', name: 'Sony WH-1000XM6', note: 'Noise-cancelling headphones', to: 'https://amzn.to/3QRrCe7' },
      ],
    },
    {
      name: 'Desktop',
      slug: 'desktop',
      layout: 'grid',
      items: [
        { icon: 'i-lucide-cpu', label: 'CPU', name: 'AMD Ryzen 7 9800X3D', note: '8 cores · 5.2 GHz · 3D V-Cache', to: 'https://amzn.to/4w2RwL6' },
        { icon: 'i-simple-icons-amd', label: 'GPU', name: 'Sapphire Pure RX 9070 XT Gaming OC', note: '16 GB GDDR6', to: 'https://www.amazon.fr/dp/B0DRPRKYR6?tag=itslouis04-21' },
        { icon: 'i-lucide-memory-stick', label: 'RAM', name: 'Kingston FURY Beast RGB', note: '16 GB (2×8) · DDR5-6000 · CL30', to: 'https://amzn.to/4vnhqsZ' },
        { icon: 'i-lucide-circuit-board', label: 'Motherboard', name: 'GIGABYTE B850 AORUS Elite WiFi7 Ice', note: 'AM5 · DDR5 · Wi-Fi 7', to: 'https://amzn.to/4guffPt' },
        { icon: 'i-lucide-hard-drive', label: 'Storage', name: 'Crucial T500', note: '2× 1 TB · NVMe Gen4 · 7300 MB/s', to: 'https://amzn.to/4oDq7wI' },
        { icon: 'i-lucide-plug-zap', label: 'PSU', name: 'Corsair RM1000x SHIFT', note: '1000 W · 80+ Gold · ATX 3.1', to: 'https://amzn.to/4vlc3KV' },
        { icon: 'i-lucide-computer', label: 'Case', name: 'Corsair Frame 4000D RS ARGB', note: 'Mid-tower ATX · White', to: 'https://amzn.to/44iI9Lb' },
        { icon: 'i-lucide-fan', label: 'Cooling', name: 'ARCTIC Liquid Freezer III Pro 360', note: '360 mm AIO · A-RGB', to: 'https://amzn.to/4gv7aKs' },
      ],
    },
    {
      name: 'Editor',
      slug: 'editor',
      items: [
        { icon: 'i-simple-icons-zedindustries', name: 'Zed', note: 'My main editor', to: 'https://zed.dev' },
        { icon: 'i-lucide-palette', name: 'Vitesse · Aura', note: 'Light themes' },
        { icon: 'i-lucide-type', name: 'Geist Mono', note: 'Nerd Font patched', to: 'https://vercel.com/font' },
        { icon: 'i-simple-icons-visualstudio', name: 'Visual Studio', note: 'C# at work · Vitesse theme', to: 'https://visualstudio.microsoft.com' },
      ],
    },
    {
      name: 'Terminal',
      slug: 'terminal',
      items: [
        { icon: 'i-simple-icons-ghostty', name: 'Ghostty', note: 'Terminal emulator', to: 'https://ghostty.org' },
        { icon: 'i-simple-icons-zsh', name: 'zsh', note: 'Shell', to: 'https://www.zsh.org' },
        { icon: 'i-simple-icons-starship', name: 'Starship', note: 'Cross-shell prompt', to: 'https://starship.rs' },
        { icon: 'i-simple-icons-nvm', name: 'nvm', note: 'Node version manager', to: 'https://github.com/nvm-sh/nvm' },
        { icon: 'i-simple-icons-pnpm', name: 'pnpm', note: 'Package manager · via Corepack', to: 'https://pnpm.io' },
      ],
    },
    {
      name: 'Software',
      slug: 'software',
      items: [
        { icon: 'i-simple-icons-zenbrowser', name: 'Zen Browser', note: 'Main browser', to: 'https://zen-browser.app' },
        { icon: 'i-simple-icons-googlechrome', name: 'Google Chrome', note: 'Streaming & DRM video', to: 'https://www.google.com/chrome/' },
        { icon: 'i-simple-icons-microsoftteams', name: 'Microsoft Teams', note: 'Work comms', to: 'https://www.microsoft.com/microsoft-teams' },
        { icon: 'i-simple-icons-raycast', name: 'Raycast', note: 'Launcher & productivity', to: 'https://raycast.com' },
        { icon: 'i-simple-icons-homebrew', name: 'Homebrew', note: 'macOS package manager', to: 'https://brew.sh' },
      ],
    },
  ]
}

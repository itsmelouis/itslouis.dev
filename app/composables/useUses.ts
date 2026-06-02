export interface UsesItem {
  /** Iconify name — Lucide (`i-lucide-*`) for hardware, Simple Icons (`i-simple-icons-*`) for brands. */
  icon: string
  name: string
  note?: string
  /** External link to the product or project. Omit for items without a canonical page. */
  to?: string
}

export interface UsesCategory {
  name: string
  slug: string
  items: UsesItem[]
}

export function useUses(): UsesCategory[] {
  return [
    {
      name: 'Hardware',
      slug: 'hardware',
      items: [
        { icon: 'i-lucide-laptop', name: 'MacBook Air M2', note: 'My daily driver', to: 'https://www.apple.com/macbook-air/' },
        { icon: 'i-lucide-cpu', name: 'Custom desktop', note: 'Specs coming soon™' },
        { icon: 'i-lucide-monitor', name: 'Samsung Odyssey G50D', note: '27" · QHD 1440p · 180 Hz Fast IPS', to: 'https://www.amazon.com/s?k=Samsung+Odyssey+G50D' },
        { icon: 'i-lucide-keyboard', name: 'EPOMAKER × Aula F75', note: '75% gasket · LEOBOG Reaper switches', to: 'https://www.amazon.com/s?k=EPOMAKER+Aula+F75' },
        { icon: 'i-lucide-mouse', name: 'Endgame Gear XM2we', note: 'Wireless mouse', to: 'https://www.amazon.com/s?k=Endgame+Gear+XM2we' },
        { icon: 'i-lucide-headphones', name: 'Sony WH-1000XM6', note: 'Noise-cancelling headphones', to: 'https://www.amazon.com/s?k=Sony+WH-1000XM6' },
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

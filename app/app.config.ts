export default defineAppConfig({
  ui: {
    prose: {
      codeIcon: {
        sh: 'i-vscode-icons-file-type-shell',
      },
    },
    colors: {
      primary: 'graphite',
      neutral: 'graphite',
    },
    tooltip: {
      slots: {
        content: 'flex items-center gap-1 bg-neutral-800 dark:bg-neutral-200 text-neutral-100 dark:text-neutral-900 shadow-md rounded-md px-2.5 py-1 text-xs font-mono select-none pointer-events-auto data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-tooltip-content-transform-origin)',
      },
    },
  },
})

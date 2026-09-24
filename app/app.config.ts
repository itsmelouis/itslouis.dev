export default defineAppConfig({
  ui: {
    prose: {
      codeIcon: {
        sh: 'i-vscode-icons-file-type-shell',
      },
      callout: {
        variants: {
          color: {
            primary: {
              base: 'text-primary-800 [&_a]:text-primary-800 [&_code]:text-primary-800 dark:[&_a]:text-primary-300',
              externalIcon: 'text-primary-800',
            },
            secondary: {
              base: 'text-secondary-800 [&_a]:text-secondary-800 [&_code]:text-secondary-800 dark:[&_a]:text-secondary-300',
              externalIcon: 'text-secondary-800',
            },
            success: {
              base: 'text-success-800 [&_a]:text-success-800 [&_code]:text-success-800 dark:[&_a]:text-success-300',
              externalIcon: 'text-success-800',
            },
            info: {
              base: 'text-info-800 [&_a]:text-info-800 [&_code]:text-info-800 dark:[&_a]:text-info-300',
              externalIcon: 'text-info-800',
            },
            warning: {
              base: 'text-warning-800 [&_a]:text-warning-800 [&_code]:text-warning-800 dark:[&_a]:text-warning-300',
              externalIcon: 'text-warning-800',
            },
            error: {
              base: 'text-error-800 [&_a]:text-error-800 [&_code]:text-error-800 dark:[&_a]:text-error-300',
              externalIcon: 'text-error-800',
            },
          },
        },
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

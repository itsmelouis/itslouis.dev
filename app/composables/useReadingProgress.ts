import { useWindowScroll } from '@vueuse/core'

export function useReadingProgress(target: Ref<HTMLElement | null>) {
  const { y } = useWindowScroll()

  const progress = computed(() => {
    if (!import.meta.client || !target.value)
      return 0
    void y.value // reactive dependency on scroll
    const { top, height } = target.value.getBoundingClientRect()
    const scrolled = -top // positive once we've scrolled past article top
    const total = height - window.innerHeight
    if (total <= 0)
      return scrolled > 0 ? 100 : 0
    return Math.min(100, Math.max(0, (scrolled / total) * 100))
  })

  return { progress }
}

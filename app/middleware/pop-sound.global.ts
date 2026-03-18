export default defineNuxtRouteMiddleware(() => {
  if (import.meta.client) {
    new Audio('/pop.mp3').play().catch(() => null)
  }
})

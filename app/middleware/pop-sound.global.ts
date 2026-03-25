export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client && to.path !== from.path) {
    new Audio('/pop.mp3').play().catch(() => null)
  }
})

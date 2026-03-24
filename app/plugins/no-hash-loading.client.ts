export default defineNuxtPlugin(() => {
  const router = useRouter()
  const { finish } = useLoadingIndicator()

  router.beforeEach((to, from) => {
    if (to.path === from.path) {
      finish()
    }
  })
})

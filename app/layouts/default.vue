<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex-1 px-8 pt-24 pb-8">
      <slot />
    </main>
    <SpotifyCard />
    <PresenceIndicator />
  </div>
</template>

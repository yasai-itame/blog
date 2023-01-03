<template>
  <div class="flex">
    <Sidebar />
    <div class="w-10/12">
      <NuxtErrorBoundary>
        <NuxtPage />
      </NuxtErrorBoundary>
    </div>
  </div>
  <Footer />
</template>

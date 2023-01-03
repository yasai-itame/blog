<template>
  <section class="bg-gradient-to-r from-blue-300 via-green-200 to-yellow-300">
    <div class="container px-6 py-10 mx-auto" style="height: 100vh; position: relative;">
      <div class="grid px-4 place-content-center" :style="centerStyle">
        <div class="text-center">
          <h1 class="font-medium">404</h1>

          <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            お探しのページはございません。
          </p>
          <a
            href="/"
            class="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
let centerStyle = {
  'position': 'absolute',
  'top': '50%',
  'left': '50%',
  'transform': 'translate(-50%, -50%)'
}
</script>
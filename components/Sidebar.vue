<template>
  <div class="flex flex-col w-1/6 px-4 py-8 bg-amber-200">
    <h2 class="text-3xl font-semibold text-center text-gray-800 dark:text-white">Note</h2>

    <div class="flex flex-col items-center mt-6 -mx-2">
      <img class="object-cover w-24 h-20 mx-2 rounded-full" src="@/assets/img/food_yasaiitame.png" alt="avatar">
      <p class="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">個人用の備忘録</p>
    </div>

    <div class="flex flex-col justify-between flex-1 mt-6">
      <nav>
        <NuxtLink to="/" class="flex items-center px-4 py-2" :class="topClass">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="mx-4 font-medium">All</span>
        </NuxtLink>

        <NuxtLink v-for="item in items" :key="item.id" :to="`/category/${item.id}`" class="flex items-center px-4 py-2 mt-5" :class="{'text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200': item.id === Number(idClass), 'text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700': item.id !== Number(idClass)}">
          <img :src="`${logoImgPath(item.name)}`" class="w-5 h-5" :alt="item.name">
          <span class="mx-4 font-medium">{{item.name}}</span>
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue"

const { data: results } = await useFetch('http://yuukishouda.wp.xdomain.jp/wp-json/wp/v2/categories')
const route = useRoute()
const { id } = route.params

type CategoryCheck = {
  id: number,
  name: string,
  slug: string
}

const logoImgPath = (name) => {
  return new URL(`../assets/img/logo_${name}.svg`, import.meta.url).href
}

let items = ref<CategoryCheck[]>([])
let topClass = ref('')
let idClass = ref('')
watch(() => route.params, (newValue) => {
  topClass.value = '/' === route.path ? 'text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200' : 'text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700'
  idClass.value = newValue.id
}, {immediate: true})
onMounted(() => {
  items.value = results.value
})
</script>
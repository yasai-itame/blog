<template>
  <section class="bg-gradient-to-r from-blue-300 via-green-200 to-yellow-300">
    <div class="container px-6 py-10 mx-auto">

      <h1 v-if="items[0]" class="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">{{items[0]['category_name']}}</h1>
      <div v-if="items.length" class="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
        <div v-for="item in items" :key="item.id" class="lg:flex">
          <img class="object-contain max-md:w-full h-56 rounded-lg" :src="logoImgPath(item.category_name)" :alt="item.category_name">
          <div class="flex flex-col justify-between py-6 lg:mx-6">
            <span class="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
              <NuxtLink :to="`/category/${item.categories[0]}`">{{item.category_name}}</NuxtLink>
            </span>
            <NuxtLink class="text-xl font-semibold text-gray-800 hover:underline dark:text-white" :to="`/detail/${item.id}`">
              {{item.title.rendered}}
            </NuxtLink>
            <span class="text-sm text-gray-500 dark:text-gray-300">{{dateAction(item.date)}}</span>
          </div>
        </div>
      </div>

      <div :class="{'is-hidden': loadCheck}">
        <div :style="loadingStyle">
          <InfiniteLoading @infinite="loadData" />
        </div>
      </div>

      <div v-if="pending">
        <div class="flex justify-center my-20">
          <div class="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full" style="border-top-color: transparent"></div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import { ref, onMounted } from "vue"
const route = useRoute()
const { id } = route.params

let loadingStyle = {
  'display': 'flex',
  'justify-content': 'center',
  'padding': '40px 0 0'
}

let totalPages = ref<number>(0)
let countPages = ref<number>(1)
let loadCheck = ref<Boolean>(false)
const { data: results, pending, error, refresh } = await useAsyncData('categories', () => $fetch(`http://yuukishouda.wp.xdomain.jp/wp-json/wp/v2/posts?page=1&per_page=10&categories=${id}`, {
  onResponse({ response }) {
    totalPages.value = Number(response.headers.get('X-WP-TotalPages'))
  }
}))

const loadData = async ($state) => {
  if (totalPages.value !== 1 && countPages.value < totalPages.value) {
    countPages.value++
    const { data: results, pending, error, refresh } = await useAsyncData('posts', () => $fetch(`http://yuukishouda.wp.xdomain.jp/wp-json/wp/v2/posts?page=${countPages.value}&per_page=10&categories=${id}`))
    results.value.forEach((v) => {
      items.value.push(v)
    })
    $state.loaded()
    if (countPages.value === totalPages.value) { 
      $state.complete()
      loadCheck.value = true
    }
  } else {
    $state.complete()
    loadCheck.value = true
  }
}

const { $dayjs } = useNuxtApp()

type AcfCheck = {
  [key: string]: string
}

type TitleCheck = {
  [key: string]: string
}

type DataCheck = {
  id: number,
  title: TitleCheck,
  acf: AcfCheck,
  date: string
}

const dateAction = (date:string):string => {
  return $dayjs(date).format('YYYY.MM.DD')
}

const logoImgPath = (name) => {
  return new URL(`../../assets/img/logo_${name}.svg`, import.meta.url).href
}

let items = ref<DataCheck[]>(0)
refresh()
onMounted(() => {
  items.value = results.value
})
</script>

<style lang="scss">
.is-hidden {
  display: none;
}
</style>
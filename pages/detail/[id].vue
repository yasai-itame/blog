<template>
  <section class="bg-gradient-to-r from-blue-300 via-green-200 to-yellow-300">
    <div class="container px-6 py-10 mx-auto">
      <div v-if="pending">
        <div class="flex justify-center my-20">
          <div class="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full" style="border-top-color: transparent"></div>
        </div>
      </div>
      <h1 v-if="items" class="text-3xl font-semibold text-gray-800 lg:text-4xl dark:text-white">{{items.title.rendered}}<small class="ml-4 text-sm font-semibold text-gray-500 dark:text-gray-400">{{dateAction(items.date)}}</small></h1>
      <div class="mt-8 md:mt-16" v-if="items.acf" v-html="items.acf['comment_source-code']">
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
const route = useRoute()
const { id } = route.params
const { data: results, pending, error, refresh } = await useAsyncData(
  'posts',
  () => $fetch(`wordpressのurl/wp-json/wp/v2/posts/${id}`)
)
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
onMounted(() => {
  items.value = results.value
})
</script>
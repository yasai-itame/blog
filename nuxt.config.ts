// https://nuxt.com/docs/api/configuration/nuxt-config
import axios from 'axios'
// import path from 'path'

let idGet = async () => {
  let page = await axios.get('http://yuukishouda.wp.xdomain.jp/wp-json/wp/v2/posts?page=1&per_page=100')
  let pageMax = page.headers['x-wp-totalpages']
  let idBox = []
  if (Number(pageMax) === 1) {
    for (let i = 0; i < page.data.length; i++) {
      idBox.push('/detail/' + page.data[i]['id'])
    }
  } else {
    let result
    for (let i = 1; i <= Number(pageMax); i++) {
      result = await axios.get(`http://yuukishouda.wp.xdomain.jp/wp-json/wp/v2/posts?page=${i}&per_page=100`)
      result.data.forEach((v: any) => {
        idBox.push('/detail/' + v.id)
      })
    }
  }
  return idBox
}

let categoryGet = async () => {
  let page = await axios.get('http://yuukishouda.wp.xdomain.jp/wp-json/wp/v2/categories?page=1&per_page=100')
  let pageMax = page.headers['x-wp-totalpages']
  let categoryBox = []
  if (Number(pageMax) === 1) {
    for (let i = 0; i < page.data.length; i++) {
      categoryBox.push('/category/' + page.data[i]['id'])
    }
  } else {
    let result
    for (let i = 1; i <= Number(pageMax); i++) {
      result = await axios.get(`http://yuukishouda.wp.xdomain.jp/wp-json/wp/v2/categories?page=${i}&per_page=100`)
      result.data.forEach((v: any) => {
        categoryBox.push('/category/' + v.id)
      })
    }
  }
  return categoryBox
}

export default defineNuxtConfig({
  // alias: {
  //   'components': path.resolve('components'),
  // },
  hooks: {
    async 'nitro:config' (nitroConfig) {
      if (nitroConfig.dev) { return }
      let id = await idGet()
      let category = await categoryGet()
      nitroConfig.prerender?.routes?.push(...id, ...category)
      return
    }
  },
  app: {
    baseURL: '/blog',
  },
  css: ['~/assets/css/main.css', 'highlight.js/styles/a11y-dark.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: true,
  experimental: {
    payloadExtraction: false
  }
})

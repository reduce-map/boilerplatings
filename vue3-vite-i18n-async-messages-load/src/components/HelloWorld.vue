<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)

const viteRef = 'https://vitejs.dev/'
const vueRef = 'https://vuejs.org/'
</script>

<template>
  <h1>{{ msg }}</h1>

  <label for="locale">Locale: </label>
  <select v-model="$i18n.locale" id="locale">
    <option v-for="locale in $i18n.availableLocales" :value="locale">
      {{ locale }}
    </option>
  </select>

  <h1 class="green">{{ $t('title') }}</h1>

  <p> with v-html: </p>

  <h3 v-html="$t('description', { viteRef: viteRef, vueRef: vueRef })"></h3>

  <p> without v-html (no links): </p>

  <h3> {{ $t('description', { 'viteRef': viteRef, 'vueRef': vueRef}) }}</h3>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank">Vue Docs Scaling up Guide</a>.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

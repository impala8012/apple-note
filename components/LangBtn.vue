<template>
  <div>
    <button class="text-[#6D6D73] hover:text-white" @click="setLang('en')">
      English
    </button>
    <button class="text-[#6D6D73] hover:text-white" @click="setLang('zh-tw')">
      中文
    </button>
  </div>
</template>

<script setup lang="ts">
const { setLocale } = useI18n();

// 切換語系
const setLang = (code: string) => {
  setLocale(code);
};
</script>

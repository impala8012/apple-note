<template>
  <div class="relative" ref="dropdownRef" @click="toggleDropdown">
    <Button
      :isActive="props.isActive"
      :size="props.size"
      :title="props.title"
      @click="toggleDropdown"
    >
      <component
        @click="toggleDropdown"
        :is="props.icon"
        class="p-1"
        :color="props.isActive?.() ? `${props.currentColor}` : '#595959'"
      />
    </Button>

    <transition name="fade">
      <div
        v-if="isOpen"
        class="absolute left-0 w-24 bg-white border border-gray-300 rounded shadow-lg z-50"
      >
        <ul class="text-gray-700">
          <li
            v-for="option in options"
            :key="option.value"
            @click="selectOption(option)"
            class="flex justify-between items-center px-2 py-1 hover:bg-gray-100 cursor-pointer text-xs"
          >
            <span>{{ option.label }}</span>
            <span
              class="rounded-full w-3.5 h-3.5 border-2"
              :style="{ backgroundColor: option.color }"
            >
            </span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import Button from "../Button/Button.vue";
import type { ColorOption } from "~/types/type.ts";

// 引用語系
const { t } = useI18n();

const props = defineProps<{
  size?: string | undefined;
  icon: Component;
  title?: string | undefined;
  isActive?: () => boolean | undefined;
  currentColor: string;
}>();

// 是否開關
const isOpen = ref<boolean>(false);
// 下拉選單元素
const dropdownRef = ref<HTMLElement | null>(null) as Ref<HTMLElement>;

const emit = defineEmits<{
  click: [color: string];
}>();

// 選項值
const options: Ref<ColorOption[]> = ref([
  { label: t("default"), value: "default", color: "#595959" },
  { label: t("purple"), value: "purple", color: "#958DF1" },
  { label: t("red"), value: "red", color: "#F98181" },
  { label: t("orange"), value: "orange", color: "#FBBC88" },
  { label: t("green"), value: "green", color: "#B9F18D" },
  { label: t("blue"), value: "blue", color: "#70CFF8" },
]);

// 下拉選單開關
const toggleDropdown = (): void => {
  isOpen.value = !isOpen.value;
};

// 關閉下拉選單
const closeDropdown = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value?.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

// 選取下拉選單
const selectOption = (option: ColorOption) => {
  isOpen.value = false;
  emit("click", option.color);
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

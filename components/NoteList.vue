<!-- NoteList.vue -->
<template>
  <div>
    <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">{{ title }}</p>
    <div class="ml-2 space-y-2">
      <div
        v-for="note in notes"
        :key="note.id"
        class="p-2 rounded-lg cursor-pointer"
        :class="{
          'bg-[#A1842C]': note.id === selectedNote.id,
          'hover:bg-[#A1842C]/50': note.id !== selectedNote.id,
        }"
        @click="$emit('select-note', note)"
      >
        <h3 class="text-sm font-bold text-[#F4F4F5] truncate">
          {{ removeHTMLTag(note.text) }}
        </h3>
        <div class="leading-none truncate text-[#D6D6D6]">
          <span class="text-xs text-[#F4F4F5] mr-4">
            {{ new Date(note.updatedAt).toLocaleDateString() }}
          </span>
          <span v-if="note.text.length > 50" class="text-xs text-[#D6D6D6]">
            ... {{ removeHTMLTag(note.text) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Note } from "~/types/type.ts";

const props = defineProps<{
  title: string;
  notes?: Note[];
  selectedNote: Note;
}>();

// 移除 HTML 標籤
function removeHTMLTag(html: string) {
  const data = html.length ? html.replace(/<\/?[^>]+>/gi, " ") : "";
  return data;
}
</script>

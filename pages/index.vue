<template>
  <div class="flex bg-zinc-900 h-screen">
    <!-- 側邊攔 -->
    <div
      class="bg-black w-[338px] p-8 flex flex-col overflow-x-auto no-scrollbar"
    >
      <div>
        <Logo />
      </div>

      <!-- 今日備忘錄 -->
      <NoteList
        :title="$t('today')"
        :notes="todaysNotes"
        :selected-note="selectedNote"
        @select-note="setNote"
      />
      <!-- /今日備忘錄 -->

      <!-- 昨日備忘錄 -->
      <NoteList
        :title="$t('yesterday')"
        :notes="yesterdaysNotes"
        :selected-note="selectedNote"
        @select-note="setNote"
      />
      <!-- /昨日備忘錄 -->

      <!-- 之前的備忘錄 -->
      <NoteList
        :title="$t('earlier')"
        :notes="earlierNotes"
        :selected-note="selectedNote"
        @select-note="setNote"
      />
      <!-- /之前的備忘錄 -->
    </div>
    <!-- /側邊攔 -->
    <!-- 備忘錄容器 -->
    <div class="w-full flex flex-col">
      <div class="flex justify-between w-full items-start p-8">
        <button
          :disabled="notes.length >= 1 && !selectedNote.text"
          :class="
            notes.length && !selectedNote.text ? 'cursor-not-allowed' : ''
          "
          class="inline-flex items-center text-xs text-[#C2C2C5] hover:text-white font-bold space-x-2 cursor"
          @click="createNewNote"
        >
          <PencilIcon />
          <span>{{ $t("create_note") }}</span>
        </button>

        <div class="gap-2 flex">
          <LangBtn class="gap-2 flex" />
          <button
            class="text-[#6D6D73] hover:text-white"
            @click="deleteNote"
            :disabled="notes.length === 1"
            :class="notes.length === 1 ? 'cursor-not-allowed' : ''"
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      <!-- 內容 -->
      <Loader v-if="isLoading" />
      <div v-else class="max-w-[437px] mx-auto w-full flex-grow flex flex-col">
        <p class="text-[#929292] font-playfair">
          {{
            new Date(selectedNote.updatedAt).toLocaleDateString() ||
            new Date().toLocaleDateString()
          }}
        </p>
        <TipTapEditor
          v-if="notes.length"
          :key="selectedNote?.id"
          v-model:updatedNote="updatedNote"
          :selectedNote="selectedNote"
          @input="debouncedInput"
        />
      </div>

      <button
        class="text-zinc-400 hover:text-white text-sm font-bold absolute right-0 bottom-0 p-8"
        @click="logout"
      >
        {{ $t("logout") }}
      </button>
    </div>
    <!-- /備忘錄容器 -->
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import TipTapEditor from "../components/TipTapEditor/index.vue";
import type { Note } from "~/types/type.ts";

// 引用語系
const { setLocale, t } = useI18n();

const setLang = (code: string): void => {
  setLocale(code);
};

// 編輯器內容
const updatedNote = ref<string>("");
// 備忘錄列表
const notes = ref<Note[]>([]);
// 選取的備忘錄
const selectedNote = ref<Note>({
  createdAt: "",
  id: 0,
  text: "",
  updatedAt: "",
  userId: 0,
});
// 加載狀態
const isLoading = ref<boolean>(false);

// 須執行驗證 middleware
definePageMeta({
  middleware: ["auth"],
});

/**
 * 設定當前備忘錄
 * @param {object} note 備忘錄內容
 */
function setNote(note: Note) {
  selectedNote.value = note;
  updatedNote.value = note?.text;
}

/**
 * 登出
 */
function logout() {
  const jwtCookie = useCookie("NoteJWT");
  jwtCookie.value = null;
  navigateTo("/login");
}

/**
 * 刪除備忘錄
 */
async function deleteNote() {
  if (notes.value.length === 1) return;
  const { isConfirmed } = await Swal.fire({
    title: t("alert_warning_msg_title"),
    text: t("alert_warning_msg_text"),
    icon: "warning",
    confirmButtonText: t("alert_warning_msg_yes"),
    cancelButtonText: t("alert_msg_no"),
    showCancelButton: true,
  });

  if (isConfirmed) {
    await $fetch(`/api/notes/${selectedNote.value?.id}`, {
      method: "DELETE",
    });

    const index = notes.value.findIndex((note: Note) => {
      return note?.id === selectedNote.value?.id;
    });
    notes.value.splice(index, 1);
    selectedNote.value = notes.value[0];
  }
}

/**
 * 建立備忘錄
 */
async function createNewNote() {
  // 防呆處理
  if (!selectedNote.value?.text && notes.value?.length) return;
  try {
    const newNote = await $fetch(`/api/notes`, {
      method: "POST",
    });

    notes.value.unshift(newNote);
    selectedNote.value = notes.value[0];
    updatedNote.value = "";
  } catch (err) {
    console.log(err);
  }
}

const debouncedFn = useDebounceFn(async () => {
  await updateNote();
  await getNotesList();
}, 500);

async function debouncedInput(): Promise<void> {
  selectedNote.value!.text = updatedNote.value;
  if (!selectedNote.value?.text || selectedNote.value?.text === "") return;
  await debouncedFn();
}

/**
 * 更新備忘錄
 */
async function updateNote() {
  try {
    await $fetch(`/api/notes/${selectedNote.value?.id}`, {
      method: "PATCH",
      body: {
        updatedNote: updatedNote.value,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

/**
 * 今日備忘錄
 */
const todaysNotes = computed((): Note[] => {
  return notes.value?.filter((note: Note) => {
    const noteDate = new Date(note?.updatedAt);
    return noteDate.toDateString() === new Date().toDateString();
  });
});

/**
 * 昨日備忘錄
 */
const yesterdaysNotes = computed((): Note[] => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return notes.value?.filter((note: Note) => {
    const noteDate = new Date(note?.updatedAt);
    return noteDate.toDateString() === yesterday.toDateString();
  });
});

/**
 * 之前的備忘錄
 */
const earlierNotes = computed((): Note[] => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return notes.value?.filter((note: Note) => {
    const noteDate = new Date(note?.updatedAt);
    return (
      noteDate < yesterday &&
      noteDate.toDateString() !== yesterday.toDateString()
    );
  });
});

/**
 * 取得備忘錄列表
 */
async function getNotesList(): Promise<void> {
  notes.value = await $fetch<Note[]>("/api/notes");
  notes.value?.sort(
    (a: Note, b: Note) =>
      new Date(b?.updatedAt).getTime() - new Date(a?.updatedAt).getTime()
  );
}

onMounted(async () => {
  isLoading.value = true;
  await getNotesList();
  if (notes.value?.length > 0) selectedNote.value = notes.value[0];
  else {
    await createNewNote();
    selectedNote.value = notes.value[0];
  }
  updatedNote.value = selectedNote.value?.text || "";
  isLoading.value = false;
});
</script>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>

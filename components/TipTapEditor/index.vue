<template>
  <div
    :style="`background-color:${editorBackground};`"
    class="w-full h-full overflow-hidden max-w-[610px] mx-auto my-4"
  >
    <client-only>
      <!-- 工具列 -->
      <div class="w-full top-0 z-10 sticky">
        <Toolbar class="gap-1">
          <template v-for="(item, index) in toolbarConfigs">
            <div
              v-if="item.type === 'divider'"
              class="my-1.5 border border-[#929292]"
            />
            <ColorPicker
              v-if="item.type === 'dropdown'"
              :icon="item.icon"
              :is-active="item.isActive"
              :title="item.title"
              :key="index"
              :currentColor="currentColor"
              size="30"
              @click="(color:string) => item.action(color)"
            />
            <Button
              v-if="item.type === 'button' && !item.combine"
              :is-active="item.isActive"
              :icon="item.icon"
              :title="item.title"
              :key="index"
              size="30"
              @click="item.action"
            />

            <!-- table 設定 -->
            <Button
              v-if="
                item.type === 'button' &&
                editor?.isActive('table') &&
                item.combine === 'table'
              "
              :is-active="item.isActive"
              :icon="item.icon"
              :title="item.title"
              :key="index"
              size="30"
              @click="item.action"
            />
          </template>
        </Toolbar>

        <hr class="w-full h-[1px] mt-2" />
      </div>
    </client-only>

    <!-- 編輯器內容 -->
    <div class="overflow-y-auto" :style="{ height: 'calc(100% - 46px)' }">
      <Loader v-if="isLoading" />
      <editor-content v-else :editor="editor" v-model="updatedNote" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Toolbar from "./Toolbar/index.vue";
import Button from "./Button/Button.vue";
import ColorPicker from "./ColorPicker/index.vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import type { ITranslationsProps, Note } from "~/types/type";
import { defaultTranslations } from "~/utils/utils";
import useEditorToolbar from "./tiptapConfig";

const props = withDefaults(
  defineProps<{
    // 編輯器被景色
    editorBackground?: string;
    placeholder?: string;
    // 鍵值
    keys?: Partial<ITranslationsProps>;
    // 選取的備忘錄
    selectedNote: Note;
  }>(),
  {
    //@ts-ignore
    keys: defaultTranslations,
  }
);

// v-model 綁定
const updatedNote = defineModel("updatedNote");
// 當前字體顏色
const currentColor = ref<string>("");
// 加載狀態
const isLoading = ref<boolean>(false);

// 取得當前元素色碼
function getColor(): string {
  return editor.value?.getAttributes("textStyle").color || "";
}

const emit = defineEmits<{
  input: [data: string];
}>();

// 編輯器
const editor = useEditor({
  extensions: [
    // load all included extension at once.
    StarterKit.configure({
      document: false,
    }),
    Underline,
    Document,
    Placeholder.configure({
      placeholder: props.placeholder ? props.placeholder : "Write something...",
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    TextStyle,
    Color,
    TaskList,
    TaskItem,
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
  ],
  editorProps: {
    attributes: {
      class:
        "mt-4 outline-none border-none prose text-[#D4D4D4] max-w-none prose-headings:mt-4 prose-p:my-1",
    },
  },
  editable: true,
  autofocus: true,
  onUpdate: () => {
    // HTML
    updatedNote.value = editor.value?.getHTML() || "";
    emit("input", editor.value?.getHTML() || "");
    currentColor.value = getColor();
  },
  onBeforeCreate({ editor }) {
    isLoading.value = true;
  },
  onCreate({ editor }) {
    // The editor is ready.
    editor.commands.setContent(updatedNote.value as string);
    editor.commands.focus();

    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  },
  onSelectionUpdate({ editor }) {
    // The selection has changed.
    currentColor.value = getColor();
  },
});

// Toolbar 控制器
const toolbarConfigs = useEditorToolbar(editor, props.keys);

onMounted(() => {
  if (props.selectedNote.text) updatedNote.value = props.selectedNote.text;
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style lang="css">
.tiptap p.is-editor-empty:first-child:before {
  content: attr(data-placeholder);
  float: left;
  color: #b0b0b0;
  pointer-events: none;
  height: 0;
}
.tiptap ul[data-type="taskList"] {
  list-style: none;
  line-height: 14px;
  padding: 0;
  margin-left: 0.7rem;
  margin-top: 0.5rem;
}

.tiptap ul[data-type="taskList"] li {
  display: flex;
  align-items: center;
}

.tiptap ul[data-type="taskList"] li > label {
  flex: 0 0 auto;
  margin-top: 5px;
  margin-right: 0.5rem;
}

.tiptap input[type="checkbox"] {
  cursor: pointer;
}

/* Heading styles */
h1,
h2,
h3 {
  font-family: "Playfair", serif;
  line-height: 1.1;
  margin-top: 1.5rem;
  text-wrap: pretty;
}

h1,
h2 {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
</style>

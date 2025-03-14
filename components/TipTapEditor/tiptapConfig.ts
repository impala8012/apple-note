import type { MenuItem, ITranslationsProps } from "~/types/type.ts";
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBold,
  IconH1,
  IconH2,
  IconH3,
  IconItalic,
  IconTextColor,
  IconListDetails,
  IconListNumbers,
  IconStrikethrough,
  IconUnderline,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconListCheck,
  IconTable,
  IconColumnInsertLeft,
  IconColumnInsertRight,
  IconColumnRemove,
  IconRowInsertTop,
  IconRowInsertBottom,
  IconRowRemove,
} from "@tabler/icons-vue";
import TableDelete from "./Icon/TableDelete.vue";
import TableMerge from "./Icon/TableMerge.vue";

export default function useEditorToolbar(
  editor: any,
  keys: Partial<ITranslationsProps>
): MenuItem[] {
  return [
    // 返回
    {
      type: "button",
      icon: IconArrowBackUp,
      title: keys.undo,
      action: () => editor.value?.chain().focus().undo().run(),
    },
    // 復原
    {
      type: "button",
      icon: IconArrowForwardUp,
      title: keys.redo,
      action: () => editor.value?.chain().focus().redo().run(),
    },
    // 粗體
    {
      type: "button",
      icon: IconBold,
      title: keys.bold,
      action: () => editor.value?.chain().focus().toggleBold().run(),
      isActive: () => editor.value?.isActive("bold"),
    },
    // 斜體
    {
      type: "button",
      icon: IconItalic,
      title: keys.italic,
      action: () => editor.value?.chain().focus().toggleItalic().run(),
      isActive: () => editor.value?.isActive("italic"),
    },
    // 字體顏色
    {
      type: "dropdown",
      icon: IconTextColor,
      title: keys.textStyle,
      action: (color) => editor.value?.chain().focus().setColor(color).run(),
      isActive: () =>
        editor.value?.isActive(
          "textStyle",
          editor.value.getAttributes("textStyle")
        ),
    },
    // 底線
    {
      type: "button",
      icon: IconUnderline,
      title: keys.underline,
      action: () => editor.value?.chain().focus().toggleUnderline().run(),
      isActive: () => editor.value?.isActive("underline"),
    },
    // 刪除線
    {
      type: "button",
      icon: IconStrikethrough,
      title: keys.strike,
      action: () => editor.value?.chain().focus().toggleStrike().run(),
      isActive: () => editor.value?.isActive("strike"),
    },
    {
      type: "divider",
    },
    // H1
    {
      type: "button",
      icon: IconH1,
      title: keys.header1,
      action: () =>
        editor.value?.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.value?.isActive("heading", { level: 1 }),
    },
    // H2
    {
      type: "button",
      icon: IconH2,
      title: keys.header2,
      action: () =>
        editor.value?.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.value?.isActive("heading", { level: 2 }),
    },
    // H3
    {
      type: "button",
      icon: IconH3,
      title: keys.header3,
      action: () =>
        editor.value?.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.value?.isActive("heading", { level: 3 }),
    },
    {
      type: "divider",
    },
    // 清單
    {
      type: "button",
      icon: IconListDetails,
      title: keys.unorderedList,
      action: () => editor.value?.chain().focus().toggleBulletList().run(),
      isActive: () => editor.value?.isActive("bulletList"),
    },
    // 序列清單
    {
      type: "button",
      icon: IconListNumbers,
      title: keys.orderedList,
      action: () => editor.value?.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.value?.isActive("orderedList"),
    },
    // TODO 清單
    {
      type: "button",
      icon: IconListCheck,
      title: keys.checklist,
      action: () => editor.value?.chain().focus().toggleTaskList().run(),
      isActive: () => editor.value?.isActive("taskList"),
    },
    {
      type: "divider",
    },
    // 文字靠左
    {
      type: "button",
      icon: IconAlignLeft,
      title: keys.alignLeft,
      action: () => editor.value?.chain().focus().setTextAlign("left").run(),
    },
    // 文字置中
    {
      type: "button",
      icon: IconAlignCenter,
      title: keys.center,
      action: () => editor.value?.chain().focus().setTextAlign("center").run(),
    },
    // 文字靠右
    {
      type: "button",
      icon: IconAlignRight,
      title: keys.alignRight,
      action: () => editor.value?.chain().focus().setTextAlign("right").run(),
    },
    {
      type: "divider",
    },
    // 表格
    {
      type: "button",
      icon: IconTable,
      title: keys.table,
      action: () =>
        editor.value
          ?.chain()
          .focus()
          .insertTable({
            rows: 2,
            cols: 2,
            withHeaderRow: true,
          })
          .run(),
      isActive: () => editor.value?.isActive("table"),
    },
    {
      type: "divider",
    },
    // 移除表格
    {
      type: "button",
      icon: TableDelete,
      title: keys.tableRemove,
      action: () => editor.value.commands.deleteTable(),
      combine: "table",
    },
    // 向左增加欄
    {
      type: "button",
      icon: IconColumnInsertLeft,
      title: keys.addColumnBefore,
      action: () => editor.value.commands.addColumnBefore(),
      combine: "table",
    },
    // 向右增加欄
    {
      type: "button",
      icon: IconColumnInsertRight,
      title: keys.addColumnAfter,
      action: () => editor.value.commands.addColumnAfter(),
      combine: "table",
    },
    // 刪除欄
    {
      type: "button",
      icon: IconColumnRemove,
      title: keys.removeColumn,
      action: () => editor.value.commands.deleteColumn(),
      combine: "table",
    },
    // 向上增加列
    {
      type: "button",
      icon: IconRowInsertTop,
      title: keys.addRowBefore,
      action: () => editor.value.commands.addRowBefore(),
      combine: "table",
    },
    // 向下增加列
    {
      type: "button",
      icon: IconRowInsertBottom,
      title: keys.addRowAfter,
      action: () => editor.value.commands.addRowAfter(),
      combine: "table",
    },
    // 刪除列
    {
      type: "button",
      icon: IconRowRemove,
      title: keys.removeRow,
      action: () => editor.value.commands.deleteRow(),
      combine: "table",
    },
    {
      type: "button",
      icon: TableMerge,
      title: keys.TableMerge,
      action: () => editor.value.commands.mergeOrSplit(),
      combine: "table",
    },
  ];
}

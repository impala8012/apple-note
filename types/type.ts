import { type Component } from "vue";

// 編輯器按鈕
export type MenuItem =
  | {
      icon: Component;
      title?: string;
      action: () => void;
      type: "button";
      isActive?: () => boolean;
      combine?: "table";
    }
  | { type: "divider" }
  | {
      icon: Component;
      title?: string;
      action: (color: string) => void;
      type: "dropdown";
      isActive?: () => boolean;
    };

// 編輯器
export interface ITranslationsProps {
  bold: string;
  italic: string;
  underline: string;
  strike: string;
  header1: string;
  header2: string;
  header3: string;
  unorderedList: string;
  orderedList: string;
  checklist: string;
  alignLeft: string;
  center: string;
  alignRight: string;
  undo: string;
  redo: string;
  table: string;
  textStyle: string;
  tableRemove: string;
  addColumnBefore: string;
  addColumnAfter: string;
  removeColumn: string;
  addRowBefore: string;
  addRowAfter: string;
  removeRow: string;
  TableMerge: string;
}

// 色彩下拉選單
export type ColorOption = {
  label: string;
  value: string;
  color: string;
};

// 備忘錄
export type Note = {
  createdAt: string;
  id: number;
  text: string;
  updatedAt: string;
  userId: number;
};

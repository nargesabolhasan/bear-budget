import { TagType } from "@/types/global";

export const enum FormTagEnum {
  ICON = "icon",
  NAME = "name",
  TRANSACTION_TYPE = "transactionType",
  COLOR = "color",
}

export type TagFormData = Omit<TagType, "id">;

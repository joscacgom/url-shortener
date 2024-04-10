import { FormEvent } from "react";

export interface RowData {
  ShortURL: string;
  LongURL: string;
  QRCode?: string;
  Clicks: number;
  Status: string;
  Date: string;
  Actions: any;
  id: string;
}

export interface Url {
  id: string;
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  status: number;
  createdAt: string;
}

export interface ActionButtonProps {
  data: RowData;
  onDelete: () => void;
}

export interface ButtonProps {
    text: string;
    handleClick?: () => void | Promise<void>;
    type: "submit" | "edit" | "delete" | "signUp" | "login" | "copy";
}

export interface AccountDetailsProps {
    name: string;
}
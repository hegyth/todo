import { TableProps } from "antd";

export interface TaskType {
  key: React.Key;
  name: string;
  status: boolean;
  tags: string[];
}

export type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

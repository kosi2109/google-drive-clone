import { User } from "./userType";

type BaseLog = {
    created_at: string;
    process_by: User;
}

type ItemType = {
  id: number;
  name: string;
  access: number;
  size: string;
  file_path: string;
  mime_type: string;
  ownBy: User;
  lastModify: BaseLog;
  lastView: BaseLog;
  created: string;
  deleted_at: string;
};

export type { ItemType };

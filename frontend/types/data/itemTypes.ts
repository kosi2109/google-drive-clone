type BaseUser = {
    id: number;
    name: string;
    email: string;
}

type BaseLog = {
    created_at: string;
    process_by: BaseUser;
}

type ItemType = {
  id: number;
  name: string;
  access: string;
  size: string;
  file_path: string;
  mime_type: string;
  ownBy: BaseUser;
  lastModify: BaseLog;
  lastView: BaseLog;
  created: string;
};

export type { ItemType };

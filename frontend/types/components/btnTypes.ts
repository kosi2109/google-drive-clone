import { IconType } from "react-icons";

type SideBarBtnType = {
  Icon: IconType;
  text: string;
  active?: boolean;
};

type RoundedBtnType = {
  Icon: IconType;
  className?: string;
  onClickHandle?: any;
  size?: number;
};

export type { 
  SideBarBtnType, 
  RoundedBtnType 
};

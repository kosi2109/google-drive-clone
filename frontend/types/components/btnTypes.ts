import { IconType } from "react-icons";

type SideBarBtnType = {
  Icon: IconType;
  text: string;
  url: string;
  active?: boolean;
};

type RoundedBtnType = {
  Icon: IconType;
  className?: string;
  onClickHandle?: any;
  size?: number;
  text: string;
};

export type { 
  SideBarBtnType, 
  RoundedBtnType 
};

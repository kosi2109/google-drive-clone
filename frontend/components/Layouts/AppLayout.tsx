import {
  useItemFinishListener,
  useItemProgressListener,
  useItemStartListener,
  useRequestPreSend,
} from "@rpldy/uploady";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDownloadController,
  selectDownloadControll,
  selectIsOpenDetailView,
  selectIsOpenMobileMenu,
} from "../../features/appSlice";
import {
  addToQeue,
  selectDownloadQueue,
  updateProgessById,
} from "../../features/downloadQueueSlice";
import DownloadCard from "../downloadCard";
import Header from "../Header";
import ItemDetail from "../ItemDetail";
import PageNavigator from "../PageNavigator";
import SideBar from "../SideBar";
import AuthGuard from "./AuthGuard";

function AppLayout({ children }: any) {
  const isOpenDetail = useSelector(selectIsOpenDetailView);
  const isOpenMobileMenu = useSelector(selectIsOpenMobileMenu);
  const { isOpen } = useSelector(selectDownloadControll);
  const downloadItems = useSelector(selectDownloadQueue);
  const { data } = useSession();

  const dispatch = useDispatch();

  useEffect(() => {
    if (downloadItems.length > 0) {
      dispatch(changeDownloadController({ isOpen: true, isMinimize: false }));
    }
  }, [downloadItems.length]);

  //upload progess handler
  useItemStartListener((item) => {
    dispatch(
      addToQeue({
        id: item.id,
        name: item.file.name,
        completed: item.completed,
        state: item.state,
      })
    );
  });

  useItemProgressListener((item) => {
    dispatch(
      updateProgessById({
        id: item.id,
        name: item.file.name,
        completed: item.completed,
        state: item.state,
      })
    );
  });

  useItemFinishListener((item) => {
    dispatch(
      updateProgessById({
        id: item.id,
        name: item.file.name,
        completed: item.completed,
        state: item.state,
      })
    );
  });
  
  useRequestPreSend(({ items, options }) => {
    
    return {
      options: {
        destination : {
          headers : {
            Authorization : `Bearer ${data?.token?.access_token}`
          }
        },
        params: {
          test : 'aaa'
        }
      },
    };
  });

  return (
    <AuthGuard>
      <div className="h-screen overflow-hidden bg-white dark:bg-dark">
        <Header />
        <div className="flex">
          <div
            className={`w-5/6 transition-transform fixed top-18 bg-white dark:bg-gray-900 dark:md:bg-transparent h-full lg:relative lg:w-1/6 lg:block lg:translate-x-0 ${
              isOpenMobileMenu ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <SideBar />
          </div>
          <div className="w-full lg:w-5/6">
            <PageNavigator />
            <div className="w-full flex">
              <div
                className={`${
                  isOpenDetail ? "w-4/6" : "w-full"
                } h-screen overflow-scroll pb-32 transition-all ease-in-out`}
              >
                {children}
              </div>
              <div
                className={`${
                  isOpenDetail ? "w-2/6 hidden lg:block" : "w-0 hidden lg:block"
                } h-screen transition`}
              >
                <ItemDetail />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && <DownloadCard />}
    </AuthGuard>
  );
}

export default AppLayout;

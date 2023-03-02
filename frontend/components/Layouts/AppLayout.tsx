import {
  useItemFinishListener,
  useItemProgressListener,
  useItemStartListener,
  useRequestPreSend,
} from "@rpldy/uploady";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDownloadController,
  selectDownloadControll,
  selectFolderCreate,
  selectFolderRename,
  selectGeneralAccess,
  selectIsOpenDetailView,
  selectIsOpenMobileMenu,
} from "../../features/appSlice";
import {
  addToQeue,
  selectDownloadQueue,
  updateProgessById,
} from "../../features/downloadQueueSlice";
import SkeletonLoading from "../Common/SkeletonLoading";
import CreateFolderDialog from "../dialogs/CreateFolderDialog";
import GeneralAccessDialog from "../dialogs/GeneralAccessDialog";
import RenameFolderDialog from "../dialogs/RenameFolderDialog";
import DownloadCard from "../downloadCard";
import Header from "../Header";
import ItemDetail from "../ItemDetail";
import PageNavigator from "../PageNavigator";
import SideBar from "../SideBar";
import AuthGuard from "./AuthGuard";

function AppLayout({ children, breadcrumb, isLoading = false }: any) {
  const isOpenDetail = useSelector(selectIsOpenDetailView);
  const isOpenMobileMenu = useSelector(selectIsOpenMobileMenu);
  const { isOpen } = useSelector(selectDownloadControll);
  const downloadItems = useSelector(selectDownloadQueue);
  const isOpenFolderCreate = useSelector(selectFolderCreate);
  const isOpenFolderRename = useSelector(selectFolderRename);
  const isOpenGeneralAccess = useSelector(selectGeneralAccess);
  const { data }: any = useSession();
  const [parentFolderId, setParentFolderId] = useState("");
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (downloadItems.length > 0) {
      dispatch(changeDownloadController({ isOpen: true, isMinimize: false }));
    }
  }, [downloadItems.length]);

  useEffect(() => {
    if (router.pathname === "/drive/folders/[id]") {
      setParentFolderId(router?.query?.id as string);
    }
  }, [router.pathname, router.query.id]);

  //upload progess handler
  useItemStartListener((item) => {
    console.log(item);
    dispatch(
      addToQeue({
        id: item.id,
        name: item.file.name,
        completed: item.completed,
        state: item.state,
        mime_type : item.file.type
      })
    );
  });

  useItemProgressListener((item) => {
    dispatch(
      updateProgessById({
        id: item.id,
        completed: item.completed,
        state: item.state,
      })
    );
  });

  useItemFinishListener((item) => {
    dispatch(
      updateProgessById({
        id: item.id,
        completed: item.completed,
        state: item.state,
      })
    );
  });

  useRequestPreSend(({ items, options }) => {
    return {
      options: {
        destination: {
          headers: {
            Authorization: `Bearer ${data?.token?.access_token}`,
          },
        },
        params: {
          folder_id: parentFolderId,
        },
      },
    };
  });

  return (
    <AuthGuard>
      <div className="h-screen overflow-hidden bg-white dark:bg-dark">
        <Header />
        <div className="flex">
          <div
            className={`z-50 w-5/6 transition-transform fixed top-18 bg-white dark:bg-gray-900 dark:md:bg-transparent h-full lg:relative lg:w-1/6 lg:block lg:translate-x-0 ${
              isOpenMobileMenu ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <SideBar />
          </div>
          <div className="w-full lg:w-5/6">
            <PageNavigator breadcrumb={breadcrumb} />
            <div className="w-full flex">
              <div
                className={`${
                  isOpenDetail ? "w-4/6" : "w-full"
                } h-screen overflow-scroll pb-32 transition-all ease-in-out`}
              >
                {isLoading ? <SkeletonLoading /> : children}
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
      {isOpenFolderCreate && <CreateFolderDialog />}
      {isOpenFolderRename && <RenameFolderDialog />}
      {isOpenGeneralAccess && <GeneralAccessDialog />}
    </AuthGuard>
  );
}

export default AppLayout;

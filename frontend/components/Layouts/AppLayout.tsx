import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { MdFolderShared } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { changeOpenDetailView, selectIsOpenDetailView } from '../../features/appSlice';
import { selectSelectedItem } from '../../features/itemSlice';
import { RoundedHoverBtn } from '../buttons'

function AppLayout({children} : any) {
    const item = useSelector(selectSelectedItem);
    const isOpenDetail = useSelector(selectIsOpenDetailView);
    const dispatch = useDispatch();

  return (
    <div className="w-full flex">
      <div className={`${isOpenDetail ? 'w-4/6' : 'w-full' } h-screen overflow-scroll pb-32 transition-all ease-in-out`}>
        {children}
      </div>
      <div className={`${isOpenDetail ? 'w-2/6' : 'w-0' } h-screen transition`}>
        <div className="flex items-center p-8 w-full justify-between h-1/6">
          <div className="flex items-center">
            <MdFolderShared size={25}/>
            <h5 className="text-xl ml-4">{item.title}</h5>
          </div>
            <RoundedHoverBtn Icon={AiOutlineClose} onClickHandle={() => dispatch(changeOpenDetailView())} />
        </div>

        <div className="w-full h-5/6 overflow-auto px-8">
          <h5 className="font-semibold mb-4">Folder Details</h5>
          <div>
            <h5 className="text-sm font-semibold">Type</h5>
            <h5>{item.type}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
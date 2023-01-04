import { useRouter } from 'next/router'
import React from 'react'
import ItemsContainer from '../../components/items/ItemsContainer';
import AppLayout from '../../components/layouts/AppLayout';
import { IconType } from '../../constant/fileTypes';
import PageNotFound from '../404';

const routes : any = [
  "my-drive",
  "computers",
  "share-with-me",
  "recent",
  "starred",
  "trash",
];

let dumpData = [
  {
    id : Math.floor(Math.random() * 100),
    image : "https://picsum.photos/200",
    type : IconType.pdf,
    title : "a"
  },
  {
    id : Math.floor(Math.random() * 100),
    image : "https://picsum.photos/200",
    type : IconType.folder,
    title : "b"
  },
  {
    id : Math.floor(Math.random() * 100),
    image : "https://picsum.photos/200",
    type : IconType.document,
    title : "c"
  },
  {
    id : Math.floor(Math.random() * 100),
    image : "https://picsum.photos/200",
    type : IconType.pdf,
    title : "d"
  },
  {
    id : Math.floor(Math.random() * 100),
    image : "https://picsum.photos/200",
    type : IconType.pdf,
    title : "d"
  },
]

function MyDrive() {
  const router = useRouter();
  const { slug } = router.query;

  if (!routes.includes(slug)) {
    return <PageNotFound />
  }

  // const [data, setData] = useState<any>([]);

  // useEffect(() => {
  //   if (slug === 'my-drive') {
  //     setData(dumpData);
  //   } else {
  //     setData([]);
  //   }
  // },[slug])

  return (
    <AppLayout>
      <ItemsContainer title='Test' data={dumpData} />
    </AppLayout>
  )
}

export default MyDrive
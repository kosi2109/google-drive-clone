import { useRouter } from 'next/router'
import React from 'react'
import AppLayout from '../../components/Layouts/AppLayout';
import PageNotFound from '../404';

const routes : any = [
  "my-drive",
  "computers",
  "share-with-me",
  "recent",
  "starred",
  "trash",
];

function MyDrive() {
  const router = useRouter();
  const { slug } = router.query;

  if (!routes.includes(slug)) {
    return <PageNotFound />
  }

  console.log(slug);
  
  return (
    <AppLayout>
      tes
    </AppLayout>
  )
}

export default MyDrive
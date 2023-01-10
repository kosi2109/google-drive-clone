import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'

const publicRoutes = [
  '/auth',
  '/auth/google'
]

function RouteGuard({children} : any) {
    const user = useSelector(selectUser);
    const router = useRouter();

    useEffect(() => {
      if (publicRoutes.includes(router.asPath.split('?')[0])) {
        if (user) {
          router.push('/');
        }
      } else {
        if (!user) {
          router.push('/auth')
        }
      }
    },[user])
    
  return (
    children
  )
}

export default RouteGuard
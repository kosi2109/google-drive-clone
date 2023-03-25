import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  
  //i don't want to use main uri like google drive
  useEffect(() => {
    router.push('/drive/my-drive')
  }, [])
}

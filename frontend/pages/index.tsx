import { useSelector } from "react-redux"
import { selectUser } from "../features/userSlice";

export default function Home() {
  const user = useSelector(selectUser);

  return (
    <div>
      <h1 className="text-center">Hello {user.name}</h1>
    </div>
  )
}

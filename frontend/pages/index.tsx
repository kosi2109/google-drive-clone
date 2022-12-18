import { useSelector } from "react-redux"
import ItemsContainer from "../components/Items/ItemsContainer";
import AppLayout from "../components/Layouts/AppLayout";
import { selectUser } from "../features/userSlice";

export default function Home() {
  const user = useSelector(selectUser);

  return (
    <AppLayout>
      <ItemsContainer title="Today" />
    </AppLayout>
  )
}

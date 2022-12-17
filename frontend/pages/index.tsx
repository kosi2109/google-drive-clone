import { useSelector } from "react-redux"
import { GridContainer } from "../components/CardContainer";
import { selectUser } from "../features/userSlice";

export default function Home() {
  const user = useSelector(selectUser);

  return (
    <div>
      <GridContainer title="Today" />
      <GridContainer title="Last week" />
    </div>
  )
}

import Expanses from "../components/Expenses"
import RightSidebar from "../components/RightSidebar"
import SideBar from "../components/SideBar"
import { SplitLayout } from "../layout/SplitScreen"


function ExpansesPage() {


  return (
    <SplitLayout left={<SideBar/>} center={<Expanses/>} right={<RightSidebar/>}/>
  )
}

export default ExpansesPage
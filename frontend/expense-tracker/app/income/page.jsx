import Income from "../components/Income.tsx"
import RightSidebar from "../components/RightSidebar"
import SideBar from "../components/SideBar"
import { SplitLayout } from "../layout/SplitScreen"


function IncomePage() {


  return (
    <SplitLayout left={<SideBar/>} center={<Income/>} right={<RightSidebar/>}/>
  )
}

export default IncomePage
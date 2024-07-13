/* eslint-disable react/prop-types */
export default function ChatGroup({setCurrentTab, currentTab}) {
    const clsName = currentTab === "General" ? "nav-link active" :  "nav-link" ;
    const clsName1 = currentTab === "Friends" ? "nav-link active" :  "nav-link" ;

    return(
        <ul className="nav nav-tabs" >
        <li className="nav-item w-50" onClick={() => setCurrentTab("General")}>
          <a className={clsName} style={{ textAlign: "center" }} href="#">General</a>
        </li>
        <li className="nav-item w-50" onClick={() => setCurrentTab("Friends")}>
          <a className={clsName1} style={{ textAlign: "center" }}  href="#">Friends</a>
        </li>
      </ul>
    )
}
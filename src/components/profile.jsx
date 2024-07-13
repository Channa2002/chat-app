/* eslint-disable react/prop-types */
import Avatar from "./avatar"

export default function Profile({currentUser}) {
    return(
        <div 
        style={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            flexDirection:"column",
            margin:"auto"
            }}>
              <Avatar name={currentUser.name} color={currentUser.color} />
            <h2>{currentUser.name}</h2>
            <p>({currentUser.status})</p>
            <h4 style={{fontSize:"18px"}}>Bio: <span style={{fontSize:"16px", fontWeight:"400"}}>{currentUser.bio}</span></h4>
        </div>
    )
}
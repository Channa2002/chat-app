import { useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useOutsideClick } from "../customhooks/index";

/* eslint-disable react/prop-types */
export default function Popover({ children }) {
    const popoverRef = useRef(null);
    const [isOpen, setIsOpen] = useOutsideClick(popoverRef);

    return(
        <div ref={popoverRef}>
            <BsThreeDotsVertical onClick={() => setIsOpen(!isOpen)} className="align-self-center" fontSize={20} cursor={"pointer"} />
            {isOpen && (
                <div className="popup" style={{position:"absolute",
                    right:"40px",
                    marginTop:"5px", 
                    backgroundColor:"white", 
                    width: 100, 
                    padding: "5px 10px",
                    boxShadow: "rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.03) 0px 5px 5px -2.5px, rgba(42, 51, 70, 0.03) 0px 10px 10px -5px, rgba(42, 51, 70, 0.03) 0px 24px 24px -8px",
                    borderRadius: 10 }}>
                        {children}
                </div>
            )}
        </div>
    )
}

export function PopButton({ text, handleOnClick }) {
    return (
        <button 
            style={{
                border:"none", 
                borderRadius:"4px", 
                fontWeight:"400", 
                padding: "10px 2px",
                backgroundColor:"white", 
                outline:"none"
            }} 
            onClick={handleOnClick}>
                {text}
        </button>
    )
}
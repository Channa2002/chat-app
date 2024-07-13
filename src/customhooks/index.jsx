import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";

export function useOutsideClick(ref) {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsActive(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ref]);

    return [isActive, setIsActive];
}


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
  
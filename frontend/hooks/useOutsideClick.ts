import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeSelectItem } from "../features/itemSlice";

function useOutsideClick(ref: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {        
        // alert("You clicked outside of me!");
        dispatch(changeSelectItem(null));
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default useOutsideClick;

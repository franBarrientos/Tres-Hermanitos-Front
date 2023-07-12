import { useContext } from "react";
import { AppContext} from "../context/AppProvider"
export default function useApp() {
  return (
        useContext(AppContext)
    )
}

import { useNavigate } from "react-router-dom";
import useApp from "../../hook/useApp";
import Categories from "./Categories";
import Products from "./Products";
import { Purchases } from "./Purchases";
import Stadistics from "./Stadistics";

export default function Admin() {
  const { featureAdmin } = useApp();
  const { user } = useApp();
  const navigate = useNavigate();
  if (!user) navigate("/");
  if (!localStorage.getItem("token")) navigate("/");
  switch (featureAdmin?.id) {
    case 1:
      return <Stadistics />;
      break;

    case 2:
      return <Products />;
      break;

    case 3:
      return <Categories />;
      break;

    case 4:
      return <Purchases />;
      break;

    default:
      return <Products />;

      break;
  }
}

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

import { CategoryInterface } from "../interfaces/category";
import { ProductInterface } from "../interfaces/product";
import { UserDto } from "../interfaces/user";
import { useToast } from "@chakra-ui/react";
import { getAllCategories } from "../api/category.api";
import { createOrderMp, createPurchase } from "../api/purchase.api";
import { createPurchasesProducts } from "../api/purchaseProduct";
interface MyContextType {
  categories: CategoryInterface[] | null;
  setCategories: Dispatch<SetStateAction<CategoryInterface[] | null>>;

  setActualCategory: (categoryToUpdate: CategoryInterface) => void;
  actualCategory: CategoryInterface;
  handleClickCategory: (id: number) => void;
  styleCss: { principal: string };
  carrito: ProductInterface[] | null;
  setCarrito: Dispatch<SetStateAction<ProductInterface[] | []>>;
  handleAddToCarrito: (product: ProductInterface) => void;
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  pay: (payment: string, customerId: number) => void;
  user: UserDto | null;
  setUser: Dispatch<SetStateAction<UserDto | null>>;
  handleEditProductOfCarrito: (id: number, newQuantity: number) => void;
  handleRemoveProductFromCarrito: (id: number) => void;
  featureAdmin: CategoryInterface | undefined;
  handleClickCategoryAdmin: (id: number) => void;
  categoriesAdmin: CategoryInterface[];
  setChangeCategory: Dispatch<SetStateAction<boolean>>;
  changeCategory: boolean;
  totalCarrito: () => number;
  openHistory: boolean;
  setOpenHistory: Dispatch<SetStateAction<boolean>>;
  flatFetch: boolean;
  setFlatFetch: Dispatch<SetStateAction<boolean>>;
}

const categoriesAdmin: CategoryInterface[] = [
  {
    id: 1,
    img: "https://res.cloudinary.com/dacgvqpeg/image/upload/v1688648111/3309960_synkq9.png",
    name: "Stadistics",
  },
  {
    id: 2,
    img: "https://res.cloudinary.com/dacgvqpeg/image/upload/v1688004054/mouse-gamer-logitech-g-pro-gaming-con-cable-luz-led-rgb-12000-dpi_qobn5p.jpg",
    name: "Products",
  },
  {
    id: 3,
    img: "https://res.cloudinary.com/dacgvqpeg/image/upload/v1688648259/images_ffrrid.jpg",
    name: "Categories",
  },
  {
    id: 4,
    img: "https://res.cloudinary.com/dacgvqpeg/image/upload/v1688648341/images_vs2byy.png",
    name: "Purchases",
  },
];

export const AppContext = createContext<MyContextType>({} as MyContextType);

type AppContextProviderProps = {
  children: ReactNode;
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<CategoryInterface[] | null>([]);
  const [carrito, setCarrito] = useState<ProductInterface[] | []>([]);
  const [actualCategory, setActualCategory] = useState<CategoryInterface>({
    id: 0,
    img: "",
    name: "",
  });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [user, setUser] = useState<UserDto | null>(null);
  const [featureAdmin, setFeatureAdmin] = useState<CategoryInterface>(
    categoriesAdmin[0]
  );
  const [changeCategory, setChangeCategory] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [flatFetch, setFlatFetch] = useState<boolean>(false);

  const toast = useToast();

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      if (!response.data.ok) throw new Error("Error fetch categories");
      setCategories(response.data.body);
      setActualCategory(response.data.body[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [changeCategory]);

  const handleClickCategory = (id: number) => {
    const category = categories?.filter((category) => category.id == id)[0];
    setActualCategory(category!);
  };

  const handleAddToCarrito = (product: ProductInterface) => {
    if (carrito.some((carritoState) => carritoState.id == product.id)) {
      const carritoActualizado = carrito.map((carritoState) =>
        carritoState.id == product.id ? product : carritoState
      );
      setCarrito(carritoActualizado);
      toast({
        title: `Changes saved successfuly`,
        status: "success",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
    } else {
      setCarrito([...carrito, product]);
      toast({
        title: `${product.name} Added to Shopping Cart`,
        description: "Added succesfully",
        status: "success",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
    }
  };

  const totalCarrito = () => {
    if (carrito) {
      let total = 0;
      carrito.forEach(
        (product) => (total += product.price * (product.quantity || 1))
      );
      return total;
    } else {
      return 0;
    }
  };

  const handleEditProductOfCarrito = (id: number, newQuantity: number) => {
    const product = carrito.find((product) => product.id == id);
    if (product) product.quantity = newQuantity;
  };

  const handleRemoveProductFromCarrito = (id: number) => {
    setCarrito(carrito.filter((product) => product.id != id));
    toast({
      title: `removed from Shopping Cart`,
      description: "Removed succesfully",
      status: "warning",
      duration: 2000,
      position: "top-left",
      isClosable: true,
    });
  };

  const payMercadoPago = async (idPurchase:number) => {
    const response = await createOrderMp(carrito, idPurchase);
    window.location.replace(response.data.body.urlMercadoPago);
  };

  const pay = async (payment: string, customerId: number) => {
    if (user && carrito.length > 0) {
      try {
        const response = await createPurchase({
          state: "pendiente",
          payment,
          customer: customerId,
        });
        if (!response.data.ok) throw new Error("err");
        if (payment == "MP") payMercadoPago(response.data.body.id);
        setFlatFetch(false);
        Promise.all(
          carrito.map((product) => {
            return createPurchasesProducts({
              quantity: product.quantity!,
              purchase: response.data.body.id,
              product: product.id,
            });
          })
        )
          .then(() => {
            setCarrito([]);
            toast({
              title: "Purchase success",
              description: "Enjoy your purchase",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            setIsOpenModal(false);
            return;
          })
          .catch(() => {
            throw new Error("err");
          });
      } catch (error) {
        toast({
          title: "Error from server",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
    } else {
      toast({
        title: "Log in to buy",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleClickCategoryAdmin = (id: number) => {
    const category = categoriesAdmin?.filter(
      (category) => category.id == id
    )[0];
    setFeatureAdmin(category);
  };

  const styleCss = {
    principal: "#FFC200",
  };

  const contextValue: MyContextType = {
    categories,
    setCategories,
    actualCategory,
    setActualCategory,
    handleClickCategory,
    styleCss,
    carrito,
    setCarrito,
    handleAddToCarrito,
    isOpenModal,
    setIsOpenModal,
    pay,
    setUser,
    user,
    handleEditProductOfCarrito,
    handleRemoveProductFromCarrito,
    featureAdmin,
    categoriesAdmin,
    handleClickCategoryAdmin,
    setChangeCategory,
    changeCategory,
    totalCarrito,
    openHistory,
    setOpenHistory,
    flatFetch,
    setFlatFetch,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContext;

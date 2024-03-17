import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import { fireDB } from "../../firebase/FirebaseConfig";
import {
  QuerySnapshot,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const MyState = ({ children }) => {
  // theme toggler
  const [mode, setMode] = useState();
  // loading indicator
  const [loading, setLoading] = useState(false);

  // function1 theme
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  // fumction2 setproducts
  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const addProduct = async () => {
    if (
      products?.title == null ||
      products?.price == null ||
      products?.imageUrl == null ||
      products?.category == null ||
      products?.description == null
    ) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);
    try {
      // productRefrence
      const productRef = collection(fireDB, "products");
      //addDoc is used to add products to firebase
      await addDoc(productRef, products);
      toast.success("Product Added successfully");
      setTimeout(() => {
        window.location.href("/dashboard");
        // <Navigate to={"/dashboard"} />;
      }, 800);
      getProductData();
      // closeModal()
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setProducts("");
  };

  //function3 getproduct
  const [product, setProduct] = useState([]);
  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray);
        setLoading(false);
        return () => data;
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // function4 updateProduct and deleteproduct
  const edithandle = (item) => {
    setProducts(item);
  };
  const updateProduct = async (item) => {
    setLoading(true);
    try {
      //setDoc is a firebase methode used to select product with particular id
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setProducts("");
  };

  // deleteproduct
  const deleteProduct = async (item) => {
    setLoading(true);
    // deleteDoc is a method used to delete product in firebase
    await deleteDoc(doc(fireDB, "products", item.id));
    toast.success("Product Deleted successfully");
    setLoading(false);
    getProductData();
    try {
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // function5 order details
  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrder(ordersArray);
      console.log(ordersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //function6 user
  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "users"));
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false);
      });
      setUser(usersArray);
      console.log(usersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [searchkey, setSearchkey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  useEffect(() => {
    getProductData();
    getOrderData();
    getUserData();
  }, []);
  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        product,
        addProduct,
        edithandle,
        updateProduct,
        deleteProduct,
        order,
        user,
        searchkey,
        setSearchkey,
        filterType,
        setFilterType,
        filterPrice,
        setFilterPrice,
      }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyState;

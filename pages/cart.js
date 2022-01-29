import Head from "next/head";
import { useContext } from "react";
import { DataContext } from "../store/GlobalState";

const Cart = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  if (cart.length === 0)
    return <img className="img-responsive w-100" src="/empty_cart.jpeg" />;

  return (
    <div>
      <Head>
        <title>Cart Page</title>
      </Head>
      Cart
    </div>
  );
};

export default Cart;

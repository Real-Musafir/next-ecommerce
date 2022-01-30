import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import { DataContext } from "../store/GlobalState";
import Link from "next/link";

const Cart = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(res);
    };
    getTotal();
  }, [cart]);

  if (cart.length === 0)
    return <img className="img-responsive w-100" src="/empty_cart.jpeg" />;

  return (
    <div className="row mx-auto">
      <Head>
        <title>Cart Page</title>
      </Head>
      <div className="col-md-8 text-secondary table-responsive my-3">
        <h2 className="text-uppercase">Shopping Cart</h2>

        <table className="table my-3">
          <table>
            {cart.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                dispatch={dispatch}
                cart={cart}
              />
            ))}
          </table>
        </table>
      </div>

      <div className="col-md-4 my-3 text-right text-uppercase text-secondary">
        <form>
          <h2>Shipping</h2>
          <label htmlFor="adress">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            className="form-control mb-2"
          />

          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            name="mobile"
            id="mobile"
            className="form-control mb-2"
          />
        </form>

        <h3>
          Total: <span className="text-danger">${total}</span>{" "}
        </h3>

        <Link href={auth.user ? "#" : "/signin"}>
          <a className="btn btn-dark my-2">Proceed with payment</a>
        </Link>
      </div>
    </div>
  );
};

export default Cart;

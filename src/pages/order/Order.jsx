import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";

function Order() {
  const userid = JSON.parse(localStorage.getItem("user")).user.uid;
  const context = useContext(myContext);
  const { mode, loading, order } = context;
  return (
    <Layout>
      {loading && <Loader />}
      {order.length > 0 ? (
        <>
          <div className=" h-full pt-10">
            {order
              .filter((obj) => obj.userid === userid)
              .map((order) => {
                // order.cartItems.map()
                return (
                  <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    {order.cartItems.map((item, idx) => {
                      return (
                        <div key={idx} className="rounded-lg w-full">
                          <div
                            className="flex flex-col gap-10 justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start "
                            style={{
                              backgroundColor: mode === "dark" ? "#282c34" : "",
                              color: mode === "dark" ? "white" : "",
                            }}>
                            <img
                              src={item.imageUrl}
                              alt="product"
                              className="w-full rounded-lg sm:w-40"
                            />
                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                              <div className="mt-5 sm:mt-0">
                                <h2
                                  className="text-lg font-bold text-gray-900"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}>
                                  {item.title}
                                </h2>
                                <p
                                  className="mt-1 text-xs text-gray-700 text-ellipsis overflow-hidden w-full h-20"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}>
                                  {item.description}
                                </p>
                                <p
                                  className="mt-1 text-gray-700 font-extrabold text-3xl"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}>
                                  ₹ {item.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <h2 className=" text-center tex-2xl text-white">No Orders yet</h2>
      )}
    </Layout>
  );
}

export default Order;

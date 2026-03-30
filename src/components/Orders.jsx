import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./orders.css";

const Orders = () => {
  const [allorders, setAllorders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://trade7-backend.onrender.com/neworder",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAllorders(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);
  return (
    <div className="orderss">
      <div className="no-orderss">
        <p>Ready to place your order?</p>

        <Link to={"/"} className="btn">
          Get started
        </Link>
      </div>
      <h3 className="titles">Orders ({allorders.length})</h3>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Cur. val</th>
              <th>Mode</th>
            </tr>
          </thead>

          <tbody>
            {allorders.map((stock, index) => {
              const curValue = stock.price * stock.qty;

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.price}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td>{stock.mode}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;

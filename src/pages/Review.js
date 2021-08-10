import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import AlertBox from "../components/AlertBox";
import Button from "../components/Button";
import Container from "../components/Container";
import Layout from "../components/Layout";
import Metas from "../components/Metas";

const Wrapper = styled(Container)`
  display: flex:
  flex-direction: column;
  padding-top: 10.8rem;
  padding-bottom: 4.8rem;

  .heading {
    text-align: center;
    margin-bottom: 4.8rem;
  }

  .content, .info {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 4.8rem;
  }

  .info .group {
    display: grid;
    grid-gap: 1.6rem;

    .title {
      font-weight: 700;
    }
  }

  .order {
    display: grid;
    grid-template-columns: 1fr 3fr 2fr;
    align-items: center;
    grid-gap: 1.6rem;
    padding-block: 1.6rem;

    .quantity, .mealName, .price {
      font-weight: 700;
    }

    .price {
      text-align: right;
    }
  }

  .summation {
    padding-block: 1.6rem;
    display: grid;
    grid-gap: 1.6rem;
    border-top: 1px solid var(--border_color);
    border-bottom: 1px solid var(--border_color);

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--sup_text);
    }
  }

  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.6rem;
    font-weight: 700;
  }

  .actionBtns {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1.6rem;
    margin-top: 3.2rem;
  }

  .disclaimer {
    margin-top: 4.8rem;
  }

  .lg {
    display: none;
  }

  @media screen and (min-width: 768px) {
    .heading {
      margin-bottom: 1.6rem;
    }

    .content {
      width: 90%;
      margin: auto;
      grid-template-columns: 3fr 2fr;
      grid-gap: 14.4rem;
    }

    .order {
      grid-template-columns: 1fr 3fr 2fr;
      padding-block: 2.4rem;
      border-bottom: none;
    }

    .actionBtns {
      width: 40%;
      margin: auto;
      grid-template-columns: 1fr 1fr;
      grid-gap: 4.8rem;
      margin-top: 4.8rem;
    }

    .mb {
      display: none
    }

    .lg {
      display: block;
    }
  }
`;

const formatNumber = (num) => {
  const formatter = new Intl.NumberFormat();
  const toNum = Number(num);

  return formatter.format(toNum);
};

const Review = () => {
  const router = useHistory();
  const [alertText, setAlertText] = useState("");
  const [success, setSuccess] = useState(false);
  const [orders, setOrders] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState(false);
  const [location, setLocation] = useState(false);
  const [userLocation, setUserLocation] = useState(false);
  const [loading, setLoading] = useState(false);

  const showAlert = (msg = "...", _success = false) => {
    // e.preventDefault();
    setSuccess(_success);
    setAlertText(msg);

    document.querySelector(".alertBox").classList.add("show");
    setTimeout(
      () => document.querySelector(".alertBox").classList.remove("show"),
      3000
    );
  };

  const makeOrder = async (e) => {
    const url = "https://order-api.blunch.ng/api";
    const meals = orders.map((order) => ({
      id: order.id,
      quantity: order.quantity,
      day_id: order.pivot.day_id,
      date: new Date().toLocaleDateString(),
    }));
    const user_location = JSON.parse(localStorage.getItem("user_location"));

    const location_id = user_location?.id;

    setLoading(true);

    const res = await axios.post(
      `${url}/order?name=${deliveryInfo.name}&phone=${
        deliveryInfo.phone
      }&location_id=${Number(location_id)}&email=${
        deliveryInfo.email
      }&address=${deliveryInfo.delivery_address}`,
      { meals }
    );

    setLoading(false);

    if (res?.data?.status === "success") {
      router.push(`${url}/paynow?order_id=${res.data?.order_id}`);
    } else {
      showAlert("An error occurred", false);
    }
  };

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    const delivery_info = localStorage.getItem("delivery_info");
    const user_location = localStorage.getItem("user_location");

    cart && setOrders(JSON.parse(cart));
    delivery_info && setDeliveryInfo(JSON.parse(delivery_info));
    user_location && setLocation(JSON.parse(user_location).name);
    user_location && setUserLocation(JSON.parse(user_location));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Metas pageTitle="Review order" metaContent="Review order details" />
      <Layout>
        <Wrapper id="review">
          <AlertBox className="alertBox" success={success} text={alertText} />
          <h1 className="heading">Review orders</h1>
          {orders && deliveryInfo && (
            <div className="content">
              <div className="cart">
                {orders.map((order, index) => (
                  <div key={`${index}${order.id}`} className="order">
                    <div>
                      <h4 className="quantity">{order.quantity}</h4>
                    </div>
                    <div>
                      <h5 className="mealName">{order.name}</h5>
                    </div>
                    <div>
                      <p className="price">NGN {formatNumber(order.total)}</p>
                    </div>
                  </div>
                ))}
                <div className="summation">
                  <div className="sup item">
                    <span>
                      Sub-total ({orders.length} order
                      {orders.length > 1 ? "s" : ""})
                    </span>
                    <span>
                      NGN{" "}
                      {formatNumber(orders.reduce((a, b) => a + b.total, 0))}
                    </span>
                  </div>
                  <div className="sup item">
                    <span>Delivery fee</span>
                    <span>NGN {userLocation.delivery_price}</span>
                  </div>
                </div>
                {!!orders.length && (
                  <h5 className="total">
                    <span>Total</span>
                    <span>
                      NGN{" "}
                      {formatNumber(
                        orders.reduce(
                          (a, b) => a + b.total,
                          userLocation.delivery_price
                        )
                      )}
                    </span>
                  </h5>
                )}
                <div className="disclaimer">
                  <p>
                    Note:
                    <br />
                    Pre-orders will be delivered between 9am - 11am. Same day
                    orders will be delivered between 2 - 3 hours from when you
                    place your order.
                  </p>
                </div>
              </div>
              <div className="info">
                <div className="group">
                  <h5 className="title">Customer information</h5>
                  <p>{deliveryInfo?.name}</p>
                  <p>{deliveryInfo?.email}</p>
                  <p>{deliveryInfo?.phone}</p>
                </div>
                <div className="group">
                  <h5 className="title">Delivery information</h5>
                  <p>{location}</p>
                  <p>{deliveryInfo?.delivery_address}</p>
                  <p>{deliveryInfo?.instructions}</p>
                </div>
              </div>
            </div>
          )}
          <div className="actionBtns">
            <Button
              text="Add more items"
              className="bordered"
              fullWidth
              onClick={() => router.push("/meals")}
            />
            <Button
              text="Make payment"
              fullWidth
              onClick={makeOrder}
              loading={loading}
            />
          </div>
        </Wrapper>
      </Layout>
    </>
  );
};

export default Review;

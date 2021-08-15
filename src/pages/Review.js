import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import AlertBox from "../components/AlertBox";
import Button from "../components/Button";
import Container from "../components/Container";
import Layout from "../components/Layout";
import Metas from "../components/Metas";
import closeIcon from "../assets/close.svg";

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

  .info {
    height: max-content;
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: #00000020;
  backdrop-filter: blur(10px);
  opacity: 0;
  pointer-events: none;
  transition: all 0.1s ease-out;
  z-index: 5;

  .content {
    bottom: -100%;
    transition: all 0.1s ease-out;
  }

  &.open {
    opacity: 1;
    pointer-events: all;

    .content {
      bottom: 0;
    }
  }

  @media screen and (min-width: 768px) {
    display: flex;
    align-items: center;
    padding: 2.4rem;

    &.open .content,
    .content {
      bottom: unset;
    }
  }
`;

const ModalContent = styled.div`
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--white);
  border-radius: 24px 24px 0px 0px;
  padding: 2.4rem;
  padding-bottom: 4.8rem;
  position: absolute;
  bottom: 0;
  left: 0;

  .header {
    width: 100%;
    position: relative;
    margin-bottom: 3.2rem;

    h4 {
      color: #14142b;
      width: 70%;
    }
  }

  .closeBtn {
    width: 2.4rem;
    height: 2.4rem;
    position: absolute;
    top: 0;
    right: 0;
  }

  .imgWrapper {
    width: 100%;
    height: 26.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 0.5rem;
    margin-bottom: 3.2rem;

    img {
      height: 100%;
    }
  }

  .actionBtns {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1.6rem;
    margin-top: 3.2rem;
  }

  @media screen and (min-width: 768px) {
    height: auto;
    padding: 4.8rem;
    border-radius: 2.4rem;
    position: relative;
    width: 40%;
    margin: auto;
    bottom: unset;
    left: unset;
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

  const handleCloseModal = (e) => {
    e.stopPropagation();
    document.querySelector("#selectPaymentMethod").classList.remove("open");
  };

  const makeOrder = async (e) => {
    const url = "https://order-api.blunch.ng/api";
    const meals = orders.map((order) => ({
      id: order.id,
      quantity: order.quantity,
      day_id: order.pivot.day_id,
      date: new Date()
        .toLocaleDateString("zh-Hans-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .split("/")
        .join("-"),
    }));
    const user_location = JSON.parse(localStorage.getItem("user_location"));

    const location_id = user_location?.id;

    let res;

    try {
      setLoading(true);
      res = await axios.post(
        `${url}/order?name=${deliveryInfo.name}&phone=${
          deliveryInfo.phone
        }&location_id=${Number(location_id)}&email=${
          deliveryInfo.email
        }&address=${deliveryInfo.delivery_address}`,
        { meals }
      );
    } catch (e) {
      setLoading(false);
      console.log(e.message);
    }

    if (res?.data?.status === "success") {
      window.location.replace(`${url}/paynow?order_id=${res.data?.order_id}`);
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
                    <span>
                      NGN{" "}
                      {userLocation.delivery_price *
                        Object.keys(
                          orders
                            .map((order) => order.pivot.day_id)
                            .reduce(function (acc, curr) {
                              return (
                                acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc
                              );
                            }, {})
                        ).length}
                    </span>
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
                          userLocation.delivery_price *
                            Object.keys(
                              orders
                                .map((order) => order.pivot.day_id)
                                .reduce(function (acc, curr) {
                                  return (
                                    acc[curr] ? ++acc[curr] : (acc[curr] = 1),
                                    acc
                                  );
                                }, {})
                            ).length
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
                    orders after 9am will be delivered between 1 - 3 hours from
                    when you place your order.
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
              onClick={() =>
                document
                  .querySelector("#selectPaymentMethod")
                  .classList.add("open")
              }
            />
          </div>
        </Wrapper>

        {/* Select payment method */}
        {orders && (
          <Modal
            id="selectPaymentMethod"
            onClick={(e) =>
              e.target.id === "selectPaymentMethod" && handleCloseModal(e)
            }
          >
            <ModalContent className="content">
              <div className="header">
                <h4>Select order method</h4>
                <button className="closeBtn" onClick={handleCloseModal}>
                  <img src={closeIcon} alt="close" />
                </button>
              </div>
              <div className="actionBtns">
                <Button
                  text="Continue to paystack"
                  fullWidth
                  onClick={makeOrder}
                  loading={loading}
                />
                <Button
                  as="a"
                  href={`https://api.whatsapp.com/send?phone=2348103891539&text=${encodeURIComponent(
                    `${orders
                      .map(
                        (order) =>
                          `\nDay: ${order.day}\nMeal: ${order.name}\nQuantity: ${order.quantity}\nPrice: ${order.total}\n\n`
                      )
                      .join("")}\nSub-total (${orders.length} order${
                      orders.length > 1 ? "s" : ""
                    }): ${formatNumber(
                      orders.reduce((a, b) => a + b.total, 0)
                    )}\nDelivery fee: ${
                      userLocation.delivery_price *
                      Object.keys(
                        orders
                          .map((order) => order.pivot.day_id)
                          .reduce(function (acc, curr) {
                            return (
                              acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc
                            );
                          }, {})
                      ).length
                    }\nTotal: ${formatNumber(
                      orders.reduce(
                        (a, b) => a + b.total,
                        userLocation.delivery_price *
                          Object.keys(
                            orders
                              .map((order) => order.pivot.day_id)
                              .reduce(function (acc, curr) {
                                return (
                                  acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc
                                );
                              }, {})
                          ).length
                      )
                    )}\n\n*Customer Information*\n${deliveryInfo?.name}\n${
                      deliveryInfo?.email
                    }\n${
                      deliveryInfo?.phone
                    }\n\n*Delivery Information*\n${location}\n${
                      deliveryInfo?.delivery_address
                    }\n${deliveryInfo?.instructions}\n`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  text="Order via whatsapp"
                  className="bordered"
                  fullWidth
                />
              </div>
            </ModalContent>
          </Modal>
        )}
      </Layout>
    </>
  );
};

export default Review;

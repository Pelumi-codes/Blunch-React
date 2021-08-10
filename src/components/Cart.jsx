import PropTypes from "prop-types";
import styled from "styled-components";
import close from "../assets/close.svg";
import Button from "./Button";
import Order from "./Order";
import { useState } from "react";
import AlertBox from "./AlertBox";
import { useHistory } from "react-router";

const Wrapper = styled.div`
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
    transition: all 0.2s ease-out 0.1s;
  }

  &.open {
    opacity: 1;
    pointer-events: all;

    .content {
      bottom: 0;
    }
  }

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 80vh;
  overflow-y: auto;
  display: ${(props) => (props.lg ? "none" : "flex")};
  flex-direction: column;
  background-color: ${(props) => (props.lg ? "var(--text)" : "var(--white)")};
  border-radius: 24px 24px 0px 0px;
  padding-block: 2.4rem;
  position: absolute;
  bottom: 0;
  left: 0;

  .header {
    width: 100%;
    position: sticky;
    top: 0;
    margin-bottom: 1.6rem;
    padding-bottom: 1.6rem;
    height: 3.2rem;
  }

  .closeBtn {
    width: 2.4rem;
    aspect-ratio: 1/1;
    position: absolute;
    top: 0;
    right: 2.4rem;
  }

  .subTotal {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem 2.4rem;
    padding-top: 3.2rem;
  }

  .actionBtns {
    width: 100%;
    padding: 1.6rem 2.4rem;
  }

  @media screen and (min-width: 768px) {
    height: 70vh;
    padding-bottom: 0;
    border-radius: 1rem;
    position: sticky;
    top: 0;
    width: 100%;
    bottom: unset;
    left: unset;
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-end;
    color: var(--white);
    z-index: 2;

    .header {
      display: none;
    }

    .inner {
      height: -webkit-fill-available;
      overflow-y: auto;
      padding-bottom: 10.8rem;
    }

    .subTotal {
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 1;
      width: 100%;
      background-color: var(--text);
      padding: 3.2rem 4.8rem;
      margin-top: 2.4rem;
      border-top: 1px solid var(--border_color);
    }

    .actionBtns {
      position: sticky;
      top: 0;
      z-index: 1;
      margin-top: 0;
      margin-bottom: 2.4rem;
      padding: 0 4.8rem;

      .btn {
        background-color: var(--white);
        color: var(--primary);
      }
    }
  }
`;

const NoItems = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #8d909150;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;

  p {
    text-align: center;
    color: var(--white);
  }
`;

const formatNumber = (num) => {
  const formatter = new Intl.NumberFormat();
  const toNum = Number(num);

  return formatter.format(toNum);
};

const Cart = ({ lg, orders, setOrders }) => {
  const [alertText, setAlertText] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useHistory();

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

  const handleClose = (e) => {
    e.stopPropagation();
    document.querySelector("#cart").classList.remove("open");
  };

  const handleCheckout = () => {
    if (orders.length) {
      router.push("/delivery_info");
    } else {
      showAlert("You must add at least 1 item to cart", false);
    }
  };

  const handleRemove = (index) => {
    let temp = [...orders];
    temp.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(temp));
    setOrders(temp);
  };

  if (lg && orders) {
    return (
      <Content lg>
        <AlertBox className="alertBox" success={success} text={alertText} />
        {!orders.length && (
          <NoItems>
            <p>You have no items in your cart</p>
          </NoItems>
        )}
        <div className="inner">
          {orders.map((order, index) => (
            <Order
              key={`${index}${order.id}`}
              index={index}
              _quantity={order.quantity}
              name={order.name}
              total={order.total}
              handleRemove={handleRemove}
              orders={orders}
              setOrders={setOrders}
              light
            />
          ))}
          {!!orders.length && (
            <div className="subTotal">
              <span className="sup">
                Sub-total ({orders.length} order{orders.length > 1 ? "s" : ""})
              </span>
              <span className="sup">
                NGN {formatNumber(orders.reduce((a, b) => a + b.total, 0))}
              </span>
            </div>
          )}
        </div>
        <div className="actionBtns">
          <Button
            className="btn"
            text="Checkout"
            fullWidth
            onClick={handleCheckout}
          />
        </div>
      </Content>
    );
  }

  return (
    <Wrapper
      id="cart"
      onClick={(e) => e.target.id === "cart" && handleClose(e)}
    >
      <AlertBox className="alertBox" success={success} text={alertText} />
      {orders && (
        <Content className="content">
          {!orders.length && (
            <NoItems onClick={handleClose}>
              <p>You have no items in your cart</p>
            </NoItems>
          )}
          <div className="header">
            <button className="closeBtn" onClick={handleClose}>
              <img src={close} alt="close" />
            </button>
          </div>
          <div className="inner">
            {orders.map((order, index) => (
              <Order
                key={`${index}${order.id}`}
                index={index}
                _quantity={order.quantity}
                name={order.name}
                total={order.total}
                handleRemove={handleRemove}
                orders={orders}
                setOrders={setOrders}
              />
            ))}
            {!!orders.length && (
              <div className="subTotal">
                <span className="sup">
                  Sub-total ({orders.length} order{orders.length > 1 ? "s" : ""}
                  )
                </span>
                <span className="sup">
                  NGN {formatNumber(orders.reduce((a, b) => a + b.total, 0))}
                </span>
              </div>
            )}
          </div>
          <div className="actionBtns">
            <Button
              className="btn"
              text="Checkout"
              fullWidth
              onClick={handleCheckout}
            />
          </div>
        </Content>
      )}
    </Wrapper>
  );
};

Cart.propTypes = {
  lg: PropTypes.bool,
  orders: PropTypes.any,
  setOrders: PropTypes.func,
};

export default Cart;

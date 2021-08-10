import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AddToCart from "../components/AddToCart";
import Button from "../components/Button";
import Container from "../components/Container";
import Dropdown from "../components/Dropdown";
import Layout from "../components/Layout";
import MealCard from "../components/MealCard";
import PreCheckout from "../components/Cart";
import { useHistory } from "react-router";
import Metas from "../components/Metas";
import map_pin from "../assets/map_pin.svg";

const Wrapper = styled(Container)`
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  >.content {
    width: 100%;
    height: calc(100vh - ${(props) => (props.orders.length ? 24 : 14.4)}rem);
    display: grid;
    grid-template-columns: 1fr;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    #cart {
      display: none;
    }
  }

  @media screen and (min-width: 768px) {

    >.content {
      height: calc(100vh - 19.2rem);
      grid-template-columns: 2fr 1fr;
      grid-gap: 3.2rem;
      padding-bottom: unset;

      #cart {
        display: block;
      }
    }
`;

const Header = styled.div`
  position: sticky;
  top: 0;
  padding-top: 7.2rem;
  padding-bottom: 3.6rem;

  .inner {
    display: flex;
    position: relative;
  }

  .change {
    position: absolute;
    right: 0;
    top: 0;
    width: 30%;
    z-index: 1;
  }

  @media screen and (min-width: 768px) {
    padding-top: 10.8rem;
    padding-bottom: 3.6rem;

    .inner {
      max-width: 32.7rem;
    }
  }
`;

const Section = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2.4rem;
  margin: 3.2rem 0;

  .title {
    text-transform: capitalize;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 3.2rem;

    .title {
      grid-column: 1/3;
    }
  }
`;

const CartPreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7.2rem;
  width: 100vw;
  background-color: var(--text);
  padding: 0 1.6rem;
  border-radius: 2rem 2rem 0 0;
  position: fixed;
  bottom: 0;
  z-index: 2;
  color: var(--white);

  .btn {
    background-color: var(--white);
    color: var(--text);
    width: 10.8rem;
  }

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const formatNumber = (num) => {
  const formatter = new Intl.NumberFormat();
  const toNum = Number(num);

  return formatter.format(toNum);
};

// const days = {
//   1: "monday",
//   2: "tuesday",
//   3: "wednesday",
//   4: "thursday",
//   5: "friday",
// };

export default function Meals() {
  const [location, setLocation] = useState("...");
  const [selectedMeal, setSelectedMeal] = useState(false);
  const [orders, setOrders] = useState(false);
  const [menu, setMenu] = useState(false);
  // const [ready, setReady] = useState(false);

  const router = useHistory();

  async function getStaticProps() {
    const res = await axios.get("https://order-api.blunch.ng/api/menu");
    const menu = res.data;

    if (menu) delete menu.status;

    setMenu(menu);
  }

  const handleMealSelect = () => {
    const selected_meal = JSON.parse(localStorage.getItem("selected_meal"));

    const mealData = menu[selected_meal.day].find(
      (meal) => meal.id === selected_meal.id
    );

    mealData && setSelectedMeal(mealData);
    document.querySelector("#addToCart").classList.add("open");
  };

  useEffect(() => {
    getStaticProps();
    const user_location = localStorage.getItem("user_location");
    // let today = new Date().getDay();
    let cart;

    if (!localStorage.getItem("cart")) {
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    cart = JSON.parse(localStorage.getItem("cart"));

    setOrders(cart.reverse());

    user_location && setLocation(JSON.parse(user_location).name);
    menu && localStorage.setItem("menu", JSON.stringify(menu));

    // setTimeout(() => {
    //   setReady(true);
    //   console.log(days[today], document.querySelector(`#tuesday`));
    //   days[today] &&
    //     document.querySelector(`#${days[today]}`) &&
    //     document.querySelector(`#${days[today]}`).scrollIntoView();
    // }, 1000);

    // ready && console.log(days[today], document.querySelector(`#tuesday`));
    // eslint-disable-next-line
  }, [location]);

  return (
    <>
      <Metas pageTitle="Meals" metaContent="Breakfast meals for lunch" />
      <Layout>
        {!!orders.length && (
          <CartPreview>
            <p>
              {orders.length} order{orders.length > 1 ? "s" : ""} - NGN{" "}
              {formatNumber(orders.reduce((a, b) => a + b.total, 0))}
            </p>
            <Button
              className="btn"
              text="View cart"
              onClick={() =>
                document.querySelector("#cart").classList.add("open")
              }
            />
          </CartPreview>
        )}
        <AddToCart content={selectedMeal} setOrders={setOrders} />
        <PreCheckout orders={orders} setOrders={setOrders} />
        <Wrapper orders={orders}>
          <Header>
            <div className="inner">
              <Dropdown
                id="locationInput"
                className="locationInput"
                name="location"
                setValue={setLocation}
                value={location}
                hasIcon
                icon={map_pin}
                readOnly
              />
              <Button
                className="change"
                text="Change"
                fullWidth
                onClick={() => router.push("/")}
              />
            </div>
          </Header>
          {menu && (
            <div className="content">
              <div className="listing">
                {menu &&
                  Object.keys(menu).map((day) => (
                    <Section key={day} id={day}>
                      <div className="title">
                        <h3 className="fontRegular">{day}</h3>
                      </div>
                      {menu[day]?.map((meal, index) => (
                        <MealCard
                          key={`${index}${meal.id}`}
                          {...meal}
                          day={day}
                          handleMealSelect={handleMealSelect}
                          orders={orders}
                        />
                      ))}
                    </Section>
                  ))}
              </div>
              <PreCheckout lg orders={orders} setOrders={setOrders} />
            </div>
          )}
        </Wrapper>
      </Layout>
    </>
  );
}

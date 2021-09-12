import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AddToCart from "../components/AddToCart";
import Button from "../components/Button";
import Container from "../components/Container";
import Dropdown from "../components/Dropdown";
import Layout from "../components/Layout";
import MealCard from "../components/MealCard";
import { useHistory } from "react-router";
import Metas from "../components/Metas";
import map_pin from "../assets/map_pin.svg";
import Cart from "../components/Cart";
import Loader from "../components/Loader";

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
  position: relative;

  .title {
    position: sticky;
    top: 0;
    text-transform: uppercase;
    background-color: var(--white);
    padding-bottom: 0.8rem;
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

const days = {
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
};

export default function Meals() {
  const [location, setLocation] = useState("...");
  const [selectedMeal, setSelectedMeal] = useState(false);
  const [orders, setOrders] = useState(false);
  const [menu, setMenu] = useState(
    JSON.parse(localStorage.getItem("menu")) || false
  );
  const [updateVal, setUpdateVal] = useState(0);
  const [loading, setLoading] = useState(false);

  const router = useHistory();

  const scrollIntoView = () => {
    let today = new Date().getDay();
    days[today] && document.querySelector(`#${days[today]}`).scrollIntoView();
  };

  async function getStaticProps() {
    setLoading(true);
    const res = await axios.get("https://order-api.blunch.ng/api/menu");

    const menu = res.data;

    if (menu) delete menu.status;

    if (menu) localStorage.setItem("menu", JSON.stringify(menu));

    setMenu(menu);
    setTimeout(() => scrollIntoView());
    setLoading(false);
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

    let cart;

    if (!localStorage.getItem("cart")) {
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    cart = JSON.parse(localStorage.getItem("cart"));

    setOrders(cart);

    user_location && setLocation(JSON.parse(user_location).name);
    menu && localStorage.setItem("menu", JSON.stringify(menu));

    // eslint-disable-next-line
  }, [location]);

  return (
    <>
      <Metas pageTitle="Meals" metaContent="Breakfast meals for lunch" />
      <Layout>
        {loading && <Loader />}
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
        <AddToCart
          content={selectedMeal}
          setOrders={setOrders}
          setUpdateVal={setUpdateVal}
        />
        <Cart orders={orders} setOrders={setOrders} updateVal={updateVal} />
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

          <div className="content">
            <div className="listing">
              {/* {Object.keys(menu).map((day) => (
                <Section key={day} id={day} >
                  <div className="title">
                    <h3 className="fontMedium">{day}</h3>
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
              ))} */}

              <Section id="monday">
                <div className="title">
                  {menu["monday"] && <h3 className="fontMedium">Monday</h3>}
                </div>
                {menu["monday"]
                  ?.filter(
                    (item) =>
                      new Date("2021-09-09").getTime() >
                      new Date(item.created_at).getTime()
                  )
                  .map((meal, index) => (
                    <MealCard
                      key={`${index}${meal.id}`}
                      {...meal}
                      day="monday"
                      handleMealSelect={handleMealSelect}
                      orders={orders}
                    />
                  ))}
              </Section>
              <Section id="tuesday">
                <div className="title">
                  {menu["tuesday"] && <h3 className="fontMedium">Tuesday</h3>}
                </div>
                {menu["tuesday"]
                  ?.filter(
                    (item) =>
                      new Date("2021-09-09").getTime() >
                      new Date(item.created_at).getTime()
                  )
                  .map((meal, index) => (
                    <MealCard
                      key={`${index}${meal.id}`}
                      {...meal}
                      day="tuesday"
                      handleMealSelect={handleMealSelect}
                      orders={orders}
                    />
                  ))}
              </Section>
              <Section id="wednesday">
                <div className="title">
                  {menu["wednesday"] && (
                    <h3 className="fontMedium">Wednesday</h3>
                  )}
                </div>
                {menu["wednesday"]
                  ?.filter(
                    (item) =>
                      new Date("2021-09-09").getTime() >
                      new Date(item.created_at).getTime()
                  )
                  .map((meal, index) => (
                    <MealCard
                      key={`${index}${meal.id}`}
                      {...meal}
                      day="wednesday"
                      handleMealSelect={handleMealSelect}
                      orders={orders}
                    />
                  ))}
              </Section>
              <Section id="thursday">
                <div className="title">
                  {menu["thursday"] && <h3 className="fontMedium">Thursday</h3>}
                </div>
                {menu["thursday"]
                  ?.filter(
                    (item) =>
                      new Date("2021-09-09").getTime() >
                      new Date(item.created_at).getTime()
                  )
                  .map((meal, index) => (
                    <MealCard
                      key={`${index}${meal.id}`}
                      {...meal}
                      day="thursday"
                      handleMealSelect={handleMealSelect}
                      orders={orders}
                    />
                  ))}
              </Section>
              <Section id="friday">
                <div className="title">
                  {menu["friday"] && <h3 className="fontMedium">Friday</h3>}
                </div>
                {menu["friday"]
                  ?.filter(
                    (item) =>
                      new Date("2021-09-09").getTime() >
                      new Date(item.created_at).getTime()
                  )
                  .map((meal, index) => (
                    <MealCard
                      key={`${index}${meal.id}`}
                      {...meal}
                      day="friday"
                      handleMealSelect={handleMealSelect}
                      orders={orders}
                    />
                  ))}
              </Section>
              <Section id="saturday">
                <div className="title">
                  {menu["saturday"] && <h3 className="fontMedium">Saturday</h3>}
                </div>
                {menu["saturday"]
                  ?.filter(
                    (item) =>
                      new Date("2021-09-09").getTime() >
                      new Date(item.created_at).getTime()
                  )
                  .map((meal, index) => (
                    <MealCard
                      key={`${index}${meal.id}`}
                      {...meal}
                      day="saturday"
                      handleMealSelect={handleMealSelect}
                      orders={orders}
                    />
                  ))}
              </Section>
            </div>
            <Cart
              lg
              orders={orders}
              setOrders={setOrders}
              updateVal={updateVal}
            />
          </div>
        </Wrapper>
      </Layout>
    </>
  );
}

import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "./Button";
import { useEffect, useState } from "react";
// import chicken_waffles from "../assets/menu/4 Chicken Waffles & 2 Sausages & Syrup.jpeg";
// import plain_waffles from "../assets/menu/4 Plain Waffles & 2 Sausages & Syrup.jpg";
// import pancakes_sausages_syrup from "../assets/menu/6 Pancakes & 2 Sausages & Syrup.jpeg";
// import chicken_sandwich from "../assets/menu/Chicken Sandwich.jpeg";
// import chicken_stirfry from "../assets/menu/Chicken Stir Fry Noodles.jpeg";
// import egg_mayo_sandwich from "../assets/menu/Egg & Mayo Sandwich.jpeg";
// import sardine_sandwich from "../assets/menu/Sardine Sandwich.jpeg";
// import suya_stirfry_extra_suya from "../assets/menu/Suya Stir Fry Noodles & Extra Suya.jpeg";
// import suya_stirfry from "../assets/menu/Suya Stir Fry Noodles.jpeg";
// import zobo from "../assets/menu/Zobo.jpeg";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 1.6rem;
  padding: 1.6rem;
  background-color: var(--background);
  border-radius: 1rem;

  .imgWrapper {
    width: 100%;
    height: 9.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 0.5rem;

    img {
      height: 100%;
    }
  }

  .mealName {
    margin-bottom: 0.8rem;
  }

  .mealPrice {
    color: #4f4f4f;
  }

  .btn {
    height: 3rem;
    width: 9.6rem;
    padding: 0.5rem;
    margin-top: 1.6rem;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: center;
  }

  @media screen and (min-width: 768px) {
    padding: 2.4rem;
    grid-template-columns: 10rem 2fr;
    grid-gap: 2.4rem;

    .imgWrapper {
      height: 10rem;
      border-radius: 0.8rem;
    }

    .btn {
      height: 4.8rem;
      width: 14.4rem;
    }
  }
`;

const formatNumber = (num) => {
  const formatter = new Intl.NumberFormat();
  const toNum = Number(num);

  return formatter.format(toNum);
};

// const photos = {
//   "4 Chicken Waffles + 2 Sausages + Syrup": chicken_waffles,
//   "4 Plain Waffles + 2 Sausages + Syrup": plain_waffles,
//   "6 Pancakes + 2 Sausages + Syrup": pancakes_sausages_syrup,
//   "Chicken Sandwich": chicken_sandwich,
//   "Chicken Stir Fry Noodles": chicken_stirfry,
//   "Egg & Mayo Sandwich": egg_mayo_sandwich,
//   "Sardine Sandwich": sardine_sandwich,
//   "Suya Stir Fry Noodles +Extra Suya": suya_stirfry_extra_suya,
//   "Suya Stir Fry Noodles": suya_stirfry,
//   Zobo: zobo,
// };

const API_HOST_PHOTO = "https://order-api.blunch.ng/api/photo";

const MealCard = (props) => {
  const { name, price, day, handleMealSelect } = props;
  const [canAdd, setCanAdd] = useState(true);

  const canAddToCart = (id, day) => {
    const _date = new Date();
    const _day = _date.getDay();
    const _hours = _date.getHours();
    // const cart = JSON.parse(localStorage.getItem("cart"));
    // const isInCart = cart && cart.some((item) => item.id === id && item.pivot.day_id === day);
    const isValidDay = day >= _day;
    const isPastTime = day === _day && _hours >= 15;

    return isValidDay && !isPastTime;
  };

  const handleClick = (e) => {
    e.stopPropagation();

    let selected_meal = {
      ...props,
      day,
    };

    localStorage.removeItem("selected_meal");

    localStorage.setItem("selected_meal", JSON.stringify(selected_meal));

    handleMealSelect && handleMealSelect();
  };

  useEffect(() => {
    setCanAdd(canAddToCart(props.id, props.pivot.day_id));
    // eslint-disable-next-line
  }, [props.orders]);

  return (
    <Wrapper>
      <div className="imgWrapper">
        <img src={`${API_HOST_PHOTO}/${props.photo}`} alt={name} />
      </div>
      <div className="content">
        <h4 className="mealName fontBold">{name}</h4>
        <p className="sup mealPrice fontRegular">NGN {formatNumber(price)}</p>
        <Button
          className="btn sup"
          text="Add to cart"
          onClick={handleClick}
          disabled={!canAdd}
        />
      </div>
    </Wrapper>
  );
};

MealCard.propTypes = {
  photo: PropTypes.any,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  day: PropTypes.string,
  handleMealSelect: PropTypes.func,
};

export default MealCard;

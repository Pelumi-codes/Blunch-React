import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Quantity from './Quantity';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1.6rem;
  padding: 1.6rem 2.4rem;
  border-bottom: 1px solid var(--border_color);

  .removeBtn {
    color: var(--danger);
    text-decoration: underline;
    margin-top: 1.6rem;
    font-weight: 500;
  }

  .price {
    text-align: right;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 2fr 2fr;
    padding: 2.4rem 4.8rem;
    border-top: 1px solid var(--border_color);
    border-bottom: none;
  }
` 

const formatNumber = (num) => {
  const formatter = new Intl.NumberFormat()
  const toNum = Number(num);

  return formatter.format(toNum);
};

const Order = ({_quantity, name, total, light, handleRemove, index, orders, setOrders}) => {
  const [quantity, setQuantity] = useState(_quantity);

  const handleQuanityChange = () => {
    const _orders = [...orders];
    const _order = orders[index];

    _order.quantity = quantity;
    _order.total = _order.price * _order.quantity;

    _orders.splice(index, 1, _order);

    localStorage.setItem("cart", JSON.stringify(_orders));
    setOrders(_orders);
  }

  useEffect(() => {
    handleQuanityChange();
    // eslint-disable-next-line
  }, [quantity])

  return (
    <Wrapper>
      <Quantity light={light} value={quantity} setValue={setQuantity} />
      <div>
        <p className="sup mealName">{name}</p>
        <button className="small removeBtn" onClick={() => handleRemove(index)}><span>Remove</span></button>
      </div>
      <div>
        <p className="price">NGN {formatNumber(total)}</p>
      </div>
    </Wrapper>
  );
}

export default Order;
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Container from "../components/Container";
import Layout from "../components/Layout";
import Metas from "../components/Metas";
import order_success from "../assets/order_success.svg";

const Wrapper = styled(Container)`
  width: 100%;
  padding-top: 10.8rem;
  padding-bottom: 4.8rem;
  display: grid;
  justify-content: center;
  grid-gap: 2.4rem;

  .prompt {
    font-weight: 700;
    margin-bottom: 1.6rem;
  }

  .imgWrapper {
    display: flex;
    justify-content: center;

    img {
      width: 100%;
    }
  }

  .textWrapper {
    text-align: center;
  }

  @media screen and (min-width: 768px) {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 6rem;
    align-items: center;

    .imgWrapper img {
      width: 48rem;
    }

    .textWrapper {
      text-align: left;
    }
  }
`;

function parseQuery(queryString) {
  var query = {};
  var pairs = (
    queryString[0] === "?" ? queryString.substr(1) : queryString
  ).split("&");
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split("=");
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
  }
  return query;
}

const Order_successful = () => {
  const [render, setRender] = useState(false);
  const router = useHistory();

  useEffect(() => {
    const { status } = parseQuery(window.location.search);
    if (status !== "success") {
      router.push("/review");
    } else {
      localStorage.removeItem("cart");
      localStorage.removeItem("delivery_info");
      setRender(true);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Metas pageTitle="Order successful" metaContent="Order successful" />
      <Layout>
        {render && (
          <Wrapper>
            <div className="imgWrapper">
              <img src={order_success} alt="Shopping bag" />
            </div>
            <div className="textWrapper">
              <h1 className="prompt">Order successful!</h1>
              <p>
                Your order has been received and will be
                <br />
                delivered on expected date of delivery.
              </p>
            </div>
          </Wrapper>
        )}
      </Layout>
    </>
  );
};

export default Order_successful;

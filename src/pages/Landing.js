import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import AlertBox from "../components/AlertBox";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import Layout from "../components/Layout";
import Metas from "../components/Metas";
import indexMeal from "../assets/indexMeal.svg";

const Wrapper = styled.div`
  height: 100vh;
  overflow: hidden;

  .text1 {
    font-size: 32px;
    font-weight: 400;
    line-height: 40px;
  }

  .text2 {
    color: var(--primary);
  }

  .text3 {
    color: var(--sup_text);
    margin-top: 1.2rem;
    font-weight: 300;
  }

  form {
    margin-top: 4.8rem;
  }

  .dropdown {
    margin-bottom: 1.6rem;
  }

  .contentLeft {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 2.4rem;
  }

  .contentRight {
    display: none;
  }

  @media screen and (min-width: 768px) {
    display: flex;

    .contentLeft {
      width: 50%;
      padding: 0 4.8rem;
    }

    .contentRight {
      width: 50%;
      display: block;
      position: relative;
    }

    .text1,
    .text2 {
      font-size: 72px;
      line-height: 80px;
    }

    .text3 {
      font-size: 26px;
      line-height: 36px;
    }

    form {
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-gap: 1.6rem;
    }

    .bg {
      height: 100%;
      width: calc(60% + 2.4rem);
      background-color: var(--primary);
      position: absolute;
      top: 0;
      right: 0;
      z-index: 0;
    }

    .meal {
      position: absolute;
      top: 50%;
      right: 30%;
      transform: translateY(-50%);
      z-index: 1;

      img {
        width: 100%;
      }
    }
  }
`;

export default function Landing() {
  const [alertText, setAlertText] = useState("");
  const [success, setSuccess] = useState(false);
  const [location, setLocation] = useState("Select your location");
  const [locations, setLocations] = useState(false);
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

  async function getStaticProps() {
    const res = await axios.get("https://order-api.blunch.ng/api/locations");
    const locations = res.data?.locations;

    if (!locations) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    setLocations(locations);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const location = document.querySelector(".locationInput").value;
    const _locations = locations.map((item) => item.name);

    if (_locations.includes(location)) {
      const user_location = locations.find((item) => item.name === location);
      localStorage.setItem("user_location", JSON.stringify(user_location));
      router.push("/meals");
    } else {
      showAlert("Please select a location", false);
    }
  };

  useEffect(() => {
    getStaticProps();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Metas pageTitle="Blunch.ng" metaContent="Breakfast at your doorstep" />
      <Layout>
        {locations && (
          <Wrapper>
            <AlertBox className="alertBox" success={success} text={alertText} />
            <div className="contentLeft">
              <h1 className="text1 fontRegular">Welcome to</h1>
              <h1 className="text2">Blunch.ng</h1>
              <h5 className="text3 fontRegular">Breakfast at your doorstep</h5>
              <form onSubmit={handleSubmit}>
                <Dropdown
                  id="locationInput"
                  name="location"
                  className="dropdown"
                  list={locations}
                  value={location}
                  setValue={setLocation}
                />
                <Button text="View meals" fullWidth />
              </form>
            </div>
            <div className="contentRight">
              <div className="bg"></div>
              <div className="meal">
                <img src={indexMeal} alt="Indomie and Suya Stir fry" />
              </div>
            </div>
          </Wrapper>
        )}
      </Layout>
    </>
  );
}

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Delivery_info from "./pages/Delivery_info";
import Landing from "./pages/Landing";
import Meals from "./pages/Meals";
import Order_successful from "./pages/Order_successful";
import PageNotFound from "./pages/PageNotFound";
import Review from "./pages/Review";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/meals" component={Meals} />
          <Route exact path="/delivery_info" component={Delivery_info} />
          <Route exact path="/review" component={Review} />
          <Route exact path="/order_successful" component={Order_successful} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { MenuBar } from "./components/MenuBar";
import { AuthProvider } from "./context/Auth";

import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Container } from "semantic-ui-react";
import { AuthRoute } from "./utils/AuthRoute";

function App() {
  return (
    <AuthProvider>
      <Container>
        <Router>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
        </Router>
      </Container>
    </AuthProvider>
  );
}

export default App;

import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import { MenuBar } from "./components/MenuBar";
import { AuthProvider } from "./context/Auth";

import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Container } from "semantic-ui-react";
import { AuthRoute } from "./utils/AuthRoute";
import { ViewportProvider } from "./context/Viewport";

function App() {
  return (
    <AuthProvider>
      <ViewportProvider>
        <Container>
          <Router>
            <MenuBar />
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
            <Route exact path="/posts/:postId" component={SinglePost} />
          </Router>
        </Container>
      </ViewportProvider>
    </AuthProvider>
  );
}

export default App;

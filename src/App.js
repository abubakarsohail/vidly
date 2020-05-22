import React, { Component } from "react";
import "./App.css";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFount";

import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import MovieForm from "./components/movieForm";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
    state = {};

    componentDidMount() {
        const user = auth.getCurrentUser();
        this.setState({ user });
    }

    render() {
        const { user } = this.state;
        return (
            <>
                <NavBar user={user} />
                <ToastContainer />
                <main role="main" className="container pt-5">
                    <Switch>
                        <Route path="/logout" component={Logout} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/register" component={RegisterForm} />
                        <ProtectedRoute
                            path="/movies/:id"
                            component={MovieForm}
                        />
                        <Route
                            path="/movies"
                            component={props => (
                                <Movies {...props} user={user} />
                            )}
                        />
                        <Route path="/customers" component={Customers} />
                        <Route path="/rentals" component={Rentals} />
                        <Route path="/not-found" component={NotFound} />
                        <Redirect from="/" exact to="/movies" />
                        <Redirect to="/not-found" />
                    </Switch>
                </main>
            </>
        );
    }
}

export default App;

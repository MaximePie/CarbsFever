import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from "history";
import ProductsPage from "./ProductsPage";
import TicketsPage from "./TicketsPage";
import Ticket from "./Ticket";
import Navbar from "./Navbar";
import {BrowserRouter, Route, Switch} from "react-router-dom";

function Example() {
    const browserHistory = createBrowserHistory()
    return (
        <BrowserRouter history={browserHistory}>
            <Navbar />
            <div className="mainContainer">
                <Switch>
                    <Route exact path="/" key="ticketsPage">
                        <TicketsPage/>
                    </Route>
                    <Route path="/ticket/:id" key="ticket">
                        <Ticket/>
                    </Route>
                    <Route path="/products" key="products">
                        <ProductsPage/>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default Example;

if (document.getElementById('root')) {
    ReactDOM.render(<Example />, document.getElementById('root'));
}

import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from "history";
import TicketsPage from "./TicketsPage";
import Ticket from "./Ticket";
import {BrowserRouter, Route, Switch} from "react-router-dom";

function Example() {
    const browserHistory = createBrowserHistory()
    return (
        <BrowserRouter history={browserHistory}>
            <div className="mainContainer">
                <Switch>
                    <Route exact path="/" key="ticketsPage">
                        <TicketsPage/>
                    </Route>
                    <Route path="/tickets/:id" key="ticket">
                        <Ticket/>
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

import React from 'react';
import moment from "moment";
import {Link} from "react-router-dom";

export default function TicketsPage() {

    const [ticketsList, setTicketsList] = React.useState([]);

    React.useEffect(() => {
        axios.get('/api/tickets/')
            .then(response => {
                setTicketsList([...response.data])
            }).catch(err => {
            console.log(err)
        })
    }, []);


    return (
        <div className="TicketsPage">
            {ticketsList.map((ticket) => {
                return (
                    <div className="TicketPage__ticket">
                        <h3>{ticket.user.name} - <span className="TicketPage__ticket-date">{moment(ticket.created_at).format('Do/MM')}</span></h3>
                        <p>
                            {ticket.target}
                        </p>
                        <p>
                            {ticket.current}
                        </p>
                        <Link to={'/ticket/' + ticket.user.name} className="TicketsPage__link">Afficher</Link>
                    </div>
                )
            })}
        </div>
    );
}

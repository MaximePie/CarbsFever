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
                    <div className="TicketsPage__ticket">
                        <h3>{ticket.user.name} - <span className="TicketsPage__ticket-date">{moment(ticket.created_at).format('Do/MM')}</span></h3>
                        <p>
                            Objectif : {ticket.target}
                        </p>
                        <p>
                            Total : {ticket.current}
                        </p>
                        <Link to={'/ticket/' + ticket.id} className="TicketsPage__link">Afficher</Link>
                    </div>
                )
            })}
        </div>
    );
}

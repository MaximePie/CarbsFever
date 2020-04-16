import React from 'react';
import {useParams} from "react-router-dom";

export default function Ticket() {
    const [ticket, setTicket] = React.useState(undefined);
    // const [productName, setProductName] = React.useState('');
    let { id } = useParams();

    console.log(id)


    React.useEffect(() => {
        axios.get('/api/tickets/' + id)
            .then(response => {
                setTicket(response.data)
            }).catch(err => {
            console.log(err)
        })
    }, []);


    return (
        <div className="Ticket">
            C'est le component
            {ticket && (
                <div className="Ticket__content">
                    <h3>{ticket.user.name}</h3>
                    <p>{ticket.target}</p>
                    <p>{ticket.current}</p>
                    {ticket.lines.map(line => {
                        return (
                            <div className="Ticket__line">
                                <span className="Ticket__line-detail">{line.id}</span>
                                <span className="Ticket__line-detail">{line.product.name}</span>
                            </div>
                        )
                    })}


                </div>
            )}
        </div>
    );
}

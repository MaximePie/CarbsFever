import React from 'react';
import {useParams} from "react-router-dom";

export default function Ticket() {
    const [ticket, setTicket] = React.useState(undefined);
    const [productName, setProductName] = React.useState('');
    const [portion, setPortion] = React.useState(1);
    const [carbsPerHundred, setCarbsPerHundred] = React.useState(undefined);
    const [gramsPerPortion, setGramsPerPortion] = React.useState(undefined);

    const [isExpanded, setExpansion] = React.useState(false);
    let {id} = useParams();

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

                    <input value={productName} type="text" onChange={(event) => setProductName(event.target.value)}/>
                    <input value={portion} type="text" onChange={(event) => setPortion(event.target.value)}/>
                    {isExpanded && (
                        <>
                            <input
                                placeholder="Calories pour 100g"
                                value={carbsPerHundred}
                                type="text"
                                onChange={
                                    (event) => setCarbsPerHundred(event.target.value)
                                }
                            />
                            <input
                                placeholder="Grammes par portion"
                                value={gramsPerPortion}
                                type="text"
                                onChange={
                                    (event) => setGramsPerPortion(event.target.value)
                                }
                            />
                        </>
                    )}
                    <button type="submit" onClick={submitProduct}>Enregistrer</button>
                </div>
            )}
        </div>
    );

    function submitProduct() {
        axios.post('/api/carbsLine/' + ticket.id, {
            product: productName,
            portion,
            carbsPerHundred: carbsPerHundred || undefined,
            gramsPerPortion: gramsPerPortion || undefined,
        }).then(response => {
            if (response.data[0] !== 500) {
                setTicket(response.data);
                setProductName('');
                setExpansion(false);
                setCarbsPerHundred(0);
                setGramsPerPortion(0);
                setPortion(0);
            }
            setExpansion(true);
        }).catch(err => {
            console.log(err)
        })
    }
}

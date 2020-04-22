import React from 'react';
import {useParams} from "react-router-dom";
import CarbsLine from "./CarbsLine";

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
            {ticket && (
                <div className="Ticket__content">
                    <div className="Ticket__header">
                        <h3 className="Ticket__title">{ticket.user.name}</h3>
                        <div className="Ticket__details">
                            <p className="Ticket__detail">
                                <span className="Ticket__subdetail">
                                    Maximum: {ticket.target}
                                </span>
                                <span className="Ticket__subdetail">
                                    Actuel: {ticket.current}
                                </span>
                            </p>
                            <p className="Ticket__detail Ticket__detail--big">
                                Restant: {ticket.target - ticket.current}
                            </p>
                        </div>
                    </div>
                    {ticket.lines.map(line => {
                        return (
                            <CarbsLine line={line}/>
                        )
                    })}

                    <div className="Ticket__fields">
                        <input
                            className="Ticket__fields-input"
                            value={productName}
                            placeholder="Aliment"
                            type="text"
                            onChange={(event) => setProductName(event.target.value)}
                        />
                        <input
                            className="Ticket__fields-input"
                            placeholder="Portion"
                            value={portion}
                            type="text"
                            onChange={(event) => setPortion(event.target.value)}
                        />
                        {isExpanded && (
                            <>
                                <input
                                    className="Ticket__fields-input"
                                    placeholder="Calories pour 100g"
                                    value={carbsPerHundred}
                                    type="text"
                                    onChange={
                                        (event) => setCarbsPerHundred(event.target.value)
                                    }
                                />
                                <input
                                    className="Ticket__fields-input"
                                    placeholder="Grammes par portion"
                                    value={gramsPerPortion}
                                    type="text"
                                    onChange={
                                        (event) => setGramsPerPortion(event.target.value)
                                    }
                                />
                            </>
                        )}
                    </div>
                    <div className="Ticket__actions PrimaryButton">
                        <button
                            disabled={!productName || !portion}
                            type="submit"
                            onClick={submitProduct}
                            className="Ticket__submit"
                        >
                            Enregistrer
                        </button>
                    </div>
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
                setPortion(1);
            }
            else {
                setExpansion(true);
            }
        }).catch(err => {
            console.log(err)
        })
    }
}

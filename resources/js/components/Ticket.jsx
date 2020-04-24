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
        fetchData();
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
                    {ticket.lines.map(line => <CarbsLine line={line} onDeleteLine={deleteLine}/>)}
                    <div className="Ticket__fields">
                        <input
                            className="Ticket__fields-input"
                            value={productName}
                            placeholder="Aliment"
                            type="text"
                            onChange={(event) => setProductName(event.target.value)}
                        />
                        <div className="Ticket__fields-input Ticket__fields-input--with-sub-parts">
                            <input
                                className="Ticket__fields-input--number"
                                placeholder="Portion"
                                value={portion}
                                type="text"
                                onChange={(event) => setPortion(event.target.value)}
                            />
                            <div className="Ticket__fields-input-arrows">
                                <i className="Ticket__fields-input-arrow fas fa-caret-up" onClick={increasePortion}/>
                                <i className="Ticket__fields-input-arrow fas fa-caret-down" onClick={decreasePortion}/>
                            </div>
                        </div>
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

    /**
     * Fetch the data of the ticket
     */
    function fetchData() {
        axios.get('/api/tickets/' + id)
            .then(response => {
                setTicket(response.data)
            }).catch(err => {
            console.log(err)
        })
    }

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
            } else {
                setExpansion(true);
            }
        }).catch(err => {
            console.log(err)
        })
    }

    function deleteLine(lineId) {
        axios.get('/api/carbsLine/delete/' + lineId)
            .then((response) => {
                fetchData();
            }).catch(err => {
            console.log(err)
        });
    }


    /**
     * Decrements portions amount
     */
    function decreasePortion() {
        if (portion > 1) {
            setPortion(portion - 1);
        }
    }

    /**
     * Increments portions amount
     */
    function increasePortion() {
        if (portion < 10) {
            setPortion(portion + 1);
        }
    }
}

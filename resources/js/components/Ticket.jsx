import React from 'react';
import {useParams} from "react-router-dom";
import CarbsLine from "./CarbsLine";
import Loading from "./Loading";
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useHistory } from "react-router-dom";

export default function Ticket(props) {
    const history = useHistory();

    const [productsList, setProductsList] = React.useState([]);

    const [ticket, setTicket] = React.useState(undefined);
    const [productName, setProductName] = React.useState('');
    const [portion, setPortion] = React.useState(1);
    const [carbsPerHundred, setCarbsPerHundred] = React.useState(undefined);
    const [gramsPerPortion, setGramsPerPortion] = React.useState(undefined);

    const [isLoading, setIsLoading] = React.useState(false);
    const [areDetailsExplained, setDetailsExplanation] = React.useState(false);

    const [isExpanded, setExpansion] = React.useState(false);
    let {id} = useParams();

    React.useEffect(() => {
        fetchTicketData();
        fetchProducts();
    }, [id]);

    return (
        <div className="Ticket">
            <Loading isHidden={!isLoading}/>
            {ticket && (
                <>
                    <div className="Ticket__header">
                        <div className="Ticket__header-actions">
                            <h3 className="Ticket__title">{ticket.user.name}</h3>
                            <i className="Ticket__header-action fas fa-user" onClick={goToUserProfile}/>
                            <i className="Ticket__header-action fas fa-sync" onClick={goToCurrentTicket}/>
                            <i className="Ticket__header-action Ticket__header-action--trigger fas fa-question-circle"
                               onClick={() => setDetailsExplanation(!areDetailsExplained)}
                            />
                        </div>
                        <Collapse in={areDetailsExplained}>
                            <div className="Ticket__actions-details">
                                <div className="Ticket__actions-detail">
                                    <i className="Ticket__actions-detail-icon fas fa-user"/>
                                    Consulter le profil de {ticket.user.name}
                                </div>
                                <div className="Ticket__actions-detail">
                                    <i className="Ticket__actions-detail-icon fas fa-sync"/>
                                    Afficher le ticket du jour
                                </div>
                            </div>
                        </Collapse>
                        <Collapse in={!areDetailsExplained}>
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
                        </Collapse>
                    </div>
                    <div className="Ticket__body">
                        {ticket.lines.map(line =>
                            <CarbsLine line={line} onDeleteLine={deleteLine} onIncrementLine={incrementLine}/>
                            )}
                        <div className="Ticket__fields">
                            <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                options={productsList}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Aliment"
                                        margin="normal"
                                        variant="outlined"
                                        onChange={(event) => setProductName(event.target.value)}
                                    />
                                )}
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
                </>
            )}
        </div>
    );

    /**
     * Fetch the data of the ticket
     */
    function fetchTicketData() {
        setIsLoading(true);
        axios.get('/api/tickets/' + id)
            .then(response => {
                setTicket(response.data);
                setIsLoading(false);
            }).catch(err => {
            console.log(err)
        })
    }

    /**
     * Fetch the list of products names
     */
    function fetchProducts() {
        setIsLoading(true);
        axios.get('/api/products')
            .then(response => {
                setProductsList(response.data.map((product) => product.name));
                setIsLoading(false);
            }).catch(err => {
            console.log(err)
        })
    }

    function submitProduct() {
        setIsLoading(true);
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
            setIsLoading(false);
        }).catch(err => {
            console.log(err)
        })
    }

    /**
     * Deletes the selected line from the ticket
     * @param lineId
     */
    function deleteLine(lineId) {
        setIsLoading(true);
        axios.get('/api/carbsLine/delete/' + lineId)
            .then((response) => {
                fetchTicketData();
            }).catch(err => {
            console.log(err)
        });
    }


    /**
     * Increments the selected carbs Line instead of creating a new line entry
     * @param lineId
     */
    function incrementLine(lineId) {
        setIsLoading(true);
        axios.get('/api/carbsLine/increment/' + lineId)
            .then((response) => {
                fetchTicketData();
            }).catch(err => {
            console.log(err)
        });
    }

    /**
     * Redirects to ticket's user page
     */
    function goToUserProfile() {
        history.push('/profile/' + ticket.user.name);
    }


    /**
     * Synchronises tickets based on current user
     */
    function goToCurrentTicket() {
        history.push('/ticket/' + ticket.user.name);
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

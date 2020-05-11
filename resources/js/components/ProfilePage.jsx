import React from 'react';
import {useParams} from "react-router-dom";
import classnames from 'classnames';
import {
    LineChart, XAxis, YAxis, CartesianGrid, Line, Legend,
} from 'recharts';
import moment from "moment";

export default function ProfilePage(props) {
    let {username: paramsUserName} = useParams();
    const [username, setUsername] = React.useState(paramsUserName);
    const [userInfo, setUserInfo] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        if (username === "default_profile") {
            const promptedUsername = window.prompt("Oui bonjour ? Comment vous appelez-vous ?");
            setUsername(promptedUsername);
            props.history.push('/profile/' + promptedUsername);
        } else {
            fetchData();
        }
    }, [username]);

    return (
        <div className="ProfilePage">
            {userInfo && (
                <>
                    <div className="ProfilePage__composites-container">
                        <div className="ProfilePage__composite">
                            <span className="ProfilePage__composite-label">
                                Moyenne :
                            </span>
                            <span className="ProfilePage__composite-primary-value">
                                {Math.round(userInfo.average)}
                            </span>
                            <span className={
                                classnames(
                                    "ProfilePage__composite-secondary-value",
                                    {"ProfilePage__composite-secondary-value--warning": userInfo.targetComparison > 0},
                                    {"ProfilePage__composite-secondary-value--safe": userInfo.targetComparison < 0}
                                )
                            }>
                                {userInfo.targetComparison > 0 && "+"}
                                {Math.round(userInfo.targetComparison)}
                            </span>
                        </div>
                    </div>
                    <div className="ProfilePage__chart">
                        <LineChart width={lineChartSize()} height={lineChartSize()} data={userInfo.progress}>
                            <Line type="monotone" dataKey="reel" stroke="#8884d8" />
                            <Line type="monotone" dataKey="objectif" stroke="#82ca9d" />
                            <Legend />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid stroke="#ccc" />
                        </LineChart>
                    </div>
                </>
            )}
        </div>
    );


    /**
     * Fetch the data of the ticket
     */
    function fetchData() {
        setIsLoading(true);
        axios.get('/api/profil/' + username)
            .then(response => {
                setUserInfo({
                    average: response.data.average,
                    targetComparison: response.data.targetComparison,
                    progress: response.data.progress.map((dataCell) => {
                        return {
                            name: ' ',
                            reel: dataCell.current,
                            objectif: response.data.user.target,
                            amt: response.data.user.target,
                        }
                    }),
                });
                setIsLoading(false);
            }).catch(err => {
            console.log(err)
        })
    }

    /**
     * Calculates the size of the chart component according to its viewport type
     * @returns {number}
     */
    function lineChartSize() {
        if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 768) {
            return 300;
        }

        return 400;
    }
}

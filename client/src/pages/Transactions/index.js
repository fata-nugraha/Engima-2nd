import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './../../components/Navbar'
import Search from './../Search'
import { Redirect } from 'react-router-dom';


const Transaction = (props) => {
    const [transactionList, setTransactionList] = useState([])

    async function getTransactionHistory(id) {
        let url = `http://3.209.51.126:3030/returnAllTransaction/${id}`
        axios.get(url)
            .then(res => {
                setTransactionList(res.data.values)
            })
    }

    useEffect(() => {
        getTransactionHistory(1)
    })


    let items = transactionList.map((item) =>
        <div key={item.id_transaksi} className="search-thumbnail">
            <h5>Movie ID : {item.id_film}</h5>
            <h5>Schedule : {item.jadwal_film}</h5>
        </div>
    )

    if (props.isAuth) {
        return (
            <div id="container">
                <div id="content">
                    <Navbar
                        searchMovies={props.searchMovies}
                        search={props.search}
                        isAuth={props.isAuth}
                    />
                    <Search
                        searching={props.searching}
                        query={props.searchQuery}
                        searchResults={props.searchResults}
                        resetSearchQuery={props.resetSearchQuery}
                    />
                    <h4>Transaction History</h4>
                    {items}
                </div>
            </div>
        )
    } else {
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    }
}

export default Transaction

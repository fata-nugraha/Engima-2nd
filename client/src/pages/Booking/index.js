import React from 'react';
import './booking.css';
import axios from 'axios';
import Arrow from './../../img/panah.PNG';
import { Router, Link } from 'react-router-dom';

class Booking extends React.Component {
    state = {
        seat: [],
        selected: null
    }

    getSeat = async id_schedule => {
        let url = `http://engima.tannaga.com:9090/api/seat/getAllSeats?id_schedule=${id_schedule}`
        // const seatList = await axios.get(url)
        // this.setState({ seat: seatList })
        // console.log(this.state.seat)
        axios.get(url)
            .then(res => {
                this.setState({ seat: res.data })
                console.log(typeof (res))
                console.log(res)
            })
    }

    componentDidMount() {
        this.getSeat(1);
        console.log(this.state.seat)
    }

    selectSeat = (seat_num) => {
        this.setState({ selected: seat_num })
    }

    bookSeat = () => {
        // var d = new Date()
        // var waktuTransaksi = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()

        // let url = `http://3.209.51.126:3030/addTransaction`
        // axios.post(url, {
        //     id_pengguna: 1,
        //     id_film: 1,
        //     no_akun_virtual: 724892,
        //     jadwal_film = waktuTransaksi
        // })
    }

    render() {
        const items = this.state.seat.map((item) =>
            <li>
                <button
                    key={item.chair_number}
                    id={`${item.chair_number}`}
                    disabled={item.taken == 1 ? true : false}
                    onClick={() => this.selectSeat(item.chair_number)}
                >
                    {item.chair_number}
                </button>
            </li>
        )

        if (this.state.selected == null) {
            return (
                <div>
                    <div className="bg-white">
                        <div className="heading-plus-back-button">
                            <div className="back-button">
                                <Link to='/transaction'><img src={`${Arrow}`} id="back-icon" alt="back arrow" /></Link>
                            </div>
                            <div className="heading">
                                <h1>Avengers: Endgame</h1>
                                <h3>September 4, 2019 - 09:40</h3>
                            </div>
                        </div>
                        <div className="modal">
                            <div className="modal-content">
                                <h1>Payment Success!</h1>
                                <p>Thank you for purchasing! You can view your purchase now.</p>
                                <button className="blue-button" id="trans-button">Go to transaction history</button>
                            </div>
                        </div>
                        <div className="ticket-section">
                            <div className="studio">
                                <ol className="seat-section">{items}</ol>
                                <div className="screen">Screen</div>
                            </div>
                            <div className="summary">
                                <div>
                                    <h2>Booking Summary</h2>
                                    <p>You haven't selected any seat yet. Please click on one of the seat provided.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <script src="./booking.js"></script> */}
                </div >
            )
        } else {
            return (
                <div>
                    <div className="bg-white">
                        <div className="heading-plus-back-button">
                            <div className="back-button">
                                <Link to='/transaction'><img src={`${Arrow}`} id="back-icon" alt="back arrow" /></Link>
                            </div>
                            <div className="heading">
                                <h1>Avengers: Endgame</h1>
                                <h3>September 4, 2019 - 09:40</h3>
                            </div>
                        </div>
                        <div className="modal">
                            <div className="modal-content">
                                <h1>Payment Success!</h1>
                                <p>Thank you for purchasing! You can view your purchase now.</p>
                                <button className="blue-button" id="trans-button">Go to transaction history</button>
                            </div>
                        </div>
                        <div className="ticket-section">
                            <div className="studio">
                                <ol className="seat-section">{items}</ol>
                                <div className="screen">Screen</div>
                            </div>
                            <div className="summary">
                                <div>
                                    <h3>Avengers: Endgame</h3>
                                    <p>Semptember 4, 2019 - 09:40</p>
                                    <div className="number-price">
                                        <h3 id="seatnumber">Seat #{this.state.selected}</h3>
                                        <h3>Rp 75.000,-</h3>
                                    </div>
                                    {/* <button className="blue-button ticket-button" action="/api/user/takeSeat" method="POST">Buy Ticket</button> */}
                                    <button className="blue-button ticket-button">Buy Ticket</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <script src="./booking.js"></script> */}
                </div>
            )
        }
    }
}

export default Booking

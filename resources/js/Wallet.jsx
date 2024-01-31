import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import TransferForm from "./components/TransferForm";
import Header from "./components/Header";
import TransferList from './components/TransferList';
import '../css/app.css';

export default function Wallet() {
    const [state, setState] = useState({
        money: 0.0,
        transfers: [],
        error: null,
        form: {
            description: '',
            amount: '',
            wallet_id: 1
        }
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await fetch('http://localhost:8000/api/wallet', {
                    mode: 'no-cors'
                });
                let data = await res.json();
                setState({
                    money: data.money,
                    transfers: data.transfers
                });
            } catch (error) {
                setState({ error });
            }
        };

        fetchData();
    }, []);

    const handleChange = (updatedForm) => {
        setState((prevState) => ({
            ...prevState,
            form: updatedForm,
        }));
    };

    const handleSubmit = async () => {
        console.log("Formulario enviado:", state.form);
        try {
            const requestBody = {
                ...state.form,
                wallet_id: 1
            };
             console.log(requestBody)
            let config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(requestBody)
            };
    
            let res = await fetch('http://localhost:8000/api/transfer', config);
            let data = await res.json();
            setState({
                transfers: data,
                money: state.money + (data.amount)
            })
            console.log("Respuesta del servidor:", data);
            window.location.reload();
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };
    

    return (
        <>
            <Header />
            <div className="container">
                <div className="efective sep-header" >
                   ${state.money}
                </div>
                <TransferForm form={state.form} handleChange={handleChange} handleSubmit={handleSubmit}/>
            </div>
            <div className="container">
                <TransferList transfers={state.transfers}/>
            </div>

        </>
    )
};

if (document.getElementById('larawallet')) {
    createRoot(document.getElementById('larawallet')).render(<Wallet />);
}
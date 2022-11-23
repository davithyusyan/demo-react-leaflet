import React, { useState } from 'react'
import MyPopup from './Popup';



const Locations = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');

    const handleClick = () => {
        getLocations();
        setData([]);
        setOpen(true);
    };
    const closeModal = () => {
        setOpen(false);
    };

    const getLocations = async () => {
        setLoading(true);
        const geo_location = await (await fetch('https://geolocation-db.com/json/')).json();
        const { IPv4 } = geo_location;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        const url = `https://dev-sso.transparenterra.com/api/location-list-by-ip?ip=${IPv4}`
        try{
            const res = await (await fetch(url, requestOptions)).json();
            setLoading(false);
            if (res.data) {
                setTitle('List of locations');
                setData(res.data)
            } else {
                setTitle('Errors');
                setData(res.errors?.messages || 'Something went wrong, try again.')
            }
        }catch(e) {
            setLoading(false);
            setTitle('Errors');
            setData('Something went wrong, try again.')
        }
        
    }

    return (
        <div>
            <button onClick={event => handleClick(event)} className='locations btn'>Show Locations</button>
            <MyPopup loading={loading} title={title} data={data} open={open} closeModal={closeModal} />
        </div>
    );
};

export default Locations;
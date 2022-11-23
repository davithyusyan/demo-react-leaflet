import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import AddMarker from '../components/AddMarker';
import Button from '../components/Button';
import MyPopup from '../components/Popup';



const OpenMap = () => {
  const [locations, setLocations] = useState([]);
  const [positions, setPositions] = useState();
  const [errors, setErrors] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const getLocations = async () => {
    const res = await (
      await fetch(
        "https://dev-sso.transparenterra.com/api/location-list"
      )
    ).json();
    if (!res.errors) {
      setLocations(res.data);
      setErrors('');
    } else {
      setErrors(res.errors.messages);
      setOpen(true);
    }
  }

  const Markers = ({ data }) => {
    return data.map(({ coord_x, coord_y }, index) => {
      if (coord_x !== 'undefined' && coord_y !== 'undefined') {
        return (
          <Marker
            key={index}
            position={[coord_x, coord_y]}
          >
          </Marker>
        )
      } 
      return null;
    });
  }

  const save = async (event) => {
    const geo_location = await (await fetch('https://geolocation-db.com/json/')).json();
    const { IPv4 } = geo_location;
    const { lat, lng } = positions;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };
    const url = `https://dev-sso.transparenterra.com/api/save-location?ip=${IPv4}&coord_x=${lat}&coord_y=${lng}`
    const data = await (await fetch(url, requestOptions)).json();
    setPositions(null)
    if (data.messages !== 'location saved') {
      setLocations(oldArray => [...oldArray, {coord_x:lat, coord_y:lng}]);
      setErrors('Something went wrong, try again');
      setOpen(true);
    }

  }

  const handleMarker = position => {
    setPositions(position);
  };

  const closeModal = () => {
    setOpen(false);
    navigate("/")
  };

  useEffect(() => {
    // fetch data
    getLocations()
  }, []);

  return (
    <div className='map-leaflet'>
      <MapContainer center={[52.22977, 21.01178]} zoom={5} scrollWheelZoom={false} whenCreated={setLocations}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations && locations.length &&
        
          <Markers data={locations} />
        }
        <AddMarker handleMarker={handleMarker} />
      </MapContainer>

      {positions &&
        <div className='save'>
          <Button handleClick={save} />
        </div>
      }
      {errors &&
        <MyPopup title='Error' data={errors} open={open} closeModal={closeModal} />
      }

      <button className="close" onClick={() => navigate("/")}>×</button>

    </div>
  )
}

export default OpenMap;
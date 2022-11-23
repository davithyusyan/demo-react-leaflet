import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const Markers = ({ data }) => {
    return data.map(({ coord_x, coord_y }, index) => {

        if(coord_x != 'undefined' && coord_y != 'undefined') {
            return (
                <Marker
                    key={index}
                    position={[coord_x, coord_y]}
                >
                </Marker>
            )
        }
       
    });
}

const MapWrapper = (props) => {
    const { locations } = props
    return (
        <MapContainer center={[52.22977, 21.01178]} zoom={5} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations && locations.length &&
                <Markers data={locations} />
            }
        </MapContainer>
    )
}

export default MapWrapper;
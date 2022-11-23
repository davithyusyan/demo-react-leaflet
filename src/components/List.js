const Table = ({data}) => {
    return (
        <table className="styled-table">
            <thead>
                <tr>
                    <th>Ip</th>
                    <th>Coord_x</th>
                    <th>Coord_Y</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(({ ip, coord_x, coord_y }, index) =>
                        <tr key={index}>
                            <td>{ip}</td>
                            <td>{coord_x}</td>
                            <td>{coord_y}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

const List = ({ data }) => {
    return (
        <>
            {data.length ? <Table data={data}/> : <>Not Found</>}
        </>
    )
}


export default List;
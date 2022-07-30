function Miner({id, region, rank, score, freeSpaceGB}) {
    return (
    <tr className="miner">
        <td>{id}</td>
        <td>{region}</td>
        <td>{rank}</td>
        <td>{score}</td>
        <td>{freeSpaceGB} GB</td>
    </tr>
    );
};

export default Miner;
import Miner from './Miner'

function MinerTable({ miners }) {
    return (
        <tbody>
            {miners.map((miner) => 
                <Miner 
                key={miner.id}
                id={miner.address}
                region={miner.region}
                rank={miner.rank}
                score={Math.trunc(miner.score)}
                freeSpaceGB={(miner.freeSpace) / Math.pow(1024, 3) }
                />
                )
            }          
        </tbody>
    );
};


export default MinerTable;
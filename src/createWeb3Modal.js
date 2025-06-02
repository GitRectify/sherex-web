import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { bscTestnet, bsc } from '@reown/appkit/networks';

const projectId = '11aa8bbd07788e08507a88ca012ad3ae';

const polygon = {
    chainId: 137,
    name: 'Polygon',
    currency: 'POL',
    explorerUrl: 'https://polygonscan.com',
    rpcUrl: 'https://polygon-mainnet.g.alchemy.com/v2/eMY6MFJNWoq7P3I5EnZTmqHqOPSphnAq'
}

const amoy = {
    chainId: 80002,
    name: 'Amoy',
    currency: 'POL',
    explorerUrl: 'https://amoy.polygonscan.com',
    rpcUrl: 'https://polygon-amoy.g.alchemy.com/v2/eMY6MFJNWoq7P3I5EnZTmqHqOPSphnAq'
}

const mainnet = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/scS7rThd70YD61xEU80rJAZnQArQ36Dw'
}

const sepolia = {
    chainId: 11155111,
    name: 'Sepolia',
    currency: 'SepoliaETH',
    explorerUrl: 'https://sepolia.etherscan.io',
    rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/s6C7JIaQX-lqPyFsZBZe8fIR2eofhnI1'
}

// const metadata = {
//     name: 'AltiliumDAO Presale',
//     description: 'New Funding Project for Renewable Energy Powered By Solar Home.',
//     url: 'https://presale.altiliumdao.com/',
//     icons: []
// }

const metadata = {
    name: 'Sherex DEX',
    description: 'Sherex DEX is a decentralized exchange platform that allows users to trade cryptocurrencies.',
    url: 'https://sherex.io',
    icons: []
}

createAppKit({
    adapters: [new EthersAdapter()],
    metadata: metadata,
    networks: [bsc],
    projectId,
    features: {
        analytics: true,
    }
})
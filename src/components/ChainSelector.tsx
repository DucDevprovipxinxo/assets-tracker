
interface Props {
    filters: any
    setFilters: (filters: any) => void
}
export const ChainSelector = ({ filters, setFilters }: Props) => {
    const chains = [
        { id: 'eth', name: 'Ethereum' },
        { id: 'polygon', name: 'Polygon' },
        { id: 'bsc', name: 'BSC' },
        { id: 'arbitrum', name: 'Arbitrum' },
        { id: 'base', name: 'Base' },
        { id: 'avalanche', name: 'Avalanche' },
    ];
    return (
        <div className="flex gap-2 flex-wrap justify-center">
            {chains.map((chain) => (
                <button
                    key={chain.id}
                    onClick={() => setFilters({ ...filters, chain: chain.id })}
                    className={`px-4 py-2 rounded transition-colors ${filters.chain === chain.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                >
                    {chain.name}
                </button>
            ))}
        </div>
    )
}
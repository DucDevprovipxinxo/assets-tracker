import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
        <div className="flex gap-2 flex-wrap justify-start">
            <Select 
                value={filters.chain} 
                onValueChange={(value) => setFilters({ ...filters, chain: value, page: 1 })}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select chain" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {chains.map(chain => (
                            <SelectItem value={chain.id} key={chain.id}>
                                {chain.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
type UseGetNftsParams = {
    address: string;
    chain: string;
    limit: number;
    cursor?: string;
};

interface Props {
    collectionsData: UseGetNftsParams;
    activeTab: string;
    setActiveTab: (tab: ('collections' | 'tokens' | 'detail')) => void;
}


export const Navigation = ({ collectionsData, activeTab, setActiveTab }: Props) => {

    const activeStyles = 'bg-gradient-to-r from-purple-900/50 to-blue-900/50 text-white';

    return (
        <>
            <div className='bg-[#212531] p-4 rounded-lg flex flex-col gap-6 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)]'>
                {/* Tab Navigation */}
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => setActiveTab('collections')}
                        className={` px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'collections'
                            ? activeStyles
                            : 'bg-[#181C24] text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        <div className="text-xs mb-1">Collections</div>
                        {/* <div className="text-xl font-bold">{collectionsData?.total || 0}</div> */}
                    </button>

                    <button
                        onClick={() => setActiveTab('tokens')}
                        className={` px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'tokens'
                            ? activeStyles
                            : 'bg-[#181C24] text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        <div className="text-xs mb-1">Tokens</div>
                    </button>

                    <button
                        onClick={() => setActiveTab('detail')}
                        className={` px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'detail'
                            ? activeStyles
                            : 'bg-[#181C24] text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        <div className="text-xs mb-1">Detail</div>
                        <div className="text-xl font-bold">View Info</div>
                    </button>
                </div>
            </div>
        </>
    )
}
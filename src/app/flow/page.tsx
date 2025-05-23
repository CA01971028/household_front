import ButtonIcon from "@/components/ButtonIcon";

const page = () => {
    //グリッドの項目を定義
    const itemName:string[] = ["日付","カテゴリー","金額","メモ"];
    //グリッドのメインデータ
    const item:string[] = ["テスト","テスト","テスト","ー"]
    return (
        <div className="h-[100svh] w-screen bg-green-300">

            <div className="w-full flex flex-col sm:flex-row pt-4 md:gap-x-2 justify-center items-center">
                {/* ボタン */}
                <input
                    type="button"
                    value="New Transaction"
                    className="h-[2.5rem] md:w-full w-[60vw] border-2 rounded-md text-white font-semibold bg-[rgba(81,255,65,1)] hover:bg-[#8af081]"
                />
                <div className=" flex sm:flex-row gap-x-2 mt-2 md:mt-0"> 
                    {/* 月選択 */}
                    <input
                        type="month"
                        min="2020-01"
                        max="2030-12"
                        defaultValue="2025-05"
                        className="border bg-white rounded-md w-[60vw] md:w-[20vw] "
                    />

                    {/* カテゴリ */}
                    <div className="w-full sm:w-[60vw] flex border rounded-md overflow-hidden">
                        <div className="flex-1 sm:w-[20vw] bg-gray-300 hover:bg-green-50 text-center py-2 border-r-1">All</div>
                        <div className="flex-1 sm:w-[20vw] bg-gray-300 hover:bg-green-50 text-center py-2 border-r-1">Expense</div>
                        <div className="flex-1 sm:w-[20vw] bg-gray-300 hover:bg-green-50 text-center py-2">Income</div>
                    </div>
                </div>
            </div>
                {/* item */}
                <div className="w-[90vw] mt-4 mx-auto bg-white rounded-lg">
                    {/* ヘッダー（固定表示） */}
                    <div className="grid grid-cols-4 text-center font-semibold border-b">
                        {itemName.map((value: string, index: number) => (
                        <div key={index} className="py-2">{value}</div>
                        ))}
                    </div>

                    {/* スクロールする中身 */}
                    <div className="grid grid-cols-4 text-center h-[36svh]"
                        style={{
                            overflowY: 'scroll',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        {Array.from({ length: 20 }, (_, i) =>
                        item.map((value, index) => (
                            <div
                            key={`${i}-${index}`}
                            className={`border-b h-[10svh] text-xl flex items-center justify-center ${
                                i % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                            }`}
                            >
                            {value}
                            </div>
                        ))
                        )}

                    </div>
                </div>
            <div className="absolute w-screen bottom-0 h-[15svh]" style={{ backgroundColor: 'rgba(239, 239, 239, 1)' }}>
                <ButtonIcon name = {"flow"}/>
            </div>
        </div>
    );
}

export default page;
"use client";

export default function FlowbiteTableExample({ rawRows }: { rawRows: any[] }) {
//console.log('Raw Rows', rawRows)
    return (       

<div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
    <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                    Date
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Amount
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Description
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Category
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Is Recurring
                </th>
            </tr>
        </thead>
        <tbody>
            {rawRows.map((row, index) => (
                <tr
                key={row.transactionid ?? index} // Use a unique ID from your data if available
                className="bg-neutral-primary border-b border-default"
                >
                <th
                    scope="row"
                    className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                    {row.transactiondate}
                </th>
                <td className="px-6 py-4">
                    {row.amount}
                </td>
                <td className="px-6 py-4">
                    {row.transactiondescription}
                </td>
                <td className="px-6 py-4">
                    {row.categoryname}
                </td>
                <td className="px-6 py-4">
                    {row.isrecurring}
                </td>
                </tr>
            ))
            }
        </tbody>
    </table>
</div>

    )
}
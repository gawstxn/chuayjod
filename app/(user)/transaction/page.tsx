'use client'

const transactionData = [
  { id: 1, date: '2023-10-01', amount: 100.00, description: 'Grocery Shopping' },
  { id: 2, date: '2023-10-02', amount: 50.00, description: 'Gas Station' },
  { id: 3, date: '2023-10-03', amount: 200.00, description: 'Electronics Purchase' },
]

export default function TransactionPage() {
  return (
    <div className="min-h-screen w-full p-6 bg-foreground/2">
      {/* transaction table */}
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          {transactionData.map((transaction) => (
            <tr key={transaction.id}>
              <td className="border border-gray-300 px-4 py-2">{transaction.date}</td>
              <td className="border border-gray-300 px-4 py-2">{transaction.description}</td>
              <td className="border border-gray-300 px-4 py-2">{transaction.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
import React from "react"

const TransactionRowSkeleton: React.FC = () => {
  return (
    <tr>
      <td>
        <div className="animate-pulse flex items-center space-x-3">
          <div className="avatar">
            <div className="rounded-full bg-slate-200 h-8 w-8"></div>
          </div>
          <div>
            <div className="font-bold h-4 w-32 bg-gray-300 rounded" />
          </div>
        </div>
      </td>
      <td>
        <div className="animate-pulse h-2 bg-slate-200 rounded col-span-2"></div>
      </td>
      <td>
        <div className="animate-pulse h-2 bg-slate-200 rounded col-span-2"></div>
      </td>
      <td>
        <div className="animate-pulse h-2 bg-slate-200 rounded col-span-2"></div>
      </td>
    </tr>
  )
}

export default React.memo(TransactionRowSkeleton)

import { Histories } from "@/interface/history";

export default function HistoryTable({ history }: { history: Histories[] }) {
  return (
    <table className="min-w-full table-auto border border-gray-300 text-xs sm:text-sm">
      <thead>
        <tr className="text-left bg-[#fbfbfb]">
          <th className="border px-2 sm:px-4 py-2">Date time</th>
          <th className="border px-2 sm:px-4 py-2">Username</th>
          <th className="border px-2 sm:px-4 py-2">Concert name</th>
          <th className="border px-2 sm:px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {history.map((item) => (
          <tr key={item?.id}>
            <td
              className="border px-2 sm:px-4 py-1 max-w-[160px] truncate"
              title={item?.date}
            >
              {new Date(item.date).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}
            </td>

            <td
              className="border px-2 sm:px-4 py-1 max-w-[160px] truncate"
              title={item?.username}
            >
              {item?.username}
            </td>
            <td
              className="border px-2 sm:px-4 py-1 max-w-[180px] truncate"
              title={item?.concert_name}
            >
              {item?.concert_name}
            </td>
            <td className="border px-2 sm:px-4 py-1">
              {item?.action.charAt(0) + item?.action.slice(1).toLowerCase()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

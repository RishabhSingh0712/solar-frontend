// components/BookingsTable.js
import React from "react";

const BookingsTable = () => {
  const bookings = [
    { cabin: "008", guest: "Abdul Rahman", dates: "1 day ago — 5 night stay", status: "UNCONFIRMED", amount: "$1,750.00" },
    { cabin: "006", guest: "David Smith", dates: "1 day ago — 1 night stay", status: "UNCONFIRMED", amount: "$1,700.00" },
    { cabin: "008", guest: "Alvon Jovanus", dates: "6 days ago — 5 night stay", status: "CHECKED OUT", amount: "$1,675.00" },
    // Add more rows here...
  ];

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="text-left py-2 px-4">Cabin</th>
          <th className="text-left py-2 px-4">Guest</th>
          <th className="text-left py-2 px-4">Dates</th>
          <th className="text-left py-2 px-4">Status</th>
          <th className="text-left py-2 px-4">Amount</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking, index) => (
          <tr key={index} className="border-t">
            <td className="py-2 px-4">{booking.cabin}</td>
            <td className="py-2 px-4">{booking.guest}</td>
            <td className="py-2 px-4">{booking.dates}</td>
            <td className="py-2 px-4">
              <span className={`px-2 py-1 rounded-full text-white ${booking.status === 'UNCONFIRMED' ? 'bg-blue-500' : 'bg-green-500'}`}>
                {booking.status}
              </span>
            </td>
            <td className="py-2 px-4">{booking.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookingsTable;

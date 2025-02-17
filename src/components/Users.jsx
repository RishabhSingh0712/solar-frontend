import React,{useState} from 'react';
import MobNavBar  from './MobileNavBar';

const Users = ({showMobNavBar}) => {
  const Users = [
    { id: 1, date: 'May 9, 2024', name: 'Leslie Alexander', site_name: 'Lucknow,Royal City', status: 'Active' },
    { id: 2, date: 'May 5, 2024', name: 'Michael Foster', site_name: 'Bareilly,Shubhash Nagar', status: 'Unactive' },
    { id: 3, date: 'May 9, 2024', name: 'Leslie Alexander', site_name: 'Noida, Sec-34', status: 'Active' },
    { id: 4, date: 'May 5, 2024', name: 'Michael Foster', site_name: 'Delhi,Mahipalpur', status: 'Active' },
    // More Users...
  ];

  return (
    <div className="flex-1  dark:bg-gray-900 min-h-screen">
         {showMobNavBar && (
        <MobNavBar/>
      )}
      <div className='p-8'>
      <h2 className="text-2xl font-bold mb-6">Recent Users</h2>
     
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Customer-Id</th>
            <th className="px-4 py-2 text-left">Registeration Date</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Site-Name</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {Users.map((order) => (
            <tr key={order.id}>
              <td className="border px-4 py-2">{order.id}</td>
              <td className="border px-4 py-2">{order.date}</td>
              <td className="border px-4 py-2">{order.name}</td>
              <td className="border px-4 py-2">{order.site_name}</td>
              <td className="border px-4 py-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
     
    </div>
  );
};

export default Users;

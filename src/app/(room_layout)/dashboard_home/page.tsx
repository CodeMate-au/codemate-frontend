"use client";

import styles from "@styles/style";



export default function Page() {

  return (

    <div className="bg-gray-900/80 p-8 rounded-md w-full">
      <div className=" flex items-center justify-between pb-6">
        <div>
        </div>
        <div className="flex items-center justify-between">
        
          <div className="lg:ml-40 ml-10 space-x-8">
          
            <button className="bg-[#407BBF] px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create Room</button>
          </div>
        </div>
      </div>
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Room ID
                  </th>
  
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Room Name
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-5 py-5 bg-white text-sm">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          1
                        </p>
                      </div>
                  </td>
               
    
                
                  <td className="px-5 py-5 bg-white text-sm">
                    <span
                      className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                      <span aria-hidden
                        className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                      <span className="relative">Alonzo Cox</span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
              <span className="text-xs xs:text-sm text-gray-900">
                Showing 1 to 4 of 50 Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  className="text-sm text-indigo-50 transition duration-150 hover:bg-[#1E2B3A] bg-[#407BBF] font-semibold py-2 px-4 rounded-l">
                  Prev
                </button>
                &nbsp; &nbsp;
                <button
                  className="text-sm text-indigo-50 transition duration-150 hover:bg-[#1E2B3A] bg-[#407BBF] font-semibold py-2 px-4 rounded-r">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
}

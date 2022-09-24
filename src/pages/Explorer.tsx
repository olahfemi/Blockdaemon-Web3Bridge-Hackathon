import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";

const Explorer = () => {
  const [userAddress, setUserAddress] = useState("");

  const [protocol, setProtocol] = useState("")
  const [network, setNetwork] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log({ userAddress, protocol, network });
  };

  return (
    <MainLayout>
      <div className="mt-12">
        <h1 className="text-3xl font-medium text-white">
          Token &amp; NFT Explorer
        </h1>

        <form onSubmit={handleSubmit} className="flex mt-4 w-[100%]">
          <div className="w-[80%] md:w-[70%] lg:w-[40%]">
            <input
              type={"text"}
              placeholder="Enter address"
              //   value={selectedProtocol?.value || userAddress}
              className="p-3 w-[100%] outline-none rounded-bl-lg rounded-tl-lg text-lg"
              onChange={(e) => {
                setUserAddress(e.target.value);
              }}
            />
          </div>

          <select onChange={(e) => setProtocol(e.target.value)} className="bg-dark_deep outline-none border-l border-white_varaint text-white text-xl font-semibold px-3">
            <option value="ethereum">Ethereum</option>
            <option value="algorand">Algorand</option>
            <option value="avanlanche">Avanlanche</option>
          </select>

          <select onChange={(e) => setNetwork(e.target.value)} className="bg-dark_deep outline-none border-l border-r border-white_varaint text-white text-xl font-semibold px-3">
            <option value="mainnet">Mainnet</option>
            <option value="testnet">Testnet</option>
            <option value="avanlanche">Goerli</option>
          </select>

          <button
            type="submit"
            className="bg-dark_deep text-white text-xl px-8 rounded-br-lg rounded-tr-lg"
          >
            <strong>Analyze</strong>
          </button>
        </form>

        
        <div className="mt-16">
        <h1 className="text-3xl font-medium text-white">Token Eplorer</h1>

        <div className="flex flex-col mt-2">
          <div className="mb-3 overflow-x-auto rounded-xl shadow-md">
            <div className="pt-2 align-middle inline-block min-w-full">
              <div className="overflow-hidden border-gray-200 rounded-xl">
                <table className="w-full divide-y divide-gray-200 relative px-4">
                  <thead className="bg-dark_deep">
                    <tr>
                      <th
                        scope="col"
                        className="px-1 md:px-3 py-5 text-xs font-medium text-center text-white_variant uppercase tracking-wider"
                      >
                        S/N
                      </th>
                      <th
                        scope="col"
                        className="px-2 md:px-4 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="md:px-3 px-1 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider"
                      >
                        price
                      </th>
                      <th
                        scope="col"
                        className="md:px-3 px-1 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider"
                      >
                        holdings
                      </th>
                      <th
                        scope="col"
                        className="md:px-3 px-1 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider"
                      >
                        marketcap
                      </th>
                      <th
                        scope="col"
                        className="md:px-3 px-1 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider whitespace-nowrap"
                      >
                        performance
                      </th>
                      <th
                        scope="col"
                        className="md:px-3 px-1 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider"
                      >
                        value
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-300">
                    <tr className="">
                      <td className="font-medium whitespace-nowrap text-center px-1 md:px-3 py-3">
                        1
                      </td>
                      <td className="font-medium whitespace-nowrap truncate md:px-4 px-2 py-3">
                        12
                      </td>
                      <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                        123
                      </td>
                      <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                        12345
                      </td>
                      <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                        123456
                      </td>
                      <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                        1234567
                      </td>
                      <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                        12345678
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>








      <div className="mt-16 pb-48">
        <h1 className="text-3xl font-medium text-white">NFT Explorer</h1>

        <div className="flex flex-col mt-2">
          <div className="mb-3 overflow-x-auto rounded-xl shadow-md">
            <div className="pt-2 align-middle inline-block min-w-full">
              <div className="overflow-hidden border-gray-200 rounded-xl">
                <table className="w-full divide-y divide-gray-200 relative px-4">
                  <thead className="bg-dark_deep">
                    <tr>
                      <th
                        scope="col"
                        className="px-1 md:px-3 py-5 text-xs font-medium text-center text-white_variant uppercase tracking-wider"
                      >
                        S/N
                      </th>
                      <th
                        scope="col"
                        className="px-2 md:px-4 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="md:px-3 px-1 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider"
                      >
                        price
                      </th>
                      <th
                        scope="col"
                        className="md:px-3 px-1 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider"
                      >
                        holdings
                      </th>
                      <th
                        scope="col"
                        className="md:px-3 px-1 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider"
                      >
                        marketcap
                      </th>
                      <th
                        scope="col"
                        className="md:px-3 px-1 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider whitespace-nowrap"
                      >
                        performance
                      </th>
                      <th
                        scope="col"
                        className="md:px-3 px-1 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider"
                      >
                        value
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-300">
                    <tr className="">
                      <td className="font-medium whitespace-nowrap text-center px-1 md:px-3 py-3">
                        1
                      </td>
                      <td className="font-medium whitespace-nowrap truncate md:px-4 px-2 py-3">
                        12
                      </td>
                      <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                        123
                      </td>
                      <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                        12345
                      </td>
                      <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                        123456
                      </td>
                      <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                        1234567
                      </td>
                      <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                        12345678
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </MainLayout>
  );
};

export default Explorer;
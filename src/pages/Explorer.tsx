import axios from "axios";
import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";

import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Explorer = () => {
  let subtitle;
  const [userAddress, setUserAddress] = useState("");

  const [protocol, setProtocol] = useState("ethereum");

  const [transactionExplorer, setTransactionExplorer] = useState<Array<any>>(
    []
  );
  const [nftExplorer, setNftExplorer] = useState<Array<any>>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showNFTModal, setShowNFTModal] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Array<any>>([]);
  const [selectedNFT, setSelectedNFT] = useState<any>({});

  const token = "zAXbsfPqTlx-1kgPmxQYumuNGLIPsGOviHngeeU2wylP36De";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    const { data } = await axios.get(
      `https://svc.blockdaemon.com/universal/v1/${protocol}/mainnet/account/${userAddress}/txs`,
      config
    );

    setTransactionExplorer(data.data);

    const nft = await axios.get(
      `https://svc.blockdaemon.com/nft/v1/${protocol}/mainnet/assets?wallet_address=${userAddress}`,
      config
    );
    setNftExplorer(nft?.data?.data);

    setLoading(false)
  };


  const handleEvent = async (id: any) => {

    let resp = transactionExplorer.filter((txn) => txn.id == id);

    setShowModal(true);

    console.log(resp[0].events);
    setSelectedEvent(resp[0].events);
  };

  const handleNFT = async (id: any) => {

    let resp = nftExplorer.filter((txn) => txn.id == id);

    setShowNFTModal(true);

    console.log(resp[0]);
    setSelectedNFT(resp[0]);
  };

  return (
    <MainLayout>
      <div className="mt-12">
        <h1 className="text-3xl font-medium text-white">
          Transaction &amp; NFT Explorer
        </h1>

        <form onSubmit={handleSubmit} className="flex mt-4 w-[100%]">
          <div className="w-[80%] md:w-[70%] lg:w-[40%]">
            <input
              type={"text"}
              placeholder="Enter address"
              className="p-3 w-[100%] outline-none rounded-bl-lg rounded-tl-lg text-lg"
              onChange={(e) => {
                setUserAddress(e.target.value);
              }}
            />
          </div>

          <select
            onChange={(e) => setProtocol(e.target.value)}
            className="bg-dark_deep outline-none border-r border-white_varaint text-white text-xl font-semibold px-3"
          >
            <option value="ethereum">Ethereum</option>
            <option value="algorand">Algorand</option>
            <option value="bitcoin">Bitcoin</option>
            <option value="bitcoincash">Bitcoin Cash</option>
            <option value="dogecoin">Dogecoin</option>
            <option value="litecoin">Litecoin</option>
            <option value="bitcoincash">Bitcoin</option>
            <option value="near">Near</option>
            <option value="oasis">Oasis</option>
            <option value="polkadot">Polkadot</option>
            <option value="solana">Solana</option>
            <option value="stellar">Stellar</option>
            <option value="xrp">XRP</option>
          </select>

          <button
            type="submit"
            className="bg-dark_deep text-white text-xl px-8 rounded-br-lg rounded-tr-lg"
          >
            <strong>{loading ? "Analyzing" : "Analyze"}</strong>
          </button>
        </form>

        <div className="mt-16">
          <h1 className="text-3xl font-medium text-white">
            Transaction Eplorer
          </h1>

          <div className="flex flex-col mt-2">
            <div className="mb-3 overflow-x-auto rounded-xl shadow-md">
              <div className="pt-2 align-middle inline-block min-w-full">
                <div className="overflow-hidden border-gray-200 rounded-xl">
                  <table className="w-full divide-y divide-gray-200 relative px-4">
                    <thead className="bg-dark_deep">
                      <tr>
                        <th
                          scope="col"
                          className="px-1 md:px-3 py-5 text-xs font-medium text-white_variant uppercase tracking-wider"
                        >
                          block id
                        </th>
                        <th
                          scope="col"
                          className="px-2 md:px-4 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider"
                        >
                          block number
                        </th>
                        <th
                          scope="col"
                          className="md:px-3 px-1 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider"
                        >
                          status
                        </th>
                        <th
                          scope="col"
                          className="md:px-3 px-1 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider"
                        >
                          confirmations
                        </th>
                        <th
                          scope="col"
                          className="md:px-3 px-1 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider"
                        >
                          no. of events
                        </th>
                        <th
                          scope="col"
                          className="md:px-3 px-1 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider whitespace-nowrap"
                        >
                          events
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-300">
                      {Array.isArray(transactionExplorer) &&
                      transactionExplorer.length === 0 ? (
                        <tr className="mb-4">
                          <td
                            colSpan={7}
                            className="font-medium whitespace-nowrap text-center px-1 md:px-3 py-3"
                          >
                            Input a valid address in the search field above!
                          </td>
                        </tr>
                      ) : (
                        transactionExplorer?.map((explore: any, index: any) => {
                          return (
                            <tr className="mb-4" key={index}>
                              {/* <td className="font-medium whitespace-nowrap text-center px-1 md:px-3 py-3">
                              {index + 1}
                            </td> */}
                              <td className="whitespace-nowrap truncate md:px-4 px-2 py-3">
                                {`${explore?.block_id.slice(
                                  0,
                                  6
                                )}...${explore?.block_id.slice(-6)}`}
                              </td>
                              <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                                {explore?.block_number}
                              </td>
                              <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                                {/* {explore?.status.toUppercase()} */}
                                {explore?.status?.charAt(0).toUpperCase() +
                                  explore?.status?.slice(1)}
                              </td>
                              <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                                {explore?.confirmations}
                              </td>
                              <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                                {explore?.num_events}
                              </td>
                              <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                                <button
                                  className="text-green font-medium hover:text-white hover:border-dark hover:bg-dark_variant border-green border-2 rounded-md px-3 py-1"
                                  onClick={() => handleEvent(explore?.id)}
                                >
                                  Event
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={showModal}
          onRequestClose={() => setShowModal(!showModal)}
          style={customStyles}
          contentLabel="Events"
        >
          <div>
            <div className="flex justify-between mb-2">
              <h2
                className="text-2xl"
                ref={(_subtitle) => (subtitle = _subtitle)}
              >
                Events
              </h2>
              <button onClick={() => setShowModal(!showModal)}>
                <AiOutlineClose size={24} />
              </button>
            </div>

            <div className="flex flex-col mt-2">
              <div className="mb-3 overflow-x-auto rounded-xl shadow-md">
                <div className="pt-2 align-middle inline-block min-w-full">
                  <div className="overflow-hidden border-gray-200 rounded-xl">
                    <table className="w-full divide-y divide-gray-200 relative px-4">
                      <thead className="bg-dark_deep">
                        <tr>
                          <th
                            scope="col"
                            className="px-1 md:px-3 py-5 text-xs font-medium text-white_variant uppercase tracking-wider"
                          >
                            txn id
                          </th>
                          <th
                            scope="col"
                            className="px-2 md:px-4 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider"
                          >
                            from
                          </th>
                          <th
                            scope="col"
                            className="md:px-3 px-1 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider"
                          >
                            to
                          </th>
                          <th
                            scope="col"
                            className="md:px-3 px-1 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider"
                          >
                            amount
                          </th>
                          <th
                            scope="col"
                            className="md:px-3 px-1 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider"
                          >
                            denomination
                          </th>
                        </tr>
                      </thead>

                      <tbody className="bg-white divide-y divide-gray-300">
                        {Array.isArray(selectedEvent) &&
                        selectedEvent.length === 0 ? (
                          <tr className="mb-4">
                            <td
                              colSpan={7}
                              className="font-medium whitespace-nowrap text-center px-1 md:px-3 py-3"
                            >
                              Input a valid address in the search field above!
                            </td>
                          </tr>
                        ) : (
                          selectedEvent
                            ?.slice(0, 5)
                            ?.map((event: any, index: any) => {
                              return (
                                <tr className="mb-4" key={event.id}>
                                  <td className="whitespace-nowrap truncate md:px-4 px-2 py-3">
                                    {`${event?.transaction_id.slice(
                                      0,
                                      6
                                    )}...${event?.transaction_id.slice(-6)}`}
                                  </td>
                                  <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                                    {`${event?.source.slice(
                                      0,
                                      9
                                    )}...${event?.source.slice(-9)}`}

                                  </td>
                                  <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                                    {event?.type == "transfer"
                                      ? `${event?.destination.slice(
                                          0,
                                          9
                                        )}...${event?.destination.slice(-9)}`
                                      : "-"}
                                  </td>
                                  <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                                    {(event?.amount / 1e18).toFixed(6)}
                                  </td>
                                  <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                                    {event?.denomination}
                                  </td>
                                </tr>
                              );
                            })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>

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
                          name
                        </th>
                        <th
                          scope="col"
                          className="px-2 md:px-4 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider"
                        >
                          token id
                        </th>
                        <th
                          scope="col"
                          className="md:px-3 px-1 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider"
                        >
                          contract address
                        </th>
                        <th
                          scope="col"
                          className="md:px-3 px-1 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider"
                        >
                          status
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-300">
                      {Array.isArray(nftExplorer) &&
                      nftExplorer.length === 0 ? (
                        <tr className="mb-4">
                          <td
                            colSpan={7}
                            className="font-medium whitespace-nowrap text-center px-1 md:px-3 py-3"
                          >
                            Input a valid address in the search field above!
                          </td>
                        </tr>
                      ) : (
                        nftExplorer?.map((nft: any, index: any) => {
                          return (
                            <tr className="mb-4" key={nft.id}>
                              <td className="whitespace-nowrap truncate md:px-4 px-2 py-3">
                                {nft?.name}
                              </td>
                              <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                                {nft?.token_id}
                              </td>
                              <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                                {nft?.contract_address}
                              </td>
                              <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                                <button
                                  className="text-green font-medium hover:text-white hover:border-dark hover:bg-dark_variant border-green border-2 rounded-md px-3 py-1"
                                  onClick={() => handleNFT(nft?.id)}
                                >
                                  Explore
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={showNFTModal}
          onRequestClose={() => setShowNFTModal(false)}
          style={customStyles}
          contentLabel="NFT"
        >
          <div className="w-[100%] p-5">
            <div className="flex justify-between mb-2">
              <h2
                className="text-2xl font-medium"
                ref={(_subtitle) => (subtitle = _subtitle)}
              >
                NFT Details
              </h2>
              <button onClick={() => setShowNFTModal(!showNFTModal)}>
                <AiOutlineClose size={24} />
              </button>
            </div>

            <div className="">
              <h1 className="">
                <strong>Name:</strong> {selectedNFT?.name}
              </h1>
              <p className="">
                <strong>Token ID:</strong> {selectedNFT?.token_id}
              </p>
              <p className="">
                <strong>Contract Address:</strong>{" "}
                {selectedNFT?.contract_address}
              </p>

              <img
                className={"w-[60%]"}
                src={
                  selectedNFT?.image_url
                    ? selectedNFT?.image_url
                    : "/placeholder.webp"
                }
                alt={selectedNFT?.name}
              />
            </div>
          </div>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default Explorer;

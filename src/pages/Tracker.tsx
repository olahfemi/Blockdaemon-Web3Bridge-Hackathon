import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import MainLayout from "../layout/MainLayout";
import CopyToClipboard from "react-copy-to-clipboard";
import { AiFillCopy, AiOutlineCopy } from "react-icons/ai";
import { useBalance } from "wagmi";
import axios from "axios";

const Tracker = () => {
  const { address } = useAccount();
  const userWalletAddress: string | undefined = address as string | undefined;

  const [copy, setCopy] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [userAddress, setUserAddress] = useState(address);

  const [protocol, setProtocol] = useState("ethereum");
  const [gasFee, setGasFee] = useState<any>(null);

  const [tracker, setTracker] = useState<Array<any>>([]);

  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  });

  const token = "zAXbsfPqTlx-1kgPmxQYumuNGLIPsGOviHngeeU2wylP36De";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    const { data } = await axios.get(
      `https://svc.blockdaemon.com/universal/v1/${protocol}/goerli/account/${userAddress}`,
      config
    );
    setTracker(data);

    if (
      protocol == "ethereum" ||
      protocol == "litecoin" ||
      protocol == "bitcoin" ||
      protocol == "bitcoincash"
    ) {
      const res = await axios.get(
        `https://svc.blockdaemon.com/universal/v1/${protocol}/mainnet/tx/estimate_fee`,
        config
      );

      setGasFee(res?.data?.estimated_fees);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false);
      }, 3000);
    }
  }, [copy]);

  return (
    <MainLayout>
      <div className="mt-12">
        <h1 className="text-4xl font-semibold text-white">Your Portfolio</h1>
        <p className="mt-2 text-2xl text-white_variant">
          Accurately tracking the investment performance of your crypto assets.
        </p>
      </div>

      {address && (
        <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-5">
          <div className="h-48 bg-dark_deep p-6 rounded-xl border-2 border-white_variant">
            <h1 className="text-white_variant text-3xl font-medium">Wallet</h1>

            <div className="mt-6">
              <span className="bg-white_variant text-dark text-xl rounded-lg py-3 px-4">
                {userWalletAddress}
                <CopyToClipboard
                  text={userWalletAddress}
                  onCopy={() => setCopy(true)}
                >
                  <button>
                    {copy ? (
                      <AiFillCopy className="ml-2" color="#49adec" />
                    ) : (
                      <AiOutlineCopy className="ml-2" />
                    )}
                  </button>
                </CopyToClipboard>
              </span>
            </div>
          </div>

          <div
            className={
              "h-48 bg-dark_deep p-6 rounded-xl border-2 border-white_variant"
            }
          >
            <h1 className="text-white_variant text-4xl font-medium">
              BALANCE: {Number(data?.formatted).toFixed(2)} {data?.symbol}
            </h1>
          </div>
        </div>
      )}

      {gasFee && (
        <div
          className={
            "h-72 w-[60%] mt-5 bg-dark_deep p-6 rounded-xl border-2 border-white_variant"
          }
        >
          <h1 className="text-white_variant text-3xl font-medium mb-4">
            Gas Fee Estimation
          </h1>
          <div className="mt-1 grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="text-white_variant">
              <h4 className=" text-xl font-medium">Fast</h4>
              <p className="">
                Max Priority Fee:{" "}
                <span className="font-medium">
                  {gasFee?.fast?.max_priority_fee}
                </span>
              </p>
              <p className="">
                Max Total Fee:{" "}
                <span className="font-medium">
                  {gasFee?.fast?.max_total_fee}
                </span>
              </p>
            </div>

            <div className="text-white_variant mt-1">
              <h4 className=" text-xl font-medium">Medium</h4>
              <p className="">
                Max Priority Fee:{" "}
                <span className="font-medium">
                  {gasFee?.medium?.max_priority_fee}
                </span>
              </p>
              <p className="">
                Max Total Fee:{" "}
                <span className="font-medium">
                  {gasFee?.medium?.max_total_fee}
                </span>
              </p>
            </div>

            <div className="text-white_variant mt-1">
              <h4 className=" text-xl font-medium">Slow</h4>
              <p className="">
                Max Priority Fee:{" "}
                <span className="font-medium">
                  {gasFee?.slow?.max_priority_fee}
                </span>
              </p>
              <p className="">
                Max Total Fee:{" "}
                <span className="font-medium">
                  {gasFee?.slow?.max_total_fee}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10">
        <h3 className="text-2xl text-white mb-1">Input your address here</h3>
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
      </div>

      <div className="mt-16 pb-48">
        <h1 className="text-3xl font-semibold text-white">Your Assets</h1>

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
                        symbol
                      </th>
                      <th
                        scope="col"
                        className="md:px-3 px-1 py-5 text-left text-xs font-medium text-white_variant uppercase tracking-wider"
                      >
                        confirmed balance
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-300">
                    {Array.isArray(tracker) && tracker.length === 0 ? (
                      <tr className="mb-4">
                        <td
                          colSpan={7}
                          className="font-medium whitespace-nowrap text-center px-1 md:px-3 py-3"
                        >
                          Input a valid address in the search field above!
                        </td>
                      </tr>
                    ) : (
                      tracker?.map((track: any, index: any) => {
                        return (
                          <tr className="mb-4" key={index}>
                            <td className="font-medium whitespace-nowrap text-center px-1 md:px-3 py-3">
                              {index + 1}
                            </td>
                            <td className="font-medium whitespace-nowrap truncate md:px-4 px-2 py-3">
                              {track?.currency?.name
                                ? track?.currency?.name
                                : track?.currency?.detail?.id}
                            </td>
                            <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                              {track?.currency?.symbol}
                            </td>
                            <td className="text-sm truncate whitespace-nowrap md:px-3 px-1 py-3">
                              {(track?.confirmed_balance / 1e18).toFixed(4)}
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
    </MainLayout>
  );
};

export default Tracker;

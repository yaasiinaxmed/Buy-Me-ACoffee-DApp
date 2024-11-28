"use client";

import { useState } from "react";
import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { useActiveAccount, ConnectButton, TransactionButton, useReadContract, useContractEvents } from "thirdweb/react";
import { prepareContractCall, toWei} from "thirdweb";
import { contract } from "../utils/contract";

export const BuyMeCoffee = () => {
  const account = useActiveAccount();

  const [tipAmount, setTipAmount] = useState(0);
  const [message, setMessage] = useState("");

  const { data: totalCoffee, refetch: refetchTotalCoffee} = useReadContract({
    contract: contract,
    method: "getTotalCoffee",
  })

  const { data: contractEvents, refetch: refetchContractEvents } = useContractEvents({
    contract: contract,
  })

  const truncateWalletAddress = (address: string) => {
    return address.slice(0, 6) + "..." + address.slice(-4);
  }

  const convertDate = (timestamp: bigint) => {
    const timestampNumber = Number(timestamp);
    return new Date(timestampNumber * 1000).toLocaleString()
  }

  if (account) {
    return (
      <main
        style={{
          border: "1px solid #2522525",
          padding: "2rem",
          borderRadius: "6px",
          width: "500px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <ConnectButton client={client} chain={chain} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontSize: "1.15rem" }}>Tip Amount</label>
          <p
            style={{ fontSize: "10px", color: "#888", marginBottom: "0.5rem" }}
          >
            Must be greater than 0.
          </p>
          <input
            type="number"
            value={tipAmount}
            onChange={(e) => setTipAmount(Number(e.target.value))}
            step={0.01}
            style={{
                padding: "0.5rem",
                border: "none",
                marginBottom: "1rem"
            }}
          />
          <label style={{ fontSize: "1.15rem", marginBottom: "0.5rem"}}>Message</label>
          <input type="text" value={message} 
            onChange={(e) => setMessage(e.target.value)}
            style={{
                padding: "0.5rem",
                border: "none",
                marginBottom: "rem"
            }}
          />
        </div>
        {message && tipAmount > 0 && (
            <TransactionButton transaction={() => (
                prepareContractCall({
                    contract: contract,
                    method: "buyMeAcoffe",
                    params: [message],
                    value: BigInt(toWei(tipAmount.toString())),
                })
            )}
            onTransactionConfirmed={() => {
                alert("Thank you for the Coffee!");
                setTipAmount(0);
                setMessage("");
                refetchTotalCoffee();
            }}
            style={{
                background: "royalblue",
                color: "white",
                padding: "0.75rem 1rem",
                borderRadius: "6px",
                marginTop: "1rem"
            }}
            >Buy A Coffee</TransactionButton>
        )}
        <div>
            <h3 style={{ marginTop: "2rem"}}>Total Coffees: {totalCoffee?.toString()}</h3>
            <p style={{ fontSize: "1.15rem"}}>Recent Coffees</p>
           {contractEvents && contractEvents.length > 0 && (
            [...contractEvents].reverse().map((event, index) => (
                <div key={index}
                 style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "1rem",
                    margin: "1rem 0",
                    background: "#151515",
                    borderRadius: "6px",
                 }}
                >
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                        <p style={{
                            fontSize: "12px",
                            color: "#888",
                            marginBottom: "0.5rem",
                        }}>
                            {/* @ts-ignore */}
                            {truncateWalletAddress(event.args.sender)}
                        </p>
                        <p style={{
                            fontSize: "12px",
                            color: "#888",
                            marginBottom: "0.5rem",
                        }}>
                            {/* @ts-ignore */}
                            {convertDate(event.args.timestamp)}
                        </p>
                        {/* <p style={{
                            fontSize: "12px",
                            color: "#888",
                            marginBottom: "0.5rem",
                        }}>
                            {/* @ts-ignore *
                            {event.args.message}
                        </p> */}
                    </div>
                </div>
            ))
           )}
        
        </div>
      </main>
    );
  }
};

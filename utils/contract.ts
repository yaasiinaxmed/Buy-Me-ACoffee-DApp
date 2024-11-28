import { chain } from "@/app/chain"
import { client } from "@/app/client"
import { getContract } from "thirdweb"
import { contractABI } from "./contractABI"

const contractAddress = "0x666da83B4B8F3cf483787c9C6221610a50F8F7B3"

export const contract = getContract({
    client: client,
    chain: chain,
    address: contractAddress,
    abi: contractABI,
})
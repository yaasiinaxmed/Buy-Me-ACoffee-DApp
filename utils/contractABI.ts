export const contractABI = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "message",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
      ],
      name: "newCoffee",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_message",
          type: "string",
        },
      ],
      name: "buyMeAcoffe",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "getTotalCoffee",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ] as const;
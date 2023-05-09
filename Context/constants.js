export const chat_app_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const chat_app_abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "friend_key",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "addFriend",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "public_key",
        type: "address",
      },
    ],
    name: "checkUserExists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "createAccount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllApplicationUsers",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "account_key",
            type: "address",
          },
        ],
        internalType: "struct ChatApp.AllUserStruck[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyFriendList",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "public_key",
            type: "address",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
        ],
        internalType: "struct ChatApp.friend[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "public_key",
        type: "address",
      },
    ],
    name: "getUsername",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "friend_key",
        type: "address",
      },
    ],
    name: "readMessage",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "msg",
            type: "string",
          },
        ],
        internalType: "struct ChatApp.message[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "friend_key",
        type: "address",
      },
      {
        internalType: "string",
        name: "_msg",
        type: "string",
      },
    ],
    name: "sendMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// export constchat_app_abi = chat_app_json.abi;

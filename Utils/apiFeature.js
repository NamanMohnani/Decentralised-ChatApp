import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { chat_app_address, chat_app_abi } from "../Context/constants";

export const check_if_wallet_is_connected = async function () {
  try {
    if (!window.ethereum) return console.log("install metamask");

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    const first_account = accounts[0];
  } catch (error) {
    console.log(error);
  }
};

export const connect_wallet = async function () {
  try {
    if (!window.ethereum) return console.log("install metamask");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const first_account = accounts[0];
    return first_account;
  } catch (error) {
    console.log(error);
  }
};

const fetch_contract = (signerOrProvider) =>
  new ethers.Contract(chat_app_address, chat_app_abi, signerOrProvider);

export const connecting_with_contract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetch_contract(signer);

    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const convert_time = (time) => {
  const new_time = new Date(time.toNumber());

  const real_time =
    new_time.getHours() +
    "/" +
    new_time.getMinutes() +
    "/" +
    new_time.getSeconds() +
    " date:" +
    new_time.getDate() +
    "/" +
    (new_time.getMonth() + 1) +
    "/" +
    new_time.getFullYear();
};

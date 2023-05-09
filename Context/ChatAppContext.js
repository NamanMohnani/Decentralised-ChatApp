import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";

// internal imports
import {
  check_if_wallet_is_connected,
  connect_wallet,
  connecting_with_contract,
} from "../Utils/apiFeature";

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [FriendLists, setFriendLists] = useState([]);
  const [friendMsg, setfriendMsg] = useState([]);
  const [loading, setloading] = useState(false);
  const [userList, setuserList] = useState([]);
  const [error, setError] = useState("");

  // chat user data
  const [currentUserName, setCurrentuserName] = useState("");
  const [currentUserAddress, setCurrentuserAddress] = useState("");

  const router = useRouter();
  const fetchData = async () => {
    try {
      const contract = await connecting_with_contract();

      const connect_account = await connect_wallet();
      setAccount(connect_account);

      const user_name = await contract.getUsername(connect_account);
      setUserName(user_name);

      const friendLists = await contract.getMyFriendList();
      setFriendLists(friendLists);

      const user_list = await contract.getAllApplicationUsers();
      setuserList(user_list);
    } catch (error) {
      setError("install and connect your wallet !");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const readMessage = async (friend_address) => {
    try {
      const contract = await connecting_with_contract();
      const read = await contract.readMessage(friend_address);
      setfriendMsg(read);
    } catch (error) {
      setError("no messages !!!!!!!!");
    }
  };

  const createAccount = async ({ name, account_address }) => {
    try {
      if (name || account_address)
        return setError("name and account_address, cannot be empty!");

      const contract = await connecting_with_contract();
      const get_created_user = await contract.createAccount(name);
      setloading(true);
      await get_created_user.wait();
      setloading(false);
      window.location.reload();
    } catch (error) {
      setError("error while create your account, reload browser !!");
    }
  };

  const addFriends = async ({ name, account_address }) => {
    try {
      if (name || account_address)
        return setError("please provide a name and address");
      const contract = await connecting_with_contract();
      const add_my_friend = await contract.addFriend(account_address, name);
      setloading(true);
      await add_my_friend.wait();
      setloading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      setError("something went wrong while adding friends, try again");
    }
  };

  const sendMessage = async ({ msg, address }) => {
    try {
      if (msg || address) return setError("please type your message");

      const contract = await connecting_with_contract();
      const add_message = await contract.sendMessage(address, msg);
      setloading(true);
      await add_message.wait();
      setloading(false);
      window.location.reload();
    } catch (error) {
      setError("reload and try again");
    }
  };

  const readUser = async (user_address) => {
    const contract = await connecting_with_contract();
    const user_name = await contract.getUsername(user_address);
    setCurrentuserAddress(user_address);
    setCurrentuserName(user_name);
  };

  return (
    <ChatAppContext.Provider
      value={{
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        connect_wallet,
        check_if_wallet_is_connected,
        account,
        userName,
        FriendLists,
        friendMsg,
        loading,
        userList,
        error,
        currentUserName,
        currentUserAddress,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};

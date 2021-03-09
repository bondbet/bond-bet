import React from "react";
import MyAccountDetails from "./MyAccountDetails";
import Description from "../Shared/Descrption/Description";
import { POOL_TYPE } from "../../store/pool-type";

const MyAccount = () => {
  return (
    <div className="my-account-section">
      <h1 className="my-account-title">My Account - Bond.Bet</h1>

      <div className="my-account-container">
        <MyAccountDetails
          poolType={POOL_TYPE.COMMUNITY_REWARD_POOL}
        ></MyAccountDetails>
      </div>

      <div className="my-account-container">
        <MyAccountDetails
          poolType={POOL_TYPE.NEW_POOL}
          className="my-account-container"
        ></MyAccountDetails>
      </div>

      <Description
        title="My Account - Bond.Bet"
        description="My account page displays all the details about your pool entries,
        transactions, rewards and winnings."
      />
    </div>
  );
};

export default MyAccount;

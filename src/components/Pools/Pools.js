import React from "react";
import { POOL_TYPE } from "../../store/pool-type";
import Description from "../Shared/Descrption/Description";
import RewardPool from "./RewardPool/RewardPool";

const Pools = () => {
  return (
    <div className="lottery-pools-container">
      <h1 className="title">Bond.Bet Lottery Pools</h1>

      <div className="lottery-pools-section">
        <RewardPool poolType={POOL_TYPE.COMMUNITY_REWARD_POOL} />
        <RewardPool poolType={POOL_TYPE.NEW_POOL} />
      </div>

      <Description
        title="Bond.Bet No Loss Lottery Pools"
        description="No loss pools build on top of Pool Together where 3 random persons
              earn the interest from the pool and everyone keeps their
              principal. Get a chance to win!"
      />
    </div>
  );
};

export default Pools;

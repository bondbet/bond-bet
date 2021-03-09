import React from "react";

import LeaderBoardDetails from "./LeaderBoardDetails";
import { POOL_TYPE } from "../../store/pool-type";
import Description from "../Shared/Descrption/Description";

const LeaderBoard = () => {
  return (
    <div className="leaderboard-section">
      <h1 className="leaderboard-title">Leaderboard</h1>

      <LeaderBoardDetails
        poolType={POOL_TYPE.COMMUNITY_REWARD_POOL}
      ></LeaderBoardDetails>
      <LeaderBoardDetails poolType={POOL_TYPE.NEW_POOL}></LeaderBoardDetails>

    </div>
  );
};

export default LeaderBoard;

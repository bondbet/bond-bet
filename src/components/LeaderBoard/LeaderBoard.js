import React from "react";

import LeaderBoardDetails from "./LeaderBoardDetails";
import { POOL_TYPE } from "../../store/pool-type";

const LeaderBoard = () => {
  return (
    <div className="leaderboard-section">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <LeaderBoardDetails poolType={POOL_TYPE.NEW_POOL}></LeaderBoardDetails>

    </div>
  );
};

export default LeaderBoard;

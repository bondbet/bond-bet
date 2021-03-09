import React from "react";
import {
  BrowserRouter as Routes,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Pools from "./components/Pools/Pools";
import MyAccount from "./components/MyAccount/MyAccount";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Modal from "./components/Modal/Modal";
import RewardPoolPrizeDetails from "./components/Pools/RewardPool/RewardPoolPrizeDetails";
import RewardPoolPlayerDetails from "./components/Pools/RewardPool/RewardPoolPlayerDetails";
import RewardPoolDetails from "./components/Pools/RewardPool/RewardPoolDetails";
import { connect } from "react-redux";
import { POOL_TYPE } from "./store/pool-type";
import { POOL_INFORMATION } from "./constants/pool-information";

function Router({ openModal }) {
  const setDocumentTitle = (x) => {
    document.title = x;
  };
  const setDocumentMetaDescription = (desc) => {
    document.querySelector("meta[name='description']").setAttribute('content',desc);
  };
  return (
    <Routes>
      <Header />
      <div className="app-wrapper">
        <Sidebar />
        <div className="app-content">
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <div>
                  {setDocumentTitle("Bond.Bet No Loss Lottery Pools")}
                  {setDocumentMetaDescription("No loss lottery pools are built on top of Pool Together where 3 random persons earn the interest from the pool and everyone keeps their principal. Get a chance to win!")}
                  <Pools />
                </div>
              )}
            />
            <Route
              exact
              path="/my-account"
              component={() => (
                <div>
                  {setDocumentTitle("My Account - Bond.Bet")}
                  {setDocumentMetaDescription("My account page displays all the details about your pool entries, transactions, rewards and winnings.")}
                  <MyAccount poolType={POOL_TYPE.COMMUNITY_REWARD_POOL} />
                </div>
              )}
            />
            <Route
              exact
              path="/leaderboard"
              component={() => (
                <div>
                  {setDocumentTitle("Leaderboard - Bond.Bet")}
                  {setDocumentMetaDescription("Leaderboard displays winners, date details, and their winnings.")}
                  <LeaderBoard poolType={POOL_TYPE.COMMUNITY_REWARD_POOL} />
                </div>
              )}
            />
            <Route
              exact
              path={`/${POOL_INFORMATION.COMMUNITY_REWARD_POOL.URL}/details`}
              component={() => (
                <div>
                  {setDocumentTitle("Community Reward Pool - Bond.Bet")}
                  {setDocumentMetaDescription("The Community Reward Pool is set up by BOND founders and the weekly prize in this pool is provided from BOND Community Rewards.")}
                  <RewardPoolDetails
                    poolType={POOL_TYPE.COMMUNITY_REWARD_POOL}
                  />
                </div>
              )}
            />
            <Route
              exact
              path={`/${POOL_INFORMATION.COMMUNITY_REWARD_POOL.URL}/prize/:id`}
              component={() => (
                <div>
                  {setDocumentTitle("Community Reward Pool - Bond.Bet")}
                  {setDocumentMetaDescription("The Community Reward Pool is set up by BOND founders and the weekly prize in this pool is provided from BOND Community Rewards.")}
                  <RewardPoolPrizeDetails
                    poolType={POOL_TYPE.COMMUNITY_REWARD_POOL}
                  />
                </div>
              )}
            />
            <Route
              exact
              path={`/${POOL_INFORMATION.COMMUNITY_REWARD_POOL.URL}/player/:id`}
              component={() => (
                <div>
                  {setDocumentTitle("Community Reward Pool - Bond.Bet")}
                  {setDocumentMetaDescription("The Community Reward Pool is set up by BOND founders and the weekly prize in this pool is provided from BOND Community Rewards.")}
                  <RewardPoolPlayerDetails
                    poolType={POOL_TYPE.COMMUNITY_REWARD_POOL}
                  />
                </div>
              )}
            />

            <Route
              exact
              path={`/${POOL_INFORMATION.STAKE_POOL.URL}/details`}
              component={() => (
                <div>
                  {setDocumentTitle("BB DAO Staking Pool - Bond.Bet")}
                  {setDocumentMetaDescription("The BarnBridge DAO Staking Pool is staking deposits in the BarnBridge DAO Staking contract. The accrued interest is awarded to 3 winners.")}
                  <RewardPoolDetails poolType={POOL_TYPE.NEW_POOL} />
                </div>
              )}
            />
            <Route
              exact
              path={`/${POOL_INFORMATION.STAKE_POOL.URL}/prize/:id`}
              component={() => (
                <div>
                  {setDocumentTitle("BB DAO Staking Pool - Bond.Bet")}
                  {setDocumentMetaDescription("The BarnBridge DAO Staking Pool is staking deposits in the BarnBridge DAO Staking contract. The accrued interest is awarded to 3 winners.")}
                  <RewardPoolPrizeDetails poolType={POOL_TYPE.NEW_POOL} />
                </div>
              )}
            />
            <Route
              exact
              path={`/${POOL_INFORMATION.STAKE_POOL.URL}/player/:id`}
              component={() => (
                <div>
                  {setDocumentTitle("BB DAO Staking Pool - Bond.Bet")}
                  {setDocumentMetaDescription("The BarnBridge DAO Staking Pool is staking deposits in the BarnBridge DAO Staking contract. The accrued interest is awarded to 3 winners.")}
                  <RewardPoolPlayerDetails poolType={POOL_TYPE.NEW_POOL} />
                </div>
              )}
            />

            <Route path="*" component={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </div>
      {openModal && <Modal />}
    </Routes>
  );
}
const mapStateToProps = ({ openModal }) => ({ openModal });
export default connect(mapStateToProps)(Router);

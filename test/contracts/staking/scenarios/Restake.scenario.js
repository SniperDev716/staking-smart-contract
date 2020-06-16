const { shouldRevertAndNotStakeNft, shouldStakeNft, shouldUnstakeNft, shouldEstimateRewards,
    shouldClaimRewards, shouldRevertAndNotUnstakeNft } = require('../fixtures/behavior');

const { shouldHaveNextClaim, shouldHaveCurrentCycleAndPeriod, shouldHaveGlobalHistoryLength,
    shouldHaveStakerHistoryLength, shouldHaveLastGlobalSnapshot, shouldHaveLastStakerSnapshot } = require('../fixtures/state');

const { shouldWarpToTarget } = require('../fixtures/time');

const { RewardsTokenInitialBalance,
    DayInSeconds, CycleLengthInSeconds, PeriodLengthInSeconds, PeriodLengthInCycles,
    RarityWeights, TokenIds, DefaultRewardSchedule, RewardsPool } = require('../constants');

const restakeScenario = function (staker) {

    describe('Stake an NFT at start of period 1', function () {
        shouldStakeNft({ staker, tokenId: TokenIds[3], cycle: 1 });
        shouldEstimateRewards({ staker, periodsToClaim: 1, firstClaimablePeriod: 1, computedPeriods: 0, claimableRewards: 0 });
    });

    describe('Stake another NFT at start of period 2', function () {
        shouldWarpToTarget({ cycles: 0, periods: 1, targetCycle: 8, targetPeriod: 2 });
        shouldStakeNft({ staker, tokenId: TokenIds[0], cycle: 8 });
    });

    describe('Unstake first NFT, claim, unstake 2nd car, stake the 2nd car again period 3', function () {
        shouldWarpToTarget({ cycles: 0, periods: 1, targetCycle: 15, targetPeriod: 3 });
        shouldUnstakeNft({ staker, tokenId: TokenIds[3], cycle: 15 });
        shouldClaimRewards({ staker, periodsToClaim: 99, firstClaimablePeriod: 1, computedPeriods: 2, claimableRewards: 37800000000000000000000000 });
        shouldUnstakeNft({ staker, tokenId: TokenIds[0], cycle: 15 });
        shouldStakeNft({ staker, tokenId: TokenIds[0], cycle: 15 });
    });

    describe('Unstake the 2nd NFT and claim all the periods at start of period 8', function () {
        shouldWarpToTarget({ cycles: 0, periods: 5, targetCycle: 50, targetPeriod: 8 });
        shouldUnstakeNft({ staker, tokenId: TokenIds[0], cycle: 50 });
        shouldClaimRewards({ staker, periodsToClaim: 10, firstClaimablePeriod: 3, computedPeriods: 5, claimableRewards: 24500 });
    });

    describe('Stake the 2nd NFT start of period 7', function () {
        shouldWarpToTarget({ cycles: 0, periods: 4, targetCycle: 78, targetPeriod: 12 });
        shouldStakeNft({ staker, tokenId: TokenIds[0], cycle: 78 });
    });

    describe('Estimate start of period 9', function () {
        shouldWarpToTarget({ cycles: 0, periods: 2, targetCycle: 92, targetPeriod: 14 });
        shouldEstimateRewards({ staker, periodsToClaim: 99, firstClaimablePeriod: 8, computedPeriods: 6, claimableRewards: 7000 });
    });
}

module.exports = {
    restakeScenario
}
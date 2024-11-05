// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ChoirToken is ERC20 {
    // Reward calculation remains same but implemented in Solidity
    function calculateReward(uint256 timestamp) public pure returns (uint256) {
        // R(t) = R_total × k/(1 + kt)ln(1 + kT)
        uint256 k = 204; // 2.04 scaled by 100
        uint256 t = timestamp - LAUNCH_TIME;
        uint256 T = 4 years;

        return (TOTAL_SUPPLY * k * log(1 + k * T)) /
            ((1 + k * t) * 1000);
    }

    // Prior rewards maintain same formula
    function calculatePriorReward(uint256 quality, uint256 treasuryBalance)
        public pure returns (uint256)
    {
        // V(p) = B_t × Q(p)/∑Q(i)
        return (treasuryBalance * quality) / TOTAL_QUALITY;
    }
}

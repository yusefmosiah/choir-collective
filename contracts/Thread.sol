// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ChoirToken.sol";

contract Thread {
    ChoirToken public token;

    struct ThreadState {
        address[] coAuthors;
        uint256 tokenBalance;
        uint256 temperature;
        uint256 frequency;
        bytes32[] messageHashes;
        bool exists;
        uint256 lastCoolTime;
    }

    mapping(bytes32 => ThreadState) public threads;

    event ThreadCreated(bytes32 indexed threadId, address creator);
    event MessageSubmitted(bytes32 indexed threadId, bytes32 messageHash);
    event TemperatureChanged(bytes32 indexed threadId, uint256 newTemp);
    event ThreadsCoupled(bytes32 indexed threadId, bytes32 indexed priorThreadId);
    event TemperatureCooled(bytes32 indexed threadId, uint256 newTemp);

    constructor(address tokenAddress) {
        token = ChoirToken(tokenAddress);
    }

    function createThread(bytes32 threadId) external {
        require(!threads[threadId].exists, "Thread exists");

        ThreadState storage thread = threads[threadId];
        thread.coAuthors = [msg.sender];
        thread.temperature = 1000; // Initial temp of 1.0
        thread.frequency = 1000;   // Initial freq of 1.0
        thread.exists = true;
        thread.lastCoolTime = block.timestamp;

        emit ThreadCreated(threadId, msg.sender);
    }

    function submitMessage(bytes32 threadId, bytes32 messageHash) external {
        ThreadState storage thread = threads[threadId];
        require(thread.exists, "Thread not found");

        // Handle stake transfer
        uint256 stakeRequired = calculateStakeRequirement(threadId);
        token.transferFrom(msg.sender, address(this), stakeRequired);

        thread.messageHashes.push(messageHash);
        thread.tokenBalance += stakeRequired;

        emit MessageSubmitted(threadId, messageHash);
    }

    function evolveTemperature(bytes32 threadId, uint256 delta) external {
        ThreadState storage thread = threads[threadId];
        require(thread.exists, "Thread not found");

        uint256 newTemp = (thread.temperature * thread.tokenBalance + delta) /
            thread.coAuthors.length;
        thread.temperature = newTemp;

        emit TemperatureChanged(threadId, newTemp);
    }

    function calculateStakeRequirement(bytes32 threadId) public view returns (uint256) {
        ThreadState storage thread = threads[threadId];
        return (thread.frequency * (thread.tokenBalance + 500)) / 1000;
    }

    function citePrior(bytes32 threadId, bytes32 priorThreadId) external {
        ThreadState storage thread = threads[threadId];
        ThreadState storage priorThread = threads[priorThreadId];
        require(thread.exists && priorThread.exists, "Thread not found");

        // Citations strengthen both threads through frequency coupling
        uint256 couplingFactor = 50; // 0.05 in fixed point
        thread.frequency += (priorThread.frequency * couplingFactor) / 1000;
        priorThread.frequency += (thread.frequency * couplingFactor) / 1000;

        emit ThreadsCoupled(threadId, priorThreadId);
    }

    // Natural cooling over time
    function coolTemperature(bytes32 threadId) external {
        ThreadState storage thread = threads[threadId];
        require(thread.exists, "Thread not found");

        // T = T0/√(1 + t/τ) where τ is characteristic time
        uint256 timePassed = block.timestamp - thread.lastCoolTime;
        uint256 coolingFactor = sqrt(1000 + timePassed / 86400); // τ = 1 day
        thread.temperature = (thread.temperature * 1000) / coolingFactor;

        thread.lastCoolTime = block.timestamp;
        emit TemperatureCooled(threadId, thread.temperature);
    }
}

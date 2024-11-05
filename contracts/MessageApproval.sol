// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MessageApproval {
    // 7-day approval window remains same
    uint256 constant APPROVAL_WINDOW = 7 days;

    struct Message {
        bytes32 contentHash;
        address author;
        uint256 timestamp;
        mapping(address => bool) approvals;
        bool finalized;
    }

    mapping(bytes32 => Message) public messages;

    function approveMessage(bytes32 threadId, bytes32 messageHash) public {
        Message storage msg = messages[messageHash];
        require(block.timestamp <= msg.timestamp + APPROVAL_WINDOW, "Expired");

        // Record approval
        msg.approvals[msg.sender] = true;

        // Check if unanimous
        ThreadState storage thread = threads[threadId];
        bool unanimous = true;
        for (uint i = 0; i < thread.coAuthors.length; i++) {
            if (!msg.approvals[thread.coAuthors[i]]) {
                unanimous = false;
                break;
            }
        }

        if (unanimous) {
            finalizeApproval(threadId, messageHash);
        }
    }
}

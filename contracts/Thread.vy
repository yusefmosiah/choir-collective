# @version ^0.3.7

from vyper.interfaces import ERC20

struct ThreadState:
    coAuthors: DynArray[address, 1000]
    tokenBalance: uint256
    temperature: uint256  # Fixed point: 1.0 = 1000
    frequency: uint256    # Fixed point: 1.0 = 1000
    messageHashes: DynArray[bytes32, 1000]
    exists: bool
    lastCoolTime: uint256

interface ChoirToken:
    def transferFrom(_from: address, _to: address, _value: uint256) -> bool: nonpayable

# State Variables
token: public(ChoirToken)
threads: public(HashMap[bytes32, ThreadState])

# Events
event ThreadCreated:
    threadId: indexed(bytes32)
    creator: address

event MessageSubmitted:
    threadId: indexed(bytes32)
    messageHash: bytes32

event TemperatureChanged:
    threadId: indexed(bytes32)
    newTemp: uint256

event ThreadsCoupled:
    threadId: indexed(bytes32)
    priorThreadId: indexed(bytes32)

@external
def __init__(_token: address):
    self.token = ChoirToken(_token)

@external
def createThread(threadId: bytes32):
    assert not self.threads[threadId].exists, "Thread exists"

    self.threads[threadId].coAuthors = [msg.sender]
    self.threads[threadId].temperature = 1000  # 1.0 in fixed point
    self.threads[threadId].frequency = 1000    # 1.0 in fixed point
    self.threads[threadId].exists = True
    self.threads[threadId].lastCoolTime = block.timestamp

    log ThreadCreated(threadId, msg.sender)

@external
def submitMessage(threadId: bytes32, messageHash: bytes32):
    assert self.threads[threadId].exists, "Thread not found"

    # Calculate and transfer stake
    stakeRequired: uint256 = self._calculateStake(threadId)
    assert self.token.transferFrom(msg.sender, self, stakeRequired)

    # Update thread state
    self.threads[threadId].messageHashes.append(messageHash)
    self.threads[threadId].tokenBalance += stakeRequired

    log MessageSubmitted(threadId, messageHash)

@internal
def _calculateStake(threadId: bytes32) -> uint256:
    thread: ThreadState = self.threads[threadId]
    return (thread.frequency * (thread.tokenBalance + 500)) / 1000

@external
def evolveTemperature(threadId: bytes32, delta: uint256):
    assert self.threads[threadId].exists, "Thread not found"

    thread: ThreadState = self.threads[threadId]
    newTemp: uint256 = (thread.temperature * thread.tokenBalance + delta) / len(thread.coAuthors)
    self.threads[threadId].temperature = newTemp

    log TemperatureChanged(threadId, newTemp)

@external
def citePrior(threadId: bytes32, priorThreadId: bytes32):
    assert self.threads[threadId].exists and self.threads[priorThreadId].exists, "Thread not found"

    # Citations strengthen both threads through frequency coupling
    couplingFactor: uint256 = 50  # 0.05 in fixed point

    self.threads[threadId].frequency += (self.threads[priorThreadId].frequency * couplingFactor) / 1000
    self.threads[priorThreadId].frequency += (self.threads[threadId].frequency * couplingFactor) / 1000

    log ThreadsCoupled(threadId, priorThreadId)

@external
def coolTemperature(threadId: bytes32):
    assert self.threads[threadId].exists, "Thread not found"

    timePassed: uint256 = block.timestamp - self.threads[threadId].lastCoolTime
    coolingFactor: uint256 = isqrt(1000 + timePassed / 86400)  # τ = 1 day

    self.threads[threadId].temperature = (self.threads[threadId].temperature * 1000) / coolingFactor
    self.threads[threadId].lastCoolTime = block.timestamp

    log TemperatureChanged(threadId, self.threads[threadId].temperature)

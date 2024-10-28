import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Basic } from '../target/types/basic';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('basic', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Basic as Program<Basic>;

  // Add provider check at the start
  if (!program.provider.publicKey) {
    throw new Error("Provider public key is undefined");
  }

  it('should initialize', async () => {
    const tx = await program.methods
      .initialize()
      .rpc();

    console.log('Your transaction signature', tx);
    expect(tx).to.be.a('string');
  });

  it('should create a new message', async () => {
    const message = anchor.web3.Keypair.generate();
    const provider = program.provider as anchor.AnchorProvider;

    // Explicitly cast accounts to any to bypass TypeScript checking
    // This is safe because we know these are the correct account names
    const accounts = {
      message: message.publicKey,
      author: provider.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    } as any;

    const tx = await program.methods
      .createMessage('Hello, Solana!')
      .accounts(accounts)
      .signers([message])
      .rpc();

    console.log('Message creation signature:', tx);

    const messageAccount = await program.account.message.fetch(message.publicKey);

    expect(messageAccount.content).to.equal('Hello, Solana!');
    // Use non-null assertion since we checked provider.publicKey at the start
    expect(messageAccount.author.toBase58()).to.equal(provider.publicKey!.toBase58());
  });
});

import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Basic } from '../target/types/basic';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('basic', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Basic as Program<Basic>;

  it('Is initialized!', async () => {
    const tx = await program.methods
      .initialize()
      .rpc();

    console.log('Your transaction signature', tx);
    expect(tx).to.be.a('string');
  });
});

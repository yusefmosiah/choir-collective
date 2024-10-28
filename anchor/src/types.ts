import { Idl } from "@coral-xyz/anchor";
import type { IdlMetadata } from "@coral-xyz/anchor/dist/cjs/idl";

// Define the proper type structure that matches Anchor's IDL
export interface Basic extends Idl {
  version: "0.1.0";
  name: "basic";
  instructions: {
    name: string;
    accounts: {
      name: string;
      isMut: boolean;
      isSigner: boolean;
    }[];
    args: {
      name: string;
      type: "string";
    }[];
    discriminator: number[];
  }[];
  metadata: IdlMetadata;
  address: string;
}

// Use process.env to conditionally set the program ID
const PROGRAM_ID = process.env.NEXT_PUBLIC_PROGRAM_ID || "11111111111111111111111111111111";

export const IDL: Basic = {
  version: "0.1.0",
  name: "basic",
  instructions: [
    {
      name: "initialize",
      accounts: [],
      args: [],
      discriminator: [0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: "createMessage",
      accounts: [
        {
          name: "message",
          isMut: true,
          isSigner: true
        },
        {
          name: "author",
          isMut: true,
          isSigner: true
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false
        }
      ],
      args: [
        {
          name: "content",
          type: "string"
        }
      ],
      discriminator: [1, 0, 0, 0, 0, 0, 0, 0]
    }
  ],
  metadata: {
    name: "basic",
    version: "0.1.0",
    spec: "0.1.0"
  },
  address: PROGRAM_ID
};

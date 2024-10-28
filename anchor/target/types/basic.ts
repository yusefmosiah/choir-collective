/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/basic.json`.
 */
export type Basic = {
  "address": "BTZP9trae9yh7Pugqy3Dy688B63SjqUpXMo4MLtbQqiA",
  "metadata": {
    "name": "basic",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createMessage",
      "discriminator": [
        234,
        159,
        7,
        241,
        215,
        17,
        188,
        237
      ],
      "accounts": [
        {
          "name": "message",
          "writable": true,
          "signer": true
        },
        {
          "name": "author",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "content",
          "type": "string"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "message",
      "discriminator": [
        110,
        151,
        23,
        110,
        198,
        6,
        125,
        181
      ]
    }
  ],
  "types": [
    {
      "name": "message",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "author",
            "type": "pubkey"
          },
          {
            "name": "content",
            "type": "string"
          }
        ]
      }
    }
  ]
};

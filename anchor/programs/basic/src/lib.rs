use anchor_lang::prelude::*;

declare_id!("BTZP9trae9yh7Pugqy3Dy688B63SjqUpXMo4MLtbQqiA");  // Updated to match deployed program ID

#[program]
pub mod basic {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn create_message(ctx: Context<CreateMessage>, content: String) -> Result<()> {
        let message = &mut ctx.accounts.message;
        message.author = ctx.accounts.author.key();
        message.content = content;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct CreateMessage<'info> {
    #[account(init, payer = author, space = 8 + 32 + 200)]
    pub message: Account<'info, Message>,
    #[account(mut)]
    pub author: Signer<'info>,
    #[account(address = System::id())]
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Message {
    pub author: Pubkey,
    pub content: String,
}

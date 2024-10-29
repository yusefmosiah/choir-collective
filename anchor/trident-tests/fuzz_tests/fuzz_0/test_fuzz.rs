#![no_main]

use honggfuzz::fuzz;
use trident_fuzz::*;

fn main() {
    Cycle {
        fuzz!(|data: &[u8]| {
            let mut runner = Runner::new();
            runner.run(data).unwrap();
        });
    }
}

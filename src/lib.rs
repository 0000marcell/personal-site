extern crate cfg_if;
extern crate wasm_bindgen;
extern crate web_sys;

mod utils;

use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

#[wasm_bindgen]
pub struct Text {
    value: String,
    x: u32,
    y: u32,
}

#[wasm_bindgen]
impl Text {
    pub fn new() -> Text {
        web_sys::console::log_1(&"running!".into());
        let x = 0;
        let y = 48;
        let value = "Hi, My name is Marcell".to_string();
        Text {
            value,
            x,
            y
        }
    }

    pub fn value(&self) -> String {
        self.value.clone().into()
    }

    pub fn x(&self) -> u32 {
        self.x 
    }

    pub fn y(&self) -> u32 {
        self.y 
    }
}


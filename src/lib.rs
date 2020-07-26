use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn setInterval(closure: &Closure<dyn FnMut()>, time: u32) -> i32;
    fn clearInterval(id: i32);

    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub struct IntervalHandle {
    interval_id: i32,
    _closure: Closure<dyn FnMut()>,
}

impl Drop for IntervalHandle {
    fn drop(&mut self) {
        clearInterval(self.interval_id);
    }
}

#[wasm_bindgen]
pub fn run() -> IntervalHandle {
    // First up we use `Closure::wrap` to wrap up a Rust closure and create
    // a JS closure.
    let cb = Closure::wrap(Box::new(|| {
        log("interval elapsed!");
    }) as Box<dyn FnMut()>);

    // Next we pass this via reference to the `setInterval` function, and
    // `setInterval` gets a handle to the corresponding JS closure.
    let interval_id = setInterval(&cb, 1_000);

    // If we were to drop `cb` here it would cause an exception to be raised
    // whenever the interval elapses. Instead we *return* our handle back to JS
    // so JS can decide when to cancel the interval and deallocate the closure.
    IntervalHandle {
        interval_id,
        _closure: cb,
    }
}



#[wasm_bindgen(start)]
pub fn start() {
    run();
}

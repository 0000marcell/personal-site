use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
mod log;
mod canvas;

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

    let cb = Closure::wrap(Box::new(|| {
        log!("interval elapsed!");
    }) as Box<dyn FnMut()>);

    let interval_id = setInterval(&cb, 1_000);

    IntervalHandle {
        interval_id,
        _closure: cb,
    }
}

#[wasm_bindgen(start)]
pub fn start() {
    let window = web_sys::window().unwrap();
    let document = window.document().unwrap();
    let canvas = document.get_element_by_id("canvas").unwrap();
    let canvas: web_sys::HtmlCanvasElement = canvas
        .dyn_into::<web_sys::HtmlCanvasElement>()
        .map_err(|_| ())
        .unwrap();

    let context = canvas
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<web_sys::CanvasRenderingContext2d>()
        .unwrap();

    let wv_width = window.inner_width().unwrap().as_f64().unwrap() as u32;
    let wv_height = window.inner_height().unwrap().as_f64().unwrap() as u32;



    canvas.set_width(wv_width);
    canvas.set_height(wv_height);
    context.set_font("48px serif");

    let text = "Lorem Ipsum";
    let text_metrics = context.measure_text(text).unwrap();

    let text_x = wv_width / 2 - text_metrics.width() as u32;
    let text_y = wv_height / 2;
    context.set_fill_style(&JsValue::from_str("#ffffff"));
    canvas::draw_text(text, text_x, text_y, context);

    run(); 
}

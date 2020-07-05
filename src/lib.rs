use std::f64;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

pub fn draw_text(text: String, x: ) {
    log!("{}", text);
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
    context.fill_text(text, text_x as f64, text_y as f64).unwrap();
    

    // const vw = Math.max(document.documentElement.clientWidth || 0,  || 0);
    // const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
}

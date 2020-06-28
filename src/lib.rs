use std::f64;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

#[wasm_bindgen(start)]
pub fn start() {
    let document = web_sys::window().unwrap().document().unwrap();
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

    canvas.set_width(500);
    canvas.set_height(500);
    context.set_font("48px serif");
    context.set_fill_style(&JsValue::from_str("#fff"));
    context.stroke_text("Lorem Ipsum", 50_f64, 50_f64);
    //context.set_fill_text("Lorem Ipsum", 50, 50);
}

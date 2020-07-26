use std::f64;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use tokio::time::{self, Duration};
use std::future::Future;

fn set_interval<F, Fut>(mut f: F, dur: Duration)
where
    F: Send + 'static + FnMut() -> Fut,
    Fut: Future<Output = ()> + Send + 'static,
{
    // Create stream of intervals.
    let mut interval = time::interval(dur);
    
    tokio::spawn(async move {
        // Skip the first tick at 0ms.
        interval.tick().await;
        loop {
            // Wait until next tick:
            interval.tick().await;
            // Spawn a task for the operation.
            tokio::spawn(f());
        }
    });
}

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

async fn run_tokio() {
    log!("testing!!!");
    set_interval(|| async {
        log!("Hello world!");
    }, Duration::from_millis(1000));
    
    time::delay_for(Duration::from_millis(6000)).await;
}

pub fn draw_text(text: &str, x: u32, y: u32, 
                 context: &web_sys::CanvasRenderingContext2d, 
                 canvas: &web_sys::HtmlCanvasElement) {
    context.clear_rect(0_f64, 0_f64, canvas.width() as f64, canvas.height() as f64);
    context.fill_text(text, x as f64, y as f64).unwrap();
}

#[wasm_bindgen(start)]
#[tokio::main]
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

    run_tokio();

    let text_x = wv_width / 2 - text_metrics.width() as u32;
    let text_y = wv_height / 2;
    context.set_fill_style(&JsValue::from_str("#ffffff"));
    draw_text(text, text_x, text_y, &context, &canvas);
    draw_text("marcell", text_x, text_y, &context, &canvas);
}

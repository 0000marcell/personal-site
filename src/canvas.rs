pub fn draw_text(text: &str, x: u32, y: u32, context: web_sys::CanvasRenderingContext2d) {
    context.fill_text(text, x as f64, y as f64).unwrap();
}


#[tauri::command]
fn verify_archive(json: String) -> Result<chatharbor_archive_core::Summary, String> {
    chatharbor_archive_core::verify_archive(&json).map_err(str::to_owned)
}
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![verify_archive])
        .run(tauri::generate_context!())
        .expect("Unable to start ChatHarbor desktop runtime");
}

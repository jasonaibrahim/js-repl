#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

use deno_core::JsRuntime;
use deno_core::RuntimeOptions;
use deno_core::v8;


fn main() {
    tauri::Builder
        ::default()
        .invoke_handler(tauri::generate_handler![eval])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn eval(code: &str) -> Result<serde_json::Value, String> {
    let mut runtime = JsRuntime::new(RuntimeOptions::default());

    let res = runtime.execute_script("<context>", code);
    match res {
        Ok(global) => {
            let scope = &mut runtime.handle_scope();
            let local = v8::Local::new(scope, global);
            // Deserialize a `v8` object into a Rust type using `serde_v8`,
            // in this case deserialize to a JSON `Value`.
            let deserialized_value = serde_v8::from_v8::<serde_json::Value>(scope, local);

            match deserialized_value {
                Ok(value) => Ok(value),
                Err(err) => Err(format!("Cannot deserialize value: {:?}", err)),
            }
        }
        Err(err) => Err(format!("{:?}", err)),
    }
}
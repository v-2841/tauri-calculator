use serde::Serialize;

#[derive(Serialize)]
struct Roots {
    x0: Option<f64>,
    x1: Option<f64>,
    x2: Option<f64>,
}

#[tauri::command]
fn calculate_roots(a: f64, b: f64, c: f64) -> Roots {
    if a == 0.0 {
        if b != 0.0 {
            // Линейное уравнение
            let x0 = -c / b;
            Roots {
                x0: Some(x0),
                x1: None,
                x2: None,
            }
        } else {
            // Константа или нет решений
            Roots {
                x0: None,
                x1: None,
                x2: None,
            }
        }
    } else {
        let discriminant = b * b - 4.0 * a * c;
        if discriminant < 0.0 {
            // Нет вещественных корней
            Roots {
                x0: None,
                x1: None,
                x2: None,
            }
        } else if discriminant == 0.0 {
            // Один корень
            let x = -b / (2.0 * a);
            Roots {
                x0: None,
                x1: Some(x),
                x2: None,
            }
        } else {
            // Два корня
            let sqrt_d = discriminant.sqrt();
            let x1 = (-b + sqrt_d) / (2.0 * a);
            let x2 = (-b - sqrt_d) / (2.0 * a);
            Roots {
                x0: None,
                x1: Some(x1),
                x2: Some(x2),
            }
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![calculate_roots])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

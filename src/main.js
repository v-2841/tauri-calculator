const { invoke } = window.__TAURI__.core;

async function calculateRoots() {
  const a = parseFloat(document.getElementById("a").value) || 0;
  const b = parseFloat(document.getElementById("b").value) || 0;
  const c = parseFloat(document.getElementById("c").value) || 0;

  const result = await window.__TAURI__.invoke("calculate_roots", { a, b, c });

  document.getElementById("x0").style.display = result.x0 ? "block" : "none";
  document.getElementById("x0-value").innerText = result.x0 || "";

  document.getElementById("x1").style.display = result.x1 !== null ? "block" : "none";
  document.getElementById("x1-value").innerText = result.x1 || "";

  document.getElementById("x2").style.display = result.x2 !== null ? "block" : "none";
  document.getElementById("x2-value").innerText = result.x2 || "";
}

// Подключение события input ко всем полям
window.onload = () => {
  document.getElementById("a").addEventListener("input", calculateRoots);
  document.getElementById("b").addEventListener("input", calculateRoots);
  document.getElementById("c").addEventListener("input", calculateRoots);
};
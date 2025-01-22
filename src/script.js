document.addEventListener("DOMContentLoaded", () => {
  const inputs = ["a", "b", "c"].map((id) => document.getElementById(id));
  const resultDiv = document.getElementById("result");

  function solveQuadratic(a, b, c) {
    if (a === 0) {
      if (b === 0) {
        return "Это не уравнение";
      }
      return `x = ${(-c / b)}`;
    }

    const discriminant = b * b - 4 * a * c;

    if (discriminant > 0) {
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      return `x₁ = ${x1}<br>x₂ = ${x2}`;
    } else if (discriminant === 0) {
      const x = -b / (2 * a);
      return `x = ${x}`;
    } else {
      return "Нет рациональных решений";
    }
  }

  function updateResult() {
    const values = inputs.map((input) => parseFloat(input.value) || 0);
    const [a, b, c] = values;

    if (inputs.some((input) => input.value === "")) {
      resultDiv.innerHTML = "<p>Введите коэффициенты для решения уравнения</p>";
      return;
    }

    const sign = (num) => (num >= 0 ? "+" : "-");
    const formatNumber = (num) =>
      num === 0 ? "" : `${sign(num)} ${Math.abs(num)}`;
    const equation = [
      a === 0 ? "" : `${a}x²`,
      b === 0 ? "" : formatNumber(b) + "x",
      formatNumber(c),
    ]
      .filter(Boolean)
      .join(" ");
    const solution = solveQuadratic(a, b, c);

    resultDiv.innerHTML = `
      <p>Уравнение: ${equation}</p>
      <p>Решение:<br>${solution}</p>
    `;
  }

  inputs.forEach((input) => {
    input.addEventListener("input", updateResult);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && e.target === inputs[2]) {
      inputs[0].focus();
      e.preventDefault();
    }
  });
});

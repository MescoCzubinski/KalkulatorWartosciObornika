function format(inputString) {
  return inputString
    .replace(/[^0-9.,]/g, "")
    .replace(/^0+(?=\d)/, "")
    .replace(/,/g, ".")
    .replace(/^\.($|[^0-9])/, "0.")
    .replace(/\.{2,}/g, ".")
    .replace(/(.*?\..*?)\./g, "$1")
    .replace(/(\d+\.\d{2})\d*/g, "$1")
    .replace(/[a-zA-Z]+/g, "");
}
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", (event) => {
    if (event.target.classList.contains("text")) return;
    const inputField = event.target;
    inputField.value = format(inputField.value);
  });
});
const visitedElements = document.querySelectorAll("input, select");
visitedElements.forEach((input) => {
  input.addEventListener("blur", () => {
    if (input.value) {
      input.classList.add("visited");
    } else {
      input.classList.remove("visited");
    }
  });
});

const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  const allElements = document.querySelectorAll("input, select");
  allElements.forEach((input) => {
    input.value = "";
    input.classList.remove("visited");
  });

  document.querySelector("#result").textContent = "podaj wartości";
  document.querySelector("#result2").textContent = "podaj wartości";
  plonSection.style.display = "none";
  dawkaSection.style.display = "none";
  result2Section.style.display = "none";
});

const skladProduktuNaturalnego = document.querySelector(
  "#skladProduktuNaturalnego"
);
skladProduktuNaturalnegoOptions.forEach((option) => {
  const optionElement = document.createElement("option");
  optionElement.value = JSON.stringify(option);
  optionElement.textContent = option.name;
  skladProduktuNaturalnego.appendChild(optionElement);
});

const wlasnyAzot = document.querySelector("#wlasnyAzot");
const wlasnyFosfor = document.querySelector("#wlasnyFosfor");
const wlasnyPotas = document.querySelector("#wlasnyPotas");

const zawartoscAzot = document.querySelector("#zawartoscAzot");
const zawartoscFosfor = document.querySelector("#zawartoscFosfor");
const zawartoscPotas = document.querySelector("#zawartoscPotas");

const cenaAzot = document.querySelector("#cenaAzot");
const cenaFosfor = document.querySelector("#cenaFosfor");
const cenaPotas = document.querySelector("#cenaPotas");

const plonSection = document.querySelector("#plonSection");
const dawkaSection = document.querySelector("#dawkaSection");
const result2Section = document.querySelector("#result2Section");
plonSection.style.display = "none";
dawkaSection.style.display = "none";
result2Section.style.display = "none";

const plon = document.querySelector("#plon");
const dawkaNawozu = document.querySelector("#dawkaNawozu");

function unitChange() {
  const units = document.querySelectorAll(".unit-to-change");
  if (isObornik) {
    units.forEach((unit) => {
      unit.textContent = "% sw.m.";
    });
  } else {
    units.forEach((unit) => {
      unit.textContent = "kg/t plonu";
    });
  }
}

let isObornik = true;
unitChange();
skladProduktuNaturalnego.addEventListener("change", () => {
  if (skladProduktuNaturalnego.value !== "własny skład") {
    const option = JSON.parse(skladProduktuNaturalnego.value);
    wlasnyAzot.value = option.azot;
    wlasnyFosfor.value = option.fosfor;
    wlasnyPotas.value = option.potas;
    isObornik = option.isObornik;
    unitChange();

    if (isObornik) {
      plonSection.style.display = "none";
      dawkaSection.style.display = "block";
      result2Section.style.display = "flex";
    } else {
      plonSection.style.display = "block";
      dawkaSection.style.display = "none";
      result2Section.style.display = "none";
    }

    wlasnyAzot.classList.add("visited");
    wlasnyFosfor.classList.add("visited");
    wlasnyPotas.classList.add("visited");
  }
});
[wlasnyAzot, wlasnyFosfor, wlasnyPotas].forEach((input) => {
  input.addEventListener("input", () => {
    skladProduktuNaturalnego.value = "własny skład";
    isObornik = true;
    plonSection.style.display = "none";
    dawkaSection.style.display = "block";
    result2Section.style.display = "flex";
  });
});

function unitaryCalculator() {
  let result = 0;
  let azot =
    (wlasnyAzot.value / 0.1) * (cenaAzot.value / zawartoscAzot.value / 10);
  let fosfor =
    (wlasnyFosfor.value / 0.1) *
    (cenaFosfor.value / zawartoscFosfor.value / 10);
  let potas =
    (wlasnyPotas.value / 0.1) * (cenaPotas.value / zawartoscPotas.value / 10);
  result = azot + fosfor + potas;

  return result;
}
function calculate() {
  let result = unitaryCalculator();

  if (isObornik) {
    result = result * dawkaNawozu.value;
  } else {
    result = result * plon.value;
  }
  return result;
}
function displayResult() {
  const result = calculate();
  if (
    result === 0 ||
    result === "" ||
    result === null ||
    result === undefined ||
    result === Infinity ||
    isNaN(result)
  ) {
    document.querySelector("#result").textContent = "podaj wartości";
    return;
  }

  document.querySelector("#result").textContent =
    result.toFixed(2).toLocaleString("pl-PL") + " zł";
}
function displayResult2() {
  const result = unitaryCalculator();
  if (
    result === 0 ||
    result === "" ||
    result === null ||
    result === undefined ||
    result === Infinity ||
    isNaN(result)
  ) {
    document.querySelector("#result2").textContent = "podaj wartości";
    return;
  }
  document.querySelector("#result2").textContent =
    result.toFixed(2).toLocaleString("pl-PL") + " zł";
}
document.addEventListener("input", () => {
  displayResult();
  displayResult2();
});
document.addEventListener("change", () => {
  displayResult();
  displayResult2();
});
document.addEventListener("click", () => {
  displayResult();
  displayResult2();
});

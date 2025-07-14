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
    const inputField = event.target;
    inputField.value = format(inputField.value);
  });
});
const visitedElements = document.querySelectorAll("input, select");
visitedElements.forEach((input) => {
  input.addEventListener("blur", function () {
    if (this.value) {
      this.classList.add("visited");
    } else {
      this.classList.remove("visited");
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

let isObornik = true;
skladProduktuNaturalnego.addEventListener("change", () => {
  if (skladProduktuNaturalnego.value !== "własny skład") {
    const option = JSON.parse(skladProduktuNaturalnego.value);
    wlasnyAzot.value = option.azot;
    wlasnyFosfor.value = option.fosfor;
    wlasnyPotas.value = option.potas;
    isObornik = option.isObornik;

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
  });
});

function calculate() {
  let result = 0;
  let azot =
    (wlasnyAzot.value / 0.1) * (cenaAzot.value / zawartoscAzot.value / 10);
  let fosfor =
    (wlasnyFosfor.value / 0.1) *
    (cenaFosfor.value / zawartoscFosfor.value / 10);
  let potas =
    (wlasnyPotas.value / 0.1) * (cenaPotas.value / zawartoscPotas.value / 10);
  result = azot + fosfor + potas;

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
    isNaN(result)
  ) {
    document.querySelector("#result").textContent = "podaj wartości";
    document.querySelector("#result2").textContent = "podaj wartości";
    return;
  }
  document.querySelector("#result").textContent =
    result.toFixed(2).toLocaleString("pl-PL") + " zł";
  document.querySelector("#result2").textContent =
    (result / dawkaNawozu.value).toFixed(2).toLocaleString("pl-PL") + " zł";
}
document.addEventListener("input", () => {
  displayResult();
});
document.addEventListener("change", () => {
  displayResult();
});
document.addEventListener("click", () => {
  displayResult();
});

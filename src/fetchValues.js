const testValues = {
  azot: { name: "Saletra amonowa", concentration: 34, price: 1629 },
  fosfor: { name: "Superfosfat 40%", concentration: 40, price: 2762 },
  potas: { name: "Sól potasowa 60%", concentration: 60, price: 1710 },
};

const fetchValues = document.querySelector("#fetchValues");
fetchValues.addEventListener("click", () => {
  nazwaAzot.value = testValues.azot.name;
  nazwaFosfor.value = testValues.fosfor.name;
  nazwaPotas.value = testValues.potas.name;
  zawartoscAzot.value = testValues.azot.concentration;
  zawartoscFosfor.value = testValues.fosfor.concentration;
  zawartoscPotas.value = testValues.potas.concentration;
  cenaAzot.value = testValues.azot.price;
  cenaFosfor.value = testValues.fosfor.price;
  cenaPotas.value = testValues.potas.price;

  nazwaAzot.disabled = true;
  nazwaFosfor.disabled = true;
  nazwaPotas.disabled = true;
  zawartoscAzot.disabled = true;
  zawartoscFosfor.disabled = true;
  zawartoscPotas.disabled = true;
  cenaAzot.disabled = true;
  cenaFosfor.disabled = true;
  cenaPotas.disabled = true;

  nazwaAzot.classList.add("visited");
  nazwaFosfor.classList.add("visited");
  nazwaPotas.classList.add("visited");
  zawartoscAzot.classList.add("visited");
  zawartoscFosfor.classList.add("visited");
  zawartoscPotas.classList.add("visited");
  cenaAzot.classList.add("visited");
  cenaFosfor.classList.add("visited");
  cenaPotas.classList.add("visited");
});
const fetchValuesReset = document.querySelector("#fetchValuesReset");
fetchValuesReset.addEventListener("click", () => {
  nazwaAzot.value = "";
  nazwaFosfor.value = "";
  nazwaPotas.value = "";
  zawartoscAzot.value = "";
  zawartoscFosfor.value = "";
  zawartoscPotas.value = "";
  cenaAzot.value = "";
  cenaFosfor.value = "";
  cenaPotas.value = "";

  nazwaAzot.disabled = false;
  nazwaFosfor.disabled = false;
  nazwaPotas.disabled = false;
  zawartoscAzot.disabled = false;
  zawartoscFosfor.disabled = false;
  zawartoscPotas.disabled = false;
  cenaAzot.disabled = false;
  cenaFosfor.disabled = false;
  cenaPotas.disabled = false;

  nazwaAzot.classList.remove("visited");
  nazwaFosfor.classList.remove("visited");
  nazwaPotas.classList.remove("visited");
  zawartoscAzot.classList.remove("visited");
  zawartoscFosfor.classList.remove("visited");
  zawartoscPotas.classList.remove("visited");
  cenaAzot.classList.remove("visited");
  cenaFosfor.classList.remove("visited");
  cenaPotas.classList.remove("visited");
});

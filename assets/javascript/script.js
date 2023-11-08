console.log("Script chargé");

const rue = document.querySelector('input[name="rue"]');
const codePostalInput = document.querySelector('input[name="codePostal"]');
const villeInput = document.querySelector('input[name="ville"]');
const rue2 = document.querySelector('input[name="lvrue"]');
const codePostalInput2 = document.querySelector('input[name="lvcodePostal"]');
const villeInput2 = document.querySelector('input[name="lvville"]');
const apiUrl = "https://api-adresse.data.gouv.fr/search/?q=";

let suggestions = [];

rue.addEventListener("input", async function () {
  // Récupérez ce que l'utilisateur a tapé.
  let contenu = rue.value;
  // Remplacez les espaces par des "+".
  let contenuV2 = contenu.replace(/ /g, "+");
  // Créez l'URL de l'API en ajoutant le contenu de Rue à l'URL de base.
  let adresseApi = apiUrl + contenuV2 + "&limit=6";
  console.log("C'est mon adresse API :", adresseApi);

  let dataAdressFetch;
  await getDataAdressFetch();
  async function getDataAdressFetch() {
    const res = await fetch(adresseApi);
    dataAdressFetch = await res.json();
    console.log("Mon dataFetch :", dataAdressFetch);

    // Mettez à jour la liste des suggestions.
    suggestions = dataAdressFetch.features;

    // Sélectionnez la datalist qui affiche les suggestions.
    const datalist = document.querySelector("datalist#rueSuggestions");
    //efface le contenue actuel de la datalist
    datalist.innerHTML = "";

    // Affichez les suggestions actuelles comme des options.
    suggestions.forEach((suggestion) => {
      //creation element option
      const option = document.createElement("option");
      //option prend la valeur label de mon tableau
      option.value = suggestion.properties.name;
      datalist.appendChild(option);
    });
  }
});
rue.addEventListener("change", function () {
  // Obtenez la valeur sélectionnée dans le champ "Rue".
  const selectedValue = rue.value;

  // Recherchez la suggestion correspondante dans la liste de suggestions.
  const selectedSuggestion = suggestions.find(
    (suggestion) => suggestion.properties.name === selectedValue
  );

  if (selectedSuggestion) {
    // Mettez à jour la valeur du champ "Rue" dans rue2 avec la valeur de la propriété "name" de la suggestion.
    rue2.value = selectedSuggestion.properties.name;
    villeInput.value = selectedSuggestion.properties.city;
    codePostalInput.value = selectedSuggestion.properties.postcode;
    villeInput2.value = selectedSuggestion.properties.city;
    codePostalInput2.value = selectedSuggestion.properties.postcode;
  }
});

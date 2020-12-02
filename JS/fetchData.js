const dataset = () => {
  fetch("https://usc.data.socrata.com/resource/4a97-v5tx.json")
    .then((response) => response.json())
    .then((data) => console.log(data));
};
dataset();
console.log(data);

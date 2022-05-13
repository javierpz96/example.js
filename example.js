/* initial
{
  "1": ["windows", "server"],
  "2": ["crystalzoom"],
  "3": ["python", "crystalzoom", "linux"],
  "4": ["crystalzoom"],
  "7": ["java", "crystalzoom", "cpp", "js"],
  "9": ["crystalzoom"],
  "10": ["ruby", "rails"]
}
*/

/* final solution
{
  "1": ["windows", "server"],
  "2": ["crystalzoom3"],
  "3": ["python", "linux"],
  "7": ["java", "crystalzoom1", "cpp", "js"],
  "9": ["crystalzoom1"],
  "10": ["ruby", "rails"]
}
*/

const exampleList = {
    1: ["windows", "server"],
    2: ["crystalzoom"],
    3: ["python", "crystalzoom", "linux"],
    4: ["crystalzoom"],
    7: ["java", "crystalzoom", "cpp", "js"],
    9: ["crystalzoom"],
    10: ["ruby", "rails"],
};

function getOccurrences(arg) {
    let acc = 0;
    const nameOccurrence = "crystalzoom";
    const listOfOccurrences = [];
    const listNotConcurrences = [];

    // [1,2,3,4,7,9]...
    const keysOcurrences = Object.keys(arg).map((el) => parseInt(el));
    // [ 'python', 'linux' ]...
    const valuesOcurrences = Object.values(arg);

    for (let i = 0; i <= keysOcurrences.length - 1; i++) {
        if (keysOcurrences[i] - 1 !== keysOcurrences[i - 1]) {
            // not occurrences
            valuesOcurrences[i].forEach((srt, idx) => {
                if (srt.includes(nameOccurrence)) {
                    valuesOcurrences[i].splice(idx, 1, nameOccurrence + 1);
                }
            });
            listNotConcurrences.push({ [keysOcurrences[i]]: valuesOcurrences[i] });
        } else {
            // occurrences
            valuesOcurrences[i].forEach((srt, idx) => {
                if (srt.includes(nameOccurrence)) {
                    valuesOcurrences[i].splice(idx, 1);
                    acc++;
                }
            });
            listOfOccurrences.push({ [keysOcurrences[i]]: valuesOcurrences[i] });
        }
    }

    // Extract first concurrency
    const [key, _] = Object.entries([...listOfOccurrences].shift()).flat();
    const firstItem = { [key]: [nameOccurrence + acc] };
    // Add item
    listOfOccurrences.splice(0, 1, firstItem);

    // Remove empty list
    for (let t = 0; t <= listOfOccurrences.length - 1; t++) {
        const getItem = Object.values(listOfOccurrences[t])[0];
        if (!getItem.length) {
            listOfOccurrences.splice(t, 1);
        }
    }

    // Concat arrays
    const newListOccurrences = listNotConcurrences.concat(listOfOccurrences);

    // Sort items
    const creatObject = {};
    newListOccurrences.forEach((el) => {
        Object.assign(creatObject, el);
    });

    return creatObject;
}

console.log("Format JSON: ", JSON.stringify(getOccurrences(exampleList)));
console.log("Format Object: ", getOccurrences(exampleList));
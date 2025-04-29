const text = `
Ceci est une ligne
Une autre phrase
Information importante
Bravo pour le travail
Encre invisible
`;

text
  .split('\n')
  .map(line => line.toUpperCase())
  .filter(line => line.includes('I'))
  .forEach(line => console.log(line));

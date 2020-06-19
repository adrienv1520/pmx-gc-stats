require('../../lib')({
  // types: [1, 2, 4],
  // probes: ['count', 'pause', 'total-heap-size'],
});
const app = require('express')();

const index =
`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>pmx-gc-stats</title>
  </head>
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    html {
      height: 100%;
      font-size: 62.5%;
    }

    body {
      height: 100%;
      margin: 0;
      padding: 0;
      background-color: rgb(43, 43, 43);
      color: whitesmoke;
      font-family: monospace;
      font-size: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>
  <body>
    <p>pmx-gc-stats</p>
  </body>
</html>
`;

app.get('/', (req, res) => {
  res.end(index);
});

app.listen(3000, () => {
  console.info('app listening on port 3000');
});

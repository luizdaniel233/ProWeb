const operation = (req, res) => {
  const operation = req.params.operation;
  let { num_1, num_2 } = req.params;

  num_1 = parseInt(num_1);
  num_2 = parseInt(num_2);

  if (operation == "sum") {
    res.status(200).send(`<h1>${num_1 + num_2}</h1>`);
  } else if (operation == "sub") {
    res.status(200).send(`<h1>${num_1 - num_2}</h1>`);
  } else if (operation == "multi") {
    res.status(200).send(`<h1>${num_1 * num_2}</h1>`);
  } else if (operation == "div") {
    if (num_2 == 0) res.status(200).send(`<h1>O divisor não pode ser 0</h1>`);
    else res.status(200).send(`<h1>${num_1 / num_2}</h1>`);
  } else {
    res.status(200).send(`<h1>Operação não encontrada.</h1>`);
  }
};

module.exports = { operation };

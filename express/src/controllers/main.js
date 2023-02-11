const index = (req, res) => {
  const conteudo = "Página principal a aplicação";
  res.render("main/index", {
    conteudo,
    layout: false,
  });
};

const sobre = (req, res) => {
  const conteudo = "Página sobre a aplicação";
  res.render("main/sobre", {
    conteudo,
    layout: false,
  });
};

module.exports = { index, sobre };

// Código desenvolvido corretamente
// Nota: 2.0

class Venda {
  constructor(id,qtd,price) {
    this.setId(id);
    this.setQtd(qtd);
    this.setPrice(price);
  }

  setId(id) {
    this.id = id;
  }

  setQtd(qtd) {
    this.qtd = qtd;
  }

  setPrice(price) {
    this.price = price;
  }

  getId() {
    return this.id;
  }

  getQtd() {
    return this.qtd;
  }

  getPrice() {
    return this.price;
  }

  getValorTotal() {
    const qtd = this.getQtd();
    const price = this.getPrice();
    return parseInt(qtd * price);
  }
}

const venda = new Venda(1,10,10.5);
const venda2 = new Venda(2,15,100)
console.log(`O valor total é: R$${venda.getValorTotal()}.00`);
console.log(`O valor total é: R$${venda2.getValorTotal()}.00`);

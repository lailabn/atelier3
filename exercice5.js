const products = [
    { name: "Shirt", price: 20 },
    { name: "Shoes", price: 50 },
    { name: "Hat", price: 15 }
  ];
  
  const totalTTC = products
    .map(p => p.price * 1.25)
    .reduce((sum, price) => sum + price, 0);
  
  console.log(`Prix total TTC: €${totalTTC.toFixed(2)}`);
  
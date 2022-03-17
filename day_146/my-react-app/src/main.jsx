import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function ProductCategoryRow(props) {
  const category = props.category;

  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow(props) {
  const product = props.product;
  const name = product.stocked ?
    product.name :
    <span style={{color: 'red'}}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable(props) {
  const products = props.products;
  const filterText = props.filterText;
  const inStockOnly = props.inStockOnly;
  const rows = [];
  let lastCategory = null;

  products.forEach(product => {
    if (product.name.indexOf(filterText) === -1) {
      return;
    }

    if (inStockOnly && !product.stocked) {
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow
        category={product.category}
        key={product.category} />
      );
    }

    rows.push(<ProductRow
      product={product}
      key={product.name} />
    );

    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar(props) {
  const filterText = props.filterText;
  const inStockOnly = props.inStockOnly;

  return (
    <form className='form'>
      <input type="text" placeholder="Search..." value={filterText} />
      <label>
        <input type="checkbox" checked={inStockOnly} />
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable(props) {
  const products = props.products;
  const [ filterText, setFilterText ] = useState('ball');
  const [ inStockOnly, setInStockOnly ] = useState(true);

  return (
    <div>
      <SearchBar filterText={filterText} inStockOnly={inStockOnly} />
      <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
    </div>
  );
}

const PRODUCTS = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('root')
)

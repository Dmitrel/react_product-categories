import React, { useState } from 'react';
import './App.scss';

import classNames from 'classnames';
import usersData from './api/users';
import categoriesData from './api/categories';
import productsData from './api/products';

import ResetButton from './components/ResetButton';
import NoMatch from './components/NoMatch';
import FilterUsers from './components/FilterUsers';

const productList = productsData.map((product) => {
  const category = categoriesData.find(
    findCategory => findCategory.id === product.categoryId,
  );
  const user = usersData.find(findUser => findUser.id === category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});
const prepareProducts = (data, options) => {
  const { filterUser, searchQuery } = options;
  let preparedProducts = [...data];

  if (filterUser) {
    preparedProducts = preparedProducts.filter((product) => {
      if (filterUser === 'All') {
        return true;
      }

      return product.user.name === filterUser;
    });
  }

  if (searchQuery) {
    const preparedQuery = searchQuery.toLowerCase().trim();

    preparedProducts = preparedProducts
      .filter(product => product.name.toLowerCase().includes(preparedQuery));
  }

  return preparedProducts;
};

export const App = () => {
  const [filterUser, setFilterUser] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = prepareProducts(productList, {
    filterUser,
    searchQuery,
  });

  const resetFilters = () => {
    setFilterUser('All');
    setSearchQuery('');
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <FilterUsers
              filterUser={filterUser}
              setFilterUser={setFilterUser}
              users={usersData}
            />

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={event => setSearchQuery(event.target.value)}
                />
                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>
                {searchQuery && (
                  <span className="icon is-right">
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setSearchQuery('')}
                    />
                  </span>
                )}
              </p>
            </div>

            <ResetButton handleClick={resetFilters} />
          </nav>
        </div>

        <div className="box table-container">
          {filteredProducts.length === 0 ? (
            <NoMatch />
          ) : (
            <table
              data-cy="ProductTable"
              className="table is-striped is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      ID
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Product
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-down" />
                        </span>
                      </a>
                    </span>
                  </th>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Category
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-up" />
                        </span>
                      </a>
                    </span>
                  </th>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      User
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr data-cy="Product" key={product.id}>
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {product.id}
                    </td>
                    <td data-cy="ProductName">{product.name}</td>
                    <td data-cy="ProductCategory">{`${product.category.icon} - ${product.category.title}`}</td>
                    <td
                      data-cy="ProductUser"
                      className={classNames({
                        'has-text-link': product.user.sex === 'm',
                        'has-text-danger': product.user.sex === 'f',
                      })}
                    >
                      {product.user.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

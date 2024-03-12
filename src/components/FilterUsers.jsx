import classNames from 'classnames';

const FilterUsers = ({ filterUser, setFilterUser, users }) => (
  <p className="panel-tabs has-text-weight-bold">
    <a
      href="#/"
      data-cy="FilterAllUsers"
      className={classNames({ 'is-active': filterUser === 'All' })}
      onClick={() => setFilterUser('All')}
    >
      All
    </a>
    {users.map(user => (
      <a
        href="#/"
        data-cy="FilterUser"
        key={user.id}
        className={classNames({ 'is-active': user.name === filterUser })}
        onClick={() => setFilterUser(user.name)}
      >
        {user.name}
      </a>
    ))}
  </p>
);

export default FilterUsers;

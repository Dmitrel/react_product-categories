const ResetButton = ({ handleClick }) => (
  <div className="panel-block">
    <a
      data-cy="ResetAllButton"
      className="button is-link is-outlined is-fullwidth"
      href="#/"
      onClick={handleClick}
    >
      Reset all filters
    </a>
  </div>
);

export default ResetButton;

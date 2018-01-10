import React from 'react';
import PropTypes from 'prop-types';

// This is what is being generated by render() from the Arg class. It is called in FunctionForm
// TODO: Reintroduce tooltips when the styling works again
export const ArgLabel = ({ label, /*help,*/ expandable, expanded, setExpand }) => {
  const className = expandable ? 'canvas__arg--label clickable' : 'canvas__arg--label';

  return expandable ? (
    <label className={className} onClick={() => setExpand(!expanded)}>
      <i className={`fa fa-chevron-${expanded ? 'down' : 'right'}`} />
      {label}
    </label>
  ) : (
    <label className="canvas__arg--label">{label}</label>
  );
};

ArgLabel.propTypes = {
  label: PropTypes.string,
  help: PropTypes.string,
  expandable: PropTypes.bool,
  expanded: PropTypes.bool,
  setExpand: PropTypes.func,
};

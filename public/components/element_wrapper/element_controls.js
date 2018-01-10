import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';
import { RemoveIcon } from '../remove_icon';
import { ElementContent } from './element_content';

export const ElementControls = pure(props => {
  const {
    selectElement,
    removeElement,
    isSelected,
    handlers,

    // We could pull off the relevant properties of the following two objects,
    // but since they aren't used in the parent it would actually make this more
    // annoying to test and read
    renderFunction,
    renderable,
    state,
    size,
  } = props;

  const selectHandler = ev => {
    ev && ev.stopPropagation();
    selectElement();
  };

  const removeHandler = ev => {
    ev && ev.stopPropagation();
    removeElement();
  };

  return (
    <div
      className={`canvas__workpad--element ${isSelected ? 'selected' : ''}`}
      onClick={selectHandler}
    >
      {/*
        Yeah, in theory we could put RenderElement in here, but the ElementContent component actually contains a
        bunch of logic for error handling. Its actually pretty nice to keep them seperate.
      */}

      <ElementContent
        state={state}
        renderable={renderable}
        renderFunction={renderFunction}
        size={size}
        handlers={handlers}
      />

      {!isSelected ? null : (
        <RemoveIcon
          style={{ position: 'absolute', top: -20, right: -20 }}
          onClick={removeHandler}
        />
      )}
    </div>
  );
});

ElementControls.propTypes = {
  selectElement: PropTypes.func.isRequired,
  removeElement: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  renderFunction: PropTypes.object,
  renderable: PropTypes.object,
  size: PropTypes.object,
  state: PropTypes.string,
  handlers: PropTypes.object,
};

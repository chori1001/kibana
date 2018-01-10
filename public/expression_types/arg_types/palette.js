import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { PalettePicker } from '../../components/palette_picker';
import { getType } from '../../../common/lib/get_type';

const PaletteArgInput = ({ onValueChange, argValue, renderError }) => {
  // Why is this neccesary? Does the dialog really need to know what parameter it is setting?

  const throwNotParsed = () => renderError();

  // TODO: This is weird, its basically a reimplementation of what the interpretter would return.
  // Probably a better way todo this, and maybe a better way to handle template stype objects in general?
  function astToPalette({ chain }) {
    if (chain.length !== 1 || chain[0].function !== 'palette') throwNotParsed();
    try {
      const colors = chain[0].arguments._.map(astObj => {
        if (getType(astObj) !== 'string') throwNotParsed();
        return astObj;
      });

      const gradient = get(chain[0].arguments.gradient, '[0]');

      return { colors, gradient };
    } catch (e) {
      throwNotParsed();
    }
  }

  function handleChange(palette) {
    const astObj = {
      type: 'expression',
      chain: [
        {
          type: 'function',
          function: 'palette',
          arguments: {
            _: palette.colors,
            gradient: [palette.gradient],
          },
        },
      ],
    };

    onValueChange(astObj);
  }

  const palette = astToPalette(argValue);

  return <PalettePicker value={palette} onChange={handleChange} />;
};

PaletteArgInput.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  argValue: PropTypes.any.isRequired,
  renderError: PropTypes.func,
};

export const palette = () => ({
  name: 'palette',
  displayName: 'Palette',
  help: 'Color palette selector',
  default:
    '{palette #882E72 #B178A6 #D6C1DE #1965B0 #5289C7 #7BAFDE #4EB265 #90C987 #CAE0AB #F7EE55 #F6C141 #F1932D #E8601C #DC050C}',
  simpleTemplate: PaletteArgInput,
});

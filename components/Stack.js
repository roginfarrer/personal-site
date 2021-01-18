import React from 'react';
import Box from './Box';
import css from '@styled-system/css';

const Stack = React.forwardRef(
  ({gap = 3, direction = 'column', ...props}, ref) => {
    return (
      <Box
        {...props}
        css={
          gap
            ? css({
                '> * + *': {
                  marginTop: gap,
                },
              })
            : null
        }
        display="flex"
        flexDirection={direction}
        ref={ref}
      />
    );
  }
);

export default Stack;

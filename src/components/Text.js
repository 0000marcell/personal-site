import { Text as RebassText } from 'rebass';
import styled from 'styled-components';
import { variant, space, color, fontSize, fontWeight } from 'styled-system';

const Text = styled(RebassText)`
  ${variant({
    variants: {
      primary: { color: 'white' },
      secondary: { color: 'silver' },
    },
  })}
  ${space}
  ${color}
  ${fontSize}
  ${fontWeight}
`;

export default Text;

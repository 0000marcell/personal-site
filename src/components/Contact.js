import React from 'react';
import { Flex, Box } from 'rebass';
import styled from 'styled-components';

const links = [
  {
    id: 'github',
    href: 'https://github.com/0000marcell',
  },
  {
    id: 'twitter',
    href: 'https://twitter.com/____Marcell',
  },
  {
    id: 'stackoverflow',
    href: 'https://stackoverflow.com/users/2716555/marcell-monteiro-cruz',
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/marcell-cruz-40313b87/',
  },
];

const Icon = styled.img`
  filter: invert(1);
`;

const Email = styled.a`
  font-size: inherit;
  font-family: inherit;
  color: inherit;
`;

const Contact = () => {
  return (
    <div>
      <Flex alignItems="center" mx={[-3, null, -2]} mb={3}>
        {links.map(item => (
          <Box px={[3, null, 2]} key={item.id}>
            <a href={item.href}>
              <Icon
                width="16"
                src={`https://simpleicons.org/icons/${item.id}.svg`}
              />
            </a>
          </Box>
        ))}
      </Flex>
      <p>
        <span role="img" aria-label="love-letter">
          💌
        </span>{' '}
        <Email href="mailto:0000marcell@gmail.com">0000marcell@gmail.com</Email>
      </p>
      <p>
        <span role="img" aria-label="love-letter">
          ✆
        </span>{' '}
        <a href="tel:55-21-976608939">55-21-976608939</a>
      </p>
    </div>
  );
};

export default Contact;

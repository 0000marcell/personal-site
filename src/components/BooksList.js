import React from 'react';
import { Box, Flex} from 'rebass';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Text from './Text';
import Card from './Card';
import linkStyle from '../styles/link';
import styled from 'styled-components';

const BookThumbnail = styled.img`
  width: 50px;
  margin-right: 15px;
`

const BooksList = ({ limit }) => {
  const data = useStaticQuery(graphql`
    {
      markdownRemark(fileAbsolutePath: { regex: "/books/" }) {
        frontmatter {
          books {
            img
            title
            dateRead
          }
        }
      }
    }
  `);

  const { books } = data.markdownRemark.frontmatter;

  return (
    <div>
      <Text
        as="h2"
        fontSize={3}
        variant="secondary"
        mb={4}
        css={{ textTransform: 'uppercase', letterSpacing: 4 }}
      >
        Books 
      </Text>
      {books.slice(0, limit).map(item => {
        const {
          img,
          title,
          dateRead
        } = item;
        return (
          <Box key={title} mb={[3, 4]}>
            <a style={{ display: 'block' }}>
              <Card width={1} p={[3, 4]}>
                <Flex mb={1} width={1} alignItems="center">
                  <BookThumbnail src={img} />
                  <Box>
                    <Text fontWeight="700" fontSize={3}>
                      {title}
                    </Text>
                    <Text fontWeight="700" fontSize={1}>
                      {dateRead}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </a>
          </Box>
        );
      })}
      {limit < books.length && (
        <Link
          to={'content'}
          style={linkStyle}
        >
          Show all →
        </Link>
      )}
    </div>
  );
};

export default BooksList;

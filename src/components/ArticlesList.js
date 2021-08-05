import React from 'react';
import { Box } from 'rebass';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { format } from 'date-fns';
import Text from './Text';
import Card from './Card';
import linkStyle from '../styles/link';

const ArticlesList = ({ limit }) => {
  const data = useStaticQuery(graphql`
    {
      markdownRemark(fileAbsolutePath: { regex: "/articles/" }) {
        frontmatter {
          articles {
            title
            url
            description
            published
          }
        }
      }
    }
  `);

  const { articles } = data.markdownRemark.frontmatter;

  return (
    <div>
      <Text
        as="h2"
        fontSize={3}
        variant="secondary"
        mb={4}
        css={{ textTransform: 'uppercase', letterSpacing: 4 }}
      >
        Articles
      </Text>
      {articles.slice(0, limit).map(item => {
        const {
          title,
          url,
          description,
          published,
        } = item;
        const datetime = new Date(published);
        return (
          <Box key={title} mb={[3, 4]}>
            <a href={url} style={{ display: 'block' }}>
              <Card width={1} p={[3, 4]}>
                <Text fontWeight="700" fontSize={3}>
                  {title}
                </Text>
                <Text
                  py={3}
                  fontFamily="Fira Mono"
                  lineHeight="1.5"
                  color="#fafafa"
                >
                  {description}
                </Text>
                <Text as="p" color="#fafafa">
                  {format(datetime, 'MMM dd, yyyy')}
                </Text>
              </Card>
            </a>
          </Box>
        );
      })}
      {limit < articles.length && (
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

export default ArticlesList;

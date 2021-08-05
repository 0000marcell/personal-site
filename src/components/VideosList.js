import React from 'react';
import { Box, Flex} from 'rebass';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Text from './Text';
import Card from './Card';
import linkStyle from '../styles/link';
import styled from 'styled-components';

const VideoThumbnail = styled.img`
  width: 140px;
  margin-right: 15px;
`

const VideosList = ({ limit }) => {
  const data = useStaticQuery(graphql`
    {
      markdownRemark(fileAbsolutePath: { regex: "/videos/" }) {
        frontmatter {
          videos {
            title
            url
            description
            thumbnail
          }
        }
      }
    }
  `);

  const { videos } = data.markdownRemark.frontmatter;

  return (
    <div>
      <Text
        as="h2"
        fontSize={3}
        variant="secondary"
        mb={4}
        css={{ textTransform: 'uppercase', letterSpacing: 4 }}
      >
        Videos
      </Text>
      {videos.slice(0, limit).map(item => {
        const {
          title,
          url,
          description,
          thumbnail
        } = item;
        return (
          <Box key={title} mb={[3, 4]}>
            <a href={url} style={{ display: 'block' }}>
              <Card width={1} p={[3, 4]}>
                <Flex mb={1} width={1} alignItems="center">
                  <VideoThumbnail src={thumbnail} />
                  <Box>
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
                  </Box>
                </Flex>
              </Card>
            </a>
          </Box>
        );
      })}
      {limit < videos.length && (
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

export default VideosList;

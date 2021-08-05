import React from 'react'
import Text from './Text';
import { useStaticQuery, graphql } from 'gatsby';
import { Box, Flex } from 'rebass';
import Markdown from 'react-markdown';
import styled from 'styled-components';

const Html = styled.div`
  p:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const KnowledgeItem = ({ title, description, start }) => {
  return (
    <>
      <Flex mb={2} width={1} alignItems="center" justifyContent="space-between">
        <Text fontSize={4} fontWeight="600">
          {title}
        </Text>
        <Text
          fontFamily="Fira Mono"
          ml={3}
          fontSize={3}
          variant="secondary"
          mb={1}
          textAlign="right"
        >
          {start}–
        </Text>
      </Flex>
      <Html>
        <Markdown source={description} />
      </Html>
    </>
  );
};

const Knowledge = () => {
  const data = useStaticQuery(graphql`
    {
      markdownRemark(fileAbsolutePath: { regex: "//cv/knowledge/" }) {
        frontmatter {
          title
          topics {
            title
            start
            description
          }
        }
      }
    }
  `);

  const { title, topics } = data.markdownRemark.frontmatter;
  return (
    <div>
      <Text
        as="h2"
        fontSize={3}
        variant="secondary"
        mb={4}
        css={{ textTransform: 'uppercase', letterSpacing: 4 }}
      >
        {title}
      </Text>
      <Flex m={-4} flexDirection="column">
        {topics.map(topic => (
          <Box key={topic.title} p={4}>
            <KnowledgeItem {...topic} />
          </Box>
        ))}
      </Flex>
    </div>
  );
} 

export default Knowledge

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Text from './Text';
import { Box, Flex } from 'rebass';
import { format } from 'date-fns';
import Markdown from 'react-markdown';
import styled from 'styled-components';

const Html = styled.div`
  p:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const ExperienceItem = ({ title, company, description, start, end }) => {
  return (
    <>
      <Flex mb={2} width={1} alignItems="center" justifyContent="space-between">
        <Text fontSize={4} fontWeight="600">
          {title} @ {company}
        </Text>
        <Text
          fontFamily="Fira Mono"
          ml={3}
          fontSize={3}
          variant="secondary"
          mb={1}
          textAlign="right"
        >
          {start ? format(new Date(start), 'MMM yyyy') : ''}–
          {end ? format(new Date(end), 'MMM yyyy') : ''}
        </Text>
      </Flex>
      {/* <Text fontFamily="Fira Mono" fontSize={3} mb={2}>
        {company}
      </Text> */}
      <Html>
        <Markdown source={description} />
      </Html>
    </>
  );
};

const Experience = () => {
  const data = useStaticQuery(graphql`
    {
      markdownRemark(fileAbsolutePath: { regex: "//cv/experience/" }) {
        frontmatter {
          title
          experiences {
            title
            company
            description
            start
            end
          }
        }
      }
    }
  `);
  const { title, experiences } = data.markdownRemark.frontmatter;
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
        {experiences.map(experience => (
          <Box key={experience.company} p={4}>
            <ExperienceItem {...experience} />
          </Box>
        ))}
      </Flex>
    </div>
  );
};

export default Experience;

import React from 'react';
import { Flex, Box } from 'rebass';
import styled from 'styled-components';
import { fontSize, space } from 'styled-system';
import { graphql, useStaticQuery } from 'gatsby';
import Text from './Text';

const Title = styled.h2`
  ${fontSize}
  ${space}
  display: inline-flex;
  font-family: 'Fira Sans', sans-serif;
  font-weight: 700;
`;

const Projects = () => {
  const data = useStaticQuery(graphql`
    {
      markdownRemark(fileAbsolutePath: { regex: "/projects/" }) {
        frontmatter {
          title
          projects {
            title
            url
            description
          }
        }
      }
    }
  `);
  const { title, projects } = data.markdownRemark.frontmatter;
  return (
    <>
      <Text
        as="h2"
        fontSize={3}
        variant="secondary"
        mb={4}
        css={{ textTransform: 'uppercase', letterSpacing: 4 }}
      >
        {title}
      </Text>
      <Flex as="ul" flexDirection="column" m={-3}>
        {projects.map(project => (
          <Box as="li" p={3} key={project.title}>
            <a href={project.url}>
              <Title mb={2} fontSize={4}>
                {project.title} ↗
              </Title>
            </a>
            <p dangerouslySetInnerHTML={{ __html: project.description }} />
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default Projects;

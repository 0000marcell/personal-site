const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  //const { createPage } = actions;

  //const blogPost = path.resolve(`./src/templates/article.js`);
  // const result = await graphql(
  //   `
  //     {
  //       allMarkdownRemark(
  //         filter: { fileAbsolutePath: { regex: "/blog/" } }
  //         sort: { fields: frontmatter___date, order: DESC }
  //       ) {
  //         nodes {
  //           id
  //           html
  //           excerpt
  //           fileAbsolutePath
  //           frontmatter {
  //             title
  //             date
  //             image {
  //               childImageSharp {
  //                 fixed(width: 1200, height: 630) {
  //                   src
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `,
  // );

  // if (result.errors) {
  //   throw result.errors;
  // }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

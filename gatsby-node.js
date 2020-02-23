const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `NewsJson`) {
    const slug = createFilePath({ node, getNode, basePath: `news` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({graphql, actions: { createPage } }) => {

  const result = await graphql(`
    query NewsQuery {
      allNewsJson {
        edges {
          node {
            fields {
              slug
            }
            date
            content_html
            title
            summary
            image_url
            image_alt
          }
        }
      }
    }
  `)

  const newsData = result.data.allNewsJson.edges
    .map(n => n.node)
    .map(n => ({ ...n, slug: n.fields.slug }))
    .sort((a,b) => {
      return +new Date(b.date) - +new Date(a.date)
    })


  createPage({
    path: `/news`,
    component: require.resolve("./src/templates/news.js"),
    context: {
      news: newsData,
    },
  })


  newsData.forEach(n => {
    createPage({
      path: '/news' + n.slug,
      component: require.resolve("./src/templates/single-news.js"),
      context: n,
    })
  })
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions
  if (page.path.match(/^\/case/)) {
    page.matchPath = "/case/*"

    createPage(page)
  }
}


import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout";
import SEO from "../components/seo";
import PageResults from "../components/PageResults"


export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
    <SEO keywords={[`bahai`, `song`, `music`, `chords`]} title={frontmatter.title} />
      <PageResults>
        <div className="max-w-4xl mx-auto px-4 mt-6">
          <h1 className="mb-8 text-6xl font-extrabold leading-tight">{frontmatter.title}</h1>
          <div
            className="md-page"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </PageResults>
    </Layout>
  )
}
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        title
      }
    }
  }
`

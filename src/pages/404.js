import React from "react"
import Meta from '../components/Meta';

import Layout from "../components/layout"

const NotFoundPage = () => (
  <Layout>
    <Meta title="Not Found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)

export default NotFoundPage
import React from "react"
import Layout from "../components/layout"
import { Router } from "@reach/router"

import SingleCaseContainer from "../components/SingleCaseContainer";
import NotFound from "./404";

export default () => {
  return (
    <Layout>
      <Router basepath="/case">
        <SingleCaseContainer path="/:id" />
        <NotFound path="/" />
      </Router>
    </Layout>
  )
}

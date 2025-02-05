/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  mutation CreateActivity($articleId: ID!, $action: ActivityType!) {\n    createActivity(articleId: $articleId, action: $action) {\n      id\n    }\n  }\n": types.CreateActivityDocument,
    "\n  mutation CreateArticle(\n    $title: String!\n    $content: String!\n    $shortDescription: String!\n    $thumbnail: String!\n  ) {\n    createArticle(\n      title: $title\n      content: $content\n      shortDescription: $shortDescription\n      thumbnail: $thumbnail\n    ) {\n      id\n    }\n  }\n": types.CreateArticleDocument,
    "\n  mutation UpdateArticle(\n    $id: ID!\n    $slug: String!\n    $title: String!\n    $content: String!\n    $shortDescription: String!\n    $thumbnail: String!\n  ) {\n    updateArticle(\n      id: $id\n      slug: $slug\n      title: $title\n      content: $content\n      shortDescription: $shortDescription\n      thumbnail: $thumbnail\n    ) {\n      id\n    }\n  }\n": types.UpdateArticleDocument,
    "\n  mutation DeleteArticle($id: ID!) {\n    deleteArticle(id: $id) {\n      id\n    }\n  }\n": types.DeleteArticleDocument,
    "\n    mutation LoginUser($emailOrUsername: String!, $password: String!) {\n        loginUser(emailOrUsername: $emailOrUsername, password: $password) {\n            accessToken\n            refreshToken\n        }\n    }\n": types.LoginUserDocument,
    "\n    mutation RefreshTokenUser($refreshToken: String!) {\n        refreshTokenUser(refreshToken: $refreshToken) {\n            accessToken\n            refreshToken\n        }\n    }\n": types.RefreshTokenUserDocument,
    "\n  mutation UploadMedia($file: File!) {\n    uploadMedia(file: $file) {\n      status\n      url\n    }\n  }\n": types.UploadMediaDocument,
    "\n  mutation CreateUser($name: String!, $email: String!, $username: String!, $password: String!) {\n    createUser(name: $name, email: $email, username: $username, password: $password) {\n      id\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation UpdateUser($id: ID!, $name: String!, $email: String!, $username: String!, $password: String!) {\n    updateUser(id: $id, name: $name, email: $email, username: $username, password: $password) {\n      id\n    }\n  }\n": types.UpdateUserDocument,
    "\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id) {\n      id\n    }\n  }\n": types.DeleteUserDocument,
    "\n  query GetArticleAnalyticsByDate(\n    $startDate: String!\n    $endDate: String!\n    $dimension: ActivityType!\n  ) {\n    getArticleAnalyticsByDate(startDate: $startDate, endDate: $endDate, dimension: $dimension) {\n      article {\n        id\n        slug\n        title\n      }\n      dataset {\n        date\n        metrics {\n          views\n          likes\n          shares\n        }\n      }\n    }\n  }\n": types.GetArticleAnalyticsByDateDocument,
    "\n  query GetAnalyticsOverview(\n    $startDate: String!\n    $endDate: String!\n  ) {\n    getAnalyticsOverview(startDate: $startDate, endDate: $endDate) {\n      totalViews\n      totalLikes\n      totalShares\n    }\n  }\n": types.GetAnalyticsOverviewDocument,
    "\n  query Articles {\n    articles {\n      id\n      slug\n      title\n      shortDescription\n      createdAt\n      thumbnail\n      totalViews\n      totalLikes\n      totalShares\n      author {\n        id\n        name\n      }\n    }\n  }\n": types.ArticlesDocument,
    "\n  query FindArticleById($articleId: ID!) {\n    findArticleById(articleId: $articleId) {\n      id\n      slug\n      title\n      shortDescription\n      content\n      createdAt\n      thumbnail\n      totalViews\n      totalLikes\n      totalShares\n      author {\n        id\n        name\n      }\n    }\n  }\n": types.FindArticleByIdDocument,
    "\n  query FindArticleBySlug($slug: String!) {\n    findArticleBySlug(slug: $slug) {\n      id\n      slug\n      title\n      shortDescription\n      content\n      createdAt\n      thumbnail\n      totalViews\n      totalLikes\n      totalShares\n      author {\n        id\n        name\n      }\n    }\n  }\n": types.FindArticleBySlugDocument,
    "\n  query GetUserInfo {\n    userInfo {\n      id\n      name\n      email\n      username\n    }\n  }\n": types.GetUserInfoDocument,
    "\n  query Users {\n    users {\n      id\n      name\n      email\n      username\n    }\n  }\n": types.UsersDocument,
    "\n  query FindUserById($userId: ID!) {\n    findUserById(userId: $userId) {\n      id\n      name\n      email\n      username\n    }\n  }\n": types.FindUserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateActivity($articleId: ID!, $action: ActivityType!) {\n    createActivity(articleId: $articleId, action: $action) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateActivity($articleId: ID!, $action: ActivityType!) {\n    createActivity(articleId: $articleId, action: $action) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateArticle(\n    $title: String!\n    $content: String!\n    $shortDescription: String!\n    $thumbnail: String!\n  ) {\n    createArticle(\n      title: $title\n      content: $content\n      shortDescription: $shortDescription\n      thumbnail: $thumbnail\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateArticle(\n    $title: String!\n    $content: String!\n    $shortDescription: String!\n    $thumbnail: String!\n  ) {\n    createArticle(\n      title: $title\n      content: $content\n      shortDescription: $shortDescription\n      thumbnail: $thumbnail\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateArticle(\n    $id: ID!\n    $slug: String!\n    $title: String!\n    $content: String!\n    $shortDescription: String!\n    $thumbnail: String!\n  ) {\n    updateArticle(\n      id: $id\n      slug: $slug\n      title: $title\n      content: $content\n      shortDescription: $shortDescription\n      thumbnail: $thumbnail\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateArticle(\n    $id: ID!\n    $slug: String!\n    $title: String!\n    $content: String!\n    $shortDescription: String!\n    $thumbnail: String!\n  ) {\n    updateArticle(\n      id: $id\n      slug: $slug\n      title: $title\n      content: $content\n      shortDescription: $shortDescription\n      thumbnail: $thumbnail\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteArticle($id: ID!) {\n    deleteArticle(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteArticle($id: ID!) {\n    deleteArticle(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation LoginUser($emailOrUsername: String!, $password: String!) {\n        loginUser(emailOrUsername: $emailOrUsername, password: $password) {\n            accessToken\n            refreshToken\n        }\n    }\n"): (typeof documents)["\n    mutation LoginUser($emailOrUsername: String!, $password: String!) {\n        loginUser(emailOrUsername: $emailOrUsername, password: $password) {\n            accessToken\n            refreshToken\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RefreshTokenUser($refreshToken: String!) {\n        refreshTokenUser(refreshToken: $refreshToken) {\n            accessToken\n            refreshToken\n        }\n    }\n"): (typeof documents)["\n    mutation RefreshTokenUser($refreshToken: String!) {\n        refreshTokenUser(refreshToken: $refreshToken) {\n            accessToken\n            refreshToken\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UploadMedia($file: File!) {\n    uploadMedia(file: $file) {\n      status\n      url\n    }\n  }\n"): (typeof documents)["\n  mutation UploadMedia($file: File!) {\n    uploadMedia(file: $file) {\n      status\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($name: String!, $email: String!, $username: String!, $password: String!) {\n    createUser(name: $name, email: $email, username: $username, password: $password) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($name: String!, $email: String!, $username: String!, $password: String!) {\n    createUser(name: $name, email: $email, username: $username, password: $password) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUser($id: ID!, $name: String!, $email: String!, $username: String!, $password: String!) {\n    updateUser(id: $id, name: $name, email: $email, username: $username, password: $password) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($id: ID!, $name: String!, $email: String!, $username: String!, $password: String!) {\n    updateUser(id: $id, name: $name, email: $email, username: $username, password: $password) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetArticleAnalyticsByDate(\n    $startDate: String!\n    $endDate: String!\n    $dimension: ActivityType!\n  ) {\n    getArticleAnalyticsByDate(startDate: $startDate, endDate: $endDate, dimension: $dimension) {\n      article {\n        id\n        slug\n        title\n      }\n      dataset {\n        date\n        metrics {\n          views\n          likes\n          shares\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetArticleAnalyticsByDate(\n    $startDate: String!\n    $endDate: String!\n    $dimension: ActivityType!\n  ) {\n    getArticleAnalyticsByDate(startDate: $startDate, endDate: $endDate, dimension: $dimension) {\n      article {\n        id\n        slug\n        title\n      }\n      dataset {\n        date\n        metrics {\n          views\n          likes\n          shares\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAnalyticsOverview(\n    $startDate: String!\n    $endDate: String!\n  ) {\n    getAnalyticsOverview(startDate: $startDate, endDate: $endDate) {\n      totalViews\n      totalLikes\n      totalShares\n    }\n  }\n"): (typeof documents)["\n  query GetAnalyticsOverview(\n    $startDate: String!\n    $endDate: String!\n  ) {\n    getAnalyticsOverview(startDate: $startDate, endDate: $endDate) {\n      totalViews\n      totalLikes\n      totalShares\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Articles {\n    articles {\n      id\n      slug\n      title\n      shortDescription\n      createdAt\n      thumbnail\n      totalViews\n      totalLikes\n      totalShares\n      author {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query Articles {\n    articles {\n      id\n      slug\n      title\n      shortDescription\n      createdAt\n      thumbnail\n      totalViews\n      totalLikes\n      totalShares\n      author {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindArticleById($articleId: ID!) {\n    findArticleById(articleId: $articleId) {\n      id\n      slug\n      title\n      shortDescription\n      content\n      createdAt\n      thumbnail\n      totalViews\n      totalLikes\n      totalShares\n      author {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query FindArticleById($articleId: ID!) {\n    findArticleById(articleId: $articleId) {\n      id\n      slug\n      title\n      shortDescription\n      content\n      createdAt\n      thumbnail\n      totalViews\n      totalLikes\n      totalShares\n      author {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindArticleBySlug($slug: String!) {\n    findArticleBySlug(slug: $slug) {\n      id\n      slug\n      title\n      shortDescription\n      content\n      createdAt\n      thumbnail\n      totalViews\n      totalLikes\n      totalShares\n      author {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query FindArticleBySlug($slug: String!) {\n    findArticleBySlug(slug: $slug) {\n      id\n      slug\n      title\n      shortDescription\n      content\n      createdAt\n      thumbnail\n      totalViews\n      totalLikes\n      totalShares\n      author {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserInfo {\n    userInfo {\n      id\n      name\n      email\n      username\n    }\n  }\n"): (typeof documents)["\n  query GetUserInfo {\n    userInfo {\n      id\n      name\n      email\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Users {\n    users {\n      id\n      name\n      email\n      username\n    }\n  }\n"): (typeof documents)["\n  query Users {\n    users {\n      id\n      name\n      email\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindUserById($userId: ID!) {\n    findUserById(userId: $userId) {\n      id\n      name\n      email\n      username\n    }\n  }\n"): (typeof documents)["\n  query FindUserById($userId: ID!) {\n    findUserById(userId: $userId) {\n      id\n      name\n      email\n      username\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
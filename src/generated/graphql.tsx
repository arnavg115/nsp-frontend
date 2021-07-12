import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  getAll: Array<Edition>;
  getAllEmails: Array<Email>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
};

export type Edition = {
  __typename?: 'Edition';
  id: Scalars['Int'];
  num: Scalars['Int'];
  name: Scalars['String'];
  articles: Array<Article>;
};

export type Article = {
  __typename?: 'Article';
  id: Scalars['Int'];
  name: Scalars['String'];
  desc: Scalars['String'];
  href: Scalars['String'];
  Edition: Edition;
};

export type Email = {
  __typename?: 'Email';
  email: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResponse;
  logout: Scalars['Boolean'];
  register: Scalars['Boolean'];
  addOneEdition: Scalars['Boolean'];
  addOneArticle: Scalars['Boolean'];
  addEmail: Scalars['Boolean'];
  DeleteEmail: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  adminPassword: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationAddOneEditionArgs = {
  num: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationAddOneArticleArgs = {
  Edition_Num: Scalars['Int'];
  desc: Scalars['String'];
  name: Scalars['String'];
};


export type MutationAddEmailArgs = {
  email: Scalars['String'];
};


export type MutationDeleteEmailArgs = {
  email: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type AddOneArticleMutationVariables = Exact<{
  Edition_Num: Scalars['Int'];
  desc: Scalars['String'];
  name: Scalars['String'];
}>;


export type AddOneArticleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addOneArticle'>
);

export type AddOneEditionMutationVariables = Exact<{
  name: Scalars['String'];
  num: Scalars['Int'];
}>;


export type AddOneEditionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addOneEdition'>
);

export type AddEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type AddEmailMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addEmail'>
);

export type GetAllQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllQuery = (
  { __typename?: 'Query' }
  & { getAll: Array<(
    { __typename?: 'Edition' }
    & Pick<Edition, 'num' | 'name'>
    & { articles: Array<(
      { __typename?: 'Article' }
      & Pick<Article, 'name' | 'desc' | 'href'>
    )> }
  )> }
);

export type GetAllEmailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllEmailsQuery = (
  { __typename?: 'Query' }
  & { getAllEmails: Array<(
    { __typename?: 'Email' }
    & Pick<Email, 'email'>
  )> }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  adminPassword: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type DeleteEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type DeleteEmailMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'DeleteEmail'>
);


export const AddOneArticleDocument = gql`
    mutation addOneArticle($Edition_Num: Int!, $desc: String!, $name: String!) {
  addOneArticle(Edition_Num: $Edition_Num, desc: $desc, name: $name)
}
    `;
export type AddOneArticleMutationFn = ApolloReactCommon.MutationFunction<AddOneArticleMutation, AddOneArticleMutationVariables>;

/**
 * __useAddOneArticleMutation__
 *
 * To run a mutation, you first call `useAddOneArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOneArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOneArticleMutation, { data, loading, error }] = useAddOneArticleMutation({
 *   variables: {
 *      Edition_Num: // value for 'Edition_Num'
 *      desc: // value for 'desc'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddOneArticleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddOneArticleMutation, AddOneArticleMutationVariables>) {
        return ApolloReactHooks.useMutation<AddOneArticleMutation, AddOneArticleMutationVariables>(AddOneArticleDocument, baseOptions);
      }
export type AddOneArticleMutationHookResult = ReturnType<typeof useAddOneArticleMutation>;
export type AddOneArticleMutationResult = ApolloReactCommon.MutationResult<AddOneArticleMutation>;
export type AddOneArticleMutationOptions = ApolloReactCommon.BaseMutationOptions<AddOneArticleMutation, AddOneArticleMutationVariables>;
export const AddOneEditionDocument = gql`
    mutation addOneEdition($name: String!, $num: Int!) {
  addOneEdition(name: $name, num: $num)
}
    `;
export type AddOneEditionMutationFn = ApolloReactCommon.MutationFunction<AddOneEditionMutation, AddOneEditionMutationVariables>;

/**
 * __useAddOneEditionMutation__
 *
 * To run a mutation, you first call `useAddOneEditionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOneEditionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOneEditionMutation, { data, loading, error }] = useAddOneEditionMutation({
 *   variables: {
 *      name: // value for 'name'
 *      num: // value for 'num'
 *   },
 * });
 */
export function useAddOneEditionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddOneEditionMutation, AddOneEditionMutationVariables>) {
        return ApolloReactHooks.useMutation<AddOneEditionMutation, AddOneEditionMutationVariables>(AddOneEditionDocument, baseOptions);
      }
export type AddOneEditionMutationHookResult = ReturnType<typeof useAddOneEditionMutation>;
export type AddOneEditionMutationResult = ApolloReactCommon.MutationResult<AddOneEditionMutation>;
export type AddOneEditionMutationOptions = ApolloReactCommon.BaseMutationOptions<AddOneEditionMutation, AddOneEditionMutationVariables>;
export const AddEmailDocument = gql`
    mutation AddEmail($email: String!) {
  addEmail(email: $email)
}
    `;
export type AddEmailMutationFn = ApolloReactCommon.MutationFunction<AddEmailMutation, AddEmailMutationVariables>;

/**
 * __useAddEmailMutation__
 *
 * To run a mutation, you first call `useAddEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEmailMutation, { data, loading, error }] = useAddEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAddEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddEmailMutation, AddEmailMutationVariables>) {
        return ApolloReactHooks.useMutation<AddEmailMutation, AddEmailMutationVariables>(AddEmailDocument, baseOptions);
      }
export type AddEmailMutationHookResult = ReturnType<typeof useAddEmailMutation>;
export type AddEmailMutationResult = ApolloReactCommon.MutationResult<AddEmailMutation>;
export type AddEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<AddEmailMutation, AddEmailMutationVariables>;
export const GetAllDocument = gql`
    query getAll {
  getAll {
    num
    name
    articles {
      name
      desc
      href
    }
  }
}
    `;

/**
 * __useGetAllQuery__
 *
 * To run a query within a React component, call `useGetAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllQuery, GetAllQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAllQuery, GetAllQueryVariables>(GetAllDocument, baseOptions);
      }
export function useGetAllLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllQuery, GetAllQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAllQuery, GetAllQueryVariables>(GetAllDocument, baseOptions);
        }
export type GetAllQueryHookResult = ReturnType<typeof useGetAllQuery>;
export type GetAllLazyQueryHookResult = ReturnType<typeof useGetAllLazyQuery>;
export type GetAllQueryResult = ApolloReactCommon.QueryResult<GetAllQuery, GetAllQueryVariables>;
export const GetAllEmailsDocument = gql`
    query getAllEmails {
  getAllEmails {
    email
  }
}
    `;

/**
 * __useGetAllEmailsQuery__
 *
 * To run a query within a React component, call `useGetAllEmailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllEmailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllEmailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllEmailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllEmailsQuery, GetAllEmailsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAllEmailsQuery, GetAllEmailsQueryVariables>(GetAllEmailsDocument, baseOptions);
      }
export function useGetAllEmailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllEmailsQuery, GetAllEmailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAllEmailsQuery, GetAllEmailsQueryVariables>(GetAllEmailsDocument, baseOptions);
        }
export type GetAllEmailsQueryHookResult = ReturnType<typeof useGetAllEmailsQuery>;
export type GetAllEmailsLazyQueryHookResult = ReturnType<typeof useGetAllEmailsLazyQuery>;
export type GetAllEmailsQueryResult = ApolloReactCommon.QueryResult<GetAllEmailsQuery, GetAllEmailsQueryVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    accessToken
    user {
      id
      username
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $adminPassword: String!) {
  register(username: $username, password: $password, adminPassword: $adminPassword)
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      adminPassword: // value for 'adminPassword'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const DeleteEmailDocument = gql`
    mutation DeleteEmail($email: String!) {
  DeleteEmail(email: $email)
}
    `;
export type DeleteEmailMutationFn = ApolloReactCommon.MutationFunction<DeleteEmailMutation, DeleteEmailMutationVariables>;

/**
 * __useDeleteEmailMutation__
 *
 * To run a mutation, you first call `useDeleteEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEmailMutation, { data, loading, error }] = useDeleteEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useDeleteEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteEmailMutation, DeleteEmailMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteEmailMutation, DeleteEmailMutationVariables>(DeleteEmailDocument, baseOptions);
      }
export type DeleteEmailMutationHookResult = ReturnType<typeof useDeleteEmailMutation>;
export type DeleteEmailMutationResult = ApolloReactCommon.MutationResult<DeleteEmailMutation>;
export type DeleteEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteEmailMutation, DeleteEmailMutationVariables>;
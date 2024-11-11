import type { AxiosError } from 'axios';

import { createQuery } from 'react-query-kit';

import type { Post } from './types';

import { client } from '../common';

type Variables = { id: string };
type Response = Post;

export const usePost = createQuery<Response, Variables, AxiosError>({
  fetcher: variables => {
    return client.get(`posts/${variables.id}`).then(response => response.data);
  },
  queryKey: ['posts'],
});

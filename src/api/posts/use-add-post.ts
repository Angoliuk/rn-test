import type { AxiosError } from 'axios';

import { createMutation } from 'react-query-kit';

import type { Post } from './types';

import { client } from '../common';

type Variables = { body: string; title: string; userId: number };
type Response = Post;

export const useAddPost = createMutation<Response, Variables, AxiosError>({
  mutationFn: async variables =>
    client({
      data: variables,
      method: 'POST',
      url: 'posts/add',
    }).then(response => response.data),
});

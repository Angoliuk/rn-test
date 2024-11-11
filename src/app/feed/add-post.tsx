import { useAddPost } from '@/api';
import { Button, ControlledInput, showErrorMessage, View } from '@/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from 'expo-router';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import { z } from 'zod';

const schema = z.object({
  body: z.string().min(120),
  title: z.string().min(10),
});

type FormType = z.infer<typeof schema>;

export default function AddPost() {
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const { isPending, mutate: addPost } = useAddPost();

  const onSubmit = (data: FormType) => {
    console.log(data);
    addPost(
      { ...data, userId: 1 },
      {
        onError: () => {
          showErrorMessage('Error adding post');
        },
        onSuccess: () => {
          showMessage({
            message: 'Post added successfully',
            type: 'success',
          });
          // here you can navigate to the post list and refresh the list data
          //queryClient.invalidateQueries(usePosts.getKey());
        },
      },
    );
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerBackTitle: 'Feed',
          title: 'Add Post',
        }}
      />
      <View className="flex-1 p-4 ">
        <ControlledInput control={control} label="Title" name="title" testID="title" />
        <ControlledInput
          control={control}
          label="Content"
          multiline
          name="body"
          testID="body-input"
        />
        <Button
          label="Add Post"
          loading={isPending}
          onPress={handleSubmit(onSubmit)}
          testID="add-post-button"
        />
      </View>
    </>
  );
}

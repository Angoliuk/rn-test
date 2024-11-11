import type { SubmitHandler } from 'react-hook-form';

import { Button, ControlledInput, Text, View } from '@/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  name: z.string().optional(),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <View className="flex-1 justify-center p-4">
      <Text className="pb-6 text-center text-2xl" testID="form-title">
        Sign In
      </Text>

      <ControlledInput control={control} label="Name" name="name" testID="name" />

      <ControlledInput control={control} label="Email" name="email" testID="email-input" />
      <ControlledInput
        control={control}
        label="Password"
        name="password"
        placeholder="***"
        secureTextEntry={true}
        testID="password-input"
      />
      <Button label="Login" onPress={handleSubmit(onSubmit)} testID="login-button" />
    </View>
  );
};

"use client"

import { ReactNode } from 'react';
import c from './Toast.module.scss';
import classnames from 'classnames';

export enum MessageType {
  unknown = 0,
  success = 1,
  error = 2,
  info = 3,
  warning = 4,
}

type ToastParams = {
  message: string;
  type: MessageType;
  isShown: boolean;
}

export const Toast = ({ message, type, isShown }: ToastParams) => {

  if (!isShown) return null;

  return (
  <div className={classnames(c.container, {
    [c.success]: type === MessageType.success,
    [c.error]: type === MessageType.error,
    [c.warning]: type === MessageType.warning,
    [c.info]: type === MessageType.info,
  })}>
    <p>{message}</p>
  </div>)
}

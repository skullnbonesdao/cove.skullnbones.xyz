export enum status_message_enum {
  info,
  success,
  error,
}

export interface StatusMessage {
  type: status_message_enum;
  message: string;
}

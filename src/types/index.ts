type ValidationError = {
  [key: string]: string[];
};

export type FeedbackData = {
  email: string;
  text: string;
};

export type FeedbackState = {
  success: boolean;
  message: string;
  errors?: ValidationError;
  formValues?: FeedbackData;
};
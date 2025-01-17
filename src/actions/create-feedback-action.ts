'use server'

import { z } from 'zod' 
import { connectDB } from "@/utils/connectDB"
import { FeedbackData, FeedbackState } from '@/types'
import { getErrorMessage } from '@/utils/error'
import Feedback from "@/models/feedback";

export async function createFeedbackAction(prevState: FeedbackState, formData: FormData) {
  const schema = z.object({
    email: z
      .string()
      .email({ message: 'Invalid email format' })
      .nonempty({ message: 'Email is required' })
      .max(50, { message: 'Email should be at most 50 characters long' }),
    text: z
      .string()
      .min(4, { message: 'Message should be at least 4 characters long' })
      .nonempty({ message: 'Message is required' })
      .max(1000, { message: 'Message should be at most 500 characters long' }),
  })
  
  try {
    const sourceData: FeedbackData = {
      email: formData.get('email') as string,
      text: formData.get('text') as string,
    }

    const validatedFields = schema.safeParse(sourceData);

    if (!validatedFields.success) {
      return {
        success: false,
        message: 'Invalid fields',
        errors: validatedFields.error.flatten().fieldErrors,
        formValues: sourceData
      };
    }
    
    await connectDB()

    await Feedback.create(
      validatedFields.data
    )

    return {
      success: true, 
      message: 'New feedback created' 
    }
  } catch (error) {
    console.error("Error sending feedback:", getErrorMessage(error));
    return {
      success: false, 
      message: `We couldn't process your feedback. Please try again later.`
    }
  }
}
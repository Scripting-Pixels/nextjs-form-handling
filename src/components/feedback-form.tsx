'use client'

import React, { useActionState, useEffect } from 'react';
import { createFeedbackAction } from '@/actions/create-feedback-action';
import { FeedbackState } from '@/types';
import toast from 'react-hot-toast';

const initialState:FeedbackState = {
  message: '',
  success: false
}
 
function FeedbackForm() {
  const [state, formAction, isPending] = useActionState(createFeedbackAction, initialState)

  useEffect(() => {
    if (!isPending && state?.message) {
      if (state.success) {
        toast.success(state.message, {
          position: 'top-center',
          duration: 4000,
        });
      } else {
        toast.error(state.message, {
          position: 'top-center',
          duration: 4000,
        });
      }
    }
  }, [isPending, state.message, state.success]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="form-control">
        <label htmlFor="email" className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={state.formValues?.email || ''}
          className={`input input-bordered w-full focus:bg-transparent focus:bg-white`}
          minLength={4}
          maxLength={50}
        />
        {state?.errors?.email && (
          <span className="text-red-500 text-sm mt-1">
            {state?.errors.email[0]}
          </span>
        )}
      </div>

      <div className="form-control mt-4">
        <label htmlFor="text" className="label">
          <span className="label-text">Message</span>
        </label>
        <textarea
          id="text"
          name="text"
          defaultValue={state.formValues?.text || ''}
          rows={4}
          className="textarea textarea-bordered w-full"
          minLength={4}
          maxLength={1000}
        ></textarea>
        {state?.errors?.text && (
          <span className="text-red-500 text-sm mt-1">
            {state?.errors.text[0]}
          </span>
        )}
      </div>
      <button
        className="btn btn-neutral w-full mt-4"
        disabled={isPending}
      >
        {isPending ? 'Sending...' : 'Send'}
      </button>
    </form>
  )
}

export default FeedbackForm
/* eslint-disable @typescript-eslint/no-explicit-any */

export type TFeedbackTypes = 'warning' | 'success' | 'error' | 'info' | undefined

export interface IFeedback {
  message: string;
  onClose?: Function;
  type: TFeedbackTypes;
}

export const addFeedbackEventListener = (callback: (feedback: IFeedback) => void): (() => void) => {
  const handleEvent = (e: CustomEvent<IFeedback>) => {
    callback(e.detail)
  }

  addEventListener('FEEDBACK_EVENT', handleEvent as any)

  return () => removeEventListener('FEEDBACK_EVENT', handleEvent as any)
}

export const feedback = (message: string, type: TFeedbackTypes, onClose?: Function) => {
  dispatchEvent(new CustomEvent('FEEDBACK_EVENT', {
    detail: {
      message,
      onClose,
      type
    }
  }))
}

/* eslint-disable @typescript-eslint/no-explicit-any */

export type TConfirmationTypes = 'delete' | 'confirmation';

export interface IConfirmation {
  title: string;
  message: string;
  cancelText?: string;
  onCancel?: Function;
  confirmText?: string;
  onConfirm?: Function;
}

export const addConfirmationEventListener = (callback: (confirm: IConfirmation) => void): (() => void) => {
  const handleEvent = (e: CustomEvent<IConfirmation>) => {
    callback(e.detail)
  }

  addEventListener('CONFIRMATION_EVENT', handleEvent as any)

  return () => removeEventListener('CONFIRMATION_EVENT', handleEvent as any)
}

export function confirmation(message: IConfirmation): void;
export function confirmation(message: string, type: TConfirmationTypes, onConfirm?: Function, onCancel?: Function): void;
export function confirmation(message: string | IConfirmation, type?: TConfirmationTypes, onConfirm?: Function, onCancel?: Function): void {
  if (typeof message === 'object') {
    dispatchEvent(new CustomEvent('CONFIRMATION_EVENT', { detail: message }))
  } else {
    dispatchEvent(new CustomEvent('CONFIRMATION_EVENT', {
      detail: {
        message,
        onCancel,
        onConfirm,
        confirmText: type === 'delete' ? 'Excluir' : 'Confirmar',
        title: type === 'delete' ? 'Confirmação de exclusão' : 'Confirmação'
      }
    }))
  }
}

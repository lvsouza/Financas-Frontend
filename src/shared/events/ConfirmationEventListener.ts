/* eslint-disable @typescript-eslint/no-explicit-any */

export type TConfirmationDialogTypes = 'delete' | 'confirmation';

export interface IConfirmationDialog {
  title: string;
  message: string;
  cancelText?: string;
  onCancel?: Function;
  confirmText?: string;
  onConfirm?: Function;
}

export const addConfirmationEventListener = (callback: (confirm: IConfirmationDialog) => void): (() => void) => {
  const handleEvent = (e: CustomEvent<IConfirmationDialog>) => {
    callback(e.detail)
  }

  addEventListener('CONFIRMATION_EVENT', handleEvent as any)

  return () => removeEventListener('CONFIRMATION_EVENT', handleEvent as any)
}

export function confirmation(message: IConfirmationDialog): void;
export function confirmation(message: string, type: TConfirmationDialogTypes, onConfirm?: Function, onCancel?: Function): void;
export function confirmation(message: string | IConfirmationDialog, type?: TConfirmationDialogTypes, onConfirm?: Function, onCancel?: Function): void {
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

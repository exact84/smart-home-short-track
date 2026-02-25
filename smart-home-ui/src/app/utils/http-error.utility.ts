import { HttpErrorResponse } from '@angular/common/http';

export function extractHttpErrorMessage(error: HttpErrorResponse): string {
  if (typeof error.error === 'string') {
    return error.error;
  }

  if (error.error?.message) {
    return error.error.message;
  }

  return 'Unexpected error';
}

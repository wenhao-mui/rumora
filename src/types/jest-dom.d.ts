import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveClass(...classNames: string[]): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveTextContent(text: string | RegExp): R
      toBeVisible(): R
      toBeDisabled(): R
      toBeEnabled(): R
      toHaveValue(value: string | number | string[]): R
      toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R
      toHaveStyle(css: string | Record<string, any>): R
      toHaveFocus(): R
      toBeChecked(): R
      toBePartiallyChecked(): R
      toHaveDescription(text?: string | RegExp): R
      toHaveAccessibleDescription(text?: string | RegExp): R
      toHaveAccessibleName(text?: string | RegExp): R
    }
  }
}
import React from 'react'

export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value:string) => {
     if (value) return undefined
     return 'Field is required'
}

export const maxLength = (length: number):FieldValidatorType => (value) => {
     if (value && value.length > length) return `Max length is ${length} symbols`
     return undefined
}

export const minLength = (length: number):FieldValidatorType => (value) => {
     if (value && value.length < length) return `Min length is ${length} symbols`
     return undefined
}
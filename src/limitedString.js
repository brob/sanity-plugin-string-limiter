import React, { useState, useMemo } from 'react'
import { FormField } from '@sanity/base/components'
import { TextInput, Stack, Text, ThemeProvider, studioTheme } from '@sanity/ui'

// Utilities for patching
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent'
const colors = {
  error: 'red',
  valid: 'green'
}

export const LimitedString = React.forwardRef(
  function LimitedString(props, ref) {
    const { onChange, value, type, markers, presence } = props
    const MaxConstraint = type.validation[0]._rules.filter(rule => rule.flag == 'max')[0].constraint
    const [color, setColor] = useState((value?.length > MaxConstraint ? 'error' : 'valid'))
    const errors = useMemo(
        () => markers.filter((marker) => marker.type === 'validation' && marker.level === 'error'),
        [markers]
      )
    const handleChange = React.useCallback(
      (event) => {
        const inputValue = event.currentTarget.value
        if (inputValue) {
          if (inputValue.length >= MaxConstraint) {
            setColor('error')
          } else {
            setColor('valid')
          }
        }
        onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()))
      },
      [onChange, color]
    )
    return (
      <ThemeProvider theme={studioTheme}>

      <Stack space={1}>

        <FormField
          description={type.description} // creates description
          title={type.title} // Creates label
          __unstable_markers={markers} // handles all markers
          // Might want to use validation separately
          __unstable_presence={presence}

        >
        <TextInput
          customValidity={errors.length > 0 ? errors[0].item.message : ''}

          onChange={handleChange} // On Change handler
          value={value} />
        </FormField>
        <Text style={{ color: colors[color] }} muted size={1}>{value ? value.length : '0'} / {MaxConstraint}</Text>
      </Stack>
      </ThemeProvider>
    )
  }
)
'use client'

import { useState, useRef } from 'react'

import { useConditionalFocusWithin } from '@/hooks/useConditionalFocusWithin.hook'

import { Container } from '@/components/Container/Container'
import { Button } from '@/components/Button/Button'

/**
 * This component has some weird behaviour on dev mode during hot reloads whereby the isExpanded state won't always
 * be synced up with the checked/unchecked state of the checkbox input element. This doesn't seem to be an issue
 * outside of dev mode hot reload scenarios. Checkbox is used so that this expand/collapse works without JS.
 */
export const ContentExpander = ({ title, content, description }: ContentExpanderProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const contentContainer = useRef<HTMLDivElement>(null)

  useConditionalFocusWithin({ ref: contentContainer, condition: isExpanded })

  return (
    <Container as="article" variants={{ width: 'md', marginBottom: true }} className="relative z-0">
      <h1 className="sr-only">{title}</h1>

      {description && (
        <strong className="c-content-area mb-6 block" dangerouslySetInnerHTML={{ __html: description }} />
      )}

      {/*
        This visually hidden input element is checked/unchecked by the Button component below which is rendered as
        a html label element. The content is expanded/collapsed depending on the state of the checkbox, this is
        done so that this ContentExpander component works even with JavaScript disabled.
      */}
      <input checked={isExpanded} type="checkbox" id="content-toggle-checkbox" className="peer hidden" readOnly />

      <div
        className="c-content-area relative z-10 h-20 overflow-clip after:absolute after:bottom-0 after:h-full after:w-full after:bg-gradient-to-b after:from-transparent after:to-gray-50 after:content-[''] peer-checked:h-auto peer-checked:overflow-visible peer-checked:after:hidden after:dark:to-gray-800"
        id="content-area-expandable"
        data-testid="content-area-expandable"
        dangerouslySetInnerHTML={{ __html: content }}
        ref={contentContainer}
      ></div>

      <Button
        as="label"
        variants={{ form: 'fullWidth' }}
        className="relative z-20 peer-checked:mt-7"
        onClick={() => {
          setIsExpanded(!isExpanded)
        }}
        // onKeyDown required so that expand/collapse works for keyboard users.
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
            setIsExpanded(!isExpanded)
          }
        }}
        aria-controls="content-area-expandable"
        aria-expanded={isExpanded}
        role="button"
        htmlFor="content-toggle-checkbox"
        tabIndex={0}
      >
        {isExpanded ? 'Collapse' : 'Expand'} Walk Photos & Guide
      </Button>
    </Container>
  )
}

type ContentExpanderProps = {
  title: string
  content: string
  description?: string
}

'use client'

import { useState, useCallback, useRef } from 'react'
import {
  Alert,
  CircularProgress,
  Box,
  Chip,
  Stack,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuList,
  MenuItem,
  Divider,
  Typography,
} from '@mui/material'
import {
  Save as SaveIcon,
  SaveAlt as SaveAndBackIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { Template, Variable } from '@/types'
import { updateTemplate, createTemplate } from '@/actions/template'
import TemplateForm from './forms/TemplateForm'
import VariablesManager from './forms/VariablesManager/VariablesManager'
import { createVariable, deleteVariable } from '@/actions/variables'

interface TemplateDetailProps {
  templateId?: string
  initialTemplate?: Template
  initialError?: string
}

export default function TemplateDetail({
  templateId,
  initialTemplate,
  initialError,
}: TemplateDetailProps) {
  const [template, setTemplate] = useState<Omit<Template, 'id'> | undefined>(initialTemplate)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | undefined>(initialError)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const [openSaveButton, setOpenSaveButton] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)

  const router = useRouter()

  const isEditMode = !!templateId

  const clearError = () => {
    setError(undefined)
  }


  const handleSave = useCallback(async (templateData: Omit<Template, 'id'>) => {
    if (!template) return

    try {
      setSaving(true)
      clearError()

      if (isEditMode) {
        await updateTemplate(templateId, templateData)
        setLastSaved(new Date())
        setHasUnsavedChanges(false)
      } else {
        const { id } = await createTemplate(templateData)

        router.push(`/admin/templates/${id}`)
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save template')
    } finally {
      setSaving(false)
    }
  }, [templateId, isEditMode, template, router])

  const handleChange = useCallback((templateData: Omit<Template, 'id'>) => {
    setTemplate(prev => ({
      ...prev,
      ...templateData,
      id: templateId
    }))

    if (isEditMode) {
      handleSave(templateData)
    } else {
      setHasUnsavedChanges(true)
    }
  }, [templateId, isEditMode, handleSave])

  const handleSaveAndBack = useCallback(async () => {
    try {
      setSaving(true)
      clearError()

      if (!template) return

      const templateData = {
        title: template.title,
        description: template.description,
        templateType: template.templateType,
        templateUrl: template.templateUrl,
        imageUrl: template.imageUrl,
        variables: template.variables || []
      }

      if (isEditMode) {
        await updateTemplate(templateId, templateData)
      } else {
        await createTemplate(templateData)
      }

      router.push('/admin/templates')
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${isEditMode ? 'create' : 'save'} template`)
    } finally {
      setSaving(false)
    }
  }, [template, templateId, isEditMode, router])

  const handleCancel = useCallback(() => {
    router.push('/admin/templates')
  }, [router])

  const handleToggle = () => {
    setOpenSaveButton((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }
    setOpenSaveButton(false)
  }

  const handleChangeVariable = useCallback((variables: Template['variables']) => {
    setTemplate(prev => prev ? {
      ...prev,
      variables
    } : undefined)

    setHasUnsavedChanges(true)
  }, [])

  const handleAddVariable = useCallback(async (variable: Variable) => {
    if (!templateId) return

    await createVariable(templateId, variable)

    setTemplate(prev => prev ? {
      ...prev,
      variables: [...(prev.variables || []), variable]
    } : undefined)
  }, [templateId])

  const handleDeleteVariable = useCallback(async (variableId: string) => {
    if (!templateId) return

    await deleteVariable(templateId, variableId)

    setTemplate(prev => prev ? {
      ...prev,
      variables: prev.variables?.filter(v => v.id !== variableId) || []
    } : undefined)

  }, [templateId])

  if (isEditMode && error && !template) {
    return (
      <Alert severity="error">
        {error}
      </Alert>
    )
  }

  if (isEditMode && !template && !error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      {isEditMode && (
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            {saving && (
              <Chip
                icon={<CircularProgress size={16} />}
                label="Saving..."
                color="warning"
                size="small"
              />
            )}
            {lastSaved && !saving && (
              <Chip
                label={`Saved ${lastSaved.toLocaleTimeString()}`}
                color="success"
                size="small"
              />
            )}
          </Stack>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => clearError()}>
          {error}
        </Alert>
      )}

      <TemplateForm
        template={template}
        onChange={handleChange}
      />

      <Divider sx={{ my: 3 }} />

      {isEditMode && (
        <VariablesManager
          variables={template?.variables || []}
          onChange={handleChangeVariable}
          onAdd={handleAddVariable}
          onDelete={handleDeleteVariable}
        />
      )}

      <Divider sx={{ my: 3 }} />

      {hasUnsavedChanges && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="warning.main" sx={{ textAlign: 'center' }}>
            ⚠️ You have unsaved changes
          </Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          onClick={handleCancel}
          disabled={saving}
        >
          Back to Templates
        </Button>

        {!isEditMode && (
          <>
            <ButtonGroup
              variant="contained"
              ref={anchorRef}
              aria-label="Save button group"
              disabled={saving || !hasUnsavedChanges}
            >
              <Button
                onClick={() => !!template && handleSave(template)}
                startIcon={<SaveIcon />}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save'}
              </Button>
              <Button
                size="small"
                aria-controls={openSaveButton ? 'save-button-menu' : undefined}
                aria-expanded={openSaveButton ? 'true' : undefined}
                aria-label="select save option"
                aria-haspopup="menu"
                onClick={handleToggle}
                disabled={saving}
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>

            <Popper
              sx={{ zIndex: 1 }}
              open={openSaveButton}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList id="save-button-menu" autoFocusItem>
                        <MenuItem onClick={handleSaveAndBack}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            Save & Back
                            <SaveAndBackIcon />
                          </Box>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </>
        )}
      </Box>
    </>
  )
}
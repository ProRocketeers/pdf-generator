'use client'

import { useState } from 'react'
import {
  Box,
  Typography,
  Alert,
  Grid,
  Button,
  IconButton,
} from '@mui/material'
import {
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import { Variable } from '@/types'
import VariableEditor from './VariableEditor'

interface VariablesManagerProps {
  variables: Variable[]
  onChange?: (variables: Variable[]) => void
  onAdd?: (variable: Variable) => void
  onDelete?: (variableId: string) => void
  error?: string
}

export default function VariablesManager({
  variables,
  onChange,
  onAdd,
  onDelete,
  error
}: VariablesManagerProps) {
  const defaultVariable: Omit<Variable, 'id'> = {
    title: '',
    name: '',
    default: undefined,
    type: 'string' as const,
  }

  const [newVariable, setNewVariable] = useState(defaultVariable)

  const handleAddVariable = () => {
    if (!newVariable.title.trim()) return

    const variable: Variable = {
      id: crypto.randomUUID(),
      name: newVariable.name.trim(),
      title: newVariable.title.trim(),
      type: newVariable.type,
      default: newVariable.default?.trim(),
    }

    setNewVariable(defaultVariable)
    onAdd?.(variable)
  }

  const handleVariableChange = (index: number, variableData: Omit<Variable, 'id'>) => {
    const updatedVariables = variables.map((variable, i) =>
      i === index
        ? {
            ...variable,
            ...variableData,
          }
        : variable
    )
    onChange?.(updatedVariables)
  }

  const handleDeleteVariable = (index: number) => {
    onDelete?.(variables[index].id)
  }

  const handleNewVariableChange = (variableData: Omit<Variable, 'id'>) => {
    setNewVariable(variableData)
  }

  return (
    <>
      <Grid size={12}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          🔧 Template Variables
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
      </Grid>

      {variables.length > 0 && (
        <Grid size={12}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Existing Variables ({variables.length})
          </Typography>
          {variables.map((variable, index) => (
            <VariableEditor
              key={variable.id || index}
              variable={variable}
              onChange={(variableData) => handleVariableChange(index, variableData)}
              actions={
                <IconButton
                  color="error"
                  onClick={() => handleDeleteVariable(index)}
                  size="small"
                  sx={{ '&:hover': { bgcolor: 'error.light', color: 'white' } }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            />
          ))}
        </Grid>
      )}

      <Grid size={12}>
        <VariableEditor
          variable={newVariable}
          onChange={handleNewVariableChange}
          title="Add New Variable"
          actions={
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddVariable}
              disabled={!newVariable.title?.trim()}
              size="small"
            >
              Add
            </Button>
          }
        />
      </Grid>
    </>
  )
}
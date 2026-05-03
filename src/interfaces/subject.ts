import type { Competency } from '../types/competency'

export interface SubjectGroup {
  id: string
  name: string
  description: string
  competencies: Competency[]
}

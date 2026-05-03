export interface SubjectLesson {
  id: string
  title: string
  description: string
  progress: number
  status: string
  duration: string
}

export interface SubjectGroup {
  id: string
  name: string
  description: string
  lessons: SubjectLesson[]
}

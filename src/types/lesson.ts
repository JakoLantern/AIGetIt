export interface LessonModule {
  id: string
  title: string
  summary: string
  progress: number
  status: string
}

export interface LessonDetail {
  id: string
  title: string
  subject: string
  progress: number
  summary: string
  modules: LessonModule[]
}
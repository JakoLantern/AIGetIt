export interface NavigationItem {
  label: string
  path: string
  icon: string
}

export const navigationItems: NavigationItem[] = [
  {
    label: 'Home',
    path: '/dashboard',
    icon: 'home',
  },
  {
    label: 'My Lessons',
    path: '/lessons',
    icon: 'book',
  },
  {
    label: 'Quizzes',
    path: '/quizzes',
    icon: 'quiz',
  },
]
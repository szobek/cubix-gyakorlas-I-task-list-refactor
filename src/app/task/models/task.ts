export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  user: string;
  important: boolean;
  category: string
}

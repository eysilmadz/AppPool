export interface Todo{
  id?: string;
  title: string;
  description: string;
  created: Date;
  isCompleted: boolean;
  userId: string;
  isEditing?: boolean;
}
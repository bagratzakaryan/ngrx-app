import { User } from '../user.model';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

import {Component, EventEmitter, Output} from '@angular/core';
import {IUser} from '../../interfaces/user/user.interface';
import {UsersList} from '../../data/users-list';

@Component({
  selector: 'app-users-list',
  standalone: false,

  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {

  displayedColumns: string[] = ['name', 'date', 'status'];
  usersList: IUser[] = UsersList;

  @Output('userSelected') userSelectedEmitter = new EventEmitter<IUser>();

  onUserSelected(user: IUser) {
    this.userSelectedEmitter.emit(user);
  }
}

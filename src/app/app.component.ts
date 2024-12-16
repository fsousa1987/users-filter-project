import {Component, OnInit} from '@angular/core';
import {IUser} from './interfaces/user/user.interface';
import {UsersList} from './data/users-list';
import {IFilterOptions} from './interfaces/filter-options.interface';
import {isWithinInterval} from 'date-fns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  userSelected: IUser = {} as IUser;
  showUserDetails: boolean = false;
  usersList: IUser[] = [];
  usersListFiltered: IUser[] = [];

  ngOnInit() {
    setTimeout(() => {
      this.usersList = UsersList;
      this.usersListFiltered = this.usersList;
    }, 1);
  }

  onUserSelected(user: IUser) {
    this.userSelected = user;
    this.showUserDetails = true;
  }

  onFilter(filterOptions: IFilterOptions) {
    console.log(filterOptions);

    this.usersListFiltered = this.filterUsersList(filterOptions, this.usersList);
  }

  private filterUsersList(filterOptions: IFilterOptions, usersList: IUser[]): IUser[] {
    let filteredList: IUser[];

    filteredList = this.filterUsersListByName(filterOptions.name, usersList);

    filteredList = this.filterUserListByStatus(filterOptions.status, filteredList);

    filteredList = this.filterUserListByDate(filterOptions.startDate, filterOptions.endDate, filteredList);

    return filteredList;
  }

  private filterUsersListByName(name: string | undefined, usersList: IUser[]): IUser[] {
    const NAME_NOT_TYPED = name === undefined;

    if (NAME_NOT_TYPED) {
      return usersList;
    }

    return usersList.filter((user) => user.nome.toLowerCase().includes(name.toLowerCase()));
  }

  private filterUserListByStatus(status: boolean | undefined, usersList: IUser[]): IUser[] {
    const STATUS_NOT_SELECTED = status === undefined;

    if (STATUS_NOT_SELECTED) {
      return usersList;
    }

    return usersList.filter((user) => user.ativo === status);
  }

  private filterUserListByDate(startDate: Date | undefined, endDate: Date | undefined, usersList: IUser[]): IUser[] {
    const DATE_NOT_SELECTED = startDate === undefined || endDate === undefined;

    if (DATE_NOT_SELECTED) {
      return usersList;
    }

    const checkDateInterval = (user: IUser) => isWithinInterval(new Date(user.dataCadastro), {
      start: startDate,
      end: endDate,
    })

    return usersList.filter(checkDateInterval);
  }
}

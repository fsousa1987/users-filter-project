import {IUser} from '../interfaces/user/user.interface';
import {isWithinInterval} from 'date-fns';
import {IFilterOptions} from '../interfaces/filter-options.interface';

const filterUsersListByName = (name: string | undefined, usersList: IUser[]): IUser[] => {
  const NAME_NOT_TYPED = name === undefined;

  if (NAME_NOT_TYPED) {
    return usersList;
  }

  return usersList.filter((user) => user.nome.toLowerCase().includes(name.toLowerCase()));
}

const filterUserListByStatus = (status: boolean | undefined, usersList: IUser[]): IUser[] => {
  const STATUS_NOT_SELECTED = status === undefined;

  if (STATUS_NOT_SELECTED) {
    return usersList;
  }

  return usersList.filter((user) => user.ativo === status);
}

const filterUserListByDate = (startDate: Date | undefined, endDate: Date | undefined, usersList: IUser[]): IUser[] => {
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

const filterUsersList = (filterOptions: IFilterOptions, usersList: IUser[]): IUser[] => {
  let filteredList: IUser[];

  filteredList = filterUsersListByName(filterOptions.name, usersList);

  filteredList = filterUserListByStatus(filterOptions.status, filteredList);

  filteredList = filterUserListByDate(filterOptions.startDate, filterOptions.endDate, filteredList);

  return filteredList;
}

export {filterUsersList};

import ItemStructure from '../../shared/models/items/itemStructure';
import { RootState } from '../store';

export const selectErrorMessage = (state: RootState): string => state.newItem.errorMessage;
export const selectStatus = (state: RootState): string => state.newItem.status;
export const selectItem = (state: RootState): ItemStructure | null => state.newItem.item;
export const selectErrors = (state: RootState) => state.newItem.errors;

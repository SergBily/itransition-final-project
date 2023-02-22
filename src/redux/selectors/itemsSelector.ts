import { Collection } from '../../shared/models/items/itemsCollection';
import ItemStructure from '../../shared/models/items/itemStructure';
import { RootState } from '../store';

export const selectItems = (state: RootState): ItemStructure[] => state.itemsCollection.items;
export const selectErrorMessage = (state: RootState): string => state.itemsCollection.errorMessage;
export const selectStatus = (state: RootState): string => state.itemsCollection.status;
export const selectCollection = (state: RootState): Collection | null => state.itemsCollection.collection;

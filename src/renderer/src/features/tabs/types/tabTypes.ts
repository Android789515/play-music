import type { UUID } from 'types/stringTypes';

export interface Tab {
   id: UUID;
   name: string;
   isCurrent?: boolean;
   isPermanent?: boolean;
}
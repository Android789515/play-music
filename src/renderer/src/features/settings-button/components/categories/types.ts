import type { ReactNode } from 'react';

import type { UUID } from '@globalTypes/stringTypes';

export interface Category {
   id: UUID;
   name: string;
   component: ReactNode;
}

import { ReactNode } from 'react';

import { BottomDrawerProps } from '@components/organisms/drawers/drawers';

export enum BOTTOM_SHEET_ID {
    TEST = 'TEST',
}

export type BottomSheetConf = {
    id?: BOTTOM_SHEET_ID;
    closeAction?: () => void;
    content: ReactNode | ReactNode[] | null;
} & Omit<BottomDrawerProps, 'children' | 'isVisible' | 'onClose'>;

export interface IBottomSheetProvider {
    children: ReactNode | ReactNode[];
}

export interface IBottomSheetContext {
    open: (conf: BottomSheetConf) => void;
    close: () => void;
    isOpen: boolean;
}

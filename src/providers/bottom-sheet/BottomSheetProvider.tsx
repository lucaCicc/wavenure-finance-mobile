import React, {
    useState,
    useCallback,
    createContext,
    useContext,
    memo,
    useMemo,
    useRef,
} from 'react';
import { Keyboard } from 'react-native';

import BottomDrawer, {
    BottomDrawerRefProps,
} from '@components/organisms/drawers/drawers/BottomDrawer';
import Logger from '@helper/logger';

import type { BottomSheetConf, IBottomSheetContext, IBottomSheetProvider } from './type';

/**
 *
 * BottomSheet Context
 *
 */
const BottomSheetContext = createContext<IBottomSheetContext>({
    open: () => null,
    close: () => null,
    isOpen: false,
});

/**
 *
 * BottomSheet Provider
 *
 */
const BottomSheetProvider: React.FC<IBottomSheetProvider> = ({ children }) => {
    const [configuration, setConfiguration] = useState<BottomSheetConf | undefined>();
    const { closeAction, content, id, ...props } = configuration ?? {};

    const bottomSheetRef = useRef<BottomDrawerRefProps>(null);

    const close = useCallback(() => {
        bottomSheetRef.current?.close();
        closeAction?.();
        setConfiguration(undefined);
        Logger.info({
            file: 'BottomSheetProvider.ts',
            functionName: 'close',
            message: `[BOTTOM SHEET ID]: ${configuration?.id}`,
        });
    }, [closeAction, configuration?.id]);

    const open = useCallback((conf: BottomSheetConf) => {
        Keyboard.dismiss();
        bottomSheetRef.current?.open();
        setConfiguration({ ...conf });
        Logger.info({
            file: 'BottomSheetProvider.ts',
            functionName: 'open',
            message: `[BOTTOM SHEET ID]: ${conf.id}`,
        });
    }, []);

    const isOpen = useMemo(() => !!configuration, [configuration]);

    const value = useMemo(
        () => ({
            open,
            close,
            isOpen,
        }),
        [close, isOpen, open]
    );

    const onClose = useCallback(() => {
        Logger.info({
            file: 'BottomSheetProvider.ts',
            functionName: 'close',
            message: `[BOTTOM SHEET ID]: ${configuration?.id}`,
        });
        closeAction?.();
    }, [closeAction, configuration?.id]);

    return (
        <BottomSheetContext.Provider value={value}>
            {children}
            <BottomDrawer onClose={onClose} {...props} ref={bottomSheetRef}>
                {content}
            </BottomDrawer>
        </BottomSheetContext.Provider>
    );
};

export const useBottomSheet = () => useContext(BottomSheetContext);

export default memo(BottomSheetProvider);
